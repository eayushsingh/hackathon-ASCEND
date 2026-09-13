// ==============================================================================
// ASCEND - SUPABASE OAUTH CALLBACK HANDLER (Route Handler)
// Exchanges OAuth code for session and routes to onboarding or dashboard
// ==============================================================================

import { NextResponse } from 'next/server';
import { createServerSupabaseClient } from '@/lib/supabase/server';

export async function GET(request: Request) {
  const requestUrl = new URL(request.url);
  const code = requestUrl.searchParams.get('code');
  const origin = requestUrl.origin;

  if (code) {
    try {
      const supabase = await createServerSupabaseClient();
      const { data, error } = await supabase.auth.exchangeCodeForSession(code);

      if (!error && data?.user) {
        const user = data.user;
          // Check if profile exists and whether the user has set an archetype
          const { data: profile } = await supabase
            .from('profiles')
            .select('archetype, username')
            .eq('user_id', user.id)
            .maybeSingle();

          // If the user metadata lacks archetype (first-time Google OAuth user),
          // or profile archetype is missing, route to onboarding
          const hasUserChosenArchetype = Boolean(user.user_metadata?.archetype);
          const hasProfileArchetype = Boolean(profile?.archetype);

          const redirectUrl = (!hasUserChosenArchetype || !hasProfileArchetype)
            ? `${origin}/onboarding`
            : `${origin}/dashboard`;
            
          return NextResponse.redirect(redirectUrl);
        }
      } else {
        // If there was an error during exchange, append it to the URL
        return NextResponse.redirect(`${origin}/auth/login?error=${encodeURIComponent(error.message)}`);
      }
    } catch (err: any) {
      console.error('[ASCEND OAuth Callback Error]:', err);
      return NextResponse.redirect(`${origin}/auth/login?error=${encodeURIComponent(err.message || 'unknown_error')}`);
    }
  }

  // Fallback if no code present or user was somehow missing despite no error
  return NextResponse.redirect(`${origin}/auth/login?error=oauth_failed_no_user`);
}
