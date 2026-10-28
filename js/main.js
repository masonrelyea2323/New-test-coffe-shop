/* ==========================================================
   Plains & Pour Coffee — shared JavaScript
   Each feature below checks whether its elements exist on
   the current page, so this one file works on every page.
   ========================================================== */

/* ---------- Store hours: the single source of truth ----------
   Change the hours here and both the home page "Open now" pill
   and the Hours page table update automatically.
   Day numbers follow JavaScript: 0 = Sunday ... 6 = Saturday.
   Times are 24-hour "HH:MM". Use null for a day you're closed. */
const HOURS = [
  { day: "Sunday",    open: "08:00", close: "16:00" },
  { day: "Monday",    open: "06:30", close: "19:00" },
  { day: "Tuesday",   open: "06:30", close: "19:00" },
  { day: "Wednesday", open: "06:30", close: "19:00" },
  { day: "Thursday",  open: "06:30", close: "21:00" },
  { day: "Friday",    open: "06:30", close: "21:00" },
  { day: "Saturday",  open: "07:00", close: "21:00" },
];

// "06:30" -> "6:30 AM"
function formatTime(hhmm) {
  const [h, m] = hhmm.split(":").map(Number);
  const suffix = h >= 12 ? "PM" : "AM";
  const hour12 = h % 12 || 12;
  return `${hour12}:${String(m).padStart(2, "0")} ${suffix}`;
}

// "06:30" -> 390 (minutes since midnight), easy to compare
function toMinutes(hhmm) {
  const [h, m] = hhmm.split(":").map(Number);
  return h * 60 + m;
}

/* ---------- 1. Mobile menu (hamburger) ---------- */
const navToggle = document.querySelector(".nav-toggle");
const navLinks = document.querySelector(".nav-links");

if (navToggle && navLinks) {
  navToggle.addEventListener("click", () => {
    const isOpen = navLinks.classList.toggle("is-open");
    navToggle.setAttribute("aria-expanded", isOpen);
  });
}

/* ---------- 2. "Open now / Closed" status pill ---------- */
const statusEl = document.querySelector("[data-open-status]");

if (statusEl) {
  const now = new Date();
  const today = HOURS[now.getDay()];
  const nowMins = now.getHours() * 60 + now.getMinutes();

  if (today.open && nowMins >= toMinutes(today.open) && nowMins < toMinutes(today.close)) {
    statusEl.textContent = `Open now · until ${formatTime(today.close)}`;
    statusEl.classList.add("is-open");
  } else {
    statusEl.textContent = today.open && nowMins < toMinutes(today.open)
      ? `Closed · opens at ${formatTime(today.open)}`
      : "Closed now · see you tomorrow";
    statusEl.classList.add("is-closed");
  }
}

/* ---------- 3. Hours table (builds rows from HOURS) ---------- */
const hoursBody = document.querySelector("[data-hours-table]");

if (hoursBody) {
  const todayIndex = new Date().getDay();
  // Start the week on Monday: Mon..Sat, then Sun
  const order = [1, 2, 3, 4, 5, 6, 0];

  hoursBody.innerHTML = order.map((i) => {
    const { day, open, close } = HOURS[i];
    const time = open ? `${formatTime(open)} – ${formatTime(close)}` : "Closed";
    const cls = i === todayIndex ? ' class="is-today"' : "";
    return `<tr${cls}><th scope="row">${day}</th><td>${time}</td></tr>`;
  }).join("");
}

/* ---------- 4. Menu filter buttons ---------- */
const filterButtons = document.querySelectorAll(".filter-btn");
const categories = document.querySelectorAll(".menu-category");

filterButtons.forEach((btn) => {
  btn.addEventListener("click", () => {
    const filter = btn.dataset.filter; // "all", "coffee", "tea", ...

    filterButtons.forEach((b) => b.classList.toggle("is-active", b === btn));
    categories.forEach((cat) => {
      cat.hidden = filter !== "all" && cat.dataset.category !== filter;
    });
  });
});

/* ---------- 5. Photo gallery lightbox ---------- */
const lightbox = document.querySelector(".lightbox");

if (lightbox) {
  const lightboxImg = lightbox.querySelector("img");
  const lightboxCaption = lightbox.querySelector("p");

  function closeLightbox() {
    lightbox.classList.remove("is-open");
  }

  document.querySelectorAll(".gallery button").forEach((btn) => {
    btn.addEventListener("click", () => {
      const img = btn.querySelector("img");
      lightboxImg.src = img.src;
      lightboxImg.alt = img.alt;
      lightboxCaption.textContent = btn.closest("figure").querySelector("figcaption").textContent;
      lightbox.classList.add("is-open");
      lightbox.querySelector(".lightbox-close").focus();
    });
  });

  lightbox.querySelector(".lightbox-close").addEventListener("click", closeLightbox);
  // Click the dark background (not the photo) to close
  lightbox.addEventListener("click", (e) => {
    if (e.target === lightbox) closeLightbox();
  });
  // Press Escape to close
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") closeLightbox();
  });
}

/* ---------- 6. Footer year ---------- */
document.querySelectorAll("[data-year]").forEach((el) => {
  el.textContent = new Date().getFullYear();
});
