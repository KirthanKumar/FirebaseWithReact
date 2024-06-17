// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBqcr4W_g1NVoTN_8RCcSJD1Ztf1CA66Z4",
  authDomain: "app-ed7d9.firebaseapp.com",
  projectId: "app-ed7d9",
  storageBucket: "app-ed7d9.appspot.com",
  messagingSenderId: "687106026567",
  appId: "1:687106026567:web:06df16e951030f38f99562",
  databaseURL: "https://app-ed7d9-default-rtdb.firebaseio.com", // added 
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
