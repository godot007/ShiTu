
/**
 * Created by Rabbit on 2017/4/19.
 */
import {
    StackNavigator,
    TabNavigator,
    addNavigationHelpers
} from 'react-navigation';

import React from 'react';

import {
    Image,
    StyleSheet,
    Text,
    AsyncStorage
} from 'react-native';

import CardStackStyleInterpolator from 'react-navigation/src/views/CardStackStyleInterpolator';

import {connect} from 'react-redux'

import ShiTu from './pages/ShiTu/ShiTu';
import Gank from './pages/Gank/Gank';
import Main from './pages/Main/Main';

import WebViewDetail from './pages/Component/WebViewDetail';
import SearchHistory from './pages/Main/SearchHistory';
import WelfarePicture from './pages/Gank/WelfarePicture';
import Collection from './pages/Main/Collection';

import Login from './pages/Login/Login';
import Register from './pages/Login/Register';

import Button from './component/Button';
import Icon from 'react-native-vector-icons/Ionicons';

import Test from './pages/Component/test';
import Test2 from './pages/Component/Test2';
import Gestures from './pages/Component/Gestures';

const ShiTuIcon = require('./resources/ShiTu.png');
const GankIcon = require('./resources/Gank.png');
const MainIcon = require('./resources/Main.png');



// 为了实现登录的modal效果,所以将ShiTu页面单独拆分出来.
// 推荐除了Login的页面,其他的都不要写在里面
const ShiTuStack = StackNavigator({
    ShiTu:{
        screen:ShiTu,
        navigationOptions: ()=> TabOptions('识兔',ShiTuIcon,ShiTuIcon,'识兔'),
    },
    Login:{
        screen:Login,
        navigationOptions:{
            headerTitle:'Login',
        }
    }
},{
    mode:'modal',
});
// 为了实现登录的modal效果,所以将Gank页面单独拆分出来.
const GankStack = StackNavigator({
    Gank:{
        screen:Gank,
        path:'/Gank',
        navigationOptions: ()=> TabOptions('干货',GankIcon,GankIcon,'干货集中营'),
    },
    Login:{
        screen:Login,
        navigationOptions:{
            headerTitle:'Login',
        }
    }
},{
    mode:'modal',
});
//// 为了实现登录的modal效果,所以将Main页面单独拆分出来.
const MainStack = StackNavigator({
    Main:{
        screen:Main,
        navigationOptions: ()=> TabOptions('个人中心',MainIcon,MainIcon,'个人中心'),
    },
    Login:{
        screen:Login,
        navigationOptions: ({navigation}) => LoginOptions({navigation})
    }
},{
    mode:'modal',
    // headerMode: 'screen',
    // transitionConfig:()=>({
    //     screenInterpolator:CardStackStyleInterpolator.forHorizontal,
    // })
});

const MyTab = TabNavigator({
    ShiTuStack: {
        screen: ShiTuStack,
        path:'ShiTu',
        navigationOptions:{
            header:null
        }
    },
    GankStack: {
        screen:GankStack,
        path:'Gank',
        navigationOptions:{
            header:null
        }
    },

    MainStack:{
        screen:MainStack,
        navigationOptions:{
            header:null
        }
    },
        // Test2:{
        //     screen:Test2,
        //     navigationOptions:{
        //         headerTitle:'Test2',
        //     }
        // }
},
    {
        // initialRouteName:'MainStack',
    tabBarPosition: 'bottom',
    // tabBarComponent:TabBarBottom,
    swipeEnabled:false,
    animationEnabled:false,
    backBehavior:'none',
    lazy:iOS?true:false,
    tabBarOptions: {
        // tabbar上label的style
        labelStyle: {
            // marginTop:0
        },
        // tabbar的Iconstyle
        iconStyle:{
            height:35,
            width:35,
            margin:0
        },
        // tabbar的style
        style: {
            height:49,
            backgroundColor:'white'
        },
        // label和icon的背景色 活跃状态下
        activeBackgroundColor:'white',
        // label和icon的前景色 活跃状态下（选中）
        activeTintColor:'#4ECBFC',
        // label和icon的背景色 不活跃状态下
        inactiveBackgroundColor:'white',
        // label和icon的前景色 不活跃状态下(未选中)
        inactiveTintColor:'#aaa',
        showIcon:true,
        // 是否显示label，默认为true
        showLabel:iOS?false:true,
        // 不透明度为按选项卡(iOS和Android < 5.0)
        pressOpacity:0.3,

        indicatorStyle :{
            height:0, // android 中TabBar下面会显示一条线，高度设为 0 后就不显示线了,
        }
    }
});

