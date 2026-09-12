'use client';

// ==============================================================================
// ASCEND - ACHIEVEMENTS & TROPHY HALL
// ==============================================================================

import React, { useState } from 'react';
import { useGame } from '@/lib/context/game-context';
import { AchievementCard } from '@/components/achievements/AchievementCard';
import {
  Trophy,
  Sparkles,
  Zap,
  Coins,
  Crown,
  CheckCircle2,
} from 'lucide-react';
import { formatNumber } from '@/lib/utils';

export default function AchievementsPage() {
  const { availableAchievements, achievements } = useGame();
  const [selectedCategory, setSelectedCategory] = useState<string>('All');

  const categories = ['All', 'General', 'Quests', 'Streaks', 'Attributes', 'Economy'];

  const unlockedCount = achievements.length;
  const totalCount = availableAchievements.length;
  const progressPercent = Math.round((unlockedCount / totalCount) * 100);

  const totalRewardsClaimableGold = availableAchievements.reduce((sum, a) => sum + a.reward_gold, 0);

  const filteredAchievements = availableAchievements.filter((ach) => {
    if (selectedCategory === 'All') return true;
    return ach.category === selectedCategory;
  });

  return (
    <div className="space-y-6">
      {/* 1. TOP STATS HERO */}
      <div className="cyber-panel p-6 rounded-3xl border-amber-500/30 bg-gradient-to-r from-amber-950/20 via-slate-900 to-slate-900">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center space-x-3.5">
            <div className="w-14 h-14 rounded-2xl bg-amber-500/20 border border-amber-500/40 flex items-center justify-center text-amber-400 shrink-0">
              <Trophy className="w-7 h-7" />
            </div>
            <div>
              <h1 className="text-2xl font-black text-white">Trophy Hall of Fame</h1>
              <p className="text-xs text-slate-300">
                Unlock milestones across quest execution, daily streaks, leveling, and economy.
              </p>
            </div>
          </div>

          <div className="px-5 py-3 rounded-2xl bg-slate-900/90 border border-white/10 flex items-center space-x-4 shrink-0 text-center">
            <div>
              <div className="text-[10px] font-bold text-slate-400 uppercase">Trophies Unlocked</div>
              <div className="text-xl font-black text-amber-400">
                {unlockedCount} / {totalCount} ({progressPercent}%)
              </div>
            </div>
          </div>
        </div>

        {/* Global Trophy Progress Bar */}
        <div className="mt-6 pt-4 border-t border-white/10">
          <div className="flex items-center justify-between text-xs font-bold mb-1.5">
            <span className="text-slate-300">Hall of Fame Mastery</span>
            <span className="text-amber-400">{progressPercent}% Completed</span>
          </div>
          <div className="w-full bg-slate-900 rounded-full h-2.5 overflow-hidden border border-white/5">
            <div
              className="bg-gradient-to-r from-amber-500 via-orange-500 to-yellow-400 h-full rounded-full transition-all duration-500"
              style={{ width: `${progressPercent}%` }}
            />
          </div>
        </div>
      </div>

      {/* 2. CATEGORY TABS */}
      <div className="flex items-center space-x-2 overflow-x-auto pb-2">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setSelectedCategory(cat)}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all shrink-0 ${
              selectedCategory === cat
                ? 'bg-amber-500/20 text-amber-300 border border-amber-500/50 shadow-[0_0_12px_rgba(245,158,11,0.3)]'
                : 'bg-slate-900/80 text-slate-400 hover:bg-white/5 border border-white/5'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* 3. ACHIEVEMENTS GRID */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {filteredAchievements.map((ach) => {
          const userAch = achievements.find(
            (ua) => ua.achievement_id === ach.id || ua.achievement?.code === ach.code
          );
          return (
            <AchievementCard
              key={ach.id}
              achievement={ach}
              userAchievement={userAch}
            />
          );
        })}
      </div>
    </div>
  );
}
