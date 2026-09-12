'use client';

// ==============================================================================
// ASCEND - ANALYTICS & TELEMETRY COMMAND MATRIX
// Bespoke telemetry terminal with velocity curves, category matrix, and heat-density grid
// ==============================================================================

import React, { useState } from 'react';
import { useGame } from '@/lib/context/game-context';
import { HeatmapGrid } from '@/components/analytics/HeatmapGrid';
import { ATTRIBUTE_LIST, getTotalAttributeXP } from '@/lib/progression/attributes';
import { AnimatedCounter } from '@/components/ui/AnimatedCounter';
import {
  Activity,
  BarChart3,
  TrendingUp,
  Flame,
  Zap,
  Coins,
  CheckCircle2,
  Calendar,
  Layers,
  Sparkles,
  PieChart,
} from 'lucide-react';
import { formatNumber } from '@/lib/utils';

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

  // Velocity telemetry simulated data points for SVG Curve
  const weeklyVelocity = [
    { label: 'Week 1', xp: Math.round(profile.xp * 0.15) },
    { label: 'Week 2', xp: Math.round(profile.xp * 0.25) },
    { label: 'Week 3', xp: Math.round(profile.xp * 0.35) },
    { label: 'Week 4 (Current)', xp: profile.xp },
  ];

  return (
    <div className="space-y-6 pb-10">
      {/* 1. TELEMETRY HEADER HUD */}
      <div className="cyber-panel p-6 rounded-2xl border-white/10">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-white/10">
          <div>
            <div className="flex items-center space-x-2 text-xs font-mono text-cyan-400">
              <Activity className="w-4 h-4" />
              <span>PRODUCTIVITY_TELEMETRY // PERFORMANCE_LOGS</span>
            </div>
            <h1 className="font-display text-xl sm:text-2xl font-black text-white mt-1">
              SYSTEM ANALYTICS & VELOCITY
            </h1>
          </div>

          <div className="flex items-center space-x-2">
            <button
              onClick={() => setActiveTimeframe('30d')}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all border ${
                activeTimeframe === '30d'
                  ? 'bg-cyan-500/20 text-cyan-300 border-cyan-500/40'
                  : 'bg-slate-900 text-slate-400 border-white/5'
              }`}
            >
              30-Day Window
            </button>
            <button
              onClick={() => setActiveTimeframe('all')}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all border ${
                activeTimeframe === 'all'
                  ? 'bg-cyan-500/20 text-cyan-300 border-cyan-500/40'
                  : 'bg-slate-900 text-slate-400 border-white/5'
              }`}
            >
              All-Time Career
            </button>
          </div>
        </div>

        {/* Velocity Metric Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 mt-4">
          <div className="p-4 rounded-xl bg-[#07090E] border border-white/10">
            <div className="flex items-center justify-between text-slate-400 mb-1">
              <span className="text-[10px] font-mono uppercase">TOTAL AUTHORITATIVE XP</span>
              <Zap className="w-3.5 h-3.5 text-cyan-400" />
            </div>
            <div className="font-display text-2xl font-black text-white">
              <AnimatedCounter value={profile.xp} />
            </div>
            <div className="text-[10px] text-cyan-400 mt-1">Non-linear progression</div>
          </div>

          <div className="p-4 rounded-xl bg-[#07090E] border border-white/10">
            <div className="flex items-center justify-between text-slate-400 mb-1">
              <span className="text-[10px] font-mono uppercase">TREASURY GAINS</span>
              <Coins className="w-3.5 h-3.5 text-amber-400" />
            </div>
            <div className="font-display text-2xl font-black text-amber-300">
              <AnimatedCounter value={profile.gold} /> G
            </div>
            <div className="text-[10px] text-slate-400 mt-1">Available balance</div>
          </div>

          <div className="p-4 rounded-xl bg-[#07090E] border border-white/10">
            <div className="flex items-center justify-between text-slate-400 mb-1">
              <span className="text-[10px] font-mono uppercase">ACTIVE DAILY STREAK</span>
              <Flame className="w-3.5 h-3.5 text-orange-400" />
            </div>
            <div className="font-display text-2xl font-black text-orange-400">
              {streak.current_streak} Days
            </div>
            <div className="text-[10px] text-slate-400 mt-1">All-time peak: {streak.longest_streak}d</div>
          </div>

          <div className="p-4 rounded-xl bg-[#07090E] border border-white/10">
            <div className="flex items-center justify-between text-slate-400 mb-1">
              <span className="text-[10px] font-mono uppercase">DISCIPLINE RATE</span>
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
            </div>
            <div className="font-display text-2xl font-black text-emerald-400">
              {completionRate}%
            </div>
            <div className="text-[10px] text-slate-400 mt-1">{completedQuests.length} of {quests.length} cleared</div>
          </div>
        </div>
      </div>

      {/* 2. ACTIVITY HEAT-DENSITY GRID */}
      <HeatmapGrid />

      {/* 3. DUAL COLUMN BREAKDOWN */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Category Matrix */}
        <div className="cyber-panel p-6 rounded-2xl border-white/10">
          <div className="flex items-center space-x-2 pb-4 mb-4 border-b border-white/10">
            <Layers className="w-4 h-4 text-cyan-400" />
            <div>
              <h2 className="font-display text-sm font-black text-white">
                LIFE CATEGORY PRODUCTIVITY
              </h2>
              <p className="text-xs text-slate-400">Task completion velocity per domain</p>
            </div>
          </div>

          <div className="space-y-4">
            {categoryStats.map((cat) => (
              <div key={cat.name} className="p-3.5 rounded-xl bg-[#07090E] border border-white/5 space-y-2">
                <div className="flex items-center justify-between text-xs">
                  <span className="font-display font-bold text-white">{cat.name}</span>
                  <span className="font-mono text-slate-400">
                    {cat.completed} / {cat.total} cleared ({cat.rate}%)
                  </span>
                </div>
                <div className="w-full bg-slate-900 rounded-full h-2 overflow-hidden">
                  <div
                    className="bg-cyan-400 h-full rounded-full transition-all duration-500"
                    style={{ width: `${cat.rate}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Attribute Mastery Share */}
        <div className="cyber-panel p-6 rounded-2xl border-white/10">
          <div className="flex items-center space-x-2 pb-4 mb-4 border-b border-white/10">
            <TrendingUp className="w-4 h-4 text-purple-400" />
            <div>
              <h2 className="font-display text-sm font-black text-white">
                ATTRIBUTE GROWTH DISTRIBUTION
              </h2>
              <p className="text-xs text-slate-400">Share of cumulative attribute points</p>
            </div>
          </div>

          <div className="space-y-4">
            {ATTRIBUTE_LIST.map((attr) => {
              const attrKey = `${attr.type.toLowerCase()}_xp` as keyof typeof attributes;
              const currentXP = (attributes[attrKey] as number) || 0;
              const sharePercent = totalAttrXP > 0 ? Math.round((currentXP / totalAttrXP) * 100) : 0;

              return (
                <div key={attr.type} className="p-3.5 rounded-xl bg-[#07090E] border border-white/5 space-y-2">
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-display font-bold" style={{ color: attr.color }}>
                      {attr.name} ({attr.shortName})
                    </span>
                    <span className="font-mono text-slate-300">
                      {currentXP} XP ({sharePercent}%)
                    </span>
                  </div>
                  <div className="w-full bg-slate-900 rounded-full h-2 overflow-hidden">
                    <div
                      className="h-full rounded-full transition-all duration-500"
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
