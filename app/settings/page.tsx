'use client';

// ==============================================================================
// ASCEND - SETTINGS, THEMES & AUDIO CUSTOMIZATION
// ==============================================================================

import React, { useState } from 'react';
import { useGame } from '@/lib/context/game-context';
import {
  Settings,
  Palette,
  Volume2,
  VolumeX,
  User,
  Database,
  Trash2,
  Download,
  Check,
  ShieldCheck,
  Sparkles,
} from 'lucide-react';
import { ARCHETYPE_LIST } from '@/lib/progression/archetypes';
import { Archetype } from '@/types/rpg';

export default function SettingsPage() {
  const {
    profile,
    updateUserProfile,
    setTheme,
    toggleSound,
    resetAllGameData,
    isConfigured,
    isDemoUser,
  } = useGame();

  const [username, setUsername] = useState(profile.username);
  const [title, setTitle] = useState(profile.title);
  const [selectedArchetype, setSelectedArchetype] = useState<Archetype>(profile.archetype);
  const [savedSuccess, setSavedSuccess] = useState(false);

  const themes = [
    { id: 'cyberpunk', name: 'Cyberpunk Neon', desc: 'Luminous cyan & electric violet grid', color: '#06B6D4' },
    { id: 'theme-void', name: 'Obsidian Void', desc: 'Deep ultraviolet obsidian darkness', color: '#A855F7' },
    { id: 'theme-solar', name: 'Solar Flare', desc: 'Radiant gold and magma orange reactor', color: '#F59E0B' },
    { id: 'theme-matrix', name: 'Emerald Matrix', desc: 'Cyber terminal green phosphor rain', color: '#10B981' },
    { id: 'theme-crimson', name: 'Crimson Vanguard', desc: 'Tactical combat red and carbon HUD', color: '#EF4444' },
  ];

  const handleSaveProfile = async (e: React.FormEvent) => {
    e.preventDefault();
    await updateUserProfile({
      username: username.trim(),
      title: title.trim(),
      archetype: selectedArchetype,
    });
    setSavedSuccess(true);
    setTimeout(() => setSavedSuccess(false), 3000);
  };

  const handleExportData = () => {
    const backup = {
      profile,
      exportedAt: new Date().toISOString(),
    };
    const blob = new Blob([JSON.stringify(backup, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `ascend-hero-backup-${Date.now()}.json`;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      {/* Header */}
      <div className="flex items-center space-x-3 pb-4 border-b border-white/10">
        <div className="p-2.5 rounded-2xl bg-cyan-500/20 text-cyan-400">
          <Settings className="w-6 h-6" />
        </div>
        <div>
          <h1 className="text-2xl font-black text-white">System Settings & Customization</h1>
          <p className="text-xs text-slate-400">Personalize themes, synthesized audio SFX, and RPG profile</p>
        </div>
      </div>

      {/* 1. THEME SELECTION */}
      <div className="cyber-panel p-6 rounded-2xl">
        <div className="flex items-center space-x-2 pb-3 border-b border-white/10 mb-4">
          <Palette className="w-5 h-5 text-cyan-400" />
          <div>
            <h3 className="text-sm font-bold text-white">Cyberpunk HUD Themes</h3>
            <p className="text-xs text-slate-400">Switch global palette and luminous accent styling</p>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
          {themes.map((th) => {
            const isSelected = profile.theme === th.id;
            return (
              <button
                key={th.id}
                onClick={() => setTheme(th.id)}
                className={`p-4 rounded-xl text-left border transition-all ${
                  isSelected
                    ? 'bg-slate-900 border-cyan-500 shadow-[0_0_20px_rgba(6,182,212,0.3)] ring-1 ring-cyan-500'
                    : 'bg-slate-900/50 border-white/5 hover:border-white/20'
                }`}
              >
                <div className="flex items-center justify-between mb-2">
                  <div className="w-4 h-4 rounded-full" style={{ backgroundColor: th.color }} />
                  {isSelected && <Check className="w-4 h-4 text-cyan-400" />}
                </div>
                <div className="text-sm font-bold text-white">{th.name}</div>
                <div className="text-xs text-slate-400 mt-0.5">{th.desc}</div>
              </button>
            );
          })}
        </div>
      </div>

      {/* 2. AUDIO SFX CONTROLS */}
      <div className="cyber-panel p-6 rounded-2xl">
        <div className="flex items-center space-x-2 pb-3 border-b border-white/10 mb-4">
          <Volume2 className="w-5 h-5 text-purple-400" />
          <div>
            <h3 className="text-sm font-bold text-white">Procedural Web Audio SFX</h3>
            <p className="text-xs text-slate-400">Zero-latency synthesized RPG sound effects</p>
          </div>
        </div>

        <div className="flex items-center justify-between p-4 rounded-xl bg-slate-900 border border-white/5">
          <div className="flex items-center space-x-3">
            {profile.sound_enabled ? (
              <Volume2 className="w-5 h-5 text-cyan-400" />
            ) : (
              <VolumeX className="w-5 h-5 text-slate-500" />
            )}
            <div>
              <div className="text-xs font-bold text-white">Synthesized Audio Effects</div>
              <div className="text-[11px] text-slate-400">Quest completion chimes, gold clinks, and level-up fanfares</div>
            </div>
          </div>

          <button
            onClick={() => toggleSound(!profile.sound_enabled)}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all border ${
              profile.sound_enabled
                ? 'bg-cyan-500/20 text-cyan-300 border-cyan-500/50'
                : 'bg-slate-800 text-slate-400 border-white/10'
            }`}
          >
            {profile.sound_enabled ? 'Enabled' : 'Muted'}
          </button>
        </div>
      </div>

      {/* 3. PROFILE DETAILS */}
      <form onSubmit={handleSaveProfile} className="cyber-panel p-6 rounded-2xl space-y-4">
        <div className="flex items-center space-x-2 pb-3 border-b border-white/10 mb-2">
          <User className="w-5 h-5 text-emerald-400" />
          <div>
            <h3 className="text-sm font-bold text-white">Hero Identity</h3>
            <p className="text-xs text-slate-400">Update codename, active title, and character class</p>
          </div>
        </div>

        {savedSuccess && (
          <div className="p-3 rounded-xl bg-emerald-950/60 border border-emerald-500/40 text-emerald-300 text-xs font-bold flex items-center gap-2">
            <Check className="w-4 h-4" />
            <span>Profile successfully updated!</span>
          </div>
        )}

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider mb-1">
              Codename
            </label>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full px-3.5 py-2.5 rounded-xl bg-slate-900 border border-white/10 text-white text-xs focus:outline-none focus:border-cyan-500"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider mb-1">
              Display Title
            </label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full px-3.5 py-2.5 rounded-xl bg-slate-900 border border-white/10 text-white text-xs focus:outline-none focus:border-cyan-500"
            />
          </div>
        </div>

        <div>
          <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider mb-1">
            Character Archetype
          </label>
          <select
            value={selectedArchetype}
            onChange={(e) => setSelectedArchetype(e.target.value as Archetype)}
            className="w-full px-3.5 py-2.5 rounded-xl bg-slate-900 border border-white/10 text-white text-xs focus:outline-none focus:border-cyan-500"
          >
            {ARCHETYPE_LIST.map((arch) => (
              <option key={arch.id} value={arch.id}>
                {arch.name} ({arch.role})
              </option>
            ))}
          </select>
        </div>

        <div className="pt-2">
          <button
            type="submit"
            className="px-6 py-2.5 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold text-xs shadow-lg transition-all"
          >
            Save Identity Changes
          </button>
        </div>
      </form>

      {/* 4. DATABASE & BACKUP MANAGEMENT */}
      <div className="cyber-panel p-6 rounded-2xl">
        <div className="flex items-center space-x-2 pb-3 border-b border-white/10 mb-4">
          <Database className="w-5 h-5 text-amber-400" />
          <div>
            <h3 className="text-sm font-bold text-white">Database & Persistence Link</h3>
            <p className="text-xs text-slate-400">Connection state and emergency backup</p>
          </div>
        </div>

        <div className="p-4 rounded-xl bg-slate-900 border border-white/5 space-y-4">
          <div className="flex items-center justify-between text-xs">
            <span className="text-slate-400">Supabase Backend Status:</span>
            <span className={`font-bold flex items-center gap-1.5 ${isConfigured ? 'text-emerald-400' : 'text-amber-400'}`}>
              <ShieldCheck className="w-4 h-4" />
              <span>{isConfigured ? 'Supabase Postgres RLS Connected' : 'Demo Local Persistence Mode Active'}</span>
            </span>
          </div>

          <div className="flex flex-wrap gap-3 pt-3 border-t border-white/5">
            <button
              onClick={handleExportData}
              className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 font-bold text-xs flex items-center space-x-1.5 transition-all border border-white/10"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Export RPG Backup (JSON)</span>
            </button>

            <button
              onClick={() => {
                if (confirm('Are you sure you want to reset all game data to default starting state?')) {
                  resetAllGameData();
                }
              }}
              className="px-4 py-2 rounded-xl bg-rose-950/40 hover:bg-rose-900/60 text-rose-300 font-bold text-xs flex items-center space-x-1.5 transition-all border border-rose-500/30"
            >
              <Trash2 className="w-3.5 h-3.5" />
              <span>Reset Game Data</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
