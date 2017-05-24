/**
 * Created by Orangels on 2017/5/16.
 */
import React ,{Component} from 'react';
import {
    Text,
    View,
    Image,
    FlatList,
    StyleSheet,
    Animated,
    InteractionManager,
    TouchableOpacity,
} from 'react-native';
import TableView from './TableView'

import {recommendUrlWithId} from '../api'
import system from './system'

const AnimateFlast = Animated.createAnimatedComponent(FlatList);

export default class DetailView extends React.PureComponent{

    static navigationOptions = ({ navigation }) => {
        const {state,goBack} = navigation;
        return {
            title: '团购详情',
            headerLeft: (
                <TouchableOpacity onPress={() => {
                    state.params.displayTab && Object.assign(state.params.opt,{tabBarVisible:true});
                    goBack();
                }} style={{flexDirection:'row',alignItems:'center'}}>
                    <Image source={require('../img/tabbar/left_arrow@3x.png')} style={{width:40}}/>
                </TouchableOpacity>
            ),
        };
    };

    // 构造
    constructor(props) {
        super(props);
        // 初始状态
        this.state = {
            data:[]
        };

        this._ListHeaderComponent = this._ListHeaderComponent.bind(this);
    }


    componentWillUnmount() {
        let {state} = this.props.navigation;
        Object.assign(state.params.opt, {tabBarVisible: true});

    }

    _ListHeaderComponent() {

        let {imageUrl,price} = this.props.navigation.state.params.item;
        imageUrl = imageUrl.replace('w.h','160.0');

        return(
            <View style={{backgroundColor:'#D9D9D9'}}>
                <Image source={{uri:imageUrl}} style={styles.headerImage}/>
                <View style={styles.headerRow1}>
                    <View style={styles.leftText}>
                        <Text style={{color:'#06C1AE',fontSize:30}}>¥ {Math.ceil(price*0.8)}</Text>
                        <Text style={{color:'#D9D9D9',fontSize:12,marginLeft:10,marginBottom:5}}>门市价:  ¥{price}</Text>
                    </View>
                    <TouchableOpacity style={{backgroundColor:'orange',margin:10,borderRadius:5,borderWidth:2,borderColor:'orange'}}>
                        <Text style={{color:'white',margin:10}}>立即抢购</Text>
                    </TouchableOpacity>
                </View>
                <View style={styles.headerRow2}>
                    <TouchableOpacity>
                        <Text style={{color:'#BFD2A8',margin:10}}>随时退</Text>
                    </TouchableOpacity>
                    <TouchableOpacity>
                        <Text style={{fontSize:9,margin:10}}>已售1234</Text>
                    </TouchableOpacity>
                </View>
            </View>
        );
    }

    render() {
        let url = recommendUrlWithId;
        let id = this.props.navigation.state.params.item.id;
        let opt = this.props.navigation.state.params.opt;
        return <TableView params = {{
                                    url: url,
                                    Header: this._ListHeaderComponent.bind(this),
                                    navOpt: opt,
                                    navigate: this.props.navigation.navigate.bind(this),
                                    isDetail: true,
                                    displayTab: false,
                                    itemID: id
                                    }}/>
    }

 }

const styles = StyleSheet.create({
    headerImage:{
        width:system.width,
        height:system.width*0.5
    },
    headerRow1:{
        flexDirection:'row',
        justifyContent:'space-between',
        alignItems:'center',
        marginBottom:2,
        backgroundColor:'white'
    },
    leftText:{
        flexDirection:'row',
        margin:10,
        alignItems:'flex-end',
    },
    headerRow2:{
        flexDirection:'row',
        justifyContent:'space-between',
        alignItems:'center',
        backgroundColor:'white',
        marginBottom:10
    }
});