import React from "react"
import { View, StyleSheet, ScrollView } from "react-native"
import Constants from 'expo-constants'

import { Heading, Form } from "../../../components/Authentication"

export default class Authentication extends React.PureComponent {
    render() {
        const { navigation } = this.props
        const isLogin = navigation.getParam("isLogin")
        return (
            <ScrollView style={{ flex: 1 }} contentContainerStyle={styles.container}>
                <Heading {...{ isLogin }} />
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