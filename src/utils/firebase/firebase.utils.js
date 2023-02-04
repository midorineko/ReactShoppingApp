import { initializeApp } from 'firebase/app';
import {getAuth, signInWithRedirect, signInWithPopup, GoogleAuthProvider, createUserWithEmailAndPassword, signInWithEmailAndPassword} from 'firebase/auth'
import {getFirestore, doc, getDoc, setDoc} from 'firebase/firestore'

const firebaseConfig = {
    apiKey: "AIzaSyB5V6ZW3purkCuvm_OUflBcjP7CnH042eM",
    authDomain: "crown-clothing-db-da23c.firebaseapp.com",
    projectId: "crown-clothing-db-da23c",
    storageBucket: "crown-clothing-db-da23c.appspot.com",
    messagingSenderId: "219950643561",
    appId: "1:219950643561:web:e81301996268d65bbba5f8"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const firebaseApp = initializeApp(firebaseConfig);

const provider = new GoogleAuthProvider();

provider.setCustomParameters({
    prompt: "select_account"
})

export const auth = getAuth();
export const signInWithGooglePopup = () => signInWithPopup(auth, provider);

export const db = getFirestore();

export const createUserDocumentFromAuth = async (userAuth, additionalInformation = {}) => {
    const userDocRef = doc(db, 'users', userAuth.uid)
    const userSnapshot = await getDoc(userDocRef);
    if(!userSnapshot.exists()){
        const {displayName, email} = userAuth
        const createdAt = new Date();
        try{
            await setDoc(userDocRef, {
                displayName,
                email,
                createdAt,
                ...additionalInformation
            })
        }catch(error){
            console.log('error creating the user', error.message);
        }
    }

    return userDocRef

}

export const signInAuthUserWithEmailAndPassword = async (email, password) =>{
    if(!email || !password) return;
    return await signInWithEmailAndPassword(auth, email, password);
}

export const createAuthUserWithEmailAndPassword = async (email, password) =>{
    if(!email || !password) return;
    return await createUserWithEmailAndPassword(auth, email, password);
}