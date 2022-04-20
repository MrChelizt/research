import React from "react";
import {View, StyleSheet, Text} from "react-native";
import CustomButton from "../components/UI/customButton";
import EnglishText from "../constants/englishText";
import * as surveyActions from "../store/actions/survey";
import {useDispatch} from "react-redux";


export const SurveyDetailScreen = props => {

    const dispatch = useDispatch();

    const currentLocation = props.navigation.getParam('location');
    const currentSecurityLevel = props.navigation.getParam('securityLevel');
    const locationText = currentLocation === 0 ? "inside" : "outside";

    let date = new Date().getDate();
    let month = new Date().getMonth() + 1;
    let year = new Date().getFullYear();
    let hours = new Date().getHours();
    let min = new Date().getMinutes();
    let sec = new Date().getSeconds();

    let surveyDate= (date + '/' + month + '/' + year + ' ' + hours + ':' + min + ':' + sec);

    const finishSurvey = async (locationDetail) => {
        await dispatch(
            surveyActions.createSurvey(
                currentSecurityLevel,
                currentLocation,
                locationDetail,
                surveyDate
            )
        );
        props.navigation.navigate('Finish', {});
    };

    return (
        <View style={styles.container}>
            <Text style={styles.text}>
                {EnglishText.question.replace("${location}", locationText)}
            </Text>
            <CustomButton
                text={currentLocation === 0 ? EnglishText.publicTransport : EnglishText.privatePropertyResidential}
                bordered
                onPress={() => finishSurvey(1)}
            />
            <CustomButton
                text={currentLocation === 0 ? EnglishText.privateCar : EnglishText.onTheStreet}
                bordered
                onPress={() => finishSurvey(2)}
            />
            <CustomButton
                text={currentLocation === 0 ? EnglishText.publicBuilding : EnglishText.publicPark}
                bordered
                onPress={() => finishSurvey(3)}
            />
            <CustomButton
                text={currentLocation === 0 ? EnglishText.residential : EnglishText.privatePropertyNonResidential}
                bordered
                onPress={() => finishSurvey(4)}
            />
            <CustomButton
                text={EnglishText.other}
                bordered
                onPress={() => finishSurvey(5)}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        padding: '5%',
        justifyContent: "space-around",
        height: '100%',
        paddingBottom: '25%'
    },
    text: {
        padding: '10%',
        fontSize: 30,
        textAlign: "center"
    },
});
