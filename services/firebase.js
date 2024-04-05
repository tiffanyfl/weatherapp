// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCINoE2tciZbbfdw6JLhPDQVXQw3K6oVKY",
  authDomain: "weatherapp-c295d.firebaseapp.com",
  projectId: "weatherapp-c295d",
  storageBucket: "weatherapp-c295d.appspot.com",
  messagingSenderId: "230216551943",
  appId: "1:230216551943:web:d385cb4e80c0c30366a4a2"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase Authentication and get a reference to the service
const auth = getAuth(app);

const db = getFirestore(app);

export { app, auth, db };