/* Rendering and interactions. Content lives in data.js. */

// ---------- Helpers (used by later sections too) ----------

// 1250000 -> "1.25M", 500000 -> "500K", 0 -> "0"
function formatCount(n) {
  const fmt = (value, suffix) =>
    value.toFixed(value >= 100 ? 0 : 2).replace(/\.?0+$/, "") + suffix;
  if (n >= 1e9) return fmt(n / 1e9, "B");
  if (n >= 1e6) return fmt(n / 1e6, "M");
  if (n >= 1e3) return fmt(n / 1e3, "K");
  return String(n);
}

// ---------- Scroll reveal + load intro + progress ----------

const revealObserver = "IntersectionObserver" in window
  ? new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          entry.target.classList.add("is-visible");
          revealObserver.unobserve(entry.target);
        });
      },
      { threshold: 0.12, rootMargin: "0px 0px -6% 0px" }
    )
  : null;

// Mark elements to fade/slide in when they scroll into view.
// `perRow` staggers items within a row of the grid.
function reveal(elements, perRow = 1) {
  [...elements].forEach((el, i) => {
    el.classList.add("reveal");
    el.style.setProperty("--i", i % perRow);
    if (revealObserver) revealObserver.observe(el);
    else el.classList.add("is-visible");
  });
}

// Lift the intro curtain once everything has loaded (min. 1s so it never flashes)
function initLoader() {
  const root = document.documentElement;
  const start = performance.now();
  let finished = false;

  const finish = () => {
    if (finished) return;
    finished = true;
    setTimeout(() => root.classList.add("is-loaded"), Math.max(0, 1000 - (performance.now() - start)));
  };

  if (document.readyState === "complete") finish();
  else {
    window.addEventListener("load", finish, { once: true });
    setTimeout(finish, 4000); // never block the page on a slow image
  }
}

// Thin accent line under the header showing how far down the page you are
function initScrollProgress() {
  let ticking = false;
  const update = () => {
    const max = document.documentElement.scrollHeight - window.innerHeight;
    const p = max > 0 ? Math.min(window.scrollY / max, 1) : 0;
    document.documentElement.style.setProperty("--progress", p.toFixed(4));
    ticking = false;
  };
  window.addEventListener("scroll", () => {
    if (!ticking) { ticking = true; requestAnimationFrame(update); }
  }, { passive: true });
  window.addEventListener("resize", update);
  update();
}

// ---------- Profile / hero ----------

function renderProfile() {
  document.querySelectorAll("[data-profile]").forEach((el) => {
    const value = profile[el.dataset.profile];
    if (value) el.textContent = value;
  });

  const photo = document.getElementById("profile-photo");
  photo.src = profile.photo;
  photo.alt = `Portrait of ${profile.name}`;

  document.title = `${profile.name} | ${profile.title}`;
  document.getElementById("year").textContent = new Date().getFullYear();
}

// ---------- Mobile nav ----------

function initNav() {
  const toggle = document.querySelector(".nav-toggle");
  const nav = document.getElementById("site-nav");

  const setOpen = (open) => {
    nav.classList.toggle("is-open", open);
    toggle.setAttribute("aria-expanded", String(open));
    toggle.setAttribute("aria-label", open ? "Close menu" : "Open menu");
  };

  toggle.addEventListener("click", () => setOpen(!nav.classList.contains("is-open")));
  nav.addEventListener("click", (e) => { if (e.target.closest("a")) setOpen(false); });
  document.addEventListener("keydown", (e) => { if (e.key === "Escape") setOpen(false); });
}

// Highlight the nav link for the section currently in view
function initActiveLink() {
  const links = [...document.querySelectorAll(".site-nav a")];
  const sections = links
    .map((a) => document.querySelector(a.getAttribute("href")))
    .filter(Boolean);

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        links.forEach((a) =>
          a.classList.toggle("is-active", a.getAttribute("href") === `#${entry.target.id}`)
        );
      });
    },
    { rootMargin: "-45% 0px -50% 0px" }
  );

  sections.forEach((s) => observer.observe(s));
}

