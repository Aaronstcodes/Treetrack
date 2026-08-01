
# TreeTrack

The digital platform behind **Roots & Relationships** — SJBHS SIL programme.

Plain HTML/CSS/JS (no build step, no framework) + Firebase (Auth, Firestore, Storage).
Deploys the same way your portfolio does: static site on Cloudflare Pages.

---

## What's in this

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

# TreeTrack

TreeTrack is the digital platform built for our school's Innovation Lab project called Roots & Relationships. it started as a small idea to help our community keep better track of the trees we plant and take care of, and slowly it turned into a full web app with logins, points, leaderboards and a bunch of other stuff.

## why we made this

Our project Roots & Relationships is about tree stewardship and building connections between generations in our local community. we noticed that a lot of tree plantation drives happen but nobody actually follows up on the trees after that. they get planted, photographed once and then forgotten. so we wanted something that makes people accountable for the trees they plant. TreeTrack is basically our answer to that gap.

## what it actually does

people in the community sign up, plant or adopt a tree, and then upload photos of it over time to show its growing. every update earns points which show up on a leaderboard. theres also a community directory so people can see who else is involved and an admin dashboard where our team can approve entries, check on progress and export reports for the school submission.

Main features.

- user accounts with authentication
- tree adoption and tracking
- photo uploads for growth updates
- points and leaderboard system
- community directory
- admin dashboard for approvals and monitoring
- SIL report export for documentation purposes

## tech stack

I built this mostly on my own using plain HTML, CSS and JavaScript. no frameworks, i wanted to actually understand what was happening under the hood instead of relying on something like React for a project this size.

- Firebase for authentication and the database (Firestore)
- Cloudinary for photo storage and hosting. we originally wanted to use Firebase Storage but it needed the Blaze billing plan so we switched
- Cloudflare for hosting and some analytics

## project status

TreeTrack is still actively being worked on. some parts like the leaderboard and photo uploads are working fine, other parts like the admin dashboard are getting refined as we go. this is a school project so its built by students, for a real community, not a polished commercial product, so please excuse rough edges here and there.

## the team

this is run by a small student team at St Josephs Boys High School Bangalore.

- Aaron. Team Lead and Tech Lead, built the core platform
- Allen Thomas. Community Lead
- Kane Marcus Royan. Operations Lead
- Tatania Fernandes. Buddy Program Lead
- Anika Bali. Documentation Lead
- Lambert Liao. Compliance Lead
- Nathan Sherwin Dsouza. Media and Branding Lead

mentor. Ashrith Pupulla

## a note for anyone outside our school reading this

if your reading this and your not from our school, hi. this project is part of a student led Innovation Lab initiative, its meant to be a small scale, real world tool, not a research grade system. we know it wont hold up to the standards of like actual mission software, but we tried to build something genuinly useful for the people around us and learn a lot doing it. any feedback is always welcome.

## contact

for questions about the project reach out t to Aaron directly as the tech lead at <a href="aaronst.me">Aaron</a>
