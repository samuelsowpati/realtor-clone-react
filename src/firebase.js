// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getFirestore} from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDs5-W1kNBvt6avH4YcvvliPDtZKPObnU4",
  authDomain: "realtor-clone-react-40345.firebaseapp.com",
  projectId: "realtor-clone-react-40345",
  storageBucket: "realtor-clone-react-40345.appspot.com",
  messagingSenderId: "193269582259",
  appId: "1:193269582259:web:750787e2d2bcf15fb163c6"
};


initializeApp(firebaseConfig);
export const db=getFirestore()