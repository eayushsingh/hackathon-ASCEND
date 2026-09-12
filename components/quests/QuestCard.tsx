'use client';

// ==============================================================================
// ASCEND - QUIET, FOCUSED QUEST CARD WITH SATISFYING SPRING CHECKBOX & TIMER
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
  Clock,
  Bell,
} from 'lucide-react';
import { ATTRIBUTE_CONFIG } from '@/lib/progression/attributes';
import { TaskTimerModal } from '@/components/modals/TaskTimerModal';

interface QuestCardProps {
  quest: Quest;
  onEdit?: (quest: Quest) => void;
}

export const QuestCard: React.FC<QuestCardProps> = ({ quest, onEdit }) => {
  const { completeQuest, deleteQuest } = useGame();
  const [isCompleting, setIsCompleting] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [justCompletedAnim, setJustCompletedAnim] = useState(false);
  const [isTimerOpen, setIsTimerOpen] = useState(false);

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
    <>
      <div
        className={`group relative apple-card apple-card-hover p-4.5 bg-white transition-all duration-200 ${
          isCompleted ? 'opacity-60 bg-[#FAF9F5]' : 'opacity-100'
        }`}
      >
        <div className="flex items-start space-x-4">
          {/* SATISFYING SPRING CHECKBOX MICRO-INTERACTION */}
          <motion.button
            onClick={handleComplete}
            disabled={isCompleted || isCompleting}
            whileTap={{ scale: 0.85 }}
            whileHover={{ scale: 1.05 }}
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

              {/* Scheduled Alarm Badge */}
              {quest.reminder_time && (
                <span className="text-xs font-semibold text-purple-700 uppercase flex items-center gap-1 px-2.5 py-0.5 rounded-full border border-purple-200 bg-purple-50">
                  <Bell className="w-3 h-3 text-purple-600 animate-pulse" />
                  <span>{quest.reminder_time}</span>
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
                {/* Focus Timer Trigger Button */}
                {!isCompleted && (
                  <button
                    onClick={() => setIsTimerOpen(true)}
                    className="px-3 py-1.5 rounded-full bg-purple-50 hover:bg-purple-100 border border-purple-200 text-purple-700 hover:text-purple-900 text-xs font-semibold flex items-center space-x-1.5 transition-all cursor-pointer shadow-sm"
                    title="Start Focus Timer & Screen-Time for this task"
                  >
                    <Clock className="w-3.5 h-3.5 text-purple-600" />
                    <span>Focus Timer</span>
                  </button>
                )}

                <button
                  onClick={handleDelete}
                  disabled={isDeleting}
                  aria-label="Delete quest"
                  className="p-2 -mr-1.5 text-[#8E8E93] hover:text-[#D32F2F] hover:bg-red-50 active:bg-red-100 rounded-lg transition-all opacity-80 sm:opacity-0 sm:group-hover:opacity-100 cursor-pointer flex items-center justify-center min-w-[36px] min-h-[36px]"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Real-time Task Focus & Screen Time Modal */}
      <TaskTimerModal
        quest={quest}
        isOpen={isTimerOpen}
        onClose={() => setIsTimerOpen(false)}
      />
    </>
  );
};
