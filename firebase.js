// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore"; // Import Firestore

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBeIykZBUqyNBFBNcWq2wCjr49H_p6DCqY",
  authDomain: "flashcards-bd450.firebaseapp.com",
  projectId: "flashcards-bd450",
  storageBucket: "flashcards-bd450.appspot.com",
  messagingSenderId: "449593048278",
  appId: "1:449593048278:web:97d9db118bff02caff1d77",
  measurementId: "G-497X1Q20HN"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const db = getFirestore(app); // Initialize Firestore

export { db }; // Export the Firestore database
