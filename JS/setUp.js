/**
 * Created by Orangels on 2017/5/1.
 */
import React, { Component } from 'react';

import {TabNavigator,TabBarBottom,TabBarTop,StackNavigator} from 'react-navigation';
import Home from './scene/Home/Home';
import Mine from './scene/Mine/Mine';
import Nearby from './scene/Nearby/Nearby';
import Order from './scene/Order/Order';

const setUpNavigator = TabNavigator({
            '团购':{screen: Home},
            '附近':{screen: Nearby},
            '订单':{screen: Order},
            '我的':{screen: Mine},
        },{
            tabBarComponent: TabBarBottom,
            tabBarPosition:'bottom',

        });



export default setUpNavigator;


