import firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";
import "firebase/storage";

// Your web app's Firebase configuration
var firebaseConfig = {
  apiKey: "AIzaSyC0iq_vDf1y_A10HsAwEbiFRXzweP1D0cE",
  authDomain: "nextjsblog-6effa.firebaseapp.com",
  projectId: "nextjsblog-6effa",
  storageBucket: "nextjsblog-6effa.appspot.com",
  messagingSenderId: "632056319922",
  appId: "1:632056319922:web:a5abae36ea626823241eab",
};
// Initialize Firebase
if (!firebase.apps.length) firebase.initializeApp(firebaseConfig);

const auth = firebase.auth();
const db = firebase.firestore();
const storage = firebase.storage();
const serverTimeStamp = firebase.firestore.FieldValue.serverTimestamp;

export { auth, db, storage, serverTimeStamp };
