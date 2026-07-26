'use client';

import React, { useEffect, useState } from 'react';
import { useProgressStore } from '../lib/progress-store';
import { Flame, Activity, Clock, Target, CalendarDays, Award } from 'lucide-react';
import { SEMESTERS } from '../lib/mock-data';

export default function StudentProgressDashboard() {
  const { streak, totalStudyMinutes, quizHistory, moduleProgress, checkAndUpdateStreak } = useProgressStore();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    checkAndUpdateStreak();
  }, [checkAndUpdateStreak]);

  if (!mounted) return null;

  // Calculate average score
  let totalScore = 0;
  let totalMax = 0;
  let recentActivity: { moduleId: string; date: string; score: number; total: number }[] = [];

  Object.entries(quizHistory).forEach(([moduleId, attempts]) => {
    attempts.forEach(a => {
      totalScore += a.score;
      totalMax += a.total;
      recentActivity.push({ moduleId, date: a.date, score: a.score, total: a.total });
    });
  });

  const avgScore = totalMax > 0 ? Math.round((totalScore / totalMax) * 100) : 0;
  let scoreColor = '#10b981'; // Green
  if (avgScore < 60) scoreColor = '#ef4444'; // Red
  else if (avgScore < 80) scoreColor = '#f59e0b'; // Orange

  recentActivity.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
  const last5 = recentActivity.slice(0, 5);

  const hoursStudied = Math.floor(totalStudyMinutes / 60);

  return (
    <div className="p-6 md:p-8 space-y-8 bg-[#030305] text-slate-200 min-h-screen">
      <div className="flex items-center space-x-3 mb-6">
        <Target className="w-8 h-8 text-teal-400" />
        <h1 className="text-3xl font-extrabold text-white">Mon Tableau de Bord</h1>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Streak Card */}
        <div className="bg-slate-900/60 border border-teal-500/20 rounded-2xl p-6 backdrop-blur-xl shadow-lg relative overflow-hidden">
          <div className="absolute -right-10 -top-10 w-40 h-40 bg-orange-500/10 rounded-full blur-3xl pointer-events-none" />
          <div className="flex items-center space-x-3 mb-4">
            <Flame className="w-6 h-6 text-orange-400" />
            <h2 className="text-lg font-bold text-white">Série d'Étude</h2>
          </div>
          <div className="flex items-baseline space-x-2">
            <span className="text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-amber-300">
              {streak}
            </span>
            <span className="text-slate-400 font-medium">jours 🔥</span>
          </div>
          
          {/* Heatmap mock */}
          <div className="mt-6 flex gap-1 flex-wrap">
            {Array.from({ length: 30 }).map((_, i) => (
              <div 
                key={i} 
                className={`w-3 h-3 rounded-sm ${
                  i >= 30 - streak ? 'bg-orange-500/80 shadow-[0_0_8px_rgba(249,115,22,0.5)]' : 'bg-slate-800'
                }`}
              />
            ))}
          </div>
        </div>

        {/* Score Card */}
        <div className="bg-slate-900/60 border border-teal-500/20 rounded-2xl p-6 backdrop-blur-xl shadow-lg flex flex-col items-center relative overflow-hidden">
          <div className="absolute -left-10 -bottom-10 w-40 h-40 bg-teal-500/10 rounded-full blur-3xl pointer-events-none" />
          <h2 className="text-lg font-bold text-white w-full flex items-center space-x-2 mb-2">
            <Award className="w-5 h-5 text-teal-400" />
            <span>Score Moyen QCM</span>
          </h2>
          
          <div className="relative w-32 h-32 flex items-center justify-center mt-2">
            <svg viewBox="0 0 100 100" className="w-full h-full -rotate-90">
              <circle cx="50" cy="50" r="45" fill="none" stroke="#1e293b" strokeWidth="8" />
              <circle 
                cx="50" 
                cy="50" 
                r="45" 
                fill="none" 
                stroke={scoreColor} 
                strokeWidth="8" 
                strokeDasharray={`${avgScore * 2.827} 282.7`} 
                strokeLinecap="round" 
                className="transition-all duration-1000 ease-out"
              />
            </svg>
            <div className="absolute text-2xl font-black text-white">{avgScore}%</div>
          </div>
        </div>

        {/* Study Time Card */}
        <div className="bg-slate-900/60 border border-teal-500/20 rounded-2xl p-6 backdrop-blur-xl shadow-lg relative overflow-hidden">
          <div className="absolute -right-10 -bottom-10 w-40 h-40 bg-purple-500/10 rounded-full blur-3xl pointer-events-none" />
          <div className="flex items-center space-x-3 mb-4">
            <Clock className="w-6 h-6 text-purple-400" />
            <h2 className="text-lg font-bold text-white">Temps d'Étude</h2>
          </div>
          <div className="flex items-baseline space-x-2">
            <span className="text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-indigo-300">
              {hoursStudied}
            </span>
            <span className="text-slate-400 font-medium">heures</span>
          </div>

          <div className="mt-6 flex items-end justify-between h-16 gap-2">
            {/* Mock chart data */}
            {[40, 20, 60, 80, 50, 90, 70].map((h, i) => (
              <div key={i} className="w-full bg-slate-800 rounded-t-md relative group flex-1">
                <div 
                  className="absolute bottom-0 w-full bg-gradient-to-t from-purple-600 to-indigo-400 rounded-t-md transition-all duration-500"
                  style={{ height: `${h}%` }}
                />
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Module Progress Grid */}
        <div className="lg:col-span-2 bg-slate-900/60 border border-teal-500/20 rounded-2xl p-6 backdrop-blur-xl shadow-lg">
          <div className="flex items-center space-x-3 mb-6">
            <Activity className="w-6 h-6 text-cyan-400" />
            <h2 className="text-xl font-bold text-white">Progression par Semestre</h2>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
            {SEMESTERS.map(sem => (
              <div key={sem.id} className="bg-slate-800/50 rounded-xl p-4 border border-slate-700/50">
                <div className="text-sm font-bold text-teal-300 mb-1">{sem.code}</div>
                <div className="text-xs text-slate-400 mb-3 truncate">{sem.title}</div>
                <div className="flex items-center justify-between text-xs mb-1">
                  <span className="text-slate-500">Progression</span>
                  <span className="text-white font-medium">{sem.progressPercent}%</span>
                </div>
                <div className="w-full h-1.5 bg-slate-700 rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-gradient-to-r from-teal-500 to-cyan-400 rounded-full" 
                    style={{ width: `${sem.progressPercent}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Recent Activity */}
        <div className="bg-slate-900/60 border border-teal-500/20 rounded-2xl p-6 backdrop-blur-xl shadow-lg">
          <div className="flex items-center space-x-3 mb-6">
            <CalendarDays className="w-6 h-6 text-pink-400" />
            <h2 className="text-xl font-bold text-white">Activité Récente</h2>
          </div>
          {last5.length === 0 ? (
            <div className="text-slate-500 text-sm text-center py-8">
              Aucune activité récente. Lancez un QCM !
            </div>
          ) : (
            <div className="space-y-4">
              {last5.map((act, i) => (
                <div key={i} className="flex items-center justify-between p-3 rounded-xl bg-slate-800/40 border border-slate-700/50">
                  <div>
                    <div className="text-sm font-bold text-slate-200">Module {act.moduleId}</div>
                    <div className="text-xs text-slate-500">{new Date(act.date).toLocaleDateString()}</div>
                  </div>
                  <div className="text-sm font-bold text-teal-400 bg-teal-900/30 px-3 py-1 rounded-lg">
                    {act.score}/{act.total}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
