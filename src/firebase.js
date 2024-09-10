// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBp0_Cns8hur9FoLnwFDXMLVRKUm3bmbyg",
  authDomain: "alemeno-355d5.firebaseapp.com",
  projectId: "alemeno-355d5",
  storageBucket: "alemeno-355d5.appspot.com",
  messagingSenderId: "966329798175",
  appId: "1:966329798175:web:0db723ddb91315d6168f2a",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

export { app, auth };
