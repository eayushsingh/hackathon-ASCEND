'use client';

// ==============================================================================
// ASCEND - QUEST CARD COMPONENT
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
  Clock,
  Sparkles,
  AlertCircle,
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

  const isCompleted = quest.status === 'Completed';
  const attrMeta = ATTRIBUTE_CONFIG[quest.attribute] || ATTRIBUTE_CONFIG.Intellect;

  const getDifficultyBadge = (diff: QuestDifficulty) => {
    switch (diff) {
      case 'Easy':
        return 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30';
      case 'Medium':
        return 'bg-cyan-500/10 text-cyan-400 border-cyan-500/30';
      case 'Hard':
        return 'bg-amber-500/10 text-amber-400 border-amber-500/30';
      case 'Epic':
        return 'bg-purple-500/10 text-purple-400 border-purple-500/30';
      case 'Legendary':
        return 'bg-rose-500/10 text-rose-400 border-rose-500/30 animate-pulse';
    }
  };

  const handleComplete = async () => {
    if (isCompleted || isCompleting) return;
    setIsCompleting(true);
    try {
      await completeQuest(quest.id);
    } catch {
      // Handled
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
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.95 }}
      whileHover={{ y: -2 }}
      className={`group relative rounded-xl border p-4 transition-all ${
        isCompleted
          ? 'bg-[#0A0E18]/60 border-white/5 opacity-60'
          : 'bg-[#0F1420]/80 border-white/10 hover:border-cyan-500/40 hover:shadow-[0_0_20px_rgba(6,182,212,0.15)]'
      }`}
    >
      <div className="flex items-start space-x-3.5">
        {/* Complete Checkbox Trigger */}
        <button
          onClick={handleComplete}
          disabled={isCompleted || isCompleting}
          aria-label={isCompleted ? 'Quest Completed' : 'Complete Quest'}
          className={`w-7 h-7 rounded-lg flex items-center justify-center shrink-0 border transition-all mt-0.5 ${
            isCompleted
              ? 'bg-cyan-500/20 border-cyan-500 text-cyan-300'
              : 'border-white/20 hover:border-cyan-400 hover:bg-cyan-500/10 text-transparent hover:text-cyan-400'
          }`}
        >
          <Check className={`w-4 h-4 ${isCompleted ? 'opacity-100' : 'opacity-0 group-hover:opacity-60'}`} />
        </button>

        {/* Quest Info */}
        <div className="flex-1 min-w-0">
          <div className="flex items-center space-x-2 flex-wrap gap-y-1 mb-1">
            {/* Difficulty Badge */}
            <span className={`text-[10px] font-extrabold uppercase px-2 py-0.5 rounded border ${getDifficultyBadge(quest.difficulty)}`}>
              {quest.difficulty}
            </span>

            {/* Category */}
            <span className="text-[10px] font-semibold text-slate-400 bg-white/5 px-2 py-0.5 rounded border border-white/5">
              {quest.category}
            </span>

            {/* Attribute Tag */}
            <span
              className="text-[10px] font-semibold px-2 py-0.5 rounded border"
              style={{
                color: attrMeta.color,
                backgroundColor: attrMeta.accentBg,
                borderColor: `${attrMeta.color}40`,
              }}
            >
              {attrMeta.shortName}
            </span>

            {/* Recurring Tag */}
            {quest.is_recurring && (
              <span className="text-[10px] font-medium text-slate-400 flex items-center gap-0.5 bg-slate-800/80 px-1.5 py-0.5 rounded">
                <RotateCw className="w-2.5 h-2.5 text-cyan-400" />
                <span>Daily</span>
              </span>
            )}
          </div>

          <h4 className={`text-sm font-bold tracking-tight truncate ${isCompleted ? 'line-through text-slate-500' : 'text-slate-100'}`}>
            {quest.title}
          </h4>

          {quest.description && (
            <p className="text-xs text-slate-400 line-clamp-2 mt-0.5">
              {quest.description}
            </p>
          )}

          {/* Reward Badges & Delete */}
          <div className="flex items-center justify-between mt-3 pt-2 border-t border-white/5">
            <div className="flex items-center space-x-3 text-xs font-bold">
              <span className="flex items-center gap-1 text-cyan-400">
                <Zap className="w-3.5 h-3.5" /> +{quest.xp_reward} XP
              </span>
              <span className="flex items-center gap-1 text-amber-400">
                <Coins className="w-3.5 h-3.5" /> +{quest.gold_reward} Gold
              </span>
            </div>

            <div className="flex items-center space-x-1">
              <button
                onClick={handleDelete}
                disabled={isDeleting}
                aria-label="Delete quest"
                className="p-1 rounded text-slate-500 hover:text-rose-400 hover:bg-rose-500/10 transition-all opacity-0 group-hover:opacity-100"
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
