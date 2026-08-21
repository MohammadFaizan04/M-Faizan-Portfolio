const body = document.body;
const ham = document.querySelector("#ham");
const menu = document.querySelector(".mid");
const themeButton = document.querySelector("#lightBtn");

const setTheme = (isLight) => {
  body.classList.toggle("light", isLight);
  themeButton.textContent = isLight ? "☼" : "◐";
  themeButton.setAttribute("aria-label", isLight ? "Switch to dark theme" : "Switch to light theme");
  localStorage.setItem("portfolio-theme", isLight ? "light" : "dark");
};

setTheme(localStorage.getItem("portfolio-theme") === "light");
themeButton?.addEventListener("click", () => setTheme(!body.classList.contains("light")));
ham?.setAttribute("role", "button");
ham?.setAttribute("tabindex", "0");
const toggleMenu = () => { ham.classList.toggle("active"); menu.classList.toggle("show"); };
ham?.addEventListener("click", toggleMenu);
ham?.addEventListener("keydown", (event) => { if (event.key === "Enter" || event.key === " ") { event.preventDefault(); toggleMenu(); } });
document.querySelectorAll("header nav a").forEach((link) => link.addEventListener("click", () => { ham?.classList.remove("active"); menu?.classList.remove("show"); }));

const revealObserver = new IntersectionObserver((entries) => entries.forEach((entry) => entry.isIntersecting && entry.target.classList.add("is-visible")), { threshold: .14 });
document.querySelectorAll("[data-aos]").forEach((element) => { element.classList.add("reveal"); revealObserver.observe(element); });

const sections = [...document.querySelectorAll("main section[id]")];
const navLinks = [...document.querySelectorAll("header nav a")];
const sectionObserver = new IntersectionObserver((entries) => entries.forEach((entry) => { if (entry.isIntersecting) navLinks.forEach((link) => link.classList.toggle("active", link.getAttribute("href") === `#${entry.target.id}`)); }), { rootMargin: "-35% 0px -55%" });
sections.forEach((section) => sectionObserver.observe(section));

const progress = document.querySelector(".scroll-progress");
window.addEventListener("scroll", () => { const max = document.documentElement.scrollHeight - window.innerHeight; progress.style.width = `${max ? (window.scrollY / max) * 100 : 0}%`; }, { passive: true });

document.querySelectorAll(".aboutT div span:first-child").forEach((counter) => { const target = Number.parseInt(counter.textContent, 10); counter.dataset.target = target; counter.textContent = "0+"; const observer = new IntersectionObserver(([entry], observer) => { if (!entry.isIntersecting) return; let current = 0; const tick = () => { current = Math.min(target, current + Math.max(1, Math.ceil(target / 18))); counter.textContent = `${current}+`; if (current < target) requestAnimationFrame(tick); }; tick(); observer.disconnect(); }); observer.observe(counter); });

if (window.matchMedia("(pointer: fine)").matches) document.querySelectorAll(".projectBox").forEach((card) => card.addEventListener("pointermove", (event) => { const rect = card.getBoundingClientRect(); const x = (event.clientX - rect.left) / rect.width - .5; const y = (event.clientY - rect.top) / rect.height - .5; card.style.transform = `perspective(900px) rotateX(${y * -4}deg) rotateY(${x * 4}deg) translateY(-5px)`; }));
document.querySelectorAll(".projectBox").forEach((card) => card.addEventListener("pointerleave", () => { card.style.transform = ""; }));

if (window.AOS) AOS.init({ duration: 700, once: true, disable: window.matchMedia("(prefers-reduced-motion: reduce)").matches });
