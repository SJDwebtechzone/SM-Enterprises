import { initializeApp, getApps, getApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';


const firebaseConfig = {
  apiKey: "AIzaSyAmmoDnCmn6iO1CFeFZJppQGHQ1CgrratQ",
  authDomain: "smenterprises-77224.firebaseapp.com",
  projectId: "smenterprises-77224",
  storageBucket: "smenterprises-77224.firebasestorage.app",
  messagingSenderId: "109614944447",
  appId: "1:109614944447:web:13ba83ec8a662dad91760a",
  measurementId: "G-3H9CL7X8F0"
};
// ✅ Prevent duplicate initialization
const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApp();
const auth = getAuth(app);


export { auth };