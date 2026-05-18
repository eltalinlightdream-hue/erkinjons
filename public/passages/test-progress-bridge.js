(function () {
  const LS_KEY = "ielts_test_completions";
  const SUPABASE_URL = "https://gwhgzzxcznyapfqdemdo.supabase.co";
  const SUPABASE_PUBLISHABLE_KEY = "sb_publishable_e9BS_8_1T3VlDV24phQ9jQ_njyxgTGq";

  const FILE_TO_TEST_ID = {
    "Day_1_Passage_3_Piraha.html": "p3-piraha",
    "Passage_2_TV_Advertising.html": "p2-tv-advertising",
    "Tunnelling_under_the_Thames.html": "p1-thames-tunnel",
    "gemini-code-1778993342900.html": "p3-business-innovation",
    "gemini-code-1778994470958.html": "p1-katherine-mansfield",
    "gemini-code-1778995279738.html": "p2-the-tasmanian-tiger",
    "IELTS_Radiocarbon_Dating_Nancy_Athfield_Test.html": "p1-radiocarbon-dating",
    "IELTS_Passage2_Return_of_Monkey_Life_Test.html": "p2-the-return-of-monkey-life",
    "IELTS_The_Sound_of_Dolphin_Test.html": "p1-the-sound-of-dolphin",
    "IELTS_Passage1_Morse_Code_Test.html": "p1-morse-code",
    "IELTS_Why_Good_Ideas_Fail_Test.html": "p1-why-good-ideas-fail",
    "IELTS_Passage1_Thomas_Young_Test.html": "p1-thomas-young-the-last-true-know-it-all",
    "IELTS_Passage3_What_Do_Babies_Know_Test.html": "p3-what-do-babies-know",
  };

  const SUBMIT_SELECTORS = [
    "#submit-btn",
    "#deliver-button",
    "#submit-answers-btn",
    ".footer__deliverButton",
    ".footer__deliverButton___3FM07",
  ];

  function testIdFromPage() {
    const params = new URLSearchParams(window.location.search);
    const fromQuery = params.get("testId");
    if (fromQuery) return fromQuery;

    const fileName = decodeURIComponent(window.location.pathname.split("/").pop() || "");
    return FILE_TO_TEST_ID[fileName] || null;
  }

  function readAllProgress() {
    try {
      return JSON.parse(localStorage.getItem(LS_KEY) || "{}");
    } catch {
      return {};
    }
  }

  function writeProgress(testId, status, score, total, completedAt) {
    const now = new Date().toISOString();
    const all = readAllProgress();

    all[testId] = {
      status,
      score: Number.isFinite(score) ? score : null,
      total: Number.isFinite(total) ? total : null,
      completedAt: completedAt || (status === "finished" ? now : null),
      updatedAt: now,
    };

    localStorage.setItem(LS_KEY, JSON.stringify(all));
  }

  function getSupabaseSession() {
    for (let i = 0; i < localStorage.length; i += 1) {
      const key = localStorage.key(i);
      if (!key || !key.startsWith("sb-") || !key.endsWith("-auth-token")) continue;

      try {
        const value = JSON.parse(localStorage.getItem(key) || "{}");
        const session = value.currentSession || value;

        if (session?.access_token && session?.user?.id) {
          return {
            accessToken: session.access_token,
            userId: session.user.id,
          };
        }
      } catch {
        // Ignore unrelated localStorage keys.
      }
    }

    return null;
  }

  async function saveToSupabase(testId, status, score, total, completedAt) {
    const session = getSupabaseSession();
    if (!session) return;

    const now = new Date().toISOString();

    await fetch(`${SUPABASE_URL}/rest/v1/test_progress?on_conflict=user_id,test_id`, {
      method: "POST",
      headers: {
        apikey: SUPABASE_PUBLISHABLE_KEY,
        Authorization: `Bearer ${session.accessToken}`,
        "Content-Type": "application/json",
        Prefer: "resolution=merge-duplicates,return=minimal",
      },
      body: JSON.stringify({
        user_id: session.userId,
        test_id: testId,
        status,
        score: Number.isFinite(score) ? score : null,
        total: Number.isFinite(total) ? total : null,
        completed_at: status === "finished" ? completedAt || now : null,
        updated_at: now,
      }),
    }).catch(() => {});
  }

  function parseFirstNumber(text) {
    const match = String(text || "").match(/\d+/);
    return match ? Number(match[0]) : null;
  }

  function inferScoreAndTotal() {
    const scoreTexts = [
      document.getElementById("score-display")?.textContent,
      document.getElementById("summary-score")?.textContent,
      document.getElementById("score-summary")?.textContent,
    ].filter(Boolean);

    for (const text of scoreTexts) {
      const match = String(text).match(/(\d+)\s*(?:\/|out of)\s*(\d+)/i);
      if (match) {
        return { score: Number(match[1]), total: Number(match[2]) };
      }
    }

    const score =
      parseFirstNumber(document.getElementById("userScore")?.textContent) ??
      parseFirstNumber(document.getElementById("results-score")?.textContent);

    const explicitTotal =
      parseFirstNumber(document.getElementById("totalQuestions")?.textContent) ??
      parseFirstNumber(document.querySelector(".score-total")?.textContent) ??
      parseFirstNumber(document.querySelector('[id*="total" i]')?.textContent);

    const countedTotal = document.querySelectorAll(".subQuestion, .scorable-item, .question").length;
    const total = explicitTotal ?? (countedTotal > 0 ? countedTotal : null);

    return { score, total };
  }

  function markStarted(testId) {
    const current = readAllProgress()[testId];
    if (current?.status === "finished") return;

    writeProgress(testId, "not_completed", null, null, null);
    void saveToSupabase(testId, "not_completed", null, null, null);
  }

  function markFinished(testId) {
    window.setTimeout(() => {
      const { score, total } = inferScoreAndTotal();
      const completedAt = new Date().toISOString();

      writeProgress(testId, "finished", score, total, completedAt);
      void saveToSupabase(testId, "finished", score, total, completedAt);
    }, 150);
  }

  const testId = testIdFromPage();
  if (!testId) return;

  markStarted(testId);

  document.addEventListener(
    "click",
    (event) => {
      const target = event.target instanceof Element ? event.target : null;
      const button = target?.closest("button, [role='button']");
      const text = button?.textContent || "";

      const isSubmitButton =
        !!target?.closest(SUBMIT_SELECTORS.join(",")) ||
        /\b(submit|check answers|finish)\b/i.test(text);

      if (!isSubmitButton) return;

      markFinished(testId);
    },
    true,
  );
})();
