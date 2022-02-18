import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCTWz1U7TPeGxOQ5Z7KAI6OIPMuUfqm_Og",
  authDomain: "firecommerce-78256.firebaseapp.com",
  projectId: "firecommerce-78256",
  storageBucket: "firecommerce-78256.appspot.com",
  messagingSenderId: "935400285697",
  appId: "1:935400285697:web:78e85355fd2c4a58bc8200",
  measurementId: "G-D2RFDH2ZY9",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const fireDB = getFirestore(app);

export default fireDB;
