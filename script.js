// Mobile nav toggle
const toggle = document.querySelector(".nav-toggle");
const nav = document.getElementById("nav");

toggle.addEventListener("click", () => {
  const open = nav.classList.toggle("open");
  toggle.setAttribute("aria-expanded", String(open));
});

nav.querySelectorAll("a").forEach((link) =>
  link.addEventListener("click", () => {
    nav.classList.remove("open");
    toggle.setAttribute("aria-expanded", "false");
  })
);

// Highlight the nav link for the section in view
const links = [...nav.querySelectorAll("a")];
const sections = links
  .map((a) => document.querySelector(a.getAttribute("href")))
  .filter(Boolean);

const setActive = () => {
  const y = window.scrollY + window.innerHeight * 0.35;
  let current = sections[0];
  for (const s of sections) if (s.offsetTop <= y) current = s;
  if (window.innerHeight + window.scrollY >= document.body.scrollHeight - 4) {
    current = sections[sections.length - 1];
  }
  links.forEach((a) =>
    a.classList.toggle("active", a.getAttribute("href") === `#${current.id}`)
  );
};
window.addEventListener("scroll", setActive, { passive: true });
setActive();

// Reveal on scroll
const io = new IntersectionObserver(
  (entries) =>
    entries.forEach((e) => {
      if (e.isIntersecting) {
        e.target.classList.add("visible");
        io.unobserve(e.target);
      }
    }),
  { threshold: 0.12 }
);
document.querySelectorAll(".reveal").forEach((el) => io.observe(el));

document.getElementById("year").textContent = new Date().getFullYear();
