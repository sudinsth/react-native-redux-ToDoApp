import firebase from "firebase";
import "@firebase/firestore";
import ReduxSagaFirebase from "redux-saga-firebase";
import { firebaseConfig } from "../constants/firebase_config";

const firebaseApp = firebase.initializeApp(firebaseConfig);

const rsf = new ReduxSagaFirebase(firebaseApp);

export default rsf;
