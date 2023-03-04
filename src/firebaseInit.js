import { initializeApp } from "firebase/app";
import firebase from "firebase"

const firebaseConfig = {
  apiKey: "AIzaSyBPAS_v8b0DJ6EhQMIBPW4Njvfn32EeE5U",
  authDomain: "prestamoespacios.firebaseapp.com",
  projectId: "prestamoespacios",
  storageBucket: "prestamoespacios.appspot.com",
  messagingSenderId: "615895275319",
  appId: "1:615895275319:web:553574e2c7a1110a76acb2",
  measurementId: "G-N9GYFXELK6"
};

// Initialize Firebase
export default firebase.initializeApp(firebaseConfig)