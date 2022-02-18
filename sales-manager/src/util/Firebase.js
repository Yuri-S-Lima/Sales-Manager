import firebase from 'firebase';

let config = {
    apiKey: "AIzaSyCu3ACossFEyhYeIq4eJg0U3huXetxHar0",
    authDomain: "sis-produtos-v1.firebaseapp.com",
    projectId: "sis-produtos-v1",
    storageBucket: "sis-produtos-v1.appspot.com",
    messagingSenderId: "871872379936",
    appId: "1:871872379936:web:3f5fa9581025dcafbc1045"
};

let app = firebase.initializeApp(config);
export const db = app.firestore();
export const auth = app.auth();