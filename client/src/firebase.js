// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";

// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCh5e32mqNlksVe2kNCnUmejKLtqpu22c8",
  authDomain: "data-spark-storage.firebaseapp.com",
  projectId: "data-spark-storage",
  storageBucket: "data-spark-storage.appspot.com",
  messagingSenderId: "107755822442",
  appId: "1:107755822442:web:921dabd5434c8fbf5a5913"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const storage = getStorage(app);