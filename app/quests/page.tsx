'use client';

// ==============================================================================
// ASCEND - QUEST MANAGEMENT BOARD
// Minimalist Editorial Theme
// ==============================================================================

import React, { useState } from 'react';
import { useGame } from '@/lib/context/game-context';
import { QuestCard } from '@/components/quests/QuestCard';
import { CreateQuestModal } from '@/components/modals/CreateQuestModal';
import {
  Search,
} from 'lucide-react';
import { AnimatePresence } from 'framer-motion';

export default function QuestsPage() {
  const { quests } = useGame();
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [selectedStatus, setSelectedStatus] = useState<'All' | 'Active' | 'Completed'>('Active');
  const [sortBy, setSortBy] = useState<'newest' | 'xp' | 'gold'>('newest');

  const filteredQuests = quests
    .filter((q) => {
      if (selectedStatus === 'Active' && q.status !== 'Active') return false;
      if (selectedStatus === 'Completed' && q.status !== 'Completed') return false;
      if (selectedCategory !== 'All' && q.category !== selectedCategory) return false;
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
    <div className="space-y-12 pb-16 pt-8">
      {/* 1. TOP STATS BAR */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 border-b-2 border-[#141210] pb-8">
        <div className="text-center sm:text-left sm:border-r border-[#141210]/20 last:border-0 sm:pr-4">
          <div className="font-display text-5xl font-bold text-[#141210]">{quests.length}</div>
          <div className="text-sm font-sans font-bold text-[#57534E] uppercase tracking-widest mt-1">Total Quests</div>
        </div>
        <div className="text-center sm:text-left sm:border-r border-[#141210]/20 last:border-0 sm:pr-4">
          <div className="font-display text-5xl font-bold text-[#D97706]">
            {quests.filter((q) => q.status === 'Active').length}
          </div>
          <div className="text-sm font-sans font-bold text-[#57534E] uppercase tracking-widest mt-1">Active Bounties</div>
        </div>
        <div className="text-center sm:text-left sm:border-r border-[#141210]/20 last:border-0 sm:pr-4">
          <div className="font-display text-5xl font-bold text-[#E85D25]">{totalCompleted}</div>
          <div className="text-sm font-sans font-bold text-[#57534E] uppercase tracking-widest mt-1">Eradicated</div>
        </div>
        <div className="text-center sm:text-left">
          <div className="font-display text-5xl font-bold text-[#141210]">{completionRate}%</div>
          <div className="text-sm font-sans font-bold text-[#57534E] uppercase tracking-widest mt-1">Discipline Rate</div>
        </div>
      </div>

      {/* 2. SEARCH & CONTROLS */}
      <div className="flex flex-col space-y-6">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6 border-b border-[#141210]/20 pb-6">
          <div className="relative w-full md:w-96">
            <Search className="w-5 h-5 text-[#57534E] absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search quests, attributes..."
              className="w-full pl-10 pr-4 py-3 bg-white border-2 border-[#141210] text-[#141210] placeholder-[#6B665C] font-sans font-bold uppercase tracking-wider focus:outline-none focus:ring-2 focus:ring-[#E85D25]"
            />
          </div>

          <div className="flex items-center space-x-6 w-full md:w-auto justify-between md:justify-end">
            <div className="flex items-center space-x-4">
              {(['Active', 'Completed', 'All'] as const).map((st) => (
                <button
                  key={st}
                  onClick={() => setSelectedStatus(st)}
                  className={`font-display text-lg tracking-widest uppercase transition-colors ${
                    selectedStatus === st
                      ? 'text-[#E85D25] font-bold border-b-2 border-[#E85D25]'
                      : 'text-[#6B665C] hover:text-[#141210]'
                  }`}
                >
                  {st}
                </button>
              ))}
            </div>

            <button
              onClick={() => setIsCreateModalOpen(true)}
              className="px-6 py-3 bg-[#E85D25] text-white font-display text-sm font-bold tracking-widest uppercase hover:bg-[#C54A18] transition-colors whitespace-nowrap border-2 border-[#141210]"
            >
              Forge Quest
            </button>
          </div>
        </div>

        {/* Filter Pills */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-center space-x-4 overflow-x-auto pb-2 sm:pb-0 hide-scrollbar">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`font-sans text-sm font-bold tracking-wider uppercase transition-colors whitespace-nowrap ${
                  selectedCategory === cat
                    ? 'text-[#141210] border-b-2 border-[#141210]'
                    : 'text-[#6B665C] hover:text-[#141210]'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          <div className="flex items-center space-x-3 shrink-0">
            <span className="text-xs font-sans font-bold uppercase text-[#6B665C]">Sort by:</span>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as 'newest' | 'xp' | 'gold')}
              className="bg-transparent text-[#141210] font-sans font-bold uppercase text-sm border-b-2 border-[#141210] pb-1 focus:outline-none cursor-pointer"
            >
              <option value="newest">Newest</option>
              <option value="xp">Highest XP</option>
              <option value="gold">Highest Gold</option>
            </select>
          </div>
        </div>
      </div>

      {/* 3. QUESTS GRID */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 pt-6 border-t border-[#141210]/10">
        {filteredQuests.length === 0 ? (
          <div className="col-span-full py-20 text-center">
            <h4 className="font-display text-2xl font-bold text-[#141210] tracking-widest uppercase">No Quests Match Criteria</h4>
            <p className="text-sm font-sans font-bold text-[#57534E] uppercase tracking-widest mt-2">Try resetting search filters or forge a new quest.</p>
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
