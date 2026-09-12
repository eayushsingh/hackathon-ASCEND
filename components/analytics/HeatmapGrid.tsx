'use client';

// ==============================================================================
// ASCEND - 30-DAY PRODUCTIVITY & STREAK HEATMAP GRID
// ==============================================================================

import React from 'react';
import { useGame } from '@/lib/context/game-context';
import { getFormattedDateString } from '@/lib/progression/streaks';
import { Flame, Calendar, Sparkles } from 'lucide-react';

export const HeatmapGrid: React.FC = () => {
  const { quests, streak } = useGame();

  // Generate the last 28 days
  const days: { dateStr: string; label: string; count: number; isToday: boolean }[] = [];
  const now = new Date();

  for (let i = 27; i >= 0; i--) {
    const d = new Date(now);
    d.setUTCDate(d.getUTCDate() - i);
    const dateStr = getFormattedDateString(d);

    const isToday = i === 0;

    // Estimate completed quests for that day (or random realistic density for older demo days if today has completions)
    let count = 0;
    if (isToday) {
      count = quests.filter((q) => q.status === 'Completed').length;
    } else if (i < streak.current_streak) {
      count = ((i * 3 + 1) % 4) + 1; // Simulated streak days for historical grid
    }

    days.push({
      dateStr,
      label: d.toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
      count,
      isToday,
    });
  }

  const getCellColor = (count: number, isToday: boolean) => {
    if (count === 0) return 'bg-slate-900 border-white/5';
    if (count === 1) return 'bg-cyan-950 text-cyan-300 border-cyan-800/50';
    if (count === 2) return 'bg-cyan-800 text-cyan-200 border-cyan-600/50';
    if (count === 3) return 'bg-cyan-600 text-white border-cyan-400/60 shadow-[0_0_8px_rgba(6,182,212,0.4)]';
    return 'bg-gradient-to-tr from-cyan-500 to-indigo-500 text-white border-cyan-300 shadow-[0_0_12px_rgba(6,182,212,0.7)]';
  };

  return (
    <div className="cyber-panel p-5 rounded-2xl">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center space-x-2">
          <div className="p-1.5 rounded-lg bg-orange-500/20 text-orange-400">
            <Flame className="w-4 h-4" />
          </div>
          <div>
            <h3 className="text-sm font-bold text-white">4-Week Consistency Grid</h3>
            <p className="text-[11px] text-slate-400">Daily quest execution activity</p>
          </div>
        </div>

        <div className="flex items-center space-x-1 text-[10px] text-slate-400 font-medium">
          <span>Less</span>
          <div className="w-2.5 h-2.5 rounded bg-slate-900 border border-white/5" />
          <div className="w-2.5 h-2.5 rounded bg-cyan-950 border border-cyan-800/50" />
          <div className="w-2.5 h-2.5 rounded bg-cyan-700 border border-cyan-500/50" />
          <div className="w-2.5 h-2.5 rounded bg-cyan-400 border border-cyan-300 shadow-[0_0_6px_rgba(6,182,212,0.8)]" />
          <span>More</span>
        </div>
      </div>

      {/* Grid of 28 days (4 weeks x 7 days) */}
      <div className="grid grid-cols-7 gap-2">
        {days.map((day, idx) => (
          <div
            key={day.dateStr}
            className={`aspect-square rounded-xl p-1.5 flex flex-col justify-between border transition-all hover:scale-105 cursor-pointer ${getCellColor(
              day.count,
              day.isToday
            )}`}
            title={`${day.dateStr}: ${day.count} quests completed`}
          >
            <span className="text-[9px] font-bold opacity-75">{day.label.split(' ')[1]}</span>
            <span className="text-right text-[10px] font-black">
              {day.count > 0 ? `${day.count}` : ''}
            </span>
          </div>
        ))}
      </div>

      <div className="mt-4 pt-3 border-t border-white/5 flex items-center justify-between text-xs text-slate-400">
        <span className="flex items-center gap-1">
          <Calendar className="w-3.5 h-3.5 text-cyan-400" /> Current Streak: <strong className="text-orange-400">{streak.current_streak} Consecutive Days</strong>
        </span>
        <span className="text-purple-400 font-semibold">
          Freeze Relics: {streak.streak_freeze_count} Available
        </span>
      </div>
    </div>
  );
};
