// ==============================================================================
// ASCEND - QUESTS API: GET, PATCH, DELETE BY ID
// ==============================================================================

import { NextRequest, NextResponse } from 'next/server';
import { createServerSupabaseClient } from '@/lib/supabase/server';
import { DIFFICULTY_REWARDS } from '@/lib/progression/rewards';
import { QuestCategory, QuestDifficulty, AttributeType } from '@/types/rpg';

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const supabase = await createServerSupabaseClient();
    const { data: { user }, error: authError } = await supabase.auth.getUser();

    if (authError || !user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { data: quest, error } = await supabase
      .from('quests')
      .select('*')
      .eq('id', id)
      .eq('user_id', user.id)
      .single();

    if (error || !quest) {
      return NextResponse.json({ error: 'Quest not found' }, { status: 404 });
    }

    return NextResponse.json({ quest });
  } catch (err: unknown) {
    return NextResponse.json({ error: (err as Error).message }, { status: 500 });
  }
}

export async function PATCH(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const supabase = await createServerSupabaseClient();
    const { data: { user }, error: authError } = await supabase.auth.getUser();

    if (authError || !user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const body = await request.json();
    const updateData: Record<string, unknown> = {
      updated_at: new Date().toISOString(),
    };

    if (body.title !== undefined) updateData.title = String(body.title).trim();
    if (body.description !== undefined) updateData.description = String(body.description).trim();
    if (body.category !== undefined) updateData.category = body.category as QuestCategory;
    if (body.attribute !== undefined) updateData.attribute = body.attribute as AttributeType;
    if (body.is_recurring !== undefined) updateData.is_recurring = Boolean(body.is_recurring);
    if (body.recurrence_interval !== undefined) updateData.recurrence_interval = body.recurrence_interval;
    if (body.due_date !== undefined) updateData.due_date = body.due_date;
    if (body.priority !== undefined) updateData.priority = body.priority;
    if (body.status !== undefined) updateData.status = body.status;

    if (body.difficulty !== undefined) {
      const diff = body.difficulty as QuestDifficulty;
      updateData.difficulty = diff;
      const base = DIFFICULTY_REWARDS[diff] || DIFFICULTY_REWARDS.Medium;
      updateData.xp_reward = base.xp;
      updateData.gold_reward = base.gold;
    }

    const { data: quest, error } = await supabase
      .from('quests')
      .update(updateData)
      .eq('id', id)
      .eq('user_id', user.id)
      .select()
      .single();

    if (error || !quest) {
      return NextResponse.json({ error: 'Failed to update quest' }, { status: 400 });
    }

    return NextResponse.json({ quest });
  } catch (err: unknown) {
    return NextResponse.json({ error: (err as Error).message }, { status: 500 });
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const supabase = await createServerSupabaseClient();
    const { data: { user }, error: authError } = await supabase.auth.getUser();

    if (authError || !user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { error } = await supabase
      .from('quests')
      .delete()
      .eq('id', id)
      .eq('user_id', user.id);

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 400 });
    }

    return NextResponse.json({ success: true, deletedId: id });
  } catch (err: unknown) {
    return NextResponse.json({ error: (err as Error).message }, { status: 500 });
  }
}
