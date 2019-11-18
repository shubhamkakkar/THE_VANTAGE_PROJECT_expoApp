import React from 'react'
import { ScrollView, TextInput, View, StyleSheet, Text, } from 'react-native'


export default function FormField({ value, index, type, label, onChange }) {
    return (
        <View style={classes.formItems}>
            <View style={classes.formLabel}>
                <Text style={classes.formLabelText}>
                    {label} :
                </Text>
            </View>
            <TextInput
                style={classes.formInput}
                onChangeText={text => onChange({ text, label })}
                textContentType={type}
                {...{ value }}
            />
        </View>

    )
}

// export default function FormField({ label }) {
//     const [value, onChange] = React.useState("")
//     const Input = (
//         <View style={classes.formItems}>
//             <View style={classes.formLabel}>
//                 <Text style={classes.formLabelText}>
//                     {label} :
//                 </Text>
//             </View>
//             <TextInput
//                 style={classes.formInput}
//                 onChangeText={text => onChange({ text, label })}
//                 // textContentType={type}
//                 {...{ value }}
//             />
//         </View>
//     )

//     return [value, Input]

// }

const classes = StyleSheet.create({
    formItems: {
        flexDirection: "row",
        marginBottom: 5,
        paddingVertical: 10,
    },
    formLabel: {
        flex: 1,
    },
    formLabelText: {
        textTransform: "capitalize"
    },
    formInput: {
        flex: 2,
        borderBottomWidth: 1,

    }
})

