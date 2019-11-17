import React from 'react'
import { View, Text } from 'react-native'
import FormField from "./FormField"
export default function FormFields({ loginForm, onChange }) {
    return (
        <View>
            {
                loginForm.map(({ type, label }, key) => <FormField {...{ type, label, key, onChange }} />)
            }
        </View>
    )
}