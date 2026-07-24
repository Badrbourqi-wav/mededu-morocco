// app/dashboard/page.tsx
'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import DashboardLayout from '../../components/layout/DashboardLayout';
import { useViewStore, AppSection } from '../../lib/view-store';
import { SEMESTERS } from '../../lib/mock-data';
import { CycleType } from '../../types';
import ChapterPage from '../modules/[id]/chapters/[chapterId]/page';
import FinalExamPage from '../modules/[id]/final-exam/page';
import RandomPracticePage from '../practice/random/page';
import SemesterMiniGame from '../../components/SemesterMiniGame';
import FacultyAnnalesSection from '../../components/FacultyAnnalesSection';
import { 
  BookOpen, 
  Activity, 
  GraduationCap, 
  Award, 
  Clock, 
  CheckCircle2, 
  ChevronRight, 
  Sparkles, 
  Flame,
  Search,
  Filter,
  Layers,
  HeartPulse,
  Brain,
  Wind,
  Microscope,
  Stethoscope,
  BarChart3,
  Gamepad2,
  Zap,
  Building2
} from 'lucide-react';

export default function DashboardPage() {
  const [selectedCycle, setSelectedCycle] = useState<CycleType | 'ALL'>('ALL');
  const { activeSection, setActiveSection } = useViewStore();

  const filteredSemesters = SEMESTERS.filter(sem => {
    if (selectedCycle === 'ALL') return true;
    return sem.cycle === selectedCycle;
  });

  if (activeSection === 'CHAPTER_READER') {
    return <ChapterPage />;
  }

  if (activeSection === 'FINAL_EXAM') {
    return <FinalExamPage />;
  }

  if (activeSection === 'RANDOM_PRACTICE') {
    return <RandomPracticePage />;
  }

  if (activeSection === 'MINI_GAME') {
    return (
      <DashboardLayout>
        <SemesterMiniGame semesterCode="S5" />
      </DashboardLayout>
    );
  }

  if (activeSection === 'ANNALES_FACULTES') {
    return (
      <DashboardLayout>
        <FacultyAnnalesSection />
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout>
      {/* Header Banner */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-slate-900 via-slate-800 to-teal-950/80 border border-teal-500/20 p-6 sm:p-8 mb-8 shadow-2xl">
        <div className="absolute right-0 top-0 -mt-8 -mr-8 w-72 h-72 bg-teal-500/10 rounded-full blur-3xl pointer-events-none" />
        
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="max-w-2xl">
            <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-teal-500/10 border border-teal-500/30 text-teal-300 text-xs font-semibold mb-3">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Plateforme Nationale de Médecine au Maroc</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight leading-tight">
              Réforme des Études Médicales <span className="text-transparent bg-clip-text bg-gradient-to-r from-teal-400 to-cyan-300">(Curriculum 6 Ans)</span>
            </h1>
            <p className="text-xs sm:text-sm text-slate-300 mt-2 leading-relaxed">
              Suivi personnalisé des 12 semestres (S1 à S12), banque de QCMs de préparation au PFE et fiches d anatomie clinique de précision.
            </p>
          </div>

          {/* Key Actions */}
          <div className="flex flex-wrap items-center gap-3">
            <button 
              onClick={() => setActiveSection('CHAPTER_READER')}
              className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-teal-500 to-cyan-500 text-slate-950 font-bold text-xs shadow-lg shadow-teal-500/20 hover:opacity-95 transition-opacity flex items-center space-x-2"
            >
              <span>Accéder aux Cours & Leçons</span>
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* KPI Stats Overview */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <div className="glass-panel p-5 rounded-2xl border border-teal-500/20 bg-slate-900/60">
          <div className="flex items-center justify-between text-slate-400 text-xs mb-2">
            <span>Progression Globale</span>
            <Award className="w-4 h-4 text-teal-400" />
          </div>
          <div className="text-2xl font-extrabold text-white">48.5%</div>
          <div className="w-full h-1.5 bg-slate-800 rounded-full mt-3 overflow-hidden">
            <div className="h-full bg-gradient-to-r from-teal-500 to-cyan-400 rounded-full w-[48.5%]" />
          </div>
          <span className="text-[10px] text-slate-400 mt-2 block">6 sur 12 Semestres Validés</span>
        </div>

        <div className="glass-panel p-5 rounded-2xl border border-teal-500/20 bg-slate-900/60">
          <div className="flex items-center justify-between text-slate-400 text-xs mb-2">
            <span>Score Moyen QCMs</span>
            <Flame className="w-4 h-4 text-amber-400" />
          </div>
          <div className="text-2xl font-extrabold text-amber-300">82.4%</div>
          <span className="text-[10px] text-emerald-400 mt-2 inline-flex items-center gap-1">
            <CheckCircle2 className="w-3 h-3" />
            Niveau Recommandé PFE Atteint
          </span>
        </div>

        <div className="glass-panel p-5 rounded-2xl border border-teal-500/20 bg-slate-900/60">
          <div className="flex items-center justify-between text-slate-400 text-xs mb-2">
            <span>Curriculum National</span>
            <Activity className="w-4 h-4 text-cyan-400" />
          </div>
          <div className="text-2xl font-extrabold text-cyan-300">12 Semestres</div>
          <span className="text-[10px] text-slate-400 mt-2 block">S1 à S12 — Réforme 6 Ans</span>
        </div>

        <div className="glass-panel p-5 rounded-2xl border border-teal-500/20 bg-slate-900/60">
          <div className="flex items-center justify-between text-slate-400 text-xs mb-2">
            <span>Heures d Étude Révisées</span>
            <Clock className="w-4 h-4 text-purple-400" />
          </div>
          <div className="text-2xl font-extrabold text-purple-300">240h</div>
          <span className="text-[10px] text-slate-400 mt-2 block">Sur les 450h requises cette année</span>
        </div>
      </div>

      {/* ════ RANDOM PRACTICE HERO CARD ════ */}
      <div className="relative overflow-hidden rounded-2xl border border-teal-500/30 mb-8 shadow-2xl shadow-teal-950/40"
        style={{ background: 'linear-gradient(135deg, rgba(13,148,136,0.22) 0%, rgba(6,182,212,0.12) 50%, rgba(15,23,42,0.98) 100%)' }}
      >
        {/* Glow */}
        <div className="absolute -right-12 -top-12 w-56 h-56 bg-teal-500/15 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -left-8 -bottom-8 w-40 h-40 bg-cyan-500/10 rounded-full blur-2xl pointer-events-none" />

        <div className="relative z-10 p-6 sm:p-8 flex flex-col md:flex-row md:items-center gap-6 justify-between">
          <div className="flex-1 max-w-xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/15 border border-amber-500/30 text-amber-300 text-xs font-bold mb-3">
              <Flame className="w-3.5 h-3.5" />
              <span>Mode Entraînement — Banque Nationale QCM</span>
            </div>
            <h2 className="text-xl sm:text-2xl font-extrabold text-white tracking-tight leading-tight mb-2">
              🎯 Entraînement Aléatoire{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-teal-400 to-cyan-300">
                Cross-Disciplinaire
              </span>
            </h2>
            <p className="text-xs text-slate-300 leading-relaxed mb-4">
              Génère instantanément un QCM personnalisé depuis toute la banque de questions S1-S12 :
              choisissez 10, 20 ou 50 questions filtrées par discipline, semestre ou difficulté PFE.
            </p>

            {/* Discipline pills */}
            <div className="flex flex-wrap gap-2 mb-5">
              {['Cardiologie', 'Neurologie', 'Pneumologie', 'Endocrinologie', 'Hématologie', 'Infectiologie'].map(d => (
                <span key={d} className="px-2.5 py-0.5 rounded-full bg-slate-800/80 border border-slate-700 text-slate-300 text-[10px] font-semibold">
                  {d}
                </span>
              ))}
              <span className="px-2.5 py-0.5 rounded-full bg-slate-800/80 border border-slate-700 text-slate-500 text-[10px]">
                + 8 autres disciplines
              </span>
            </div>

            <div className="flex flex-wrap gap-3">
              <button
                onClick={() => setActiveSection('RANDOM_PRACTICE')}
                className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-teal-500 to-cyan-500 text-slate-900 font-extrabold text-sm shadow-lg shadow-teal-500/30 hover:opacity-95 transition-opacity"
              >
                <Sparkles className="w-4 h-4" />
                Démarrer l'Entraînement
              </button>
              <button
                onClick={() => setActiveSection('RANDOM_PRACTICE')}
                className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-slate-800/80 border border-slate-700 text-slate-200 font-bold text-xs hover:bg-slate-700 transition-colors"
              >
                <Filter className="w-4 h-4 text-teal-400" />
                Configurer les filtres
              </button>
            </div>
          </div>

          {/* Stats Pills */}
          <div className="flex flex-row md:flex-col gap-3 shrink-0">
            {[
              { label: 'QCMs disponibles', value: '30+', color: 'text-teal-300' },
              { label: 'Disciplines', value: '12', color: 'text-cyan-300' },
              { label: '🔥 PFE Critiques', value: '10', color: 'text-amber-300' },
            ].map(s => (
              <div key={s.label} className="bg-slate-900/60 border border-slate-800 rounded-xl px-4 py-3 text-center min-w-[90px]">
                <div className={`text-xl font-extrabold ${s.color}`}>{s.value}</div>
                <div className="text-[10px] text-slate-500 leading-tight">{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ════ 2D MEDICAL ARCADE GAME HERO CARD ════ */}
      <div className="relative overflow-hidden rounded-2xl border border-amber-500/30 mb-8 shadow-2xl shadow-amber-950/30"
        style={{ background: 'linear-gradient(135deg, rgba(120,53,15,0.25) 0%, rgba(245,158,11,0.12) 50%, rgba(15,23,42,0.98) 100%)' }}
      >
        <div className="relative z-10 p-6 sm:p-8 flex flex-col md:flex-row md:items-center gap-6 justify-between">
          <div className="flex-1 max-w-xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/15 border border-amber-500/30 text-amber-300 text-xs font-bold mb-3">
              <Gamepad2 className="w-3.5 h-3.5" />
              <span>Nouveau — Arcade Médical 2D</span>
            </div>
            <h2 className="text-xl sm:text-2xl font-extrabold text-white tracking-tight leading-tight mb-2">
              🎮 Jeu 2D Simulation Clinique
            </h2>
            <p className="text-xs text-slate-300 leading-relaxed mb-4">
              Relevez les défis d urgence vitale en 2D ! Gériez le temps, sauvez les constantes biologiques et testez vos réflexes de médecin en situation réelle.
            </p>
            <button
              onClick={() => setActiveSection('MINI_GAME')}
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-amber-500 to-teal-500 text-slate-950 font-extrabold text-sm shadow-xl shadow-amber-500/20 hover:scale-105 transition-transform"
            >
              <Zap className="w-4 h-4 fill-current" />
              Lancer le Jeu 2D (Arcade Médical)
            </button>
          </div>
          <div className="w-20 h-20 rounded-3xl bg-amber-500/15 border border-amber-500/30 flex items-center justify-center text-amber-400 shrink-0 mx-auto md:mx-0">
            <Gamepad2 className="w-10 h-10" />
          </div>
        </div>
      </div>

      {/* ════ SEMESTER ANALYTICS MINI-CHART ════ */}
      <div className="glass-panel rounded-2xl p-5 border border-slate-700/50 bg-slate-900/60 mb-8">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-sm font-bold text-white flex items-center gap-2">
            <BarChart3 className="w-4 h-4 text-teal-400" />
            Progression par Semestre (S1 → S12)
          </h2>
          <span className="text-[10px] text-slate-400">Réforme 6 Ans — CNOM Maroc</span>
        </div>
        <div className="flex items-end gap-1.5 h-20">
          {SEMESTERS.map((sem, i) => {
            const prog = sem.progressPercent;
            const isCurrent = sem.code === 'S5';
            return (
              <div key={sem.id} className="flex-1 flex flex-col items-center gap-1">
                <div
                  className="w-full rounded-t-md transition-all duration-500 relative"
                  style={{
                    height: `${Math.max(4, (prog / 100) * 72)}px`,
                    background: isCurrent
                      ? 'linear-gradient(180deg, #14b8a6, #0d9488)'
                      : prog > 80
                      ? '#1e4d3d'
                      : prog > 0
                      ? '#164e63'
                      : '#1e293b',
                  }}
                >
                  {isCurrent && (
                    <span className="absolute -top-5 left-1/2 -translate-x-1/2 w-2 h-2 rounded-full bg-teal-400 animate-pulse" />
                  )}
                </div>
                <span className={`text-[9px] font-mono font-bold ${isCurrent ? 'text-teal-400' : 'text-slate-600'}`}>
                  {sem.code}
                </span>
              </div>
            );
          })}
        </div>
      </div>

      {/* Cycle Selection Filter Tabs */}
      <div className="mb-6">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h2 className="text-lg font-bold text-white flex items-center gap-2">
              <Layers className="w-5 h-5 text-teal-400" />
              Parcours des 12 Semestres (S1 à S12)
            </h2>
            <p className="text-xs text-slate-400">Sélectionnez un cycle pour explorer les modules officiels de la réforme marocaine.</p>
          </div>
        </div>

        {/* Tab Buttons */}
        <div className="flex items-center space-x-2 overflow-x-auto pb-2 scrollbar-none">
          <button
            onClick={() => setSelectedCycle('ALL')}
            className={`px-4 py-2 rounded-xl text-xs font-semibold transition-all whitespace-nowrap border ${
              selectedCycle === 'ALL'
                ? 'bg-teal-600 text-white border-teal-400/50 shadow-lg shadow-teal-600/30'
                : 'bg-slate-900/60 text-slate-400 border-slate-800 hover:bg-slate-800'
            }`}
          >
            Tous les Cycles (S1 - S12)
          </button>

          <button
            onClick={() => setSelectedCycle('PRECLINICAL')}
            aria-label="Cycle 1: Préclinique S1 à S4"
            className={`px-4 py-2 rounded-xl text-xs font-semibold transition-all flex items-center space-x-2 whitespace-nowrap border ${
              selectedCycle === 'PRECLINICAL'
                ? 'bg-teal-600 text-white border-teal-400/50 shadow-lg shadow-teal-600/30'
                : 'bg-slate-900/60 text-slate-400 border-slate-800 hover:bg-slate-800'
            }`}
          >
            <BookOpen className="w-3.5 h-3.5 text-cyan-400" />
            <span>Cycle 1: Préclinique (S1 - S4)</span>
          </button>

          <button
            onClick={() => setSelectedCycle('CLINICAL')}
            aria-label="Cycle 2: Clinique S5 à S10"
            className={`px-4 py-2 rounded-xl text-xs font-semibold transition-all flex items-center space-x-2 whitespace-nowrap border ${
              selectedCycle === 'CLINICAL'
                ? 'bg-teal-600 text-white border-teal-400/50 shadow-lg shadow-teal-600/30'
                : 'bg-slate-900/60 text-slate-400 border-slate-800 hover:bg-slate-800'
            }`}
          >
            <Activity className="w-3.5 h-3.5 text-teal-400" />
            <span>Cycle 2: Pathologies & Clinique (S5 - S10)</span>
          </button>

          <button
            onClick={() => setSelectedCycle('INTERNSHIP')}
            aria-label="Cycle 3: Internat et Thèse S11 à S12"
            className={`px-4 py-2 rounded-xl text-xs font-semibold transition-all flex items-center space-x-2 whitespace-nowrap border ${
              selectedCycle === 'INTERNSHIP'
                ? 'bg-teal-600 text-white border-teal-400/50 shadow-lg shadow-teal-600/30'
                : 'bg-slate-900/60 text-slate-400 border-slate-800 hover:bg-slate-800'
            }`}
          >
            <GraduationCap className="w-3.5 h-3.5 text-amber-400" />
            <span>Cycle 3: Internat & Thèse PFE (S11 - S12)</span>
          </button>
        </div>
      </div>

      {/* Semesters & Modules Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
        {filteredSemesters.map((sem) => {
          const isCurrent = sem.code === 'S5';
          return (
            <div 
              key={sem.id} 
              className={`
                glass-card rounded-2xl p-5 relative flex flex-col justify-between transition-all duration-300
                ${isCurrent ? 'border-2 border-teal-500/60 bg-slate-900/90 shadow-xl shadow-teal-950/40' : 'bg-slate-900/50 border-slate-800'}
              `}
            >
              {isCurrent && (
                <div className="absolute -top-3 left-4 px-3 py-0.5 rounded-full bg-gradient-to-r from-teal-500 to-cyan-500 text-slate-950 font-bold text-[10px] uppercase tracking-wider shadow-md">
                  Semestre Actuel
                </div>
              )}

              <div>
                <div className="flex items-center justify-between mb-3">
                  <span className="px-2.5 py-1 rounded-lg bg-slate-800 text-teal-300 text-xs font-bold font-mono">
                    {sem.code}
                  </span>
                  <span className="text-[11px] font-medium text-slate-400">
                    {sem.cycle === 'PRECLINICAL' ? 'Sciences Fondamentales' : sem.cycle === 'CLINICAL' ? 'Pathologies Cliniques' : 'Internat & Stage'}
                  </span>
                </div>

                <h3 className="text-base font-bold text-white mb-2 leading-snug">
                  {sem.title}
                </h3>
                <p className="text-xs text-slate-400 leading-relaxed mb-4">
                  {sem.description}
                </p>
              </div>

              {/* Progress bar and Module Link */}
              <div className="pt-4 border-t border-slate-800/80">
                <div className="flex items-center justify-between text-xs mb-1.5">
                  <span className="text-slate-400">Progression du semestre</span>
                  <span className="font-bold text-teal-400">{sem.progressPercent}%</span>
                </div>
                <div className="w-full h-1.5 bg-slate-800 rounded-full overflow-hidden mb-4">
                  <div 
                    className="h-full bg-gradient-to-r from-teal-500 to-cyan-400 rounded-full transition-all duration-500" 
                    style={{ width: `${sem.progressPercent}%` }}
                  />
                </div>

                <button
                  onClick={() => setActiveSection('CHAPTER_READER')}
                  className="w-full py-2 px-3 rounded-xl bg-slate-800 hover:bg-teal-600/30 text-slate-200 hover:text-white border border-slate-700/60 hover:border-teal-500/50 text-xs font-semibold transition-all flex items-center justify-center space-x-2"
                >
                  <span>Accéder aux Modules du {sem.code}</span>
                  <ChevronRight className="w-3.5 h-3.5 text-teal-400" />
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </DashboardLayout>
  );
}
