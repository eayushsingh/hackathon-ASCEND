'use client';

// ==============================================================================
// ASCEND - CREATE QUEST MODAL
// Minimalist Editorial Theme
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
  Zap,
  Coins,
  Sparkles,
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
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#141210]/60 backdrop-blur-sm">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.95 }}
          className="relative w-full max-w-lg bg-white border-4 border-[#141210] p-6 sm:p-8 overflow-hidden shadow-[8px_8px_0_0_#141210]"
        >
          {/* Header */}
          <div className="flex items-start justify-between pb-4 border-b-2 border-[#141210]">
            <div>
              <h3 className="text-3xl font-display font-bold text-[#141210] uppercase tracking-widest">Forge Quest</h3>
              <p className="text-xs font-sans font-bold uppercase tracking-wider text-[#57534E] mt-1">Translate goals into bounties</p>
            </div>
            <button
              onClick={onClose}
              className="text-[#141210] hover:text-[#E85D25] transition-colors p-1"
            >
              <X className="w-6 h-6 stroke-[3]" />
            </button>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6 mt-6">
            {/* Title */}
            <div>
              <label className="block text-xs font-display font-bold text-[#141210] uppercase tracking-widest mb-2">
                Quest Title *
              </label>
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="e.g., Code Next.js API (90m)"
                required
                className="w-full px-4 py-3 bg-[#F3F1EC] border-2 border-[#141210] text-[#141210] placeholder-[#A8A29E] focus:outline-none focus:ring-2 focus:ring-[#E85D25] font-sans font-bold"
              />
            </div>

            {/* Description */}
            <div>
              <label className="block text-xs font-display font-bold text-[#141210] uppercase tracking-widest mb-2">
                Description & Criteria
              </label>
              <textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Specific instructions or subtasks..."
                rows={2}
                className="w-full px-4 py-3 bg-[#F3F1EC] border-2 border-[#141210] text-[#141210] placeholder-[#A8A29E] focus:outline-none focus:ring-2 focus:ring-[#E85D25] font-sans text-sm resize-none"
              />
            </div>

            {/* Category selection */}
            <div>
              <label className="block text-xs font-display font-bold text-[#141210] uppercase tracking-widest mb-2">
                Category
              </label>
              <div className="grid grid-cols-3 gap-2">
                {categories.map((cat) => (
                  <button
                    type="button"
                    key={cat}
                    onClick={() => handleCategoryChange(cat)}
                    className={`py-2 px-2 text-xs font-sans font-bold uppercase tracking-wider transition-colors border-2 ${
                      category === cat
                        ? 'bg-[#141210] text-white border-[#141210]'
                        : 'bg-white text-[#57534E] border-[#141210]/20 hover:border-[#141210]'
                    }`}
                  >
                    {cat}
                  </button>
                ))}
              </div>
            </div>

            {/* Difficulty selection */}
            <div>
              <label className="block text-xs font-display font-bold text-[#141210] uppercase tracking-widest mb-2">
                Difficulty Tier
              </label>
              <div className="grid grid-cols-5 gap-2">
                {difficulties.map((diff) => (
                  <button
                    type="button"
                    key={diff}
                    onClick={() => setDifficulty(diff)}
                    className={`py-2 px-1 text-[10px] sm:text-xs font-sans font-bold uppercase tracking-wider transition-colors border-2 text-center ${
                      difficulty === diff
                        ? 'bg-[#E85D25] text-white border-[#E85D25]'
                        : 'bg-white text-[#57534E] border-[#141210]/20 hover:border-[#141210]'
                    }`}
                  >
                    {diff}
                  </button>
                ))}
              </div>
            </div>

            {/* Attribute Target */}
            <div>
              <label className="block text-xs font-display font-bold text-[#141210] uppercase tracking-widest mb-2">
                Target Attribute
              </label>
              <select
                value={attribute}
                onChange={(e) => setAttribute(e.target.value as AttributeType)}
                className="w-full px-4 py-3 bg-[#F3F1EC] border-2 border-[#141210] text-[#141210] font-sans font-bold text-sm focus:outline-none focus:ring-2 focus:ring-[#E85D25] cursor-pointer"
              >
                {ATTRIBUTE_LIST.map((attr) => (
                  <option key={attr.type} value={attr.type}>
                    {attr.name} ({attr.shortName}) - {attr.primaryCategories.join(', ')}
                  </option>
                ))}
              </select>
            </div>

            {/* Recurring Toggle */}
            <div className="flex items-center justify-between p-4 bg-white border-2 border-[#141210]">
              <div className="flex items-center space-x-3">
                <RotateCw className="w-5 h-5 text-[#E85D25]" />
                <div>
                  <div className="text-sm font-sans font-bold uppercase tracking-wider text-[#141210]">Daily Habit</div>
                  <div className="text-xs font-sans text-[#57534E] italic">Resets daily to sustain consistency</div>
                </div>
              </div>
              <input
                type="checkbox"
                checked={isRecurring}
                onChange={(e) => setIsRecurring(e.target.checked)}
                className="w-5 h-5 accent-[#E85D25] border-2 border-[#141210] cursor-pointer"
              />
            </div>

            {/* Estimated Rewards Preview */}
            <div className="p-4 bg-[#F3F1EC] border-2 border-[#141210]">
              <div className="text-xs font-display font-bold uppercase text-[#141210] tracking-widest flex items-center gap-2 mb-3">
                <Sparkles className="w-4 h-4 text-[#E85D25]" />
                <span>Estimated Bounty</span>
              </div>
              <div className="flex items-center justify-between text-xs font-sans font-bold uppercase tracking-wider">
                <span className="text-[#E85D25] flex items-center gap-1">
                  <Zap className="w-4 h-4" /> +{rewardsPreview.xpEarned} XP
                </span>
                <span className="text-[#D97706] flex items-center gap-1">
                  <Coins className="w-4 h-4" /> +{rewardsPreview.goldEarned} G
                </span>
                <span className="text-[#141210] flex items-center gap-1" style={{ color: ATTRIBUTE_LIST.find(a => a.type === attribute)?.color }}>
                  +{rewardsPreview.attributeXpEarned} {attribute}
                </span>
              </div>
            </div>

            {/* Submit Buttons */}
            <div className="flex items-center space-x-4 pt-4 border-t-2 border-[#141210]">
              <button
                type="button"
                onClick={onClose}
                className="w-1/3 py-3 border-2 border-[#141210] text-[#141210] hover:bg-[#F3F1EC] font-display font-bold uppercase tracking-widest text-sm transition-colors"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={isSubmitting || !title.trim()}
                className="w-2/3 py-3 bg-[#E85D25] border-2 border-[#141210] text-white hover:bg-[#C54A18] disabled:opacity-50 disabled:hover:bg-[#E85D25] font-display font-bold uppercase tracking-widest text-sm transition-colors"
              >
                {isSubmitting ? 'Forging...' : 'Confirm'}
              </button>
            </div>
          </form>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
