'use client';

// ==============================================================================
// ASCEND - QUIET, FOCUSED QUEST CARD WITH RECURRING SCHEDULE & EDIT CONTROLS
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
  Edit2,
  Calendar,
} from 'lucide-react';
import { ATTRIBUTE_CONFIG } from '@/lib/progression/attributes';
import { formatRecurringDaysSummary } from '@/lib/progression/schedule';
import { TaskTimerModal } from '@/components/modals/TaskTimerModal';
import { CreateQuestModal } from '@/components/modals/CreateQuestModal';

interface QuestCardProps {
  quest: Quest;
  onEdit?: (quest: Quest) => void;
  isCompletedOverride?: boolean;
}

export const QuestCard: React.FC<QuestCardProps> = ({ quest, onEdit, isCompletedOverride }) => {
  const { completeQuest, deleteQuest } = useGame();
  const [isCompleting, setIsCompleting] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [justCompletedAnim, setJustCompletedAnim] = useState(false);
  const [isTimerOpen, setIsTimerOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);

  const isCompleted = isCompletedOverride !== undefined ? isCompletedOverride : quest.status === 'Completed';
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

  const scheduleSummary = quest.is_recurring
    ? formatRecurringDaysSummary(quest.recurring_days)
    : null;

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

              {/* Recurring Routine Tag */}
              {quest.is_recurring && (
                <span
                  title={scheduleSummary || 'Recurring'}
                  className="text-xs font-semibold text-[#7C3AED] uppercase flex items-center gap-1 px-2.5 py-0.5 rounded-full border border-[#7C3AED]/30 bg-[#F2F2F7]"
                >
                  <RotateCw className="w-3 h-3 text-[#7C3AED]" />
                  <span>
                    {quest.recurring_days && quest.recurring_days.length > 0 && quest.recurring_days.length < 7
                      ? quest.recurring_days.map((d) => d.slice(0, 3).toUpperCase()).join('·')
                      : 'Daily'}
                  </span>
                </span>
              )}

              {/* One-off Due Date Tag */}
              {!quest.is_recurring && quest.due_date && (
                <span className="text-xs font-semibold text-[#6E6E73] uppercase flex items-center gap-1 px-2.5 py-0.5 rounded-full border border-[#E5E5EA] bg-white">
                  <Calendar className="w-3 h-3 text-purple-600" />
                  <span>Due {quest.due_date.includes('T') ? quest.due_date.split('T')[0] : quest.due_date}</span>
                </span>
              )}

              {/* Scheduled Alarm Badge */}
              {quest.reminder_time && (
                <span className="text-xs font-semibold text-purple-700 uppercase flex items-center gap-1 px-2.5 py-0.5 rounded-full border border-purple-200 bg-purple-50">
                  <Bell className="w-3 h-3 text-purple-600 animate-pulse" />
                  <span>{quest.reminder_time}</span>
                </span>
              )}

              {/* Planned Focus Timer Badge */}
              {quest.timer_minutes && (
                <span className="text-xs font-semibold text-purple-700 uppercase flex items-center gap-1 px-2.5 py-0.5 rounded-full border border-purple-200 bg-purple-50">
                  <Clock className="w-3 h-3 text-purple-600" />
                  <span>{quest.timer_minutes}m Focus</span>
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

              <div className="flex items-center space-x-1.5">
                {/* Calendar & Schedule Button (Before Timer) */}
                {!isCompleted && (
                  <button
                    onClick={() => setIsEditModalOpen(true)}
                    className="px-2.5 py-1.5 rounded-full bg-sky-50 hover:bg-sky-100 border border-sky-200 text-sky-700 hover:text-sky-900 text-xs font-semibold flex items-center space-x-1 transition-all cursor-pointer shadow-xs"
                    title="Edit Calendar & Schedule for this quest"
                  >
                    <Calendar className="w-3.5 h-3.5 text-sky-600" />
                    <span>Schedule</span>
                  </button>
                )}

                {/* Focus Timer Trigger Button */}
                {!isCompleted && (
                  <button
                    onClick={() => setIsTimerOpen(true)}
                    className="px-2.5 py-1.5 rounded-full bg-purple-50 hover:bg-purple-100 border border-purple-200 text-purple-700 hover:text-purple-900 text-xs font-semibold flex items-center space-x-1 transition-all cursor-pointer shadow-xs"
                    title="Start Focus Timer & Screen-Time for this task"
                  >
                    <Clock className="w-3.5 h-3.5 text-purple-600" />
                    <span>{quest.timer_minutes ? `${quest.timer_minutes}m Timer` : 'Timer'}</span>
                  </button>
                )}

                {/* Edit Quest Button */}
                <button
                  onClick={() => (onEdit ? onEdit(quest) : setIsEditModalOpen(true))}
                  aria-label="Edit quest schedule or details"
                  title="Edit schedule or notes"
                  className="p-1.5 text-[#8E8E93] hover:text-[#1D1D1F] hover:bg-[#F5F5F7] rounded-lg transition-all cursor-pointer"
                >
                  <Edit2 className="w-4 h-4" />
                </button>

                {/* Delete Button */}
                <button
                  onClick={handleDelete}
                  disabled={isDeleting}
                  aria-label="Delete quest"
                  title="Delete quest"
                  className="p-1.5 text-[#8E8E93] hover:text-[#D32F2F] hover:bg-red-50 active:bg-red-100 rounded-lg transition-all opacity-80 sm:opacity-0 sm:group-hover:opacity-100 cursor-pointer"
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

      {/* Edit Quest Modal */}
      <CreateQuestModal
        isOpen={isEditModalOpen}
        onClose={() => setIsEditModalOpen(false)}
        editQuest={quest}
      />
    </>
  );
};
