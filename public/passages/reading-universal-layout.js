(function () {
  const BRAND_TEXT = "Abduraimov Erkinjon";
  const TELEGRAM_URL = "https://t.me/augustus_flores";
  const TIMER_SECONDS = 20 * 60;

  function formatTime(seconds) {
    const safeSeconds = Math.max(0, Number(seconds) || 0);
    const minutes = Math.floor(safeSeconds / 60);
    const rest = safeSeconds % 60;
    return `${String(minutes).padStart(2, "0")}:${String(rest).padStart(2, "0")}`;
  }

  function ensureBranding() {
    const header = document.querySelector("header, .header, header.topbar");
    if (!header) return;

    const left =
      header.querySelector(".header-left, .logo-area, ._cf66db") ||
      header.firstElementChild ||
      header;

    const brand =
      header.querySelector(".site-title, .augustus-brand, .logo-area strong, ._608e9e") ||
      document.createElement("span");
    brand.classList.add("augustus-brand");
    brand.textContent = BRAND_TEXT;

    if (!brand.parentElement) {
      left.prepend(brand);
    }

    header.querySelectorAll("a").forEach((link) => {
      const text = (link.textContent || "").toLowerCase();
      const href = (link.getAttribute("href") || "").toLowerCase();
      if (
        text.includes("real exam") ||
        text.includes("realexam") ||
        text.includes("telegram") ||
        text.includes("augustus") ||
        href.includes("t.me")
      ) {
        link.href = TELEGRAM_URL;
        link.target = "_blank";
        link.rel = "noopener noreferrer";
        link.classList.add("augustus-telegram-link");
        link.textContent = BRAND_TEXT;
      }
    });

    if (!header.querySelector(".augustus-telegram-link")) {
      const link = document.createElement("a");
      link.href = TELEGRAM_URL;
      link.target = "_blank";
      link.rel = "noopener noreferrer";
      link.className = "augustus-telegram-link";
      link.textContent = BRAND_TEXT;
      left.appendChild(link);
    }

    document.querySelectorAll("body *").forEach((node) => {
      if (!node.childNodes || node.childNodes.length !== 1) return;
      const child = node.childNodes[0];
      if (child.nodeType !== Node.TEXT_NODE) return;
      const text = child.textContent || "";
      if (/real\s*exam\s*ielts|@realexamielts/i.test(text)) {
        child.textContent = BRAND_TEXT;
      }
    });
  }

  function normalizeTimerDisplay() {
    const timer = document.querySelector(".timer-display, #timer, #timer-text, #testTimer, ._014246");
    if (timer && !timer.dataset.augustusTimerTouched) {
      timer.textContent = formatTime(TIMER_SECONDS);
      timer.dataset.augustusTimerTouched = "true";
    }

    if (typeof window.timerSeconds === "number") window.timerSeconds = TIMER_SECONDS;
    if (typeof window.timeRemaining === "number") window.timeRemaining = TIMER_SECONDS;
    if (typeof window.timeInSeconds === "number") window.timeInSeconds = TIMER_SECONDS;
    if (typeof window.totalSeconds === "number" && window.totalSeconds > TIMER_SECONDS) {
      window.totalSeconds = TIMER_SECONDS;
    }

    const config = window._df7bb80ca;
    if (config && typeof config === "object") {
      config.timer_seconds = TIMER_SECONDS;
      config.timerTotal = TIMER_SECONDS;
      config.total_parts = 1;
      if (Array.isArray(config.parts) && config.parts.length > 1) {
        config.parts = config.parts.slice(0, 1);
      }
    }
  }

  function ensureSinglePassageLabels() {
    document.querySelectorAll(".part-header, ._b7cff1").forEach((header) => {
      const text = header.textContent || "";
      if (/reading passage|part/i.test(text)) {
        header.querySelectorAll("strong, ._2ebbd6").forEach((el) => {
          if (/part\s+\d+|reading passage\s+\d+/i.test(el.textContent || "")) {
            el.textContent = "Reading Passage";
          }
        });
      }
    });

    document.querySelectorAll("._aaff36").forEach((partButton) => {
      partButton.style.display = "none";
    });
  }

  function polishBottomNavigation() {
    const nav = document.querySelector(".nav-row, footer.navbar");
    if (!nav) return;

    nav.querySelectorAll("button").forEach((button) => {
      const text = (button.textContent || "").trim();
      if (/submit|check answers|finish/i.test(text)) {
        button.setAttribute("aria-label", "Check answers");
      }
    });
  }

  function initUniversalReadingLayout() {
    document.body.classList.add("augustus-reading-layout");
    ensureBranding();
    normalizeTimerDisplay();
    ensureSinglePassageLabels();
    polishBottomNavigation();
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", initUniversalReadingLayout);
  } else {
    initUniversalReadingLayout();
  }

  window.addEventListener("pageshow", initUniversalReadingLayout);
})();
