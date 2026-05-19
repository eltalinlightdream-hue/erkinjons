import { createContext, useContext, useEffect, useState, ReactNode } from "react";
import type { Session, User } from "@supabase/supabase-js";
import { supabase } from "@/integrations/supabase/client";
import { getDeviceFingerprint } from "@/lib/fingerprint";

export interface Profile {
  id: string;
  email: string | null;
  full_name: string | null;
  is_premium: boolean;
  device_fingerprint: string | null;
  device_last_seen: string | null;
  activated_at: string | null;
}

interface AuthCtx {
  user: User | null;
  session: Session | null;
  profile: Profile | null;
  loading: boolean;
  deviceConflict: boolean;
  signOut: () => Promise<void>;
  refreshProfile: () => Promise<void>;
}

const Ctx = createContext<AuthCtx | null>(null);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [profile, setProfile] = useState<Profile | null>(null);
  const [loading, setLoading] = useState(true);
  const [deviceConflict, setDeviceConflict] = useState(false);

  const loadProfile = async (uid: string) => {
    const { data } = await supabase
      .from("profiles")
      .select("*")
      .eq("id", uid)
      .maybeSingle();
    if (!data) { setProfile(null); return; }
    setProfile(data as Profile);

    // Device-binding for premium users
    if (data.is_premium) {
      const fp = getDeviceFingerprint();
      if (!data.device_fingerprint) {
        await supabase.from("profiles").update({
          device_fingerprint: fp,
          device_last_seen: new Date().toISOString(),
        } as never).eq("id", uid);
        setDeviceConflict(false);
      } else if (data.device_fingerprint !== fp) {
        setDeviceConflict(true);
      } else {
        setDeviceConflict(false);
        await supabase.from("profiles").update({
          device_last_seen: new Date().toISOString(),
        } as never).eq("id", uid);
      }
    } else {
      setDeviceConflict(false);
    }
  };

  useEffect(() => {
    const { data: sub } = supabase.auth.onAuthStateChange((_e, s) => {
      setSession(s);
      setUser(s?.user ?? null);
      if (s?.user) {
        setTimeout(() => loadProfile(s.user.id), 0);
      } else {
        setProfile(null);
        setDeviceConflict(false);
      }
    });
    (async () => {
      const { data: sessionData } = await supabase.auth.getSession();
      if (sessionData.session) {
        // Validate the cached token with the server. If invalid/expired and
        // refresh fails, clear the bad session so we don't attach a dead
        // bearer token to every protected serverFn call.
        const { data: userData, error } = await supabase.auth.getUser();
        if (error || !userData.user) {
          await supabase.auth.signOut();
          setSession(null);
          setUser(null);
          setProfile(null);
        } else {
          setSession(sessionData.session);
          setUser(userData.user);
          loadProfile(userData.user.id);
        }
      }
      setLoading(false);
    })();
    return () => sub.subscription.unsubscribe();
  }, []);

  const value: AuthCtx = {
    user, session, profile, loading, deviceConflict,
    signOut: async () => { await supabase.auth.signOut(); },
    refreshProfile: async () => { if (user) await loadProfile(user.id); },
  };
  return <Ctx.Provider value={value}>{children}</Ctx.Provider>;
}

export function useAuth() {
  const v = useContext(Ctx);
  if (!v) throw new Error("useAuth outside provider");
  return v;
}
