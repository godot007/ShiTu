/**
 * Created by Rabbit on 2017/5/24.
 */
import * as types from '../../constant/ActionTypes';
import Config from '../../common/Config';

import Request from '../../common/Request';
import RNFetchBlob from 'react-native-fetch-blob';

import Realm from 'realm';

const HistorySchema = {
    name: 'History',
    primaryKey: 'id',
    properties: {
        id:         'string',
        imageURL:   'string',
        timestamp:  'int',
    }
};

let realm = new Realm({schema: [HistorySchema]});

export function qiNiuToken(response) {
    return dispatch => {
        return  Request.get(Config.api.qiniu.upLoadToken,(data)=> {
            // console.log('getUpLoadToken');
            // console.log(data);
            let token = data.data.token;
            let key = data.data.key;

            // console.log(data);

            // 创建form表单来上传图片,但现在使用react-native-fetch-blob就没用到这个
            /**
             let formData = new FormData();
             formData.append('token',token);
             formData.append('key',key);
             formData.append('file',{
                        type : 'image/jpeg',
                        uri : this.imageUri,
                        name : key,
                    });
             console.log(formData);
             */

                // 上传七牛云,这里需要将'///'处理掉,因为使用wrap的时候,会再添加一层
            let PATH = iOS?response.uri.replace('file:///',''):response.uri;
            // let PATH = response.uri;
            let body = [{
                name:'token',data:token,
            }, {
                name:'key', data:key,
            },{
                name: 'file',
                filename: key || 'file',
                // type : 'image/jpeg',
                data: RNFetchBlob.wrap(PATH)
            }];

            Request.upload(Config.qiniu.upload,body,(perent)=>{
                // this.perent = perent;
                // this.isUpload = true;
                dispatch(getPerent(perent));

            },(response)=>{
                let body = {
                    token: response.key,
                };
                console.log(response);
                Request.post(Config.api.shitu.detailURL, body, (data) => {
                    console.log('getWebUrl');

                    if (!data){
                        return;
                    }
                    if (data && data.success){
                        try {
                            let imageURL = data.data.imageURL;
                            let timestamp = Date.parse(new Date());

                            dispatch(getQiNiuToken(data));

                            realm.write(() => {
                                realm.create('History', {
                                    id: response.key.replace('.jpeg', ''),
                                    imageURL: imageURL,
                                    timestamp: timestamp
                                });
                            });

                        }
                        catch (e) {
                            // err = "上传失败";
                        }
                        finally {
                            // if (err) {
                            //     Toast.info(err, 1);
                            //     return;
                            // }
                            // resultCallback(data);
                            // task.cancel();
                        }
                    }
                    else {
                        console.log('上传错误');
                    }
                })
            },(error)=>{
                console.log(error);
            });

            // this._upload(body);
        },(error)=>{
            console.log(error);
        })
    }
};


export function getPerent(perent){
    return{
        type: types.UPLOAD_PERENT,
        perent
    }
}

export function getQiNiuToken(qiNiuData){
    return{
        type: types.QINIU_UPLOAD_TOKEN,
        qiNiuData
    }
}