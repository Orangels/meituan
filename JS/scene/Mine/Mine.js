/**
 * Created by Orangels on 2017/5/1.
 */
import React from 'react';
import {
    View,
    Text,
    Image,
    SectionList,
    TouchableOpacity,
    StyleSheet,

} from 'react-native';

import {mineData} from '../../api';

export default class Mine extends React.PureComponent{


    // 构造
      constructor(props) {
        super(props);
        // 初始状态
        this.state = {};
        this._renderItem = this._renderItem.bind(this);
        this._renderSectionHeader = this._renderSectionHeader.bind(this);
        this._ListHeaderComponent = this._ListHeaderComponent.bind(this);
      }

    static navigationOptions = {
        tabBarLabel:'我的',
        tabBarIcon:({focused})=>{
            return (
                focused ? <Image source={require('../../img/tabbar/pfb_tabbar_mine_selected@2x.png')}></Image> : <Image
                source={require('../../img/tabbar/pfb_tabbar_mine@2x.png')}></Image>
            );
        }
    };

    _ListHeaderComponent() {
        return (
            <View style={styles.header}>
                <View style={styles.topContainer}>
                    <Image source={require('../../img/Mine/icon_navigationItem_set_white@2x.png')} style={{width:27,
                        height:27,marginRight:10,marginTop:10
                    }} />
                    <Image source={require('../../img/Mine/icon_navigationItem_message_white@2x.png')} style={{width:27,
                        height:27,marginRight:10,marginTop:10
                    }} />
                </View>
                <View style={styles.bottomContainer}>
                    <Image source={require('../../img/Mine/avatar.png')} style={{width:50,height:50,
                    marginLeft:10,marginRight:10, borderRadius:25, borderWidth:2, borderColor:'#06C1AE'}} />
                    <View style={{justifyContent:'space-around'}}>
                        <Text style={{color:'white'}}>刘森</Text>
                        <Text style={{color:'white'}}>个人信息</Text>
                    </View>
                </View>
            </View>
        );
    }


    _renderItem({item}) {
        return (
            <TouchableOpacity style={{flexDirection:'row', alignItems:'center', justifyContent:'space-between', backgroundColor:'white'}}>
                <View style={{flexDirection:'row' ,alignItems:'center'}}>
                    <Image source={item.image} style={styles.icon}/>
                    <Text>{item.title}</Text>
                </View>
                <Image source={require('../../img/Public/cell_arrow.png')} style={styles.arrow}/>
            </TouchableOpacity>
        );
    }

    _renderSectionHeader({section}) {
        return(
            <View style={{flex:1,height:15,backgroundColor:'#F3F3F3'}}/>
        );
    }
    _ItemSeparatorComponent() {
        return(
            <View style={{flex:1,height:2,backgroundColor:'#F3F3F3'}}/>
        )
    }

    render() {
        return (
            <View style={{flex:1}}>
                <SectionList
                    sections = {[
                        {data:mineData[0], key:1},
                        {data:mineData[1], key:2},
                        {data:mineData[2], key:3},
                    ]}
                    ListHeaderComponent = {this._ListHeaderComponent}
                    renderItem = {this._renderItem}
                    renderSectionHeader = {this._renderSectionHeader}
                    ItemSeparatorComponent = {this._ItemSeparatorComponent}
                    //这里和 listView 类似,同样有初次渲染时 swip 才出现的问题
                    removeClippedSubviews = {false}
                />
            </View>
        );
    }
}

const styles = StyleSheet.create({
    wrap:{
        flexDirection: 'row',
        alignItems:'center',
        backgroundColor:'white',
        height:44
    },
    icon:{
        width: 24,
        height: 24,
        margin: 10,
    },
    arrow:{
        height:14,
        width:14,
        marginRight:5
    },
    header:{
        backgroundColor: '#06C1AE',
    },
    topContainer:{
        paddingTop:20,
        flexDirection:'row',
        justifyContent:'flex-end',
        alignItems:'flex-start',
    },
    bottomContainer:{
        flexDirection:'row',
        marginBottom:20
    }
});