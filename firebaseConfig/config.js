// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyAHjnze_WwBqQrXCeFBLJLxbMVu0dwR93Y",
    authDomain: "nextmxh.firebaseapp.com",
    projectId: "nextmxh",
    storageBucket: "nextmxh.appspot.com",
    messagingSenderId: "60108775847",
    appId: "1:60108775847:web:57d5766048e17cbcafd682",
    measurementId: "G-358T39TW3Q",
    databaseURL: "https://nextmxh-default-rtdb.asia-southeast1.firebasedatabase.app/",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);


// Initialize Realtime Database and get a reference to the service
export const database = getDatabase(app);
