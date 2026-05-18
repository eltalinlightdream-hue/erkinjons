(function () {
  const LS_KEY = "ielts_test_completions";

  function getTestId() {
    const params = new URLSearchParams(window.location.search);

    return (
      params.get("testId") ||
      document.body.dataset.testId ||
      document.documentElement.dataset.testId ||
      location.pathname.split("/").pop()?.replace(".html", "") ||
      document.title ||
      "reading-passage"
    );
  }

  function readAllProgress() {
    try {
      return JSON.parse(localStorage.getItem(LS_KEY) || "{}");
    } catch (_) {
      return {};
    }
  }

  function writeProgress(testId, data) {
    const all = readAllProgress();
    all[testId] = data;
    localStorage.setItem(LS_KEY, JSON.stringify(all));
  }

  function markFinished() {
    try {
      const testId = getTestId();
      const now = new Date().toISOString();

      const progressData = {
        status: "finished",
        score: null,
        total: null,
        completedAt: now,
        completed_at: now,
        updatedAt: now,
        updated_at: now
      };

      writeProgress(testId, progressData);

      window.dispatchEvent(
        new CustomEvent("ielts-test-completed", {
          detail: {
            testId: testId,
            sectionType: "reading",
            status: "finished",
            completed_at: now
          }
        })
      );

      window.dispatchEvent(
        new CustomEvent("reading-test-finished", {
          detail: {
            testId: testId,
            sectionType: "reading",
            status: "finished",
            completed_at: now
          }
        })
      );

      if (window.parent && window.parent !== window) {
        window.parent.postMessage(
          {
            type: "ielts-test-completed",
            detail: {
              testId: testId,
              sectionType: "reading",
              status: "finished",
              completed_at: now
            }
          },
          "*"
        );
      }

      console.log("Reading progress saved:", testId, progressData);
    } catch (error) {
      console.error("Could not save reading progress:", error);
    }
  }

  document.addEventListener(
    "click",
    function (e) {
      const btn = e.target.closest(
        "button, input[type='button'], input[type='submit']"
      );

      if (!btn) return;

      const text = (
        (btn.textContent || "") +
        " " +
        (btn.value || "") +
        " " +
        (btn.id || "") +
        " " +
        (btn.className || "")
      ).toLowerCase();

      if (
        text.includes("check") ||
        text.includes("submit") ||
        text.includes("deliver") ||
        text.includes("finish")
      ) {
        setTimeout(markFinished, 300);
      }
    },
    true
  );
})();
