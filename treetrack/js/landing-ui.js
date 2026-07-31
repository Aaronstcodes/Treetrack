// ==========================================================
// TreeTrack landing page — UI/animation layer.
// Deliberately has ZERO dependency on Firebase, so the page's
// look and feel always works even if Firebase isn't configured
// yet, or fails to load for any reason. Live data lives in
// landing-stats.js, loaded as a separate, independent module.
// ==========================================================

const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

// ---------------- Preloader ----------------
function dismissPreloader() {
  const pl = document.getElementById("preloader");
  if (pl) pl.classList.add("done");
}
window.addEventListener("load", () => setTimeout(dismissPreloader, prefersReducedMotion ? 0 : 700));
// Safety net: never let the preloader trap the page for more than 2.5s,
// even if the load event is delayed by a slow subresource.
setTimeout(dismissPreloader, 2500);
document.getElementById("preloader")?.addEventListener("click", dismissPreloader);

// ---------------- Scroll progress thread ----------------
const thread = document.getElementById("progress-thread");
function updateProgress() {
  const h = document.documentElement;
  const scrolled = h.scrollTop;
  const max = h.scrollHeight - h.clientHeight;
  const pct = max > 0 ? (scrolled / max) * 100 : 0;
  if (thread) thread.style.width = pct + "%";
}
document.addEventListener("scroll", updateProgress, { passive: true });
updateProgress();

// ---------------- Sticky nav shrink + scrollspy ----------------
const nav = document.querySelector(".site-nav");
function updateNav() {
  if (nav) nav.classList.toggle("scrolled", window.scrollY > 30);
}
document.addEventListener("scroll", updateNav, { passive: true });
updateNav();

const sections = document.querySelectorAll("main [id]");
const navLinks = document.querySelectorAll(".site-nav .links a");
if ("IntersectionObserver" in window && sections.length) {
  const spy = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          navLinks.forEach((l) => l.classList.toggle("active", l.getAttribute("href") === "#" + entry.target.id));
        }
      });
    },
    { rootMargin: "-45% 0px -50% 0px" }
  );
  sections.forEach((s) => spy.observe(s));
}

// ---------------- Scroll reveal ----------------
const revealEls = document.querySelectorAll(".reveal");
if ("IntersectionObserver" in window) {
  const io = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("in-view");
          io.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.15 }
  );
  revealEls.forEach((el) => io.observe(el));
} else {
  revealEls.forEach((el) => el.classList.add("in-view"));
}

// ---------------- Magnetic buttons (desktop, pointer:fine only) ----------------
if (window.matchMedia("(pointer: fine)").matches && !prefersReducedMotion) {
  document.querySelectorAll("[data-magnetic]").forEach((btn) => {
    btn.addEventListener("mousemove", (e) => {
      const r = btn.getBoundingClientRect();
      const x = e.clientX - r.left - r.width / 2;
      const y = e.clientY - r.top - r.height / 2;
      btn.style.transform = `translate(${x * 0.18}px, ${y * 0.28}px)`;
    });
    btn.addEventListener("mouseleave", () => { btn.style.transform = ""; });
  });
}

// ---------------- FAQ accordion ----------------
document.querySelectorAll(".faq-q").forEach((btn) => {
  btn.addEventListener("click", () => {
    const item = btn.closest(".faq-item");
    const wasOpen = item.getAttribute("aria-expanded") === "true";
    document.querySelectorAll(".faq-item").forEach((i) => i.setAttribute("aria-expanded", "false"));
    item.setAttribute("aria-expanded", wasOpen ? "false" : "true");
  });
});

// ---------------- Lightbox ----------------
const lightbox = document.getElementById("lightbox");
const lightboxImg = lightbox?.querySelector("img");
const lightboxCap = lightbox?.querySelector(".lb-cap");

document.querySelectorAll(".gallery-item").forEach((item) => {
  item.addEventListener("click", () => {
    const img = item.querySelector("img");
    // If the real photo hasn't been added yet (onerror hid it), there's
    // nothing to enlarge — the placeholder caption is enough on its own.
    if (!img || img.style.display === "none" || !img.complete || img.naturalWidth === 0) return;
    const cap = item.dataset.caption || "";
    if (!lightbox || !lightboxImg) return;
    lightboxImg.src = img.src;
    lightboxImg.alt = img.alt;
    if (lightboxCap) lightboxCap.textContent = cap;
    lightbox.classList.add("open");
  });
});
lightbox?.addEventListener("click", (e) => {
  if (e.target === lightbox || e.target.classList.contains("lb-close")) {
    lightbox.classList.remove("open");
  }
});
document.addEventListener("keydown", (e) => {
  if (e.key === "Escape") lightbox?.classList.remove("open");
});
