'use client';

// ==============================================================================
// ASCEND - QUIET, FOCUSED QUEST CARD WITH SATISFYING SPRING CHECKBOX
// Apple-Inspired Bright Premium Quest Tile
// ==============================================================================

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Quest, QuestDifficulty } from '@/types/rpg';
import { useGame } from '@/lib/context/game-context';
import {
  Check,
  Zap,
  Coins,
  Trash2,
  RotateCw,
} from 'lucide-react';
import { ATTRIBUTE_CONFIG } from '@/lib/progression/attributes';

interface QuestCardProps {
  quest: Quest;
  onEdit?: (quest: Quest) => void;
}

export const QuestCard: React.FC<QuestCardProps> = ({ quest, onEdit }) => {
  const { completeQuest, deleteQuest } = useGame();
  const [isCompleting, setIsCompleting] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [justCompletedAnim, setJustCompletedAnim] = useState(false);

  const isCompleted = quest.status === 'Completed';
  const attrMeta = ATTRIBUTE_CONFIG[quest.attribute] || ATTRIBUTE_CONFIG.Intellect;

  const getDifficultyBadge = (diff: QuestDifficulty) => {
    switch (diff) {
      case 'Easy':
        return 'text-[#2E7D32] bg-[#E8F5E9] border-[#C8E6C9]';
      case 'Medium':
        return 'text-[#0284C7] bg-[#F0F9FF] border-[#BAE6FD]';
      case 'Hard':
        return 'text-[#C9A227] bg-[#FEFCE8] border-[#FEF08A]';
      case 'Epic':
        return 'text-[#7C3AED] bg-[#F3E8FF] border-[#DDD6FE]';
      case 'Legendary':
        return 'text-[#D32F2F] bg-[#FFEBEE] border-[#FFCDD2]';
    }
  };

  const handleComplete = async () => {
    if (isCompleted || isCompleting) return;
    setIsCompleting(true);
    setJustCompletedAnim(true);
    try {
      await completeQuest(quest.id);
    } catch {
      setJustCompletedAnim(false);
    } finally {
      setIsCompleting(false);
    }
  };

  const handleDelete = async (e: React.MouseEvent) => {
    e.stopPropagation();
    if (isDeleting) return;
    setIsDeleting(true);
    try {
      await deleteQuest(quest.id);
    } catch {
      // Handled
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 10 }}
      animate={{
        opacity: isCompleted ? 0.5 : 1,
        y: 0,
        scale: justCompletedAnim ? [1, 1.02, 1] : 1,
      }}
      exit={{ opacity: 0, height: 0, marginBottom: 0, overflow: 'hidden' }}
      transition={{ duration: 0.3, ease: 'easeInOut' }}
      className={`group relative apple-card apple-card-hover p-4.5 bg-white`}
    >
      <div className="flex items-start space-x-4">
        {/* SATISFYING SPRING CHECKBOX MICRO-INTERACTION */}
        <motion.button
          onClick={handleComplete}
          disabled={isCompleted || isCompleting}
          whileTap={{ scale: 0.85 }}
          whileHover={{ scale: 1.08 }}
          aria-label={isCompleted ? 'Quest Completed' : 'Complete Quest'}
          className={`w-6 h-6 rounded-lg flex items-center justify-center shrink-0 border transition-all mt-0.5 cursor-pointer ${
            isCompleted || justCompletedAnim
              ? 'btn-primary-gradient border-transparent text-white'
              : 'border-[#C7C7CC] hover:border-[#7C3AED] bg-white text-transparent hover:text-[#7C3AED]'
          }`}
        >
          <motion.div
            initial={false}
            animate={{
              scale: isCompleted || justCompletedAnim ? 1 : 0.5,
              opacity: isCompleted || justCompletedAnim ? 1 : 0,
            }}
            transition={{ type: 'spring', stiffness: 500, damping: 25 }}
          >
            <Check className="w-4 h-4 stroke-[3]" />
          </motion.div>
        </motion.button>

        {/* Quest Content */}
        <div className="flex-1 min-w-0">
          <div className="flex items-center space-x-2 flex-wrap gap-y-1 mb-2">
            {/* Difficulty Badge */}
            <span className={`text-xs font-semibold uppercase px-2.5 py-0.5 rounded-full border ${getDifficultyBadge(quest.difficulty)}`}>
              {quest.difficulty}
            </span>

            {/* Category Tag */}
            <span className="text-xs font-semibold text-[#6E6E73] uppercase px-2.5 py-0.5 rounded-full border border-[#E5E5EA] bg-[#FAF9F5]">
              {quest.category}
            </span>

            {/* Attribute Tag */}
            <span
              className="text-xs font-semibold uppercase px-2.5 py-0.5 rounded-full border bg-white"
              style={{
                color: attrMeta.color,
                borderColor: `${attrMeta.color}40`,
              }}
            >
              {attrMeta.name}
            </span>

            {/* Recurring Tag */}
            {quest.is_recurring && (
              <span className="text-xs font-semibold text-[#7C3AED] uppercase flex items-center gap-1 px-2.5 py-0.5 rounded-full border border-[#7C3AED]/30 bg-[#F2F2F7]">
                <RotateCw className="w-3 h-3 text-[#7C3AED]" />
                <span>Daily</span>
              </span>
            )}
          </div>

          <h4 className={`text-base font-semibold ${isCompleted ? 'line-through text-[#8E8E93]' : 'text-[#1D1D1F]'}`}>
            {quest.title}
          </h4>

          {quest.description && (
            <p className="text-sm text-[#6E6E73] line-clamp-2 mt-1 leading-relaxed font-sans">
              {quest.description}
            </p>
          )}

          {/* Rewards & Actions */}
          <div className="flex items-center justify-between mt-3 pt-3 border-t border-[#E5E5EA]">
            <div className="flex items-center space-x-4 text-xs font-semibold">
              <span className="flex items-center gap-1 text-[#7C3AED]">
                <Zap className="w-3.5 h-3.5" /> +{quest.xp_reward} XP
              </span>
              <span className="flex items-center gap-1 text-[#C9A227]">
                <Coins className="w-3.5 h-3.5" /> +{quest.gold_reward} Gold
              </span>
            </div>

            <div className="flex items-center space-x-2">
              <button
                onClick={handleDelete}
                disabled={isDeleting}
                aria-label="Delete quest"
                className="p-1.5 text-[#8E8E93] hover:text-[#D32F2F] transition-colors opacity-0 group-hover:opacity-100 cursor-pointer"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};
