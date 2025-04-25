// frontend/src/firebase.js
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyAJiY2G6QUjJKWT-_9rQQXZ0YpYhdvGnoI",
  authDomain: "student-x-d1a7a.firebaseapp.com",
  projectId: "student-x-d1a7a",
  storageBucket: "student-x-d1a7a.firebasestorage.app",
  messagingSenderId: "263801294365",
  appId: "1:263801294365:web:f41a75950c421e25a480f4",
  measurementId: "G-3KG7D2VNGP"
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth(app);
