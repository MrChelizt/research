import React from "react";
import {StyleSheet, Text, View} from "react-native";
import EnglishText from "../constants/englishText";

export const SplashScreen = props => {

    return (
        <View style={styles.container}>
            <Text style={styles.splash}>{EnglishText.splashText}</Text>
        </View>
    );
};

const styles = StyleSheet.create({
        container: {
            flex:1,
            margin: 5,
            justifyContent: "center",
            alignContent: "center"
        },
        splash: {
            textAlign: "center",
            fontSize: 25
        }
    }
)
