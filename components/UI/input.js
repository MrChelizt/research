import React, {useReducer} from "react";
import {StyleSheet, Text, TextInput, View} from "react-native";
import ModalDropdown from "react-native-modal-dropdown";
import EnglishText from "../../constants/englishText";

const INPUT_CHANGE = 'INPUT_CHANGE';
const INPUT_BLUR = 'INPUT_BLUR';

const GENDER_OPTIONS = [
    EnglishText.male,
    EnglishText.female,
    EnglishText.transMale,
    EnglishText.transFemale];
const GENDER_CODES = ["M", "F", "TM", "TF"]

const inputReducer = (state, action) => {
    switch (action.type) {
        case INPUT_CHANGE:
            return {
                ...state,
                value: action.value,
                isValid: action.isValid
            };
        case INPUT_BLUR:
            return {
                ...state,
                touched: true,
            };
        default:
            return state;
    }

};

const assignUser = (index, dispatch, id, onInputChange) => {
    onInputChange(id, GENDER_CODES[index], true);
    dispatch({
        type: INPUT_BLUR
    })
    dispatch({type: INPUT_CHANGE, value: GENDER_CODES[index], isValid: true});
};

const Input = props => {

    const [inputState, dispatch] = useReducer(inputReducer, {
        value: props.initialValue ? props.initialValue : '',
        isValid: false,
        touched: false
    });

    const {onInputChange, id} = props;

    const lostFocusHandler = () => {
        dispatch({
            type: INPUT_BLUR
        })
    };

    const textChangeHandler = text => {
        text = text.trim();
        const emailRegex = /^[\w!#$%&’*+\=?`{|}~^-]+(?:\.[\w!#$%&’*+\=?`{|}~^-]+)*@(?:[a-zA-Z0-9-]+\.)+[a-zA-Z]{2,6}$/;
        // US zip code regex
        const zipCodeRegex = /(^\d{5}$)|(^\d{5}-\d{4}$)/;
        let isValid = true;
        if (props.required && text.length === 0) {
            isValid = false;
        } else if (props.email && !emailRegex.test(text.toLowerCase())) {
            isValid = false;
        } else if (props.zipCode && !zipCodeRegex.test(text.toLowerCase())) {
            isValid = false;
        } else if (props.min != null && +text < props.min) {
            isValid = false;
        } else if (props.max != null && +text > props.max) {
            isValid = false;
        } else if (props.minLength != null && text.length < props.minLength) {
            isValid = false;
        }
        onInputChange(id, text, isValid);
        dispatch({type: INPUT_CHANGE, value: text, isValid: isValid});
    };

    if (props.type === "Text") {
        return (
            <View style={styles.formControl}>
                <Text style={styles.label}>
                    {props.label}
                </Text>
                <TextInput
                    {...props}
                    style={styles.input}
                    value={inputState.value}
                    onChangeText={textChangeHandler}
                    onBlur={lostFocusHandler}
                />
                {!inputState.isValid && inputState.touched && (
                    <View style={styles.errorContainer}>
                        <Text style={styles.errorText}>
                            {props.errorText}
                        </Text>
                    </View>
                )}
            </View>
        );
    } else if (props.type === "Dropdown") {
        return (
            <View style={styles.formControl}>
                <Text style={styles.label}>
                    {props.label}
                </Text>
                <ModalDropdown
                    options={GENDER_OPTIONS}
                    onSelect={(index) => assignUser(index, dispatch, id, onInputChange)}
                    style={styles.inputDropdown}
                    dropdownStyle={styles.dropdown}
                    dropdownTextStyle={styles.dropdownText}
                />
                {!inputState.isValid && inputState.touched && (
                    <View style={styles.errorContainer}>
                        <Text style={styles.errorText}>
                            {props.errorText}
                        </Text>
                    </View>
                )}
            </View>
        );
    }
};

const styles = StyleSheet.create({
    formControl: {
        width: '100%'
    },
    label: {
        marginVertical: 8,
        width: '90%',
        fontSize: 18
    },
    input: {
        paddingHorizontal: 2,
        paddingVertical: '3%',
        borderColor: "grey",
        borderWidth: 0.5,
        borderRadius: 5,
        marginBottom: 10
    },
    inputDropdown: {
        paddingHorizontal: 2,
        paddingVertical: '4.5%',
        borderColor: "grey",
        borderWidth: 0.5,
        borderRadius: 5,
        marginBottom: 10
    },
    dropdown: {
        justifyContent: "space-evenly",
        width: '88%'
    },
    dropdownText: {
        textAlign: "center",
        fontSize: 15
    },
    errorContainer: {
        marginVertical: 5
    },
    errorText: {
        color: 'red',
        fontSize: 13
    },
});

export default Input;

