(function () {
  function markFinished() {
    try {
      const testId = location.pathname.split("/").pop() || document.title || "reading-passage";
      localStorage.setItem("reading-progress:" + testId, JSON.stringify({
        status: "finished",
        completed_at: new Date().toISOString()
      }));
      window.dispatchEvent(new CustomEvent("reading-test-finished", { detail: { testId, status: "finished" } }));
    } catch (_) {}
  }
  document.addEventListener("click", function (e) {
    const btn = e.target.closest("button, input[type='button'], input[type='submit']");
    if (!btn) return;
    const text = ((btn.textContent || btn.value || "") + " " + (btn.id || "") + " " + (btn.className || "")).toLowerCase();
    if (text.includes("check") || text.includes("submit") || text.includes("deliver") || text.includes("finish")) {
      markFinished();
    }
  }, true);
})();
