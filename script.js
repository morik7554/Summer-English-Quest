const navLinks = Array.from(document.querySelectorAll(".nav-link"));
const sections = ["top", "route", "range", "grammar", "apps", "check"]
  .map((id) => document.getElementById(id))
  .filter(Boolean);

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

const checkboxes = Array.from(document.querySelectorAll(".checklist-grid input"));
const checkedCount = document.getElementById("checked-count");
const checkProgress = document.getElementById("check-progress");
const storageKey = "exam-checklist-progress";

const updateChecklistProgress = () => {
  if (!checkedCount || !checkProgress || checkboxes.length === 0) return;

  const completed = checkboxes.filter((checkbox) => checkbox.checked).length;
  checkedCount.textContent = String(completed);
  checkProgress.style.width = `${(completed / checkboxes.length) * 100}%`;
};

try {
  const saved = JSON.parse(localStorage.getItem(storageKey) || "[]");
  checkboxes.forEach((checkbox, index) => {
    checkbox.checked = Boolean(saved[index]);
  });
} catch {
  localStorage.removeItem(storageKey);
}

checkboxes.forEach((checkbox) => {
  checkbox.addEventListener("change", () => {
    localStorage.setItem(
      storageKey,
      JSON.stringify(checkboxes.map((item) => item.checked))
    );
    updateChecklistProgress();
  });
});

updateChecklistProgress();
