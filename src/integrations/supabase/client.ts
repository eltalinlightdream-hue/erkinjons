import { createClient } from '@supabase/supabase-js';
import type { Database } from './types';

const SUPABASE_URL = "https://gwhgzzxcznyapfqdemdo.supabase.co";
const SUPABASE_PUBLISHABLE_KEY = "sb_publishable_e9BS_8_1T3VlDV24phQ9jQ_njyxgTGq";

export const supabase = createClient<Database>(SUPABASE_URL, SUPABASE_PUBLISHABLE_KEY, {
  auth: {
    storage: typeof window !== 'undefined' ? localStorage : undefined,
    persistSession: true,
    autoRefreshToken: true,
  }
});
