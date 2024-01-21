// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCW2WT5evBIB4DdosYW3_ESDHWY4IDeYsg",
  authDomain: "build-up-4925c.firebaseapp.com",
  projectId: "build-up-4925c",
  storageBucket: "build-up-4925c.appspot.com",
  messagingSenderId: "431943337812",
  appId: "1:431943337812:web:ac82d803d46452043eaac1",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const storage = getStorage(app);
export const db = getFirestore(app);
