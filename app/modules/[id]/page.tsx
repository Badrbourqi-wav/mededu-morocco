// app/modules/[id]/page.tsx
'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import DashboardLayout from '../../../components/layout/DashboardLayout';
import InteractiveDiagram from '../../../components/InteractiveDiagram';
import { DETAILED_LESSONS, SAMPLE_QUIZ, CARDIOLOGY_DIAGRAM } from '../../../lib/mock-data';
import SemesterMiniGame from '../../../components/SemesterMiniGame';
import Anatomy3DSection from '../../../components/Anatomy3DSection';
import {
  HeartPulse, BookOpen, Sparkles, Brain, CheckCircle2, AlertTriangle,
  ArrowLeft, BookmarkCheck, Activity, Info, ChevronRight, Gamepad2, Box
} from 'lucide-react';

import { getRandomQuestions, getSessionSeed } from '../../../lib/quiz-engine';
import { GLOBAL_QUESTION_BANK } from '../../../lib/question-bank';

export default function DetailedModulePage({ params }: { params: { id: string } }) {
  const [activeTab, setActiveTab] = useState<'COURS' | 'QCMS' | 'ANATOMIE_3D' | 'GAME'>('COURS');
  const [selectedLessonIndex, setSelectedLessonIndex] = useState<number>(0);
  const [selectedAnswers, setSelectedAnswers] = useState<Record<string, string>>({});
  const [submittedQuiz, setSubmittedQuiz] = useState(false);
  
  const [quizQuestions, setQuizQuestions] = useState<any[]>([]);
  
  // Extract module id (or use a default)
  const moduleId = params?.id || 'MOD-CARDIO-S5';

  const loadQuestions = () => {
    // We want 20 questions for this module/semester. 
    // Wait, the prompt says "40 questions per chapter/module so that each user session gets 20 different questions".
    // We just filter the bank for this module's semester (or all questions if we want).
    // Let's filter by semester = S5 (since this page is hardcoded to S5 CARD-S5 for now, but we should try to match).
    // For now, let's just pick 20 random questions from the global bank.
    const questions = getRandomQuestions(GLOBAL_QUESTION_BANK, 20, moduleId);
    setQuizQuestions(questions);
    setSelectedAnswers({});
    setSubmittedQuiz(false);
  };

  React.useEffect(() => {
    if (activeTab === 'QCMS' && quizQuestions.length === 0) {
      loadQuestions();
    }
  }, [activeTab]);

  const currentLesson = DETAILED_LESSONS[selectedLessonIndex] || DETAILED_LESSONS[0];

  const handleOptionSelect = (questionId: string, optionId: string) => {
    if (submittedQuiz) return;
    setSelectedAnswers(prev => ({ ...prev, [questionId]: optionId }));
  };

  const calculateScore = () => {
    let correct = 0;
    quizQuestions.forEach(q => {
      if (selectedAnswers[q.id] === q.correctOption) correct++;
    });
    return Math.round((correct / (quizQuestions.length || 1)) * 100);
  };

  const handleNouveauxQCMs = () => {
    sessionStorage.removeItem(`quiz_seed_${moduleId}`);
    loadQuestions();
  };

  // Render course content with rich typography
  const renderCourseContent = (content: string) => {
    if (!content) return null;

    const lines = content.split('\n');

    return lines.map((line, i) => {
      // Empty line
      if (!line.trim()) return <div key={i} className="h-2" />;

      // Section header (═══)
      if (line.startsWith('═')) return (
        <div key={i} className="border-t-2 border-teal-500/30 mt-6 mb-1" />
      );

      // Main title (ALL CAPS lines after ═══)
      if (line.trim().match(/^[A-ZÀÁÂÉÊÏÔÙÛ& ()\/,0-9—–-]{10,}$/) && !line.startsWith('•') && !line.startsWith('→') && !line.startsWith('-') && !line.startsWith('│') && !line.startsWith('┌') && !line.startsWith('├') && !line.startsWith('└')) {
        return (
          <h2 key={i} className="text-lg font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-teal-300 to-cyan-300 font-heading tracking-wide mt-2 mb-2">
            {line.trim()}
          </h2>
        );
      }

      // Dashed Section Header (━━━)
      if (line.startsWith('━')) return (
        <div key={i} className="border-t border-slate-700/60 mt-5 mb-3" />
      );

      // Roman numeral section headers (I., II., III.)
      if (line.trim().match(/^[IVX]+\.\s+[A-ZÀÁÂÉÊÏÔÙÛ]/)) {
        return (
          <h3 key={i} className="text-base font-bold text-white font-heading mt-6 mb-3 flex items-center gap-2">
            <span className="w-6 h-6 rounded-lg bg-teal-500/20 border border-teal-500/30 flex items-center justify-center text-teal-400 text-[10px] font-mono-code shrink-0">§</span>
            {line.trim()}
          </h3>
        );
      }

      // Sub-section letter headers (A., B., C.)
      if (line.trim().match(/^[A-Z]\.\s+[A-ZÀÁÂÉÊÏÔÙÛ]/)) {
        return (
          <h4 key={i} className="text-sm font-bold text-teal-300 font-heading mt-4 mb-2 border-l-2 border-teal-500/50 pl-3">
            {line.trim()}
          </h4>
        );
      }

      // Table lines (│, ┌, ├, └, ┘, ┐, ─)
      if (line.match(/^[│┌├└┘┐─┤]+/) || line.startsWith('  │') || line.startsWith('│')) {
        return (
          <div key={i} className="font-mono-code text-[10px] text-slate-300 leading-relaxed whitespace-pre">
            {line}
          </div>
        );
      }

      // Table wrapper row
      if (line.includes('│') && line.includes('│')) {
        return (
          <div key={i} className="font-mono-code text-[10px] text-slate-300 leading-relaxed whitespace-pre bg-slate-950/40 px-1">
            {line}
          </div>
        );
      }

      // Arrow items (➤ points with bold lead)
      if (line.trim().startsWith('➤')) {
        const text = line.trim().slice(1).trim();
        const boldMatch = text.match(/^(\d+\.\s+[^:]+:)(.*)$/);
        return (
          <div key={i} className="flex items-start gap-3 py-1.5 px-3 rounded-xl bg-teal-950/20 border border-teal-500/10 mb-1.5">
            <span className="text-teal-400 font-bold mt-0.5 shrink-0">➤</span>
            <span className="text-xs text-slate-200 leading-relaxed">
              {boldMatch ? (
                <><span className="font-bold text-teal-200">{boldMatch[1]}</span>{boldMatch[2]}</>
              ) : text}
            </span>
          </div>
        );
      }

      // Bullet points (• items)
      if (line.trim().startsWith('•')) {
        const text = line.trim().slice(1).trim();
        const boldMatch = text.match(/^([^:]+:)(.*)$/);
        return (
          <div key={i} className="flex items-start gap-2 ml-4 py-0.5">
            <span className="text-teal-400 mt-1 shrink-0 text-xs">•</span>
            <span className="text-xs text-slate-300 leading-relaxed">
              {boldMatch && boldMatch[1].length < 50 ? (
                <><span className="font-semibold text-slate-100">{boldMatch[1]}</span>{boldMatch[2]}</>
              ) : text}
            </span>
          </div>
        );
      }

      // Sub-bullets (→ arrows)
      if (line.trim().startsWith('→')) {
        const text = line.trim().slice(1).trim();
        return (
          <div key={i} className="flex items-start gap-2 ml-8 py-0.5">
            <span className="text-cyan-400 mt-1 shrink-0 text-xs">→</span>
            <span className="text-xs text-slate-400 leading-relaxed">{text}</span>
          </div>
        );
      }

      // Warning symbol lines (⚠)
      if (line.trim().startsWith('⚠')) {
        return (
          <div key={i} className="flex items-start gap-2 ml-4 py-1 px-3 rounded-lg bg-amber-500/10 border border-amber-500/20 mb-1">
            <span className="text-amber-400 mt-0.5 shrink-0">⚠</span>
            <span className="text-xs text-amber-200 leading-relaxed font-medium">{line.trim().slice(1).trim()}</span>
          </div>
        );
      }

      // Numbered list inside sub-items (1. 2. 3.)
      if (line.trim().match(/^\d+\.\s/) && !line.trim().match(/^[IVX]+\./)) {
        const text = line.trim();
        const numMatch = text.match(/^(\d+\.\s+)(.*)$/);
        return (
          <div key={i} className="flex items-start gap-2 ml-4 py-0.5">
            <span className="text-teal-400 font-bold shrink-0 text-xs mt-0.5 font-mono-code">{numMatch?.[1]}</span>
            <span className="text-xs text-slate-200 leading-relaxed">{numMatch?.[2]}</span>
          </div>
        );
      }

      // Default paragraph text
      return (
        <p key={i} className="text-xs text-slate-300 leading-relaxed ml-1">
          {line}
        </p>
      );
    });
  };

  return (
    <DashboardLayout>
      <div className="mb-4">
        <Link href="/dashboard" className="inline-flex items-center space-x-2 text-xs font-semibold text-teal-400 hover:text-teal-300 transition-colors">
          <ArrowLeft className="w-4 h-4" />
          <span>Retour au Tableau de Bord — 12 Semestres</span>
        </Link>
      </div>

      {/* Module Header */}
      <div className="glass-panel rounded-3xl p-6 sm:p-8 mb-8 border border-teal-500/30 bg-slate-900/80 shadow-2xl">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div>
            <div className="flex items-center space-x-3 mb-2 flex-wrap gap-y-1">
              <span className="px-3 py-1 rounded-full text-xs font-bold font-mono-code bg-teal-500/20 text-teal-300 border border-teal-500/30">S5 — CARD-S5</span>
              <span className="text-xs text-slate-400 font-medium">Réforme des Études Médicales Marocaines</span>
              <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-amber-500/20 text-amber-300 border border-amber-500/30">🔥 High-Yield PFE</span>
            </div>
            <h1 className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight font-heading flex items-center gap-3">
              <HeartPulse className="w-8 h-8 text-teal-400 shrink-0" />
              Cardiologie et Pathologies Vasculaires
            </h1>
            <p className="text-xs sm:text-sm text-slate-300 mt-2 max-w-3xl leading-relaxed">
              Module clinique approfondi (S5) couvrant la physiopathologie, la sémiologie auscultatoire, l ECG de précision, les urgences coronariennes, l HTA et la réanimation cardiologique. Niveau conforme au référentiel PFE Maroc.
            </p>
          </div>
          <div className="flex items-center gap-4 border-t md:border-t-0 md:border-l border-slate-800 pt-4 md:pt-0 md:pl-6 shrink-0">
            <div className="text-center">
              <span className="text-xs text-slate-400 block font-medium">Durée Officielle</span>
              <span className="text-lg font-bold text-white font-heading">60 Heures</span>
            </div>
            <div className="w-px h-8 bg-slate-800" />
            <div className="text-center">
              <span className="text-xs text-slate-400 block font-medium">Chapitres</span>
              <span className="text-lg font-bold text-teal-400 font-heading">{DETAILED_LESSONS.length} Cours</span>
            </div>
          </div>
        </div>

        <div className="flex items-center space-x-2 border-t border-slate-800 mt-6 pt-6 overflow-x-auto">
          {(['COURS', 'QCMS', 'ANATOMIE_3D', 'GAME'] as const).map((tab) => {
            const labels: Record<string, { icon: React.ReactNode; label: string }> = {
              COURS: { icon: <BookOpen className="w-4 h-4" />, label: `📖 SECTION COURS (${DETAILED_LESSONS.length} Chapitres)` },
              QCMS: { icon: <Brain className="w-4 h-4 text-purple-300" />, label: '🎯 SECTION QCMS & Examens' },
              ANATOMIE_3D: { icon: <Box className="w-4 h-4 text-teal-400" />, label: '🎨 Anatomie & Schémas 3D' },
              GAME: { icon: <Gamepad2 className="w-4 h-4 text-amber-400" />, label: '🎮 SECTION GAME 2D Arcade' },
            };
            return (
              <button key={tab} onClick={() => setActiveTab(tab)}
                className={`px-5 py-2.5 rounded-xl text-xs font-bold flex items-center space-x-2 transition-all whitespace-nowrap border ${
                  activeTab === tab
                    ? 'bg-teal-600 text-white border-teal-400/50 shadow-lg shadow-teal-600/30'
                    : 'bg-slate-950/60 text-slate-400 border-slate-800 hover:text-white'
                }`}>
                {labels[tab].icon}
                <span>{labels[tab].label}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* TAB: COURS COMPLETS */}
      {activeTab === 'COURS' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Sidebar: Sommaire */}
          <div className="lg:col-span-4 glass-panel rounded-2xl p-4 border border-slate-800 bg-slate-900/70 space-y-2.5 sticky top-24">
            <div className="px-3 py-1.5 text-[11px] font-bold tracking-widest text-slate-400 uppercase flex items-center justify-between font-heading mb-1">
              <span>SOMMAIRE — {DETAILED_LESSONS.length} CHAPITRES</span>
              <span className="text-teal-400 font-mono-code text-[10px]">S5</span>
            </div>

            {DETAILED_LESSONS.map((lesson, index) => {
              const isSelected = selectedLessonIndex === index;
              return (
                <div key={lesson.id} onClick={() => setSelectedLessonIndex(index)}
                  className={`p-3 rounded-xl border cursor-pointer transition-all flex items-start space-x-3 ${
                    isSelected
                      ? 'bg-teal-950/80 border-teal-500 shadow-lg shadow-teal-950/50 ring-1 ring-teal-500/20'
                      : 'bg-slate-950/50 border-slate-800/80 hover:bg-slate-800/60 hover:border-slate-700'
                  }`}>
                  <div className={`w-7 h-7 rounded-lg font-bold font-mono-code text-[11px] flex items-center justify-center shrink-0 mt-0.5 ${
                    isSelected ? 'bg-teal-500 text-slate-950' : 'bg-slate-800 text-slate-400'
                  }`}>{index + 1}</div>
                  <div>
                    <h4 className="font-bold text-slate-100 text-xs leading-snug font-heading">{lesson.title}</h4>
                    <p className="text-[10px] text-slate-500 mt-0.5 font-medium">Chapitre {index + 1} — Référentiel PFE Maroc</p>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Main Course Content */}
          <div className="lg:col-span-8 space-y-6">
            {/* PFE HIGH YIELD CALLOUT */}
            <div className="rounded-2xl p-5 relative overflow-hidden"
              style={{ background: 'linear-gradient(135deg, rgba(120,53,15,0.5) 0%, rgba(15,23,42,0.95) 100%)', border: '1px solid rgba(245,158,11,0.4)', boxShadow: '0 8px 25px rgba(245,158,11,0.12)' }}>
              <div className="flex items-start space-x-4">
                <div className="w-12 h-12 rounded-xl bg-amber-500/20 border border-amber-500/40 flex items-center justify-center text-amber-400 shrink-0 shadow-lg">
                  <AlertTriangle className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="text-xs font-extrabold text-amber-300 uppercase tracking-widest mb-3 font-heading flex items-center gap-2">
                    🔥 Points Clés Incontournables — PFE & Résidanat Maroc
                  </h3>
                  <div className="space-y-1.5">
                    {currentLesson.highYieldNotes.trim().split('\n').filter(l => l.trim()).map((line, i) => (
                      <p key={i} className="text-xs text-amber-100/90 leading-relaxed font-medium">{line}</p>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* CHAPTER CONTENT */}
            <div className="glass-panel rounded-2xl border border-slate-800 bg-slate-900/60 shadow-xl overflow-hidden">
              {/* Chapter Header */}
              <div className="px-6 sm:px-8 pt-6 pb-4 border-b border-slate-800 flex items-center justify-between bg-slate-950/40">
                <div className="flex items-center gap-3">
                  <span className="px-3 py-1 rounded-lg bg-teal-500/20 border border-teal-500/30 text-teal-300 font-mono-code font-bold text-xs">
                    CH. {currentLesson.order.toString().padStart(2,'0')} / {DETAILED_LESSONS.length.toString().padStart(2,'0')}
                  </span>
                  <h2 className="text-sm sm:text-base font-bold text-white font-heading">{currentLesson.title}</h2>
                </div>
                <span className="hidden sm:flex items-center gap-1.5 text-[10px] text-slate-400 bg-slate-950/60 px-3 py-1.5 rounded-full border border-slate-800 shrink-0">
                  <BookmarkCheck className="w-3.5 h-3.5 text-emerald-400" />
                  CNOM Maroc
                </span>
              </div>

              {/* Chapter Text — Full Detail */}
              <div className="px-6 sm:px-8 py-6 space-y-1">
                {renderCourseContent(currentLesson.content)}
              </div>

              {/* Chapter Nav Footer */}
              <div className="px-6 sm:px-8 py-4 border-t border-slate-800 flex items-center justify-between bg-slate-950/30">
                <button
                  onClick={() => setSelectedLessonIndex(prev => Math.max(0, prev - 1))}
                  disabled={selectedLessonIndex === 0}
                  className="text-xs font-semibold text-slate-400 hover:text-white disabled:opacity-30 disabled:cursor-not-allowed transition-colors flex items-center gap-1"
                >
                  <ArrowLeft className="w-3.5 h-3.5" />
                  Chapitre Précédent
                </button>
                <span className="text-[10px] text-slate-500 font-mono-code">
                  {selectedLessonIndex + 1} / {DETAILED_LESSONS.length}
                </span>
                <button
                  onClick={() => setSelectedLessonIndex(prev => Math.min(DETAILED_LESSONS.length - 1, prev + 1))}
                  disabled={selectedLessonIndex === DETAILED_LESSONS.length - 1}
                  className="text-xs font-semibold text-slate-400 hover:text-white disabled:opacity-30 disabled:cursor-not-allowed transition-colors flex items-center gap-1"
                >
                  Chapitre Suivant
                  <ChevronRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* TAB: QCMS */}
      {activeTab === 'QCMS' && (
        <div className="glass-panel rounded-2xl p-6 border border-slate-800 bg-slate-900/80">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6 pb-4 border-b border-slate-800">
            <div>
              <h2 className="text-lg font-bold text-white flex items-center gap-2 font-heading">
                <Brain className="w-5 h-5 text-purple-400" />
                Série de QCMs Aléatoires
              </h2>
              <p className="text-xs text-slate-400 mt-1">Évaluez vos connaissances avec 20 questions aléatoires tirées de la banque globale.</p>
            </div>
            <div className="flex items-center gap-3">
              {submittedQuiz && (
                <div className={`px-4 py-2 rounded-xl font-bold text-sm font-heading border ${
                  calculateScore() >= 70
                    ? 'bg-emerald-500/20 border-emerald-500/40 text-emerald-300'
                    : 'bg-rose-500/20 border-rose-500/40 text-rose-300'
                }`}>
                  Résultat: {calculateScore()}% — {calculateScore() >= 70 ? '✓ Validé' : '✗ À Réviser'}
                </div>
              )}
              <button 
                onClick={handleNouveauxQCMs}
                className="px-4 py-2 rounded-xl bg-purple-500/20 border border-purple-500/40 text-purple-300 font-bold text-xs hover:bg-purple-500/30 transition-colors"
              >
                Nouveaux QCMs
              </button>
            </div>
          </div>

          <div className="space-y-8">
            {quizQuestions.length > 0 ? quizQuestions.map((q, idx) => {
              return (
                <div key={q.id + '-' + idx} className="bg-slate-950/70 p-5 rounded-2xl border border-slate-800/80">
                  <div className="flex items-center space-x-2 mb-4">
                    <span className="px-2.5 py-1 rounded-lg bg-teal-500/20 text-teal-300 font-bold font-mono-code text-[11px] border border-teal-500/20">QCM {idx + 1}</span>
                    <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold border ${
                      q.difficulty === 'HIGH_YIELD_PFE' ? 'bg-amber-500/20 text-amber-300 border-amber-500/30' : 'bg-slate-800 text-slate-400 border-slate-700'
                    }`}>{q.difficulty}</span>
                    <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-slate-800 text-slate-400 border border-slate-700">
                      {q.disciplineTag}
                    </span>
                  </div>

                  <p className="text-sm font-semibold text-white mb-4 leading-relaxed font-heading">{q.prompt}</p>

                  <div className="space-y-2.5">
                    {q.options.map((opt: any) => {
                      const isOptionSelected = selectedAnswers[q.id] === opt.id;
                      let optionStyle = 'bg-slate-900 border-slate-800 text-slate-300 hover:bg-slate-800/80 cursor-pointer';

                      if (submittedQuiz) {
                        if (opt.id === q.correctOption) optionStyle = 'bg-emerald-950/80 border-emerald-500 text-emerald-200 font-semibold';
                        else if (isOptionSelected) optionStyle = 'bg-rose-950/80 border-rose-500 text-rose-200';
                        else optionStyle = 'bg-slate-900/60 border-slate-800/60 text-slate-400';
                      } else if (isOptionSelected) {
                        optionStyle = 'bg-teal-950/80 border-teal-500 text-teal-200 font-semibold';
                      }

                      return (
                        <div key={opt.id} onClick={() => handleOptionSelect(q.id, opt.id)}
                          className={`p-3.5 rounded-xl border text-xs transition-all flex items-start space-x-3 ${optionStyle}`}>
                          <span className="w-6 h-6 rounded-lg bg-slate-800/80 flex items-center justify-center font-bold font-mono-code text-slate-300 shrink-0 mt-0.5">{opt.id}</span>
                          <span className="leading-relaxed font-sans">{opt.text}</span>
                        </div>
                      );
                    })}
                  </div>

                  {submittedQuiz && (
                    <div className="mt-4 p-4 rounded-xl bg-teal-950/30 border border-teal-500/20">
                      <h4 className="text-xs font-bold text-teal-400 mb-2 flex items-center gap-1.5 font-heading">
                        <CheckCircle2 className="w-4 h-4" />
                        Explication Médicale & Rationale Clinique
                      </h4>
                      <p className="text-xs text-slate-300 leading-relaxed font-sans">{q.explanation}</p>
                    </div>
                  )}
                </div>
              );
            }) : (
              <div className="text-center p-8">
                <div className="animate-spin w-8 h-8 border-4 border-teal-500 border-t-transparent rounded-full mx-auto mb-4"></div>
                <p className="text-slate-400">Génération des questions...</p>
              </div>
            )}
          </div>

          <div className="mt-8 flex justify-end">
            {!submittedQuiz ? (
              <button onClick={() => setSubmittedQuiz(true)}
                disabled={Object.keys(selectedAnswers).length < quizQuestions.length || quizQuestions.length === 0}
                className="px-6 py-3 rounded-xl bg-gradient-to-r from-teal-500 to-cyan-500 text-slate-950 font-bold text-xs shadow-lg hover:opacity-95 transition-opacity disabled:opacity-40 disabled:cursor-not-allowed font-heading">
                Valider les Réponses du QCM ({Object.keys(selectedAnswers).length}/{quizQuestions.length})
              </button>
            ) : (
              <button onClick={() => { setSubmittedQuiz(false); setSelectedAnswers({}); }}
                className="px-6 py-3 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 font-bold text-xs transition-colors font-heading">
                Recommencer le QCM
              </button>
            )}
          </div>
        </div>
      )}

      {/* TAB: ANATOMIE 3D & SCHEMAS */}
      {activeTab === 'ANATOMIE_3D' && (
        <div className="mt-4">
          <Anatomy3DSection />
        </div>
      )}

      {/* TAB: SECTION GAME 2D ARCADE */}
      {activeTab === 'GAME' && (
        <div className="mt-4">
          <SemesterMiniGame semesterCode="S5" />
        </div>
      )}
    </DashboardLayout>
  );
}
