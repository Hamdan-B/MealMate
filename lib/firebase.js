import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBY_Q4UdWkzsXDQ0-UGsmszKmFyQJBjY5s",
  authDomain: "mealmate-d74ab.firebaseapp.com",
  projectId: "mealmate-d74ab",
  storageBucket: "mealmate-d74ab.firebasestorage.app",
  messagingSenderId: "53573823647",
  appId: "1:53573823647:web:acad5a357c3d726c1a46aa",
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);
