// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore"
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDcTH17U2Q7OsI0HEaN_89HkAypSEbYUg8",
  authDomain: "hotel-app-69db3.firebaseapp.com",
  projectId: "hotel-app-69db3",
  storageBucket: "hotel-app-69db3.appspot.com",
  messagingSenderId: "1087570628237",
  appId: "1:1087570628237:web:8c4f2513777cc077191cc4"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export default firebaseConfig;