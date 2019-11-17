import React from 'react'
import { ScrollView, View, Text, StyleSheet } from 'react-native'
import { FormFields, TouchableOpacityCustom } from "../../../UI"


const initialState = {
    email: "",
    password: "",
    confirmPassword: ""
};


function buttonMaps(authentication) {
    return [
        {
            title: "signup",
            color: "white",
            backgroundColor: "#f5576c"
        },
        {
            title: "login",
            color: "#f5576c",
            backgroundColor: "white"
        },

    ].map(({ title, color, backgroundColor }, key) => <TouchableOpacityCustom  {...{
        title,
        key,
        onPress: () => authentication({ key, title }),
        touchableOpacityStyle: [styles.touchableOpacityStyle, { backgroundColor, borderColor: color }],
        textStyle: [styles.textStyle, { color }]
    }} />)
}

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

    function authenticationAction({ key, title }) {
        if (isLoginActive) {
            // in login
            if (title === "signup") {
                setLogin(false)
            } else {
                //login mutation
            }
        } else {
            if (title === "signup") {
                // signin mutation
            } else {
                setLogin(true)

            }
        }
    }
    function RenderForm() {
        if (!isLoginActive) {
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
            <View style={styles.buttonContainer}>
                {
                    isLoginActive ? buttonMaps(authenticationAction) : buttonMaps(authenticationAction).reverse()
                }
            </View>
        </View>
    )
}


const styles = StyleSheet.create({
    container: {
        flex: 2,
        backgroundColor: "white",
        borderTopLeftRadius: 30,
        borderTopRightRadius: 30,
        paddingVertical: 20,
        paddingHorizontal: 30
    },
    buttonContainer: {
        flex: 1
    }
})

