// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCzYiIblHbDkygFcgbL-ypdec1XCkmzqkE",
  authDomain: "web-40-824b4.firebaseapp.com",
  projectId: "web-40-824b4",
  storageBucket: "web-40-824b4.appspot.com",
  messagingSenderId: "21107886606",
  appId: "1:21107886606:web:184c93329e426beeefca5f",
  measurementId: "G-2P3C2QY2W6"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

const form = document.forms['nuevo'];

form.addEventListener('submit', handleFormSubmit); // Corrected function name

function handleFormSubmit(event){ // Corrected function name
    event.preventDefault();

    const email = form['correo'].value; // Corrected syntax
    const password = form['password'].value; // Corrected syntax

    console.log(`Correo: ${email}, contraseña: ${password}`);
}
