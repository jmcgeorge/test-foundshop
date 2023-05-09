import { initializeApp } from 'firebase/app';
import { 
    getAuth, 
    signInWithRedirect, 
    signInWithPopup, 
    GoogleAuthProvider } from 'firebase/auth';

import {
    getFirestore,
    doc,
    getDoc,
    setDoc
} from 'firebase/firestore';

const firebaseConfig = {
    apiKey: "AIzaSyDBIlMgTaTzNop1Hj6FzmpHHgoTQd6StKQ",
    authDomain: "foundshop-db.firebaseapp.com",
    projectId: "foundshop-db",
    storageBucket: "foundshop-db.appspot.com",
    messagingSenderId: "920560306185",
    appId: "1:920560306185:web:5b193e27fdba75d93490d8"
  };
  
  // Initialize Firebase
  const firebaseApp = initializeApp(firebaseConfig);

  const provider = new GoogleAuthProvider();
  provider.setCustomParameters({
    prompt: 'select_account'
  });


  export const auth = getAuth();
  export const signInWithGooglePopup = () => signInWithPopup(auth, provider);

  export const db = getFirestore();

  export const createUserDocumentFromAuth = async (userAuth) => {
    const userDocRef = doc(db, 'users', userAuth.uid);
    console.log(userDocRef)

  const userSnapshot = await getDoc(userDocRef);
  console.log(userSnapshot)

  if(!userSnapshot.exists()){
    const {displayName, email } = userAuth;
    const createdAt = new Date();

    try {
      await setDoc(userDocRef, {
        displayName,
        email,
        createdAt
      });
    } catch (error) {
      console.log('error creating the user', error.message)
    }

      }

      return userDocRef;
    }
  
    //if user data does not exists
    //create /set the document with dat from userauth in my correction
  //if user data exists

  


  //return userDocRef

