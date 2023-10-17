import { initializeApp } from "firebase/app";
import {
  getAuth,
  signInWithRedirect,
  signInWithPopup,
  GoogleAuthProvider,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
} from "firebase/auth";

import {
    getFirestore,
    doc,
    getDoc,
    setDoc,    

    //UPLOAD DATA FOR DEV
    collection,
    writeBatch,
    query,
    getDocs,
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
export const signInWithGoogleRedirect = () => signInWithRedirect(auth, provider);

export const db = getFirestore();
export const  createUserDocumentFromAuth = async (userAuth, additionalData = {}) => {
    if(!userAuth)
        return;

    const userDocRef = doc(db, 'users', userAuth.uid);
    const userSnapshot = await getDoc(userDocRef);

    if(!userSnapshot.exists()) {
        const { displayName, email } = userAuth;
        const createdAt = new Date();

        try {
            await setDoc(userDocRef, {
                displayName, 
                email, 
                createdAt, 
                ...additionalData,
            })
        }
        catch (error) {
            console.log('There was error creating the user.', error);
        }
    }
        
    return userDocRef;
}

export const createAuthUserWithEmailAndPassword = async (email, password) => {
    if(!email || !password)
        return;

    return await createUserWithEmailAndPassword(auth, email, password);
}

export const signInAuthUserWithEmailAndPassword = async (email, password) => {
    if(!email || !password)
        return;
    
    return await signInWithEmailAndPassword(auth, email, password);
}

export const signOutUser = async () => {
    signOut(auth);
}

export const onAuthStateChangedListener = (callback) => onAuthStateChanged(auth, callback);

// UPLOAD DATA FOR DEV
export const addCollectionAndDocuments = async (collectionKey, objectsToAdd) => {
    const collectionRef = collection(db, collectionKey);

    const batch = writeBatch(db);

    objectsToAdd.forEach(object => {
        const docRef = doc(collectionRef, object.title.toLowerCase());

        batch.set(docRef, object);
    });

    await batch.commit();

    console.log('Added collection and documents');
};

export const getCategoriesAndDocuments = async () => {
    const collectionRef = collection(db, 'categories');
    const q = query(collectionRef);

    const querySnapshot = await getDocs(q);
    const categoryMap = querySnapshot.docs.reduce((previousVal, currentVal) => {
        const {title, items} = currentVal.data();

        previousVal[title.toLowerCase()] = items;

        return previousVal;
    }, {})

    return categoryMap;
};