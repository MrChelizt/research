import React, {useState} from "react";
import {View, StyleSheet, Text, Modal} from "react-native";
import CustomButton from "../components/UI/customButton";
import {BlurView} from "expo-blur";
import EnglishText from "../constants/englishText";

export const SurveyScreen = props => {

    const [modalVisible, setModalVisible] = useState(false);

    const openDialog = (securityLevel) => {
        setModalVisible(true);
        global.currentSecurityLevel = securityLevel;
    };

    const openSurvey = (location, currentSecurityLevel) => {
        setModalVisible(false);
        props.navigation.navigate('SurveyDetail', {location: location, securityLevel: global.currentSecurityLevel});
    };

    return (
        <View style={styles.container}>
            <View>
                <Modal
                    animationType='fade'
                    transparent={true}
                    visible={modalVisible}
                >
                    <BlurView intensity={20} tint={"dark"} style={styles.contentWrap}>
                        <View style={styles.modalContainer}>
                            <View style={styles.modalBody}>
                                <Text>{EnglishText.locationQuestion}</Text>
                                <CustomButton
                                    text={EnglishText.inside}
                                    bordered
                                    onPress={() => openSurvey(0, currentSecurityLevel)}
                                />
                                <CustomButton
                                    text={EnglishText.outside}
                                    bordered
                                    onPress={() => openSurvey(1, currentSecurityLevel)}
                                />
                            </View>
                        </View>
                    </BlurView>
                </Modal>
            </View>
            <Text style={styles.text}>
                {EnglishText.surveyQuestion}
            </Text>
            <CustomButton
                text={EnglishText.verySafe}
                bordered
                onPress={() => openDialog(5)}
            />
            <CustomButton
                text={EnglishText.safe}
                bordered
                onPress={() => openDialog(4)}
            />
            <CustomButton
                text={EnglishText.safeUnsafe}
                bordered
                onPress={() => openDialog(3)}
            />
            <CustomButton
                text={EnglishText.unsafe}
                bordered
                onPress={() => openDialog(2)}
            />
            <CustomButton
                text={EnglishText.veryUnsafe}
                bordered
                onPress={() => openDialog(1)}
            />
            <Text style={styles.warningText}>{EnglishText.emergencyText}</Text>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        padding: '5%',
        justifyContent: "space-around",
        height: '100%'
    },
    text: {
        padding: '10%',
        fontSize: 30,
        textAlign: "center"
    },
    warningText: {
        paddingTop: '20%',
        paddingHorizontal: '10%',
        margin: '5%',
        color: "red",
        textAlign: "center"
    },
    modalContainer: {
        backgroundColor: 'white',
        padding: '2%',
        height: '25%',
        width: '80%',
        justifyContent: "center",
        alignItems: "center"
    },
    modalBody: {
        flex: 1,
        justifyContent: 'space-around'
    },
    blurContainer: {
        flex: 1,
        justifyContent: "center"
    },
    contentWrap: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center"
    },
});
