import React from "react";
import {StyleSheet, View, Text} from "react-native"
import CustomButton from "../components/UI/customButton";
import EnglishText from "../constants/englishText";
import PushNotification from "react-native-push-notification";

export const FinishScreen = props => {

    function getRandom(min, max) {
        min = Math.ceil(min);
        max = Math.floor(max);
        return Math.floor(Math.random() * (max - min + 1) + min);
    }

    return (
        <View style={styles.container}>
            <Text style={styles.text}>{EnglishText.thankYouText}</Text>
            <CustomButton
                text={EnglishText.finish}
                bordered
                onPress={() => {
                    PushNotification.localNotificationSchedule({
                        channelId: "research-channel", // (required) channelId, if the channel doesn't exist, notification will not trigger.
                        message: EnglishText.notificationText, // (required)
                        date: new Date(Date.now() + getRandom(22, 26) * 1000 * 60 * 60),
                        allowWhileIdle: true,
                    });
                    props.navigation.popToTop();
                }}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        padding: '5%',
        justifyContent: "center",
        paddingTop: '50%'
    },
    text: {
        textAlign: "center",
        fontSize: 30,
        marginVertical: "15%"
    }
})
