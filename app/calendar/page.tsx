'use client';

// ==============================================================================
// ASCEND - TACTICAL QUEST CALENDAR & WEEKLY SCHEDULER MATRIX
// Vibrant Modern RPG HUD Scheduler Layout
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
  Clock,
  ShieldAlert,
} from 'lucide-react';
import { AnimatePresence, motion } from 'framer-motion';

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

  // Helper to format Date to YYYY-MM-DD
  const formatDateIso = (d: Date) => d.toISOString().split('T')[0];

  // Map Quests to Date
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
        { dayOffset: 0, title: 'Upper Body Power & Hypertrophy', category: 'Fitness' as QuestCategory, difficulty: 'Hard' as QuestDifficulty, attribute: 'Strength' as AttributeType },
        { dayOffset: 2, title: 'Lower Body Squats & Core Matrix', category: 'Fitness' as QuestCategory, difficulty: 'Hard' as QuestDifficulty, attribute: 'Vitality' as AttributeType },
        { dayOffset: 4, title: 'HIIT Conditioning & Endurance Run', category: 'Fitness' as QuestCategory, difficulty: 'Medium' as QuestDifficulty, attribute: 'Vitality' as AttributeType },
        { dayOffset: 6, title: 'Active Recovery & Full-Body Mobility', category: 'Fitness' as QuestCategory, difficulty: 'Easy' as QuestDifficulty, attribute: 'Discipline' as AttributeType },
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
        { dayOffset: 0, title: 'System Architecture & Schema Refactor', category: 'Work' as QuestCategory, difficulty: 'Hard' as QuestDifficulty, attribute: 'Intellect' as AttributeType },
        { dayOffset: 1, title: 'Server-Authoritative Endpoint Hardening', category: 'Work' as QuestCategory, difficulty: 'Epic' as QuestDifficulty, attribute: 'Intellect' as AttributeType },
        { dayOffset: 3, title: 'UI Glassmorphism & Neon Polish Pass', category: 'Work' as QuestCategory, difficulty: 'Medium' as QuestDifficulty, attribute: 'Creativity' as AttributeType },
        { dayOffset: 5, title: 'CI/CD Pipeline Audit & Deployment', category: 'Work' as QuestCategory, difficulty: 'Hard' as QuestDifficulty, attribute: 'Discipline' as AttributeType },
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
        { dayOffset: 0, title: '20-Min Morning Meditation & Cold Shower', category: 'Habit' as QuestCategory, difficulty: 'Easy' as QuestDifficulty, attribute: 'Discipline' as AttributeType },
        { dayOffset: 1, title: 'Read 30 Pages of Technical Literature', category: 'Learning' as QuestCategory, difficulty: 'Medium' as QuestDifficulty, attribute: 'Intellect' as AttributeType },
        { dayOffset: 3, title: '90-Min Zero-Distraction Focus Sprint', category: 'Work' as QuestCategory, difficulty: 'Hard' as QuestDifficulty, attribute: 'Discipline' as AttributeType },
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
    <div className="space-y-10 pb-16 pt-6">
      {/* 1. TOP HERO HUD */}
      <div className="rounded-3xl bg-[#0D111A]/90 border border-indigo-500/30 p-6 sm:p-8 shadow-[0_0_35px_rgba(99,102,241,0.15)]">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6 pb-6 border-b border-white/10">
          <div className="flex items-center space-x-5 text-center md:text-left">
            <div className="w-14 h-14 bg-indigo-950/80 border border-indigo-500/40 rounded-2xl flex items-center justify-center text-indigo-400 shrink-0 shadow-[0_0_20px_rgba(99,102,241,0.3)]">
              <CalendarDays className="w-7 h-7" />
            </div>
            <div>
              <div className="flex items-center justify-center md:justify-start space-x-2 text-xs font-mono font-bold uppercase tracking-wider text-indigo-400">
                <Target className="w-3.5 h-3.5" />
                <span>Tactical Planning & Schedule Matrix</span>
              </div>
              <h1 className="text-3xl md:text-4xl font-extrabold text-white uppercase tracking-tight font-sans mt-1">
                Quest Calendar
              </h1>
              <p className="text-xs sm:text-sm font-sans text-slate-400 mt-1 max-w-xl">
                Schedule workouts, coding sprints, learning milestones, and habit routines into server-authoritative calendar slots.
              </p>
            </div>
          </div>

          <button
            onClick={() => {
              setSelectedDateForNewQuest(todayIso);
              setIsScheduleModalOpen(true);
            }}
            className="px-6 py-3 bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-400 hover:to-purple-500 text-white font-mono font-bold text-xs uppercase tracking-wider rounded-xl shadow-[0_0_20px_rgba(99,102,241,0.3)] transition-all flex items-center space-x-2 shrink-0 cursor-pointer"
          >
            <Plus className="w-4 h-4 stroke-[3]" />
            <span>Schedule Quest</span>
          </button>
        </div>

        {/* Telemetry Stats */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mt-6">
          <div className="p-4 rounded-2xl bg-slate-950/80 border border-white/5">
            <div className="text-[10px] font-mono text-slate-400 uppercase tracking-wider mb-1">Weekly Bounties</div>
            <div className="font-mono text-2xl font-bold text-slate-100">
              {completedThisWeek} / {totalThisWeek}
            </div>
            <div className="text-[10px] font-mono text-indigo-400 uppercase mt-1">Scheduled in matrix</div>
          </div>

          <div className="p-4 rounded-2xl bg-slate-950/80 border border-white/5">
            <div className="text-[10px] font-mono text-slate-400 uppercase tracking-wider mb-1">Discipline Rate</div>
            <div className="font-mono text-2xl font-bold text-emerald-400">
              {weeklyCompletionRate}%
            </div>
            <div className="text-[10px] font-mono text-slate-400 uppercase mt-1">Completion efficiency</div>
          </div>

          <div className="p-4 rounded-2xl bg-slate-950/80 border border-white/5">
            <div className="text-[10px] font-mono text-slate-400 uppercase tracking-wider mb-1">Treasury Balance</div>
            <div className="font-mono text-2xl font-bold text-amber-400 flex items-center gap-1.5">
              <Coins className="w-4 h-4 text-amber-400" />
              <AnimatedCounter value={profile.gold} /> G
            </div>
            <div className="text-[10px] font-mono text-slate-400 uppercase mt-1">Ready to claim</div>
          </div>

          <div className="p-4 rounded-2xl bg-slate-950/80 border border-white/5">
            <div className="text-[10px] font-mono text-slate-400 uppercase tracking-wider mb-1">Hero Level</div>
            <div className="font-mono text-2xl font-bold text-indigo-400">
              LVL {profile.level}
            </div>
            <div className="text-[10px] font-mono text-slate-400 uppercase mt-1">{profile.archetype}</div>
          </div>
        </div>
      </div>

      {/* 2. ROUTINE DEPLOYMENT PRESETS */}
      <div className="rounded-3xl bg-[#0D111A]/90 border border-white/10 p-6 sm:p-8 shadow-[0_0_30px_rgba(0,0,0,0.3)]">
        <div className="pb-4 mb-6 border-b border-white/10">
          <h2 className="text-xl font-extrabold text-white uppercase font-sans">
            Instant Campaign & Routine Deployment
          </h2>
          <p className="text-xs font-mono text-slate-400 mt-1">
            One-click deploy pre-configured weekly routines directly into your active quest matrix.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="p-5 rounded-2xl bg-slate-950/80 border border-white/5 hover:border-cyan-500/40 transition-all flex flex-col justify-between group">
            <div>
              <div className="w-10 h-10 rounded-xl bg-cyan-950 border border-cyan-500/40 text-cyan-400 flex items-center justify-center font-bold mb-4">
                <Dumbbell className="w-5 h-5" />
              </div>
              <h3 className="text-base font-bold text-slate-100 uppercase font-sans">7-Day Gym Routine</h3>
              <p className="text-xs font-sans text-slate-400 mt-2 leading-relaxed">
                Upper body power, lower body squats, HIIT conditioning, and mobility recovery.
              </p>
            </div>
            <button
              onClick={() => handleDeployPreset('gym')}
              className="mt-6 w-full py-2.5 bg-cyan-950/60 hover:bg-cyan-500 hover:text-slate-950 text-cyan-400 font-mono text-xs font-bold uppercase tracking-wider rounded-xl border border-cyan-500/40 transition-all text-center cursor-pointer"
            >
              Deploy Gym Plan
            </button>
          </div>

          <div className="p-5 rounded-2xl bg-slate-950/80 border border-white/5 hover:border-amber-500/40 transition-all flex flex-col justify-between group">
            <div>
              <div className="w-10 h-10 rounded-xl bg-amber-950 border border-amber-500/40 text-amber-400 flex items-center justify-center font-bold mb-4">
                <Brain className="w-5 h-5" />
              </div>
              <h3 className="text-base font-bold text-slate-100 uppercase font-sans">Code Sprint Protocol</h3>
              <p className="text-xs font-sans text-slate-400 mt-2 leading-relaxed">
                System architecture, endpoint hardening, UI refactoring, and production deployment.
              </p>
            </div>
            <button
              onClick={() => handleDeployPreset('code')}
              className="mt-6 w-full py-2.5 bg-amber-950/60 hover:bg-amber-400 hover:text-slate-950 text-amber-400 font-mono text-xs font-bold uppercase tracking-wider rounded-xl border border-amber-500/40 transition-all text-center cursor-pointer"
            >
              Deploy Code Sprint
            </button>
          </div>

          <div className="p-5 rounded-2xl bg-slate-950/80 border border-white/5 hover:border-purple-500/40 transition-all flex flex-col justify-between group">
            <div>
              <div className="w-10 h-10 rounded-xl bg-purple-950 border border-purple-500/40 text-purple-400 flex items-center justify-center font-bold mb-4">
                <Layers className="w-5 h-5" />
              </div>
              <h3 className="text-base font-bold text-slate-100 uppercase font-sans">Habit Mastery Routine</h3>
              <p className="text-xs font-sans text-slate-400 mt-2 leading-relaxed">
                Mindfulness meditation, technical reading, cold showers, and zero-distraction focus blocks.
              </p>
            </div>
            <button
              onClick={() => handleDeployPreset('habit')}
              className="mt-6 w-full py-2.5 bg-purple-950/60 hover:bg-purple-500 hover:text-white text-purple-300 font-mono text-xs font-bold uppercase tracking-wider rounded-xl border border-purple-500/40 transition-all text-center cursor-pointer"
            >
              Deploy Habit Routine
            </button>
          </div>
        </div>
      </div>

      {/* 3. CALENDAR MATRIX CONTROLS */}
      <div className="rounded-3xl bg-[#0D111A]/90 border border-white/10 p-5 shadow-[0_0_20px_rgba(0,0,0,0.3)]">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center space-x-3">
            <button
              onClick={() => setCurrentWeekOffset((prev) => prev - 1)}
              className="p-2 rounded-xl bg-slate-900 border border-white/10 hover:border-indigo-400 text-slate-300 transition-colors cursor-pointer"
              title="Previous Week"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <span className="font-mono text-sm font-bold text-slate-100 uppercase">
              Week of {weekDates[0].toLocaleDateString('en-US', { month: 'short', day: 'numeric' })} – {weekDates[6].toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
            </span>
            <button
              onClick={() => setCurrentWeekOffset((prev) => prev + 1)}
              className="p-2 rounded-xl bg-slate-900 border border-white/10 hover:border-indigo-400 text-slate-300 transition-colors cursor-pointer"
              title="Next Week"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
            {currentWeekOffset !== 0 && (
              <button
                onClick={() => setCurrentWeekOffset(0)}
                className="px-3.5 py-1.5 text-xs font-mono font-bold uppercase tracking-wider rounded-xl bg-indigo-950 border border-indigo-500/40 text-indigo-300 cursor-pointer"
              >
                Today
              </button>
            )}
          </div>

          <div className="flex items-center space-x-2 bg-slate-950 p-1.5 rounded-2xl border border-white/10">
            <button
              onClick={() => setViewMode('week')}
              className={`px-4 py-1.5 rounded-xl text-xs font-mono font-bold uppercase tracking-wider transition-all cursor-pointer ${
                viewMode === 'week' ? 'bg-indigo-500 text-white' : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              Weekly Matrix
            </button>
            <button
              onClick={() => setViewMode('month')}
              className={`px-4 py-1.5 rounded-xl text-xs font-mono font-bold uppercase tracking-wider transition-all cursor-pointer ${
                viewMode === 'month' ? 'bg-indigo-500 text-white' : 'text-slate-400 hover:text-slate-200'
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
                className={`p-4 rounded-3xl border flex flex-col justify-between min-h-[380px] transition-all ${
                  isToday
                    ? 'bg-[#0D111A] border-indigo-500/80 shadow-[0_0_25px_rgba(99,102,241,0.2)]'
                    : 'bg-[#0D111A]/70 border-white/5 hover:border-white/15'
                }`}
              >
                <div>
                  {/* Day Column Header */}
                  <div className="flex items-center justify-between pb-3 mb-3 border-b border-white/10">
                    <div>
                      <div className={`font-mono text-xs font-bold uppercase tracking-wider ${isToday ? 'text-indigo-400' : 'text-slate-400'}`}>
                        {dayName}
                      </div>
                      <div className="font-mono text-xl font-extrabold text-white leading-none mt-0.5">
                        {dayNum}
                      </div>
                    </div>
                    {isToday && (
                      <span className="text-[9px] font-mono font-bold uppercase tracking-wider px-2 py-0.5 bg-indigo-500 text-white rounded-full">
                        TODAY
                      </span>
                    )}
                  </div>

                  {/* Quests Scheduled For This Day */}
                  <div className="space-y-2">
                    {dayQuests.length === 0 ? (
                      <div className="py-8 text-center text-slate-500">
                        <p className="text-xs font-mono italic">No bounties</p>
                      </div>
                    ) : (
                      dayQuests.map((q) => {
                        const isCompleted = q.status === 'Completed';
                        return (
                          <div
                            key={q.id}
                            className={`p-2.5 rounded-xl border transition-all ${
                              isCompleted
                                ? 'bg-slate-950/80 border-white/5 opacity-60'
                                : 'bg-slate-900/90 border-white/5 hover:border-indigo-500/40'
                            }`}
                          >
                            <div className="flex items-start justify-between gap-2">
                              <button
                                onClick={() => !isCompleted && completeQuest(q.id)}
                                disabled={isCompleted}
                                className={`w-4 h-4 rounded shrink-0 mt-0.5 border flex items-center justify-center transition-colors cursor-pointer ${
                                  isCompleted
                                    ? 'bg-indigo-500 border-indigo-400 text-white'
                                    : 'border-slate-700 hover:border-indigo-400 text-transparent'
                                }`}
                              >
                                <CheckCircle2 className="w-3.5 h-3.5 stroke-[3]" />
                              </button>
                              <div className="flex-1 min-w-0">
                                <h4
                                  className={`text-xs font-sans font-bold leading-tight truncate ${
                                    isCompleted ? 'line-through text-slate-500' : 'text-slate-100'
                                  }`}
                                >
                                  {q.title}
                                </h4>
                                <div className="flex items-center gap-1.5 mt-1 flex-wrap font-mono text-[9px]">
                                  <span className="text-indigo-400 font-bold">
                                    +{q.xp_reward} XP
                                  </span>
                                  <span className="text-amber-400 font-bold">
                                    +{q.gold_reward}G
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

                {/* Add Quest to Specific Day */}
                <button
                  onClick={() => {
                    setSelectedDateForNewQuest(dateIso);
                    setIsScheduleModalOpen(true);
                  }}
                  className="mt-4 w-full py-2 bg-slate-900 hover:bg-slate-800 text-slate-300 hover:text-indigo-400 font-mono text-xs font-bold uppercase rounded-xl border border-white/5 hover:border-indigo-500/40 transition-colors flex items-center justify-center space-x-1 cursor-pointer"
                >
                  <Plus className="w-3.5 h-3.5" />
                  <span>Add Bounty</span>
                </button>
              </div>
            );
          })}
        </div>
      ) : (
        /* MONTHLY MATRIX OVERVIEW */
        <div className="rounded-3xl bg-[#0D111A]/90 border border-white/10 p-6 sm:p-8 shadow-[0_0_30px_rgba(0,0,0,0.3)]">
          <div className="mb-6 pb-3 border-b border-white/10 flex justify-between items-center">
            <h3 className="text-lg font-extrabold text-white uppercase font-sans">
              Monthly Calendar Matrix
            </h3>
            <span className="text-xs font-mono text-slate-400 uppercase">
              30-Day Tactical Overview
            </span>
          </div>

          <div className="grid grid-cols-7 gap-2 text-center font-mono text-xs font-bold uppercase text-slate-400 mb-3">
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
                      ? 'bg-indigo-950/50 border-indigo-500'
                      : 'bg-slate-900/60 border-white/5 hover:border-white/20'
                  }`}
                >
                  <div className="flex justify-between items-center">
                    <span className={`font-mono text-sm font-bold ${isToday ? 'text-indigo-400' : 'text-slate-200'}`}>
                      {d.getDate()}
                    </span>
                    {dayQuests.length > 0 && (
                      <span className="text-[10px] font-mono font-bold text-white bg-indigo-500 px-1.5 py-0.5 rounded-full">
                        {dayQuests.length}
                      </span>
                    )}
                  </div>

                  {dayQuests.length > 0 && (
                    <div className="text-[9px] font-sans text-indigo-300 uppercase truncate mt-1">
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
        <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-md flex items-center justify-center p-4">
          <motion.div
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="w-full max-w-lg bg-[#0D111A] border border-indigo-500/40 rounded-3xl p-6 sm:p-8 shadow-[0_0_50px_rgba(99,102,241,0.3)]"
          >
            <div className="flex items-center justify-between pb-4 mb-6 border-b border-white/10">
              <h3 className="text-xl font-extrabold text-white uppercase font-sans flex items-center gap-2">
                <CalendarDays className="w-5 h-5 text-indigo-400" />
                <span>Schedule Quest Bounty</span>
              </h3>
              <button
                onClick={() => setIsScheduleModalOpen(false)}
                className="font-mono text-lg font-bold text-slate-400 hover:text-indigo-400 cursor-pointer"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleScheduleCustomQuest} className="space-y-4">
              <div>
                <label className="block text-xs font-mono text-slate-400 uppercase mb-1">
                  Target Scheduled Date
                </label>
                <input
                  type="date"
                  value={selectedDateForNewQuest}
                  onChange={(e) => setSelectedDateForNewQuest(e.target.value)}
                  className="w-full px-4 py-2.5 bg-slate-900 border border-white/10 rounded-2xl text-slate-100 font-mono text-xs focus:outline-none focus:border-indigo-500/50"
                />
              </div>

              <div>
                <label className="block text-xs font-mono text-slate-400 uppercase mb-1">
                  Quest Bounty Title
                </label>
                <input
                  type="text"
                  value={newTitle}
                  onChange={(e) => setNewTitle(e.target.value)}
                  required
                  placeholder="e.g. 5K Cardio Run or 2-Hour Deep Code Block"
                  className="w-full px-4 py-2.5 bg-slate-900 border border-white/10 rounded-2xl text-slate-100 font-sans text-xs focus:outline-none focus:border-indigo-500/50"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-mono text-slate-400 uppercase mb-1">
                    Domain Category
                  </label>
                  <select
                    value={newCategory}
                    onChange={(e) => setNewCategory(e.target.value as QuestCategory)}
                    className="w-full px-4 py-2.5 bg-slate-900 border border-white/10 rounded-2xl text-slate-100 font-mono text-xs focus:outline-none focus:border-indigo-500/50"
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
                  <label className="block text-xs font-mono text-slate-400 uppercase mb-1">
                    Difficulty Tier
                  </label>
                  <select
                    value={newDifficulty}
                    onChange={(e) => setNewDifficulty(e.target.value as QuestDifficulty)}
                    className="w-full px-4 py-2.5 bg-slate-900 border border-white/10 rounded-2xl text-slate-100 font-mono text-xs focus:outline-none focus:border-indigo-500/50"
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
                <label className="block text-xs font-mono text-slate-400 uppercase mb-1">
                  Target Attribute Boost
                </label>
                <select
                  value={newAttribute}
                  onChange={(e) => setNewAttribute(e.target.value as AttributeType)}
                  className="w-full px-4 py-2.5 bg-slate-900 border border-white/10 rounded-2xl text-slate-100 font-mono text-xs focus:outline-none focus:border-indigo-500/50"
                >
                  <option value="Intellect">Intellect</option>
                  <option value="Strength">Strength</option>
                  <option value="Vitality">Vitality</option>
                  <option value="Discipline">Discipline</option>
                  <option value="Creativity">Creativity</option>
                  <option value="Charisma">Charisma</option>
                </select>
              </div>

              <div className="flex items-center justify-end space-x-3 pt-4 border-t border-white/10">
                <button
                  type="button"
                  onClick={() => setIsScheduleModalOpen(false)}
                  className="px-5 py-2.5 rounded-xl border border-white/10 font-mono text-xs font-bold uppercase text-slate-400 hover:text-slate-200 cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2.5 bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-400 hover:to-purple-500 text-white font-mono font-bold text-xs uppercase tracking-wider rounded-xl shadow-[0_0_20px_rgba(99,102,241,0.3)] transition-all cursor-pointer"
                >
                  Schedule Bounty
                </button>
              </div>
            </form>
          </motion.div>
        </div>
      )}
    </div>
  );
}
