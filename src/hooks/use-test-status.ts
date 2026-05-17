// src/hooks/use-test-status.ts
import { useEffect, useState, useCallback } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/use-auth";

export type TestStatus = {
  completed: boolean;
  score: number;
  total: number;
  completedAt: string;
};

type StatusMap = Record<string, TestStatus>;

const LS_KEY = "ielts_test_completions";

function readLocalAll(): StatusMap {
  try {
    return JSON.parse(localStorage.getItem(LS_KEY) ?? "{}");
  } catch {
    return {};
  }
}

function writeLocal(testId: string, status: TestStatus) {
  const all = readLocalAll();
  all[testId] = status;
  localStorage.setItem(LS_KEY, JSON.stringify(all));
}

// ─── Hook ────────────────────────────────────────────────────────────────────

export function useTestStatus(testIds: string[]) {
  const { user } = useAuth();
  const [statuses, setStatuses] = useState<StatusMap>(readLocalAll);

  // Merge Supabase completions into local state (logged-in users)
  useEffect(() => {
    if (!user) return;
    supabase
      .from("test_completions")
      .select("test_id, score, total, completed_at")
      .eq("user_id", user.id)
      .in("test_id", testIds)
      .then(({ data }) => {
        if (!data) return;
        setStatuses((prev) => {
          const next = { ...prev };
          for (const row of data) {
            const s: TestStatus = {
              completed: true,
              score: row.score,
              total: row.total,
              completedAt: row.completed_at,
            };
            next[row.test_id] = s;
            writeLocal(row.test_id, s); // keep local in sync
          }
          return next;
        });
      });
  }, [user?.id]);

  // Re-check localStorage when user returns to tab (after closing test)
  const syncFromLocal = useCallback(() => {
    setStatuses(readLocalAll());
  }, []);

  useEffect(() => {
    window.addEventListener("focus", syncFromLocal);
    return () => window.removeEventListener("focus", syncFromLocal);
  }, [syncFromLocal]);

  // Call this from the test page (or manually) to mark a test done
  const markComplete = useCallback(
    async (testId: string, score: number, total: number) => {
      const status: TestStatus = {
        completed: true,
        score,
        total,
        completedAt: new Date().toISOString(),
      };
      writeLocal(testId, status);
      setStatuses((prev) => ({ ...prev, [testId]: status }));

      if (user) {
        await supabase.from("test_completions").upsert(
          {
            user_id: user.id,
            test_id: testId,
            score,
            total,
            completed_at: status.completedAt,
          },
          { onConflict: "user_id,test_id" }
        );
      }
    },
    [user?.id]
  );

  const resetTest = useCallback(
    async (testId: string) => {
      const all = readLocalAll();
      delete all[testId];
      localStorage.setItem(LS_KEY, JSON.stringify(all));
      setStatuses((prev) => {
        const next = { ...prev };
        delete next[testId];
        return next;
      });

      if (user) {
        await supabase
          .from("test_completions")
          .delete()
          .eq("user_id", user.id)
          .eq("test_id", testId);
      }
    },
    [user?.id]
  );

  return { statuses, markComplete, resetTest };
}
