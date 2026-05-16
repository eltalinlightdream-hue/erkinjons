import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";
import { requireSupabaseAuth } from "@/integrations/supabase/auth-middleware";
import { supabaseAdmin } from "@/integrations/supabase/client.server";

export const redeemActivationCode = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator((input) =>
    z
      .object({
        code: z.string().min(4).max(64).regex(/^[A-Za-z0-9_-]+$/),
        deviceFingerprint: z.string().min(8).max(128),
      })
      .parse(input),
  )
  .handler(async ({ data, context }) => {
    const { userId } = context;
    const code = data.code.trim().toUpperCase();

    const { data: row, error } = await supabaseAdmin
      .from("activation_codes")
      .select("code, used_by, used_at")
      .eq("code", code)
      .maybeSingle();

    if (error) throw new Error("Could not validate code. Please try again.");
    if (!row) throw new Error("This code is not valid.");
    if (row.used_by && row.used_by !== userId) {
      throw new Error("This code has already been redeemed.");
    }

    const now = new Date().toISOString();

    const { error: codeErr } = await supabaseAdmin
      .from("activation_codes")
      .update({ used_by: userId, used_at: now })
      .eq("code", code);
    if (codeErr) throw new Error("Could not redeem code. Please try again.");

    const { error: profErr } = await supabaseAdmin
      .from("profiles")
      .update({
        is_premium: true,
        activated_at: now,
        device_fingerprint: data.deviceFingerprint,
        device_last_seen: now,
      })
      .eq("id", userId);
    if (profErr) throw new Error("Premium activated, but profile update failed.");

    return { ok: true };
  });

export const resetDevice = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator((input) =>
    z.object({ deviceFingerprint: z.string().min(8).max(128) }).parse(input),
  )
  .handler(async ({ data, context }) => {
    // Allow a user to rebind to their CURRENT device (clears the stored fingerprint
    // and sets it to the device that's making this request).
    const now = new Date().toISOString();
    const { error } = await supabaseAdmin
      .from("profiles")
      .update({
        device_fingerprint: data.deviceFingerprint,
        device_last_seen: now,
      })
      .eq("id", context.userId);
    if (error) throw new Error("Could not reset device binding.");
    return { ok: true };
  });