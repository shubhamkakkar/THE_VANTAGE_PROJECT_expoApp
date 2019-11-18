import React from "react"
import { View, StyleSheet, ScrollView } from "react-native"
import Constants from 'expo-constants'

import { Form } from "../../../components/Authentication"
import { Heading } from "../../../UI"
export default class Authentication extends React.PureComponent {
    render() {
        const { navigation } = this.props
        const isLogin = navigation.getParam("isLogin")
        return (
            <ScrollView style={{ flex: 1 }} contentContainerStyle={styles.container}>
                <Heading color="white" title={isLogin ? "Welcome Back" : "Lets Board"} />
                <Form {...{ isLogin }} />
            </ScrollView>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flexGrow: 1,
        marginTop: Constants.statusBarHeight,
        backgroundColor: "#f5576c"
    }
})