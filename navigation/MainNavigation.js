import React from "react";
import {
    createStackNavigator,
    createBottomTabNavigator,
} from "react-navigation";

import { GettingStarted, Authentication } from '../src/screens/SplashStack'

export const SplashStack = createStackNavigator({
    GettingStarted,
    Authentication
}, {
    defaultNavigationOptions: {
        header: null
    }
});
