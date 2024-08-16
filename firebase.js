// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";

import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyByt6lCbKe1X5tHp3uG5aB6XGTCPmsE1co",
  authDomain: "flashcardsaas-1be0f.firebaseapp.com",
  projectId: "flashcardsaas-1be0f",
  storageBucket: "flashcardsaas-1be0f.appspot.com",
  messagingSenderId: "877314978669",
  appId: "1:877314978669:web:e3dae38d710fb2b8a4e064",
  measurementId: "G-894EFJ74KS",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export { db };