// ---------- Accounts ----------
const PLATFORMS = {
  tiktok: {
    label: "TikTok",
    audience: "followers",
    icon: '<path d="M12.5 2h3.1c.2 1.7 1.2 3.2 2.7 3.9.7.4 1.5.6 2.2.6v3.2c-1.5 0-3-.5-4.2-1.3v6.1a6.5 6.5 0 1 1-6.5-6.5c.3 0 .6 0 .9.1v3.3a3.3 3.3 0 1 0 2.3 3.1V2z"/>'
  },
  youtube: {
    label: "YouTube",
    audience: "subscribers",
    icon: '<path d="M21.6 7.2a2.5 2.5 0 0 0-1.8-1.8C18.2 5 12 5 12 5s-6.2 0-7.8.4A2.5 2.5 0 0 0 2.4 7.2C2 8.8 2 12 2 12s0 3.2.4 4.8a2.5 2.5 0 0 0 1.8 1.8C5.8 19 12 19 12 19s6.2 0 7.8-.4a2.5 2.5 0 0 0 1.8-1.8c.4-1.6.4-4.8.4-4.8s0-3.2-.4-4.8zM10 15V9l5.2 3z"/>'
  },
  facebook: {
    label: "Facebook",
    audience: "followers",
    icon: '<path d="M13.5 21v-7.5h2.5l.4-3h-2.9V8.6c0-.9.3-1.5 1.5-1.5h1.5V4.4c-.3 0-1.2-.1-2.2-.1-2.2 0-3.7 1.3-3.7 3.8v2.4H8v3h2.6V21h2.9z"/>'
  },
  instagram: {
    label: "Instagram",
    audience: "followers",
    icon: '<path fill-rule="evenodd" d="M7.5 2h9A5.5 5.5 0 0 1 22 7.5v9a5.5 5.5 0 0 1-5.5 5.5h-9A5.5 5.5 0 0 1 2 16.5v-9A5.5 5.5 0 0 1 7.5 2zm0 2A3.5 3.5 0 0 0 4 7.5v9A3.5 3.5 0 0 0 7.5 20h9a3.5 3.5 0 0 0 3.5-3.5v-9A3.5 3.5 0 0 0 16.5 4h-9zM12 7a5 5 0 1 1 0 10 5 5 0 1 1 0-10zm0 2a3 3 0 1 0 0 6 3 3 0 1 0 0-6zm5.25-3.25a1.25 1.25 0 1 1 0 2.5 1.25 1.25 0 1 1 0-2.5z"/>'
  }
};

function createAccountCard(account) {
  const p = PLATFORMS[account.platform];
  const card = document.createElement("a");
  card.className = "account-card";
  card.href = account.url;
  card.target = "_blank";
  card.rel = "noopener noreferrer";
  card.setAttribute("aria-label", `${account.handle} on ${p.label} (opens in a new tab)`);

  card.innerHTML = `
    <div class="account-top">
      <svg class="platform-logo" viewBox="0 0 24 24" aria-hidden="true" fill="currentColor">${p.icon}</svg>
      <span class="platform-name">${p.label}</span>
    </div>
    <img class="account-avatar" loading="lazy" width="72" height="72" alt="">
    <h3 class="account-handle"></h3>
    <p class="account-count"><strong>${formatCount(account.followers)}</strong> ${p.audience}</p>
    <span class="account-visit">Visit account</span>
  `;

  // Set user-provided text via textContent / src so data.js can never inject markup
  card.querySelector(".account-handle").textContent = account.handle;
  const avatar = card.querySelector(".account-avatar");
  avatar.src = account.avatar;
  avatar.alt = `${account.handle} profile picture`;
  return card;
}

function renderAccounts() {
  const grid = document.getElementById("accounts-grid");
  grid.replaceChildren(...accounts.filter((a) => PLATFORMS[a.platform]).map(createAccountCard));
}

// ---------- Work (viral content) ----------

let activeFilter = "all";

function createVideoCard(video) {
  const p = PLATFORMS[video.platform];
  const card = document.createElement("a");
  card.className = "video-card";
  card.href = video.url;
  card.target = "_blank";
  card.rel = "noopener noreferrer";

  card.innerHTML = `
    <div class="video-thumb">
      <img loading="lazy" width="360" height="450" alt="">
      <span class="video-badge">
        <svg viewBox="0 0 24 24" aria-hidden="true" fill="currentColor">${p.icon}</svg>${p.label}
      </span>
      <span class="video-play" aria-hidden="true">
        <svg viewBox="0 0 24 24" fill="currentColor"><path d="M8 5.5v13l11-6.5z"/></svg>
      </span>
    </div>
    <div class="video-info">
      <h3 class="video-title"></h3>
      <p class="video-views"><strong>${formatCount(video.views)}</strong> views</p>
    </div>
  `;

  card.querySelector(".video-title").textContent = video.title;
  const img = card.querySelector("img");
  img.src = video.thumbnail;
  img.alt = `Thumbnail for ${video.title}`;
  card.setAttribute("aria-label", `${video.title}, ${p.label}, ${formatCount(video.views)} views (opens in a new tab)`);
  return card;
}

