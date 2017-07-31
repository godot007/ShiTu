/**
 * Created by Rabbit on 2017/5/23.
 */
import * as types from '../constant/ActionTypes';

const initialState = {
    imageURL: '',
    userToken: '',
    webViewUrl: '',
    qiNiuData: null,
    viewRef:null,
    isUpload:false,
    perent:0,
};
export default function ShiTuReducer(state = initialState, action){
    // console.log(action);
    switch (action.type) {
        case types.USER_TOKEN_SUCCESS:
            // console.log(action);
            return Object.assign({}, state, {
                ...state,
                userToken: action.userToken,
            });
        case types.QINIU_UPLOAD_TOKEN:
            // console.log(action);
            return Object.assign({}, state, {
                qiNiuData:action.qiNiuData,
            });
        case types.WEBVIEW_URL:
            return Object.assign({}, state ,{
                ...state,
                webViewUrl:action.webViewUrl,
            });
        case types.BACKIMAGE_URL:
            // console.log(action.imageURL);
            return Object.assign({}, state ,{
                viewRef:action.viewRef,
                imageURL:action.imageURL,
            });
        case types.UPLOAD_PERENT:
            return Object.assign({}, state, {
                perent:action.perent,
            });
        default:
            return state;
    }
}
