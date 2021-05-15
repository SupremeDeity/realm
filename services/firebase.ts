import firebase from "firebase/app";
import "firebase/analytics";
import "firebase/auth";

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: "realm-8b857.appspot.com",
  messagingSenderId: "235667941752",
  appId: "1:235667941752:web:45c7743fb8d7dbf478c08d",
  measurementId: "G-N8RCY4GJD7",
};

const initializeFirebase = () => {
    if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
    }
}

export default initializeFirebase;