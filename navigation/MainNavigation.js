import React from "react";
import {
    createStackNavigator,
} from "react-navigation";

import {GettingStarted, Authentication} from '../src/screens/SplashStack'
import {Home, Test, LeaderBoard} from "../src/screens/TestStack"

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
    Test,
    LeaderBoard,
}, {
    defaultNavigationOptions: {
        header: null
    }
})
