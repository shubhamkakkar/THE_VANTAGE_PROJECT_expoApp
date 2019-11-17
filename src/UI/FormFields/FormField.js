import React from 'react'
import { TextInput, View, StyleSheet, Text } from 'react-native'


export default function FormField({ type, label, onChange }) {
    return (
        <View style={classes.formItems}>
            <View style={classes.formLabel}>
                <Text>
                    {label.toUpperCase()} :
                </Text>
            </View>
            <TextInput
                style={classes.formInput}
                onChangeText={text => onChange(text, label)}
                textContentType={type}
            />
        </View>
    )
}

const classes = StyleSheet.create({
    formItems: {

    },
    formLabel: {

    },
    formInput: {

    }
})

