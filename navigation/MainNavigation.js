import React from "react";
import {
    createStackNavigator,
    createBottomTabNavigator,
} from "react-navigation";

import { GettingStarted, Authentication } from '../src/screens/SplashStack'
import { Home } from "../src/screens/HomeStack"
export const SplashStack = createStackNavigator({
    GettingStarted,
    Authentication
}, {
    defaultNavigationOptions: {
        header: null
    }
});

export const HomeStack = createStackNavigator({
    Home
}, {
    defaultNavigationOptions: {
        header: null
    }
})