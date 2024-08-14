import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBtF5YroHwcPWjp2Cz3rVWG3UZ4-WR2DEk",
  authDomain: "busybuy-b82da.firebaseapp.com",
  projectId: "busybuy-b82da",
  storageBucket: "busybuy-b82da.appspot.com",
  messagingSenderId: "458374007229",
  appId: "1:458374007229:web:093cb992ec9ee00a996ad4",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);