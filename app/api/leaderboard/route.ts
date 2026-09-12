// ==============================================================================
// ASCEND - PUBLIC LEADERBOARD API
// Exposes ONLY non-sensitive progression metrics: rank, username, archetype, level, total_xp, achievement_count, title
// ZERO private fields exposed (no email, no gold balance, no transactions, no private notes)
// ==============================================================================

import { NextRequest, NextResponse } from 'next/server';
import { createServerSupabaseClient } from '@/lib/supabase/server';
import { isSupabaseConfigured } from '@/lib/supabase/client';
import { LeaderboardEntry, LeaderboardResponse, Archetype } from '@/types/rpg';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const limit = Math.min(100, Math.max(1, parseInt(searchParams.get('limit') || '50', 10)));

    if (!isSupabaseConfigured()) {
      return NextResponse.json({
        leaderboard: [],
        currentUserEntry: null,
        totalParticipants: 0,
        isDemoFallback: true,
      });
    }

    const supabase = await createServerSupabaseClient();
    const { data: { user } } = await supabase.auth.getUser();

    // 1. Fetch from leaderboard_view or query profiles + user_achievements
    const { data: rawRows, error } = await supabase
      .from('profiles')
      .select(`
        user_id,
        username,
        archetype,
        avatar_url,
        level,
        xp,
        title,
        user_achievements ( id )
      `)
      .order('level', { ascending: false })
      .order('xp', { ascending: false });

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    const allRankedEntries: LeaderboardEntry[] = (rawRows || []).map((row, idx) => {
      const achievementCount = Array.isArray(row.user_achievements)
        ? row.user_achievements.length
        : 0;

      return {
        rank: idx + 1,
        user_id: row.user_id,
        username: row.username || 'Ascendant',
        archetype: (row.archetype || 'Cyber Mage') as Archetype,
        avatar_url: row.avatar_url || '/avatars/mage.png',
        level: row.level || 1,
        total_xp: row.xp || 0,
        title: row.title || 'Initiate Seeker',
        achievement_count: achievementCount,
        is_current_user: user ? row.user_id === user.id : false,
      };
    });

    const topList = allRankedEntries.slice(0, limit);
    let currentUserEntry: LeaderboardEntry | null = null;

    if (user) {
      currentUserEntry = allRankedEntries.find((e) => e.user_id === user.id) || null;
    }

    const response: LeaderboardResponse = {
      leaderboard: topList,
      currentUserEntry,
      totalParticipants: allRankedEntries.length,
    };

    return NextResponse.json(response);
  } catch (err: unknown) {
    return NextResponse.json({ error: (err as Error).message }, { status: 500 });
  }
}
