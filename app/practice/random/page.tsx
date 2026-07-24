'use client';
// app/practice/random/page.tsx
// MedEdu Morocco — Cross-Module Random QCM Practice Generator

import React, { useState, useCallback } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import DashboardLayout from '../../../components/layout/DashboardLayout';
import QuizTimer from '../../../components/QuizTimer';
import ScoreReport from '../../../components/ScoreReport';
import { useViewStore } from '../../../lib/view-store';
import {
  GLOBAL_QUESTION_BANK,
  generateRandomQuiz,
  getAllDisciplines,
  getModulesBySemester,
  getBankStats,
  BankQuestion,
} from '../../../lib/question-bank';
import {
  Flame, Brain, Filter, Play, ChevronLeft, ChevronRight,
  CheckCircle2, XCircle, RefreshCcw, ArrowLeft, Clock,
  Layers, Target, Sparkles, BarChart3, BookOpen, Zap
} from 'lucide-react';

// ─────────────────────────────────────────────────────────────────
// TYPES
// ─────────────────────────────────────────────────────────────────

type Phase = 'CONFIG' | 'QUIZ' | 'RESULT';
type QuizCount = 10 | 20 | 50;

interface Config {
  count: QuizCount;
  selectedModules: string[];
  selectedDifficulties: Array<'EASY' | 'MEDIUM' | 'HARD' | 'HIGH_YIELD_PFE'>;
  timedMode: boolean;
  instantFeedback: boolean;
}

// ─────────────────────────────────────────────────────────────────
// CONFIGURATION PANEL
// ─────────────────────────────────────────────────────────────────

