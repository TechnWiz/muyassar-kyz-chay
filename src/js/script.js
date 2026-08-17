const intro = document.querySelector(".intro");
const invitation = document.querySelector(".invitation");
const video = document.querySelector(".intro__video");
const music = document.querySelector(".background-music");
const musicToggle = document.querySelector(".music-toggle");
const startOverlay = document.querySelector(".start-overlay");
let experienceStarted = false;

function showInvitation() {
  if (intro.classList.contains("is-gone")) return;
  intro.classList.add("is-finished");
  window.setTimeout(() => {
    invitation.classList.add("is-visible");
    invitation.setAttribute("aria-hidden", "false");
    document.body.classList.add("intro-complete");
    intro.classList.add("is-gone");
    initRevealAnimations();
  }, 350);
}

function playMusic() {
  music
    .play()
    .then(() => {
      musicToggle.classList.add("is-playing");
      musicToggle.setAttribute("aria-label", "Выключить музыку");
      musicToggle.setAttribute("aria-pressed", "true");
    })
    .catch(() => {
      // Autoplay with sound is blocked by many mobile browsers until the first tap.
      musicToggle.classList.remove("is-playing");
    });
}

function startExperience() {
  if (experienceStarted) return;
  experienceStarted = true;
  startOverlay.classList.add("is-hidden");
  playMusic();
  video.play().catch(showInvitation);
}

video.addEventListener("ended", showInvitation, { once: true });
video.addEventListener("error", showInvitation, { once: true });
startOverlay.addEventListener("click", startExperience);

musicToggle.addEventListener("click", () => {
  if (music.paused) playMusic();
  else {
    music.pause();
    musicToggle.classList.remove("is-playing");
    musicToggle.setAttribute("aria-label", "Включить музыку");
    musicToggle.setAttribute("aria-pressed", "false");
  }
});

const timer = document.querySelector(".timer");
const targetDate = new Date(timer.dataset.date);
const units = { days: 86400000, hours: 3600000, minutes: 60000, seconds: 1000 };
function updateTimer() {
  let remaining = Math.max(0, targetDate - new Date());
  for (const [unit, milliseconds] of Object.entries(units)) {
    const value = Math.floor(remaining / milliseconds);
    remaining -= value * milliseconds;
    timer.querySelector(`[data-${unit}]`).textContent =
      unit === "days"
        ? String(value).padStart(3, "0")
        : String(value).padStart(2, "0");
  }
}
updateTimer();
window.setInterval(updateTimer, 1000);

function initRevealAnimations() {
  const sections = document.querySelectorAll(".section:not(.hero)");
  const observer = new IntersectionObserver(
    (entries, currentObserver) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add("is-revealed");
        currentObserver.unobserve(entry.target);
      });
    },
    { threshold: 0.12 },
  );

  sections.forEach((section) => {
    section.classList.add("will-reveal");
    observer.observe(section);
  });
}

