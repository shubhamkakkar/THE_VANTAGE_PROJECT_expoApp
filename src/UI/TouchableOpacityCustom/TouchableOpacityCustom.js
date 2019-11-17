import React from 'react'
import { TouchableOpacity, Text, StyleSheet } from "react-native"

export default function TouchableOpacityCustom({ onPress, title, touchableOpacityStyle, textStyle }) {
    return (
        <TouchableOpacity style={[styles.customStyleContainer, touchableOpacityStyle]} {...{ onPress }}>
            <Text style={[styles.customTextStyle, textStyle]}> {title.toUpperCase()} </Text>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    customStyleContainer: {
        padding: 10,
        borderRadius: 20,
        borderWidth: 1

    },
    customTextStyle: {

    }
});
