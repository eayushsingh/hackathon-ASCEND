'use client';

// ==============================================================================
// ASCEND - APPLE-INSPIRED NAVIGATION BAR
// Clean, bright floating header with soft shadows and precise contrast
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
    { href: '/dashboard', label: 'Dashboard' },
    { href: '/quests', label: 'Quests' },
    { href: '/calendar', label: 'Calendar' },
    { href: '/character', label: 'Character' },
    { href: '/leaderboard', label: 'Leaderboard' },
    { href: '/analytics', label: 'Analytics' },
    { href: '/shop', label: 'Shop' },
    { href: '/inventory', label: 'Inventory' },
    { href: '/achievements', label: 'Trophies' },
  ];

  return (
    <header className="sticky top-0 z-50 w-full bg-white/85 backdrop-blur-md border-b border-[#E5E5EA] py-3.5 transition-all">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
        
        {/* Left: Brand Logo & Navigation */}
        <div className="flex items-center space-x-8">
          <Link href="/" className="flex items-center group transition-transform hover:opacity-90" title="ASCEND Home">
            <Image
              src="/logo.svg"
              alt="ASCEND"
              width={140}
              height={38}
              className="h-8.5 sm:h-9 w-auto object-contain"
              priority
            />
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-6 text-sm font-medium text-[#6E6E73]">
            {navLinks.map((link) => {
              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`transition-colors py-1 ${
                    isActive
                      ? 'text-[#1D1D1F] font-semibold border-b-2 border-[#7C3AED]'
                      : 'hover:text-[#1D1D1F]'
                  }`}
                >
                  {link.label}
                </Link>
              );
            })}
          </nav>
        </div>

        {/* Right: Telemetry Badges & Profile */}
        <div className="flex items-center space-x-3">
          
          {/* Telemetry Pills */}
          <div className="hidden sm:flex items-center space-x-2 text-xs font-semibold">
            <Link
              href="/shop"
              className="px-3 py-1.5 rounded-full bg-[#FAF9F5] border border-[#E5E5EA] text-[#C9A227] flex items-center space-x-1.5 hover:bg-[#F2F2F7] transition-colors"
            >
              <Coins className="w-4 h-4 text-[#C9A227]" />
              <span className="font-bold"><AnimatedCounter value={profile.gold} /> G</span>
            </Link>
            
            <div className="px-3 py-1.5 rounded-full bg-[#FAF9F5] border border-[#E5E5EA] text-[#7C3AED] flex items-center space-x-1.5">
              <Flame className="w-4 h-4 text-[#7C3AED]" />
              <span>{streak.current_streak}d Streak</span>
            </div>

            <button
              onClick={() => toggleSound(!profile.sound_enabled)}
              className="p-2 rounded-full bg-[#F2F2F7] text-[#6E6E73] hover:text-[#1D1D1F] transition-colors cursor-pointer"
              aria-label="Toggle Sound Effects"
            >
              {profile.sound_enabled ? <Volume2 className="w-4 h-4" /> : <VolumeX className="w-4 h-4" />}
            </button>
          </div>

          {/* User Profile Trigger */}
          <div className="relative">
            <button
              onClick={() => setArchetypeDropdownOpen(!archetypeDropdownOpen)}
              className="flex items-center space-x-2.5 p-1.5 pr-3 rounded-full bg-[#F2F2F7] hover:bg-[#E5E5EA] transition-all cursor-pointer border border-[#E5E5EA]"
            >
              <div className="w-7 h-7 rounded-full btn-primary-gradient flex items-center justify-center text-white font-bold text-xs">
                {profile.username.charAt(0).toUpperCase()}
              </div>
              <div className="hidden md:flex flex-col items-start text-left">
                <span className="text-xs font-semibold text-[#1D1D1F] leading-none">{profile.username}</span>
                <span className="text-[11px] text-[#6E6E73] leading-tight mt-0.5">Lvl {progress.currentLevel} • {profile.archetype}</span>
              </div>
              <ChevronDown className="w-3.5 h-3.5 text-[#6E6E73]" />
            </button>

            {archetypeDropdownOpen && (
              <div className="absolute right-0 mt-2 w-60 rounded-2xl bg-white border border-[#E5E5EA] shadow-[0_8px_24px_rgba(0,0,0,0.1)] p-2 z-50">
                <div className="px-3 py-2 border-b border-[#E5E5EA] mb-1">
                  <div className="text-xs font-semibold text-[#8E8E93] uppercase tracking-wider">Switch Archetype</div>
                </div>
                {ARCHETYPE_LIST.map((arch) => (
                  <button
                    key={arch.id}
                    onClick={() => {
                      loginAsDemoUser(arch.id);
                      setArchetypeDropdownOpen(false);
                    }}
                    className={`w-full text-left px-3 py-2 rounded-xl text-xs flex items-center justify-between transition-colors cursor-pointer ${
                      profile.archetype === arch.id
                        ? 'text-[#7C3AED] bg-[#F2F2F7] font-semibold'
                        : 'text-[#1D1D1F] hover:bg-[#FAF9F5]'
                    }`}
                  >
                    <span>{arch.name}</span>
                    {profile.archetype === arch.id && <Sparkles className="w-3.5 h-3.5 text-[#7C3AED]" />}
                  </button>
                ))}
                <div className="border-t border-[#E5E5EA] mt-1 pt-1">
                  <Link
                    href="/settings"
                    onClick={() => setArchetypeDropdownOpen(false)}
                    className="w-full text-left px-3 py-2 rounded-xl text-xs text-[#6E6E73] hover:text-[#1D1D1F] hover:bg-[#FAF9F5] transition-colors flex items-center space-x-2"
                  >
                    <Settings className="w-3.5 h-3.5" />
                    <span>Settings</span>
                  </Link>
                </div>
              </div>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-2 text-[#1D1D1F]"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-white border-b border-[#E5E5EA] mt-3 py-4 px-6 space-y-3">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setMobileMenuOpen(false)}
              className={`block text-sm font-medium ${
                pathname === link.href ? 'text-[#7C3AED] font-semibold' : 'text-[#1D1D1F]'
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
