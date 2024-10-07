// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAUQrEXKMH6J8y2Sgu0_aCIqKkG-e-3Un0",
  authDomain: "makepoc-8a2af.firebaseapp.com",
  projectId: "makepoc-8a2af",
  storageBucket: "makepoc-8a2af.appspot.com",
  messagingSenderId: "1000628798531",
  appId: "1:1000628798531:web:f214ffaf404d1f1c18c0f6",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Realtime Database 초기화
const database = getDatabase(app);

export { database };
