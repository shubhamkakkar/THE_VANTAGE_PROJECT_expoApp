import React from 'react'
import { ScrollView, KeyboardAvoidingView } from 'react-native'
import FormField from "./FormField"
export default function FormFields({ loginForm, onChange }) {
    return (
        <KeyboardAvoidingView behavior="padding" style={{ flex: 1 }}>
            {
                loginForm.map(({ type, label }, key) => <FormField {...{ type, label, key, onChange }} />)
            }
        </KeyboardAvoidingView>
    )
}