import React from "react";
import {
    createStackNavigator,
    createBottomTabNavigator,
} from "react-navigation";

import { GettingStarted, Authentication } from '../src/screens/SplashStack'
import { Home, Test } from "../src/screens/TestStack"
export const SplashStack = createStackNavigator({
    GettingStarted,
    Authentication
}, {
    defaultNavigationOptions: {
        header: null
    }
});

export const TestStack = createStackNavigator({
    Home,
    Test
}, {
    defaultNavigationOptions: {
        header: null
    }
})