function renderVideos() {
  const grid = document.getElementById("work-grid");
  const visible = videos.filter(
    (v) => PLATFORMS[v.platform] && (activeFilter === "all" || v.platform === activeFilter)
  );

  workExpanded = false; // a new filter always starts collapsed

  if (!visible.length) {
    const empty = document.createElement("p");
    empty.className = "empty-state";
    empty.textContent = "No videos for this platform yet.";
    grid.replaceChildren(empty);
    layoutWork();
    return;
  }
  grid.replaceChildren(...visible.map(createVideoCard));
  reveal(grid.children, 3); // re-animates cards when a filter is changed
  layoutWork();
}

// View More / View Less: the grid is clipped to WORK_MAX_ROWS rows. The row length is read
// from the live grid (3 / 2 / 1 columns depending on the breakpoint), so it adapts on its own.
const WORK_MAX_ROWS = 3;
let workExpanded = false;
let workTimer;

function workMetrics() {
  const grid = document.getElementById("work-grid");
  const cards = [...grid.querySelectorAll(".video-card")];
  const cols = getComputedStyle(grid).gridTemplateColumns.split(" ").length;
  const limit = cols * WORK_MAX_ROWS;
  const hidden = cards[limit];
  // Height of the first WORK_MAX_ROWS rows (offsetTop ignores the reveal animation's transform)
  const collapsed = hidden ? hidden.offsetTop - parseFloat(getComputedStyle(grid).rowGap) : 0;
  return { grid, toggles: cards.length > limit, collapsed };
}

function updateWorkButton(toggles) {
  const btn = document.getElementById("work-toggle");
  btn.parentElement.hidden = !toggles;
  btn.textContent = workExpanded ? "View Less" : "View More";
  btn.setAttribute("aria-expanded", String(workExpanded));
}

// Applies the current state instantly (no animation): used on render, resize and load
function layoutWork() {
  const { grid, toggles, collapsed } = workMetrics();
  clearTimeout(workTimer);
  grid.classList.remove("is-animating");
  updateWorkButton(toggles);

  if (toggles && !workExpanded) {
    grid.classList.add("is-clamped");
    grid.style.maxHeight = `${collapsed}px`;
  } else {
    grid.classList.remove("is-clamped");
    grid.style.maxHeight = "";
  }
}

function toggleWork() {
  const { grid, collapsed } = workMetrics();
  workExpanded = !workExpanded;
  clearTimeout(workTimer);
  updateWorkButton(true);

  grid.classList.add("is-clamped", "is-animating");
  if (workExpanded) {
    grid.style.maxHeight = `${collapsed}px`;
    void grid.offsetHeight; // commit the start height so the transition runs
    grid.style.maxHeight = `${grid.scrollHeight}px`;
  } else {
    grid.style.maxHeight = `${grid.offsetHeight}px`;
    void grid.offsetHeight;
    grid.style.maxHeight = `${collapsed}px`;

    // Collapsing from the bottom of a long list: bring the section back into view
    const section = document.getElementById("work");
    if (section.getBoundingClientRect().top < 0) {
      const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      section.scrollIntoView({ behavior: reduce ? "auto" : "smooth", block: "start" });
    }
  }

  // Timer instead of transitionend so it still finishes with reduced motion
  workTimer = setTimeout(() => {
    grid.classList.remove("is-animating");
    if (workExpanded) {
      grid.classList.remove("is-clamped"); // unclip so hover lifts aren't cut off
      grid.style.maxHeight = "";
    }
  }, 650);
}

function initWorkToggle() {
  document.getElementById("work-toggle").addEventListener("click", toggleWork);

  let queued = false;
  const relayout = () => {
    if (queued) return;
    queued = true;
    requestAnimationFrame(() => { queued = false; layoutWork(); });
  };
  window.addEventListener("resize", relayout);
  window.addEventListener("load", relayout);
  if (document.fonts) document.fonts.ready.then(relayout); // web fonts can change title wrapping
}

function renderFilters() {
  const wrap = document.getElementById("work-filters");
  const options = [["all", "All"], ...Object.entries(PLATFORMS).map(([key, p]) => [key, p.label])];

  wrap.replaceChildren(
    ...options.map(([key, label]) => {
      const btn = document.createElement("button");
      btn.type = "button";
      btn.className = "chip";
      btn.dataset.filter = key;
      btn.textContent = label;
      btn.setAttribute("aria-pressed", String(key === activeFilter));
      return btn;
    })
  );

  wrap.addEventListener("click", (e) => {
    const btn = e.target.closest(".chip");
    if (!btn) return;
    activeFilter = btn.dataset.filter;
    wrap.querySelectorAll(".chip").forEach((c) =>
      c.setAttribute("aria-pressed", String(c === btn))
    );
    renderVideos();
  });
}

