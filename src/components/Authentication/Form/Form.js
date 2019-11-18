import React from 'react'
import { View, StyleSheet, TextInput, Text } from 'react-native'
import { connect } from "react-redux"
import { withNavigation } from "react-navigation"
import { TouchableOpacityCustom } from "../../../UI"
import { useMutation } from "@apollo/react-hooks";
import { LOGIN_MUTATION, SIGNIN_MUTATION } from "../../../gql/Authentication";
import { tokenAction } from "../../../store/actions"

function Form({ isLogin, setToken, ...rest }) {
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
            .then(({ data: { login: { __typename, token } } }) => {
                setToken(token)
                rest.navigation.navigate("Home")
            })
            .catch(({ graphQLErrors }) => {
                console.log({ graphQLErrors })
                const { message } = graphQLErrors[0];
                alert(message);
                console.log({ message });
            });
    }

    function signupAuthenticator({ email, password }) {
        authenticationSignin({ variables: { email, password } })
            .then(({ data: { signin: { __typename, token } } }) => {
                setToken(token)
                rest.navigation.navigate("Home")
            })
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

        return loginForm.map(({ label, onChangeFn, value, type }, key) => (
            <View style={{ flexDirection: "row" }} {...{ key }}  >
                <View style={{ flex: 1, justifyContent: "center" }}>
                    <Text style={{ textTransform: "capitalize" }}>{label}</Text>
                </View>

                <TextInput
                    multiline={true}
                    onChangeText={(value) => onChangeFn(value)}
                    placeholderTextColor="black"
                    secureTextEntry={type === "password"}
                    {...{ value, key }}
                    style={{
                        borderBottomWidth: 1,
                        flex: 2
                    }}
                />
            </View>
        ))
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

const mapDispatchToProps = dispatch => ({
    setToken: (token) => dispatch(tokenAction(token))
});


export default withNavigation(connect(null, mapDispatchToProps)(Form))
