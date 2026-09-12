'use client';

// ==============================================================================
// ASCEND - LOGIN AUTHENTICATION
// Clean Minimalist Theme
// ==============================================================================

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { createClient, isSupabaseConfigured } from '@/lib/supabase/client';
import { useGame } from '@/lib/context/game-context';
import { ArrowRight, Lock, Mail, Play, AlertCircle } from 'lucide-react';

export default function LoginPage() {
  const router = useRouter();
  const { loginAsDemoUser } = useGame();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password || isLoading) return;

    setIsLoading(true);
    setErrorMsg(null);

    try {
      if (isSupabaseConfigured()) {
        const supabase = createClient();
        const { error } = await supabase.auth.signInWithPassword({
          email,
          password,
        });

        if (error) {
          if (error.message.includes('Invalid login credentials')) {
            setErrorMsg('Incorrect email or password. Please try again.');
          } else if (error.message.includes('Email not confirmed')) {
            setErrorMsg('Please confirm your email address before signing in.');
          } else {
            setErrorMsg(error.message);
          }
          setIsLoading(false);
          return;
        }

        router.push('/dashboard');
      } else {
        // Fallback demo login
        loginAsDemoUser('Cyber Mage');
        router.push('/dashboard');
      }
    } catch (err: unknown) {
      setErrorMsg((err as Error).message || 'An unexpected error occurred. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleDemoAccess = () => {
    loginAsDemoUser('Cyber Mage');
    router.push('/dashboard');
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

        <h1 className="text-2xl font-bold text-[#1D1D1F] tracking-tight">Welcome Back</h1>
        <p className="text-sm font-medium text-[#86868B] mt-1.5">Sign in to synchronize your RPG progression</p>

        {errorMsg && (
          <div className="mt-6 p-4 rounded-xl border border-red-200 bg-red-50 text-red-700 text-xs font-medium text-left flex items-start space-x-2.5">
            <AlertCircle className="w-4 h-4 text-red-500 shrink-0 mt-0.5" />
            <span>{errorMsg}</span>
          </div>
        )}

        <form onSubmit={handleLogin} className="space-y-4 mt-6 text-left">
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

          <button
            type="submit"
            disabled={isLoading}
            className="w-full py-3 mt-2 bg-gradient-to-r from-[#FF5E3A] to-[#FF2A6D] text-white font-semibold text-sm rounded-xl shadow-sm hover:opacity-95 transition-all flex items-center justify-center space-x-2 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <span>{isLoading ? 'Signing In...' : 'Sign In'}</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </form>

        {/* Instant Demo Access Button */}
        <div className="mt-6 pt-6 border-t border-[#F5F5F7]">
          <button
            onClick={handleDemoAccess}
            type="button"
            className="w-full py-2.5 bg-[#F5F5F7] hover:bg-[#EAEAEB] border border-[#E5E5E7] text-[#1D1D1F] font-semibold text-xs rounded-xl transition-all flex items-center justify-center space-x-2"
          >
            <Play className="w-3.5 h-3.5 text-[#FF5E3A]" />
            <span>Launch Instant Demo Guest Mode</span>
          </button>
        </div>

        <div className="mt-6 text-xs text-[#86868B]">
          Don't have an account?{' '}
          <Link href="/auth/signup" className="text-[#FF5E3A] font-semibold hover:underline">
            Create Hero
          </Link>
        </div>
      </div>
    </div>
  );
}
