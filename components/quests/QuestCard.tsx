'use client';

// ==============================================================================
// ASCEND - VIBRANT MODERN RPG HUD QUEST CARD
// High-contrast glass quest tile with electric neon spring interaction
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
        return 'text-emerald-400 border-emerald-500/40 bg-emerald-950/40';
      case 'Medium':
        return 'text-cyan-400 border-cyan-500/40 bg-cyan-950/40';
      case 'Hard':
        return 'text-amber-400 border-amber-500/40 bg-amber-950/40';
      case 'Epic':
        return 'text-purple-400 border-purple-500/40 bg-purple-950/40';
      case 'Legendary':
        return 'text-rose-400 border-rose-500/40 bg-rose-950/40';
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
      className={`group relative rounded-2xl border border-white/10 p-4.5 transition-all bg-[#0D111A]/90 hover:border-indigo-500/40 hover:shadow-[0_0_25px_rgba(99,102,241,0.15)]`}
    >
      <div className="flex items-start space-x-4">
        {/* SATISFYING SPRING CHECKBOX */}
        <motion.button
          onClick={handleComplete}
          disabled={isCompleted || isCompleting}
          whileTap={{ scale: 0.85 }}
          whileHover={{ scale: 1.08 }}
          aria-label={isCompleted ? 'Quest Completed' : 'Complete Quest'}
          className={`w-6 h-6 rounded-lg flex items-center justify-center shrink-0 border transition-all mt-0.5 cursor-pointer ${
            isCompleted || justCompletedAnim
              ? 'bg-gradient-to-r from-indigo-500 to-purple-600 border-indigo-400 text-white shadow-[0_0_15px_rgba(99,102,241,0.6)]'
              : 'border-slate-700 hover:border-indigo-400 bg-slate-950 text-transparent hover:text-indigo-400'
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
            <span className={`text-[10px] font-mono font-bold uppercase px-2.5 py-0.5 rounded-full border ${getDifficultyBadge(quest.difficulty)}`}>
              {quest.difficulty}
            </span>

            {/* Category Tag */}
            <span className="text-[10px] font-mono text-slate-400 uppercase px-2.5 py-0.5 rounded-full border border-white/10 bg-slate-950">
              {quest.category}
            </span>

            {/* Attribute Tag */}
            <span
              className="text-[10px] font-mono font-bold uppercase px-2.5 py-0.5 rounded-full border bg-slate-950"
              style={{
                color: attrMeta.color,
                borderColor: `${attrMeta.color}60`,
              }}
            >
              {attrMeta.name}
            </span>

            {/* Recurring Tag */}
            {quest.is_recurring && (
              <span className="text-[10px] font-mono text-indigo-400 uppercase flex items-center gap-1 px-2.5 py-0.5 rounded-full border border-indigo-500/30 bg-indigo-950/40">
                <RotateCw className="w-3 h-3 text-indigo-400" />
                <span>DAILY</span>
              </span>
            )}
          </div>

          <h4 className={`text-base font-bold font-sans ${isCompleted ? 'line-through text-slate-500' : 'text-slate-100'}`}>
            {quest.title}
          </h4>

          {quest.description && (
            <p className="text-xs text-slate-400 line-clamp-2 mt-1 leading-relaxed font-sans">
              {quest.description}
            </p>
          )}

          {/* Rewards & Action Bar */}
          <div className="flex items-center justify-between mt-3 pt-3 border-t border-white/5">
            <div className="flex items-center space-x-4 text-xs font-mono font-bold">
              <span className="flex items-center gap-1 text-indigo-400">
                <Zap className="w-3.5 h-3.5" /> +{quest.xp_reward} XP
              </span>
              <span className="flex items-center gap-1 text-amber-400">
                <Coins className="w-3.5 h-3.5" /> +{quest.gold_reward} G
              </span>
            </div>

            <div className="flex items-center space-x-2">
              <button
                onClick={handleDelete}
                disabled={isDeleting}
                aria-label="Delete quest"
                className="p-1.5 text-slate-500 hover:text-rose-400 transition-colors opacity-0 group-hover:opacity-100 cursor-pointer"
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
