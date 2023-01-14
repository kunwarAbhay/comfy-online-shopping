import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDIP2TOLd6QN6m8_4f1H2vMd9yJobni1eE",
  authDomain: "learning-firebase-4262.firebaseapp.com",
  projectId: "learning-firebase-4262",
  storageBucket: "learning-firebase-4262.appspot.com",
  messagingSenderId: "264691668002",
  appId: "1:264691668002:web:a308fb2de409cf6e44667b",
  measurementId: "G-6BNH3TZF4B",
};

let app = initializeApp(firebaseConfig);
let db = getFirestore(app);
let auth = getAuth(app);

export { db, auth };
