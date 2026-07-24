'use client';
// app/modules/[moduleId]/final-exam/page.tsx
// MedEdu Morocco — Full Module Comprehensive QCM Exam
// Timer + Navigator + Flagging + Score Report

import React, { useState, useCallback, useEffect, useRef } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import DashboardLayout from '../../../../components/layout/DashboardLayout';
import QuizTimer from '../../../../components/QuizTimer';
import ScoreReport from '../../../../components/ScoreReport';
import { useViewStore } from '../../../../lib/view-store';
import { SAMPLE_QUIZ } from '../../../../lib/mock-data';
import { GLOBAL_QUESTION_BANK, generateRandomQuiz, BankQuestion } from '../../../../lib/question-bank';
import {
  Brain, Target, Flag, CheckCircle2, XCircle, AlertTriangle,
  ChevronLeft, ChevronRight, ArrowLeft, Clock, BarChart3,
  Play, BookOpen, Flame, Award
} from 'lucide-react';

// ─────────────────────────────────────────────────────────────────
// TYPES
// ─────────────────────────────────────────────────────────────────

type ExamPhase = 'INTRO' | 'EXAM' | 'RESULT';

interface FlagMap { [questionId: string]: boolean }

// ─────────────────────────────────────────────────────────────────
// EXAM INTRO SCREEN
// ─────────────────────────────────────────────────────────────────

function ExamIntro({ onStart }: { onStart: () => void }) {
  const stats = [
    { label: 'Questions', value: '25 QCMs', icon: <Brain className="w-5 h-5 text-purple-400" />, color: 'text-purple-300' },
    { label: 'Durée', value: '60 minutes', icon: <Clock className="w-5 h-5 text-amber-400" />, color: 'text-amber-300' },
    { label: 'Seuil de Validation', value: '70%', icon: <Target className="w-5 h-5 text-teal-400" />, color: 'text-teal-300' },
    { label: 'Niveau', value: 'PFE + Résidanat', icon: <Award className="w-5 h-5 text-cyan-400" />, color: 'text-cyan-300' },
  ];
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="max-w-2xl mx-auto space-y-6"
    >
      <div className="text-center space-y-3">
        <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-purple-600/40 to-teal-600/40 border border-purple-500/40 flex items-center justify-center mx-auto">
          <Brain className="w-8 h-8 text-purple-300" />
        </div>
        <h1 className="text-3xl font-extrabold text-white">Examen Final — Module S5</h1>
        <p className="text-slate-400 text-sm leading-relaxed max-w-lg mx-auto">
          Examen QCM complet couvrant l'intégralité du module <strong className="text-teal-300">Cardiologie & Pathologies Vasculaires</strong>.
          Toutes les questions sont conformes au référentiel PFE national marocain.
        </p>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        {stats.map(s => (
          <div key={s.label} className="glass-panel rounded-2xl p-4 border border-slate-700/50 text-center">
            <div className="w-10 h-10 rounded-xl bg-slate-800 border border-slate-700 flex items-center justify-center mx-auto mb-3">
              {s.icon}
            </div>
            <div className={`text-base font-bold ${s.color} mb-0.5`}>{s.value}</div>
            <div className="text-[10px] text-slate-500">{s.label}</div>
          </div>
        ))}
      </div>

      <div className="glass-panel rounded-2xl p-5 border border-amber-500/25 bg-amber-950/15 space-y-2">
        <h3 className="text-xs font-bold text-amber-300 flex items-center gap-2">
          <AlertTriangle className="w-4 h-4" />
          Instructions de l'Examen
        </h3>
        {[
          'Le timer démarre dès que vous cliquez sur "Commencer l\'Examen".',
          'Vous pouvez naviguer librement entre les questions via le panneau latéral.',
          'Utilisez le drapeau (🚩) pour marquer une question à réviser.',
          'La soumission est automatique à l\'expiration du temps.',
          'Chaque question a une seule réponse correcte (QCM à choix unique).',
        ].map((instruction, i) => (
          <p key={i} className="text-xs text-amber-100/80 flex items-start gap-2">
            <span className="text-amber-500 font-mono shrink-0">{i + 1}.</span>
            {instruction}
          </p>
        ))}
      </div>

      <div className="flex gap-3">
        <Link
          href="/modules/mod-cardio-s5"
          className="flex items-center gap-2 px-4 py-3 rounded-xl bg-slate-800 text-slate-300 font-semibold text-sm border border-slate-700 hover:bg-slate-700 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" /> Retour au Module
        </Link>
        <button
          onClick={onStart}
          className="flex-1 flex items-center justify-center gap-2 py-3 rounded-xl bg-gradient-to-r from-purple-600 to-teal-600 text-white font-bold text-sm shadow-xl shadow-purple-600/25 hover:opacity-95 transition-opacity"
        >
          <Play className="w-5 h-5" />
          Commencer l'Examen
          <Flame className="w-4 h-4" />
        </button>
      </div>
    </motion.div>
  );
}

