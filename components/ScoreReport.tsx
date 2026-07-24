'use client';
// components/ScoreReport.tsx
// Animated Score Report + Weakness Analysis — MedEdu Morocco

import React from 'react';
import { motion } from 'framer-motion';
import { CheckCircle2, XCircle, Flame, TrendingUp, TrendingDown, AlertTriangle, Award, BookOpen, RotateCcw, ArrowRight } from 'lucide-react';
import Link from 'next/link';

interface QuestionResult {
  id: string;
  disciplineTag: string;
  difficulty: 'EASY' | 'MEDIUM' | 'HARD' | 'HIGH_YIELD_PFE';
  isCorrect: boolean;
  prompt: string;
  selectedOption: string;
  correctOption: string;
  explanation: string;
}

interface ScoreReportProps {
  score: number; // 0-100
  totalQuestions: number;
  correctCount: number;
  timeTakenSeconds?: number;
  results: QuestionResult[];
  examTitle: string;
  onRetry?: () => void;
  passingScore?: number;
}

const difficultyColors: Record<string, string> = {
  EASY: '#10b981',
  MEDIUM: '#0d9488',
  HARD: '#8b5cf6',
  HIGH_YIELD_PFE: '#f59e0b',
};

export default function ScoreReport({
  score,
  totalQuestions,
  correctCount,
  timeTakenSeconds,
  results,
  examTitle,
  onRetry,
  passingScore = 70,
}: ScoreReportProps) {
  const passed = score >= passingScore;
  const incorrectCount = totalQuestions - correctCount;

  // Aggregate stats by difficulty
  const difficultyStats = (['EASY', 'MEDIUM', 'HARD', 'HIGH_YIELD_PFE'] as const).map(diff => {
    const qsOfDiff = results.filter(r => r.difficulty === diff);
    const correctOfDiff = qsOfDiff.filter(r => r.isCorrect).length;
    return {
      difficulty: diff,
      total: qsOfDiff.length,
      correct: correctOfDiff,
      accuracy: qsOfDiff.length > 0 ? Math.round((correctOfDiff / qsOfDiff.length) * 100) : null,
    };
  }).filter(s => s.total > 0);

  // Aggregate stats by discipline
  const disciplineStats = Object.entries(
    results.reduce<Record<string, { total: number; correct: number }>>((acc, r) => {
      if (!acc[r.disciplineTag]) acc[r.disciplineTag] = { total: 0, correct: 0 };
      acc[r.disciplineTag].total++;
      if (r.isCorrect) acc[r.disciplineTag].correct++;
      return acc;
    }, {})
  )
    .map(([tag, stats]) => ({
      tag,
      ...stats,
      accuracy: Math.round((stats.correct / stats.total) * 100),
    }))
    .sort((a, b) => a.accuracy - b.accuracy);

  const formatTime = (secs?: number) => {
    if (!secs) return null;
    const m = Math.floor(secs / 60);
    const s = secs % 60;
    return `${m}m ${String(s).padStart(2, '0')}s`;
  };

  const difficultyLabel: Record<string, string> = {
    EASY: 'Facile',
    MEDIUM: 'Moyen',
    HARD: 'Difficile',
    HIGH_YIELD_PFE: 'PFE Critique',
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="space-y-6"
    >
      {/* ── HERO SCORE CARD ── */}
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ type: 'spring', stiffness: 120, damping: 14 }}
        className="relative overflow-hidden rounded-3xl p-8 text-center border"
        style={{
          background: passed
            ? 'linear-gradient(135deg, rgba(5,150,105,0.25) 0%, rgba(15,23,42,0.95) 100%)'
            : 'linear-gradient(135deg, rgba(159,18,57,0.25) 0%, rgba(15,23,42,0.95) 100%)',
          borderColor: passed ? 'rgba(16,185,129,0.4)' : 'rgba(244,63,94,0.4)',
          boxShadow: passed
            ? '0 20px 60px -15px rgba(16,185,129,0.3)'
            : '0 20px 60px -15px rgba(244,63,94,0.3)',
        }}
      >
        {/* Decorative glow */}
        <div
          className="absolute top-0 left-1/2 -translate-x-1/2 w-64 h-32 blur-3xl opacity-30 pointer-events-none"
          style={{ background: passed ? '#10b981' : '#f43f5e' }}
        />

        <div className="relative z-10">
          {/* Icon */}
          <motion.div
            initial={{ scale: 0, rotate: -20 }}
            animate={{ scale: 1, rotate: 0 }}
            transition={{ type: 'spring', stiffness: 180, damping: 12, delay: 0.2 }}
            className="w-16 h-16 rounded-2xl mx-auto mb-4 flex items-center justify-center"
            style={{
              background: passed ? 'rgba(16,185,129,0.2)' : 'rgba(244,63,94,0.2)',
              border: `2px solid ${passed ? 'rgba(16,185,129,0.5)' : 'rgba(244,63,94,0.5)'}`,
            }}
          >
            {passed ? (
              <Award className="w-9 h-9 text-emerald-400" />
            ) : (
              <BookOpen className="w-9 h-9 text-rose-400" />
            )}
          </motion.div>

          {/* Score Number (animated count) */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            <div
              className="text-6xl font-extrabold leading-none mb-1 font-mono"
              style={{ color: passed ? '#10b981' : '#f43f5e' }}
            >
              {score.toFixed(0)}%
            </div>
            <div className="text-slate-400 text-sm mb-2">{examTitle}</div>
            <div
              className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full font-bold text-sm border"
              style={{
                background: passed ? 'rgba(16,185,129,0.15)' : 'rgba(244,63,94,0.15)',
                borderColor: passed ? 'rgba(16,185,129,0.4)' : 'rgba(244,63,94,0.4)',
                color: passed ? '#6ee7b7' : '#fca5a5',
              }}
            >
              {passed ? (
                <><CheckCircle2 className="w-4 h-4" /> Module Validé — Seuil {passingScore}% atteint</>
              ) : (
                <><XCircle className="w-4 h-4" /> À Réviser — Seuil {passingScore}% requis</>
              )}
            </div>
          </motion.div>

          {/* Quick stats */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="flex items-center justify-center gap-6 mt-6 pt-6 border-t border-white/10"
          >
            <div className="text-center">
              <div className="text-2xl font-bold text-emerald-400">{correctCount}</div>
              <div className="text-[10px] text-slate-400">Correctes</div>
            </div>
            <div className="w-px h-8 bg-white/10" />
            <div className="text-center">
              <div className="text-2xl font-bold text-rose-400">{incorrectCount}</div>
              <div className="text-[10px] text-slate-400">Incorrectes</div>
            </div>
            <div className="w-px h-8 bg-white/10" />
            <div className="text-center">
              <div className="text-2xl font-bold text-slate-200">{totalQuestions}</div>
              <div className="text-[10px] text-slate-400">Total QCMs</div>
            </div>
            {timeTakenSeconds && (
              <>
                <div className="w-px h-8 bg-white/10" />
                <div className="text-center">
                  <div className="text-2xl font-bold text-cyan-400">{formatTime(timeTakenSeconds)}</div>
                  <div className="text-[10px] text-slate-400">Temps utilisé</div>
                </div>
              </>
            )}
          </motion.div>
        </div>
      </motion.div>

      {/* ── DIFFICULTY BREAKDOWN ── */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="glass-panel rounded-2xl p-5 border border-slate-700/60 bg-slate-900/70"
      >
        <h3 className="text-sm font-bold text-white mb-4 flex items-center gap-2">
          <Flame className="w-4 h-4 text-amber-400" />
          Performance par Niveau de Difficulté
        </h3>
        <div className="space-y-3">
          {difficultyStats.map((s, i) => (
            <motion.div
              key={s.difficulty}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.5 + i * 0.08 }}
            >
              <div className="flex items-center justify-between text-xs mb-1.5">
                <span className="font-medium text-slate-300 flex items-center gap-2">
                  <span
                    className="w-2 h-2 rounded-full"
                    style={{ background: difficultyColors[s.difficulty] }}
                  />
                  {difficultyLabel[s.difficulty]}
                  <span className="text-slate-500">({s.correct}/{s.total})</span>
                </span>
                <span className="font-bold" style={{ color: difficultyColors[s.difficulty] }}>
                  {s.accuracy}%
                </span>
              </div>
              <div className="w-full h-2 bg-slate-800 rounded-full overflow-hidden">
                <motion.div
                  className="h-full rounded-full"
                  style={{ background: difficultyColors[s.difficulty] }}
                  initial={{ width: 0 }}
                  animate={{ width: `${s.accuracy}%` }}
                  transition={{ duration: 0.8, delay: 0.6 + i * 0.1, ease: 'easeOut' }}
                />
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* ── DISCIPLINE WEAKNESS ANALYSIS ── */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6 }}
        className="glass-panel rounded-2xl p-5 border border-slate-700/60 bg-slate-900/70"
      >
        <h3 className="text-sm font-bold text-white mb-1 flex items-center gap-2">
          <TrendingDown className="w-4 h-4 text-rose-400" />
          Analyse des Points Faibles par Discipline
        </h3>
        <p className="text-[11px] text-slate-400 mb-4">Les disciplines avec le taux de réussite le plus bas sont affichées en premier.</p>
        <div className="space-y-2">
          {disciplineStats.map((s, i) => {
            const isWeak = s.accuracy < 60;
            const isStrong = s.accuracy >= 80;
            return (
              <motion.div
                key={s.tag}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.7 + i * 0.07 }}
                className={`flex items-center gap-3 p-3 rounded-xl border ${
                  isWeak
                    ? 'bg-rose-950/30 border-rose-500/25'
                    : isStrong
                    ? 'bg-emerald-950/30 border-emerald-500/25'
                    : 'bg-slate-900/50 border-slate-800'
                }`}
              >
                {isWeak ? (
                  <AlertTriangle className="w-4 h-4 text-rose-400 shrink-0" />
                ) : isStrong ? (
                  <TrendingUp className="w-4 h-4 text-emerald-400 shrink-0" />
                ) : (
                  <div className="w-4 h-4 rounded-full border-2 border-slate-600 shrink-0" />
                )}
                <span className="text-xs font-medium text-slate-200 flex-1">{s.tag}</span>
                <span className="text-[11px] text-slate-400">{s.correct}/{s.total}</span>
                <div className="w-20 h-1.5 bg-slate-800 rounded-full overflow-hidden">
                  <motion.div
                    className="h-full rounded-full"
                    style={{ background: isWeak ? '#f43f5e' : isStrong ? '#10b981' : '#0d9488' }}
                    initial={{ width: 0 }}
                    animate={{ width: `${s.accuracy}%` }}
                    transition={{ duration: 0.6, delay: 0.8 + i * 0.05 }}
                  />
                </div>
                <span
                  className="text-xs font-bold w-10 text-right"
                  style={{ color: isWeak ? '#f87171' : isStrong ? '#6ee7b7' : '#5eead4' }}
                >
                  {s.accuracy}%
                </span>
              </motion.div>
            );
          })}
        </div>
      </motion.div>

      {/* ── QUESTION-BY-QUESTION REVIEW ── */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.8 }}
        className="glass-panel rounded-2xl p-5 border border-slate-700/60 bg-slate-900/70"
      >
        <h3 className="text-sm font-bold text-white mb-4 flex items-center gap-2">
          <BookOpen className="w-4 h-4 text-teal-400" />
          Revue Détaillée — Questions Incorrectes ({incorrectCount})
        </h3>
        <div className="space-y-4">
          {results
            .filter(r => !r.isCorrect)
            .map((r, i) => (
              <motion.div
                key={r.id}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.9 + i * 0.05 }}
                className="bg-rose-950/20 border border-rose-500/20 rounded-xl p-4"
              >
                <div className="flex items-start gap-2 mb-2">
                  <XCircle className="w-4 h-4 text-rose-400 shrink-0 mt-0.5" />
                  <p className="text-xs font-semibold text-slate-200 leading-snug">{r.prompt}</p>
                </div>
                <div className="grid grid-cols-2 gap-2 text-[11px] mb-3">
                  <div className="bg-rose-950/40 rounded-lg p-2 border border-rose-500/20">
                    <span className="text-rose-400 block mb-0.5">Votre réponse</span>
                    <span className="text-rose-200 font-semibold">Option {r.selectedOption}</span>
                  </div>
                  <div className="bg-emerald-950/40 rounded-lg p-2 border border-emerald-500/20">
                    <span className="text-emerald-400 block mb-0.5">Réponse correcte</span>
                    <span className="text-emerald-200 font-semibold">Option {r.correctOption}</span>
                  </div>
                </div>
                <div className="bg-teal-950/30 border border-teal-500/20 rounded-lg p-3">
                  <span className="text-teal-400 text-[10px] font-bold uppercase tracking-wider block mb-1">
                    Explication
                  </span>
                  <p className="text-[11px] text-slate-300 leading-relaxed">{r.explanation}</p>
                </div>
              </motion.div>
            ))}
          {incorrectCount === 0 && (
            <div className="text-center py-6 text-emerald-400">
              <CheckCircle2 className="w-8 h-8 mx-auto mb-2" />
              <p className="text-sm font-semibold">Score parfait ! Toutes les réponses sont correctes.</p>
            </div>
          )}
        </div>
      </motion.div>

      {/* ── ACTIONS ── */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.0 }}
        className="flex flex-col sm:flex-row gap-3"
      >
        {onRetry && (
          <button
            onClick={onRetry}
            className="flex-1 flex items-center justify-center gap-2 py-3 px-5 rounded-xl bg-slate-800 hover:bg-slate-700 text-white font-semibold text-sm border border-slate-700 transition-colors"
          >
            <RotateCcw className="w-4 h-4" />
            Recommencer l'Examen
          </button>
        )}
        <Link
          href="/practice/random"
          className="flex-1 flex items-center justify-center gap-2 py-3 px-5 rounded-xl bg-gradient-to-r from-teal-600 to-cyan-600 text-white font-semibold text-sm shadow-lg shadow-teal-500/20 hover:opacity-95 transition-opacity"
        >
          <Flame className="w-4 h-4" />
          Mode Entraînement Aléatoire
          <ArrowRight className="w-4 h-4" />
        </Link>
      </motion.div>
    </motion.div>
  );
}
