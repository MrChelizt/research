import {CREATE_USER} from "../actions/user";
import User from "../../models/user";

const initialState = {
    user: null
}

export default (state = initialState, action) => {
    switch (action.type) {
        case CREATE_USER:
            const newUser = new User(action.userData.age, action.userData.gender, action.userData.zipcode);
            return {
                ...state,
                user: newUser
            }
    }
    return state;
};
