// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage"; 
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCUyDGw0o3HFv0iGWiqxJGCckQtFWPZqV4",
  authDomain: "neubolt-44463.firebaseapp.com",
  projectId: "neubolt-44463",
  storageBucket: "neubolt-44463.appspot.com",
  messagingSenderId: "776101802907",
  appId: "1:776101802907:web:088267e93a64713bdb673e",
  measurementId: "G-QECKNHBR6D",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);
