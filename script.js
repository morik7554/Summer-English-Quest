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

const teacherComments = [
  "今日の10分が、本番の1点につながる。まず1問やってみよう！",
  "全部を一気にやらなくて大丈夫。今日は一つ、確実にできるようにしよう。",
  "間違いは伸びるチャンス！答え直した問題ほど、力になるよ。",
  "関係代名詞は、先行詞が人か物かを最初に見分けよう！",
  "後置修飾は、説明される名詞を見つけるところから始めよう。",
  "-ingは『〜している』、過去分詞は『〜された』を目印にしよう。",
  "間接疑問文は、疑問詞の後ろを〈主語＋動詞〉の語順にしよう！",
  "English-Words-Masterは、Unit 5を終えたらUnit 6へ進もう。",
  "単語は見るだけでなく、声に出して書くと覚えやすいよ。",
  "わん単 p.28〜35、少しずつでも毎日触れるのが勝ち！",
  "教科書 p.61〜81は、本文と重要表現をセットで確認しよう。",
  "ワークは正解の数より、間違えた理由を説明できることが大切。",
  "迷ったら『解説を見る』→『問題を解く』の順番で進めよう。",
  "昨日できなかった問題が今日できたら、それは大きな成長だよ。",
  "定期テスト③、一つずつ準備すれば大丈夫。一緒に頑張ろう！",
];

const teacherComment = document.getElementById("teacher-comment");
const nextCommentButton = document.getElementById("next-comment");
let teacherCommentIndex = Math.floor(Math.random() * teacherComments.length);

const showTeacherComment = () => {
  if (teacherComment) {
    teacherComment.textContent = teacherComments[teacherCommentIndex];
  }
};

showTeacherComment();

nextCommentButton?.addEventListener("click", () => {
  teacherCommentIndex = (teacherCommentIndex + 1) % teacherComments.length;
  showTeacherComment();
});

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
const storageKey = "exam-3-checklist-progress-v2";

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
