'use client';

// ==============================================================================
// ASCEND - CREATE QUEST MODAL
// ==============================================================================

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useGame } from '@/lib/context/game-context';
import {
  QuestCategory,
  QuestDifficulty,
  AttributeType,
  QuestPriority,
} from '@/types/rpg';
import { ATTRIBUTE_LIST, getDefaultAttributeForCategory } from '@/lib/progression/attributes';
import { DIFFICULTY_REWARDS, calculateAuthoritativeRewards } from '@/lib/progression/rewards';
import {
  X,
  Plus,
  Zap,
  Coins,
  Sparkles,
  Calendar,
  Flame,
  RotateCw,
} from 'lucide-react';

interface CreateQuestModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const CreateQuestModal: React.FC<CreateQuestModalProps> = ({ isOpen, onClose }) => {
  const { createQuest, profile, streak } = useGame();

  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState<QuestCategory>('Work');
  const [difficulty, setDifficulty] = useState<QuestDifficulty>('Medium');
  const [attribute, setAttribute] = useState<AttributeType>('Intellect');
  const [isRecurring, setIsRecurring] = useState(false);
  const [recurrenceInterval, setRecurrenceInterval] = useState<'Daily' | 'Weekly'>('Daily');
  const [priority, setPriority] = useState<QuestPriority>('Medium');
  const [isSubmitting, setIsSubmitting] = useState(false);

  if (!isOpen) return null;

  const handleCategoryChange = (newCat: QuestCategory) => {
    setCategory(newCat);
    setAttribute(getDefaultAttributeForCategory(newCat));
  };

  // Preview estimated rewards
  const rewardsPreview = calculateAuthoritativeRewards({
    category,
    difficulty,
    attribute,
    archetype: profile.archetype,
    currentStreak: streak.current_streak,
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim() || isSubmitting) return;

    setIsSubmitting(true);
    try {
      await createQuest({
        title: title.trim(),
        description: description.trim(),
        category,
        difficulty,
        attribute,
        is_recurring: isRecurring,
        recurrence_interval: isRecurring ? recurrenceInterval : undefined,
        priority,
      });
      setTitle('');
      setDescription('');
      onClose();
    } catch {
      // Error handled
    } finally {
      setIsSubmitting(false);
    }
  };

