// ==============================================================================
// ASCEND - ACHIEVEMENTS CLAIM REWARD API
// ==============================================================================

import { NextRequest, NextResponse } from 'next/server';
import { createServerSupabaseClient } from '@/lib/supabase/server';
import { STATIC_ACHIEVEMENTS } from '@/lib/progression/achievements';
import { calculateLevelFromXP } from '@/lib/progression/levels';
import { Profile } from '@/types/rpg';

export async function POST(request: NextRequest) {
  try {
    const supabase = await createServerSupabaseClient();
    const { data: { user }, error: authError } = await supabase.auth.getUser();

    if (authError || !user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const body = await request.json();
    const { code } = body;

    const achievement = STATIC_ACHIEVEMENTS.find((a) => a.code === code);
    if (!achievement) {
      return NextResponse.json({ error: 'Achievement not found' }, { status: 404 });
    }

    const { data: profile } = await supabase
      .from('profiles')
      .select('*')
      .eq('user_id', user.id)
      .single();

    const currentXp = profile?.xp || 0;
    const currentGold = profile?.gold || 0;
    const currentLevel = profile?.level || 1;

    const newXp = currentXp + achievement.reward_xp;
    const newGold = currentGold + achievement.reward_gold;
    const newLevel = calculateLevelFromXP(newXp);
    const leveledUp = newLevel > currentLevel;

    const nowIso = new Date().toISOString();

    // Mark user achievement as claimed
    await supabase.from('user_achievements').upsert({
      user_id: user.id,
      achievement_id: achievement.id,
      is_claimed: true,
      unlocked_at: nowIso,
      claimed_at: nowIso,
    });

    // Update profile
    await supabase
      .from('profiles')
      .update({
        xp: newXp,
        level: newLevel,
        gold: newGold,
        updated_at: nowIso,
      })
      .eq('user_id', user.id);

    // Log transaction
    await supabase.from('transactions').insert({
      user_id: user.id,
      type: 'achievement_claim',
      amount: achievement.reward_gold,
      currency: 'gold',
      description: `Claimed reward for achievement: ${achievement.title}`,
      created_at: nowIso,
    });

    return NextResponse.json({
      success: true,
      achievement,
      rewardXp: achievement.reward_xp,
      rewardGold: achievement.reward_gold,
      newXp,
      newGold,
      newLevel,
      leveledUp,
      message: `Claimed +${achievement.reward_xp} XP and +${achievement.reward_gold} Gold!`,
    });
  } catch (err: unknown) {
    return NextResponse.json({ error: (err as Error).message }, { status: 500 });
  }
}
