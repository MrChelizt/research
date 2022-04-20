import React, {useCallback, useReducer} from "react";
import {View, StyleSheet, Alert, Text, ScrollView} from "react-native";
import Input from "../components/UI/input";
import CustomButton from "../components/UI/customButton";
import * as userActions from "../store/actions/user";
import EnglishText from "../constants/englishText";
import {useDispatch} from "react-redux";

const FORM_INPUT_UPDATE = "FORM_INPUT_UPDATE";

const formReducer = (state, action) => {
    if (action.type === FORM_INPUT_UPDATE) {
        const updatedValues = {
            ...state.inputValues,
            [action.input]: action.value
        };
        const updatedValidities = {
            ...state.inputValidities,
            [action.input]: action.isValid
        };
        let updatedFormIsValid = true;
        for (const key in updatedValidities) {
            updatedFormIsValid = updatedFormIsValid && updatedValidities[key];
        }
        return {
            formIsValid: updatedFormIsValid,
            inputValidities: updatedValidities,
            inputValues: updatedValues
        };
    }
    return state;
};

export const SignUpScreen = props => {

    const dispatch = useDispatch();

    const state = {
        inputValues: {
            age: "",
            gender: null,
            zipCode: ""
        },
        inputValidities: {
            age: false,
            gender: false,
            zipCode: false
        },
        formIsValid: false
    };

    const [formState, dispatchFormState] = useReducer(formReducer, state);

    const inputChangeHandler = useCallback(
        (inputIdentifier, inputValue, inputValidity) => {
            dispatchFormState({
                type: FORM_INPUT_UPDATE,
                value: inputValue,
                isValid: inputValidity,
                input: inputIdentifier
            });
        },
        [dispatchFormState]
    );

    const createUser = useCallback(
        async () => {

            if (!formState.formIsValid) {
                Alert.alert(EnglishText.formIsWalidWarning, EnglishText.formIsWalidWarningText, [{text: EnglishText.okay}]);
                return;
            }
            try {
                await dispatch(
                    userActions.createUser(
                        formState.inputValues.age,
                        formState.inputValues.gender,
                        formState.inputValues.zipCode
                    )
                );
                props.navigation.navigate('Survey',{});
            } catch (err) {
                console.log(err);
            }
        });

    return (
        <ScrollView style={styles.container}>
            <View style={styles.textContainer}>
                <Text style={styles.text}>{EnglishText.signUp}</Text>
            </View>
            <Input
                id="age"
                label={EnglishText.age}
                type="Text"
                errorText={EnglishText.ageWarning}
                keyboardType="number-pad"
                returnKeyType="next"
                onInputChange={inputChangeHandler}
                required
            />
            <Input
                id="gender"
                label={EnglishText.gender}
                type="Dropdown"
                errorText={EnglishText.genderWarning}
                returnKeyType="next"
                onInputChange={inputChangeHandler}
                required
            />
            <Input
                id="zipCode"
                label={EnglishText.zipCode}
                type="Text"
                errorText={EnglishText.zipCodeWarning}
                keyboardType="number-pad"
                returnKeyType="next"
                onInputChange={inputChangeHandler}
                zipCode
                required
            />
            <View style={styles.buttonContainer}>
                <CustomButton
                    text={EnglishText.createDemographic}
                    bordered
                    onPress={createUser}
                />
            </View>
        </ScrollView>
    );
};
const styles = StyleSheet.create({
    container: {
        padding: '5%'
    },
    buttonContainer: {
        paddingVertical:'10%',
        width: "100%"
    },
    textContainer: {
        paddingTop:'20%',
        paddingBottom:'5%',
        justifyContent: "center",
        alignItems: "center"
    },
    text: {
        fontSize: 30
    }
});
