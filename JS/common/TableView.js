/**
 * Created by Orangels on 2017/5/18.
 */
import React  from 'react';
import {
    Text,
    View,
    Image,
    FlatList,
    StyleSheet,
    Animated,
    InteractionManager,
    TouchableOpacity,
    Button
} from 'react-native';
import DetailCell from './DetailCell'
import { _fetch } from '../api'
const AnimatedFlatList = Animated.createAnimatedComponent(FlatList);

export default class TableView extends React.PureComponent{
    constructor(props) {
        super(props);
        // 初始状态
        this.state = {
            data:[]
        };
        this._renderItem = this._renderItem.bind(this);
        this._ItemSeparatorComponent = this._ItemSeparatorComponent.bind(this);
        this._fetchData = this._fetchData.bind(this);
        this._keyExtractor = this._keyExtractor.bind(this);
    }

    componentDidMount() {
        let id = this.props.params.itemID;
        let url = this.props.params.isDetail ? this.props.params.url(id) : this.props.params.url;

        InteractionManager.runAfterInteractions(() => {
            this._fetchData(url);
        });
    }

    /**
     *
     * navigate 跳转
     */
    _navigate(item) {
        const opt = this.props.params.navOpt;
        const nav = this.props.params.navigate;
        const tab = this.props.params.displayTab;
        nav('detailView',{item:item,opt:opt,displayTab: tab ? true : false});
        Object.assign(opt,{tabBarVisible:false})
    }

    _renderItem({item}) {
        return (
            <DetailCell info = {item} onPress={this._navigate.bind(this,item)}/>
        );
    }

    _ItemSeparatorComponent() {
        return(
            <View style={{flex:1,height:2,backgroundColor:'#D0D0D0'}}/>
        )
    }



    _fetchData(url) {

            _fetch(url,(json) => {
                let dataList = this.props.params.isDetail ? json.data.deals.map((info) => {
                    return {
                        id: info.id,
                        imageUrl: info.imgurl,
                        title: info.brandname,
                        subtitle: `[${info.range}]${info.title}`,
                        price: info.price
                    };
                }) : json.data.map((info) => {
                    return {
                        id: info.id,
                        imageUrl: info.squareimgurl,
                        title: info.mname,
                        subtitle: `[${info.range}]${info.title}`,
                        price: info.price
                    }
                });

                dataList.sort(() =>((0.5 - Math.random())));

                this.setState({
                    data: dataList
                });
            });

    }


    _keyExtractor = (item, index) => item.id;



    render(){
        // let url = this.props.params.url;

        let id = this.props.params.itemID;
        let url = this.props.params.isDetail ? this.props.params.url(id) : this.props.params.url;

        let Header = this.props.params.Header;
        return (<View style={{flex:1,backgroundColor:'#D9D9D9',marginTop:3}}>
                    <AnimatedFlatList   data = {this.state.data}
                                        renderItem = {this._renderItem}
                                        ItemSeparatorComponent = {this._ItemSeparatorComponent}
                                        ListHeaderComponent = {Header}
                                        onRefresh = {()=>{this._fetchData(url)}}
                                        refreshing = {false}
                                        removeClippedSubviews = {false}
                                        keyExtractor = {this._keyExtractor}
                                        keyboardDismissMode = 'on-drag'
                    />

                </View>)
    }
}

