import React, { PureComponent } from 'react'
import { View, StyleSheet, Image, Text } from 'react-native'
import { TouchableOpacityCustom, Heading } from "../../../UI"

function ImageContainer() {
    return (
        <View style={styles.imageContainer}>
            <Image
                style={styles.image}
                source={{ uri: "https://cdn.dribbble.com/users/101713/screenshots/5711599/illustration.jpg" }} />
        </View>

    )
}

export default class Home extends PureComponent {

    render() {
        const touchableOpacityCustomProps = {
            onPress: () => this.props.navigation.navigate("Test"),
            title: "Revise on the Go",
            touchableOpacityStyle: styles.touchableOpacityStyle,
            textStyle: styles.textStyle
        }
        return (
            <View style={styles.container}>
                <View style={styles.headingContainer}>
                    <Heading title="NEET PREP" color="#3e92cc" fontWeight="normal" />
                </View>
                <ImageContainer />
                <View style={styles.buttonContainer}>
                    <TouchableOpacityCustom {...{ ...touchableOpacityCustomProps }} />
                </View>

            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingHorizontal: 5
    },
    headingContainer: {
        flex: 1,
        justifyContent: "center",
    },
    imageContainer: {
        flex: 2,
        justifyContent: "center",
    },
    image: {
        flex: 1,
        width: null,
        height: null,
        resizeMode: "contain"
    },
    buttonContainer: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center"
    },
    touchableOpacityStyle: {
        borderColor: "#2199e8",
        elevation: 1,
        backgroundColor: "white"
    },
    textStyle: {
        color: "#2199e8"
    }

})
