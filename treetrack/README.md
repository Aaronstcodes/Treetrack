# TreeTrack

The digital platform behind **Roots & Relationships** — SJBHS SIL programme.

Plain HTML/CSS/JS (no build step, no framework) + Firebase (Auth, Firestore, Storage).
Deploys the same way your portfolio does: static site on Cloudflare Pages.

---

## 1. What's in this folder

```
treetrack/
├── index.html          Login / sign-up + student & teacher dashboard
├── tree.html            Single tree profile — public QR-code destination,
│                        growth chart, log form, admin actions
├── leaderboard.html      Survival-rate + logging-consistency leaderboard
├── admin.html            Teacher/admin dashboard — flags overdue trees
├── report.html           Auto-generated, printable SIL report
├── css/style.css
├── js/
│   ├── firebase-config.js   <- YOU EDIT THIS (your Firebase project keys)
│   ├── firebase-init.js     Shared Firebase SDK setup, don't need to touch
│   └── auth.js               Shared login/session helpers
├── firestore.rules       Security rules for the database
└── storage.rules         Security rules for photo uploads
```

## 2. Create the Firebase project (5–10 minutes)

1. Go to **console.firebase.google.com** → **Add project** → name it e.g. `treetrack-sjbhs` → finish the wizard (you can skip Google Analytics).
2. Inside the project: **Build → Authentication → Get started → Sign-in method → Email/Password → Enable**.
3. **Build → Firestore Database → Create database → Start in production mode** → pick a region close to India (e.g. `asia-south1`).
4. **Build → Storage → Get started** (keep default production-mode rules for now — you'll paste the real ones below).
5. In the left sidebar, click the **gear icon → Project settings**. Under "Your apps," click the **`</>`** (web) icon, give it a nickname (e.g. "treetrack-web"), and **don't** check "Firebase Hosting" (you're using Cloudflare Pages instead).
6. Firebase will show you a `firebaseConfig` object. Copy it.

## 3. Paste your keys in

Open `js/firebase-config.js` and replace the placeholder object with the real one Firebase gave you:

```js
export const firebaseConfig = {
  apiKey: "AIza...",
  authDomain: "treetrack-sjbhs.firebaseapp.com",
  projectId: "treetrack-sjbhs",
  storageBucket: "treetrack-sjbhs.appspot.com",
  messagingSenderId: "...",
  appId: "...",
};
```

Also update `SITE_URL` in the same file once you know your Cloudflare Pages URL (step 6), so QR codes point to the right place.

## 4. Deploy the security rules

You need the Firebase CLI once, locally:

```bash
npm install -g firebase-tools
firebase login
cd treetrack
firebase init firestore storage   # when asked, select your existing project, keep default file names
firebase deploy --only firestore:rules,storage:rules
```

This pushes the `firestore.rules` and `storage.rules` already in this folder — you don't need to write new ones, just deploy the ones provided.

## 5. Deploy the site to Cloudflare Pages

Same flow as your existing portfolio:

1. Push this folder to a GitHub repo (e.g. `treetrack`).
2. Cloudflare dashboard → **Workers & Pages → Create → Pages → Connect to Git** → pick the repo.
3. Build settings: **no build command needed**, output directory = `/` (root), since this is plain static HTML.
4. Deploy. Cloudflare gives you a `*.pages.dev` URL — put that into `SITE_URL` in `firebase-config.js`, commit, and redeploy (this is what QR codes link to).

## 6. Set up your first admin account

1. Open the deployed site → **Sign up** → make an account with role **Teacher**.
2. In the Firebase console → **Firestore Database → users collection** → find your new user document → change the `role` field from `"teacher"` to `"admin"` manually (admin unlocks nothing extra right now beyond teacher, but keeps the door open if you want to split permissions later).
3. Everyone else (your 6 teammates + participating classes) can just sign up directly through the site — students pick role "Student" and type their class (e.g. `XI-B`); teachers/mentors pick "Teacher."

## 7. Adding the first trees

Log in as a teacher/admin → the dashboard shows an **"Adopt a new tree"** form → fill in name, species, class, and buddy info → **Add tree**. This immediately generates that tree's QR code on its profile page (`tree.html?id=...`) — screenshot or print that QR, laminate it, and tie it to the actual tree.

## 8. Data model (for reference / debugging in the Firebase console)

```
users/{uid}          { name, email, role: "student" | "teacher" | "admin", classId }
trees/{treeId}       { name, species, classId, buddyType, buddyName,
                        status: "alive" | "dead", height, girth, lastLogAt, createdAt }
trees/{id}/logs/{id} { type: "care" | "visit", height, girth, photoURL, notes,
                        loggedBy, loggedByName, createdAt }
trees/{id}/handovers/{id} { fromClassId, toClassId, date }
```

## 9. Cost

Firebase's free **Spark plan** covers this comfortably: 50k Firestore reads/day,
20k writes/day, 5GB Storage, 10GB/month bandwidth. A school-scale project (a
few dozen trees, weekly logs, a few hundred photos over a year) will not come
close to those limits — this should cost ₹0 for the entire programme.

## 10. The public landing page (`landing.html`)

Separate from the app itself, `landing.html` is a public-facing site explaining
the programme — built around the Tree Passport/stamp motif, with a live impact
tally pulled from the same Firestore project as TreeTrack. It doesn't require
login and is meant to be what you link to from the SIL report, a QR poster, or
a school newsletter.

**Adding real photos:**
- Team photos: drop a JPG into `assets/team/` named to match the code —
  `aaron.jpg`, `allen.jpg`, `kane.jpg`, `tatania.jpg`, `anika.jpg`, `lambert.jpg`,
  `nathan.jpg`. If the file isn't there, a clean monogram placeholder shows
  automatically instead — nothing breaks either way.
- Gallery photos: same idea, in `assets/gallery/` — `adoption-day.jpg`,
  `weekly-watering.jpg`, `buddy-visit.jpg`, `passport-field.jpg`, `tree-day.jpg`,
  `passing-torch.jpg`. Missing ones show an icon + caption placeholder instead
  of a broken image, and won't open the lightbox until a real photo is added.

**Why it's split into two script files:** `js/landing-ui.js` (animations, nav,
FAQ, lightbox) has zero dependency on Firebase and always works. `js/landing-stats.js`
(the live tally numbers) is Firebase-dependent and loads as a fully separate
module — if Firebase isn't set up yet or is briefly unreachable, the tally just
shows placeholder dashes instead of taking the rest of the page down with it.

**Local testing note:** because both pages use `<script type="module">`,
opening the HTML file directly (`file://...`) will block on browser CORS
rules. Test locally with a quick static server instead, e.g. `python3 -m
http.server 8080` from inside the `treetrack` folder, then visit
`http://localhost:8080/landing.html`. This isn't an issue once deployed to
Cloudflare Pages, which serves everything over `https://`.

## 11. What to build next, if you want to extend it

- Push notifications (via Firebase Cloud Messaging) reminding a class when their weekly log is due.
- CSV export button on `report.html` for pasting straight into a spreadsheet.
- A gallery view per tree showing every logged photo in a strip, not just the latest.
