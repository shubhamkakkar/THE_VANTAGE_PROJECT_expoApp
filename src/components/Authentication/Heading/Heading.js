import React from 'react'
import { View, Text, StyleSheet } from 'react-native'
export default function Heading({ isLogin }) {
    return (
        <View style={styles.container}>
            <Text style={styles.headingText}>
                {isLogin ? "Nice to see agian" : "Let's begin the journey"}
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

