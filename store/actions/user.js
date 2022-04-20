import User from "../../models/user";
import uuid from "react-native-uuid";
import AsyncStorage from "@react-native-async-storage/async-storage";

export const CREATE_USER = "CREATE_USER";

export const createUser = (age, gender, zipcode) => {
    return async (dispatch, getState) => {
        const id = uuid.v4();


        const user = new User(id, age, gender, zipcode);
        await AsyncStorage.setItem('userToken', JSON.stringify(user));

        dispatch({
            type: CREATE_USER,
            userData: {
                id,
                age,
                gender,
                zipcode,
            }
        });
    };
}
