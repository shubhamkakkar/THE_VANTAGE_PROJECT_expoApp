import React from "react";
import { View, Image, Text, StyleSheet } from "react-native";
import Constants from 'expo-constants'
import source from "../../../../assets/images/vantage-logo.png"
import { TouchableOpacityCustom } from "../../../UI";

// export default function GettingStarted(props) {

//     function buttonAction({ index }) {
//         if (index) {
//             console.log("login")
//         } else {
//             console.log("signp")
//         }

//         return (
//             <View style={styles.container}>
//                 <Image {...{ source }} style={[styles.image, { marginTop: Constants.statusBarHeight }]} />
//                 <View style={styles.informationAndAction}>
//                     <View style={styles.logoTextContainer}>
//                         <Text>
//                             THE VANTAGE PROJECT
//                        </Text>
//                     </View>
//                     <View style={styles.buttons}>
//                         {
//                             [
//                                 'login',
//                                 'signup'
//                             ].map((title, key) => <TouchableOpacityCustom {...{ title, key, onPress: () => buttonAction({ index }) }} />)
//                         }
//                     </View>
//                 </View>
//             </View>
//         );
//     }
// }

export default class GettingStarted extends React.PureComponent {

    buttonAction = ({ key }) => {
        const { navigation } = this.props
        if (key) {
            navigation.navigate("Authentication", { isLogin: true })
        } else {
            navigation.navigate("Authentication", { isLogin: false })
        }
    }

    render() {
        return (
            <View style={styles.container}>
                <Image {...{ source }} style={[styles.image, { marginTop: Constants.statusBarHeight }]} />
                <View style={styles.informationAndAction}>
                    <View style={styles.logoTextContainer}>
                        <Text style={styles.logoText}>
                            THE VANTAGE PROJECT
                       </Text>
                    </View>
                    <View style={styles.buttons}>
                        {
                            [
                                {
                                    title: "signup",
                                    color: "white",
                                    backgroundColor: "#2199e8"
                                },
                                {
                                    title: "login",
                                    color: "#2199e8",
                                    backgroundColor: "white"
                                },

                            ].map(({ title, color, backgroundColor }, key) => <TouchableOpacityCustom
                                {...{
                                    title,
                                    key,
                                    onPress: () => this.buttonAction({ key }),
                                    touchableOpacityStyle: [styles.touchableOpacityStyle, { backgroundColor, borderColor: color }],
                                    textStyle: [styles.textStyle, { color }]
                                }} />)
                        }
                    </View>
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    image: {
        flex: 1,
        width: null,
        height: null,
        resizeMode: "contain"
    },
    informationAndAction: {
        flex: 1,
    },
    logoTextContainer: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",

    },
    logoText: {
        fontSize: 18
    },
    buttons: {
        flex: 1,
        flexDirection: "row",
        justifyContent: "space-around",
        alignItems: "center",

    },
    touchableOpacityStyle: {

    },
    textStyle: {

    }
});