function ConfigPanel({ onStart }: { onStart: (config: Config) => void }) {
  const allDisciplines = getAllDisciplines();
  const modulesBySemester = getModulesBySemester();
  const stats = getBankStats();
  const difficulties: Array<'EASY' | 'MEDIUM' | 'HARD' | 'HIGH_YIELD_PFE'> = ['EASY', 'MEDIUM', 'HARD', 'HIGH_YIELD_PFE'];

  const [count, setCount] = useState<QuizCount>(20);
  const [selectedModules, setSelectedModules] = useState<string[]>([]);
  const [selectedDifficulties, setSelectedDifficulties] = useState<Array<'EASY' | 'MEDIUM' | 'HARD' | 'HIGH_YIELD_PFE'>>([]);
  const [timedMode, setTimedMode] = useState(false);
  const [instantFeedback, setInstantFeedback] = useState(false);

  const toggleModule = (m: string) =>
    setSelectedModules(p => p.includes(m) ? p.filter(x => x !== m) : [...p, m]);
  const toggleDifficulty = (d: 'EASY' | 'MEDIUM' | 'HARD' | 'HIGH_YIELD_PFE') =>
    setSelectedDifficulties(p => p.includes(d) ? p.filter(x => x !== d) : [...p, d]);

  const difficultyColors: Record<string, string> = {
    EASY: '#10b981',
    MEDIUM: '#0d9488',
    HARD: '#8b5cf6',
    HIGH_YIELD_PFE: '#f59e0b',
  };
  const difficultyLabels: Record<string, string> = {
    EASY: 'Facile',
    MEDIUM: 'Moyen',
    HARD: 'Difficile',
    HIGH_YIELD_PFE: '🔥 PFE Critique',
  };

  const handleStart = () => {
    onStart({
      count,
      selectedModules,
      selectedDifficulties,
      timedMode,
      instantFeedback,
    });
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="max-w-3xl mx-auto space-y-6"
    >
      {/* Hero Header */}
      <div className="glass-panel rounded-3xl p-6 border border-teal-500/20 bg-slate-900/80">
        <div className="flex items-center gap-4 mb-4">
          <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-teal-600/40 to-purple-600/40 border border-teal-500/30 flex items-center justify-center">
            <Sparkles className="w-6 h-6 text-teal-300" />
          </div>
          <div>
            <h1 className="text-xl font-extrabold text-white">Mode Entraînement Aléatoire</h1>
            <p className="text-xs text-slate-400 mt-0.5">Génère un QCM cross-disciplinaire personnalisé depuis toute la banque nationale</p>
          </div>
        </div>

        {/* Bank stats */}
        <div className="grid grid-cols-3 gap-3">
          <div className="bg-slate-950/60 rounded-xl p-3 border border-slate-800 text-center">
            <div className="text-lg font-bold text-teal-300">{stats.total}</div>
            <div className="text-[10px] text-slate-400">QCMs dans la banque</div>
          </div>
          <div className="bg-slate-950/60 rounded-xl p-3 border border-slate-800 text-center">
            <div className="text-lg font-bold text-purple-300">{allDisciplines.length}</div>
            <div className="text-[10px] text-slate-400">Disciplines médicales</div>
          </div>
          <div className="bg-slate-950/60 rounded-xl p-3 border border-slate-800 text-center">
            <div className="text-lg font-bold text-amber-300">{stats.byDifficulty.HIGH_YIELD_PFE}</div>
            <div className="text-[10px] text-slate-400">Questions PFE critiques</div>
          </div>
        </div>
      </div>

      {/* Number of Questions */}
      <div className="glass-panel rounded-2xl p-5 border border-slate-700/60 bg-slate-900/70">
        <h3 className="text-sm font-bold text-white mb-3 flex items-center gap-2">
          <Target className="w-4 h-4 text-teal-400" />
          Nombre de Questions
        </h3>
        <div className="grid grid-cols-3 gap-3">
          {([10, 20, 50] as QuizCount[]).map(n => (
            <button
              key={n}
              onClick={() => setCount(n)}
              className={`py-4 rounded-xl border font-bold text-lg transition-all ${
                count === n
                  ? 'bg-teal-600 border-teal-400/60 text-white shadow-lg shadow-teal-600/25'
                  : 'bg-slate-900/60 border-slate-800 text-slate-300 hover:border-teal-500/40 hover:bg-slate-800'
              }`}
            >
              {n}
              <div className={`text-[10px] font-normal mt-0.5 ${count === n ? 'text-teal-200' : 'text-slate-500'}`}>
                {n === 10 ? 'Express' : n === 20 ? 'Standard' : 'Complet'}
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Difficulty Filter */}
      <div className="glass-panel rounded-2xl p-5 border border-slate-700/60 bg-slate-900/70">
        <h3 className="text-sm font-bold text-white mb-1 flex items-center gap-2">
          <Zap className="w-4 h-4 text-amber-400" />
          Niveau de Difficulté
          <span className="text-[10px] font-normal text-slate-400">(laissez vide = tous les niveaux)</span>
        </h3>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 mt-3">
          {difficulties.map(d => {
            const isSelected = selectedDifficulties.includes(d);
            return (
              <button
                key={d}
                onClick={() => toggleDifficulty(d)}
                className="py-2.5 px-3 rounded-xl border text-xs font-bold transition-all text-center"
                style={{
                  background: isSelected ? `${difficultyColors[d]}20` : undefined,
                  borderColor: isSelected ? `${difficultyColors[d]}60` : '#1e293b',
                  color: isSelected ? difficultyColors[d] : '#64748b',
                }}
              >
                {difficultyLabels[d]}
              </button>
            );
          })}
        </div>
      </div>

      {/* Modules Filter by Semester */}
      <div className="glass-panel rounded-2xl p-5 border border-slate-700/60 bg-slate-900/70">
        <h3 className="text-sm font-bold text-white mb-1 flex items-center gap-2">
          <Layers className="w-4 h-4 text-cyan-400" />
          Filtrer par Modules (Semestres)
          <span className="text-[10px] font-normal text-slate-400">(laissez vide = tous les modules)</span>
        </h3>
        <div className="mt-4 space-y-4 max-h-72 overflow-y-auto pr-2 custom-scrollbar">
          {Object.entries(modulesBySemester).map(([sem, modules]) => (
            <div key={sem} className="bg-slate-950/40 rounded-xl p-3 border border-slate-800">
              <div className="text-xs font-bold text-slate-300 mb-2 border-b border-slate-800 pb-1">{sem}</div>
              <div className="flex flex-wrap gap-2">
                {modules.map(m => {
                  const isSelected = selectedModules.includes(m);
                  return (
                    <button
                      key={m}
                      onClick={() => toggleModule(m)}
                      className={`px-3 py-1.5 rounded-lg text-[10px] font-semibold border transition-all ${
                        isSelected
                          ? 'bg-cyan-500/20 border-cyan-500/50 text-cyan-300'
                          : 'bg-slate-900 border-slate-800 text-slate-500 hover:border-slate-600 hover:text-slate-300'
                      }`}
                    >
                      {m}
                    </button>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Options */}
      <div className="glass-panel rounded-2xl p-5 border border-slate-700/60 bg-slate-900/70">
        <h3 className="text-sm font-bold text-white mb-3 flex items-center gap-2">
          <Filter className="w-4 h-4 text-slate-400" />
          Options de Session
        </h3>
        <div className="space-y-3">
          {[
            {
              key: 'timed',
              label: 'Mode Chronométré',
              description: '1 minute par question (timer automatique)',
              value: timedMode,
              toggle: () => setTimedMode(p => !p),
              icon: <Clock className="w-4 h-4 text-amber-400" />,
            },
            {
              key: 'feedback',
              label: 'Feedback Instantané',
              description: 'Afficher la correction immédiatement après chaque réponse',
              value: instantFeedback,
              toggle: () => setInstantFeedback(p => !p),
              icon: <CheckCircle2 className="w-4 h-4 text-emerald-400" />,
            },
          ].map(opt => (
            <div key={opt.key} className="flex items-center justify-between p-3 rounded-xl bg-slate-950/50 border border-slate-800">
              <div className="flex items-center gap-3">
                {opt.icon}
                <div>
                  <div className="text-xs font-semibold text-slate-200">{opt.label}</div>
                  <div className="text-[10px] text-slate-500">{opt.description}</div>
                </div>
              </div>
              <button
                onClick={opt.toggle}
                className={`relative w-10 h-5 rounded-full transition-all ${opt.value ? 'bg-teal-500' : 'bg-slate-700'}`}
              >
                <span className={`absolute top-0.5 w-4 h-4 rounded-full bg-white shadow transition-transform ${opt.value ? 'translate-x-0.5' : 'translate-x-5'}`} />
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Start Button */}
      <button
        onClick={handleStart}
        className="w-full py-4 rounded-2xl bg-gradient-to-r from-teal-600 to-cyan-600 text-white font-extrabold text-base shadow-2xl shadow-teal-600/30 hover:opacity-95 transition-opacity flex items-center justify-center gap-3"
      >
        <Flame className="w-5 h-5" />
        Générer {count} Questions Aléatoires
        <Sparkles className="w-5 h-5" />
      </button>
    </motion.div>
  );
}

// ─────────────────────────────────────────────────────────────────
// QUIZ INTERFACE
// ─────────────────────────────────────────────────────────────────

function QuizInterface({
  questions,
  config,
  onFinish,
}: {
  questions: BankQuestion[];
  config: Config;
  onFinish: (answers: Record<string, string>, timeTaken: number) => void;
}) {
  const [currentIdx, setCurrentIdx] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [showFeedback, setShowFeedback] = useState(false);
  const [remainingSeconds, setRemainingSeconds] = useState(config.count * 60);
  const startedAt = React.useRef(Date.now());

  const currentQ = questions[currentIdx];
  const isAnswered = !!answers[currentQ.id];
  const answeredCount = Object.keys(answers).length;

  const handleAnswer = (optId: string) => {
    if (answers[currentQ.id]) return;
    setAnswers(prev => ({ ...prev, [currentQ.id]: optId }));
    if (config.instantFeedback) setShowFeedback(true);
  };

  const handleNext = () => {
    setShowFeedback(false);
    if (currentIdx < questions.length - 1) {
      setCurrentIdx(p => p + 1);
    } else {
      const elapsed = Math.floor((Date.now() - startedAt.current) / 1000);
      onFinish(answers, elapsed);
    }
  };

  const handleTick = (remaining: number) => {
    setRemainingSeconds(remaining);
    if (remaining <= 0) {
      const elapsed = Math.floor((Date.now() - startedAt.current) / 1000);
      onFinish(answers, elapsed);
    }
  };

  return (
    <div className="max-w-3xl mx-auto space-y-5">
      {/* Progress Header */}
      <div className="flex items-center gap-4 flex-wrap">
        <div className="flex items-center gap-2 flex-1 min-w-0">
          <span className="text-xs font-mono text-teal-400 font-bold">
            Q {currentIdx + 1}/{questions.length}
          </span>
          <div className="flex-1 h-2 bg-slate-800 rounded-full overflow-hidden">
            <motion.div
              className="h-full bg-gradient-to-r from-teal-500 to-cyan-400 rounded-full"
              animate={{ width: `${((currentIdx + 1) / questions.length) * 100}%` }}
              transition={{ duration: 0.3 }}
            />
          </div>
          <span className="text-xs text-slate-500">{Math.round(((currentIdx + 1) / questions.length) * 100)}%</span>
        </div>

        {config.timedMode && (
          <QuizTimer
            totalSeconds={config.count * 60}
            remainingSeconds={remainingSeconds}
            onTick={handleTick}
            isRunning={true}
            size="sm"
          />
        )}
      </div>

      {/* Question Tags */}
      <div className="flex items-center gap-2 flex-wrap">
        <span className="px-2.5 py-1 rounded-lg bg-slate-800 border border-slate-700 text-xs font-mono text-slate-400 font-bold">
          {currentQ.semesterCode}
        </span>
        <span className="px-2.5 py-0.5 rounded-full bg-purple-500/15 border border-purple-500/25 text-purple-300 text-[10px] font-semibold">
          {currentQ.disciplineTag}
        </span>
        <span className="px-2.5 py-0.5 rounded-full bg-teal-500/10 border border-teal-500/20 text-teal-400 text-[10px]">
          {currentQ.topicTag}
        </span>
        <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold border ml-auto ${
          currentQ.difficulty === 'HIGH_YIELD_PFE'
            ? 'bg-amber-500/15 text-amber-300 border-amber-500/30'
            : currentQ.difficulty === 'HARD'
            ? 'bg-rose-500/15 text-rose-300 border-rose-500/30'
            : 'bg-slate-800 text-slate-400 border-slate-700'
        }`}>
          {currentQ.difficulty === 'HIGH_YIELD_PFE' ? '🔥 PFE' : currentQ.difficulty}
        </span>
      </div>

      {/* Question Card */}
      <AnimatePresence mode="wait">
        <motion.div
          key={currentIdx}
          initial={{ opacity: 0, x: 30 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -30 }}
          transition={{ duration: 0.2 }}
          className="glass-panel rounded-2xl p-6 border border-slate-700/60 bg-slate-900/80 space-y-5"
        >
          <p className="text-base font-semibold text-white leading-relaxed">{currentQ.prompt}</p>

          <div className="space-y-2.5">
            {currentQ.options.map(opt => {
              const isSelected = answers[currentQ.id] === opt.id;
              const isCorrect = showFeedback && opt.id === currentQ.correctOption;
              const isWrong = showFeedback && isSelected && !isCorrect;

              let styleClass = 'bg-slate-950/70 border-slate-800 text-slate-300 hover:border-slate-600 hover:bg-slate-900/80 cursor-pointer';
              if (isCorrect) styleClass = 'bg-emerald-950/80 border-emerald-500 text-emerald-100 font-medium';
              else if (isWrong) styleClass = 'bg-rose-950/80 border-rose-500 text-rose-200';
              else if (isSelected && !showFeedback) styleClass = 'bg-teal-950/80 border-teal-500 text-teal-100 font-medium ring-1 ring-teal-500/30';
              else if (showFeedback) styleClass = 'bg-slate-900/60 border-slate-800/60 text-slate-500';

              return (
                <motion.div
                  key={opt.id}
                  whileHover={!isAnswered ? { x: 3 } : {}}
                  onClick={() => handleAnswer(opt.id)}
                  className={`p-4 rounded-xl border text-sm transition-all flex items-start gap-3 ${styleClass} ${isAnswered && !showFeedback ? 'cursor-default' : ''}`}
                >
                  <span className={`w-7 h-7 rounded-lg flex items-center justify-center font-bold font-mono shrink-0 mt-0.5 transition-colors ${
                    isCorrect ? 'bg-emerald-500 text-slate-900'
                    : isWrong ? 'bg-rose-500 text-white'
                    : isSelected ? 'bg-teal-500 text-slate-900'
                    : 'bg-slate-800 text-slate-400'
                  }`}>
                    {opt.id}
                  </span>
                  <span className="leading-relaxed flex-1">{opt.text}</span>
                  {isCorrect && <CheckCircle2 className="w-5 h-5 text-emerald-400 ml-auto shrink-0" />}
                  {isWrong && <XCircle className="w-5 h-5 text-rose-400 ml-auto shrink-0" />}
                </motion.div>
              );
            })}
          </div>

          {/* Instant Feedback Explanation */}
          {showFeedback && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              className="bg-teal-950/30 border border-teal-500/20 rounded-xl p-4"
            >
              <div className="text-teal-400 font-bold text-xs mb-2 flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4" /> Explication
              </div>
              <p className="text-xs text-slate-300 leading-relaxed">{currentQ.explanation}</p>
              {currentQ.clinicalPearl && (
                <div className="mt-3 pt-3 border-t border-teal-500/15">
                  <div className="text-amber-400 font-bold text-[11px] flex items-center gap-1.5 mb-1.5">
                    <Flame className="w-3 h-3" /> Pearl Clinique
                  </div>
                  <p className="text-[11px] text-amber-100/80 leading-relaxed">{currentQ.clinicalPearl}</p>
                </div>
              )}
            </motion.div>
          )}

          {/* Actions */}
          <div className="flex justify-end gap-3 pt-2">
            {!isAnswered && !showFeedback && (
              <span className="text-xs text-slate-500 self-center">Sélectionnez une réponse</span>
            )}
            {(isAnswered || showFeedback) && (
              <motion.button
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                onClick={handleNext}
                className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-teal-600 to-cyan-600 text-white font-bold text-sm shadow-lg hover:opacity-95 transition-opacity"
              >
                {currentIdx < questions.length - 1 ? (
                  <>Question suivante <ChevronRight className="w-4 h-4" /></>
                ) : (
                  <>Voir mes Résultats <BarChart3 className="w-4 h-4" /></>
                )}
              </motion.button>
            )}
          </div>
        </motion.div>
      </AnimatePresence>

      {/* Answered dots */}
      <div className="flex flex-wrap gap-1.5 justify-center">
        {questions.map((q, i) => (
          <div
            key={q.id}
            className={`w-4 h-4 rounded-full transition-all border ${
              i === currentIdx
                ? 'bg-teal-500 border-teal-300 scale-125'
                : answers[q.id]
                ? 'bg-emerald-700 border-emerald-600'
                : 'bg-slate-800 border-slate-700'
            }`}
          />
        ))}
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────
// MAIN PAGE
// ─────────────────────────────────────────────────────────────────

export default function RandomPracticePage() {
  const [phase, setPhase] = useState<Phase>('CONFIG');
  const [config, setConfig] = useState<Config | null>(null);
  const [questions, setQuestions] = useState<BankQuestion[]>([]);
  const [finalAnswers, setFinalAnswers] = useState<Record<string, string>>({});
  const [timeTaken, setTimeTaken] = useState(0);
  const { setActiveSection } = useViewStore();

  const handleStart = useCallback((cfg: Config) => {
    const qs = generateRandomQuiz(cfg.count, {
      modules: cfg.selectedModules.length > 0 ? cfg.selectedModules : undefined,
      difficulties: cfg.selectedDifficulties.length > 0 ? cfg.selectedDifficulties : undefined,
    });
    setQuestions(qs);
    setConfig(cfg);
    setPhase('QUIZ');
  }, []);

  const handleFinish = useCallback((answers: Record<string, string>, elapsed: number) => {
    setFinalAnswers(answers);
    setTimeTaken(elapsed);
    setPhase('RESULT');
  }, []);

  const handleRestart = useCallback(() => {
    setPhase('CONFIG');
    setConfig(null);
    setQuestions([]);
    setFinalAnswers({});
    setTimeTaken(0);
  }, []);

  const buildResults = () => questions.map(q => ({
    id: q.id,
    disciplineTag: q.disciplineTag,
    difficulty: q.difficulty,
    isCorrect: finalAnswers[q.id] === q.correctOption,
    prompt: q.prompt,
    selectedOption: finalAnswers[q.id] || '—',
    correctOption: q.correctOption,
    explanation: q.explanation,
  }));

  const correctCount = questions.filter(q => finalAnswers[q.id] === q.correctOption).length;
  const score = questions.length > 0 ? Math.round((correctCount / questions.length) * 100) : 0;

  return (
    <DashboardLayout>
      {/* Breadcrumb */}
      <div className="flex items-center gap-3 mb-6">
        <button
          onClick={() => setActiveSection('DASHBOARD')}
          className="flex items-center gap-1.5 text-xs font-semibold text-teal-400 hover:text-teal-300 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" /> Tableau de Bord
        </button>
        <span className="text-slate-700">/</span>
        <span className="text-xs font-semibold text-slate-300">Entraînement Aléatoire</span>
        {phase === 'QUIZ' && (
          <>
            <span className="text-slate-700">/</span>
            <button
              onClick={handleRestart}
              className="flex items-center gap-1 text-xs text-slate-400 hover:text-teal-400 transition-colors"
            >
              <RefreshCcw className="w-3.5 h-3.5" /> Recommencer
            </button>
          </>
        )}
      </div>

      <AnimatePresence mode="wait">
        {phase === 'CONFIG' && (
          <motion.div key="config" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            <ConfigPanel onStart={handleStart} />
          </motion.div>
        )}

        {phase === 'QUIZ' && config && (
          <motion.div key="quiz" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            <QuizInterface
              questions={questions}
              config={config}
              onFinish={handleFinish}
            />
          </motion.div>
        )}

        {phase === 'RESULT' && (
          <motion.div key="result" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            <div className="max-w-3xl mx-auto">
              <ScoreReport
                score={score}
                totalQuestions={questions.length}
                correctCount={correctCount}
                timeTakenSeconds={timeTaken}
                results={buildResults()}
                examTitle="Entraînement Aléatoire Cross-Disciplinaire"
                passingScore={60}
                onRetry={handleRestart}
              />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </DashboardLayout>
  );
}
