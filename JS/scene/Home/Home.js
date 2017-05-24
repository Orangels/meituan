/**
 * Created by Orangels on 2017/5/1.
 */
import React, {Component} from 'react';
import {
    View,
    Text,
    Image,
    TextInput,
    Keyboard,
    ScrollView,
    StyleSheet,
    TouchableOpacity,
    InteractionManager
} from 'react-native';
import {StackNavigator} from 'react-navigation'
import DetailView from '../../common/DetailView'
import TableView from '../../common/TableView'
import API,{_fetch} from '../../api'
import system from '../../common/system'
import DetailWebView from '../../common/DetailWebView'
class Home extends Component {

    static navigationOptions = ({navigation}) => {
        const {state} = navigation;
        return {
            // title: (
            //     <TextInput style={{
            //         height: 40,
            //         width: system.width / 2,
            //         backgroundColor: 'white',
            //         borderRadius: 20,
            //         textAlign: 'center'
            //     }}
            //                placeholder='搜索商家'/>
            // ),

            headerLeft: (
                <Text style={{color: 'white', textAlign: 'center', fontSize: 20, marginBottom: 10, paddingLeft: 20}}
                      onPress={() => {
                          Keyboard.dismiss();
                      }}>北京</Text>
            ),

            headerRight:  (
                <TextInput style={{
                    height: 40,
                    width: system.width / 2,
                    backgroundColor: 'white',
                    borderRadius: 20,
                    textAlign: 'center',
                    marginRight:system.width/4,
                }}
                           placeholder='搜索商家'/>
            ),

            headerStyle: {
                backgroundColor: '#06C1AE',
            }
        }
    };

    // 构造
    constructor(props) {
        super(props);
        // 初始状态
        this.state = {
            headerData: [],
            showTabBar: true
        };
    }

    componentDidMount() {

        InteractionManager.runAfterInteractions(()=>{
            _fetch(API.discount,(json) => {
                let dataList = json.data.map((info)=>{
                    return {
                        imageUrl: info.imageurl.replace('w.h','160.0'),
                        color: info.deputy_typeface_color,
                        deputytitle: info.deputytitle,
                        title: info.title,
                        url: info.share.url
                    }
                });
                this.setState({
                    headerData:dataList
                });
            })
        });

    }


    _ListHeaderComponent() {
        let menuViews = [];
        let arrLength = API.menuInfo.length;
        let pageCount = Math.ceil(arrLength / 10);
        for (let i = 0; i < pageCount; i++) {
            let length = arrLength < (i + 1) * 10 ? 10 : (i + 1) * 10 - arrLength;
            let items = API.menuInfo.slice(i * 10, i * 10 + length);
            let menuView = (
                <View style={styles.itemView}>
                    {items.map((info) => (
                        <HomeItem {...info}/>
                    ))}
                </View>
            );
            menuViews.push(menuView);
        }

        return (
            <View style={styles.header}>
                <ScrollView contentContainerStyle={styles.headerWrap} horizontal={true}
                            showsHorizontalScrollIndicator={true}
                            pagingEnabled={true}>
                    {menuViews}
                </ScrollView>
                <View style={{flexDirection:'row',flexWrap: 'wrap',marginBottom: 15, justifyContent:'space-between',alignContent:'space-between'}}>
                    {this.state.headerData.map((info)=>{
                        return <WebPage {...info} navigate = {this.props.navigation.navigate.bind(this)} />}
                    )}
                </View>
            </View>
        );
    }

    render() {
        return (
            <TableView params={{
                url: API.recommend,
                Header: this._ListHeaderComponent.bind(this),
                navOpt: OrderNavigator.navigationOptions,
                navigate: this.props.navigation.navigate.bind(this),
                isDetail: false,
                displayTab: true
            }}
            />
        )
    }
}

const HomeItem = ({title, icon}) => (
    <TouchableOpacity style={{
        justifyContent: 'center',
        alignItems: 'center',
        // width: 60,
        // height: 60,
        margin: (system.width - 250) / 10
    }} onPress={()=>{

    }}>
        <Image source={icon} style={styles.icon}/>
        <Text style={{fontSize: 11, marginTop: 5}}>{title}</Text>
    </TouchableOpacity>
);

const WebPage = ({url,imageUrl,color,deputytitle,title,navigate}) => (
        <TouchableOpacity style={styles.WebPage} onPress={()=>{
                navigate('WebPage',{opt:OrderNavigator.navigationOptions,url:url});
                Object.assign(OrderNavigator.navigationOptions,{tabBarVisible:false});
        }}>
            <View>
               <Text style={{color:color,marginBottom:5}}>{deputytitle}</Text>
               <Text >{title}</Text>
            </View>
            <Image source={{uri: imageUrl}} style={{width:50,height:50,borderRadius:25}}/>
        </TouchableOpacity>

);

const OrderNavigator = StackNavigator({
    Home: {screen: Home},
    detailView: {screen: DetailView},
    WebPage: {screen: DetailWebView}
});

OrderNavigator.navigationOptions = {
    tabBarLabel: '团购',
    tabBarIcon: ({focused}) => {
        return (focused ? <Image source={require('../../img/tabbar/pfb_tabbar_homepage_selected@2x.png')}></Image> :
            <Image source={require('../../img/tabbar/pfb_tabbar_homepage@2x.png')}></Image>)

    },
    tabBarVisible:true
};

const styles = StyleSheet.create({
    header: {
        backgroundColor: '#F3F3F3',
    },
    headerWrap: {
        backgroundColor: 'white',
        marginBottom: 15
    },
    icon: {
        width: 50,
        height: 50,
        borderRadius: 25,
    },
    itemView: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        width: system.width,
        justifyContent: 'flex-start',
        // alignContent: 'flex-start',
        alignItems:'flex-start'
    },
    WebPage:{
        flexDirection:'row',
        justifyContent:'center',
        alignItems:'center',
        // padding:30,
        backgroundColor:'white',
        width:(system.width-3)/2,
        height:100,
        marginBottom:2
    }
});

export default OrderNavigator;