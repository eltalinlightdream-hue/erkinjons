import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";
import { requireSupabaseAuth } from "@/integrations/supabase/auth-middleware";

const ratingSchema = z.enum(["again", "hard", "good", "easy"]);

function nextSchedule(rating: z.infer<typeof ratingSchema>, intervalDays: number, ease: number) {
  let newInterval = intervalDays;
  let newEase = ease;
  if (rating === "again") { newInterval = 0; newEase = Math.max(1.3, ease - 0.2); }
  else if (rating === "hard") { newInterval = Math.max(1, Math.round(intervalDays * 1.2)); newEase = Math.max(1.3, ease - 0.15); }
  else if (rating === "good") { newInterval = intervalDays < 1 ? 1 : Math.round(intervalDays * ease); }
  else { newInterval = intervalDays < 1 ? 2 : Math.round(intervalDays * ease * 1.3); newEase = ease + 0.1; }
  const next = new Date();
  if (newInterval === 0) next.setMinutes(next.getMinutes() + 5);
  else next.setDate(next.getDate() + newInterval);
  return { interval_days: newInterval, ease_factor: newEase, next_review: next.toISOString() };
}

export const listFolders = createServerFn({ method: "GET" })
  .middleware([requireSupabaseAuth])
  .handler(async ({ context }) => {
    const { supabase, userId } = context;
    const { data: folders } = await supabase.from("vocabulary_folders").select("*").eq("user_id", userId).order("created_at");
    const { data: words } = await supabase.from("vocabulary_words").select("folder_id, next_review").eq("user_id", userId);
    const now = new Date().toISOString();
    return (folders ?? []).map((f) => {
      const list = (words ?? []).filter((w) => w.folder_id === f.id);
      return {
        ...f,
        count: list.length,
        due: list.filter((w) => w.next_review <= now).length,
      };
    });
  });

export const createFolder = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator(z.object({ name: z.string().trim().min(1).max(60) }).parse)
  .handler(async ({ data, context }) => {
    const { error, data: row } = await context.supabase.from("vocabulary_folders").insert({ user_id: context.userId, name: data.name }).select().single();
    if (error) throw new Error(error.message);
    return row;
  });

export const renameFolder = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator(z.object({ id: z.string().uuid(), name: z.string().trim().min(1).max(60) }).parse)
  .handler(async ({ data, context }) => {
    const { error } = await context.supabase.from("vocabulary_folders").update({ name: data.name }).eq("id", data.id);
    if (error) throw new Error(error.message);
    return { ok: true };
  });

export const deleteFolder = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator(z.object({ id: z.string().uuid() }).parse)
  .handler(async ({ data, context }) => {
    const { error } = await context.supabase.from("vocabulary_folders").delete().eq("id", data.id).eq("is_default", false);
    if (error) throw new Error(error.message);
    return { ok: true };
  });

export const listWords = createServerFn({ method: "GET" })
  .middleware([requireSupabaseAuth])
  .inputValidator(z.object({ folderId: z.string().uuid() }).parse)
  .handler(async ({ data, context }) => {
    const { data: rows, error } = await context.supabase
      .from("vocabulary_words")
      .select("*")
      .eq("user_id", context.userId)
      .eq("folder_id", data.folderId)
      .order("created_at", { ascending: false });
    if (error) throw new Error(error.message);
    return rows ?? [];
  });

export const addWord = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator(z.object({
    folderId: z.string().uuid(),
    word: z.string().trim().min(1).max(120),
    definition: z.string().trim().min(1).max(1000),
    example: z.string().trim().max(1000).optional().default(""),
  }).parse)
  .handler(async ({ data, context }) => {
    const { error, data: row } = await context.supabase
      .from("vocabulary_words")
      .insert({
        user_id: context.userId,
        folder_id: data.folderId,
        word: data.word,
        definition: data.definition,
        example: data.example,
      })
      .select().single();
    if (error) throw new Error(error.message);
    return row;
  });

export const deleteWord = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator(z.object({ id: z.string().uuid() }).parse)
  .handler(async ({ data, context }) => {
    const { error } = await context.supabase.from("vocabulary_words").delete().eq("id", data.id);
    if (error) throw new Error(error.message);
    return { ok: true };
  });

export const reviewWord = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator(z.object({ id: z.string().uuid(), rating: ratingSchema }).parse)
  .handler(async ({ data, context }) => {
    const { data: row } = await context.supabase.from("vocabulary_words").select("interval_days, ease_factor").eq("id", data.id).single();
    if (!row) throw new Error("Not found");
    const sch = nextSchedule(data.rating, row.interval_days, Number(row.ease_factor));
    const { error } = await context.supabase
      .from("vocabulary_words")
      .update({ ...sch, last_reviewed: new Date().toISOString() })
      .eq("id", data.id);
    if (error) throw new Error(error.message);
    return { ok: true };
  });

export const dueWords = createServerFn({ method: "GET" })
  .middleware([requireSupabaseAuth])
  .inputValidator(z.object({ folderId: z.string().uuid().optional() }).parse)
  .handler(async ({ data, context }) => {
    let q = context.supabase
      .from("vocabulary_words")
      .select("*")
      .eq("user_id", context.userId)
      .lte("next_review", new Date().toISOString())
      .order("next_review");
    if (data.folderId) q = q.eq("folder_id", data.folderId);
    const { data: rows, error } = await q;
    if (error) throw new Error(error.message);
    return rows ?? [];
  });

export const dueCount = createServerFn({ method: "GET" })
  .handler(async () => {
    return { count: 0 };
  });

export const reviewStreak = createServerFn({ method: "GET" })
  .middleware([requireSupabaseAuth])
  .handler(async ({ context }) => {
    const { data } = await context.supabase
      .from("vocabulary_words")
      .select("last_reviewed")
      .eq("user_id", context.userId)
      .not("last_reviewed", "is", null)
      .order("last_reviewed", { ascending: false })
      .limit(500);
    const days = new Set<string>();
    for (const r of data ?? []) {
      if (r.last_reviewed) days.add(new Date(r.last_reviewed).toISOString().slice(0, 10));
    }
    let streak = 0;
    const d = new Date();
    while (days.has(d.toISOString().slice(0, 10))) {
      streak++;
      d.setDate(d.getDate() - 1);
    }
    return { streak, totalAdded: (data ?? []).length };
  });