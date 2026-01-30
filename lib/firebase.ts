// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyAcDgPTMIDBdOCon3xT4kca0OnfbckKHL8",
    authDomain: "vegam-114a0.firebaseapp.com",
    projectId: "vegam-114a0",
    storageBucket: "vegam-114a0.firebasestorage.app",
    messagingSenderId: "408563321435",
    appId: "1:408563321435:web:35fc89b21e42fed5ee4d7e"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
