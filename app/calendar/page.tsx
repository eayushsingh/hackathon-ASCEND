'use client';

// ==============================================================================
// ASCEND - QUEST CALENDAR & WEEKLY SCHEDULER
// Apple-Inspired Bright Premium Scheduler Layout
// ==============================================================================

import React, { useState } from 'react';
import { useGame } from '@/lib/context/game-context';
import { Quest, QuestCategory, QuestDifficulty, AttributeType } from '@/types/rpg';
import { AnimatedCounter } from '@/components/ui/AnimatedCounter';
import {
  CalendarDays,
  Plus,
  CheckCircle2,
  Sparkles,
  Zap,
  Coins,
  Flame,
  Dumbbell,
  Brain,
  Layers,
  ChevronLeft,
  ChevronRight,
  Target,
} from 'lucide-react';
import { motion } from 'framer-motion';

export default function CalendarPage() {
  const { quests, completeQuest, createQuest, profile } = useGame();
  const [viewMode, setViewMode] = useState<'week' | 'month'>('week');
  const [currentWeekOffset, setCurrentWeekOffset] = useState<number>(0);
  const [isScheduleModalOpen, setIsScheduleModalOpen] = useState(false);
  const [selectedDateForNewQuest, setSelectedDateForNewQuest] = useState<string>(
    new Date().toISOString().split('T')[0]
  );

  // New Quest Form State
  const [newTitle, setNewTitle] = useState('');
  const [newCategory, setNewCategory] = useState<QuestCategory>('Work');
  const [newDifficulty, setNewDifficulty] = useState<QuestDifficulty>('Medium');
  const [newAttribute, setNewAttribute] = useState<AttributeType>('Intellect');

  // Compute Current Week Days (Mon - Sun)
  const getWeekDates = (offsetWeeks: number = 0) => {
    const today = new Date();
    const dayOfWeek = today.getDay(); // 0 is Sun, 1 is Mon
    const distanceToMon = dayOfWeek === 0 ? -6 : 1 - dayOfWeek;
    
    const monday = new Date(today);
    monday.setDate(today.getDate() + distanceToMon + offsetWeeks * 7);

    const week = [];
    for (let i = 0; i < 7; i++) {
      const d = new Date(monday);
      d.setDate(monday.getDate() + i);
      week.push(d);
    }
    return week;
  };

  const weekDates = getWeekDates(currentWeekOffset);
  const todayIso = new Date().toISOString().split('T')[0];

  const formatDateIso = (d: Date) => d.toISOString().split('T')[0];

  const getQuestsForDate = (dateStr: string) => {
    return quests.filter((q) => {
      if (q.due_date) {
        return q.due_date.split('T')[0] === dateStr;
      }
      if (q.is_recurring && q.recurrence_interval === 'Daily') return true;
      return q.created_at.split('T')[0] === dateStr;
    });
  };

  // Deployment Presets
  const handleDeployPreset = async (presetType: 'gym' | 'code' | 'habit') => {
    const today = new Date();

    if (presetType === 'gym') {
      const gymPlan = [
        { dayOffset: 0, title: 'Upper Body Power & Workout', category: 'Fitness' as QuestCategory, difficulty: 'Hard' as QuestDifficulty, attribute: 'Strength' as AttributeType },
        { dayOffset: 2, title: 'Lower Body & Core Workout', category: 'Fitness' as QuestCategory, difficulty: 'Hard' as QuestDifficulty, attribute: 'Vitality' as AttributeType },
        { dayOffset: 4, title: 'Cardio & Mobility Session', category: 'Fitness' as QuestCategory, difficulty: 'Medium' as QuestDifficulty, attribute: 'Vitality' as AttributeType },
        { dayOffset: 6, title: 'Active Recovery & Stretching', category: 'Fitness' as QuestCategory, difficulty: 'Easy' as QuestDifficulty, attribute: 'Discipline' as AttributeType },
      ];

      for (const p of gymPlan) {
        const targetDate = new Date(today);
        targetDate.setDate(today.getDate() + p.dayOffset);
        await createQuest({
          title: p.title,
          category: p.category,
          difficulty: p.difficulty,
          attribute: p.attribute,
          due_date: formatDateIso(targetDate),
          is_recurring: false,
        });
      }
    } else if (presetType === 'code') {
      const codePlan = [
        { dayOffset: 0, title: 'System Architecture & Data Schema', category: 'Work' as QuestCategory, difficulty: 'Hard' as QuestDifficulty, attribute: 'Intellect' as AttributeType },
        { dayOffset: 1, title: 'API Endpoint Hardening & Tests', category: 'Work' as QuestCategory, difficulty: 'Epic' as QuestDifficulty, attribute: 'Intellect' as AttributeType },
        { dayOffset: 3, title: 'UI Polish & Styling Optimization', category: 'Work' as QuestCategory, difficulty: 'Medium' as QuestDifficulty, attribute: 'Creativity' as AttributeType },
        { dayOffset: 5, title: 'Deployment Audit & Launch', category: 'Work' as QuestCategory, difficulty: 'Hard' as QuestDifficulty, attribute: 'Discipline' as AttributeType },
      ];

      for (const p of codePlan) {
        const targetDate = new Date(today);
        targetDate.setDate(today.getDate() + p.dayOffset);
        await createQuest({
          title: p.title,
          category: p.category,
          difficulty: p.difficulty,
          attribute: p.attribute,
          due_date: formatDateIso(targetDate),
          is_recurring: false,
        });
      }
    } else if (presetType === 'habit') {
      const habitPlan = [
        { dayOffset: 0, title: '20-Min Morning Reading & Meditation', category: 'Habit' as QuestCategory, difficulty: 'Easy' as QuestDifficulty, attribute: 'Discipline' as AttributeType },
        { dayOffset: 1, title: 'Read 30 Pages of Non-Fiction Book', category: 'Learning' as QuestCategory, difficulty: 'Medium' as QuestDifficulty, attribute: 'Intellect' as AttributeType },
        { dayOffset: 3, title: '90-Min Zero-Distraction Deep Work', category: 'Work' as QuestCategory, difficulty: 'Hard' as QuestDifficulty, attribute: 'Discipline' as AttributeType },
      ];

      for (const p of habitPlan) {
        const targetDate = new Date(today);
        targetDate.setDate(today.getDate() + p.dayOffset);
        await createQuest({
          title: p.title,
          category: p.category,
          difficulty: p.difficulty,
          attribute: p.attribute,
          due_date: formatDateIso(targetDate),
          is_recurring: true,
        });
      }
    }
  };

  const handleScheduleCustomQuest = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTitle.trim()) return;

    await createQuest({
      title: newTitle.trim(),
      category: newCategory,
      difficulty: newDifficulty,
      attribute: newAttribute,
      due_date: selectedDateForNewQuest,
      is_recurring: false,
    });

    setNewTitle('');
    setIsScheduleModalOpen(false);
  };

  // Weekly Stats
  const thisWeekQuests = weekDates.flatMap((d) => getQuestsForDate(formatDateIso(d)));
  const completedThisWeek = thisWeekQuests.filter((q) => q.status === 'Completed').length;
  const totalThisWeek = thisWeekQuests.length;
  const weeklyCompletionRate = totalThisWeek > 0 ? Math.round((completedThisWeek / totalThisWeek) * 100) : 0;

  return (
    <div className="space-y-10 pb-16 pt-4">
      {/* 1. TOP HERO CARD */}
      <div className="apple-card p-6 sm:p-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6 pb-6 border-b border-[#E5E5EA]">
          <div className="flex items-center space-x-5 text-center md:text-left">
            <div className="w-14 h-14 bg-[#F2F2F7] rounded-2xl flex items-center justify-center text-[#7C3AED] shrink-0">
              <CalendarDays className="w-7 h-7" />
            </div>
            <div>
              <div className="flex items-center justify-center md:justify-start space-x-2 text-xs font-semibold text-[#7C3AED] uppercase tracking-wider">
                <Target className="w-3.5 h-3.5" />
                <span>Weekly Schedule Matrix</span>
              </div>
              <h1 className="text-3xl md:text-4xl font-bold text-[#1D1D1F] mt-1">
                Quest Calendar
              </h1>
              <p className="text-sm text-[#6E6E73] mt-1 max-w-xl">
                Organize workouts, deep work blocks, and habit routines into scheduled calendar slots.
              </p>
            </div>
          </div>

          <button
            onClick={() => {
              setSelectedDateForNewQuest(todayIso);
              setIsScheduleModalOpen(true);
            }}
            className="px-6 py-3 btn-primary-gradient font-semibold text-xs rounded-full flex items-center space-x-2 shrink-0 cursor-pointer shadow-md"
          >
            <Plus className="w-4 h-4 stroke-[3]" />
            <span>Schedule Quest</span>
          </button>
        </div>

        {/* Telemetry Stats */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mt-6">
          <div className="p-4 rounded-2xl bg-[#FAF9F5] border border-[#E5E5EA]">
            <div className="text-xs font-medium text-[#6E6E73] uppercase">Weekly Quests</div>
            <div className="text-2xl font-bold text-[#1D1D1F] mt-1">
              {completedThisWeek} / {totalThisWeek}
            </div>
            <div className="text-xs font-semibold text-[#7C3AED] mt-1">Scheduled</div>
          </div>

          <div className="p-4 rounded-2xl bg-[#FAF9F5] border border-[#E5E5EA]">
            <div className="text-xs font-medium text-[#6E6E73] uppercase">Completion Rate</div>
            <div className="text-2xl font-bold text-[#2E7D32] mt-1">
              {weeklyCompletionRate}%
            </div>
            <div className="text-xs font-medium text-[#6E6E73] mt-1">Efficiency</div>
          </div>

          <div className="p-4 rounded-2xl bg-[#FAF9F5] border border-[#E5E5EA]">
            <div className="text-xs font-medium text-[#6E6E73] uppercase">Treasury</div>
            <div className="text-2xl font-bold text-[#C9A227] flex items-center gap-1.5 mt-1">
              <Coins className="w-4 h-4 text-[#C9A227]" />
              <AnimatedCounter value={profile.gold} /> Gold
            </div>
            <div className="text-xs font-medium text-[#6E6E73] mt-1">Available</div>
          </div>

          <div className="p-4 rounded-2xl bg-[#FAF9F5] border border-[#E5E5EA]">
            <div className="text-xs font-medium text-[#6E6E73] uppercase">Character Level</div>
            <div className="text-2xl font-bold text-[#7C3AED] mt-1">
              Level {profile.level}
            </div>
            <div className="text-xs font-medium text-[#6E6E73] mt-1">{profile.archetype}</div>
          </div>
        </div>
      </div>

      {/* 2. ROUTINE DEPLOYMENT PRESETS */}
      <div className="apple-card p-6 sm:p-8">
        <div className="pb-4 mb-6 border-b border-[#E5E5EA]">
          <h2 className="text-xl font-bold text-[#1D1D1F]">
            Routine Presets
          </h2>
          <p className="text-xs text-[#6E6E73] mt-1">
            One-click deploy pre-configured weekly routines directly into your active quest calendar.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="p-5 rounded-2xl bg-[#FAF9F5] border border-[#E5E5EA] flex flex-col justify-between hover:border-[#D1D1D6] transition-all">
            <div>
              <div className="w-10 h-10 rounded-xl bg-[#F2F2F7] text-[#7C3AED] flex items-center justify-center font-bold mb-4">
                <Dumbbell className="w-5 h-5" />
              </div>
              <h3 className="text-base font-bold text-[#1D1D1F]">7-Day Workout Routine</h3>
              <p className="text-xs text-[#6E6E73] mt-2 leading-relaxed">
                Upper body strength, lower body workouts, HIIT cardio, and recovery sessions.
              </p>
            </div>
            <button
              onClick={() => handleDeployPreset('gym')}
              className="mt-6 w-full py-2.5 bg-white hover:bg-[#F2F2F7] text-[#1D1D1F] border border-[#E5E5EA] font-semibold text-xs rounded-full transition-all text-center cursor-pointer shadow-sm"
            >
              Deploy Workout Plan
            </button>
          </div>

          <div className="p-5 rounded-2xl bg-[#FAF9F5] border border-[#E5E5EA] flex flex-col justify-between hover:border-[#D1D1D6] transition-all">
            <div>
              <div className="w-10 h-10 rounded-xl bg-[#F2F2F7] text-[#38BDF8] flex items-center justify-center font-bold mb-4">
                <Brain className="w-5 h-5" />
              </div>
              <h3 className="text-base font-bold text-[#1D1D1F]">Code Sprint Protocol</h3>
              <p className="text-xs text-[#6E6E73] mt-2 leading-relaxed">
                Architecture planning, API development, UI styling, and launch readiness.
              </p>
            </div>
            <button
              onClick={() => handleDeployPreset('code')}
              className="mt-6 w-full py-2.5 bg-white hover:bg-[#F2F2F7] text-[#1D1D1F] border border-[#E5E5EA] font-semibold text-xs rounded-full transition-all text-center cursor-pointer shadow-sm"
            >
              Deploy Code Sprint
            </button>
          </div>

          <div className="p-5 rounded-2xl bg-[#FAF9F5] border border-[#E5E5EA] flex flex-col justify-between hover:border-[#D1D1D6] transition-all">
            <div>
              <div className="w-10 h-10 rounded-xl bg-[#F2F2F7] text-[#C9A227] flex items-center justify-center font-bold mb-4">
                <Layers className="w-5 h-5" />
              </div>
              <h3 className="text-base font-bold text-[#1D1D1F]">Habit Mastery Routine</h3>
              <p className="text-xs text-[#6E6E73] mt-2 leading-relaxed">
                Morning reading, mindfulness meditation, and deep work focus sessions.
              </p>
            </div>
            <button
              onClick={() => handleDeployPreset('habit')}
              className="mt-6 w-full py-2.5 bg-white hover:bg-[#F2F2F7] text-[#1D1D1F] border border-[#E5E5EA] font-semibold text-xs rounded-full transition-all text-center cursor-pointer shadow-sm"
            >
              Deploy Habit Routine
            </button>
          </div>
        </div>
      </div>

      {/* 3. CALENDAR MATRIX CONTROLS */}
      <div className="apple-card p-5">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center space-x-3">
            <button
              onClick={() => setCurrentWeekOffset((prev) => prev - 1)}
              className="p-2 rounded-full bg-[#F2F2F7] hover:bg-[#E5E5EA] text-[#1D1D1F] transition-colors cursor-pointer"
              title="Previous Week"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <span className="text-sm font-semibold text-[#1D1D1F]">
              Week of {weekDates[0].toLocaleDateString('en-US', { month: 'short', day: 'numeric' })} – {weekDates[6].toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
            </span>
            <button
              onClick={() => setCurrentWeekOffset((prev) => prev + 1)}
              className="p-2 rounded-full bg-[#F2F2F7] hover:bg-[#E5E5EA] text-[#1D1D1F] transition-colors cursor-pointer"
              title="Next Week"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
            {currentWeekOffset !== 0 && (
              <button
                onClick={() => setCurrentWeekOffset(0)}
                className="px-3.5 py-1.5 text-xs font-semibold rounded-full bg-[#F2F2F7] text-[#7C3AED] hover:bg-[#E5E5EA] transition-colors cursor-pointer"
              >
                Today
              </button>
            )}
          </div>

          <div className="flex items-center space-x-2 bg-[#F2F2F7] p-1 rounded-full border border-[#E5E5EA]">
            <button
              onClick={() => setViewMode('week')}
              className={`px-4 py-1.5 rounded-full text-xs font-semibold transition-all cursor-pointer ${
                viewMode === 'week' ? 'btn-primary-gradient' : 'text-[#6E6E73] hover:text-[#1D1D1F]'
              }`}
            >
              Weekly Matrix
            </button>
            <button
              onClick={() => setViewMode('month')}
              className={`px-4 py-1.5 rounded-full text-xs font-semibold transition-all cursor-pointer ${
                viewMode === 'month' ? 'btn-primary-gradient' : 'text-[#6E6E73] hover:text-[#1D1D1F]'
              }`}
            >
              Month Overview
            </button>
          </div>
        </div>
      </div>

      {/* 4. WEEKLY MATRIX GRID */}
      {viewMode === 'week' ? (
        <div className="grid grid-cols-1 md:grid-cols-7 gap-4">
          {weekDates.map((dateObj) => {
            const dateIso = formatDateIso(dateObj);
            const isToday = dateIso === todayIso;
            const dayName = dateObj.toLocaleDateString('en-US', { weekday: 'short' });
            const dayNum = dateObj.getDate();
            const dayQuests = getQuestsForDate(dateIso);

            return (
              <div
                key={dateIso}
                className={`p-4 rounded-3xl border flex flex-col justify-between min-h-[380px] transition-all apple-card ${
                  isToday
                    ? 'bg-white border-[#7C3AED]/60 shadow-[0_4px_16px_rgba(124,58,237,0.12)]'
                    : 'bg-white border-[#E5E5EA]'
                }`}
              >
                <div>
                  {/* Day Column Header */}
                  <div className="flex items-center justify-between pb-3 mb-3 border-b border-[#E5E5EA]">
                    <div>
                      <div className={`text-xs font-semibold uppercase ${isToday ? 'text-[#7C3AED]' : 'text-[#6E6E73]'}`}>
                        {dayName}
                      </div>
                      <div className="text-xl font-bold text-[#1D1D1F] leading-none mt-0.5">
                        {dayNum}
                      </div>
                    </div>
                    {isToday && (
                      <span className="text-[10px] font-semibold uppercase tracking-wider px-2 py-0.5 btn-primary-gradient rounded-full">
                        TODAY
                      </span>
                    )}
                  </div>

                  {/* Quests Scheduled For This Day */}
                  <div className="space-y-2">
                    {dayQuests.length === 0 ? (
                      <div className="py-8 text-center text-[#8E8E93]">
                        <p className="text-xs italic">No quests</p>
                      </div>
                    ) : (
                      dayQuests.map((q) => {
                        const isCompleted = q.status === 'Completed';
                        return (
                          <div
                            key={q.id}
                            className={`p-2.5 rounded-2xl border transition-all ${
                              isCompleted
                                ? 'bg-[#FAF9F5] border-[#E5E5EA] opacity-60'
                                : 'bg-white border-[#E5E5EA] hover:border-[#D1D1D6]'
                            }`}
                          >
                            <div className="flex items-start justify-between gap-2">
                              <button
                                onClick={() => !isCompleted && completeQuest(q.id)}
                                disabled={isCompleted}
                                className={`w-4 h-4 rounded shrink-0 mt-0.5 border flex items-center justify-center transition-colors cursor-pointer ${
                                  isCompleted
                                    ? 'btn-primary-gradient border-transparent text-white'
                                    : 'border-[#C7C7CC] hover:border-[#7C3AED] text-transparent'
                                }`}
                              >
                                <CheckCircle2 className="w-3.5 h-3.5 stroke-[3]" />
                              </button>
                              <div className="flex-1 min-w-0">
                                <h4
                                  className={`text-xs font-semibold leading-tight truncate ${
                                    isCompleted ? 'line-through text-[#8E8E93]' : 'text-[#1D1D1F]'
                                  }`}
                                >
                                  {q.title}
                                </h4>
                                <div className="flex items-center gap-1.5 mt-1 flex-wrap text-[10px]">
                                  <span className="text-[#7C3AED] font-semibold">
                                    +{q.xp_reward} XP
                                  </span>
                                  <span className="text-[#C9A227] font-semibold">
                                    +{q.gold_reward} G
                                  </span>
                                </div>
                              </div>
                            </div>
                          </div>
                        );
                      })
                    )}
                  </div>
                </div>

                {/* Add Quest Button */}
                <button
                  onClick={() => {
                    setSelectedDateForNewQuest(dateIso);
                    setIsScheduleModalOpen(true);
                  }}
                  className="mt-4 w-full py-2 bg-[#F2F2F7] hover:bg-[#E5E5EA] text-[#1D1D1F] text-xs font-semibold uppercase tracking-wider rounded-xl transition-colors flex items-center justify-center space-x-1 cursor-pointer"
                >
                  <Plus className="w-3.5 h-3.5" />
                  <span>Add Quest</span>
                </button>
              </div>
            );
          })}
        </div>
      ) : (
        /* MONTHLY OVERVIEW */
        <div className="apple-card p-6 sm:p-8">
          <div className="mb-6 pb-3 border-b border-[#E5E5EA] flex justify-between items-center">
            <h3 className="text-lg font-bold text-[#1D1D1F]">
              Monthly Calendar Matrix
            </h3>
            <span className="text-xs text-[#6E6E73]">
              30-Day Tactical Overview
            </span>
          </div>

          <div className="grid grid-cols-7 gap-2 text-center text-xs font-semibold text-[#6E6E73] uppercase mb-3">
            <div>Mon</div>
            <div>Tue</div>
            <div>Wed</div>
            <div>Thu</div>
            <div>Fri</div>
            <div>Sat</div>
            <div>Sun</div>
          </div>

          <div className="grid grid-cols-7 gap-2">
            {Array.from({ length: 28 }).map((_, i) => {
              const d = new Date(weekDates[0]);
              d.setDate(weekDates[0].getDate() + i - 7);
              const dateIso = formatDateIso(d);
              const dayQuests = getQuestsForDate(dateIso);
              const isToday = dateIso === todayIso;

              return (
                <div
                  key={dateIso}
                  onClick={() => {
                    setSelectedDateForNewQuest(dateIso);
                    setIsScheduleModalOpen(true);
                  }}
                  className={`p-3 rounded-2xl border min-h-[90px] cursor-pointer transition-all flex flex-col justify-between ${
                    isToday
                      ? 'bg-[#F2F2F7] border-[#7C3AED]'
                      : 'bg-white border-[#E5E5EA] hover:border-[#D1D1D6]'
                  }`}
                >
                  <div className="flex justify-between items-center">
                    <span className={`text-sm font-bold ${isToday ? 'text-[#7C3AED]' : 'text-[#1D1D1F]'}`}>
                      {d.getDate()}
                    </span>
                    {dayQuests.length > 0 && (
                      <span className="text-[10px] font-bold text-white bg-[#7C3AED] px-1.5 py-0.5 rounded-full">
                        {dayQuests.length}
                      </span>
                    )}
                  </div>

                  {dayQuests.length > 0 && (
                    <div className="text-[10px] font-semibold text-[#7C3AED] truncate mt-1">
                      {dayQuests[0].title}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* 5. SCHEDULE QUEST MODAL */}
      {isScheduleModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/40 backdrop-blur-sm flex items-center justify-center p-4">
          <motion.div
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="w-full max-w-lg bg-white border border-[#E5E5EA] rounded-3xl p-6 sm:p-8 shadow-2xl"
          >
            <div className="flex items-center justify-between pb-4 mb-6 border-b border-[#E5E5EA]">
              <h3 className="text-xl font-bold text-[#1D1D1F] flex items-center gap-2">
                <CalendarDays className="w-5 h-5 text-[#7C3AED]" />
                <span>Schedule Quest</span>
              </h3>
              <button
                onClick={() => setIsScheduleModalOpen(false)}
                className="text-lg font-bold text-[#8E8E93] hover:text-[#1D1D1F] cursor-pointer"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleScheduleCustomQuest} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-[#6E6E73] uppercase mb-1">
                  Target Scheduled Date
                </label>
                <input
                  type="date"
                  value={selectedDateForNewQuest}
                  onChange={(e) => setSelectedDateForNewQuest(e.target.value)}
                  className="w-full px-4 py-2.5 bg-[#FAF9F5] border border-[#E5E5EA] rounded-2xl text-[#1D1D1F] text-xs focus:outline-none focus:border-[#7C3AED]"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#6E6E73] uppercase mb-1">
                  Quest Title
                </label>
                <input
                  type="text"
                  value={newTitle}
                  onChange={(e) => setNewTitle(e.target.value)}
                  required
                  placeholder="e.g. 5K Workout or 2-Hour Deep Coding Block"
                  className="w-full px-4 py-2.5 bg-[#FAF9F5] border border-[#E5E5EA] rounded-2xl text-[#1D1D1F] text-xs focus:outline-none focus:border-[#7C3AED]"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-[#6E6E73] uppercase mb-1">
                    Category
                  </label>
                  <select
                    value={newCategory}
                    onChange={(e) => setNewCategory(e.target.value as QuestCategory)}
                    className="w-full px-4 py-2.5 bg-[#FAF9F5] border border-[#E5E5EA] rounded-2xl text-[#1D1D1F] text-xs focus:outline-none focus:border-[#7C3AED]"
                  >
                    <option value="Work">Work</option>
                    <option value="Fitness">Fitness</option>
                    <option value="Learning">Learning</option>
                    <option value="Habit">Habit</option>
                    <option value="Creative">Creative</option>
                    <option value="Social">Social</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-[#6E6E73] uppercase mb-1">
                    Difficulty Tier
                  </label>
                  <select
                    value={newDifficulty}
                    onChange={(e) => setNewDifficulty(e.target.value as QuestDifficulty)}
                    className="w-full px-4 py-2.5 bg-[#FAF9F5] border border-[#E5E5EA] rounded-2xl text-[#1D1D1F] text-xs focus:outline-none focus:border-[#7C3AED]"
                  >
                    <option value="Easy">Easy (+30 XP)</option>
                    <option value="Medium">Medium (+60 XP)</option>
                    <option value="Hard">Hard (+120 XP)</option>
                    <option value="Epic">Epic (+250 XP)</option>
                    <option value="Legendary">Legendary (+500 XP)</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#6E6E73] uppercase mb-1">
                  Target Attribute Boost
                </label>
                <select
                  value={newAttribute}
                  onChange={(e) => setNewAttribute(e.target.value as AttributeType)}
                  className="w-full px-4 py-2.5 bg-[#FAF9F5] border border-[#E5E5EA] rounded-2xl text-[#1D1D1F] text-xs focus:outline-none focus:border-[#7C3AED]"
                >
                  <option value="Intellect">Intellect</option>
                  <option value="Strength">Strength</option>
                  <option value="Vitality">Vitality</option>
                  <option value="Discipline">Discipline</option>
                  <option value="Creativity">Creativity</option>
                  <option value="Charisma">Charisma</option>
                </select>
              </div>

              <div className="flex items-center justify-end space-x-3 pt-4 border-t border-[#E5E5EA]">
                <button
                  type="button"
                  onClick={() => setIsScheduleModalOpen(false)}
                  className="px-5 py-2.5 rounded-full border border-[#E5E5EA] text-xs font-semibold text-[#6E6E73] hover:text-[#1D1D1F] cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2.5 btn-primary-gradient text-xs font-semibold uppercase tracking-wider rounded-full shadow-md cursor-pointer"
                >
                  Schedule Quest
                </button>
              </div>
            </form>
          </motion.div>
        </div>
      )}
    </div>
  );
}
