'use client';

// ==============================================================================
// ASCEND - ANALYTICS & PROGRESS INTELLIGENCE
// ==============================================================================

import React from 'react';
import { useGame } from '@/lib/context/game-context';
import { HeatmapGrid } from '@/components/analytics/HeatmapGrid';
import { ATTRIBUTE_LIST, getTotalAttributeXP } from '@/lib/progression/attributes';
import {
  BarChart3,
  TrendingUp,
  Flame,
  Zap,
  Coins,
  CheckCircle2,
  Calendar,
  PieChart,
} from 'lucide-react';
import { formatNumber } from '@/lib/utils';

export default function AnalyticsPage() {
  const { quests, profile, streak, attributes } = useGame();

  const completedQuests = quests.filter((q) => q.status === 'Completed');
  const totalXP = profile.xp;
  const totalGold = profile.gold;

  // Category distribution
  const categories = ['Work', 'Fitness', 'Learning', 'Habit', 'Creative', 'Social'] as const;
  const categoryCounts = categories.map((cat) => ({
    name: cat,
    count: quests.filter((q) => q.category === cat).length,
    completed: quests.filter((q) => q.category === cat && q.status === 'Completed').length,
  }));

  const totalAttrXP = getTotalAttributeXP(attributes);

  return (
    <div className="space-y-6">
      {/* 1. TOP VELOCITY METRICS */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="cyber-panel p-5 rounded-2xl">
          <div className="flex items-center space-x-2 text-cyan-400 mb-1">
            <Zap className="w-4 h-4" />
            <span className="text-xs font-bold uppercase">Total Cumulative XP</span>
          </div>
          <div className="text-2xl font-black text-white">{formatNumber(totalXP)}</div>
          <div className="text-[11px] text-slate-400 mt-0.5">Authoritative progression</div>
        </div>

        <div className="cyber-panel p-5 rounded-2xl">
          <div className="flex items-center space-x-2 text-amber-400 mb-1">
            <Coins className="w-4 h-4" />
            <span className="text-xs font-bold uppercase">Treasury Balance</span>
          </div>
          <div className="text-2xl font-black text-amber-300">{formatNumber(totalGold)} Gold</div>
          <div className="text-[11px] text-slate-400 mt-0.5">Guild market currency</div>
        </div>

        <div className="cyber-panel p-5 rounded-2xl">
          <div className="flex items-center space-x-2 text-orange-400 mb-1">
            <Flame className="w-4 h-4" />
            <span className="text-xs font-bold uppercase">Active Daily Streak</span>
          </div>
          <div className="text-2xl font-black text-orange-400">{streak.current_streak} Days</div>
          <div className="text-[11px] text-slate-400 mt-0.5">Peak: {streak.longest_streak} days</div>
        </div>

        <div className="cyber-panel p-5 rounded-2xl">
          <div className="flex items-center space-x-2 text-emerald-400 mb-1">
            <CheckCircle2 className="w-4 h-4" />
            <span className="text-xs font-bold uppercase">Quests Eradicated</span>
          </div>
          <div className="text-2xl font-black text-emerald-400">{completedQuests.length}</div>
          <div className="text-[11px] text-slate-400 mt-0.5">Out of {quests.length} total tasks</div>
        </div>
      </div>

      {/* 2. ACTIVITY HEATMAP */}
      <HeatmapGrid />

      {/* 3. CATEGORY & ATTRIBUTE DISTRIBUTION */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Category Productivity Breakdown */}
        <div className="cyber-panel p-6 rounded-2xl">
          <div className="flex items-center space-x-2 mb-4 pb-3 border-b border-white/10">
            <PieChart className="w-5 h-5 text-cyan-400" />
            <div>
              <h3 className="text-sm font-bold text-white">Category Task Distribution</h3>
              <p className="text-xs text-slate-400">Total quests created vs completed per life pillar</p>
            </div>
          </div>

          <div className="space-y-3.5">
            {categoryCounts.map((cat) => {
              const percent = quests.length > 0 ? Math.round((cat.count / quests.length) * 100) : 0;
              return (
                <div key={cat.name} className="space-y-1">
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-bold text-slate-300">{cat.name}</span>
                    <span className="text-slate-400">
                      {cat.completed}/{cat.count} completed ({percent}%)
                    </span>
                  </div>
                  <div className="w-full bg-slate-900 rounded-full h-2 overflow-hidden border border-white/5">
                    <div
                      className="bg-gradient-to-r from-cyan-500 to-indigo-500 h-full rounded-full transition-all duration-500"
                      style={{ width: `${percent}%` }}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Attribute XP Distribution */}
        <div className="cyber-panel p-6 rounded-2xl">
          <div className="flex items-center space-x-2 mb-4 pb-3 border-b border-white/10">
            <TrendingUp className="w-5 h-5 text-purple-400" />
            <div>
              <h3 className="text-sm font-bold text-white">Attribute Growth Distribution</h3>
              <p className="text-xs text-slate-400">Share of attribute mastery XP</p>
            </div>
          </div>

          <div className="space-y-3.5">
            {ATTRIBUTE_LIST.map((attr) => {
              const attrKey = `${attr.type.toLowerCase()}_xp` as keyof typeof attributes;
              const currentXP = (attributes[attrKey] as number) || 0;
              const sharePercent =
                totalAttrXP > 0 ? Math.round((currentXP / totalAttrXP) * 100) : 0;

              return (
                <div key={attr.type} className="space-y-1">
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-bold flex items-center gap-1.5" style={{ color: attr.color }}>
                      <span>{attr.name}</span>
                    </span>
                    <span className="text-slate-300 font-semibold">
                      {currentXP} XP ({sharePercent}%)
                    </span>
                  </div>
                  <div className="w-full bg-slate-900 rounded-full h-2 overflow-hidden border border-white/5">
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
