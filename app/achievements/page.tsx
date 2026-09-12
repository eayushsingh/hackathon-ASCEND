'use client';

// ==============================================================================
// ASCEND - ACHIEVEMENTS & TROPHY HALL
// Minimalist Editorial Theme
// ==============================================================================

import React, { useState } from 'react';
import { useGame } from '@/lib/context/game-context';
import { AchievementCard } from '@/components/achievements/AchievementCard';
import {
  Trophy,
  Crown,
} from 'lucide-react';
import { AnimatedCounter } from '@/components/ui/AnimatedCounter';

export default function AchievementsPage() {
  const { availableAchievements, achievements } = useGame();
  const [selectedCategory, setSelectedCategory] = useState<string>('All');

  const categories = ['All', 'General', 'Quests', 'Streaks', 'Attributes', 'Economy'];

  const unlockedCount = achievements.length;
  const totalCount = availableAchievements.length;
  const progressPercent = Math.round((unlockedCount / totalCount) * 100);

  const filteredAchievements = availableAchievements.filter((ach) => {
    if (selectedCategory === 'All') return true;
    return ach.category === selectedCategory;
  });

  return (
    <div className="space-y-12 pb-12 pt-8">
      {/* 1. TOP STATS HERO (GOLD PRESTIGE) */}
      <div className="p-8 bg-white border-4 border-[#141210] shadow-[8px_8px_0_0_#141210]">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6 pb-6 border-b-2 border-[#141210]/10">
          <div className="flex items-center space-x-6 text-center md:text-left">
            <div className="w-16 h-16 bg-[#D97706] border-4 border-[#141210] flex items-center justify-center text-white shrink-0 shadow-[4px_4px_0_0_#141210]">
              <Trophy className="w-8 h-8" />
            </div>
            <div>
              <h1 className="font-display text-3xl md:text-4xl font-black text-[#14120F] uppercase tracking-widest">
                Trophy Hall
              </h1>
              <p className="text-sm font-sans font-medium text-[#6B665C] mt-2 max-w-lg">
                Permanent milestones achieved across quest eradication, habit streaks, and character levels.
              </p>
            </div>
          </div>

          <div className="px-6 py-4 bg-[#F3F1EC] border-2 border-[#141210] flex items-center space-x-4 shrink-0 shadow-[4px_4px_0_0_#141210]">
            <Crown className="w-6 h-6 text-[#D97706]" />
            <div>
              <div className="text-[10px] font-sans font-bold text-[#6B665C] uppercase tracking-widest">Unlocked Trophies</div>
              <div className="font-display text-xl font-black text-[#D97706] uppercase tracking-widest mt-1">
                <AnimatedCounter value={unlockedCount} /> / {totalCount} ({progressPercent}%)
              </div>
            </div>
          </div>
        </div>

        {/* Global Trophy Progress Bar */}
        <div className="mt-6">
          <div className="flex items-center justify-between text-xs font-sans font-bold uppercase tracking-widest text-[#141210] mb-3">
            <span>Overall Trophy Completion</span>
            <span className="text-[#D97706]">{progressPercent}%</span>
          </div>
          <div className="w-full bg-[#F3F1EC] border-2 border-[#141210] h-4">
            <div
              className="bg-[#D97706] h-full transition-all duration-500"
              style={{ width: `${progressPercent}%` }}
            />
          </div>
        </div>
      </div>

      {/* 2. CATEGORY TABS */}
      <div className="flex items-center space-x-2 overflow-x-auto pb-2 hide-scrollbar">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setSelectedCategory(cat)}
            className={`px-4 py-2 text-xs font-sans font-bold uppercase tracking-widest transition-all shrink-0 border-2 ${
              selectedCategory === cat
                ? 'bg-[#141210] text-white border-[#141210] shadow-[4px_4px_0_0_#D97706]'
                : 'bg-white text-[#57534E] hover:text-[#141210] border-[#141210]/20 hover:border-[#141210] shadow-[4px_4px_0_0_rgba(20,18,16,0.1)]'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* 3. ACHIEVEMENTS GRID */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
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
