import firebase from "firebase";
require("firebase/firestore");

// Initialize Firebase
var config = {
  apiKey: "AIzaSyBziKHf_ViYUGQaM1IH5kjJveF1xsS8o5k",
  authDomain: "fast-forms-12.firebaseapp.com",
  databaseURL: "https://fast-forms-12.firebaseio.com",
  projectId: "fast-forms-12",
  storageBucket: "",
  messagingSenderId: "464944575475"
};

var fire = firebase.initializeApp(config);
export const db = firebase.firestore();
export const auth = firebase.auth();
export const googleAuthProvider = new firebase.auth.GoogleAuthProvider();
