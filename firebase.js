// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAN9uJ18yZMHR0qYDM-_-VIewa0xZ2XnVE",
  authDomain: "rewwardy-capstone.firebaseapp.com",
  projectId: "rewwardy-capstone",
  storageBucket: "rewwardy-capstone.appspot.com",
  messagingSenderId: "859664818673",
  appId: "1:859664818673:web:788f4abfd6b5b211d32450",
  measurementId: "G-XH5DP210M6"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// Initialize Firebase Authentication and get a reference to the service
const auth = getAuth(app);

// const analytics = getAnalytics(app);
export const db = getFirestore(app)