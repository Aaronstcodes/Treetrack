// ==========================================================
// TreeTrack — auth helpers shared across pages
// ==========================================================
import {
  auth, db, onAuthStateChanged, signInWithEmailAndPassword,
  createUserWithEmailAndPassword, signOut, doc, getDoc, setDoc,
} from "./firebase-init.js";

// Fetch the Firestore profile doc (role, classId, name) for a signed-in user.
export async function getUserProfile(uid) {
  const snap = await getDoc(doc(db, "users", uid));
  return snap.exists() ? snap.data() : null;
}

// Call once per page. Runs `onReady(user, profile)` once auth state is known.
// If `redirectIfSignedOut` is true and there's no user, sends them to index.html.
export function initAuth(onReady, redirectIfSignedOut = true) {
  onAuthStateChanged(auth, async (user) => {
    if (!user) {
      if (redirectIfSignedOut) window.location.href = "index.html";
      onReady(null, null);
      return;
    }
    const profile = await getUserProfile(user.uid);
    onReady(user, profile);
  });
}

export async function login(email, password) {
  return signInWithEmailAndPassword(auth, email, password);
}

// Sign-up also writes the user's profile doc (name/role/class) to Firestore.
export async function signup(email, password, name, role, classId) {
  const cred = await createUserWithEmailAndPassword(auth, email, password);
  await setDoc(doc(db, "users", cred.user.uid), {
    name, role, classId: classId || null, email,
  });
  return cred;
}

export async function logout() {
  await signOut(auth);
  window.location.href = "index.html";
}

// Renders the shared top navigation bar into any element with id="topbar".
// `profile` may be null (public/logged-out pages like tree.html still call this).
export function renderHeader(profile) {
  const el = document.getElementById("topbar");
  if (!el) return;

  const links = [`<a href="index.html">Dashboard</a>`, `<a href="leaderboard.html">Leaderboard</a>`];
  if (profile && (profile.role === "teacher" || profile.role === "admin")) {
    links.push(`<a href="admin.html">Admin</a>`);
    links.push(`<a href="report.html">SIL Report</a>`);
  }
  if (profile) {
    links.push(`<a href="#" id="logout-link">Log out (${profile.name})</a>`);
  }

  el.innerHTML = `
    <div class="brand">🌳 TreeTrack</div>
    <nav>${links.join("")}</nav>
  `;

  const logoutLink = document.getElementById("logout-link");
  if (logoutLink) logoutLink.addEventListener("click", (e) => { e.preventDefault(); logout(); });
}
