import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCfgvBD8kiGTKqzPbXNOaOVKVWMS3NqliU",
  authDomain: "laundry-app-7bbc9.firebaseapp.com",
  projectId: "laundry-app-7bbc9",
  storageBucket: "laundry-app-7bbc9.appspot.com",
  messagingSenderId: "270083678787",
  appId: "1:270083678787:web:d7113a8f4fbdf43dd7eaf6",
};

const app = initializeApp(firebaseConfig);

const auth = getAuth(app);

const db = getFirestore();

export { auth, db };
