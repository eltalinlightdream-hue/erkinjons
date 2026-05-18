// src/hooks/use-test-status.ts
import { useEffect, useState, useCallback } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/use-auth";
import { cn } from "@/lib/utils";

export type ProgressStatus = "not_done" | "not_completed" | "finished";

export type TestStatus = {
  status: ProgressStatus;
  score?: number | null;
  total?: number | null;
  completedAt?: string | null;
  updatedAt: string;
};

type StatusMap = Record<string, TestStatus>;

const LS_KEY = "ielts_test_completions";

export const TEST_PROGRESS_OPTIONS: Array<{ value: ProgressStatus; label: string }> = [
  { value: "not_done", label: "Not done" },
  { value: "not_completed", label: "Not completed" },
  { value: "finished", label: "Finished" },
];

export function getTestProgressMeta(status: ProgressStatus) {
  if (status === "finished") {
    return {
      label: "Finished",
      className: "bg-green-600 text-white border-green-600",
      cardClassName: "border-green-500/40 bg-green-500/5",
    };
  }
  if (status === "not_completed") {
    return {
      label: "Not completed",
      className: "bg-amber-500 text-white border-amber-500",
      cardClassName: "border-amber-500/40 bg-amber-500/5",
    };
  }
  return {
    label: "Not done",
    className: "bg-muted text-muted-foreground border-border",
    cardClassName: "",
  };
}

function normalizeStatus(value: unknown): ProgressStatus {
  if (value === "finished" || value === "not_completed" || value === "not_done") {
    return value;
  }
  return "not_done";
}

function readLocalAll(): StatusMap {
  if (typeof window === "undefined") return {};
  try {
    const raw = JSON.parse(localStorage.getItem(LS_KEY) ?? "{}") as Record<string, any>;
    return Object.fromEntries(
      Object.entries(raw).map(([testId, value]) => {
        const legacyFinished = value?.completed === true;
        return [
          testId,
          {
            status: legacyFinished ? "finished" : normalizeStatus(value?.status),
            score: value?.score ?? null,
            total: value?.total ?? null,
            completedAt: value?.completedAt ?? value?.completed_at ?? null,
            updatedAt:
              value?.updatedAt ??
              value?.updated_at ??
              value?.completedAt ??
              new Date().toISOString(),
          } satisfies TestStatus,
        ];
      }),
    );
  } catch {
    return {};
  }
}

function writeLocal(testId: string, status: TestStatus) {
  if (typeof window === "undefined") return;
  const all = readLocalAll();
  all[testId] = status;
  localStorage.setItem(LS_KEY, JSON.stringify(all));
}

export function useTestStatus(testIds: string[]) {
  const { user } = useAuth();
  const userId = user?.id;
  const [statuses, setStatuses] = useState<StatusMap>(readLocalAll);
  const testIdKey = testIds.join("|");

  useEffect(() => {
    if (!userId) return;
    (supabase as any)
      .from("test_progress")
      .select("test_id, status, score, total, completed_at, updated_at")
      .eq("user_id", userId)
      .in("test_id", testIdKey.split("|").filter(Boolean))
      .then(({ data }: { data: any[] | null }) => {
        if (!data) return;
        setStatuses((prev) => {
          const next = { ...prev };
          for (const row of data) {
            const s: TestStatus = {
              status: normalizeStatus(row.status),
              score: row.score,
              total: row.total,
              completedAt: row.completed_at,
              updatedAt: row.updated_at ?? row.completed_at ?? new Date().toISOString(),
            };
            next[row.test_id] = s;
            writeLocal(row.test_id, s);
          }
          return next;
        });
      });
  }, [userId, testIdKey]);

  useEffect(() => {
    if (!userId) return;
    const localRows = Object.entries(readLocalAll()).filter(
      ([, status]) => status.status !== "not_done",
    );
    if (localRows.length === 0) return;

    void (supabase as any).from("test_progress").upsert(
      localRows.map(([testId, status]) => ({
        user_id: userId,
        test_id: testId,
        status: status.status,
        score: status.score ?? null,
        total: status.total ?? null,
        completed_at:
          status.status === "finished" ? (status.completedAt ?? new Date().toISOString()) : null,
        updated_at: status.updatedAt,
      })),
      { onConflict: "user_id,test_id" },
    );
  }, [userId]);

  const syncFromLocal = useCallback(() => {
    const localStatuses = readLocalAll();
    setStatuses(localStatuses);

    if (!userId) return;
    const localRows = Object.entries(localStatuses).filter(
      ([, status]) => status.status !== "not_done",
    );
    if (localRows.length === 0) return;

    void (supabase as any).from("test_progress").upsert(
      localRows.map(([testId, status]) => ({
        user_id: userId,
        test_id: testId,
        status: status.status,
        score: status.score ?? null,
        total: status.total ?? null,
        completed_at:
          status.status === "finished" ? (status.completedAt ?? new Date().toISOString()) : null,
        updated_at: status.updatedAt,
      })),
      { onConflict: "user_id,test_id" },
    );
  }, [userId]);

  useEffect(() => {
    if (typeof window === "undefined") return;
    window.addEventListener("focus", syncFromLocal);
    return () => window.removeEventListener("focus", syncFromLocal);
  }, [syncFromLocal]);

  const setTestStatus = useCallback(
    async (testId: string, nextStatus: ProgressStatus, score?: number | null, total?: number | null) => {
      const now = new Date().toISOString();
      const status: TestStatus = {
        status: nextStatus,
        score: score ?? null,
        total: total ?? null,
        completedAt: nextStatus === "finished" ? now : null,
        updatedAt: now,
      };
      writeLocal(testId, status);
      setStatuses((prev) => ({ ...prev, [testId]: status }));

      if (userId) {
        await (supabase as any).from("test_progress").upsert(
          {
            user_id: userId,
            test_id: testId,
            status: nextStatus,
            score: score ?? null,
            total: total ?? null,
            completed_at: status.completedAt,
            updated_at: now,
          },
          { onConflict: "user_id,test_id" },
        );
      }
    },
    [userId],
  );

  const markComplete = useCallback(
    async (testId: string, score: number, total: number) => {
      const now = new Date().toISOString();
      const status: TestStatus = {
        status: "finished",
        score,
        total,
        completedAt: now,
        updatedAt: now,
      };
      writeLocal(testId, status);
      setStatuses((prev) => ({ ...prev, [testId]: status }));

      if (userId) {
        await (supabase as any).from("test_progress").upsert(
          {
            user_id: userId,
            test_id: testId,
            status: "finished",
            score,
            total,
            completed_at: status.completedAt,
            updated_at: now,
          },
          { onConflict: "user_id,test_id" },
        );
      }
    },
    [userId],
  );

  const resetTest = useCallback(
    async (testId: string) => {
      const all = readLocalAll();
      delete all[testId];
      if (typeof window !== "undefined") {
        localStorage.setItem(LS_KEY, JSON.stringify(all));
      }
      setStatuses((prev) => {
        const next = { ...prev };
        delete next[testId];
        return next;
      });

      if (userId) {
        await (supabase as any)
          .from("test_progress")
          .delete()
          .eq("user_id", userId)
          .eq("test_id", testId);
      }
    },
    [userId],
  );

  const statusFor = useCallback(
    (testId: string): ProgressStatus => statuses[testId]?.status ?? "not_done",
    [statuses],
  );

  const badgeClassFor = useCallback(
    (testId: string) => cn("text-xs", getTestProgressMeta(statusFor(testId)).className),
    [statusFor],
  );

  return { statuses, statusFor, badgeClassFor, setTestStatus, markComplete, resetTest };
}