// ---------- Services ----------

// Stroke-style icons (24x24), drawn with currentColor
const SERVICE_ICONS = {
  community: '<path d="M21 11.5a8.4 8.4 0 0 1-9 8.4 8.6 8.6 0 0 1-3.6-.8L3 21l1.9-5.1A8.4 8.4 0 1 1 21 11.5z"/><path d="M8.5 11.5h.01M12 11.5h.01M15.5 11.5h.01"/>',
  analytics: '<path d="M3 3v18h18"/><path d="M8 17v-5M13 17V8M18 17v-8"/>',
  design: '<rect x="3" y="4" width="18" height="16" rx="3"/><circle cx="9" cy="10" r="1.6"/><path d="m21 16-5-5-9 9"/>'
};

function createServiceCard(service) {
  const card = document.createElement("article");
  card.className = "service-card";

  card.innerHTML = `
    <span class="service-icon">
      <svg viewBox="0 0 24 24" aria-hidden="true" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round">${SERVICE_ICONS[service.icon]}</svg>
    </span>
    <div class="service-body">
      <h3 class="service-title"></h3>
      <p class="service-desc"></p>
    </div>
  `;

  card.querySelector(".service-title").textContent = service.title;
  card.querySelector(".service-desc").textContent = service.description;
  return card;
}

function renderServices() {
  const grid = document.getElementById("services-grid");
  grid.replaceChildren(...services.filter((s) => SERVICE_ICONS[s.icon]).map(createServiceCard));
}

// ---------- Contact ----------

function renderContact() {
  const body = document.getElementById("contact-body");
  body.className = "contact";

  const subject = encodeURIComponent("Let's work together");
  body.innerHTML = `
    <div class="contact-main">
      <p class="contact-intro"></p>
      <a class="contact-email"></a>
      <div><a class="btn btn-primary contact-cta">Let's Work Together</a></div>
    </div>
    <ul class="contact-links" aria-label="Social media accounts"></ul>
  `;

  body.querySelector(".contact-intro").textContent = profile.contactIntro;

  const email = body.querySelector(".contact-email");
  email.href = `mailto:${profile.email}`;
  email.textContent = profile.email;
  const cta = body.querySelector(".contact-cta");
  cta.href = `mailto:${profile.email}?subject=${subject}`;
  cta.setAttribute("aria-live", "polite");

  // Copy the email to the clipboard and briefly confirm on the button
  const ctaLabel = cta.textContent;
  let ctaTimer;
  cta.addEventListener("click", async (e) => {
    e.preventDefault();
    cta.style.minWidth = `${cta.offsetWidth}px`; // keep layout stable while the text changes
    let message;
    try {
      await navigator.clipboard.writeText(profile.email);
      message = "Email copied!";
    } catch (err) {
      message = "Couldn't copy. Use the email above";
    }
    cta.textContent = message;
    clearTimeout(ctaTimer);
    ctaTimer = setTimeout(() => {
      cta.textContent = ctaLabel;
      cta.style.minWidth = "";
    }, 2000);
  });

  const list = body.querySelector(".contact-links");
  accounts.filter((a) => PLATFORMS[a.platform]).forEach((a) => {
    const p = PLATFORMS[a.platform];
    const li = document.createElement("li");
    li.innerHTML = `
      <a target="_blank" rel="noopener noreferrer">
        <svg viewBox="0 0 24 24" aria-hidden="true" fill="currentColor">${p.icon}</svg>
        <span><span class="link-platform">${p.label}</span><span class="link-handle"></span></span>
      </a>`;
    const link = li.querySelector("a");
    link.href = a.url;
    link.querySelector(".link-handle").textContent = a.handle;
    link.setAttribute("aria-label", `${a.handle} on ${p.label} (opens in a new tab)`);
    list.appendChild(li);
  });
}

// ---------- Init ----------

renderProfile();
renderAccounts();
renderFilters();
renderVideos();
initWorkToggle();
renderServices();
renderContact();
initNav();
initActiveLink();

// Scroll-reveal targets (video cards are handled inside renderVideos)
reveal(document.querySelectorAll(".section-title, .section-intro"));
reveal(document.querySelectorAll(".account-card"), 4);
reveal(document.querySelectorAll(".service-card"), 3);
reveal(document.querySelectorAll(".filters"));
reveal(document.querySelectorAll(".contact-main, .contact-links li"));

initScrollProgress();
initLoader();
