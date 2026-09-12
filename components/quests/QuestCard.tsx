'use client';

// ==============================================================================
// ASCEND - QUIET, FOCUSED QUEST CARD WITH SATISFYING SPRING CHECKBOX
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
  Sparkles,
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
        return 'text-emerald-400 bg-emerald-950/40 border-emerald-800/40';
      case 'Medium':
        return 'text-cyan-400 bg-cyan-950/40 border-cyan-800/40';
      case 'Hard':
        return 'text-amber-400 bg-amber-950/40 border-amber-800/40';
      case 'Epic':
        return 'text-purple-400 bg-purple-950/40 border-purple-800/40';
      case 'Legendary':
        return 'text-rose-400 bg-rose-950/40 border-rose-800/40';
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
        opacity: isCompleted ? 0.55 : 1,
        y: 0,
        scale: justCompletedAnim ? [1, 1.02, 1] : 1,
      }}
      exit={{ opacity: 0, height: 0, marginBottom: 0, overflow: 'hidden' }}
      transition={{ duration: 0.3, ease: 'easeInOut' }}
      className={`group relative rounded-xl border p-3.5 transition-colors ${
        isCompleted
          ? 'bg-[#0A0D15] border-white/5'
          : 'bg-[#0D111A] border-white/8 hover:border-white/20'
      }`}
    >
      <div className="flex items-start space-x-3">
        {/* SATISFYING SPRING CHECKBOX MICRO-INTERACTION */}
        <motion.button
          onClick={handleComplete}
          disabled={isCompleted || isCompleting}
          whileTap={{ scale: 0.85 }}
          whileHover={{ scale: 1.08 }}
          aria-label={isCompleted ? 'Quest Completed' : 'Complete Quest'}
          className={`w-6 h-6 rounded-lg flex items-center justify-center shrink-0 border transition-all mt-0.5 cursor-pointer ${
            isCompleted || justCompletedAnim
              ? 'bg-cyan-500 border-cyan-400 text-slate-950 shadow-[0_0_12px_rgba(6,182,212,0.8)]'
              : 'border-white/20 hover:border-cyan-400 bg-slate-900/60 text-transparent hover:text-cyan-400'
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
            <Check className="w-3.5 h-3.5 stroke-[3]" />
          </motion.div>
        </motion.button>

        {/* Clean, Readable Quest Content */}
        <div className="flex-1 min-w-0">
          <div className="flex items-center space-x-2 flex-wrap gap-y-1 mb-1">
            {/* Difficulty Badge */}
            <span className={`text-[10px] font-bold uppercase px-1.5 py-0.5 rounded border ${getDifficultyBadge(quest.difficulty)}`}>
              {quest.difficulty}
            </span>

            {/* Category Tag */}
            <span className="text-[10px] text-slate-400 bg-white/5 px-1.5 py-0.5 rounded border border-white/5">
              {quest.category}
            </span>

            {/* Attribute Tag */}
            <span
              className="text-[10px] font-medium px-1.5 py-0.5 rounded border"
              style={{
                color: attrMeta.color,
                backgroundColor: `${attrMeta.color}10`,
                borderColor: `${attrMeta.color}30`,
              }}
            >
              {attrMeta.name}
            </span>

            {/* Recurring Tag */}
            {quest.is_recurring && (
              <span className="text-[10px] text-slate-400 flex items-center gap-0.5 bg-slate-900 px-1.5 py-0.5 rounded border border-white/5">
                <RotateCw className="w-2.5 h-2.5 text-cyan-400" />
                <span>Daily</span>
              </span>
            )}
          </div>

          <h4 className={`text-sm font-semibold tracking-tight ${isCompleted ? 'line-through text-slate-500' : 'text-slate-100'}`}>
            {quest.title}
          </h4>

          {quest.description && (
            <p className="text-xs text-slate-400 line-clamp-2 mt-0.5 leading-relaxed font-sans">
              {quest.description}
            </p>
          )}

          {/* Subdued Rewards & Action Bar */}
          <div className="flex items-center justify-between mt-2.5 pt-2 border-t border-white/5">
            <div className="flex items-center space-x-3 text-xs font-semibold">
              <span className="flex items-center gap-1 text-cyan-400 font-display">
                <Zap className="w-3 h-3" /> +{quest.xp_reward} XP
              </span>
              <span className="flex items-center gap-1 text-amber-400 font-display">
                <Coins className="w-3 h-3" /> +{quest.gold_reward} Gold
              </span>
            </div>

            <div className="flex items-center space-x-1">
              <button
                onClick={handleDelete}
                disabled={isDeleting}
                aria-label="Delete quest"
                className="p-1 rounded text-slate-600 hover:text-rose-400 hover:bg-rose-500/10 transition-colors opacity-0 group-hover:opacity-100"
              >
                <Trash2 className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};
