(function () {
  function getTestId() {
    return (
      document.body.dataset.testId ||
      document.documentElement.dataset.testId ||
      location.pathname.split("/").pop() ||
      document.title ||
      "reading-passage"
    );
  }

  function markFinished() {
    try {
      const testId = getTestId();

      const progressData = {
        testId: testId,
        sectionType: "reading",
        status: "finished",
        completed_at: new Date().toISOString()
      };

      localStorage.setItem(
        "reading-progress:" + testId,
        JSON.stringify(progressData)
      );

      localStorage.setItem(
        "test-progress:" + testId,
        JSON.stringify(progressData)
      );

      window.dispatchEvent(
        new CustomEvent("reading-test-finished", {
          detail: progressData
        })
      );

      window.dispatchEvent(
        new CustomEvent("ielts-test-completed", {
          detail: progressData
        })
      );

      if (window.parent && window.parent !== window) {
        window.parent.postMessage(
          {
            type: "ielts-test-completed",
            detail: progressData
          },
          "*"
        );
      }

      console.log("Reading status saved as finished:", progressData);
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
