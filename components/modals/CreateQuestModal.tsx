'use client';

// ==============================================================================
// ASCEND - CREATE & EDIT QUEST MODAL
// Apple Bright Premium Quest Creation & Weekly Routine Schedule Builder
// ==============================================================================

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useGame } from '@/lib/context/game-context';
import {
  Quest,
  QuestCategory,
  QuestDifficulty,
  AttributeType,
  QuestPriority,
  Weekday,
} from '@/types/rpg';
import { ATTRIBUTE_LIST, getDefaultAttributeForCategory } from '@/lib/progression/attributes';
import { calculateAuthoritativeRewards } from '@/lib/progression/rewards';
import { WeeklyScheduleSelector } from '@/components/quests/WeeklyScheduleSelector';
import {
  X,
  Zap,
  Coins,
  Sparkles,
  RotateCw,
  AlertCircle,
  Bell,
  Calendar,
} from 'lucide-react';

interface CreateQuestModalProps {
  isOpen: boolean;
  onClose: () => void;
  defaultDueDate?: string;
  editQuest?: Quest | null;
}

export const CreateQuestModal: React.FC<CreateQuestModalProps> = ({
  isOpen,
  onClose,
  defaultDueDate,
  editQuest,
}) => {
  const { createQuest, updateQuest, profile, streak } = useGame();

  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState<QuestCategory>('Work');
  const [difficulty, setDifficulty] = useState<QuestDifficulty>('Medium');
  const [attribute, setAttribute] = useState<AttributeType>('Intellect');
  const [dueDate, setDueDate] = useState<string>('');
  const [isRecurring, setIsRecurring] = useState(false);
  const [recurringDays, setRecurringDays] = useState<Weekday[]>(['mon', 'tue', 'wed', 'thu', 'fri']);
  const [priority, setPriority] = useState<QuestPriority>('Medium');
  const [isAlarmEnabled, setIsAlarmEnabled] = useState(false);
  const [reminderTime, setReminderTime] = useState('08:00');
  const [validationError, setValidationError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Synchronize state when editQuest or defaultDueDate changes
  useEffect(() => {
    if (editQuest) {
      setTitle(editQuest.title || '');
      setDescription(editQuest.description || '');
      setCategory(editQuest.category || 'Work');
      setDifficulty(editQuest.difficulty || 'Medium');
      setAttribute(editQuest.attribute || 'Intellect');
      setDueDate(editQuest.due_date ? (editQuest.due_date.includes('T') ? editQuest.due_date.split('T')[0] : editQuest.due_date) : '');
      setIsRecurring(Boolean(editQuest.is_recurring));
      if (editQuest.recurring_days && Array.isArray(editQuest.recurring_days) && editQuest.recurring_days.length > 0) {
        setRecurringDays(editQuest.recurring_days as Weekday[]);
      } else {
        setRecurringDays(['mon', 'tue', 'wed', 'thu', 'fri', 'sat', 'sun']);
      }
      setPriority(editQuest.priority || 'Medium');
      setIsAlarmEnabled(Boolean(editQuest.reminder_enabled || editQuest.reminder_time));
      setReminderTime(editQuest.reminder_time || '08:00');
    } else {
      setTitle('');
      setDescription('');
      setCategory('Work');
      setDifficulty('Medium');
      setAttribute('Intellect');
      setDueDate(defaultDueDate || '');
      setIsRecurring(false);
      setRecurringDays(['mon', 'tue', 'wed', 'thu', 'fri']);
      setPriority('Medium');
      setIsAlarmEnabled(false);
      setReminderTime('08:00');
    }
  }, [editQuest, defaultDueDate, isOpen]);

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
    setValidationError(null);

    if (!title.trim()) {
      setValidationError('Please enter a quest title.');
      return;
    }

    if (isSubmitting) return;

    setIsSubmitting(true);
    try {
      if (editQuest) {
        // Edit existing quest
        await updateQuest(editQuest.id, {
          title: title.trim(),
          description: description.trim(),
          category,
          difficulty,
          attribute,
          due_date: isRecurring ? null : dueDate ? dueDate : null,
          is_recurring: isRecurring,
          recurrence_interval: isRecurring ? (recurringDays.length === 7 ? 'Daily' : 'Weekly') : 'None',
          recurring_days: isRecurring ? recurringDays : null,
          priority,
          reminder_time: isAlarmEnabled ? reminderTime : null,
          reminder_enabled: isAlarmEnabled,
        });
      } else {
        // Create new quest
        await createQuest({
          title: title.trim(),
          description: description.trim(),
          category,
          difficulty,
          attribute,
          due_date: isRecurring ? null : dueDate ? dueDate : null,
          is_recurring: isRecurring,
          recurrence_interval: isRecurring ? (recurringDays.length === 7 ? 'Daily' : 'Weekly') : undefined,
          recurring_days: isRecurring ? recurringDays : null,
          priority,
          reminder_time: isAlarmEnabled ? reminderTime : null,
          reminder_enabled: isAlarmEnabled,
        });
      }

      setValidationError(null);
      onClose();
    } catch (err: unknown) {
      setValidationError((err as Error).message || 'Failed to save quest. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const categories: QuestCategory[] = ['Work', 'Fitness', 'Learning', 'Habit', 'Creative', 'Social'];
  const difficulties: QuestDifficulty[] = ['Easy', 'Medium', 'Hard', 'Epic', 'Legendary'];

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm">
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 10 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 10 }}
          className="relative w-full max-w-lg apple-card p-6 sm:p-8 overflow-hidden max-h-[90vh] overflow-y-auto"
        >
          {/* Header */}
          <div className="flex items-start justify-between pb-4 border-b border-[#E5E5EA]">
            <div>
              <h3 className="text-2xl font-bold text-[#1D1D1F] tracking-tight">
                {editQuest ? 'Edit Quest' : 'Create New Quest'}
              </h3>
              <p className="text-xs text-[#6E6E73] mt-0.5">
                {editQuest
                  ? 'Update your quest details, schedule, or reminder settings.'
                  : 'Add your daily tasks, workouts, or habits to earn XP and level up.'}
              </p>
            </div>
            <button
              onClick={onClose}
              className="text-[#8E8E93] hover:text-[#1D1D1F] transition-colors p-1.5 rounded-full hover:bg-[#F5F5F7] cursor-pointer"
            >
              <X className="w-5 h-5 stroke-[2.5]" />
            </button>
          </div>

          {validationError && (
            <div className="mt-4 p-3 rounded-xl bg-rose-50 border border-rose-200 text-rose-700 text-xs font-semibold flex items-center gap-2">
              <AlertCircle className="w-4 h-4 shrink-0" />
              <span>{validationError}</span>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4 mt-5">
            {/* Title */}
            <div>
              <label className="block text-xs font-bold text-[#1D1D1F] uppercase tracking-wider mb-1.5">
                Quest Title *
              </label>
              <input
                type="text"
                value={title}
                onChange={(e) => {
                  setTitle(e.target.value);
                  if (validationError) setValidationError(null);
                }}
                placeholder="e.g., Read for 20 minutes, Morning Workout, or Complete Project"
                required
                className="w-full px-4 py-3 bg-[#F5F5F7] border border-[#E5E5EA] rounded-xl text-[#1D1D1F] placeholder-[#8E8E93] text-sm focus:outline-none focus:border-purple-500 font-medium transition-colors"
              />
            </div>

            {/* Schedule Type / Due Date & Skill */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-[#1D1D1F] uppercase tracking-wider mb-1.5 flex items-center gap-1.5">
                  <Calendar className="w-3.5 h-3.5 text-purple-600" />
                  <span>Due Date (One-off)</span>
                </label>
                <input
                  type="date"
                  value={dueDate}
                  disabled={isRecurring}
                  onChange={(e) => setDueDate(e.target.value)}
                  className={`w-full px-4 py-2.5 bg-[#F5F5F7] border border-[#E5E5EA] rounded-xl text-[#1D1D1F] text-xs font-medium focus:outline-none focus:border-purple-500 transition-colors ${
                    isRecurring ? 'opacity-40 cursor-not-allowed' : ''
                  }`}
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-[#1D1D1F] uppercase tracking-wider mb-1.5">
                  Skill Boosted
                </label>
                <select
                  value={attribute}
                  onChange={(e) => setAttribute(e.target.value as AttributeType)}
                  className="w-full px-4 py-2.5 bg-[#F5F5F7] border border-[#E5E5EA] rounded-xl text-[#1D1D1F] text-xs font-semibold focus:outline-none focus:border-purple-500 cursor-pointer"
                >
                  {ATTRIBUTE_LIST.map((attr) => (
                    <option key={attr.type} value={attr.type}>
                      {attr.name} (+{attr.primaryCategories.join(', ')})
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* Description / Notes */}
            <div>
              <label className="block text-xs font-bold text-[#1D1D1F] uppercase tracking-wider mb-1.5">
                Notes (Optional)
              </label>
              <textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Add checklist notes or details..."
                rows={2}
                className="w-full px-4 py-2.5 bg-[#F5F5F7] border border-[#E5E5EA] rounded-xl text-[#1D1D1F] placeholder-[#8E8E93] text-sm focus:outline-none focus:border-purple-500 font-medium resize-none transition-colors"
              />
            </div>

            {/* Category selection */}
            <div>
              <label className="block text-xs font-bold text-[#1D1D1F] uppercase tracking-wider mb-1.5">
                Category
              </label>
              <div className="grid grid-cols-3 gap-2">
                {categories.map((cat) => (
                  <button
                    type="button"
                    key={cat}
                    onClick={() => handleCategoryChange(cat)}
                    className={`py-2 px-2 text-xs font-semibold rounded-xl transition-all border cursor-pointer ${
                      category === cat
                        ? 'btn-primary-gradient text-white border-transparent shadow-sm'
                        : 'bg-white text-[#6E6E73] border-[#E5E5EA] hover:border-[#C7C7CC] hover:text-[#1D1D1F]'
                    }`}
                  >
                    {cat}
                  </button>
                ))}
              </div>
            </div>

            {/* Difficulty selection */}
            <div>
              <label className="block text-xs font-bold text-[#1D1D1F] uppercase tracking-wider mb-1.5">
                Difficulty
              </label>
              <div className="grid grid-cols-5 gap-1.5">
                {difficulties.map((diff) => (
                  <button
                    type="button"
                    key={diff}
                    onClick={() => setDifficulty(diff)}
                    className={`py-2 px-1 text-[11px] font-semibold rounded-xl transition-all border text-center cursor-pointer ${
                      difficulty === diff
                        ? 'bg-purple-600 text-white border-purple-600 shadow-sm'
                        : 'bg-white text-[#6E6E73] border-[#E5E5EA] hover:border-[#C7C7CC] hover:text-[#1D1D1F]'
                    }`}
                  >
                    {diff}
                  </button>
                ))}
              </div>
            </div>

            {/* RECURRING WEEKLY SCHEDULE CONTROLS */}
            <div className="space-y-3">
              {/* Recurring Toggle Switch */}
              <div className="flex items-center justify-between p-3.5 bg-[#F5F5F7] rounded-xl border border-[#E5E5EA]">
                <div className="flex items-center space-x-3">
                  <RotateCw className="w-5 h-5 text-purple-600" />
                  <div>
                    <div className="text-xs font-bold text-[#1D1D1F]">Recurring Weekly Schedule</div>
                    <div className="text-[11px] text-[#6E6E73]">
                      Repeat this quest on specific days of the week
                    </div>
                  </div>
                </div>
                <input
                  type="checkbox"
                  checked={isRecurring}
                  onChange={(e) => {
                    const checked = e.target.checked;
                    setIsRecurring(checked);
                    if (checked && recurringDays.length === 0) {
                      setRecurringDays(['mon', 'tue', 'wed', 'thu', 'fri']);
                    }
                  }}
                  className="w-5 h-5 accent-purple-600 rounded cursor-pointer"
                />
              </div>

              {/* 7-Day Selector (visible when recurring is active) */}
              {isRecurring && (
                <WeeklyScheduleSelector
                  selectedDays={recurringDays}
                  onChange={(days) => {
                    setRecurringDays(days);
                    if (days.length === 0) {
                      setIsRecurring(false);
                    }
                  }}
                />
              )}
            </div>

            {/* Scheduled Alarm Reminder Toggle */}
            <div className="p-3.5 bg-[#F5F5F7] rounded-xl border border-[#E5E5EA] space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <Bell className="w-5 h-5 text-purple-600" />
                  <div>
                    <div className="text-xs font-bold text-[#1D1D1F]">Scheduled Alarm Reminder</div>
                    <div className="text-[11px] text-[#6E6E73]">Rings an audio alarm chime when it&apos;s time for this task</div>
                  </div>
                </div>
                <input
                  type="checkbox"
                  checked={isAlarmEnabled}
                  onChange={(e) => setIsAlarmEnabled(e.target.checked)}
                  className="w-5 h-5 accent-purple-600 rounded cursor-pointer"
                />
              </div>

              {isAlarmEnabled && (
                <div className="pt-2.5 border-t border-[#E5E5EA] flex flex-col sm:flex-row items-center gap-2">
                  <input
                    type="time"
                    value={reminderTime}
                    onChange={(e) => setReminderTime(e.target.value)}
                    className="w-full sm:w-auto px-3 py-1.5 bg-white border border-[#E5E5EA] rounded-xl text-xs font-mono font-bold text-[#1D1D1F] focus:outline-none focus:border-purple-500 cursor-pointer"
                  />
                  <div className="flex items-center gap-1.5 w-full sm:w-auto flex-wrap">
                    {[
                      { label: '🌅 08:00 AM', time: '08:00' },
                      { label: '☀️ 02:00 PM', time: '14:00' },
                      { label: '🌙 08:00 PM', time: '20:00' },
                    ].map((preset) => (
                      <button
                        key={preset.time}
                        type="button"
                        onClick={() => setReminderTime(preset.time)}
                        className={`px-2 py-1 text-[11px] font-mono rounded-lg border transition-all cursor-pointer ${
                          reminderTime === preset.time
                            ? 'bg-purple-600 text-white border-purple-600 shadow-xs'
                            : 'bg-white text-[#6E6E73] border-[#E5E5EA] hover:border-purple-300'
                        }`}
                      >
                        {preset.label}
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Estimated Rewards Preview */}
            <div className="p-3.5 bg-purple-50/50 rounded-xl border border-purple-200/60">
              <div className="text-[11px] font-mono font-bold uppercase text-purple-900 tracking-wider flex items-center gap-1.5 mb-2">
                <Sparkles className="w-3.5 h-3.5 text-purple-600" />
                <span>Rewards You&apos;ll Earn</span>
              </div>
              <div className="flex items-center justify-between text-xs font-mono font-bold">
                <span className="text-purple-700 flex items-center gap-1">
                  <Zap className="w-3.5 h-3.5" /> +{rewardsPreview.xpEarned} XP
                </span>
                <span className="text-amber-700 flex items-center gap-1">
                  <Coins className="w-3.5 h-3.5 text-amber-500" /> +{rewardsPreview.goldEarned} Gold
                </span>
                <span className="text-[#1D1D1F] flex items-center gap-1">
                  +{rewardsPreview.attributeXpEarned} {attribute}
                </span>
              </div>
            </div>

            {/* Submit Buttons */}
            <div className="flex items-center space-x-3 pt-3 border-t border-[#E5E5EA]">
              <button
                type="button"
                onClick={onClose}
                className="w-1/3 py-2.5 border border-[#E5E5EA] text-[#6E6E73] hover:text-[#1D1D1F] hover:bg-[#F5F5F7] rounded-xl font-semibold text-xs transition-colors cursor-pointer"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={isSubmitting || !title.trim()}
                className="w-2/3 py-2.5 btn-primary-gradient text-white rounded-xl font-semibold text-xs shadow-sm transition-all cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isSubmitting
                  ? editQuest
                    ? 'Saving Changes...'
                    : 'Creating Quest...'
                  : editQuest
                  ? 'Save Changes'
                  : 'Create Quest'}
              </button>
            </div>
          </form>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
