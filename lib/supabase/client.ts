// ==============================================================================
// ASCEND - SUPABASE BROWSER CLIENT
// ==============================================================================

import { createBrowserClient } from '@supabase/ssr';

export function createClient() {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://placeholder.supabase.co';
  const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || 'placeholder-key';

  return createBrowserClient(supabaseUrl, supabaseKey);
}

export const isSupabaseConfigured = (): boolean => {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  if (!url || !key) return false;
  if (url.includes('placeholder') || url.includes('your-project-id')) return false;

  // Validate the URL doesn't include path suffixes like /rest/v1/ — the SDK
  // appends those itself. A trailing path causes double-suffixed URLs that
  // silently fail and make the app look "offline."
  try {
    const parsed = new URL(url);
    if (parsed.pathname !== '/' && parsed.pathname !== '') {
      console.warn(
        `[ASCEND] NEXT_PUBLIC_SUPABASE_URL has a path suffix "${parsed.pathname}" — ` +
        `this will break Supabase SDK requests. Use the bare project URL: ${parsed.origin}`
      );
      // Still return true — we've warned, and the corrected origin might work
      // for some SDK operations. The real fix is to correct the env var.
    }
  } catch {
    return false;
  }

  return true;
};
