/**
 * Created by Orangels on 2017/5/1.
 */
import React,{Component} from 'react';
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
import {StackNavigator} from 'react-navigation';
import DetailCell,{HeaderText} from '../../common/DetailCell';
import DetailView from '../../common/DetailView'
import TableView from '../../common/TableView'
import API ,{headerRowData} from '../../api'
import DetailWebView from '../../common/DetailWebView'
const AnimatedFlatList = Animated.createAnimatedComponent(FlatList);

class Order extends React.PureComponent{

    // 构造
      constructor(props) {
        super(props);
        // 初始状态
        this.state = {
            data:[]
        };

        this._ListHeaderComponent = this._ListHeaderComponent.bind(this);

      }

    static navigationOptions = {
        title: '订单',
    };


    _ListHeaderComponent() {
        return (
            <View style={styles.header}>
                <HeaderText item = {{a:'我的订单',b:'全部订单'}} style={styles.headerRow1}/>
                <View style={styles.headerRow2}>
                    {headerRowData.map((item) =>
                        <TouchableOpacity style={{justifyContent:'center',alignItems:'center',margin:10}} onPress={()=>{
                                this.props.navigation.navigate('webPage');
                        }}>
                            <Image source={item.icon} style={{height:30, width:30,marginBottom:7}}/>
                            <Text>{item.title}</Text>
                        </TouchableOpacity>
                    )}
                </View>
                <HeaderText item = {{a:'我的收藏',b:'查看全部'}} style={styles.headerRow3}/>
            </View>
        )
    }

    render() {

        return <TableView params = {{
                                    url: API.recommend,
                                    Header: this._ListHeaderComponent.bind(this),
                                    navOpt:OrderNav.navigationOptions,
                                    navigate: this.props.navigation.navigate.bind(this),
                                    isDetail: false,
                                    displayTab:true
                                    }}
                />
    }


    // componentDidMount() {
    //     InteractionManager.runAfterInteractions(() => {
    //         this._fetchData();
    //     });
    // }

    //
    // /**
    //  *
    //  * navigate 跳转
    //  */
    // _navigate(item) {
    //     this.props.navigation.navigate('detailView',{item:item,opt:OrderNav.navigationOptions});
    //     Object.assign(OrderNav.navigationOptions,{tabBarVisible:true})
    // }
    //
    // _renderItem({item}) {
    //     return (
    //         <DetailCell info = {item} onPress={this._navigate.bind(this,item)}/>
    //     );
    // }
    //
    // _ItemSeparatorComponent() {
    //     return(
    //         <View style={{flex:1,height:2,backgroundColor:'#D0D0D0'}}/>
    //     )
    // }
    //
    // _ListHeaderComponent() {
    //     return (
    //         <View style={styles.header}>
    //             <HeaderText item = {{a:'我的订单',b:'全部订单'}} style={styles.headerRow1}/>
    //             <View style={styles.headerRow2}>
    //                 {headerRowData.map((item) =>
    //                     <TouchableOpacity style={{justifyContent:'center',alignItems:'center',margin:10}}>
    //                         <Image source={item.icon} style={{height:30, width:30,marginBottom:7}}/>
    //                         <Text>{item.title}</Text>
    //                     </TouchableOpacity>
    //                 )}
    //             </View>
    //             <HeaderText item = {{a:'我的收藏',b:'查看全部'}} style={styles.headerRow3}/>
    //         </View>
    //     );
    // }
    //
    // _fetchData() {
    //     fetch(API.recommend)
    //         .then((response) => response.json())
    //         .then((json) => {
    //             let dataList = json.data.map((info) => {
    //                 return {
    //                     id : info.id,
    //                     imageUrl : info.squareimgurl,
    //                     title: info.mname,
    //                     subtitle: `[${info.range}]${info.title}`,
    //                     price: info.price
    //                 }
    //             });
    //
    //             dataList.sort(() => (0.5-Math.random()));
    //
    //             this.setState({
    //                 data:dataList
    //             });
    //         })
    //         .catch((error) => console.log(error))
    // }
    //
    // _keyExtractor = (item, index) => item.id;
    //
    //
    //
    // render(){
    //     return (<View style={{flex:1,backgroundColor:'white',marginTop:3}}>
    //                 <AnimatedFlatList   data = {this.state.data}
    //                                     renderItem = {this._renderItem}
    //                                     ItemSeparatorComponent = {this._ItemSeparatorComponent}
    //                                     ListHeaderComponent = {this._ListHeaderComponent}
    //                                     onRefresh = {this._fetchData}
    //                                     refreshing = {false}
    //                                     removeClippedSubviews = {false}
    //                                     keyExtractor = {this._keyExtractor}
    //                 />
    //
    //             </View>)
    // }
}


const OrderNav = StackNavigator({
    order: {screen: Order},
    detailView: {screen: DetailView},
    webPage: {screen: DetailWebView}
},{
    navigationOptions:{
        headerStyle: {
            backgroundColor: 'white',
        }
    }
});

OrderNav.navigationOptions = {
    tabBarLabel:'订单',
    tabBarIcon:({focused})=>{
        return (focused ? <Image source={require('../../img/tabbar/pfb_tabbar_order_selected@2x.png')}></Image> : <Image source={
            require('../../img/tabbar/pfb_tabbar_order@2x.png')
        }></Image>);
    }
};

export default OrderNav;





const styles = StyleSheet.create({
    wrap:{
        flex:1,
    },
    header:{
        backgroundColor:'#F3F3F3'
    },
    headerRow1:{
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        height: 40,
        backgroundColor: 'white',
        marginBottom:3

    },
    headerRow2:{
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
        height: 70,
        backgroundColor: 'white',
        marginBottom: 10
    },
    headerRow3:{
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        height: 40,
        backgroundColor: 'white',
        marginBottom:2
    }
});