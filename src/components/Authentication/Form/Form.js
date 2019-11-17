import React from 'react'
import { ScrollView, View, Text, StyleSheet } from 'react-native'
import { FormFields } from "../../../UI"


const initialState = {
    email: "",
    password: "",
    confirmPassword: ""
};




export default function Form({ isLogin }) {

    let loginForm = [
        {
            label: "email",
            type: "emailAddress"
        },
        {
            label: "password",
            type: "password"
        }
    ];

    const [userCredentials, setUserCredentials] = React.useState(initialState);
    const [isLoginActive, setLogin] = React.useState(isLogin);
    function onChangeText({ text, label }) {

    }
    function RenderForm() {
        if (!isLogin) {
            loginForm = [
                ...loginForm,
                {
                    label: "Confirm Password",
                    type: "password"
                }
            ]
        }

        return <FormFields {...{ loginForm, onChange: onChangeText }} />

    }
    return (
        <View style={styles.container}>
            <RenderForm />
        </View>
    )
}


const styles = StyleSheet.create({
    container: {
        flex: 2,
        backgroundColor: "white",
        borderTopLeftRadius: 30,
        borderTopRightRadius: 30,
        padding: 20,
        justifyContent: "center"
    }
})

