const navLinks = Array.from(document.querySelectorAll(".nav-link"));
const sections = ["top", "test", "pdf", "apps", "extra"]
  .map((id) => document.getElementById(id))
  .filter(Boolean);
const openingCeremonyDate = "2026-08-27";

const updateCountdown = () => {
  const daysLeftElement = document.getElementById("days-left");
  if (!daysLeftElement) return;

  const today = new Date();
  const todayStart = new Date(today.getFullYear(), today.getMonth(), today.getDate());
  const target = new Date(`${openingCeremonyDate}T00:00:00`);
  const diffMs = target.getTime() - todayStart.getTime();
  const daysLeft = Math.ceil(diffMs / (1000 * 60 * 60 * 24));

  if (daysLeft > 0) {
    daysLeftElement.textContent = `あと${daysLeft}日`;
  } else if (daysLeft === 0) {
    daysLeftElement.textContent = "今日です";
  } else {
    daysLeftElement.textContent = "始まりました";
  }
};

updateCountdown();

const setActiveLink = (id) => {
  navLinks.forEach((link) => {
    const isActive = link.getAttribute("href") === `#${id}`;
    link.classList.toggle("active", isActive);
  });
};

const observer = new IntersectionObserver(
  (entries) => {
    const visible = entries
      .filter((entry) => entry.isIntersecting)
      .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];

    if (visible) {
      setActiveLink(visible.target.id);
    }
  },
  {
    rootMargin: "-25% 0px -55% 0px",
    threshold: [0.1, 0.25, 0.5, 0.75],
  }
);

sections.forEach((section) => observer.observe(section));

document.querySelectorAll('a[href^="#"]').forEach((link) => {
  link.addEventListener("click", (event) => {
    const targetId = link.getAttribute("href").slice(1);
    const target = document.getElementById(targetId);

    if (!target) return;

    event.preventDefault();
    target.scrollIntoView({ behavior: "smooth", block: "start" });
    history.pushState(null, "", `#${targetId}`);
    setActiveLink(targetId);
  });
});
