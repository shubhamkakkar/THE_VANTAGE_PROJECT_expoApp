import React from "react"
import { View, StyleSheet, Text } from "react-native"
import Constants from 'expo-constants'

import { Heading, Form } from "../../../components/Authentication"

export default class Authentication extends React.PureComponent {
    render() {
        const { navigation } = this.props
        const isLogin = navigation.getParam("isLogin")
        return (
            <View style={styles.container}>
                <Heading {...{ isLogin }} />
                <Form {...{ isLogin }} />
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginTop: Constants.statusBarHeight,
        backgroundColor: "#f5576c"
    }
})