  const categories: QuestCategory[] = ['Work', 'Fitness', 'Learning', 'Habit', 'Creative', 'Social'];
  const difficulties: QuestDifficulty[] = ['Easy', 'Medium', 'Hard', 'Epic', 'Legendary'];

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.95 }}
          className="relative w-full max-w-lg bg-[#0F1420] border border-cyan-500/40 rounded-2xl shadow-2xl p-6 overflow-hidden"
        >
          {/* Header */}
          <div className="flex items-center justify-between pb-4 border-b border-white/10">
            <div className="flex items-center space-x-2">
              <div className="p-1.5 rounded-lg bg-cyan-500/20 text-cyan-400">
                <Plus className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-lg font-bold text-white">Forge New Life Quest</h3>
                <p className="text-xs text-slate-400">Translate real-world goals into RPG bounties</p>
              </div>
            </div>
            <button
              onClick={onClose}
              className="text-slate-400 hover:text-white p-1 rounded-lg hover:bg-white/5"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4 mt-4">
            {/* Title */}
            <div>
              <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1">
                Quest Title *
              </label>
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="e.g., Code Next.js Authentication API (90m)"
                required
                className="w-full px-3.5 py-2.5 rounded-xl bg-slate-900/90 border border-white/10 text-white placeholder-slate-500 focus:outline-none focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 text-sm"
              />
            </div>

            {/* Description */}
            <div>
              <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1">
                Description & Success Criteria
              </label>
              <textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Specific instructions or subtasks to mark complete..."
                rows={2}
                className="w-full px-3.5 py-2 rounded-xl bg-slate-900/90 border border-white/10 text-white placeholder-slate-500 focus:outline-none focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 text-xs"
              />
            </div>

            {/* Category selection */}
            <div>
              <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1.5">
                Category
              </label>
              <div className="grid grid-cols-3 gap-2">
                {categories.map((cat) => (
                  <button
                    type="button"
                    key={cat}
                    onClick={() => handleCategoryChange(cat)}
                    className={`py-1.5 px-2 rounded-lg text-xs font-semibold transition-all border ${
                      category === cat
                        ? 'bg-cyan-500/20 text-cyan-300 border-cyan-500/50 shadow-[0_0_10px_rgba(6,182,212,0.2)]'
                        : 'bg-slate-900/60 text-slate-400 border-white/5 hover:border-white/20'
                    }`}
                  >
                    {cat}
                  </button>
                ))}
              </div>
            </div>

            {/* Difficulty selection */}
            <div>
              <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1.5">
                Difficulty Tier
              </label>
              <div className="grid grid-cols-5 gap-1.5">
                {difficulties.map((diff) => (
                  <button
                    type="button"
                    key={diff}
                    onClick={() => setDifficulty(diff)}
                    className={`py-1.5 px-1 rounded-lg text-xs font-bold transition-all border text-center ${
                      difficulty === diff
                        ? 'bg-purple-500/20 text-purple-300 border-purple-500/50 shadow-[0_0_10px_rgba(168,85,247,0.3)]'
                        : 'bg-slate-900/60 text-slate-400 border-white/5 hover:border-white/20'
                    }`}
                  >
                    {diff}
                  </button>
                ))}
              </div>
            </div>

            {/* Attribute Target */}
            <div>
              <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1.5">
                Target Attribute
              </label>
              <select
                value={attribute}
                onChange={(e) => setAttribute(e.target.value as AttributeType)}
                className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-white/10 text-white text-xs focus:outline-none focus:border-cyan-500"
              >
                {ATTRIBUTE_LIST.map((attr) => (
                  <option key={attr.type} value={attr.type}>
                    {attr.name} ({attr.shortName}) - {attr.primaryCategories.join(', ')}
                  </option>
                ))}
              </select>
            </div>

            {/* Recurring Toggle */}
            <div className="flex items-center justify-between p-3 rounded-xl bg-slate-900/50 border border-white/5">
              <div className="flex items-center space-x-2">
                <RotateCw className="w-4 h-4 text-cyan-400" />
                <div>
                  <div className="text-xs font-bold text-white">Daily Habit / Recurring</div>
                  <div className="text-[11px] text-slate-400">Resets daily to sustain consistency</div>
                </div>
              </div>
              <input
                type="checkbox"
                checked={isRecurring}
                onChange={(e) => setIsRecurring(e.target.checked)}
                className="w-4 h-4 rounded text-cyan-500 focus:ring-cyan-500 bg-slate-900 border-white/20"
              />
            </div>

            {/* Estimated Rewards Preview */}
            <div className="p-3 rounded-xl bg-gradient-to-r from-cyan-950/40 via-purple-950/40 to-slate-900/60 border border-cyan-500/30">
              <div className="text-[10px] font-bold uppercase text-cyan-400 tracking-wider flex items-center gap-1 mb-1.5">
                <Sparkles className="w-3 h-3" />
                <span>Estimated Authoritative Bounty</span>
              </div>
              <div className="flex items-center justify-between text-xs">
                <span className="text-cyan-300 font-bold flex items-center gap-1">
                  <Zap className="w-3.5 h-3.5 text-cyan-400" /> +{rewardsPreview.xpEarned} XP
                </span>
                <span className="text-amber-400 font-bold flex items-center gap-1">
                  <Coins className="w-3.5 h-3.5 text-amber-400" /> +{rewardsPreview.goldEarned} Gold
                </span>
                <span className="text-purple-300 font-bold flex items-center gap-1">
                  +{rewardsPreview.attributeXpEarned} {attribute} XP
                </span>
              </div>
            </div>

            {/* Submit Buttons */}
            <div className="flex items-center space-x-3 pt-2">
              <button
                type="button"
                onClick={onClose}
                className="w-1/2 py-2.5 rounded-xl border border-white/10 text-slate-400 hover:text-white hover:bg-white/5 font-semibold text-xs transition-all"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={isSubmitting || !title.trim()}
                className="w-1/2 py-2.5 rounded-xl bg-gradient-to-r from-cyan-500 to-indigo-600 hover:from-cyan-400 hover:to-indigo-500 disabled:opacity-50 text-white font-bold text-xs shadow-[0_0_15px_rgba(6,182,212,0.4)] transition-all flex items-center justify-center space-x-1.5"
              >
                <Plus className="w-4 h-4" />
                <span>{isSubmitting ? 'Forging...' : 'Create Quest'}</span>
              </button>
            </div>
          </form>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
