// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyApaPQeFl2ciboPvacqkyu5vFOLaQBTpqk",
    authDomain: "musicstream-react.firebaseapp.com",
    projectId: "musicstream-react",
    storageBucket: "musicstream-react.appspot.com",
    messagingSenderId: "67776188337",
    appId: "1:67776188337:web:e452f3559fc0c02a6cf790"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);