import React from "react"
import { Text, TouchableOpacity, View } from "react-native";
import { TouchableOpacityCustom } from "../../../UI";

const s = {
    text: {
        color: "black",
        textAlign: "center"
    },
    container: {
        flex: 1,
        justifyContent: "center"
    },
    questionText: {
        fontSize: 18
    },
    answerContainer: {
        justifyContent: "center",
        borderRadius: 20,
        borderColor: "#f5576c",
        borderWidth: 2,
        marginBottom: 10
    },
    answerContainerSelected: {
        justifyContent: "center",
        borderRadius: 20,
        borderColor: "#2199e8",
        borderWidth: 2,
        marginBottom: 10
    },
    answerText: {
        padding: 10
    },
    touchableOpacityStyle: {
        borderColor: "#2199e8",
        elevation: 1,
        backgroundColor: "#2199e8",
        borderRadius: 30
    },
    textStyle: {
        color: "white"
    }
};

function Question({ question }) {
    return (
        <View style={[s.container, { alignItems: "center", justifyContent: "center", marginBottom: 10 }]}>
            <Text style={[s.text, s.questionText,]}>
                {question} ?
            </Text>
        </View>
    )
}

function Options({ _id, answer, optionAction, options }) {
    return (
        <View style={{ flex: 1, justifyContent: "center", }}>
            {
                options.map((value, key) => (
                    <TouchableOpacity
                        {...{ key }}
                        onPress={() => optionAction({ _id, index: key })}
                        style={[key === answer ? s.answerContainerSelected : s.answerContainer]}>
                        <Text style={[s.text, s.answerText,]}>
                            {value}
                        </Text>
                    </TouchableOpacity>
                ))
            }
        </View>
    )
}

function Submit({ title, onPress }) {
    return <View style={{ justifyContent: "center", alignItems: title === "Submit Quiz!" ? "center" : "flex-end" }}>
        <TouchableOpacityCustom  {...{ onPress, title, touchableOpacityStyle: s.touchableOpacityStyle, textStyle: s.textStyle }} />
    </View>
}

export {
    Question,
    Options,
    Submit
}
