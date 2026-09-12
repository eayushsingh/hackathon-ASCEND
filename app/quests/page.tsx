'use client';

// ==============================================================================
// ASCEND - QUEST MANAGEMENT BOARD
// Clean, quiet, tactical quest matrix with Orbitron display typography
// ==============================================================================

import React, { useState } from 'react';
import { useGame } from '@/lib/context/game-context';
import { QuestCard } from '@/components/quests/QuestCard';
import { CreateQuestModal } from '@/components/modals/CreateQuestModal';
import {
  Swords,
  Plus,
  Search,
  Filter,
  CheckCircle2,
  Clock,
  Zap,
  Coins,
  Sparkles,
} from 'lucide-react';
import { AnimatePresence } from 'framer-motion';

export default function QuestsPage() {
  const { quests } = useGame();
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [selectedDifficulty, setSelectedDifficulty] = useState<string>('All');
  const [selectedStatus, setSelectedStatus] = useState<'All' | 'Active' | 'Completed'>('Active');
  const [sortBy, setSortBy] = useState<'newest' | 'xp' | 'gold'>('newest');

  const filteredQuests = quests
    .filter((q) => {
      if (selectedStatus === 'Active' && q.status !== 'Active') return false;
      if (selectedStatus === 'Completed' && q.status !== 'Completed') return false;
      if (selectedCategory !== 'All' && q.category !== selectedCategory) return false;
      if (selectedDifficulty !== 'All' && q.difficulty !== selectedDifficulty) return false;
      if (searchQuery.trim()) {
        const query = searchQuery.toLowerCase();
        return (
          q.title.toLowerCase().includes(query) ||
          (q.description && q.description.toLowerCase().includes(query)) ||
          q.attribute.toLowerCase().includes(query)
        );
      }
      return true;
    })
    .sort((a, b) => {
      if (sortBy === 'xp') return b.xp_reward - a.xp_reward;
      if (sortBy === 'gold') return b.gold_reward - a.gold_reward;
      return new Date(b.created_at).getTime() - new Date(a.created_at).getTime();
    });

  const totalCompleted = quests.filter((q) => q.status === 'Completed').length;
  const completionRate = quests.length > 0 ? Math.round((totalCompleted / quests.length) * 100) : 0;

  const categories = ['All', 'Work', 'Fitness', 'Learning', 'Habit', 'Creative', 'Social'];

  return (
    <div className="space-y-6 pb-10">
      {/* 1. TOP STATS BAR */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        <div className="cyber-panel p-4 rounded-xl text-center bg-[#0D111A]">
          <div className="font-display text-2xl font-black text-white">{quests.length}</div>
          <div className="text-[10px] font-mono text-slate-400 uppercase">TOTAL QUESTS</div>
        </div>
        <div className="cyber-panel p-4 rounded-xl text-center bg-[#0D111A]">
          <div className="font-display text-2xl font-black text-cyan-400">
            {quests.filter((q) => q.status === 'Active').length}
          </div>
          <div className="text-[10px] font-mono text-slate-400 uppercase">ACTIVE BOUNTIES</div>
        </div>
        <div className="cyber-panel p-4 rounded-xl text-center bg-[#0D111A]">
          <div className="font-display text-2xl font-black text-emerald-400">{totalCompleted}</div>
          <div className="text-[10px] font-mono text-slate-400 uppercase">ERADICATED</div>
        </div>
        <div className="cyber-panel p-4 rounded-xl text-center bg-[#0D111A]">
          <div className="font-display text-2xl font-black text-purple-400">{completionRate}%</div>
          <div className="text-[10px] font-mono text-slate-400 uppercase">DISCIPLINE RATE</div>
        </div>
      </div>

      {/* 2. SEARCH & CONTROLS */}
      <div className="cyber-panel p-5 rounded-2xl space-y-4 bg-[#0D111A]">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="relative w-full md:w-80">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search quests, attributes, keywords..."
              className="w-full pl-9 pr-4 py-2 rounded-xl bg-[#07090E] border border-white/10 text-white placeholder-slate-500 text-xs focus:outline-none focus:border-cyan-400"
            />
          </div>

          <div className="flex items-center space-x-3 w-full md:w-auto justify-between md:justify-end">
            <div className="flex items-center space-x-1 p-1 bg-[#07090E] rounded-xl border border-white/5">
              {(['Active', 'Completed', 'All'] as const).map((st) => (
                <button
                  key={st}
                  onClick={() => setSelectedStatus(st)}
                  className={`px-3 py-1 rounded-lg text-xs font-bold transition-all ${
                    selectedStatus === st
                      ? 'bg-cyan-500/20 text-cyan-300'
                      : 'text-slate-400 hover:text-white'
                  }`}
                >
                  {st}
                </button>
              ))}
            </div>

            <button
              onClick={() => setIsCreateModalOpen(true)}
              className="px-4 py-2 rounded-lg bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-display text-xs font-bold transition-all flex items-center space-x-1.5 shrink-0 cursor-pointer shadow-[0_0_12px_rgba(6,182,212,0.3)]"
            >
              <Plus className="w-4 h-4 stroke-[3]" />
              <span>Forge Quest</span>
            </button>
          </div>
        </div>

        {/* Filter Pills */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pt-3 border-t border-white/5 text-xs">
          <div className="flex items-center space-x-1.5 overflow-x-auto pb-1 sm:pb-0">
            <span className="text-[10px] font-mono uppercase text-slate-500 mr-1">CATEGORY:</span>
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-2.5 py-1 rounded-lg font-semibold transition-all shrink-0 border ${
                  selectedCategory === cat
                    ? 'bg-cyan-500/15 text-cyan-300 border-cyan-500/40'
                    : 'bg-[#07090E] text-slate-400 hover:bg-white/5 border-white/5'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          <div className="flex items-center space-x-2 shrink-0">
            <span className="text-[10px] font-mono uppercase text-slate-500">SORT:</span>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as 'newest' | 'xp' | 'gold')}
              className="bg-[#07090E] border border-white/10 text-white text-xs rounded-lg px-2.5 py-1 focus:outline-none focus:border-cyan-400"
            >
              <option value="newest">Newest First</option>
              <option value="xp">Highest XP Bounty</option>
              <option value="gold">Highest Gold Bounty</option>
            </select>
          </div>
        </div>
      </div>

      {/* 3. QUESTS GRID */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        {filteredQuests.length === 0 ? (
          <div className="col-span-full py-16 text-center rounded-2xl bg-[#0D111A] border border-dashed border-white/10">
            <Swords className="w-10 h-10 text-slate-600 mx-auto mb-3" />
            <h4 className="font-display text-sm font-bold text-slate-300">NO QUESTS MATCH CRITERIA</h4>
            <p className="text-xs text-slate-500 mt-1">Try resetting search filters or forge a new quest bounty.</p>
          </div>
        ) : (
          <AnimatePresence mode="popLayout">
            {filteredQuests.map((quest) => (
              <QuestCard key={quest.id} quest={quest} />
            ))}
          </AnimatePresence>
        )}
      </div>

      {/* Modal */}
      <CreateQuestModal
        isOpen={isCreateModalOpen}
        onClose={() => setIsCreateModalOpen(false)}
      />
    </div>
  );
}
