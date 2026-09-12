'use client';

// ==============================================================================
// ASCEND - SIGNUP AUTHENTICATION
// Clean Minimalist Theme
// ==============================================================================

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { createClient, isSupabaseConfigured } from '@/lib/supabase/client';
import { useGame } from '@/lib/context/game-context';
import { ArrowRight, UserPlus, Mail, Lock, User, AlertCircle } from 'lucide-react';
import { ARCHETYPE_LIST } from '@/lib/progression/archetypes';
import { Archetype } from '@/types/rpg';

export default function SignupPage() {
  const router = useRouter();
  const { loginAsDemoUser } = useGame();

  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [archetype, setArchetype] = useState<Archetype>('Cyber Mage');
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password || !username || isLoading) return;

    if (password.length < 6) {
      setErrorMsg('Password must be at least 6 characters long.');
      return;
    }

    setIsLoading(true);
    setErrorMsg(null);

    try {
      if (isSupabaseConfigured()) {
        const supabase = createClient();
        const { error } = await supabase.auth.signUp({
          email,
          password,
          options: {
            data: {
              username,
              archetype,
            },
          },
        });

        if (error) {
          if (error.message.includes('User already registered')) {
            setErrorMsg('An account with this email already exists. Please sign in.');
          } else {
            setErrorMsg(error.message);
          }
          setIsLoading(false);
          return;
        }

        router.push('/dashboard');
      } else {
        loginAsDemoUser(archetype);
        router.push('/dashboard');
      }
    } catch (err: unknown) {
      setErrorMsg((err as Error).message || 'An unexpected error occurred. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto py-16 px-4">
      <div className="p-8 sm:p-10 bg-white border border-[#E5E5E7] rounded-3xl shadow-sm text-center relative">
        {/* Top Logo */}
        <div className="flex justify-center mb-6">
          <Link href="/">
            <div className="font-sans font-black text-3xl tracking-tight text-[#1D1D1F]">ASCEND</div>
          </Link>
        </div>

        <h1 className="text-2xl font-bold text-[#1D1D1F] tracking-tight">Forge Your Hero</h1>
        <p className="text-sm font-medium text-[#86868B] mt-1.5">Begin your real-life RPG progression journey</p>

        {errorMsg && (
          <div className="mt-6 p-4 rounded-xl border border-red-200 bg-red-50 text-red-700 text-xs font-medium text-left flex items-start space-x-2.5">
            <AlertCircle className="w-4 h-4 text-red-500 shrink-0 mt-0.5" />
            <span>{errorMsg}</span>
          </div>
        )}

        <form onSubmit={handleSignup} className="space-y-4 mt-6 text-left">
          <div>
            <label className="block text-xs font-semibold text-[#1D1D1F] mb-1.5">
              Hero Codename / Username
            </label>
            <div className="relative">
              <User className="w-4 h-4 text-[#86868B] absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
                placeholder="e.g. Kaelen Vance"
                className="w-full pl-10 pr-4 py-2.5 bg-[#F5F5F7] border border-[#E5E5E7] rounded-xl text-[#1D1D1F] text-sm placeholder-[#86868B] focus:outline-none focus:border-[#FF5E3A] focus:bg-white transition-all"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-[#1D1D1F] mb-1.5">
              Email Address
            </label>
            <div className="relative">
              <Mail className="w-4 h-4 text-[#86868B] absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                placeholder="hero@ascend.rpg"
                className="w-full pl-10 pr-4 py-2.5 bg-[#F5F5F7] border border-[#E5E5E7] rounded-xl text-[#1D1D1F] text-sm placeholder-[#86868B] focus:outline-none focus:border-[#FF5E3A] focus:bg-white transition-all"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-[#1D1D1F] mb-1.5">
              Password
            </label>
            <div className="relative">
              <Lock className="w-4 h-4 text-[#86868B] absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                placeholder="••••••••••••"
                className="w-full pl-10 pr-4 py-2.5 bg-[#F5F5F7] border border-[#E5E5E7] rounded-xl text-[#1D1D1F] text-sm placeholder-[#86868B] focus:outline-none focus:border-[#FF5E3A] focus:bg-white transition-all"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-[#1D1D1F] mb-1.5">
              Starting Archetype
            </label>
            <select
              value={archetype}
              onChange={(e) => setArchetype(e.target.value as Archetype)}
              className="w-full px-3.5 py-2.5 bg-[#F5F5F7] border border-[#E5E5E7] rounded-xl text-[#1D1D1F] text-sm focus:outline-none focus:border-[#FF5E3A] focus:bg-white transition-all cursor-pointer"
            >
              {ARCHETYPE_LIST.map((arch) => (
                <option key={arch.id} value={arch.id}>
                  {arch.name} ({arch.role})
                </option>
              ))}
            </select>
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="w-full py-3 mt-2 bg-gradient-to-r from-[#FF5E3A] to-[#FF2A6D] text-white font-semibold text-sm rounded-xl shadow-sm hover:opacity-95 transition-all flex items-center justify-center space-x-2 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <span>{isLoading ? 'Creating Hero...' : 'Forge Hero Account'}</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </form>

        <div className="mt-6 text-xs text-[#86868B]">
          Already have an account?{' '}
          <Link href="/auth/login" className="text-[#FF5E3A] font-semibold hover:underline">
            Sign In
          </Link>
        </div>
      </div>
    </div>
  );
}
