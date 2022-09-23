import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

export const app = initializeApp({
    apiKey: "AIzaSyB4dh7Zb_Wl70ULd451XtUyOd8yW74HUBU",
    authDomain: "notice-app-ab56a.firebaseapp.com",
    projectId: "notice-app-ab56a",
    storageBucket: "notice-app-ab56a.appspot.com",
    messagingSenderId: "971671460746",
    appId: "1:971671460746:web:1143edc034ccbe47048673",
    measurementId: "G-6DK42WMMNL",
});

export const db = getFirestore(app);
export const auth = getAuth(app);
