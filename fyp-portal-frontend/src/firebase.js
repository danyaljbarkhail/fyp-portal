// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getStorage } from "firebase/storage";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAGPyJoOirUOZnx79nqo1xMLwoW31FlUa0",
  authDomain: "fyp-portal-d6406.firebaseapp.com",
  projectId: "fyp-portal-d6406",
  storageBucket: "fyp-portal-d6406.appspot.com",
  messagingSenderId: "412034451113",
  appId: "1:412034451113:web:b5282c7083be7c057a8bb8",
  measurementId: "G-K6KPW64YV5"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const storage = getStorage(app);

export { storage };
