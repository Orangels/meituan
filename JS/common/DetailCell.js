/**
 * Created by Orangels on 2017/5/15.
 */
import React ,{Component} from 'react';
import {
    View,
    Text,
    Image,
    TouchableOpacity,
    StyleSheet
} from 'react-native';

export default class DetailCell extends Component {
    render() {
        let { info, onPress }  = this.props;
        let imageUrl = info.imageUrl.replace('w.h','160.0');

        return (
            <TouchableOpacity style={styles.wrap} onPress={onPress}>
                <Image source={{uri: imageUrl}} style={styles.icon}/>
                <View style={{justifyContent:'space-between', height:80}}>
                    <View>
                        <Text style={{marginBottom:10}}>{info.title}</Text>
                        <Text style={{color:'#D0D0D0'}}>{info.subtitle}</Text>
                    </View>
                    <Text style={{color:'#06C1AE'}}>
                        {info.price}元
                    </Text>
                </View>
            </TouchableOpacity>
        );
    }
}

const HeaderText = ({item,style}) =>(
    <View style={style}>
        <TouchableOpacity>
            <Text style={{marginLeft:10}}>{item.a}</Text>
        </TouchableOpacity>
        <TouchableOpacity>
            <Text style={{marginRight:10 ,color: '#DFDFDF'}}>{item.b}</Text>
        </TouchableOpacity>
    </View>
);

export {HeaderText};

const styles = StyleSheet.create({
    wrap:{
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor:'white'
    },
    icon:{
        width: 80,
        height: 80,
        margin: 15
    }
});