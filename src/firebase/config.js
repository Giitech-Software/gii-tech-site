// src/firebase/config.js
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyBcPdMLtvfAo9lRZQ7DgoW38SM2W8NAcBg",
  authDomain: "giitech-software-systems.firebaseapp.com",
  projectId: "giitech-software-systems",
 storageBucket: "giitech-software-systems.firebasestorage.app",
  messagingSenderId: "228673418378",
  appId: "1:228673418378:web:d7642b35c951464bb2a973",
  measurementId: "G-5T3Q137S1L"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const storage = getStorage(app);
// eslint-disable-next-line
const analytics = getAnalytics(app);

export { app, db, storage };
