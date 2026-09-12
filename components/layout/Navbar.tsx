'use client';

// ==============================================================================
// ASCEND - TOP HUD NAVIGATION BAR
// ==============================================================================

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useGame } from '@/lib/context/game-context';
import { calculateLevelProgress } from '@/lib/progression/levels';
import { AnimatedCounter } from '@/components/ui/AnimatedCounter';
import {
  Flame,
  Coins,
  Shield,
  Volume2,
  VolumeX,
  Menu,
  X,
  Sparkles,
  LayoutDashboard,
  Swords,
  User,
  BarChart3,
  ShoppingBag,
  Package,
  Trophy,
  Crown,
  Settings,
} from 'lucide-react';
import { ARCHETYPE_LIST } from '@/lib/progression/archetypes';

export const Navbar: React.FC = () => {
  const pathname = usePathname();
  const { profile, streak, toggleSound, isDemoUser, loginAsDemoUser } = useGame();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [archetypeDropdownOpen, setArchetypeDropdownOpen] = useState(false);

  const progress = calculateLevelProgress(profile.xp);

  const navLinks = [
    { href: '/dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { href: '/quests', label: 'Quests', icon: Swords },
    { href: '/character', label: 'Character', icon: User },
    { href: '/leaderboard', label: 'Leaderboard', icon: Crown },
    { href: '/analytics', label: 'Analytics', icon: BarChart3 },
    { href: '/shop', label: 'Guild Shop', icon: ShoppingBag },
    { href: '/inventory', label: 'Inventory', icon: Package },
    { href: '/achievements', label: 'Trophies', icon: Trophy },
  ];

  return (
    <header className="sticky top-0 z-40 w-full border-b border-white/10 bg-[#07090E]/95 backdrop-blur-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        {/* Left: Brand Logo with Orbitron Display Font */}
        <div className="flex items-center space-x-6">
          <Link href="/" className="flex items-center space-x-2.5 group">
            <div className="w-8 h-8 rounded-lg bg-cyan-500/20 border border-cyan-500/40 flex items-center justify-center text-cyan-400 group-hover:border-cyan-400 transition-colors">
              <Sparkles className="w-4 h-4" />
            </div>
            <span className="font-display text-lg font-black tracking-widest text-white group-hover:text-cyan-400 transition-colors">
              ASCEND
            </span>
          </Link>

          {/* Desktop Nav Links */}
          <nav className="hidden lg:flex items-center space-x-1">
            {navLinks.map((link) => {
              const Icon = link.icon;
              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`flex items-center space-x-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold tracking-wide transition-all ${
                    isActive
                      ? 'bg-cyan-500/15 text-cyan-400 border border-cyan-500/30'
                      : 'text-slate-400 hover:text-slate-200 hover:bg-white/5'
                  }`}
                >
                  <Icon className="w-3.5 h-3.5" />
                  <span>{link.label}</span>
                </Link>
              );
            })}
          </nav>
        </div>

        {/* Right: Real-Time Telemetry HUD & Controls */}
        <div className="flex items-center space-x-3">
          {/* Level & XP Mini Telemetry */}
          <Link
            href="/character"
            className="hidden sm:flex items-center space-x-2.5 px-3 py-1.5 rounded-lg bg-[#0D111A] border border-white/10 hover:border-cyan-500/40 transition-colors"
            title="Character Level & XP"
          >
            <div className="flex items-center space-x-1 text-cyan-400 font-display font-bold text-xs">
              <Shield className="w-3.5 h-3.5 text-cyan-400" />
              <span>LVL {progress.currentLevel}</span>
            </div>
            <div className="w-16 bg-slate-900 rounded-full h-1.5 overflow-hidden border border-white/5">
              <div
                className="bg-cyan-400 h-full rounded-full transition-all duration-500"
                style={{ width: `${progress.progressPercent}%` }}
              />
            </div>
          </Link>

          {/* Gold Counter (Animated Counter) */}
          <Link
            href="/shop"
            className="flex items-center space-x-1.5 px-2.5 py-1.5 rounded-lg bg-[#141008] border border-amber-500/30 hover:border-amber-500/60 text-amber-400 text-xs font-bold transition-all"
            title="Guild Gold Treasury"
          >
            <Coins className="w-3.5 h-3.5 text-amber-400" />
            <AnimatedCounter value={profile.gold} className="font-display font-bold" />
          </Link>

          {/* Daily Streak Indicator */}
          <div
            className="flex items-center space-x-1 px-2.5 py-1.5 rounded-lg bg-[#140E0A] border border-orange-500/30 text-orange-400 text-xs font-bold"
            title={`Current Daily Streak: ${streak.current_streak} days`}
          >
            <Flame className="w-3.5 h-3.5 text-orange-400" />
            <span className="font-display font-bold">{streak.current_streak}d</span>
          </div>

          {/* Sound Toggle Button */}
          <button
            onClick={() => toggleSound(!profile.sound_enabled)}
            className="p-2 rounded-lg bg-[#0D111A] border border-white/10 text-slate-400 hover:text-cyan-400 hover:border-cyan-500/30 transition-all"
            title={profile.sound_enabled ? 'Mute Procedural SFX' : 'Enable Procedural SFX'}
            aria-label="Toggle Sound Effects"
          >
            {profile.sound_enabled ? (
              <Volume2 className="w-4 h-4 text-cyan-400" />
            ) : (
              <VolumeX className="w-4 h-4 text-slate-500" />
            )}
          </button>

          {/* Archetype Quick Switcher / Profile Badge */}
          <div className="relative">
            <button
              onClick={() => setArchetypeDropdownOpen(!archetypeDropdownOpen)}
              className="flex items-center space-x-2 px-2 py-1 rounded-lg bg-[#0D111A] border border-white/10 hover:border-cyan-500/40 text-xs text-slate-200 transition-all"
            >
              <div className="w-5 h-5 rounded-md bg-cyan-500/20 text-cyan-300 border border-cyan-500/40 flex items-center justify-center text-[10px] font-bold">
                {profile.archetype.charAt(0)}
              </div>
              <span className="hidden md:inline font-semibold">{profile.archetype}</span>
            </button>

            {archetypeDropdownOpen && (
              <div className="absolute right-0 mt-2 w-56 rounded-xl bg-[#0D111A] border border-white/15 shadow-2xl p-2 z-50">
                <div className="px-3 py-2 border-b border-white/10 mb-1">
                  <div className="text-xs font-bold text-slate-200">{profile.username}</div>
                  <div className="text-[11px] text-cyan-400 font-medium">{profile.title}</div>
                </div>
                <div className="text-[10px] uppercase font-bold text-slate-500 px-3 py-1">
                  Switch Archetype
                </div>
                {ARCHETYPE_LIST.map((arch) => (
                  <button
                    key={arch.id}
                    onClick={() => {
                      loginAsDemoUser(arch.id);
                      setArchetypeDropdownOpen(false);
                    }}
                    className={`w-full text-left px-3 py-1.5 rounded-lg text-xs flex items-center justify-between transition-all ${
                      profile.archetype === arch.id
                        ? 'bg-cyan-500/15 text-cyan-300 font-bold border border-cyan-500/30'
                        : 'text-slate-300 hover:bg-white/5'
                    }`}
                  >
                    <span>{arch.name}</span>
                    <span className="text-[10px] text-slate-500">{arch.role.split(' ')[0]}</span>
                  </button>
                ))}
                <div className="border-t border-white/10 mt-1 pt-1">
                  <Link
                    href="/settings"
                    onClick={() => setArchetypeDropdownOpen(false)}
                    className="w-full text-left px-3 py-1.5 rounded-lg text-xs text-slate-300 hover:bg-white/5 flex items-center space-x-2"
                  >
                    <Settings className="w-3.5 h-3.5 text-slate-400" />
                    <span>Settings & Themes</span>
                  </Link>
                </div>
              </div>
            )}
          </div>

          {/* Mobile Menu Toggle */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-2 rounded-lg bg-[#0D111A] border border-white/10 text-slate-300"
            aria-label="Toggle Navigation Menu"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-t border-white/10 bg-[#07090E] px-4 py-4 space-y-2">
          {navLinks.map((link) => {
            const Icon = link.icon;
            const isActive = pathname === link.href;
            return (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className={`flex items-center space-x-3 px-3 py-2 rounded-lg text-sm font-semibold transition-all ${
                  isActive
                    ? 'bg-cyan-500/15 text-cyan-400 border border-cyan-500/30'
                    : 'text-slate-300 hover:bg-white/5'
                }`}
              >
                <Icon className="w-4 h-4" />
                <span>{link.label}</span>
              </Link>
            );
          })}
          <Link
            href="/settings"
            onClick={() => setMobileMenuOpen(false)}
            className="flex items-center space-x-3 px-3 py-2 rounded-lg text-sm font-semibold text-slate-300 hover:bg-white/5"
          >
            <Settings className="w-4 h-4 text-slate-400" />
            <span>Settings</span>
          </Link>
        </div>
      )}
    </header>
  );
};
