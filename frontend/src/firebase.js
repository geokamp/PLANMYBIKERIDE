// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "planmybikeride.firebaseapp.com",
  projectId: "planmybikeride",
  storageBucket: "planmybikeride.appspot.com",
  messagingSenderId: "234003023047",
  appId: "1:234003023047:web:8f8ba79cfc65923307eae2"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);