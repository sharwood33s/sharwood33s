const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("is-visible");
      }
    });
  },
  { threshold: 0.14 }
);

document.querySelectorAll(".project-card, .skill-block, .intro, .closing").forEach((element) => {
  element.classList.add("reveal");
  observer.observe(element);
});
