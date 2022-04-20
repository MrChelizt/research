import uuid from "react-native-uuid";
import firebase from "../../firebase/firebase";
import {ref, set} from "firebase/database";
import AsyncStorage from "@react-native-async-storage/async-storage";

export const createSurvey = (securityLevel, location, locationDetail, surveyDate) => {
    return async () => {

        const id = uuid.v4();

        let userTokenString = await AsyncStorage.getItem('userToken');
        let userToken = JSON.parse(userTokenString);



        await set(ref(firebase.db, 'surveys/' + id), {
                id: userToken.id,
                age: userToken.age,
                gender: userToken.gender,
                zipcode: userToken.zipcode,
                surveyDate: surveyDate,
                location: location,
                securityLevel: securityLevel,
                locationDetail: locationDetail
            }
        );
    };
}

