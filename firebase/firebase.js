import {initializeApp } from "firebase/app";
import {getDatabase} from "firebase/database";
import {firebaseConfig} from "../config";

class Firebase {
    constructor() {
        initializeApp(firebaseConfig);
        this.db = getDatabase();
    }
}

const firebase = new Firebase();
export default firebase;
