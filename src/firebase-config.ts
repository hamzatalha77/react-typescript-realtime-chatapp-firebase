// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app'
import { getAuth, GoogleAuthProvider } from 'firebase/auth'
import { getFirestore } from 'firebase/firestore'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: 'AIzaSyAF7G2Tf3n52Qz8gBF9w0YdTmB3aBkDy04',
  authDomain: 'chatapp-typescript.firebaseapp.com',
  projectId: 'chatapp-typescript',
  storageBucket: 'chatapp-typescript.appspot.com',
  messagingSenderId: '1000382193698',
  appId: '1:1000382193698:web:9bbfb7848297951c8d2a7b',
}

// Initialize Firebase
const app = initializeApp(firebaseConfig)
export const auth = getAuth(app)
export const provider = new GoogleAuthProvider()
export const db = getFirestore(app)
