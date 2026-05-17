import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";
import { requireSupabaseAuth } from "@/integrations/supabase/auth-middleware";
import { supabaseAdmin } from "@/integrations/supabase/client.server";

export const recordTestResult = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator(z.object({
    passageTitle: z.string().trim().min(1).max(200),
    score: z.number().int().min(0).max(200),
    total: z.number().int().min(1).max(200),
    band: z.number().min(0).max(9).optional().nullable(),
  }).parse)
  .handler(async ({ data, context }) => {
    const { error } = await context.supabase.from("test_results").insert({
      user_id: context.userId,
      passage_title: data.passageTitle,
      score: data.score,
      total: data.total,
      band: data.band ?? null,
    });
    if (error) throw new Error(error.message);
    return { ok: true };
  });

export const userStats = createServerFn({ method: "GET" })
  .middleware([requireSupabaseAuth])
  .handler(async ({ context }) => {
    const now = new Date();
    const weekAgo = new Date(now.getTime() - 7 * 86400000).toISOString();
    const fifteenAgo = new Date(now.getTime() - 15 * 86400000).toISOString();
    const monthAgo = new Date(now.getTime() - 30 * 86400000).toISOString();
    const yearAgo = new Date(now.getTime() - 365 * 86400000).toISOString();

    const [results, reads, words] = await Promise.all([
      context.supabase.from("test_results").select("*").eq("user_id", context.userId).gte("completed_at", yearAgo).order("completed_at"),
      context.supabase.from("articles_read").select("*").eq("user_id", context.userId).gte("read_at", monthAgo),
      context.supabase.from("vocabulary_words").select("created_at").eq("user_id", context.userId),
    ]);

    const rs = results.data ?? [];
    const inRange = (d: string, since: string) => d >= since;
    const recent = rs.slice(-10).map((r) => ({
      date: new Date(r.completed_at).toLocaleDateString(),
      band: r.band ?? (r.total ? Number(((r.score / r.total) * 9).toFixed(1)) : 0),
    }));

    // Activity heatmap: counts per day for last 90 days
    const heatmap: Record<string, number> = {};
    for (const r of rs) {
      const k = new Date(r.completed_at).toISOString().slice(0, 10);
      heatmap[k] = (heatmap[k] ?? 0) + 1;
    }
    for (const r of reads.data ?? []) {
      const k = new Date(r.read_at).toISOString().slice(0, 10);
      heatmap[k] = (heatmap[k] ?? 0) + 1;
    }

    const wks = words.data ?? [];

    return {
      testsWeek: rs.filter((r) => inRange(r.completed_at, weekAgo)).length,
      tests15: rs.filter((r) => inRange(r.completed_at, fifteenAgo)).length,
      testsMonth: rs.filter((r) => inRange(r.completed_at, monthAgo)).length,
      readsWeek: (reads.data ?? []).filter((r) => inRange(r.read_at, weekAgo)).length,
      readsMonth: (reads.data ?? []).length,
      wordsTotal: wks.length,
      wordsWeek: wks.filter((w) => inRange(w.created_at, weekAgo)).length,
      bandTrend: recent,
      heatmap,
    };
  });

export const weeklyLeaderboard = createServerFn({ method: "GET" })
  .middleware([requireSupabaseAuth])
  .handler(async ({ context }) => {
    const weekAgo = new Date(Date.now() - 7 * 86400000).toISOString();
    // Use admin client for aggregation across users; expose only first names.
    const { data: results } = await supabaseAdmin
      .from("test_results")
      .select("user_id, score, total, band")
      .gte("completed_at", weekAgo);

    const map = new Map<string, { count: number; bandSum: number; bandN: number }>();
    for (const r of results ?? []) {
      const cur = map.get(r.user_id) ?? { count: 0, bandSum: 0, bandN: 0 };
      cur.count++;
      const band = r.band ?? (r.total ? (Number(r.score) / Number(r.total)) * 9 : 0);
      cur.bandSum += band;
      cur.bandN++;
      map.set(r.user_id, cur);
    }
    const userIds = Array.from(map.keys());
    if (userIds.length === 0) return { rows: [], me: null };

    const { data: profiles } = await supabaseAdmin
      .from("profiles")
      .select("id, full_name, email")
      .in("id", userIds);

    const rows = userIds.map((uid) => {
      const p = (profiles ?? []).find((x) => x.id === uid);
      const m = map.get(uid)!;
      const firstName = (p?.full_name?.split(" ")[0] || p?.email?.split("@")[0] || "Student").slice(0, 24);
      return {
        userId: uid,
        name: firstName,
        tests: m.count,
        avgBand: Number((m.bandSum / Math.max(1, m.bandN)).toFixed(1)),
      };
    }).sort((a, b) => b.avgBand - a.avgBand || b.tests - a.tests).slice(0, 10);

    const meIndex = rows.findIndex((r) => r.userId === context.userId);
    return { rows: rows.map((r, i) => ({ ...r, rank: i + 1 })), me: meIndex >= 0 ? meIndex + 1 : null };
  });