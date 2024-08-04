import { initializeApp } from "firebase/app";
import { updateProfile } from "firebase/auth"; // Import updateProfile

import {
  getAuth,
  signInWithPopup,
  GoogleAuthProvider,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
} from "firebase/auth";

import { getFirestore, doc, runTransaction } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCeJiQZuVkatzxvSgngoKxpnZgvpGWUmxQ",
  authDomain: "skicom-shop.firebaseapp.com",
  projectId: "skicom-shop",
  storageBucket: "skicom-shop.appspot.com",
  messagingSenderId: "67119794428",
  appId: "1:67119794428:web:16dd9e5747b6824466ef79",
  measurementId: "G-83H0S61PZP",
};

const firebaseApp = initializeApp(firebaseConfig);

const provider = new GoogleAuthProvider();
provider.setCustomParameters({
  prompt: "select_account",
});

export const auth = getAuth();
export const signInWithGooglePopup = () => signInWithPopup(auth, provider);

export const db = getFirestore();

export const createUserDocumentFromAuth = async (
  userAuth,
  additionalInformation = {}
) => {
  if (!userAuth) return; // Handle case where userAuth is undefined

  // Access uid correctly
  let userDocRef;
  if (userAuth.user) {
    userDocRef = doc(db, "users", userAuth.user.uid);
  } else {
    userDocRef = doc(db, "users", userAuth.uid);
  }

  try {
    await runTransaction(db, async (transaction) => {
      const userSnapshot = await transaction.get(userDocRef);

      if (!userSnapshot.exists()) {
        let displayName, email;
        if (userAuth.user) {
          displayName = userAuth.user.displayName;
          email = userAuth.user.email;
        } else {
          displayName = userAuth.displayName;
          email = userAuth.email;
        }
        const createdAt = new Date();

        transaction.set(userDocRef, {
          displayName,
          email,
          createdAt,
          ...additionalInformation,
        });
      }
    });
  } catch (error) {
    console.log("error creating user", error.message);
  }

  return userDocRef;
};

export const createAuthUserWithEmailAndPassword = async (
  email,
  password,
  additionalInformation
) => {
  if (!email || !password) return;

  const userCredential = await createUserWithEmailAndPassword(
    auth,
    email,
    password
  );
  const user = userCredential.user;

  // Update the user's profile with the displayName
  await updateProfile(user, { displayName: additionalInformation.displayName }); // Use updateProfile here

  return userCredential;
};

export const signInAuthUserWithEmailAndPassword = async (
  email,
  password,
  additionalInformation
) => {
  if (!email || !password) return;

  const userCredential = await signInWithEmailAndPassword(
    auth,
    email,
    password
  );

  return userCredential;
};

export const signOutUser = async () => await signOut(auth);

export const onAuthStateChangedListener = (callback) =>
  onAuthStateChanged(auth, callback);
