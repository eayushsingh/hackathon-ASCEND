'use client';

// ==============================================================================
// ASCEND - QUIET, FOCUSED QUEST CARD WITH SATISFYING SPRING CHECKBOX
// Minimalist Editorial Theme
// ==============================================================================

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
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
        return 'text-[#2F7A4D] border-[#2F7A4D]/20 bg-[#2F7A4D]/5';
      case 'Medium':
        return 'text-[#2563EB] border-[#2563EB]/20 bg-[#2563EB]/5';
      case 'Hard':
        return 'text-[#C9A227] border-[#C9A227]/20 bg-[#C9A227]/5';
      case 'Epic':
        return 'text-[#7C3AED] border-[#7C3AED]/20 bg-[#7C3AED]/5';
      case 'Legendary':
        return 'text-[#C13F3F] border-[#C13F3F]/20 bg-[#C13F3F]/5';
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
        opacity: isCompleted ? 0.4 : 1,
        y: 0,
        scale: justCompletedAnim ? [1, 1.02, 1] : 1,
      }}
      exit={{ opacity: 0, height: 0, marginBottom: 0, overflow: 'hidden' }}
      transition={{ duration: 0.3, ease: 'easeInOut' }}
      className={`group relative rounded-none border border-[#141110]/10 p-4 transition-colors bg-white hover:border-[#141110]/30`}
    >
      <div className="flex items-start space-x-4">
        {/* SATISFYING SPRING CHECKBOX MICRO-INTERACTION */}
        <motion.button
          onClick={handleComplete}
          disabled={isCompleted || isCompleting}
          whileTap={{ scale: 0.85 }}
          whileHover={{ scale: 1.08 }}
          aria-label={isCompleted ? 'Quest Completed' : 'Complete Quest'}
          className={`w-6 h-6 rounded-none flex items-center justify-center shrink-0 border-2 transition-all mt-0.5 cursor-pointer ${
            isCompleted || justCompletedAnim
              ? 'bg-[#E8552A] border-[#E8552A] text-white'
              : 'border-[#141110]/20 hover:border-[#E8552A] bg-transparent text-transparent hover:text-[#E8552A]'
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
            <Check className="w-4 h-4 stroke-[4]" />
          </motion.div>
        </motion.button>

        {/* Clean, Readable Quest Content */}
        <div className="flex-1 min-w-0">
          <div className="flex items-center space-x-2 flex-wrap gap-y-1 mb-2">
            {/* Difficulty Badge */}
            <span className={`text-[10px] font-bold uppercase px-1.5 py-0.5 border ${getDifficultyBadge(quest.difficulty)}`}>
              {quest.difficulty}
            </span>

            {/* Category Tag */}
            <span className="text-[10px] text-[#6B6560] uppercase px-1.5 py-0.5 border border-[#141110]/10">
              {quest.category}
            </span>

            {/* Attribute Tag */}
            <span
              className="text-[10px] font-bold uppercase px-1.5 py-0.5 border"
              style={{
                color: attrMeta.color,
                borderColor: attrMeta.color,
              }}
            >
              {attrMeta.name}
            </span>

            {/* Recurring Tag */}
            {quest.is_recurring && (
              <span className="text-[10px] text-[#6B6560] uppercase flex items-center gap-0.5 px-1.5 py-0.5 border border-[#141110]/10">
                <RotateCw className="w-2.5 h-2.5 text-[#E8552A]" />
                <span>Daily</span>
              </span>
            )}
          </div>

          <h4 className={`text-base font-bold uppercase tracking-wide ${isCompleted ? 'line-through text-[#6B6560]' : 'text-[#141110]'}`}>
            {quest.title}
          </h4>

          {quest.description && (
            <p className="text-sm text-[#6B6560] line-clamp-2 mt-1 leading-relaxed font-sans">
              {quest.description}
            </p>
          )}

          {/* Subdued Rewards & Action Bar */}
          <div className="flex items-center justify-between mt-3 pt-3 border-t border-[#141110]/10">
            <div className="flex items-center space-x-4 text-sm font-bold font-display tracking-widest">
              <span className="flex items-center gap-1 text-[#E8552A]">
                <Zap className="w-3.5 h-3.5" /> +{quest.xp_reward} XP
              </span>
              <span className="flex items-center gap-1 text-[#C9A227]">
                <Coins className="w-3.5 h-3.5" /> +{quest.gold_reward} G
              </span>
            </div>

            <div className="flex items-center space-x-2">
              <button
                onClick={handleDelete}
                disabled={isDeleting}
                aria-label="Delete quest"
                className="p-1.5 text-[#A8A29E] hover:text-[#C13F3F] transition-colors opacity-0 group-hover:opacity-100"
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
