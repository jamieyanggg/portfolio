// main.js
// Plain JavaScript only – no React, no imports, no modules

document.addEventListener("DOMContentLoaded", () => {
  initScrollReveal();
  initHoverTilt();
});

// 1) Scroll reveal for sections / big blocks
function initScrollReveal() {
  // Add scroll-reveal class to any elements you want; many of your
  // elements already animate via inline styles, so this is light.
  const candidates = document.querySelectorAll(
    "section, nav, .container, .scroll-reveal"
  );

  if (!("IntersectionObserver" in window)) {
    candidates.forEach((el) => {
      el.style.opacity = "1";
      el.style.transform = "translateY(0)";
    });
    return;
  }

  const obs = new IntersectionObserver(
    (entries, observer) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.style.transition =
            "opacity 0.8s ease-out, transform 0.8s ease-out";
          entry.target.style.opacity = "1";
          entry.target.style.transform = "translateY(0)";
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.15 }
  );

  candidates.forEach((el) => {
    // Only animate elements that don't already appear fully visible
    if (!el.style.opacity || el.style.opacity === "0") {
      el.classList.add("scroll-reveal");
      obs.observe(el);
    }
  });
}

// 2) Subtle 3D hover tilt on cards / polaroids (shadows etc.)
function initHoverTilt() {
  // pick elements that already look like interactive cards
  const cards = document.querySelectorAll(
    ".shadow-xl, .shadow-2xl, .cursor-pointer"
  );

  const maxTilt = 10;

  cards.forEach((card) => {
    card.addEventListener("mousemove", (e) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;

      const rotateX = ((y - centerY) / centerY) * -maxTilt;
      const rotateY = ((x - centerX) / centerX) * maxTilt;

      card.style.transform = `rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-4px)`;
      card.style.transition = "transform 0.1s ease-out, box-shadow 0.1s ease-out";
      card.style.boxShadow = "0 18px 40px rgba(0, 0, 0, 0.16)";
    });

    card.addEventListener("mouseleave", () => {
      card.style.transform = "rotateX(0deg) rotateY(0deg) translateY(0)";
      card.style.boxShadow = "";
      card.style.transition = "transform 0.25s ease-out, box-shadow 0.25s ease-out";
    });
  });
}
