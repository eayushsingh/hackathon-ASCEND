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
import { AnimatePresence } from 'framer-motion';

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
    <div className="space-y-6 pb-10">
      {/* 1. TOP CHARACTER STATUS HUD (DOMINANT VISUAL ELEMENT) */}
      <CharacterHUD />

      {/* 2. MAIN 2-COLUMN GRID */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* LEFT COLUMN: ACTIVE QUESTS (7 COLS) */}
        <div className="lg:col-span-7 space-y-4">
          <div className="cyber-panel p-5 rounded-2xl border-white/10 bg-[#0D111A]">
            {/* Header & Filter Bar */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-white/10">
              <div className="flex items-center space-x-2.5">
                <div className="p-2 rounded-xl bg-cyan-500/15 text-cyan-400 border border-cyan-500/30">
                  <Swords className="w-5 h-5" />
                </div>
                <div>
                  <h2 className="font-display text-base font-bold text-white flex items-center gap-2">
                    <span>ACTIVE QUEST MATRIX</span>
                    <span className="font-display text-xs px-2 py-0.5 rounded-full bg-cyan-500/20 text-cyan-300 font-black">
                      {activeQuests.length}
                    </span>
                  </h2>
                  <p className="text-xs text-slate-400">Complete tasks to gain authoritative XP and Gold</p>
                </div>
              </div>

              <button
                onClick={() => setIsCreateModalOpen(true)}
                className="px-3.5 py-2 rounded-lg bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-display text-xs font-bold transition-all flex items-center justify-center space-x-1.5 shrink-0 cursor-pointer shadow-[0_0_12px_rgba(6,182,212,0.3)]"
              >
                <Plus className="w-4 h-4 stroke-[3]" />
                <span>Forge Quest</span>
              </button>
            </div>

            {/* Filter Pills */}
            <div className="flex items-center space-x-2 pt-3 pb-2 overflow-x-auto">
              {(['Active', 'Daily', 'All', 'Completed'] as const).map((type) => (
                <button
                  key={type}
                  onClick={() => setFilterType(type)}
                  className={`px-3 py-1 rounded-lg text-xs font-semibold transition-all shrink-0 border ${
                    filterType === type
                      ? 'bg-cyan-500/15 text-cyan-300 border-cyan-500/40 shadow-[0_0_8px_rgba(6,182,212,0.2)]'
                      : 'bg-[#07090E] text-slate-400 hover:bg-white/5 border-white/5'
                  }`}
                >
                  {type}
                </button>
              ))}
            </div>

            {/* Quest Cards List with AnimatePresence */}
            <div className="space-y-2.5 mt-3">
              {displayedQuests.length === 0 ? (
                <div className="py-12 text-center rounded-xl bg-[#07090E] border border-dashed border-white/10">
                  <Swords className="w-8 h-8 text-slate-600 mx-auto mb-2" />
                  <p className="font-display text-xs font-bold text-slate-400">NO {filterType.toUpperCase()} QUESTS FOUND</p>
                  <p className="text-[11px] text-slate-500 mt-0.5">Click "Forge Quest" above to create a real-life task bounty</p>
                </div>
              ) : (
                <AnimatePresence mode="popLayout">
                  {displayedQuests.map((quest) => (
                    <QuestCard key={quest.id} quest={quest} />
                  ))}
                </AnimatePresence>
              )}
            </div>
          </div>
        </div>

        {/* RIGHT COLUMN: ATTRIBUTES & PROGRESSION (5 COLS) */}
        <div className="lg:col-span-5 space-y-6">
          {/* Attributes Breakdown */}
          <div className="cyber-panel p-5 rounded-2xl border-white/10 bg-[#0D111A]">
            <div className="flex items-center justify-between pb-3 border-b border-white/10 mb-4">
              <div>
                <h3 className="font-display text-sm font-bold text-white">6-ATTRIBUTE MASTERY</h3>
                <p className="text-xs text-slate-400">Real-life stat distribution</p>
              </div>
              <Link
                href="/character"
                className="font-display text-xs font-bold text-cyan-400 hover:text-cyan-300 transition-colors"
              >
                View Sheet →
              </Link>
            </div>
            <AttributeBarList />
          </div>

          {/* Activity Heatmap Grid */}
          <HeatmapGrid />

          {/* Quick Shortcuts */}
          <div className="grid grid-cols-3 gap-2.5">
            <Link
              href="/shop"
              className="p-3 rounded-xl bg-[#0D111A] border border-amber-500/20 hover:border-amber-500/40 text-center transition-all group"
            >
              <ShoppingBag className="w-4 h-4 text-amber-400 mx-auto mb-1 group-hover:scale-110 transition-transform" />
              <div className="font-display text-xs font-bold text-amber-300">Shop</div>
              <div className="text-[10px] text-slate-400">Cosmetics</div>
            </Link>

            <Link
              href="/inventory"
              className="p-3 rounded-xl bg-[#0D111A] border border-purple-500/20 hover:border-purple-500/40 text-center transition-all group"
            >
              <Package className="w-4 h-4 text-purple-400 mx-auto mb-1 group-hover:scale-110 transition-transform" />
              <div className="font-display text-xs font-bold text-purple-300">Inventory</div>
              <div className="text-[10px] text-slate-400">Loadout</div>
            </Link>

            <Link
              href="/achievements"
              className="p-3 rounded-xl bg-[#0D111A] border border-cyan-500/20 hover:border-cyan-500/40 text-center transition-all group"
            >
              <Trophy className="w-4 h-4 text-cyan-400 mx-auto mb-1 group-hover:scale-110 transition-transform" />
              <div className="font-display text-xs font-bold text-cyan-300">Trophies</div>
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
