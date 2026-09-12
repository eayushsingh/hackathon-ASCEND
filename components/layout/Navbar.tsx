'use client';

// ==============================================================================
// ASCEND - TOP HUD NAVIGATION BAR
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
    <header className="sticky top-0 z-40 w-full bg-[#F3F1EC] pt-4 pb-2">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row items-center justify-between">
        {/* Left: Brand & Nav */}
        <div className="flex flex-col md:flex-row items-center md:space-x-8 w-full md:w-auto mb-4 md:mb-0">
          <Link href="/" className="flex items-center group py-1 mb-2 md:mb-0" title="ASCEND Home">
            <Image
              src="/logo.svg"
              alt="ASCEND"
              width={140}
              height={36}
              className="h-8 w-auto object-contain transition-transform group-hover:scale-105"
              priority
            />
          </Link>

          {/* Desktop Nav Links */}
          <nav className="hidden lg:flex items-center text-sm font-display tracking-widest text-[#57534E]">
            {navLinks.map((link, index) => {
              const isActive = pathname === link.href;
              return (
                <React.Fragment key={link.href}>
                  <Link
                    href={link.href}
                    className={`hover:text-[#141210] transition-colors ${
                      isActive ? 'text-[#E85D25]' : ''
                    }`}
                  >
                    {link.label}
                  </Link>
                  {index < navLinks.length - 1 && (
                    <span className="mx-3 text-[#A8A29E] font-sans">/</span>
                  )}
                </React.Fragment>
              );
            })}
          </nav>
        </div>

        {/* Right: Telemetry & User Identity */}
        <div className="flex items-center space-x-6 shrink-0">
          {/* Telemetry (Gold, Streak, Level) - Flattened */}
          <div className="hidden sm:flex items-center space-x-4 text-sm font-display tracking-wider">
            <Link href="/shop" className="flex items-center space-x-1.5 text-[#D97706] hover:text-[#B45309] transition-colors">
              <Coins className="w-4 h-4" />
              <AnimatedCounter value={profile.gold} />
            </Link>
            
            <div className="flex items-center space-x-1.5 text-[#E85D25]">
              <Flame className="w-4 h-4" />
              <span>{streak.current_streak}D</span>
            </div>
            
            <button
              onClick={() => toggleSound(!profile.sound_enabled)}
              className="text-[#57534E] hover:text-[#141210] transition-colors"
              aria-label="Toggle Sound Effects"
            >
              {profile.sound_enabled ? <Volume2 className="w-4 h-4" /> : <VolumeX className="w-4 h-4" />}
            </button>
          </div>

          {/* User Identity Cluster */}
          <div className="relative group">
            <button
              onClick={() => setArchetypeDropdownOpen(!archetypeDropdownOpen)}
              className="flex items-center space-x-3 text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#E85D25]"
            >
              <div className="flex flex-col items-end">
                <span className="font-sans font-bold text-[#141210] leading-tight">{profile.username}</span>
                <span className="font-display text-[#57534E] text-xs tracking-wider">{profile.archetype} • LVL {progress.currentLevel}</span>
              </div>
              <div className="w-10 h-10 rounded-full bg-[#E85D25] text-white flex items-center justify-center font-display text-lg">
                {profile.username.charAt(0).toUpperCase()}
              </div>
            </button>

            {archetypeDropdownOpen && (
              <div className="absolute right-0 mt-2 w-56 rounded-none bg-white border border-[#141210] shadow-lg p-2 z-50">
                <div className="px-3 py-2 border-b border-[#141210]/10 mb-1">
                  <div className="font-display text-xs text-[#57534E] mb-1">SWITCH ARCHETYPE</div>
                </div>
                {ARCHETYPE_LIST.map((arch) => (
                  <button
                    key={arch.id}
                    onClick={() => {
                      loginAsDemoUser(arch.id);
                      setArchetypeDropdownOpen(false);
                    }}
                    className={`w-full text-left px-3 py-2 font-display text-sm flex items-center justify-between transition-colors ${
                      profile.archetype === arch.id
                        ? 'text-[#E85D25] bg-[#F9F8F5]'
                        : 'text-[#141210] hover:bg-[#F3F1EC]'
                    }`}
                  >
                    <span>{arch.name}</span>
                  </button>
                ))}
                <div className="border-t border-[#141210]/10 mt-1 pt-1">
                  <Link
                    href="/settings"
                    onClick={() => setArchetypeDropdownOpen(false)}
                    className="w-full text-left px-3 py-2 font-display text-sm text-[#57534E] hover:text-[#141210] hover:bg-[#F3F1EC] transition-colors flex items-center space-x-2"
                  >
                    <Settings className="w-3.5 h-3.5" />
                    <span>SETTINGS</span>
                  </Link>
                </div>
              </div>
            )}
          </div>

          {/* Mobile Menu Toggle */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden text-[#141210]"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-white border-y border-[#141210]/10 mt-4 py-4 px-4 space-y-4 shadow-sm">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setMobileMenuOpen(false)}
              className={`block font-display text-lg tracking-widest ${
                pathname === link.href ? 'text-[#E85D25]' : 'text-[#141210]'
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
