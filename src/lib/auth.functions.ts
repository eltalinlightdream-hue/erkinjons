import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";
import { requireSupabaseAuth } from "@/integrations/supabase/auth-middleware";
import { supabaseAdmin } from "@/integrations/supabase/client.server";

export const ensureUserProfile = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator(
    z
      .object({
        fullName: z.string().trim().max(120).optional().default(""),
      })
      .parse,
  )
  .handler(async ({ data, context }) => {
    const { data: userResult, error: userError } = await supabaseAdmin.auth.admin.getUserById(
      context.userId,
    );

    if (userError || !userResult.user) {
      throw new Error("Could not find this account.");
    }

    const fullName =
      data.fullName ||
      String(userResult.user.user_metadata?.full_name ?? userResult.user.user_metadata?.name ?? "");

    const { error } = await supabaseAdmin.from("profiles").upsert(
      {
        id: context.userId,
        full_name: fullName,
      },
      { onConflict: "id" },
    );

    if (error) throw new Error(error.message);
    return { ok: true };
  });
