import React from 'react'
import { View, Text, StyleSheet } from 'react-native'
export default function Heading({ isLogin }) {
    return (
        <View style={styles.container}>
            <Text style={styles.headingText}>
                Hey! :-)
            </Text>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center"
    },
    headingText: {
        fontWeight: "bold",
        fontSize: 22,
        color: "white"
    }
})

