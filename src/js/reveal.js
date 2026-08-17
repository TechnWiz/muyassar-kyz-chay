// Плавное появление блоков при прокрутке.
// Работает независимо от script.js — просто наблюдает за элементами
// с классом .will-reveal и один раз добавляет .is-revealed,
// когда элемент показался в зоне видимости.
(() => {
  const revealEls = document.querySelectorAll(".will-reveal");
  if (!revealEls.length) return;

  // На старых браузерах без поддержки IntersectionObserver
  // просто показываем всё сразу, без анимации.
  if (!("IntersectionObserver" in window)) {
    revealEls.forEach((el) => el.classList.add("is-revealed"));
    return;
  }

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-revealed");
          observer.unobserve(entry.target); // дальше не следим — экономим ресурсы
        }
      });
    },
    { threshold: 0.2, rootMargin: "0px 0px -40px 0px" }
  );

  revealEls.forEach((el) => observer.observe(el));
})();