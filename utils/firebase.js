// Import the functions you need from the SDKs you need
import {
    initializeApp
} from "firebase/app";
import {
    getAuth
} from "firebase/auth";
import {
    getFirestore
} from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
   apiKey: "AIzaSyBxx55ttnQMNWAEUDvMdUHlxMXKaJ3iwsU",
       authDomain: "posts-app-8b3bf.firebaseapp.com",
       projectId: "posts-app-8b3bf",
       storageBucket: "posts-app-8b3bf.appspot.com",
       messagingSenderId: "500789695539",
       appId: "1:500789695539:web:1221fe3b81a44968797f46"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth()
export const db = getFirestore(app)