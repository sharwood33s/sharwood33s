const revealTargets = document.querySelectorAll(".project-card, .skill-block, .intro, .now, .closing");
const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

if ("IntersectionObserver" in window && !reduceMotion) {
  const revealObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          revealObserver.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.14 }
  );

  revealTargets.forEach((element) => {
    element.classList.add("reveal");
    revealObserver.observe(element);
  });
} else {
  revealTargets.forEach((element) => {
    element.classList.add("is-visible");
  });
}

const navLinks = [...document.querySelectorAll(".nav a[href^='#']")];
const navTargets = navLinks
  .map((link) => ({
    link,
    section: document.querySelector(link.getAttribute("href"))
  }))
  .filter((item) => item.section)
  .sort((a, b) => a.section.offsetTop - b.section.offsetTop);

const syncActiveNav = () => {
  const activationLine = window.innerHeight * 0.34;
  let activeLink = null;

  navTargets.forEach(({ link, section }) => {
    if (section.getBoundingClientRect().top <= activationLine) {
      activeLink = link;
    }
  });

  navLinks.forEach((link) => {
    link.classList.toggle("is-active", link === activeLink);
  });
};

if (navTargets.length > 0) {
  window.addEventListener("scroll", syncActiveNav, { passive: true });
  window.addEventListener("resize", syncActiveNav);
  window.addEventListener("hashchange", syncActiveNav);
  syncActiveNav();
}
