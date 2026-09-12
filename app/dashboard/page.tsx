'use client';

// ==============================================================================
// ASCEND - COMMAND CENTER DASHBOARD
// ==============================================================================

import React, { useState } from 'react';
import Link from 'next/link';
import { useGame } from '@/lib/context/game-context';
import { CharacterHUD } from '@/components/character/CharacterHUD';
import { AttributeBarList } from '@/components/character/AttributeBarList';
import { HeatmapGrid } from '@/components/analytics/HeatmapGrid';
import { QuestCard } from '@/components/quests/QuestCard';
import { CreateQuestModal } from '@/components/modals/CreateQuestModal';
import {
  Plus,
  Swords,
  Sparkles,
  ShoppingBag,
  Trophy,
  Package,
  RotateCw,
  Flame,
  CheckCircle2,
  Filter,
} from 'lucide-react';

export default function DashboardPage() {
  const { quests, streak, profile } = useGame();
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [filterType, setFilterType] = useState<'All' | 'Active' | 'Daily' | 'Completed'>('Active');

  const activeQuests = quests.filter((q) => q.status === 'Active');
  const completedQuests = quests.filter((q) => q.status === 'Completed');
  const dailyQuests = quests.filter((q) => q.is_recurring && q.status === 'Active');

  let displayedQuests = activeQuests;
  if (filterType === 'All') displayedQuests = quests;
  if (filterType === 'Daily') displayedQuests = dailyQuests;
  if (filterType === 'Completed') displayedQuests = completedQuests;

  return (
    <div className="space-y-6">
      {/* 1. TOP CHARACTER STATUS HUD */}
      <CharacterHUD />

      {/* 2. MAIN 2-COLUMN GRID */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* LEFT COLUMN: ACTIVE QUESTS (7 COLS) */}
        <div className="lg:col-span-7 space-y-4">
          <div className="cyber-panel p-5 rounded-2xl">
            {/* Header & Filter Bar */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-white/10">
              <div className="flex items-center space-x-2.5">
                <div className="p-2 rounded-xl bg-cyan-500/20 text-cyan-400">
                  <Swords className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-base font-bold text-white flex items-center gap-2">
                    <span>Active Quest Matrix</span>
                    <span className="text-xs px-2 py-0.5 rounded-full bg-cyan-500/20 text-cyan-300 font-extrabold">
                      {activeQuests.length}
                    </span>
                  </h3>
                  <p className="text-xs text-slate-400">Complete tasks to gain authoritative XP and Gold</p>
                </div>
              </div>

              <button
                onClick={() => setIsCreateModalOpen(true)}
                className="px-4 py-2 rounded-xl bg-gradient-to-r from-cyan-500 to-indigo-600 hover:from-cyan-400 hover:to-indigo-500 text-white font-bold text-xs shadow-[0_0_15px_rgba(6,182,212,0.4)] transition-all flex items-center justify-center space-x-1.5 shrink-0"
              >
                <Plus className="w-4 h-4" />
                <span>Forge Quest</span>
              </button>
            </div>

            {/* Filter Pills */}
            <div className="flex items-center space-x-2 pt-3 pb-2 overflow-x-auto">
              {(['Active', 'Daily', 'All', 'Completed'] as const).map((type) => (
                <button
                  key={type}
                  onClick={() => setFilterType(type)}
                  className={`px-3 py-1 rounded-lg text-xs font-semibold transition-all shrink-0 ${
                    filterType === type
                      ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/40 shadow-[0_0_8px_rgba(6,182,212,0.2)]'
                      : 'bg-slate-900/60 text-slate-400 hover:bg-white/5 border border-white/5'
                  }`}
                >
                  {type}
                </button>
              ))}
            </div>

            {/* Quest Cards List */}
            <div className="space-y-3 mt-3">
              {displayedQuests.length === 0 ? (
                <div className="py-12 text-center rounded-xl bg-slate-900/40 border border-dashed border-white/10">
                  <Swords className="w-8 h-8 text-slate-600 mx-auto mb-2" />
                  <p className="text-xs font-bold text-slate-400">No {filterType.toLowerCase()} quests found</p>
                  <p className="text-[11px] text-slate-500 mt-0.5">Click "Forge Quest" above to create a real-life task bounty</p>
                </div>
              ) : (
                displayedQuests.map((quest) => (
                  <QuestCard key={quest.id} quest={quest} />
                ))
              )}
            </div>
          </div>
        </div>

        {/* RIGHT COLUMN: ATTRIBUTES & PROGRESSION (5 COLS) */}
        <div className="lg:col-span-5 space-y-6">
          {/* Attributes Breakdown */}
          <div className="cyber-panel p-5 rounded-2xl">
            <div className="flex items-center justify-between pb-3 border-b border-white/10 mb-4">
              <div>
                <h3 className="text-sm font-bold text-white">6-Attribute Mastery</h3>
                <p className="text-xs text-slate-400">Life stat distribution</p>
              </div>
              <Link
                href="/character"
                className="text-xs font-bold text-cyan-400 hover:text-cyan-300 transition-colors"
              >
                View Sheet →
              </Link>
            </div>
            <AttributeBarList />
          </div>

          {/* Activity Heatmap Grid */}
          <HeatmapGrid />

          {/* Quick Shortcuts */}
          <div className="grid grid-cols-3 gap-3">
            <Link
              href="/shop"
              className="p-3.5 rounded-xl bg-amber-500/10 border border-amber-500/20 hover:border-amber-500/40 text-center transition-all group"
            >
              <ShoppingBag className="w-5 h-5 text-amber-400 mx-auto mb-1 group-hover:scale-110 transition-transform" />
              <div className="text-xs font-bold text-amber-300">Guild Shop</div>
              <div className="text-[10px] text-slate-400">Buy Themes & Gear</div>
            </Link>

            <Link
              href="/inventory"
              className="p-3.5 rounded-xl bg-purple-500/10 border border-purple-500/20 hover:border-purple-500/40 text-center transition-all group"
            >
              <Package className="w-5 h-5 text-purple-400 mx-auto mb-1 group-hover:scale-110 transition-transform" />
              <div className="text-xs font-bold text-purple-300">Inventory</div>
              <div className="text-[10px] text-slate-400">Equip Cosmetics</div>
            </Link>

            <Link
              href="/achievements"
              className="p-3.5 rounded-xl bg-cyan-500/10 border border-cyan-500/20 hover:border-cyan-500/40 text-center transition-all group"
            >
              <Trophy className="w-5 h-5 text-cyan-400 mx-auto mb-1 group-hover:scale-110 transition-transform" />
              <div className="text-xs font-bold text-cyan-300">Trophies</div>
              <div className="text-[10px] text-slate-400">Claim Rewards</div>
            </Link>
          </div>
        </div>
      </div>

      {/* Modal */}
      <CreateQuestModal
        isOpen={isCreateModalOpen}
        onClose={() => setIsCreateModalOpen(false)}
      />
    </div>
  );
}
