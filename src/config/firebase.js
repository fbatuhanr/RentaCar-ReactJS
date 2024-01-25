// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
import { getAuth } from "firebase/auth";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyBFrVwSo1GE2qdmm9RWCiCxmuf95CYbgcw",
    authDomain: "rentacar-reactjs.firebaseapp.com",
    projectId: "rentacar-reactjs",
    storageBucket: "rentacar-reactjs.appspot.com",
    messagingSenderId: "96788156931",
    appId: "1:96788156931:web:2964dc4b7e1f53621b3436",
    measurementId: "G-08J7W1ZKFB"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const db = getFirestore(app);
const storage = getStorage(app);
const auth = getAuth(app);

export {app, db, storage, auth};