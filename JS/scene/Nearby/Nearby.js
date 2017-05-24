/**
 * Created by Orangels on 2017/5/1.
 */
import React,{Component} from 'react';
import {
    View,
    Text,
    Image,
    Platform
} from 'react-native';

import {StackNavigator,TabNavigator,TabBarTop} from 'react-navigation'
import CommodityCell from './CommodityCell';
class Nearby extends Component{

    // 构造
      constructor(props) {
        super(props);
        // 初始状态
        this.state = {};

      }


    render(){
        switch (this.props.navigation.state.routeName){
            case '享美食':
                return (<Text onPress={()=>{
                    this.props.navigation.navigate('住酒店');
                }}> 美食 </Text>);
                break;
            case '住酒店':
                return (<Text> 酒店 </Text>);
                break;
            case '爱玩乐':
                return (<Text> 美食 </Text>);
                break;
            case '全部':
                return (<Text> 全部 </Text>);
                break;
        };

    }
}

const NearbyTabNavigator = TabNavigator({
    '享美食':{screen:Nearby},
    '住酒店':{screen:Nearby},
    '爱玩乐':{screen:Nearby},
    '全部':{screen:Nearby},
},{
    tabBarComponent: TabBarTop,
    tabBarPosition:'top',
    swipeEnabled:true,
    tabBarOptions:{
        scrollEnabled: Platform.OS === 'ios' ? false : true,
        activeTintColor:'#FB5870',
        inactiveTintColor:'#969696',
        indicatorStyle:{
            height:5,
            backgroundColor:'#FB5870'
        },
        style:{
            backgroundColor:'white',
        }
    }
});

const NearbyStackNavigator = StackNavigator({
    'Home':{screen:NearbyTabNavigator},
    'Cell':{screen:CommodityCell}
});

NearbyStackNavigator.navigationOptions = {
    tabBarLabel:'附近',
    tabBarIcon:({focused})=>{
        return (focused ? <Image source={require('../../img/tabbar/pfb_tabbar_merchant_selected@2x.png')}></Image> : <Image source={
                require('../../img/tabbar/pfb_tabbar_merchant@2x.png')
            }></Image>);
    }
};
export default NearbyStackNavigator;