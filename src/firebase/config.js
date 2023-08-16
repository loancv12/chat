import { initializeApp } from "firebase/app";
import { getAuth, signInWithPopup, signInWithRedirect } from "firebase/auth";
import { getStorage } from "firebase/storage";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBpvDgT1fln4UEKx5NgAk-fV6wZ21fICfQ",
  authDomain: "chat-app-f6048.firebaseapp.com",
  projectId: "chat-app-f6048",
  storageBucket: "chat-app-f6048.appspot.com",
  messagingSenderId: "581111405397",
  appId: "1:581111405397:web:29d1404640a715a79d6ddc",
  measurementId: "G-3G83JQ61TN",
};
// Initialize Firebase
export const app = initializeApp(firebaseConfig);

// Initialize Firebase Authentication and get a reference to the service
export const auth = getAuth(app);

export const storage = getStorage();
export const db = getFirestore(app);
