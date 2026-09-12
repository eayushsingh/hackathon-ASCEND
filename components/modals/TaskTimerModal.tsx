'use client';

// ==============================================================================
// ASCEND - PRODUCTION-GRADE TASK FOCUS TIMER & SCREEN-TIME TRACKER
// Real-time Pomodoro/Stopwatch, WebAudio Ambient Synthesizer, Floating HUD & XP Bonus
// ==============================================================================

import React, { useState, useEffect, useRef, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Quest } from '@/types/rpg';
import { useGame } from '@/lib/context/game-context';
import { soundManager } from '@/lib/sound/sfx';
import confetti from 'canvas-confetti';
import {
  Play,
  Pause,
  RotateCcw,
  CheckCircle2,
  X,
  Minimize2,
  Maximize2,
  Volume2,
  VolumeX,
  Sparkles,
  Zap,
  Coins,
  Clock,
  Flame,
  Shield,
} from 'lucide-react';

interface TaskTimerModalProps {
  quest: Quest | null;
  isOpen: boolean;
  onClose: () => void;
  onCompleteQuest?: (questId: string) => Promise<void>;
}

type TimerPreset = 15 | 25 | 45 | 90 | 0; // 0 is stopwatch count-up

export const TaskTimerModal: React.FC<TaskTimerModalProps> = ({
  quest,
  isOpen,
  onClose,
  onCompleteQuest,
}) => {
  const { completeQuest, streak } = useGame();

  const [preset, setPreset] = useState<TimerPreset>(25);
  const [timeLeft, setTimeLeft] = useState<number>(25 * 60);
  const [isRunning, setIsRunning] = useState<boolean>(false);
  const [isMinimized, setIsMinimized] = useState<boolean>(false);
  const [ambientSound, setAmbientSound] = useState<'none' | 'rain' | 'alpha' | 'waves'>('none');
  const [isCompleting, setIsCompleting] = useState<boolean>(false);
  const [secondsFocused, setSecondsFocused] = useState<number>(0);
  const [dailyScreenTimeSeconds, setDailyScreenTimeSeconds] = useState<number>(0);

  const audioContextRef = useRef<AudioContext | null>(null);
  const ambientNodeRef = useRef<GainNode | null>(null);
  const oscillatorRefs = useRef<OscillatorNode[]>([]);
  const noiseSourceRef = useRef<AudioBufferSourceNode | null>(null);

  // Load today's total focus screen time
  useEffect(() => {
    if (typeof window === 'undefined') return;
    const todayKey = `ascend_focus_screentime_${new Date().toISOString().split('T')[0]}`;
    const saved = localStorage.getItem(todayKey);
    if (saved) {
      setDailyScreenTimeSeconds(parseInt(saved, 10) || 0);
    }
  }, []);

  // Save screen time to localStorage
  const recordScreenTime = useCallback((addedSeconds: number) => {
    if (typeof window === 'undefined' || addedSeconds <= 0) return;
    const todayKey = `ascend_focus_screentime_${new Date().toISOString().split('T')[0]}`;
    setDailyScreenTimeSeconds((prev) => {
      const updated = prev + addedSeconds;
      localStorage.setItem(todayKey, updated.toString());
      return updated;
    });
  }, []);

  // Reset timer whenever quest or preset changes
  useEffect(() => {
    if (preset === 0) {
      setTimeLeft(0);
    } else {
      setTimeLeft(preset * 60);
    }
    setIsRunning(false);
    setSecondsFocused(0);
  }, [preset, quest?.id]);

  // Main Timer Interval Loop
  useEffect(() => {
    let interval: NodeJS.Timeout | null = null;

    if (isRunning) {
      interval = setInterval(() => {
        setSecondsFocused((prev) => prev + 1);
        recordScreenTime(1);

        if (preset === 0) {
          // Count up (Stopwatch / Free Screen-time)
          setTimeLeft((prev) => prev + 1);
        } else {
          // Count down
          setTimeLeft((prev) => {
            if (prev <= 1) {
              setIsRunning(false);
              soundManager.playLevelUp();
              if (typeof window !== 'undefined') {
                confetti({
                  particleCount: 70,
                  spread: 60,
                  origin: { y: 0.6 },
                });
              }
              return 0;
            }
            return prev - 1;
          });
        }
      }, 1000);
    }

    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isRunning, preset, recordScreenTime]);

  // Clean Web Audio Ambient Generator
  useEffect(() => {
    if (ambientSound === 'none') {
      if (audioContextRef.current) {
        audioContextRef.current.close().catch(() => {});
        audioContextRef.current = null;
      }
      return;
    }

    try {
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      const ctx = new AudioCtx();
      audioContextRef.current = ctx;

      const masterGain = ctx.createGain();
      masterGain.gain.setValueAtTime(0.12, ctx.currentTime);
      masterGain.connect(ctx.destination);
      ambientNodeRef.current = masterGain;

      if (ambientSound === 'alpha') {
        // Binaural Alpha Beats (10Hz difference: 200Hz & 210Hz)
        const osc1 = ctx.createOscillator();
        const osc2 = ctx.createOscillator();
        osc1.type = 'sine';
        osc2.type = 'sine';
        osc1.frequency.setValueAtTime(200, ctx.currentTime);
        osc2.frequency.setValueAtTime(210, ctx.currentTime);

        const pan1 = ctx.createStereoPanner ? ctx.createStereoPanner() : null;
        const pan2 = ctx.createStereoPanner ? ctx.createStereoPanner() : null;

        if (pan1 && pan2) {
          pan1.pan.setValueAtTime(-0.8, ctx.currentTime);
          pan2.pan.setValueAtTime(0.8, ctx.currentTime);
          osc1.connect(pan1).connect(masterGain);
          osc2.connect(pan2).connect(masterGain);
        } else {
          osc1.connect(masterGain);
          osc2.connect(masterGain);
        }

        osc1.start();
        osc2.start();
        oscillatorRefs.current = [osc1, osc2];
      } else if (ambientSound === 'rain' || ambientSound === 'waves') {
        // Pink / Brown noise buffer
        const bufferSize = ctx.sampleRate * 2;
        const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
        const data = buffer.getChannelData(0);
        let lastOut = 0.0;
        for (let i = 0; i < bufferSize; i++) {
          const white = Math.random() * 2 - 1;
          data[i] = (lastOut + 0.02 * white) / 1.02;
          lastOut = data[i];
          data[i] *= 3.5;
        }

        const noise = ctx.createBufferSource();
        noise.buffer = buffer;
        noise.loop = true;

        const filter = ctx.createBiquadFilter();
        filter.type = 'lowpass';
        filter.frequency.setValueAtTime(ambientSound === 'rain' ? 800 : 400, ctx.currentTime);

        noise.connect(filter).connect(masterGain);
        noise.start();
        noiseSourceRef.current = noise;
      }
    } catch {
      // Audio context error or not supported
    }

    return () => {
      if (audioContextRef.current) {
        audioContextRef.current.close().catch(() => {});
        audioContextRef.current = null;
      }
    };
  }, [ambientSound]);

  if (!isOpen || !quest) return null;

  const totalDuration = preset === 0 ? Math.max(secondsFocused, 1) : preset * 60;
  const progressPercent =
    preset === 0 ? 100 : Math.min(100, Math.max(0, ((totalDuration - timeLeft) / totalDuration) * 100));

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const formatScreenTimeMinutes = (totalSecs: number) => {
    const hours = Math.floor(totalSecs / 3600);
    const mins = Math.floor((totalSecs % 3600) / 60);
    if (hours > 0) return `${hours}h ${mins}m`;
    return `${mins}m`;
  };

  const handleCompleteAndClaim = async () => {
    if (isCompleting || quest.status === 'Completed') return;
    setIsCompleting(true);
    soundManager.playQuestComplete();

    try {
      if (onCompleteQuest) {
        await onCompleteQuest(quest.id);
      } else {
        await completeQuest(quest.id);
      }

      if (typeof window !== 'undefined') {
        confetti({
          particleCount: 120,
          spread: 80,
          origin: { y: 0.6 },
          colors: ['#7C3AED', '#38BDF8', '#10B981', '#F59E0B'],
        });
      }

      setTimeout(() => {
        setIsCompleting(false);
        onClose();
      }, 500);
    } catch {
      setIsCompleting(false);
    }
  };

  // Minimized Sticky Floating Widget (Bottom-Right)
  if (isMinimized) {
    return (
      <motion.div
        initial={{ scale: 0.8, opacity: 0, y: 20 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        className="fixed bottom-6 right-6 z-50 p-4 bg-white/95 backdrop-blur-md border border-purple-200 rounded-3xl shadow-2xl flex items-center space-x-3 text-[#1D1D1F] select-none"
      >
        <div className="relative w-10 h-10 flex items-center justify-center">
          <svg className="w-10 h-10 transform -rotate-90">
            <circle cx="20" cy="20" r="16" stroke="#E5E5EA" strokeWidth="3" fill="none" />
            <circle
              cx="20"
              cy="20"
              r="16"
              stroke="#7C3AED"
              strokeWidth="3"
              fill="none"
              strokeDasharray={2 * Math.PI * 16}
              strokeDashoffset={2 * Math.PI * 16 * (1 - progressPercent / 100)}
              strokeLinecap="round"
            />
          </svg>
          <span className="absolute text-[10px] font-mono font-bold text-[#1D1D1F]">
            {Math.floor(timeLeft / 60)}m
          </span>
        </div>

        <div>
          <div className="text-xs font-bold truncate max-w-[140px] text-[#1D1D1F]">{quest.title}</div>
          <div className="text-[11px] font-mono text-purple-600 font-semibold">
            {formatTime(timeLeft)} • {isRunning ? 'Focusing' : 'Paused'}
          </div>
        </div>

        <div className="flex items-center space-x-1.5 pl-2 border-l border-[#E5E5EA]">
          <button
            onClick={() => setIsRunning(!isRunning)}
            className="p-2 rounded-xl bg-purple-50 text-purple-700 hover:bg-purple-100 transition-colors cursor-pointer"
          >
            {isRunning ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
          </button>
          <button
            onClick={() => setIsMinimized(false)}
            className="p-2 rounded-xl hover:bg-[#F5F5F7] text-[#6E6E73] transition-colors cursor-pointer"
          >
            <Maximize2 className="w-4 h-4" />
          </button>
        </div>
      </motion.div>
    );
  }

  // Full Focus Modal HUD
  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-md">
        <motion.div
          initial={{ scale: 0.95, opacity: 0, y: 15 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          exit={{ scale: 0.95, opacity: 0, y: 15 }}
          className="relative w-full max-w-lg apple-card p-6 sm:p-8 bg-white border border-[#E5E5EA] shadow-2xl rounded-3xl overflow-hidden max-h-[92vh] overflow-y-auto"
        >
          {/* Header */}
          <div className="flex items-center justify-between pb-4 border-b border-[#E5E5EA]">
            <div className="flex items-center space-x-2">
              <span className="w-2.5 h-2.5 rounded-full bg-purple-600 animate-pulse" />
              <h3 className="text-sm font-mono font-bold uppercase tracking-wider text-[#1D1D1F]">
                Task Focus & Screen-Time Mode
              </h3>
            </div>
            <div className="flex items-center space-x-1">
              <button
                onClick={() => setIsMinimized(true)}
                title="Minimize to Floating HUD"
                className="p-2 rounded-full text-[#6E6E73] hover:bg-[#F5F5F7] hover:text-[#1D1D1F] transition-colors cursor-pointer"
              >
                <Minimize2 className="w-4 h-4" />
              </button>
              <button
                onClick={onClose}
                title="Close"
                className="p-2 rounded-full text-[#6E6E73] hover:bg-[#F5F5F7] hover:text-[#1D1D1F] transition-colors cursor-pointer"
              >
                <X className="w-5 h-5 stroke-[2.5]" />
              </button>
            </div>
          </div>

          {/* Active Task Info */}
          <div className="mt-4 p-4 rounded-2xl bg-[#FAF9F5] border border-[#E5E5EA]">
            <div className="flex items-center justify-between text-xs font-semibold mb-1">
              <span className="text-purple-600 uppercase tracking-wide font-mono">
                {quest.category} • {quest.difficulty}
              </span>
              <span className="text-[#6E6E73] font-mono">+{quest.xp_reward} XP</span>
            </div>
            <h4 className="text-base font-bold text-[#1D1D1F] leading-snug">{quest.title}</h4>
          </div>

          {/* Preset Buttons */}
          <div className="grid grid-cols-4 gap-2 mt-5">
            {[
              { label: '25m Focus', val: 25 },
              { label: '45m Sprint', val: 45 },
              { label: '90m Flow', val: 90 },
              { label: '⏱️ Stopwatch', val: 0 },
            ].map((p) => (
              <button
                key={p.val}
                type="button"
                onClick={() => setPreset(p.val as TimerPreset)}
                className={`py-2 px-1 text-xs font-semibold rounded-xl border transition-all cursor-pointer text-center ${
                  preset === p.val
                    ? 'btn-primary-gradient text-white border-transparent shadow-sm'
                    : 'bg-white text-[#6E6E73] border-[#E5E5EA] hover:border-purple-300 hover:text-[#1D1D1F]'
                }`}
              >
                {p.label}
              </button>
            ))}
          </div>

          {/* Large Circular Animated Timer Visual */}
          <div className="flex flex-col items-center justify-center my-8">
            <div className="relative w-56 h-56 flex items-center justify-center">
              {/* Outer Circular SVG Track */}
              <svg className="w-56 h-56 transform -rotate-90">
                <circle
                  cx="112"
                  cy="112"
                  r="96"
                  stroke="#F5F5F7"
                  strokeWidth="10"
                  fill="none"
                />
                <motion.circle
                  cx="112"
                  cy="112"
                  r="96"
                  stroke="url(#timer-gradient)"
                  strokeWidth="10"
                  fill="none"
                  strokeDasharray={2 * Math.PI * 96}
                  strokeDashoffset={2 * Math.PI * 96 * (1 - progressPercent / 100)}
                  strokeLinecap="round"
                  transition={{ duration: 0.5 }}
                />
                <defs>
                  <linearGradient id="timer-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#7C3AED" />
                    <stop offset="100%" stopColor="#38BDF8" />
                  </linearGradient>
                </defs>
              </svg>

              {/* Time Numbers & Pulse */}
              <div className="absolute flex flex-col items-center justify-center text-center">
                <span className="text-4xl font-extrabold text-[#1D1D1F] font-mono tracking-tight">
                  {formatTime(timeLeft)}
                </span>
                <span className="text-xs font-mono font-semibold text-purple-600 uppercase mt-1">
                  {isRunning ? '🔥 Focus In Progress' : 'Paused / Ready'}
                </span>
                <span className="text-[11px] text-[#8E8E93] font-mono mt-0.5">
                  Screen-time: {Math.floor(secondsFocused / 60)}m {secondsFocused % 60}s
                </span>
              </div>
            </div>

            {/* Play / Pause / Reset Controls */}
            <div className="flex items-center space-x-4 mt-3">
              <button
                type="button"
                onClick={() => {
                  soundManager.playClick();
                  if (preset === 0) setTimeLeft(0);
                  else setTimeLeft(preset * 60);
                  setIsRunning(false);
                }}
                className="p-3.5 rounded-2xl bg-[#F5F5F7] hover:bg-[#E5E5EA] text-[#1D1D1F] transition-all cursor-pointer shadow-sm"
                title="Reset Timer"
              >
                <RotateCcw className="w-5 h-5" />
              </button>

              <button
                type="button"
                onClick={() => {
                  soundManager.playClick();
                  setIsRunning(!isRunning);
                }}
                className="px-8 py-3.5 btn-primary-gradient text-white font-bold text-sm uppercase font-mono tracking-wider rounded-2xl shadow-lg hover:shadow-xl transition-all flex items-center space-x-2.5 cursor-pointer"
              >
                {isRunning ? (
                  <>
                    <Pause className="w-5 h-5 fill-white" />
                    <span>Pause</span>
                  </>
                ) : (
                  <>
                    <Play className="w-5 h-5 fill-white" />
                    <span>Start Focus</span>
                  </>
                )}
              </button>
            </div>
          </div>

          {/* Ambient Background Sounds */}
          <div className="p-3.5 bg-[#FAF9F5] rounded-2xl border border-[#E5E5EA] mb-6">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-mono font-bold uppercase text-[#1D1D1F] flex items-center gap-1.5">
                <Volume2 className="w-3.5 h-3.5 text-purple-600" />
                <span>Ambient Focus Audio</span>
              </span>
              <span className="text-[11px] text-[#8E8E93] font-mono">Synthesizer (Offline)</span>
            </div>
            <div className="grid grid-cols-4 gap-1.5">
              {[
                { id: 'none', label: 'Off' },
                { id: 'rain', label: '🌧️ Rain' },
                { id: 'alpha', label: '🧠 Alpha 10Hz' },
                { id: 'waves', label: '🌊 Waves' },
              ].map((s) => (
                <button
                  key={s.id}
                  type="button"
                  onClick={() => setAmbientSound(s.id as typeof ambientSound)}
                  className={`py-1.5 px-2 text-xs font-semibold rounded-xl border transition-all cursor-pointer text-center ${
                    ambientSound === s.id
                      ? 'bg-purple-600 text-white border-purple-600 shadow-sm'
                      : 'bg-white text-[#6E6E73] border-[#E5E5EA] hover:text-[#1D1D1F]'
                  }`}
                >
                  {s.label}
                </button>
              ))}
            </div>
          </div>

          {/* Today's Screen-Time Telemetry Bar */}
          <div className="flex items-center justify-between text-xs font-mono py-2.5 px-3 bg-purple-50/70 border border-purple-200/80 rounded-2xl mb-6">
            <span className="text-purple-900 font-semibold flex items-center gap-1.5">
              <Clock className="w-3.5 h-3.5 text-purple-600" />
              <span>Today&apos;s Focus Screen-Time</span>
            </span>
            <strong className="text-purple-700 font-bold">
              {formatScreenTimeMinutes(dailyScreenTimeSeconds)}
            </strong>
          </div>

          {/* Finish & Complete Quest Button */}
          <button
            type="button"
            disabled={isCompleting || quest.status === 'Completed'}
            onClick={handleCompleteAndClaim}
            className="w-full py-4 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-sm uppercase font-mono tracking-wider rounded-2xl shadow-lg hover:shadow-xl transition-all flex items-center justify-center space-x-2 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <CheckCircle2 className="w-5 h-5 stroke-[2.5]" />
            <span>
              {isCompleting
                ? 'Claiming Rewards...'
                : `Complete Task & Claim +${quest.xp_reward} XP`}
            </span>
          </button>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
