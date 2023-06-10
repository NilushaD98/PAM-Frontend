// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getStorage} from 'firebase/storage';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  // apiKey: "AIzaSyBQDcYw4KHxv6AaxSTICzBJb_lkzJBIc2Y",
  // authDomain: "fir-9-rs.firebaseapp.com",
  // projectId: "fir-9-rs",
  // storageBucket: "fir-9-rs.appspot.com",
  // messagingSenderId: "908569716400",
  // appId: "1:908569716400:web:76578ed6617da68774bd75"

  apiKey: "AIzaSyBPwlvITG46rxADxqdHs2LN1X_YWtZKfjU",
  authDomain: "olympic-database-a3c22.firebaseapp.com",
  projectId: "olympic-database-a3c22",
  storageBucket: "olympic-database-a3c22.appspot.com",
  messagingSenderId: "839869600149",
  appId: "1:839869600149:web:255ef10e1204053c24669c",
  measurementId: "G-EWNBV8YJ0H"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const storage = getStorage(app);