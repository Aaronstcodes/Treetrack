// ==========================================================
// TreeTrack — Firebase init (shared across all pages)
// Note: Firebase Storage is NOT used — Firebase now requires a billing
// account (Blaze plan) even for free-tier Storage usage. Tree photos go
// through Cloudinary instead (see js/cloudinary-config.js), which stays
// fully free with no card required. Firebase here only handles Auth
// and Firestore, both genuinely free with no billing account needed.
// ==========================================================
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-app.js";
import {
  getAuth, onAuthStateChanged, signInWithEmailAndPassword,
  createUserWithEmailAndPassword, signOut,
} from "https://www.gstatic.com/firebasejs/10.12.0/firebase-auth.js";
import {
  getFirestore, collection, doc, getDoc, getDocs, setDoc, addDoc,
  updateDoc, query, where, orderBy, serverTimestamp, onSnapshot,
} from "https://www.gstatic.com/firebasejs/10.12.0/firebase-firestore.js";

import { firebaseConfig } from "./firebase-config.js";

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);

export {
  onAuthStateChanged, signInWithEmailAndPassword, createUserWithEmailAndPassword, signOut,
  collection, doc, getDoc, getDocs, setDoc, addDoc, updateDoc,
  query, where, orderBy, serverTimestamp, onSnapshot,
};
