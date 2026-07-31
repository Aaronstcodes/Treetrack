// ==========================================================
// TreeTrack landing page — live impact tally.
// Loaded as its own independent <script type="module">, separate
// from landing-ui.js, so that if this Firebase import fails for
// any reason (offline, misconfigured keys, blocked request), it
// only affects the tally numbers — never the rest of the page.
// ==========================================================
import { db, collection, getDocs } from "./firebase-init.js";

const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

function countUp(el, target, suffix = "") {
  if (!el) return;
  if (prefersReducedMotion) { el.textContent = target + suffix; return; }
  const duration = 1200;
  const start = performance.now();
  function tick(now) {
    const progress = Math.min((now - start) / duration, 1);
    const eased = 1 - Math.pow(1 - progress, 3);
    el.textContent = Math.round(target * eased) + suffix;
    if (progress < 1) requestAnimationFrame(tick);
  }
  requestAnimationFrame(tick);
}

async function loadTally() {
  const totalEl = document.getElementById("t-total");
  const survivalEl = document.getElementById("t-survival");
  const logsEl = document.getElementById("t-logs");
  const visitsEl = document.getElementById("t-visits");
  const tallySection = document.getElementById("tally");

  let total = 0, survival = 0, careLogs = 0, visitLogs = 0, loaded = false;

  try {
    const treesSnap = await getDocs(collection(db, "trees"));
    let alive = 0;
    for (const d of treesSnap.docs) {
      total += 1;
      const t = d.data();
      if (t.status !== "dead") alive += 1;
      const logsSnap = await getDocs(collection(db, "trees", d.id, "logs"));
      logsSnap.forEach((l) => (l.data().type === "visit" ? visitLogs++ : careLogs++));
    }
    survival = total ? Math.round((alive / total) * 100) : 0;
    loaded = true;
  } catch (e) {
    // Firebase not configured yet, or unreachable — leave placeholders below.
  }

  const trigger = () => {
    if (!loaded) {
      [totalEl, survivalEl, logsEl, visitsEl].forEach((el) => { if (el) el.textContent = "—"; });
      return;
    }
    countUp(totalEl, total);
    countUp(survivalEl, survival, "%");
    countUp(logsEl, careLogs);
    countUp(visitsEl, visitLogs);
  };

  if (tallySection && "IntersectionObserver" in window) {
    const once = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) { trigger(); once.disconnect(); }
      });
    }, { threshold: 0.4 });
    once.observe(tallySection);
  } else {
    trigger();
  }
}

loadTally().catch(() => {
  ["t-total", "t-survival", "t-logs", "t-visits"].forEach((id) => {
    const el = document.getElementById(id);
    if (el) el.textContent = "—";
  });
});
