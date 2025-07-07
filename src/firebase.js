import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDvDKiO8vYWduPY-6fDq4msXyPqQIqKOME",
  authDomain: "client-dashboard-app-a7fd7.firebaseapp.com",
  projectId: "client-dashboard-app-a7fd7",
  storageBucket: "client-dashboard-app-a7fd7.appspot.com",
  messagingSenderId: "1058223835705",
  appId: "1:1058223835705:web:4a367869134472350c5be8",
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);