export const MyApp = StackNavigator({
    MyTab: {
        screen: MyTab,
    },
    WebViewDetail: {
        screen: WebViewDetail,
        path:'W/:n',
        navigationOptions: ({navigation}) => StackOptions({navigation})
    },
    SearchHistory:{
        screen:SearchHistory,
        navigationOptions: ({navigation}) => StackOptions({navigation})
    },

    WelfarePicture:{
        screen:WelfarePicture,
        navigationOptions: ({navigation}) => StackOptions({navigation})
    },
    Register:{
        screen:Register,
        navigationOptions: ({navigation}) => StackOptions({navigation})
    },
    Collection:{
        screen:Collection,
        navigationOptions: ({navigation}) => StackOptions({navigation})
    },
    Test:{
        screen:Test,
        path:'test',
        navigationOptions:{
            headerTitle:'Test',
        }
    },
    Test2:{
        screen:Test2,
        navigationOptions:{
            headerTitle:'Test2',
        }
    },
    Gestures:{
        screen:Gestures,
        navigationOptions:{
            headerTitle:'手势',
        }
    }
}, {
    headerMode: 'screen',
    transitionConfig:()=>({
        screenInterpolator:CardStackStyleInterpolator.forHorizontal,
    })
});

const TabOptions = (tabBarTitle,normalImage,selectedImage,navTitle) => {
    // console.log(navigation);
    const tabBarLabel = tabBarTitle;
    const tabBarIcon = (({tintColor,focused})=> {
        return(
            <Image
                source={!focused ? normalImage : selectedImage}
                style={[{height:35,width:35 }, {tintColor: tintColor}]}
            />
        )
    });
    const headerTitle = navTitle;
    const headerTitleStyle = {fontSize:iOS?FONT_SIZE(20):FONT_SIZE(23),
                                color:'white',
                                alignSelf:'center',
                                paddingTop:Android? 17: null,
                            };
    // header的style
    const headerStyle = {backgroundColor:'#4ECBFC'};
    const tabBarVisible = true;
    // const header = null;
    return {tabBarLabel,tabBarIcon,headerTitle,headerTitleStyle,headerStyle,tabBarVisible};
};

const StackOptions = ({navigation}) => {
    // console.log(navigation);
    let {state,goBack} = navigation;
    // if (!state.params.isVisible){
    //     return;
    // }
    // alert(state.routeName)
    const headerStyle = {backgroundColor:'#4ECBFC'};

    const headerTitle = state.params ? state.params.title : state.routeName;

    const headerTitleStyle = {fontSize:iOS?FONT_SIZE(20):FONT_SIZE(23),
        color:'white',fontWeight:'500',alignSelf:'center',paddingTop:Android? 17: null,}
    const headerBackTitle = false;
    const headerLeft = (
        <Button
            isCustom={true}
            customView={
                            <Icon
                                name='ios-arrow-back'
                                size={30}
                                color='white'
                                style={{marginLeft:12,paddingTop:Android? 17: null}}
                            />
                        }
            onPress={()=>{goBack()}}
        />
    );
    let headerRight;
    if (state.params?state.params.headerRight:null){
        headerRight = state.params.headerRight;
    }
    let header;
    if (state.params ? state.params.isVisible === true : null){
        header = null;
    }
    return {headerStyle,headerTitle,headerTitleStyle,headerBackTitle,header,headerLeft,headerRight}
};

const LoginOptions = ({navigation}) => {
    let {state,goBack} = navigation;
    const headerStyle = {backgroundColor:'#4ECBFC'};
    const headerTitle = '登录';
    const headerTitleStyle = {fontSize:iOS?FONT_SIZE(20):FONT_SIZE(23),color:'white',
                        fontWeight:'500',paddingTop:Android? 17: null,alignSelf:'center'}
    const headerBackTitle = false;
    const headerLeft = (
        <Button
            isCustom={true}
            customView={
                            <Icon
                                name='md-close'
                                size={30}
                                color='white'
                                style={{marginLeft:13,paddingTop:Android? 17: null}}
                            />
                        }
            onPress={()=>{goBack()}}
        />
    );
    let headerRight;
    if (state.params.headerRight){
        headerRight = state.params.headerRight;
    }
    let header;
    if (state.params.isVisible === true){
        header = null;
    }
    const gesturesEnabled = false;
    return {headerStyle,headerTitle,headerTitleStyle,headerBackTitle,headerLeft,header,headerRight,gesturesEnabled}
};

const prefix = 'ShiTu://';

const MainApp = () => <MyApp uriPrefix={prefix} />;

const AppWithNavigationState = ({ dispatch, nav }) => (
    <MainApp navigation={addNavigationHelpers({ dispatch, state: nav })}/>
);

const mapStateToProps = state => ({
    nav: state.nav,
});

export default connect(mapStateToProps)(AppWithNavigationState);


// export default connect((state)=>{
//     return {
//         nav:state.nav
//     }
// })(StackReducer);

// export default MyApp;