// ─────────────────────────────────────────────────────────────────
// MAIN EXAM COMPONENT
// ─────────────────────────────────────────────────────────────────

export default function FinalExamPage() {
  const EXAM_DURATION = 60 * 60; // 60 minutes in seconds

  const [phase, setPhase] = useState<ExamPhase>('INTRO');
  const [questions, setQuestions] = useState<BankQuestion[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [flagged, setFlagged] = useState<FlagMap>({});
  const [remainingSeconds, setRemainingSeconds] = useState(EXAM_DURATION);
  const [timeTakenSeconds, setTimeTakenSeconds] = useState(0);
  const [showNav, setShowNav] = useState(true);

  const startedAt = useRef<number>(0);

  const startExam = useCallback(() => {
    const qs = generateRandomQuiz(25, { semesters: ['S5'], disciplines: ['Cardiologie'] });
    // If not enough cardiology, supplement from general bank
    const allQs = qs.length >= 10 ? qs : generateRandomQuiz(25);
    setQuestions(allQs.length > 0 ? allQs : SAMPLE_QUIZ.questions.map(q => ({
      ...q,
      semesterCode: 'S5',
      moduleCode: 'MOD-CARDIO-S5',
      disciplineTag: 'Cardiologie',
      topicTag: 'Général',
    })) as BankQuestion[]);
    setPhase('EXAM');
    startedAt.current = Date.now();
  }, []);

  const handleSubmit = useCallback(() => {
    const elapsed = Math.floor((Date.now() - startedAt.current) / 1000);
    setTimeTakenSeconds(elapsed);
    setPhase('RESULT');
  }, []);

  const handleTick = useCallback((remaining: number) => {
    setRemainingSeconds(remaining);
    if (remaining <= 0) handleSubmit();
  }, [handleSubmit]);

  const handleAnswer = (qid: string, optId: string) => {
    setAnswers(prev => ({ ...prev, [qid]: optId }));
  };

  const toggleFlag = (qid: string) => {
    setFlagged(prev => ({ ...prev, [qid]: !prev[qid] }));
  };

  const currentQ = questions[currentIndex];
  const answeredCount = Object.keys(answers).length;
  const flaggedCount = Object.values(flagged).filter(Boolean).length;

  // Build results for ScoreReport
  const buildResults = () => questions.map(q => ({
    id: q.id,
    disciplineTag: q.disciplineTag,
    difficulty: q.difficulty,
    isCorrect: answers[q.id] === q.correctOption,
    prompt: q.prompt,
    selectedOption: answers[q.id] || '—',
    correctOption: q.correctOption,
    explanation: q.explanation,
  }));

  const correctCount = questions.filter(q => answers[q.id] === q.correctOption).length;
  const score = questions.length > 0 ? Math.round((correctCount / questions.length) * 100) : 0;
  const { setActiveSection } = useViewStore();

  if (phase === 'INTRO') {
    return (
      <DashboardLayout>
        <div className="mb-4">
          <button onClick={() => setActiveSection('DASHBOARD')} className="inline-flex items-center gap-2 text-xs font-semibold text-teal-400 hover:text-teal-300 transition-colors">
            <ArrowLeft className="w-4 h-4" /> Retour au Tableau de Bord
          </button>
        </div>
        <ExamIntro onStart={startExam} />
      </DashboardLayout>
    );
  }

  if (phase === 'RESULT') {
    return (
      <DashboardLayout>
        <div className="mb-4">
          <button onClick={() => setActiveSection('DASHBOARD')} className="inline-flex items-center gap-2 text-xs font-semibold text-teal-400 hover:text-teal-300 transition-colors">
            <ArrowLeft className="w-4 h-4" /> Retour au Tableau de Bord
          </button>
        </div>
        <ScoreReport
          score={score}
          totalQuestions={questions.length}
          correctCount={correctCount}
          timeTakenSeconds={timeTakenSeconds}
          results={buildResults()}
          examTitle="Examen Final — Module Cardiologie S5"
          passingScore={70}
          onRetry={() => {
            setAnswers({});
            setFlagged({});
            setCurrentIndex(0);
            setRemainingSeconds(EXAM_DURATION);
            startExam();
          }}
        />
      </DashboardLayout>
    );
  }

  // ── EXAM PHASE ──
  return (
    <DashboardLayout>
      <div className="grid grid-cols-1 xl:grid-cols-12 gap-6 h-full">

        {/* ── QUESTION NAVIGATOR SIDEBAR ── */}
        <div className={`xl:col-span-3 ${showNav ? 'block' : 'hidden xl:block'}`}>
          <div className="glass-panel rounded-2xl p-4 border border-slate-700/60 bg-slate-900/80 sticky top-24 space-y-4">
            {/* Timer */}
            <div className="flex flex-col items-center py-3 border-b border-slate-800">
              <QuizTimer
                totalSeconds={EXAM_DURATION}
                remainingSeconds={remainingSeconds}
                onExpire={handleSubmit}
                onTick={handleTick}
                isRunning={phase === 'EXAM'}
                size="lg"
              />
              <div className="text-[10px] text-slate-400 mt-2 text-center">
                {answeredCount}/{questions.length} répondues · {flaggedCount} marquées
              </div>
            </div>

            {/* Progress Bar */}
            <div>
              <div className="flex justify-between text-[10px] text-slate-400 mb-1.5">
                <span>Progression</span>
                <span>{Math.round((answeredCount / (questions.length || 1)) * 100)}%</span>
              </div>
              <div className="w-full h-1.5 bg-slate-800 rounded-full overflow-hidden">
                <motion.div
                  className="h-full bg-gradient-to-r from-teal-500 to-cyan-400 rounded-full"
                  animate={{ width: `${(answeredCount / (questions.length || 1)) * 100}%` }}
                />
              </div>
            </div>

            {/* Question Grid Navigator */}
            <div>
              <div className="text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-2">
                Naviguer les Questions
              </div>
              <div className="grid grid-cols-5 gap-1.5">
                {questions.map((q, i) => {
                  const isAnswered = !!answers[q.id];
                  const isCurrent = i === currentIndex;
                  const isFlagged = !!flagged[q.id];
                  return (
                    <button
                      key={q.id}
                      onClick={() => setCurrentIndex(i)}
                      className={`h-8 rounded-lg text-[11px] font-bold transition-all border relative ${
                        isCurrent
                          ? 'bg-teal-600 text-white border-teal-400 shadow-md scale-105'
                          : isAnswered
                          ? 'bg-emerald-950/60 border-emerald-600/60 text-emerald-300'
                          : 'bg-slate-900 border-slate-800 text-slate-500 hover:border-slate-600'
                      }`}
                    >
                      {i + 1}
                      {isFlagged && (
                        <span className="absolute -top-1 -right-1 w-3 h-3 rounded-full bg-amber-500 border border-slate-900" />
                      )}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Legend */}
            <div className="flex flex-wrap gap-2 text-[10px] text-slate-400 border-t border-slate-800 pt-3">
              <span className="flex items-center gap-1"><span className="w-3 h-3 rounded bg-teal-600" />Actuelle</span>
              <span className="flex items-center gap-1"><span className="w-3 h-3 rounded bg-emerald-900 border border-emerald-600" />Répondue</span>
              <span className="flex items-center gap-1"><span className="w-3 h-3 rounded bg-slate-900 border border-slate-700" />Non répondue</span>
              <span className="flex items-center gap-1"><span className="w-3 h-3 rounded-full bg-amber-500" />Marquée</span>
            </div>

            {/* Submit Button */}
            <button
              onClick={handleSubmit}
              className="w-full py-3 rounded-xl bg-gradient-to-r from-purple-600 to-teal-600 text-white font-bold text-sm shadow-lg hover:opacity-95 transition-opacity flex items-center justify-center gap-2"
            >
              <BarChart3 className="w-4 h-4" />
              Terminer & Voir Résultats
            </button>
          </div>
        </div>

        {/* ── MAIN QUESTION AREA ── */}
        <div className="xl:col-span-9 space-y-5">
          {/* Question Header */}
          <div className="glass-panel rounded-2xl p-5 border border-slate-700/50 bg-slate-900/80 flex items-center justify-between gap-4 flex-wrap">
            <div className="flex items-center gap-3">
              <span className="px-3 py-1.5 rounded-xl bg-purple-500/15 border border-purple-500/30 text-purple-300 font-mono font-bold text-sm">
                Q{currentIndex + 1} / {questions.length}
              </span>
              {currentQ && (
                <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold border ${
                  currentQ.difficulty === 'HIGH_YIELD_PFE'
                    ? 'bg-amber-500/15 text-amber-300 border-amber-500/30'
                    : currentQ.difficulty === 'HARD'
                    ? 'bg-rose-500/15 text-rose-300 border-rose-500/30'
                    : 'bg-slate-800 text-slate-400 border-slate-700'
                }`}>
                  {currentQ.difficulty === 'HIGH_YIELD_PFE' ? '🔥 HIGH-YIELD PFE' : currentQ.difficulty}
                </span>
              )}
              {currentQ && (
                <span className="text-[10px] text-slate-500">{currentQ.disciplineTag} · {currentQ.topicTag}</span>
              )}
            </div>
            <div className="flex items-center gap-2">
              {currentQ && (
                <button
                  onClick={() => toggleFlag(currentQ.id)}
                  className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold border transition-all ${
                    flagged[currentQ.id]
                      ? 'bg-amber-500/20 border-amber-500/40 text-amber-300'
                      : 'bg-slate-800 border-slate-700 text-slate-400 hover:border-amber-500/40 hover:text-amber-400'
                  }`}
                >
                  <Flag className="w-3.5 h-3.5" />
                  {flagged[currentQ.id] ? 'Marquée' : 'Marquer'}
                </button>
              )}
              <button
                onClick={() => setShowNav(p => !p)}
                className="xl:hidden flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold bg-slate-800 border border-slate-700 text-slate-400"
              >
                <BarChart3 className="w-3.5 h-3.5" />
                Nav
              </button>
            </div>
          </div>

          {/* Question Content */}
          {currentQ && (
            <AnimatePresence mode="wait">
              <motion.div
                key={currentIndex}
                initial={{ opacity: 0, x: 30 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -30 }}
                transition={{ duration: 0.2 }}
                className="glass-panel rounded-2xl p-6 border border-slate-700/50 bg-slate-900/80 space-y-6"
              >
                <p className="text-base font-semibold text-white leading-relaxed">{currentQ.prompt}</p>

                <div className="space-y-3">
                  {currentQ.options.map(opt => {
                    const isSelected = answers[currentQ.id] === opt.id;
                    return (
                      <motion.div
                        key={opt.id}
                        whileHover={{ x: 4 }}
                        onClick={() => handleAnswer(currentQ.id, opt.id)}
                        className={`p-4 rounded-xl border text-sm cursor-pointer transition-all flex items-start gap-3 ${
                          isSelected
                            ? 'bg-teal-950/80 border-teal-500 text-teal-100 font-medium ring-1 ring-teal-500/30'
                            : 'bg-slate-950/60 border-slate-800 text-slate-300 hover:border-slate-600 hover:bg-slate-900/80'
                        }`}
                      >
                        <span className={`w-7 h-7 rounded-lg flex items-center justify-center font-bold font-mono text-sm shrink-0 mt-0.5 transition-colors ${
                          isSelected ? 'bg-teal-500 text-slate-900' : 'bg-slate-800 text-slate-400'
                        }`}>
                          {opt.id}
                        </span>
                        <span className="leading-relaxed">{opt.text}</span>
                        {isSelected && <CheckCircle2 className="w-5 h-5 text-teal-400 ml-auto shrink-0 mt-0.5" />}
                      </motion.div>
                    );
                  })}
                </div>

                {/* Clinical pearl teaser */}
                {currentQ.clinicalPearl && answers[currentQ.id] && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    className="bg-teal-950/25 border border-teal-500/20 rounded-xl p-4"
                  >
                    <div className="flex items-center gap-2 text-teal-400 font-bold text-xs mb-1.5">
                      <Flame className="w-3.5 h-3.5" />
                      Pearl Clinique — Disponible après soumission
                    </div>
                    <p className="text-xs text-teal-200/60 italic">Soumettez l'examen pour voir l'explication détaillée.</p>
                  </motion.div>
                )}

                {/* Navigation */}
                <div className="flex items-center justify-between pt-2 border-t border-slate-800">
                  <button
                    onClick={() => setCurrentIndex(p => Math.max(0, p - 1))}
                    disabled={currentIndex === 0}
                    className="flex items-center gap-2 text-sm font-semibold text-slate-400 hover:text-white disabled:opacity-30 transition-colors"
                  >
                    <ChevronLeft className="w-4 h-4" /> Question précédente
                  </button>
                  <span className="text-xs text-slate-600 font-mono">{currentIndex + 1}/{questions.length}</span>
                  <button
                    onClick={() => setCurrentIndex(p => Math.min(questions.length - 1, p + 1))}
                    disabled={currentIndex === questions.length - 1}
                    className="flex items-center gap-2 text-sm font-semibold text-slate-400 hover:text-white disabled:opacity-30 transition-colors"
                  >
                    Question suivante <ChevronRight className="w-4 h-4" />
                  </button>
                </div>
              </motion.div>
            </AnimatePresence>
          )}
        </div>
      </div>
    </DashboardLayout>
  );
}
