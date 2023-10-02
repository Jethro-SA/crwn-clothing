import { initializeApp } from "firebase/app";
import {
  getAuth,
  signInWithRedirect,
  signInWithPopup,
  GoogleAuthProvider,
} from "firebase/auth";

import {
    getFirestore,
    doc,
    getDoc,
    setDoc,
} from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyCmSeuX_Vx89Qhqd7ynBFMZXu5VTyuDbc0",
  authDomain: "crwn-clothing-db-d3eb1.firebaseapp.com",
  projectId: "crwn-clothing-db-d3eb1",
  storageBucket: "crwn-clothing-db-d3eb1.appspot.com",
  messagingSenderId: "228087774452",
  appId: "1:228087774452:web:bb849815414613fb89f2a1",
};

// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);

const provider = new GoogleAuthProvider();

provider.setCustomParameters({
    prompt: "select_account"
});

export const auth = getAuth();
export const signInWithGooglePopup = () => signInWithPopup(auth, provider);


export const db = getFirestore();
export const  createUserDocumentFromAuth = async (userAuth) => {
    const userDocRef = doc(db, 'users', userAuth.uid);
    const userSnapshot = await getDoc(userDocRef);

    if(!userSnapshot.exists()) {
        const { displayName, email } = userAuth;
        const createdAt = new Date();

        try {
            await setDoc(userDocRef, {
                displayName, email, createdAt
            })
        }
        catch (error) {
            console.log('There was error creating the user.', error);
        }
    }
        
    return userDocRef;
}