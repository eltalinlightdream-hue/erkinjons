/* Universal IELTS Reading behaviour - Abduraimov Erkinjon */
(function () {
  const TELEGRAM_URL = "https://t.me/augustus_flores";
  const DISPLAY_NAME = "Abduraimov Erkinjon";

  function ready(fn) {
    if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", fn);
    else fn();
  }

  function createBrand() {
    const a = document.createElement("a");
    a.className = "aur-brand";
    a.href = TELEGRAM_URL;
    a.target = "_blank";
    a.rel = "noopener";
    a.innerHTML = '<span class="aur-brand-badge">A</span><span>' + DISPLAY_NAME + '</span>';
    return a;
  }

  function createTelegram() {
    const a = document.createElement("a");
    a.className = "aur-telegram";
    a.href = TELEGRAM_URL;
    a.target = "_blank";
    a.rel = "noopener";
    a.textContent = "Telegram";
    return a;
  }

  function normalizeHeader() {
    document.body.classList.add("aur-reading-universal");

    let header = document.querySelector("header, .header, .topbar");
    if (!header) {
      header = document.createElement("header");
      document.body.insertBefore(header, document.body.firstChild);
    }

    const left =
      header.querySelector(".logo-area") ||
      header.querySelector(".header-left") ||
      header.querySelector(".header__logo") ||
      header.querySelector("._cf66db") ||
      header.firstElementChild ||
      header;

    const right =
      header.querySelector(".header-controls") ||
      header.querySelector(".header-right") ||
      header.querySelector(".header__icons") ||
      header.querySelector("._a95c93") ||
      header.lastElementChild ||
      header;

    if (left) {
      left.innerHTML = "";
      left.appendChild(createBrand());
      left.appendChild(createTelegram());
    }

    // Remove old/non-user branding links
    header.querySelectorAll('a[href*="realexamielts"], a[href*="instagram"], a[href*="youtube"], a[href*="REAL"]').forEach(el => el.remove());

    // Make remaining old telegram link point to user's channel
    header.querySelectorAll('a[href*="t.me"]').forEach(a => {
      a.href = TELEGRAM_URL;
      if (!a.classList.contains("aur-brand") && !a.classList.contains("aur-telegram")) {
        a.textContent = "Telegram";
        a.classList.add("aur-telegram");
      }
    });

    // Ensure there is a timer if old header lost it
    if (!header.querySelector("#timer, #timer-display, #testTimer, .header__timer")) {
      const timerWrap = document.createElement("div");
      timerWrap.className = "timer-container";
      timerWrap.innerHTML = '<span id="timer">20:00</span>';
      right.appendChild(timerWrap);
    }
  }

  function normalizeTimer() {
    const timerEls = document.querySelectorAll("#timer, #timer-display, #testTimer, .timer-display, .header__timer");
    timerEls.forEach(el => {
      const text = (el.textContent || "").trim();
      if (text === "60:00" || text === "" || /^([3-9]\d|[1-9]\d{2,}):/.test(text)) {
        el.textContent = "20:00";
      }
    });

    // Common globals in these standalone files
    try { if (typeof window.timeLeft !== "undefined") window.timeLeft = 20 * 60; } catch (_) {}
    try { if (typeof window.timeInSeconds !== "undefined") window.timeInSeconds = 20 * 60; } catch (_) {}
    try { if (typeof window.totalSeconds !== "undefined") window.totalSeconds = 20 * 60; } catch (_) {}
  }

  function ensureStructureClasses() {
    // Some older passages have <main> with two direct children: passage-container and questions-container.
    const main = document.querySelector("main");
    const passage = document.querySelector(".passage-container, .passage-panel, .passage-section, ._fa5ec3");
    const questions = document.querySelector(".questions-container, .questions-panel, .questions-section, #questions-container, ._221e08");

    if (main && passage && questions && !document.querySelector(".panels-container, .test-container, .layout")) {
      main.classList.add("panels-container");
    }

    // If an old template uses passage + questions directly under body, make body less chaotic via CSS classes.
    if (passage) passage.setAttribute("data-aur-passage", "true");
    if (questions) questions.setAttribute("data-aur-questions", "true");
  }

  function normalizeQuestionNav() {
    const nav = document.querySelector("footer, .footer, .bottom-nav, .nav-row, .question-navigation, .navbar");
    if (nav) nav.classList.add("aur-bottom-nav");

    document.querySelectorAll(".subQuestion, .question-nav-btn, .nav-question, .q-nav button").forEach(btn => {
      if ((btn.textContent || "").trim()) btn.classList.add("aur-qnav");
    });
  }

  function patchSubmitFinishedStatus() {
    const buttons = Array.from(document.querySelectorAll("button, input[type='button'], input[type='submit']"));
    const submitButtons = buttons.filter(btn => {
      const text = ((btn.textContent || btn.value || "") + " " + (btn.id || "") + " " + (btn.className || "")).toLowerCase();
      return text.includes("check") || text.includes("submit") || text.includes("deliver") || text.includes("finish");
    });

    submitButtons.forEach(btn => {
      if (btn.dataset.aurProgressBound) return;
      btn.dataset.aurProgressBound = "true";
      btn.addEventListener("click", () => {
        try {
          const testId = location.pathname.split("/").pop() || document.title || "reading-passage";
          const payload = {
            status: "finished",
            completed_at: new Date().toISOString(),
            source: "reading-universal-layout"
          };
          localStorage.setItem("reading-progress:" + testId, JSON.stringify(payload));
          window.dispatchEvent(new CustomEvent("reading-test-finished", { detail: { testId, ...payload } }));
        } catch (_) {}
      }, true);
    });
  }

  function init() {
    normalizeHeader();
    normalizeTimer();
    ensureStructureClasses();
    normalizeQuestionNav();
    patchSubmitFinishedStatus();

    // Run once more after old scripts finish.
    setTimeout(() => {
      normalizeHeader();
      normalizeTimer();
      normalizeQuestionNav();
      patchSubmitFinishedStatus();
    }, 500);
  }

  ready(init);
})();
