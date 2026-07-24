'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useViewStore, AppSection } from '../../lib/view-store';
import { 
  Stethoscope, 
  BookOpen, 
  GraduationCap, 
  Brain, 
  Activity, 
  Search, 
  Bell, 
  User, 
  ShieldCheck, 
  ChevronRight,
  Sparkles,
  Layers,
  Award,
  Menu,
  X,
  Gamepad2,
  Building2
} from 'lucide-react';

interface DashboardLayoutProps {
  children: React.ReactNode;
  activeCycle?: string;
  onSectionChange?: (section: AppSection) => void;
}

export default function DashboardLayout({ children, activeCycle, onSectionChange }: DashboardLayoutProps) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const pathname = usePathname();
  const { activeSection, setActiveSection } = useViewStore();

  const handleNavClick = (section: AppSection) => {
    setActiveSection(section);
    if (onSectionChange) onSectionChange(section);
    setSidebarOpen(false);
  };

  return (
    <div className="min-h-screen bg-[#0f172a] text-slate-100 flex flex-col lg:flex-row">
      {/* Mobile Top Bar */}
      <div className="lg:hidden flex items-center justify-between px-4 py-3 bg-slate-900/90 border-b border-slate-800 sticky top-0 z-50 backdrop-blur-md">
        <div className="flex items-center space-x-2">
          <div className="w-8 h-8 rounded-lg bg-teal-600 flex items-center justify-center text-white shadow-lg shadow-teal-500/30">
            <Stethoscope className="w-5 h-5" />
          </div>
          <div>
            <span className="font-bold text-white tracking-wide">MedEdu</span>
            <span className="text-teal-400 font-bold ml-1">Morocco</span>
          </div>
        </div>
        <button 
          onClick={() => setSidebarOpen(!sidebarOpen)}
          className="p-2 text-slate-400 hover:text-white rounded-lg bg-slate-800/60"
        >
          {sidebarOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Sidebar Navigation */}
      <aside className={`
        fixed inset-y-0 left-0 z-40 w-72 bg-slate-900/80 backdrop-blur-xl border-r border-slate-800/80 flex flex-col justify-between transition-transform duration-300 ease-in-out
        lg:translate-x-0 lg:static lg:w-72
        ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'}
      `}>
        <div className="p-6">
          {/* Logo & Reform Badge */}
          <div 
            onClick={() => handleNavClick('DASHBOARD')}
            className="flex items-center space-x-3 mb-6 cursor-pointer group"
          >
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-teal-500 to-cyan-600 flex items-center justify-center text-white shadow-lg shadow-teal-500/25 group-hover:scale-105 transition-transform">
              <Stethoscope className="w-6 h-6" />
            </div>
            <div>
              <div className="flex items-center space-x-1.5">
                <span className="font-extrabold text-lg tracking-tight text-white">MedEdu</span>
                <span className="text-teal-400 font-extrabold text-lg">Morocco</span>
              </div>
              <div className="flex items-center space-x-1 mt-0.5">
                <span className="inline-block w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
                <span className="text-[10px] font-semibold tracking-wider uppercase text-teal-300/90 bg-teal-950/60 px-2 py-0.5 rounded-full border border-teal-500/30">
                  Réforme 6 Ans (PFE)
                </span>
              </div>
            </div>
          </div>

          {/* Quick Stats Pill */}
          <div className="glass-card rounded-xl p-3.5 mb-6 border border-teal-500/20 bg-slate-900/60">
            <div className="flex items-center justify-between text-xs text-slate-400 mb-1">
              <span>Faculté de Médecine</span>
              <span className="text-teal-400 font-bold">FMPR Rabat</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm font-semibold text-slate-200">Progression globale</span>
              <span className="text-xs font-bold text-teal-400">48%</span>
            </div>
            <div className="w-full h-1.5 bg-slate-800 rounded-full mt-2 overflow-hidden">
              <div className="h-full bg-gradient-to-r from-teal-500 to-cyan-400 rounded-full w-[48%]" />
            </div>
          </div>

          {/* Navigation Links */}
          <nav className="space-y-1.5">
            <div className="px-3 text-[11px] font-bold tracking-wider text-slate-500 uppercase mb-2">
              CURRICULUM NATIONAL
            </div>

            <button 
              onClick={() => handleNavClick('DASHBOARD')} 
              className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl font-medium transition-all ${
                activeSection === 'DASHBOARD' && pathname === '/dashboard'
                  ? 'bg-teal-500/15 text-teal-300 border border-teal-500/30 shadow-md shadow-teal-950/40 font-bold'
                  : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/60'
              } group`}
            >
              <div className="flex items-center space-x-3">
                <Layers className={`w-5 h-5 ${activeSection === 'DASHBOARD' ? 'text-teal-400' : 'text-slate-400 group-hover:text-teal-400'}`} />
                <span>Tableau de Bord</span>
              </div>
              <ChevronRight className="w-4 h-4 text-teal-400/60 group-hover:translate-x-0.5 transition-transform" />
            </button>

            <div className="pt-2 px-3 text-[11px] font-bold tracking-wider text-slate-500 uppercase mb-1">
              CYCLES D ÉTUDES (S1-S12)
            </div>

            <button onClick={() => handleNavClick('DASHBOARD')} className="w-full flex items-center space-x-3 px-3.5 py-2 rounded-xl text-slate-400 hover:text-slate-200 hover:bg-slate-800/60 transition-colors text-sm text-left">
              <BookOpen className="w-4 h-4 text-cyan-400" />
              <span>Cycle 1 (S1 - S4)</span>
            </button>

            <button onClick={() => handleNavClick('DASHBOARD')} className="w-full flex items-center space-x-3 px-3.5 py-2 rounded-xl text-slate-400 hover:text-slate-200 hover:bg-slate-800/60 transition-colors text-sm text-left">
              <Activity className="w-4 h-4 text-teal-400" />
              <span>Cycle 2 (S5 - S10)</span>
            </button>

            <button onClick={() => handleNavClick('DASHBOARD')} className="w-full flex items-center space-x-3 px-3.5 py-2 rounded-xl text-slate-400 hover:text-slate-200 hover:bg-slate-800/60 transition-colors text-sm text-left">
              <GraduationCap className="w-4 h-4 text-amber-400" />
              <span>Cycle 3 (S11 - S12)</span>
            </button>

            <div className="pt-3 px-3 text-[11px] font-bold tracking-wider text-slate-500 uppercase mb-1">
              ENTRAÎNEMENT & OUTILS
            </div>

            <button 
              onClick={() => handleNavClick('ANNALES_FACULTES')}
              className={`w-full flex items-center space-x-3 px-3.5 py-2.5 rounded-xl transition-all text-xs text-left group ${
                activeSection === 'ANNALES_FACULTES'
                  ? 'bg-purple-500/20 text-purple-300 border border-purple-500/40 font-extrabold shadow-lg shadow-purple-500/20'
                  : 'text-slate-300 hover:text-white hover:bg-slate-800/80'
              }`}
            >
              <Building2 className="w-4 h-4 text-purple-400 shrink-0" />
              <span className="font-bold">🏛️ Annales & Épreuves (FMP Maroc)</span>
              <span className="ml-auto text-[9px] font-bold px-1.5 py-0.5 rounded-full bg-purple-500/20 text-purple-300 border border-purple-500/30">PFE</span>
            </button>

            <button 
              onClick={() => handleNavClick('MINI_GAME')}
              className={`w-full flex items-center space-x-3 px-3.5 py-2.5 rounded-xl transition-all text-xs text-left group ${
                activeSection === 'MINI_GAME'
                  ? 'bg-amber-500/20 text-amber-300 border border-amber-500/40 font-extrabold shadow-lg shadow-amber-500/20'
                  : 'text-slate-300 hover:text-white hover:bg-slate-800/80'
              }`}
            >
              <Gamepad2 className="w-4 h-4 text-amber-400 shrink-0" />
              <span className="font-bold">🎮 Jeu 2D Simulation Clinique</span>
              <span className="ml-auto text-[9px] font-bold px-1.5 py-0.5 rounded-full bg-amber-500/20 text-amber-300 border border-amber-500/30">ARCADE</span>
            </button>

            <button 
              onClick={() => handleNavClick('RANDOM_PRACTICE')}
              className={`w-full flex items-center space-x-3 px-3.5 py-2 rounded-xl transition-all text-sm group ${
                activeSection === 'RANDOM_PRACTICE'
                  ? 'bg-teal-500/15 text-teal-300 border border-teal-500/30 font-bold'
                  : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/60'
              }`}
            >
              <Sparkles className="w-4 h-4 text-teal-400" />
              <span>🎯 Entraînement Aléatoire</span>
              <span className="ml-auto text-[9px] font-bold px-1.5 py-0.5 rounded-full bg-teal-500/20 text-teal-300 border border-teal-500/30">NEW</span>
            </button>

            <button 
              onClick={() => handleNavClick('CHAPTER_READER')}
              className={`w-full flex items-center space-x-3 px-3.5 py-2 rounded-xl transition-all text-sm ${
                activeSection === 'CHAPTER_READER'
                  ? 'bg-teal-500/15 text-teal-300 border border-teal-500/30 font-bold'
                  : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/60'
              }`}
            >
              <Brain className="w-4 h-4 text-purple-400" />
              <span>Cours & Banque QCMs</span>
            </button>

            <button 
              onClick={() => handleNavClick('FINAL_EXAM')}
              className={`w-full flex items-center space-x-3 px-3.5 py-2 rounded-xl transition-all text-sm ${
                activeSection === 'FINAL_EXAM'
                  ? 'bg-teal-500/15 text-teal-300 border border-teal-500/30 font-bold'
                  : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/60'
              }`}
            >
              <Award className="w-4 h-4 text-amber-400" />
              <span>Examen Final — S5</span>
            </button>

            <button 
              onClick={() => handleNavClick('CHAPTER_READER')}
              className="w-full flex items-center space-x-3 px-3.5 py-2 rounded-xl text-slate-400 hover:text-slate-200 hover:bg-slate-800/60 transition-colors text-sm text-left"
            >
              <Sparkles className="w-4 h-4 text-rose-400" />
              <span>Anatomie & Schémas 3D</span>
            </button>
          </nav>
        </div>

        {/* User Footer Profile */}
        <div className="p-4 border-t border-slate-800/80 bg-slate-900/40">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="relative">
                <div className="w-9 h-9 rounded-full bg-gradient-to-tr from-teal-500 to-emerald-400 flex items-center justify-center font-bold text-slate-900 text-sm ring-2 ring-teal-500/30">
                  BB
                </div>
                <span className="absolute bottom-0 right-0 w-2.5 h-2.5 rounded-full bg-emerald-500 ring-2 ring-slate-900"></span>
              </div>
              <div className="text-left">
                <p className="text-xs font-semibold text-slate-200">Badr Bourqi</p>
                <p className="text-[10px] text-slate-400">Étudiant en Médecine (6 Ans)</p>
              </div>
            </div>
            <ShieldCheck className="w-5 h-5 text-teal-400/80" />
          </div>
        </div>
      </aside>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Sticky Top Bar */}
        <header className="sticky top-0 z-30 h-16 bg-slate-900/70 backdrop-blur-md border-b border-slate-800/80 px-6 flex items-center justify-between">
          {/* Search Bar */}
          <div className="relative w-full max-w-md hidden sm:block">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <input 
              type="text" 
              placeholder="Rechercher un module, cours, QCM ou item du PFE..." 
              className="w-full bg-slate-950/60 border border-slate-800 rounded-xl pl-10 pr-4 py-2 text-xs text-slate-200 placeholder-slate-500 focus:outline-none focus:border-teal-500/60 transition-colors"
            />
          </div>

          {/* Right Header Controls */}
          <div className="flex items-center space-x-4 ml-auto">
            <div className="hidden md:flex items-center space-x-2 bg-slate-950/60 border border-slate-800 px-3 py-1.5 rounded-xl text-xs">
              <span className="w-2 h-2 rounded-full bg-teal-400 animate-ping"></span>
              <span className="text-slate-400">Étudiant:</span>
              <span className="font-semibold text-teal-300">Badr Bourqi (FMPR)</span>
            </div>

            <button className="relative p-2 rounded-xl bg-slate-800/60 text-slate-300 hover:text-white border border-slate-700/50 transition-colors">
              <Bell className="w-4 h-4" />
              <span className="absolute top-1 right-1 w-2 h-2 rounded-full bg-teal-400"></span>
            </button>
          </div>
        </header>

        {/* Dynamic Main Body Canvas */}
        <main className="flex-1 p-4 sm:p-6 lg:p-8 max-w-7xl w-full mx-auto">
          {children}
        </main>
      </div>
    </div>
  );
}
