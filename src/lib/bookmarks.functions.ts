import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";
import { requireSupabaseAuth } from "@/integrations/supabase/auth-middleware";

const typeSchema = z.enum(["article", "vocabulary"]);

export const listBookmarks = createServerFn({ method: "GET" })
  .middleware([requireSupabaseAuth])
  .handler(async ({ context }) => {
    const { data } = await context.supabase
      .from("bookmarks")
      .select("*")
      .eq("user_id", context.userId)
      .order("created_at", { ascending: false });
    return data ?? [];
  });

export const toggleBookmark = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator(z.object({ type: typeSchema, referenceId: z.string().min(1).max(200) }).parse)
  .handler(async ({ data, context }) => {
    const { data: existing } = await context.supabase
      .from("bookmarks")
      .select("id")
      .eq("user_id", context.userId)
      .eq("type", data.type)
      .eq("reference_id", data.referenceId)
      .maybeSingle();
    if (existing) {
      await context.supabase.from("bookmarks").delete().eq("id", existing.id);
      return { bookmarked: false };
    }
    const { error } = await context.supabase.from("bookmarks").insert({
      user_id: context.userId, type: data.type, reference_id: data.referenceId,
    });
    if (error) throw new Error(error.message);
    return { bookmarked: true };
  });

export const recordArticleRead = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator(z.object({ slug: z.string().min(1).max(200) }).parse)
  .handler(async ({ data, context }) => {
    await context.supabase.from("articles_read").insert({ user_id: context.userId, article_slug: data.slug });
    return { ok: true };
  });