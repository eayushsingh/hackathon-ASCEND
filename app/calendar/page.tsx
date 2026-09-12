'use client';

// ==============================================================================
// ASCEND - TACTICAL QUEST CALENDAR & WEEKLY SCHEDULER MATRIX
// Production-Grade Neo-Brutalist Editorial Design
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
      // If no due date, map recurring daily quests or fallback to created_at date
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
        { dayOffset: 0, title: 'System Architecture & Database Schema Design', category: 'Work' as QuestCategory, difficulty: 'Epic' as QuestDifficulty, attribute: 'Intellect' as AttributeType },
        { dayOffset: 1, title: 'API Endpoint Hardening & Unit Tests', category: 'Work' as QuestCategory, difficulty: 'Hard' as QuestDifficulty, attribute: 'Intellect' as AttributeType },
        { dayOffset: 3, title: 'UI Component Polish & Accessibility Audit', category: 'Creative' as QuestCategory, difficulty: 'Medium' as QuestDifficulty, attribute: 'Creativity' as AttributeType },
        { dayOffset: 5, title: 'Production Deployment & Performance Profiling', category: 'Work' as QuestCategory, difficulty: 'Legendary' as QuestDifficulty, attribute: 'Discipline' as AttributeType },
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
        { dayOffset: 0, title: '20-Minute Deep Mindfulness Meditation', category: 'Habit' as QuestCategory, difficulty: 'Easy' as QuestDifficulty, attribute: 'Discipline' as AttributeType },
        { dayOffset: 1, title: 'Read 30 Pages of Technical Literature', category: 'Learning' as QuestCategory, difficulty: 'Medium' as QuestDifficulty, attribute: 'Intellect' as AttributeType },
        { dayOffset: 2, title: 'Cold Shower & Morning Sunlight Routine', category: 'Habit' as QuestCategory, difficulty: 'Easy' as QuestDifficulty, attribute: 'Vitality' as AttributeType },
        { dayOffset: 3, title: 'Zero Distraction 90-Minute Focus Block', category: 'Work' as QuestCategory, difficulty: 'Hard' as QuestDifficulty, attribute: 'Discipline' as AttributeType },
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
          is_recurring: false,
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
    <div className="space-y-12 pb-16 pt-8">
      {/* 1. TOP HERO HUD */}
      <div className="p-8 bg-white border-4 border-[#141110] shadow-[8px_8px_0_0_#141110]">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6 pb-6 border-b-2 border-[#141110]/12">
          <div className="flex items-center space-x-6 text-center md:text-left">
            <div className="w-16 h-16 bg-[#E8552A] border-4 border-[#141110] flex items-center justify-center text-white shrink-0 shadow-[4px_4px_0_0_#141110]">
              <CalendarDays className="w-8 h-8" />
            </div>
            <div>
              <div className="flex items-center justify-center md:justify-start space-x-2 text-[10px] font-sans font-bold uppercase tracking-widest text-[#E8552A]">
                <Target className="w-3.5 h-3.5" />
                <span>Tactical Planning & Schedule Matrix</span>
              </div>
              <h1 className="font-display text-3xl md:text-4xl font-black text-[#141110] uppercase tracking-widest mt-1">
                Quest Calendar
              </h1>
              <p className="text-sm font-sans font-medium text-[#6B6560] mt-2 max-w-xl">
                Schedule workouts, coding sprints, learning milestones, and habit routines into server-authoritative calendar slots.
              </p>
            </div>
          </div>

          <button
            onClick={() => {
              setSelectedDateForNewQuest(todayIso);
              setIsScheduleModalOpen(true);
            }}
            className="px-6 py-3 bg-[#E8552A] border-2 border-[#141110] hover:bg-[#D0441B] text-white font-display text-sm font-bold uppercase tracking-widest transition-all flex items-center space-x-2 shrink-0 shadow-[4px_4px_0_0_#141110]"
          >
            <Plus className="w-5 h-5 stroke-[3]" />
            <span>Schedule Quest</span>
          </button>
        </div>

        {/* Weekly Progress Bar & Telemetry Stats */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 mt-8">
          <div className="p-6 bg-[#F5F3EE] border-2 border-[#141110] shadow-[4px_4px_0_0_#141110]">
            <div className="text-[10px] font-sans font-bold text-[#6B6560] uppercase tracking-widest mb-1">Weekly Bounties</div>
            <div className="font-display text-3xl font-black text-[#141110]">
              {completedThisWeek} / {totalThisWeek}
            </div>
            <div className="text-[10px] font-sans font-bold text-[#E8552A] uppercase tracking-widest mt-2">Scheduled in matrix</div>
          </div>

          <div className="p-6 bg-[#F5F3EE] border-2 border-[#141110] shadow-[4px_4px_0_0_#141110]">
            <div className="text-[10px] font-sans font-bold text-[#6B6560] uppercase tracking-widest mb-1">Discipline Rate</div>
            <div className="font-display text-3xl font-black text-[#2F7A4D]">
              {weeklyCompletionRate}%
            </div>
            <div className="text-[10px] font-sans font-bold text-[#6B6560] uppercase tracking-widest mt-2">Completion efficiency</div>
          </div>

          <div className="p-6 bg-[#F5F3EE] border-2 border-[#141110] shadow-[4px_4px_0_0_#141110]">
            <div className="text-[10px] font-sans font-bold text-[#6B665C] uppercase tracking-widest mb-1">Treasury Balance</div>
            <div className="font-display text-3xl font-black text-[#C9A227] flex items-center gap-1.5">
              <Coins className="w-5 h-5" />
              <AnimatedCounter value={profile.gold} /> G
            </div>
            <div className="text-[10px] font-sans font-bold text-[#6B6560] uppercase tracking-widest mt-2">Ready to claim</div>
          </div>

          <div className="p-6 bg-[#F5F3EE] border-2 border-[#141110] shadow-[4px_4px_0_0_#141110]">
            <div className="text-[10px] font-sans font-bold text-[#6B665C] uppercase tracking-widest mb-1">Hero Level</div>
            <div className="font-display text-3xl font-black text-[#E8552A]">
              LVL {profile.level}
            </div>
            <div className="text-[10px] font-sans font-bold text-[#6B6560] uppercase tracking-widest mt-2">{profile.archetype}</div>
          </div>
        </div>
      </div>

      {/* 2. ROUTINE DEPLOYMENT PRESETS */}
      <div className="p-8 bg-white border-4 border-[#141110] shadow-[8px_8px_0_0_#141110]">
        <div className="flex items-center justify-between pb-4 mb-6 border-b-2 border-[#141110]/12">
          <div>
            <h2 className="font-display text-xl font-black text-[#141110] uppercase tracking-widest">
              Instant Campaign & Routine Deployment
            </h2>
            <p className="text-xs font-sans font-medium text-[#6B6560] mt-1">
              One-click deploy pre-configured weekly routines directly into your active quest matrix.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="p-6 border-2 border-[#141110] bg-[#FAF9F5] hover:bg-white transition-colors flex flex-col justify-between shadow-[4px_4px_0_0_#141110]">
            <div>
              <div className="w-10 h-10 bg-[#141110] text-white flex items-center justify-center font-bold mb-4 shadow-[2px_2px_0_0_#E8552A]">
                <Dumbbell className="w-5 h-5 text-[#E8552A]" />
              </div>
              <h3 className="font-display text-lg font-black text-[#141110] uppercase tracking-widest">7-Day Gym & Vitality Routine</h3>
              <p className="text-xs font-sans font-medium text-[#6B6560] mt-2 leading-relaxed">
                Upper body power, lower body squats, HIIT conditioning, and mobility recovery spread across the week.
              </p>
            </div>
            <button
              onClick={() => handleDeployPreset('gym')}
              className="mt-6 px-4 py-2 bg.white border-2 border-[#141110] text-[#141110] hover:bg-[#E8552A] hover:text-white font-display text-xs font-bold uppercase tracking-widest transition-colors text-center shadow-[2px_2px_0_0_#141110]"
            >
              Deploy Gym Plan
            </button>
          </div>

          <div className="p-6 border-2 border-[#141110] bg-[#FAF9F5] hover:bg-white transition-colors flex flex-col justify-between shadow-[4px_4px_0_0_#141110]">
            <div>
              <div className="w-10 h-10 bg-[#141110] text-white flex items-center justify-center font-bold mb-4 shadow-[2px_2px_0_0_#C9A227]">
                <Brain className="w-5 h-5 text-[#C9A227]" />
              </div>
              <h3 className="font-display text-lg font-black text-[#141110] uppercase tracking-widest">Full-Stack Code Sprint</h3>
              <p className="text-xs font-sans font-medium text-[#6B6560] mt-2 leading-relaxed">
                System architecture, endpoint hardening, UI refactoring, and production deployment targets.
              </p>
            </div>
            <button
              onClick={() => handleDeployPreset('code')}
              className="mt-6 px-4 py-2 bg-white border-2 border-[#141110] text-[#141110] hover:bg-[#E8552A] hover:text-white font-display text-xs font-bold uppercase tracking-widest transition-colors text-center shadow-[2px_2px_0_0_#141110]"
            >
              Deploy Code Sprint
            </button>
          </div>

          <div className="p-6 border-2 border-[#141110] bg-[#FAF9F5] hover:bg-white transition-colors flex flex-col justify-between shadow-[4px_4px_0_0_#141110]">
            <div>
              <div className="w-10 h-10 bg-[#141110] text-white flex items-center justify-center font-bold mb-4 shadow-[2px_2px_0_0_#2F7A4D]">
                <Layers className="w-5 h-5 text-[#2F7A4D]" />
              </div>
              <h3 className="font-display text-lg font-black text-[#141110] uppercase tracking-widest">Habit Mastery Protocol</h3>
              <p className="text-xs font-sans font-medium text-[#6B6560] mt-2 leading-relaxed">
                Mindfulness meditation, technical reading, cold showers, and 90-minute zero-distraction focus blocks.
              </p>
            </div>
            <button
              onClick={() => handleDeployPreset('habit')}
              className="mt-6 px-4 py-2 bg-white border-2 border-[#141110] text-[#141110] hover:bg-[#E8552A] hover:text-white font-display text-xs font-bold uppercase tracking-widest transition-colors text-center shadow-[2px_2px_0_0_#141110]"
            >
              Deploy Habit Routine
            </button>
          </div>
        </div>
      </div>

      {/* 3. CALENDAR MATRIX CONTROLS & NAVIGATOR */}
      <div className="p-6 bg-white border-4 border-[#141110] shadow-[8px_8px_0_0_#141110]">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center space-x-4">
            <button
              onClick={() => setCurrentWeekOffset((prev) => prev - 1)}
              className="p-2 border-2 border-[#141110] hover:bg-[#E8552A] hover:text-white transition-colors shadow-[2px_2px_0_0_#141110]"
              title="Previous Week"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <span className="font-display text-lg font-bold text-[#141110] uppercase tracking-widest">
              Week of {weekDates[0].toLocaleDateString('en-US', { month: 'short', day: 'numeric' })} – {weekDates[6].toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
            </span>
            <button
              onClick={() => setCurrentWeekOffset((prev) => prev + 1)}
              className="p-2 border-2 border-[#141110] hover:bg-[#E8552A] hover:text-white transition-colors shadow-[2px_2px_0_0_#141110]"
              title="Next Week"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
            {currentWeekOffset !== 0 && (
              <button
                onClick={() => setCurrentWeekOffset(0)}
                className="px-3 py-1.5 text-xs font-display font-bold uppercase tracking-widest border-2 border-[#141110] bg-[#F5F3EE] hover:bg-[#141110] hover:text-white transition-colors"
              >
                Today
              </button>
            )}
          </div>

          <div className="flex items-center space-x-2 bg-[#F5F3EE] p-1 border-2 border-[#141110] shadow-[2px_2px_0_0_#141110]">
            <button
              onClick={() => setViewMode('week')}
              className={`px-4 py-2 text-xs font-display font-bold uppercase tracking-widest transition-all ${
                viewMode === 'week' ? 'bg-[#141110] text-white' : 'text-[#6B6560] hover:text-[#141110]'
              }`}
            >
              Weekly Matrix
            </button>
            <button
              onClick={() => setViewMode('month')}
              className={`px-4 py-2 text-xs font-display font-bold uppercase tracking-widest transition-all ${
                viewMode === 'month' ? 'bg-[#141110] text-white' : 'text-[#6B6560] hover:text-[#141110]'
              }`}
            >
              Month Overview
            </button>
          </div>
        </div>
      </div>

      {/* 4. WEEKLY MATRIX GRID (7 DAY COLUMNS) */}
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
                className={`p-4 border-4 flex flex-col justify-between min-h-[380px] transition-all ${
                  isToday
                    ? 'bg-white border-[#E8552A] shadow-[6px_6px_0_0_#E8552A]'
                    : 'bg-white border-[#141110] shadow-[6px_6px_0_0_rgba(20,17,16,0.08)] hover:shadow-[6px_6px_0_0_#141110]'
                }`}
              >
                <div>
                  {/* Day Column Header */}
                  <div className="flex items-center justify-between pb-3 mb-3 border-b-2 border-[#141110]/12">
                    <div>
                      <div className={`font-display text-xs font-bold uppercase tracking-widest ${isToday ? 'text-[#E8552A]' : 'text-[#6B6560]'}`}>
                        {dayName}
                      </div>
                      <div className="font-display text-2xl font-black text-[#141110] leading-none mt-0.5">
                        {dayNum}
                      </div>
                    </div>
                    {isToday && (
                      <span className="text-[9px] font-sans font-bold uppercase tracking-widest px-2 py-0.5 bg-[#E8552A] text-white border border-[#141110]">
                        TODAY
                      </span>
                    )}
                  </div>

                  {/* Quests Scheduled For This Day */}
                  <div className="space-y-3">
                    {dayQuests.length === 0 ? (
                      <div className="py-8 text-center text-[#6B6560]">
                        <p className="text-xs font-sans italic">No bounties</p>
                      </div>
                    ) : (
                      dayQuests.map((q) => {
                        const isCompleted = q.status === 'Completed';
                        return (
                          <div
                            key={q.id}
                            className={`p-3 border-2 transition-all ${
                              isCompleted
                                ? 'bg-[#F5F3EE] border-[#141110]/30 opacity-75'
                                : 'bg-white border-[#141110] hover:border-[#E8552A]'
                            }`}
                          >
                            <div className="flex items-start justify-between gap-2">
                              <button
                                onClick={() => !isCompleted && completeQuest(q.id)}
                                disabled={isCompleted}
                                className={`w-5 h-5 shrink-0 mt-0.5 border-2 flex items-center justify-center transition-colors ${
                                  isCompleted
                                    ? 'bg-[#141110] border-[#141110] text-white'
                                    : 'border-[#141110] hover:border-[#E8552A] text-transparent'
                                }`}
                              >
                                <CheckCircle2 className="w-4 h-4 stroke-[3]" />
                              </button>
                              <div className="flex-1 min-w-0">
                                <h4
                                  className={`text-xs font-sans font-bold leading-tight truncate ${
                                    isCompleted ? 'line-through text-[#6B6560]' : 'text-[#141110]'
                                  }`}
                                >
                                  {q.title}
                                </h4>
                                <div className="flex items-center gap-1.5 mt-1.5 flex-wrap">
                                  <span className="text-[9px] font-sans font-bold text-[#E8552A] uppercase tracking-wider">
                                    +{q.xp_reward} {q.attribute.slice(0, 3)} XP
                                  </span>
                                  <span className="text-[9px] font-sans font-bold text-[#C9A227] uppercase tracking-wider">
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
                  className="mt-4 w-full py-2 bg-[#F5F3EE] hover:bg-[#141110] hover:text-white text-[#141110] font-sans text-xs font-bold uppercase tracking-wider border-2 border-[#141110] transition-colors flex items-center justify-center space-x-1"
                >
                  <Plus className="w-3.5 h-3.5" />
                  <span>Add Bounties</span>
                </button>
              </div>
            );
          })}
        </div>
      ) : (
        /* MONTHLY MATRIX OVERVIEW */
        <div className="p-8 bg-white border-4 border-[#141110] shadow-[8px_8px_0_0_#141110]">
          <div className="mb-6 pb-3 border-b-2 border-[#141110]/12 flex justify-between items-center">
            <h3 className="font-display text-xl font-black text-[#141110] uppercase tracking-widest">
              Monthly Calendar Matrix
            </h3>
            <span className="text-xs font-sans font-bold text-[#6B6560] uppercase tracking-widest">
              30-Day Tactical Overview
            </span>
          </div>

          <div className="grid grid-cols-7 gap-2 text-center font-display text-xs font-bold uppercase tracking-widest text-[#6B6560] mb-3">
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
                  className={`p-3 border-2 min-h-[90px] cursor-pointer transition-all flex flex-col justify-between ${
                    isToday
                      ? 'bg-[#E8552A]/10 border-[#E8552A]'
                      : 'bg-[#FAF9F5] border-[#141110]/20 hover:border-[#141110]'
                  }`}
                >
                  <div className="flex justify-between items-center">
                    <span className={`font-display text-sm font-black ${isToday ? 'text-[#E8552A]' : 'text-[#141110]'}`}>
                      {d.getDate()}
                    </span>
                    {dayQuests.length > 0 && (
                      <span className="text-[10px] font-sans font-bold text-white bg-[#141110] px-1.5 py-0.5">
                        {dayQuests.length}
                      </span>
                    )}
                  </div>

                  {dayQuests.length > 0 && (
                    <div className="text-[9px] font-sans font-bold text-[#E8552A] uppercase truncate mt-1">
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
        <div className="fixed inset-0 z-50 bg-[#141110]/70 flex items-center justify-center p-4">
          <motion.div
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="w-full max-w-lg bg-white border-4 border-[#141110] p-8 shadow-[12px_12px_0_0_#141110]"
          >
            <div className="flex items-center justify-between pb-4 mb-6 border-b-2 border-[#141110]">
              <h3 className="font-display text-2xl font-black text-[#141110] uppercase tracking-widest flex items-center gap-2">
                <CalendarDays className="w-6 h-6 text-[#E8552A]" />
                <span>Schedule Quest Bounty</span>
              </h3>
              <button
                onClick={() => setIsScheduleModalOpen(false)}
                className="font-display text-lg font-bold text-[#141110] hover:text-[#E8552A]"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleScheduleCustomQuest} className="space-y-6">
              <div>
                <label className="block text-xs font-sans font-bold text-[#6B6560] uppercase tracking-wider mb-2">
                  Target Scheduled Date
                </label>
                <input
                  type="date"
                  value={selectedDateForNewQuest}
                  onChange={(e) => setSelectedDateForNewQuest(e.target.value)}
                  className="w-full px-4 py-3 bg-[#FAF9F5] border-2 border-[#141110] font-sans font-bold text-[#141110] focus:outline-none focus:border-[#E8552A]"
                />
              </div>

              <div>
                <label className="block text-xs font-sans font-bold text-[#6B6560] uppercase tracking-wider mb-2">
                  Quest Bounty Title
                </label>
                <input
                  type="text"
                  value={newTitle}
                  onChange={(e) => setNewTitle(e.target.value)}
                  required
                  placeholder="e.g. 5K Cardio Run or 2-Hour Deep Code Block"
                  className="w-full px-4 py-3 bg-[#FAF9F5] border-2 border-[#141110] font-sans font-bold text-[#141110] focus:outline-none focus:border-[#E8552A]"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-sans font-bold text-[#6B6560] uppercase tracking-wider mb-2">
                    Domain Category
                  </label>
                  <select
                    value={newCategory}
                    onChange={(e) => setNewCategory(e.target.value as QuestCategory)}
                    className="w-full px-4 py-3 bg-[#FAF9F5] border-2 border-[#141110] font-sans font-bold text-[#141110] focus:outline-none focus:border-[#E8552A]"
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
                  <label className="block text-xs font-sans font-bold text-[#6B6560] uppercase tracking-wider mb-2">
                    Difficulty Tier
                  </label>
                  <select
                    value={newDifficulty}
                    onChange={(e) => setNewDifficulty(e.target.value as QuestDifficulty)}
                    className="w-full px-4 py-3 bg-[#FAF9F5] border-2 border-[#141110] font-sans font-bold text-[#141110] focus:outline-none focus:border-[#E8552A]"
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
                <label className="block text-xs font-sans font-bold text-[#6B6560] uppercase tracking-wider mb-2">
                  Target Attribute Boost
                </label>
                <select
                  value={newAttribute}
                  onChange={(e) => setNewAttribute(e.target.value as AttributeType)}
                  className="w-full px-4 py-3 bg-[#FAF9F5] border-2 border-[#141110] font-sans font-bold text-[#141110] focus:outline-none focus:border-[#E8552A]"
                >
                  <option value="Intellect">Intellect</option>
                  <option value="Strength">Strength</option>
                  <option value="Vitality">Vitality</option>
                  <option value="Discipline">Discipline</option>
                  <option value="Creativity">Creativity</option>
                  <option value="Charisma">Charisma</option>
                </select>
              </div>

              <div className="flex items-center justify-end space-x-4 pt-4 border-t-2 border-[#141110]">
                <button
                  type="button"
                  onClick={() => setIsScheduleModalOpen(false)}
                  className="px-6 py-3 border-2 border-[#141110] font-display text-xs font-bold uppercase tracking-widest text-[#141110] hover:bg-[#FAF9F5]"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-6 py-3 bg-[#E8552A] border-2 border-[#141110] text-white font-display text-xs font-bold uppercase tracking-widest hover:bg-[#D0441B] shadow-[4px_4px_0_0_#141110]"
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
