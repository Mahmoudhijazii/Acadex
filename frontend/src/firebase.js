// frontend/src/firebase.js
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
// (analytics is optional)
import { getAnalytics } from "firebase/analytics";

const firebaseConfig = {
  apiKey: "AIzaSyAJiY2G6QUjJKWT-_9rQQXZ0YpYhdvGnoI",
  authDomain: "student-x-d1a7a.firebaseapp.com",
  projectId: "student-x-d1a7a",
  storageBucket: "student-x-d1a7a.appspot.com",
  messagingSenderId: "263801294365",
  appId: "1:263801294365:web:f41a75950c421e25a480f4",
  measurementId: "G-3KG7D2VNGP"
};

const app = initializeApp(firebaseConfig);
// initialize analytics only if you need it:
// const analytics = getAnalytics(app);

export const auth = getAuth(app);
export const db   = getFirestore(app);
export default app;
