'use client';

// ==============================================================================
// ASCEND - TOP HUD NAVIGATION BAR
// Vibrant Modern RPG HUD Header
// ==============================================================================

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { useGame } from '@/lib/context/game-context';
import { calculateLevelProgress } from '@/lib/progression/levels';
import { AnimatedCounter } from '@/components/ui/AnimatedCounter';
import {
  Flame,
  Coins,
  Volume2,
  VolumeX,
  Menu,
  X,
  Sparkles,
  LayoutDashboard,
  Swords,
  CalendarDays,
  User,
  BarChart3,
  ShoppingBag,
  Package,
  Trophy,
  Crown,
  Settings,
  ChevronDown,
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
    { href: '/calendar', label: 'Calendar', icon: CalendarDays },
    { href: '/character', label: 'Character', icon: User },
    { href: '/leaderboard', label: 'Leaderboard', icon: Crown },
    { href: '/analytics', label: 'Analytics', icon: BarChart3 },
    { href: '/shop', label: 'Shop', icon: ShoppingBag },
    { href: '/inventory', label: 'Inventory', icon: Package },
    { href: '/achievements', label: 'Trophies', icon: Trophy },
  ];

  return (
    <header className="sticky top-0 z-50 w-full bg-[#07090E]/80 backdrop-blur-xl border-b border-white/10 py-3 transition-all">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
        
        {/* Left: Brand & Main Navigation */}
        <div className="flex items-center space-x-8">
          <Link href="/" className="flex items-center group" title="ASCEND Home">
            <Image
              src="/logo.svg"
              alt="ASCEND"
              width={140}
              height={36}
              className="h-8 w-auto object-contain transition-transform group-hover:scale-105"
              priority
            />
          </Link>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center space-x-6 text-xs font-semibold uppercase tracking-wider text-slate-400">
            {navLinks.map((link) => {
              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`transition-all py-1 border-b-2 ${
                    isActive
                      ? 'text-indigo-400 border-indigo-500 font-bold drop-shadow-[0_0_10px_rgba(99,102,241,0.5)]'
                      : 'border-transparent hover:text-slate-200 hover:border-slate-700'
                  }`}
                >
                  {link.label}
                </Link>
              );
            })}
          </nav>
        </div>

        {/* Right: Telemetry & User Profile */}
        <div className="flex items-center space-x-4">
          
          {/* Telemetry Pills (Gold, Streak, Sound) */}
          <div className="hidden sm:flex items-center space-x-2.5 text-xs font-mono">
            <Link
              href="/shop"
              className="px-3 py-1.5 rounded-full bg-amber-950/50 border border-amber-500/40 text-amber-400 flex items-center space-x-1.5 hover:bg-amber-900/60 transition-colors shadow-[0_0_15px_rgba(245,158,11,0.15)]"
            >
              <Coins className="w-3.5 h-3.5 text-amber-400" />
              <span className="font-bold"><AnimatedCounter value={profile.gold} /> G</span>
            </Link>
            
            <div className="px-3 py-1.5 rounded-full bg-rose-950/50 border border-rose-500/40 text-rose-400 flex items-center space-x-1.5 shadow-[0_0_15px_rgba(244,63,94,0.15)]">
              <Flame className="w-3.5 h-3.5 text-rose-400 animate-pulse" />
              <span className="font-bold">{streak.current_streak}D STREAK</span>
            </div>

            <button
              onClick={() => toggleSound(!profile.sound_enabled)}
              className="p-1.5 rounded-full bg-slate-900 border border-slate-800 text-slate-400 hover:text-cyan-400 hover:border-cyan-500/40 transition-colors cursor-pointer"
              aria-label="Toggle Sound Effects"
            >
              {profile.sound_enabled ? <Volume2 className="w-3.5 h-3.5" /> : <VolumeX className="w-3.5 h-3.5" />}
            </button>
          </div>

          {/* User Profile Selector */}
          <div className="relative">
            <button
              onClick={() => setArchetypeDropdownOpen(!archetypeDropdownOpen)}
              className="flex items-center space-x-2.5 p-1.5 rounded-xl bg-slate-900/90 border border-white/10 hover:border-indigo-500/40 transition-all cursor-pointer"
            >
              <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-indigo-500 to-purple-600 text-white font-mono font-bold flex items-center justify-center text-sm shadow-[0_0_10px_rgba(99,102,241,0.4)]">
                {profile.username.charAt(0).toUpperCase()}
              </div>
              <div className="hidden md:flex flex-col items-start text-left">
                <span className="text-xs font-bold text-slate-100 font-sans leading-none">{profile.username}</span>
                <span className="text-[10px] font-mono text-indigo-400 leading-tight mt-0.5">LVL {progress.currentLevel} • {profile.archetype}</span>
              </div>
              <ChevronDown className="w-3.5 h-3.5 text-slate-400" />
            </button>

            {archetypeDropdownOpen && (
              <div className="absolute right-0 mt-2 w-60 rounded-2xl bg-[#0D111A] border border-white/10 shadow-[0_0_30px_rgba(0,0,0,0.5)] p-2 z-50">
                <div className="px-3 py-2 border-b border-slate-800 mb-1">
                  <div className="text-[10px] font-mono text-slate-400 uppercase font-bold">SWITCH DEMO ARCHETYPE</div>
                </div>
                {ARCHETYPE_LIST.map((arch) => (
                  <button
                    key={arch.id}
                    onClick={() => {
                      loginAsDemoUser(arch.id);
                      setArchetypeDropdownOpen(false);
                    }}
                    className={`w-full text-left px-3 py-2 rounded-xl text-xs font-mono flex items-center justify-between transition-colors cursor-pointer ${
                      profile.archetype === arch.id
                        ? 'text-indigo-400 bg-indigo-950/60 font-bold border border-indigo-500/40'
                        : 'text-slate-300 hover:bg-slate-900 hover:text-white'
                    }`}
                  >
                    <span>{arch.name}</span>
                    {profile.archetype === arch.id && <Sparkles className="w-3.5 h-3.5 text-indigo-400" />}
                  </button>
                ))}
                <div className="border-t border-slate-800 mt-1 pt-1">
                  <Link
                    href="/settings"
                    onClick={() => setArchetypeDropdownOpen(false)}
                    className="w-full text-left px-3 py-2 rounded-xl text-xs font-mono text-slate-400 hover:text-slate-200 hover:bg-slate-900 transition-colors flex items-center space-x-2"
                  >
                    <Settings className="w-3.5 h-3.5" />
                    <span>SETTINGS</span>
                  </Link>
                </div>
              </div>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-2 text-slate-300 hover:text-white"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-[#0D111A] border-y border-white/10 mt-3 py-4 px-6 space-y-3">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setMobileMenuOpen(false)}
              className={`block font-mono text-sm uppercase tracking-wider ${
                pathname === link.href ? 'text-indigo-400 font-bold' : 'text-slate-300'
              }`}
            >
              {link.label}
            </Link>
          ))}
        </div>
      )}
    </header>
  );
};
