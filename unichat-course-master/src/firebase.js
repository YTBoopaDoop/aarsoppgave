import firebase from "firebase/app";
import "firebase/auth";

export const auth = firebase.initializeApp( {
    apiKey: "AIzaSyDHrRsxKvOPX5hnxIuiqTSWn_OH5RrdqJk",
    authDomain: "chatting-app-1829f.firebaseapp.com",
    projectId: "chatting-app-1829f",
    storageBucket: "chatting-app-1829f.appspot.com",
    messagingSenderId: "799558021248",
    appId: "1:799558021248:web:ac88811ef703e44850f665"
  }).auth();