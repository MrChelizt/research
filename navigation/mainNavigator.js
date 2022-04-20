import React from "react";
import {createStackNavigator} from "react-navigation-stack";
import {SignUpScreen} from "../screens/signUpScreen";
import {SurveyScreen} from "../screens/surveyScreen";
import {SurveyDetailScreen} from "../screens/surveyDetailScreen";

import {createSwitchNavigator, createAppContainer} from "react-navigation";
import {FinishScreen} from "../screens/finishScreen";
import {EmailValidationScreen} from "../screens/emailValidationScreen";
import {SplashScreen} from "../screens/splashScreen";
import {StartSurveyScreen} from "../screens/startScreen";


const EmailNavigatorStack = createStackNavigator({
    EmailValidation: EmailValidationScreen,
    Splash: SplashScreen
}, {defaultNavigationOptions: {headerShown: false}});

const SignUpNavigatorStack = createStackNavigator({
    SignUp: SignUpScreen
}, {defaultNavigationOptions: {headerShown: false}});

const SurveyNavigatorStack = createStackNavigator({
    StartSurvey: StartSurveyScreen,
    Survey: SurveyScreen,
    SurveyDetail: SurveyDetailScreen,
    Finish: FinishScreen
}, {defaultNavigationOptions: {headerShown: false}});

const MainNavigator = createSwitchNavigator({
    SignUp: SignUpNavigatorStack,
    Survey: SurveyNavigatorStack,
});

export default createAppContainer(MainNavigator);
export const EmailNavigator = createAppContainer(EmailNavigatorStack);
export const SurveyNavigator = createAppContainer(SurveyNavigatorStack);
