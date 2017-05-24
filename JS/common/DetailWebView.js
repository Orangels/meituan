/**
 * Created by Orangels on 2017/5/23.
 */
import React, {Component} from 'react'
import {
    View,
    WebView,
    TouchableOpacity,
    Image,
    StyleSheet
} from 'react-native'

import { NavigationActions } from 'react-navigation'
import system from './system'

export default class DetailWebView extends Component {

    static navigationOptions = ({navigation}) => {
        const {state, goBack} = navigation;
        return {
            title: 'Web',
            headerLeft: (
                <TouchableOpacity onPress={() => {
                    goBack();
                    Object.assign(state.params.opt, {tabBarVisible: true});
                }} style={{flexDirection: 'row', alignItems: 'center'}}>
                    <Image source={require('../img/tabbar/left_arrow@3x.png')} style={{width: 40}}/>
                </TouchableOpacity>
            ),
        };
    };

    // 构造
    constructor(props) {
        super(props);
        // 初始状态
        this.state = {};
    }


    componentWillUnmount() {
        let {state} = this.props.navigation;
        Object.assign(state.params.opt, {tabBarVisible: true});
    }

    render() {
        return (
            <WebView source={{uri: this.props.navigation.state.params.url, method: 'GET'}}
                     style={styles.webView}
                     javaScriptEnabled={true}
                     domStorageEnabled={true}
                     scalesPageToFit={true}
                     decelerationRate='normal' />
        );
    }
}
const styles = StyleSheet.create({
    webView: {
        flex: 1,
        backgroundColor: 'white',
    },
    container: {
        flex: 1,
        backgroundColor: '#f2f2f2',
        paddingTop:20,
    },
    webPage:{
        width: system.width,
        height: system.height - 20,
        backgroundColor: 'gray'
    }
});