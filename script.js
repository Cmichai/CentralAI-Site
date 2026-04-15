const searchText = document.getElementById("searchText");
const menuToggle = document.querySelector(".menu-toggle");
const mobileMenu = document.getElementById("mobileMenu");
const mobileMenuLinks = document.querySelectorAll(".mobile-nav a, .mobile-socials a");

const queries = [
  "where do I even start with AI?",
  "how do I get AI experience in college?",
  "how do I hear from people actually using AI at work?",
  "how can I get hired?"
];

const wait = (ms) => new Promise((resolve) => window.setTimeout(resolve, ms));

function setMenuOpen(isOpen) {
  if (!menuToggle || !mobileMenu) return;

  document.body.classList.toggle("menu-open", isOpen);
  menuToggle.setAttribute("aria-expanded", String(isOpen));
  menuToggle.setAttribute("aria-label", isOpen ? "Close menu" : "Open menu");
  mobileMenu.hidden = !isOpen;
}

if (menuToggle && mobileMenu) {
  menuToggle.addEventListener("click", () => {
    setMenuOpen(menuToggle.getAttribute("aria-expanded") !== "true");
  });

  mobileMenuLinks.forEach((link) => {
    link.addEventListener("click", () => setMenuOpen(false));
  });

  window.addEventListener("keydown", (event) => {
    if (event.key === "Escape") setMenuOpen(false);
  });

  window.addEventListener("resize", () => {
    if (window.innerWidth > 700) setMenuOpen(false);
  });
}

async function runTypingLoop() {
  if (!searchText) return;

  let index = 0;

  while (true) {
    const value = queries[index];

    for (let i = 0; i <= value.length; i += 1) {
      searchText.textContent = value.slice(0, i);
      await wait(index === queries.length - 1 ? 28 : 34);
    }

    await wait(index === queries.length - 1 ? 2600 : 1200);

    if (index !== queries.length - 1) {
      for (let i = value.length; i >= 0; i -= 1) {
        searchText.textContent = value.slice(0, i);
        await wait(12);
      }
    }

    index = (index + 1) % queries.length;
  }
}

runTypingLoop();
