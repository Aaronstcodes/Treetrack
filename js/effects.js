

const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

let toastContainer;
function ensureToastContainer() {
  if (toastContainer) return toastContainer;
  toastContainer = document.createElement("div");
  toastContainer.id = "toast-container";
  document.body.appendChild(toastContainer);
  return toastContainer;
}

export function showToast(message, type = "success") {
  const container = ensureToastContainer();
  const toast = document.createElement("div");
  toast.className = `toast toast-${type}`;
  toast.textContent = message;
  container.appendChild(toast);
  requestAnimationFrame(() => toast.classList.add("show"));
  setTimeout(() => {
    toast.classList.remove("show");
    setTimeout(() => toast.remove(), 350);
  }, 3200);
}

function attachRipple(btn) {
  if (btn.dataset.rippleBound) return;
  btn.dataset.rippleBound = "1";
  btn.addEventListener("click", (e) => {
    if (prefersReducedMotion) return;
    const rect = btn.getBoundingClientRect();
    const ripple = document.createElement("span");
    ripple.className = "btn-ripple";
    const size = Math.max(rect.width, rect.height) * 1.6;
    ripple.style.width = ripple.style.height = size + "px";
    ripple.style.left = (e.clientX - rect.left - size / 2) + "px";
    ripple.style.top = (e.clientY - rect.top - size / 2) + "px";
    btn.appendChild(ripple);
    setTimeout(() => ripple.remove(), 600);
  });
}

function bindAllRipples() {
  document.querySelectorAll("button, .btn").forEach(attachRipple);
}
bindAllRipples();
// Re-bind whenever new buttons get injected dynamically (e.g. tree cards)
new MutationObserver(bindAllRipples).observe(document.body, { childList: true, subtree: true });

export function celebrate(originEl) {
  if (prefersReducedMotion) return;
  const rect = originEl ? originEl.getBoundingClientRect() : { left: window.innerWidth / 2, top: window.innerHeight / 2, width: 0, height: 0 };
  const cx = rect.left + rect.width / 2;
  const cy = rect.top + rect.height / 2;
  const colors = ["#45624A", "#B5502A", "#1F3A2E", "#C9C2A6"];
  for (let i = 0; i < 14; i++) {
    const bit = document.createElement("div");
    bit.className = "confetti-bit";
    bit.style.left = cx + "px";
    bit.style.top = cy + "px";
    bit.style.background = colors[i % colors.length];
    const angle = (Math.PI * 2 * i) / 14 + Math.random() * 0.5;
    const dist = 60 + Math.random() * 60;
    bit.style.setProperty("--dx", Math.cos(angle) * dist + "px");
    bit.style.setProperty("--dy", Math.sin(angle) * dist + "px");
    document.body.appendChild(bit);
    setTimeout(() => bit.remove(), 900);
  }
}

export function addAmbientLeaves(container, count = 6) {
  if (prefersReducedMotion || !container) return;
  const spots = [
    { top: "6%", left: "3%" }, { top: "80%", left: "96%" }, { top: "40%", left: "98%" },
    { top: "88%", left: "4%" }, { top: "14%", left: "92%" }, { top: "60%", left: "1%" },
    { top: "30%", left: "6%" }, { top: "70%", left: "90%" },
  ];
  spots.slice(0, count).forEach((p, i) => {
    const size = 16 + (i % 3) * 6;
    const leaf = document.createElementNS("http://www.w3.org/2000/svg", "svg");
    leaf.setAttribute("class", "ambient-leaf");
    leaf.setAttribute("viewBox", "0 0 24 24");
    leaf.setAttribute("width", size);
    leaf.setAttribute("height", size);
    leaf.style.top = p.top; leaf.style.left = p.left;
    leaf.style.animationDelay = `-${i * 3.4}s`;
    leaf.style.animationDuration = `${20 + i * 3}s`;
    leaf.innerHTML = `<path d="M12 2C7 6 4 11 4 15a8 8 0 0016 0c0-4-3-9-8-13z" fill="#45624A"/>`;
    container.appendChild(leaf);
  });
}

export function fallingLeaves(n = 10) {
  if (prefersReducedMotion) return;
  for (let i = 0; i < n; i++) {
    const leaf = document.createElementNS("http://www.w3.org/2000/svg", "svg");
    leaf.setAttribute("class", "falling-leaf");
    leaf.setAttribute("viewBox", "0 0 24 24");
    const size = 14 + Math.random() * 10;
    leaf.setAttribute("width", size);
    leaf.setAttribute("height", size);
    leaf.style.left = Math.random() * 100 + "vw";
    leaf.style.animationDuration = 3 + Math.random() * 2.5 + "s";
    leaf.style.animationDelay = Math.random() * 1.2 + "s";
    const color = Math.random() > 0.5 ? "#45624A" : "#B5502A";
    leaf.innerHTML = `<path d="M12 2C7 6 4 11 4 15a8 8 0 0016 0c0-4-3-9-8-13z" fill="${color}"/>`;
    document.body.appendChild(leaf);
    setTimeout(() => leaf.remove(), 6000);
  }
}

export function initCustomCursor() {
  if (prefersReducedMotion || !window.matchMedia("(pointer: fine)").matches) return;
  document.documentElement.classList.add("cursor-active");
  const dot = document.createElement("div");
  dot.id = "cursor-dot";
  const ring = document.createElement("div");
  ring.id = "cursor-ring";
  document.body.append(dot, ring);

  let ringX = 0, ringY = 0, mouseX = 0, mouseY = 0;
  document.addEventListener("mousemove", (e) => {
    mouseX = e.clientX; mouseY = e.clientY;
    dot.style.left = mouseX + "px"; dot.style.top = mouseY + "px";
  });
  function loop() {
    ringX += (mouseX - ringX) * 0.2;
    ringY += (mouseY - ringY) * 0.2;
    ring.style.left = ringX + "px"; ring.style.top = ringY + "px";
    requestAnimationFrame(loop);
  }
  loop();

  function bindHover() {
    document.querySelectorAll("a, button, .card.lift, input, select, textarea").forEach((el) => {
      if (el.dataset.cursorBound) return;
      el.dataset.cursorBound = "1";
      el.addEventListener("mouseenter", () => ring.classList.add("hover"));
      el.addEventListener("mouseleave", () => ring.classList.remove("hover"));
    });
  }
  bindHover();
  new MutationObserver(bindHover).observe(document.body, { childList: true, subtree: true });
}

export function showSkeleton(container, count = 3, kind = "card") {
  if (!container) return () => {};
  const nodes = [];
  for (let i = 0; i < count; i++) {
    const el = document.createElement("div");
    el.className = kind === "row" ? "skeleton skeleton-row" : "skeleton skeleton-card";
    container.appendChild(el);
    nodes.push(el);
  }
  return () => nodes.forEach((n) => n.remove());
}


document.addEventListener("DOMContentLoaded", () => {
  document.body.classList.add("page-ready");
});
