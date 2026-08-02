# TreeTrack
TreeTrack is the digital platform built for our school's Innovation Lab project called Roots & Relationships. It started as a small idea to help our community keep better track of the trees we plant and take care of, and slowly it turned into a full web app with logins, points, leaderboards and a bunch of other stuff.

Plain HTML/CSS/JS (no build step, no framework) + Firebase (Auth, Firestore, Storage). Deploys the same way my portfolio does: static site on Cloudflare Pages.

---

## Why we made this
Our project Roots & Relationships is about tree stewardship and building connections between generations in our local community. We noticed that a lot of tree plantation drives happen but nobody actually follows up on the trees after that. They get planted, photographed once and then forgotten. So we wanted something that makes people accountable for the trees they plant. TreeTrack is basically our answer to that gap.

## What it actually does
People in the community sign up, plant or adopt a tree, and then upload photos of it over time to show it growing. Every update earns points which show up on a leaderboard. There's also a community directory so people can see who else is involved, and an admin dashboard where our team can approve entries, check on progress and export reports for the school submission.

Main features:

- User accounts with authentication
- Tree adoption and tracking
- Photo uploads for growth updates
- Points and leaderboard system
- Community directory
- Admin dashboard for approvals and monitoring
- SIL report export for documentation purposes

## What's in this repo
```
treetrack/
├── index.html                 Login / sign-up + student & teacher dashboard
├── tree.html                  Single tree profile — public QR-code destination,
│                               growth chart, log form, admin actions
├── leaderboard.html           Survival-rate + logging-consistency leaderboard
├── admin.html                 Teacher/admin dashboard — flags overdue trees
├── report.html                Auto-generated, printable SIL report
├── css/
│   ├── style.css               App styling
│   └── landing.css             Landing page styling
├── js/
│   ├── firebase-config.js      <- YOU EDIT THIS (your Firebase project keys)
│   ├── firebase-init.js        Shared Firebase SDK setup, don't need to touch
│   └── auth.js                 Shared login/session helpers
├── firestore.rules            Security rules for the database
└── storage.rules              Security rules for photo uploads
```

## Tech stack
I built this mostly on my own using plain HTML, CSS and JavaScript. No frameworks — I wanted to actually understand what was happening under the hood instead of relying on something like React for a project this size.

- Firebase for authentication and the database (Firestore)
- Cloudinary for photo storage and hosting. We originally wanted to use Firebase Storage but it needed the Blaze billing plan, so we switched
- Cloudflare for hosting and some analytics

## Project status
TreeTrack is still actively being worked on. Some parts like the leaderboard and photo uploads are working fine, other parts like the admin dashboard are getting refined as we go. This is a school project, so it's built by students, for a real community — not a polished commercial product — so please excuse rough edges here and there.

## The team
This is run by a small student team at St. Joseph's Boys' High School, Bangalore.

- Aaron — Team Lead and Tech Lead, built the core platform
- Allen Thomas — Community Lead
- Kane Marcus Royan — Operations Lead
- Tatania Fernandes — Buddy Program Lead
- Anika Bali — Documentation Lead
- Lambert Liao — Compliance Lead
- Nathan Sherwin Dsouza — Media and Branding Lead

Mentor: Ashrith Pupulla

## A note for anyone outside our school reading this
If you're reading this and you're not from our school — hi. This project is part of a student-led Innovation Lab initiative. It's meant to be a small-scale, real-world tool, not a research-grade system. We know it won't hold up to the standards of actual mission software, but we tried to build something genuinely useful for the people around us and learn a lot doing it. Any feedback is always welcome.

## Contact
For any questions about the project, reach out to Aaron directly as the tech lead at [aaronst.me](https://aaronst.me).