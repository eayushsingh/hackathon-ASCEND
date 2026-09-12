'use client';

// ==============================================================================
// ASCEND - ANALYTICS & TELEMETRY COMMAND MATRIX
// Minimalist Editorial Theme
// ==============================================================================

import React, { useState } from 'react';
import { useGame } from '@/lib/context/game-context';
import { HeatmapGrid } from '@/components/analytics/HeatmapGrid';
import { ATTRIBUTE_LIST, getTotalAttributeXP } from '@/lib/progression/attributes';
import { AnimatedCounter } from '@/components/ui/AnimatedCounter';
import {
  Activity,
  TrendingUp,
  Flame,
  Zap,
  Coins,
  CheckCircle2,
  Layers,
} from 'lucide-react';

export default function AnalyticsPage() {
  const { quests, profile, streak, attributes } = useGame();
  const [activeTimeframe, setActiveTimeframe] = useState<'30d' | 'all'>('30d');

  const completedQuests = quests.filter((q) => q.status === 'Completed');
  const activeQuests = quests.filter((q) => q.status === 'Active');

  const completionRate = quests.length > 0 ? Math.round((completedQuests.length / quests.length) * 100) : 0;

  // Category distribution
  const categories = ['Work', 'Fitness', 'Learning', 'Habit', 'Creative', 'Social'] as const;
  const categoryStats = categories.map((cat) => {
    const total = quests.filter((q) => q.category === cat).length;
    const completed = quests.filter((q) => q.category === cat && q.status === 'Completed').length;
    const rate = total > 0 ? Math.round((completed / total) * 100) : 0;
    return { name: cat, total, completed, rate };
  });

  const totalAttrXP = getTotalAttributeXP(attributes);

  return (
    <div className="space-y-12 pb-12 pt-8">
      {/* 1. TELEMETRY HEADER HUD */}
      <div className="p-8 bg-white border-4 border-[#141210] shadow-[8px_8px_0_0_#141210]">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6 pb-6 border-b-2 border-[#141210]/10">
          <div className="flex items-center space-x-6 text-center md:text-left">
            <div className="w-16 h-16 bg-[#141210] border-4 border-[#141210] flex items-center justify-center text-white shrink-0 shadow-[4px_4px_0_0_#E85D25]">
              <Activity className="w-8 h-8" />
            </div>
            <div>
              <div className="flex items-center justify-center md:justify-start space-x-2 text-[10px] font-sans font-bold uppercase tracking-widest text-[#E85D25]">
                <Activity className="w-3 h-3" />
                <span>Productivity Telemetry</span>
              </div>
              <h1 className="font-display text-3xl md:text-4xl font-black text-[#14120F] uppercase tracking-widest mt-2">
                System Analytics
              </h1>
            </div>
          </div>

          <div className="flex items-center space-x-2 bg-[#F3F1EC] p-1 border-2 border-[#141210] shadow-[4px_4px_0_0_#141210]">
            <button
              onClick={() => setActiveTimeframe('30d')}
              className={`px-4 py-2 text-xs font-sans font-bold uppercase tracking-widest transition-all ${
                activeTimeframe === '30d'
                  ? 'bg-[#141210] text-white'
                  : 'text-[#57534E] hover:text-[#141210]'
              }`}
            >
              30-Day
            </button>
            <button
              onClick={() => setActiveTimeframe('all')}
              className={`px-4 py-2 text-xs font-sans font-bold uppercase tracking-widest transition-all ${
                activeTimeframe === 'all'
                  ? 'bg-[#141210] text-white'
                  : 'text-[#57534E] hover:text-[#141210]'
              }`}
            >
              All-Time
            </button>
          </div>
        </div>

        {/* Velocity Metric Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 mt-8">
          <div className="p-6 bg-[#F3F1EC] border-2 border-[#141210] shadow-[4px_4px_0_0_#141210]">
            <div className="flex items-center justify-between text-[#6B665C] mb-2">
              <span className="text-[10px] font-sans font-bold uppercase tracking-widest">Total XP</span>
              <Zap className="w-4 h-4 text-[#E85D25]" />
            </div>
            <div className="font-display text-3xl font-black text-[#141210]">
              <AnimatedCounter value={profile.xp} />
            </div>
            <div className="text-[10px] font-sans font-bold text-[#E85D25] uppercase tracking-widest mt-2">Non-linear progression</div>
          </div>

          <div className="p-6 bg-[#F3F1EC] border-2 border-[#141210] shadow-[4px_4px_0_0_#141210]">
            <div className="flex items-center justify-between text-[#6B665C] mb-2">
              <span className="text-[10px] font-sans font-bold uppercase tracking-widest">Treasury Gains</span>
              <Coins className="w-4 h-4 text-[#D97706]" />
            </div>
            <div className="font-display text-3xl font-black text-[#D97706]">
              <AnimatedCounter value={profile.gold} /> G
            </div>
            <div className="text-[10px] font-sans font-bold text-[#6B665C] uppercase tracking-widest mt-2">Available balance</div>
          </div>

          <div className="p-6 bg-[#F3F1EC] border-2 border-[#141210] shadow-[4px_4px_0_0_#141210]">
            <div className="flex items-center justify-between text-[#6B665C] mb-2">
              <span className="text-[10px] font-sans font-bold uppercase tracking-widest">Active Streak</span>
              <Flame className="w-4 h-4 text-[#E85D25]" />
            </div>
            <div className="font-display text-3xl font-black text-[#E85D25]">
              {streak.current_streak} Days
            </div>
            <div className="text-[10px] font-sans font-bold text-[#6B665C] uppercase tracking-widest mt-2">All-time peak: {streak.longest_streak}d</div>
          </div>

          <div className="p-6 bg-[#F3F1EC] border-2 border-[#141210] shadow-[4px_4px_0_0_#141210]">
            <div className="flex items-center justify-between text-[#6B665C] mb-2">
              <span className="text-[10px] font-sans font-bold uppercase tracking-widest">Discipline Rate</span>
              <CheckCircle2 className="w-4 h-4 text-[#141210]" />
            </div>
            <div className="font-display text-3xl font-black text-[#141210]">
              {completionRate}%
            </div>
            <div className="text-[10px] font-sans font-bold text-[#6B665C] uppercase tracking-widest mt-2">{completedQuests.length} of {quests.length} cleared</div>
          </div>
        </div>
      </div>

      {/* 2. ACTIVITY HEAT-DENSITY GRID */}
      <HeatmapGrid />

      {/* 3. DUAL COLUMN BREAKDOWN */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Category Matrix */}
        <div className="p-8 bg-white border-4 border-[#141210] shadow-[8px_8px_0_0_#141210]">
          <div className="flex items-center space-x-3 pb-6 mb-6 border-b-2 border-[#141210]/10">
            <Layers className="w-6 h-6 text-[#141210]" />
            <div>
              <h2 className="font-display text-xl font-black text-[#141210] uppercase tracking-widest">
                Category Productivity
              </h2>
              <p className="text-xs font-sans font-medium text-[#6B665C] mt-1">Task completion velocity per domain</p>
            </div>
          </div>

          <div className="space-y-6">
            {categoryStats.map((cat) => (
              <div key={cat.name} className="space-y-2">
                <div className="flex items-center justify-between text-xs font-sans font-bold uppercase tracking-widest">
                  <span className="text-[#141210]">{cat.name}</span>
                  <span className="text-[#6B665C]">
                    {cat.completed} / {cat.total} cleared ({cat.rate}%)
                  </span>
                </div>
                <div className="w-full bg-[#F3F1EC] border-2 border-[#141210] h-4">
                  <div
                    className="bg-[#141210] h-full transition-all duration-500"
                    style={{ width: `${cat.rate}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Attribute Mastery Share */}
        <div className="p-8 bg-white border-4 border-[#141210] shadow-[8px_8px_0_0_#141210]">
          <div className="flex items-center space-x-3 pb-6 mb-6 border-b-2 border-[#141210]/10">
            <TrendingUp className="w-6 h-6 text-[#141210]" />
            <div>
              <h2 className="font-display text-xl font-black text-[#141210] uppercase tracking-widest">
                Attribute Distribution
              </h2>
              <p className="text-xs font-sans font-medium text-[#6B665C] mt-1">Share of cumulative attribute points</p>
            </div>
          </div>

          <div className="space-y-6">
            {ATTRIBUTE_LIST.map((attr) => {
              const attrKey = `${attr.type.toLowerCase()}_xp` as keyof typeof attributes;
              const currentXP = (attributes[attrKey] as number) || 0;
              const sharePercent = totalAttrXP > 0 ? Math.round((currentXP / totalAttrXP) * 100) : 0;

              return (
                <div key={attr.type} className="space-y-2">
                  <div className="flex items-center justify-between text-xs font-sans font-bold uppercase tracking-widest">
                    <span style={{ color: attr.color }}>
                      {attr.name} ({attr.shortName})
                    </span>
                    <span className="text-[#6B665C]">
                      {currentXP} XP ({sharePercent}%)
                    </span>
                  </div>
                  <div className="w-full bg-[#F3F1EC] border-2 border-[#141210] h-4">
                    <div
                      className="h-full transition-all duration-500"
                      style={{
                        width: `${sharePercent}%`,
                        backgroundColor: attr.color,
                      }}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
