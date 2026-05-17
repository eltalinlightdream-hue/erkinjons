import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";
import { requireSupabaseAuth } from "@/integrations/supabase/auth-middleware";

export const getNote = createServerFn({ method: "GET" })
  .middleware([requireSupabaseAuth])
  .inputValidator(z.object({ passageId: z.string().min(1).max(120) }).parse)
  .handler(async ({ data, context }) => {
    const { data: row } = await context.supabase
      .from("passage_notes")
      .select("notes")
      .eq("user_id", context.userId)
      .eq("passage_id", data.passageId)
      .maybeSingle();
    return { notes: row?.notes ?? "" };
  });

export const saveNote = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator(z.object({ passageId: z.string().min(1).max(120), notes: z.string().max(20000) }).parse)
  .handler(async ({ data, context }) => {
    const { error } = await context.supabase
      .from("passage_notes")
      .upsert({
        user_id: context.userId,
        passage_id: data.passageId,
        notes: data.notes,
        updated_at: new Date().toISOString(),
      }, { onConflict: "user_id,passage_id" });
    if (error) throw new Error(error.message);
    return { ok: true };
  });