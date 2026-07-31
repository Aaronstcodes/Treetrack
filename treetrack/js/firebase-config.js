// ==========================================================
// TreeTrack — Firebase configuration
// ==========================================================
// Connected to the "trees-58658" Firebase project.
// Auth + Firestore only — Storage is NOT used (Firebase now requires
// a billing account for Storage even on the free tier). Tree photos
// go through Cloudinary instead — see cloudinary-config.js.
// ==========================================================

export const firebaseConfig = {
  apiKey: "AIzaSyCpJtSZ2r6o0xAfXs8YryFXc4SPkoOgUi4",
  authDomain: "trees-58658.firebaseapp.com",
  projectId: "trees-58658",
  storageBucket: "trees-58658.firebasestorage.app",
  messagingSenderId: "588536216738",
  appId: "1:588536216738:web:3215219b9452df78f2abfb",
  measurementId: "G-YCWZ39EVV8",
};

// The public URL where this site will be hosted (Cloudflare Pages).
// Used to build the QR code links for each tree.
// UPDATE THIS once you know your real *.pages.dev URL after deploying.
export const SITE_URL = "https://treetrack.pages.dev";
