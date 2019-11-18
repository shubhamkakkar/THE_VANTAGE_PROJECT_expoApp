import React from 'react'
import { View, StyleSheet, TextInput } from 'react-native'
import { FormFields, TouchableOpacityCustom } from "../../../UI"
import { useMutation } from "@apollo/react-hooks";
import { LOGIN_MUTATION, SIGNIN_MUTATION } from "../../../gql/Authentication";

export default function Form({ isLogin }) {
    const [email, setEmail] = React.useState("")
    const [password, setPassword] = React.useState("")
    const [confirmPassword, setConfirmPassword] = React.useState("")
    const [authenticationSignin] = useMutation(SIGNIN_MUTATION);
    const [authenticationLogin] = useMutation(LOGIN_MUTATION);

    let loginForm = [
        {
            label: "email",
            type: "emailAddress",
            value: email,
            onChangeFn: (value) => setEmail(value)
        },
        {
            label: "password",
            type: "password",
            value: password,
            onChangeFn: (value) => setPassword(value)
        }
    ];


    function loginAuthenticator({ email, password }) {
        authenticationLogin({ variables: { email, password } })
            .then(({ data: { login: { __typename, ...loginProps } } }) => {
                console.log({ loginProps })
            })
            .catch(({ graphQLErrors }) => {
                const { message } = graphQLErrors[0];
                alert(message);
                console.log({ message });
            });
    }

    function signupAuthenticator({ email, password }) {
        authenticationSignin({ variables: { email, password } })
            .then(({ data: { signin: { __typename, ...signinProps } } }) =>
                console.log({ signinProps })
            )
            .catch(({ graphQLErrors }) => {
                const { message } = graphQLErrors[0];
                alert(message);
                console.log({ message });
            });
    }

    function authenticationAction() {

        if (email.trim().length && password.trim().length) {
            if (isLogin) {
                loginAuthenticator({ email, password });
            } else {
                if (confirmPassword.trim().length) {
                    if (password === confirmPassword) {
                        signupAuthenticator({ email, password });
                    } else {
                        alert("Passwords did not match")
                    }
                } else {
                    alert("fill in all the details")
                }
            }
        } else {
            alert("fill in all the details")
        }

    }

    function renderForm() {
        if (!isLogin) {
            loginForm = [
                ...loginForm,
                {
                    label: "Confirm Password",
                    type: "password",
                    value: confirmPassword,
                    onChangeFn: (value) => setConfirmPassword(value)
                }
            ]
        }

        return loginForm.map(({ label, onChangeFn, value, type }, key) => <TextInput
            multiline={true}
            onChangeText={(value) => onChangeFn(value)}
            placeholder={label.toUpperCase()}
            placeholderTextColor="black"
            secureTextEntry={type === "password"}
            {...{ value, key }}
        />)
    }

    function RenderButton() {
        const buttonAr = [
            {
                title: "signup",
                color: "white",
                backgroundColor: "#f5576c"
            },
            {
                title: "login",
                color: "white",
                backgroundColor: "#f5576c"
            },

        ];

        let selection = buttonAr[0];
        if (isLogin) {
            selection = buttonAr[1]
        }
        const { title, color, backgroundColor } = selection;
        const MemorizedButton = React.memo(() => (
            <View style={styles.buttonContainer}>
                <TouchableOpacityCustom  {...{
                    title,
                    onPress: authenticationAction,
                    touchableOpacityStyle: [styles.touchableOpacityStyle, { backgroundColor, borderColor: color }],
                    textStyle: [styles.textStyle, { color }]
                }} />
            </View>
        ), [isLogin])
        return <MemorizedButton />

    }

    return (
        <View style={styles.container}>
            <View style={styles.formContainer}>
                {renderForm()}
            </View>
            <RenderButton />
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
    },
    formContainer: {
        flex: 1
    }
})


