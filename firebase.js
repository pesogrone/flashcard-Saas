// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore"; // Import Firestore

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBeIykZBUqyNBFBNcWq2wCjr49H_p6DCqY",
  authDomain: "flashcards-bd450.firebaseapp.com",
  projectId: "flashcards-bd450",
  storageBucket: "flashcards-bd450.appspot.com",
  messagingSenderId: "449593048278",
  appId: "1:449593048278:web:97d9db118bff02caff1d77",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app); // Initialize Firestore

export { db }; // Export the Firestore database
