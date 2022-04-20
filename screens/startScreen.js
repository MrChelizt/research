import React from "react";
import {StyleSheet, View} from "react-native"
import CustomButton from "../components/UI/customButton";
import EnglishText from "../constants/englishText";

export const StartSurveyScreen = props => {

    return (
        <View style={styles.container}>
            <CustomButton
                text={EnglishText.startNewSurvey}
                bordered
                onPress={() => {
                    props.navigation.navigate("Survey", {});
                }}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        padding: '5%',
        justifyContent: "center",
        paddingTop: '70%'
    },
})
