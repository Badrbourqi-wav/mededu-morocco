'use client';
// app/modules/[moduleId]/chapters/[chapterId]/page.tsx
// MedEdu Morocco — Split-Screen Chapter Lesson Engine
// Left: Rich lesson text + clinical pearls
// Right: Synced interactive diagrams / animated physiology
// Bottom: Chapter-specific QCM (5-10 questions)

import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import DashboardLayout from '../../../../../components/layout/DashboardLayout';
import InteractiveDiagram from '../../../../../components/InteractiveDiagram';
import AnimatedPhysiology from '../../../../../components/AnimatedPhysiology';
import { useViewStore } from '../../../../../lib/view-store';
import {
  ArrowLeft, ArrowRight, BookOpen, Sparkles, Brain,
  CheckCircle2, XCircle, AlertTriangle, BookmarkCheck,
  ChevronRight, ChevronLeft, Clock, Target, Lightbulb,
  GraduationCap, Activity, Layers, Info,
} from 'lucide-react';
import { DETAILED_LESSONS, SAMPLE_QUIZ, CARDIOLOGY_DIAGRAM } from '../../../../../lib/mock-data';
import { LessonData, QuestionData } from '../../../../../types';

// ─────────────────────────────────────────────────────────────────
// TYPES
// ─────────────────────────────────────────────────────────────────

type RightPanelMode = 'DIAGRAM' | 'ANIMATION' | 'SUMMARY';

// ─────────────────────────────────────────────────────────────────
// CLINICAL PEARL CALLOUT
// ─────────────────────────────────────────────────────────────────

function ClinicalPearl({ note, type = 'warning' }: { note: string; type?: 'warning' | 'info' | 'danger' }) {
  const styles = {
    warning: { bg: 'bg-amber-500/10 border-amber-500/30', icon: <AlertTriangle className="w-4 h-4 text-amber-400 shrink-0" />, label: '🔥 Pearl Clinique PFE', textColor: 'text-amber-100/90', labelColor: 'text-amber-400' },
    info: { bg: 'bg-teal-500/10 border-teal-500/30', icon: <Info className="w-4 h-4 text-teal-400 shrink-0" />, label: '💡 Point Clé', textColor: 'text-teal-100/90', labelColor: 'text-teal-400' },
    danger: { bg: 'bg-rose-500/10 border-rose-500/30', icon: <AlertTriangle className="w-4 h-4 text-rose-400 shrink-0" />, label: '⚠️ Attention', textColor: 'text-rose-100/90', labelColor: 'text-rose-400' },
  };
  const s = styles[type];
  return (
    <div className={`rounded-xl p-4 border ${s.bg} my-4`}>
      <div className={`flex items-center gap-2 ${s.labelColor} font-bold text-xs uppercase tracking-wider mb-2`}>
        {s.icon}
        <span>{s.label}</span>
      </div>
      <p className={`text-xs ${s.textColor} leading-relaxed`}>{note}</p>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────
// RICH TEXT RENDERER
// ─────────────────────────────────────────────────────────────────

function RichTextRenderer({ content }: { content: string }) {
  if (!content) return null;
  const lines = content.split('\n');
  return (
    <div className="space-y-0.5">
      {lines.map((line, i) => {
        if (!line.trim()) return <div key={i} className="h-2" />;
        if (line.startsWith('═')) return <div key={i} className="border-t-2 border-teal-500/30 mt-5 mb-1" />;
        if (line.startsWith('━')) return <div key={i} className="border-t border-slate-700/60 mt-4 mb-2" />;

        if (line.trim().match(/^[A-ZÀÁÂÉÊÏÔÙÛ& ()/,0-9—–-]{10,}$/) && !line.startsWith('•') && !line.startsWith('→') && !line.startsWith('-') && !line.startsWith('│')) {
          return (
            <h2 key={i} className="text-base font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-teal-300 to-cyan-300 tracking-wide mt-3 mb-2">
              {line.trim()}
            </h2>
          );
        }
        if (line.trim().match(/^[IVX]+\.\s+[A-ZÀÁÂÉÊÏÔÙÛ]/)) {
          return (
            <h3 key={i} className="text-sm font-bold text-white mt-5 mb-2 flex items-center gap-2">
              <span className="w-5 h-5 rounded-md bg-teal-500/20 border border-teal-500/30 flex items-center justify-center text-teal-400 text-[9px] font-mono shrink-0">§</span>
              {line.trim()}
            </h3>
          );
        }
        if (line.trim().match(/^[A-Z]\.\s+[A-ZÀÁÂÉÊÏÔÙÛ]/)) {
          return (
            <h4 key={i} className="text-xs font-bold text-teal-300 mt-3 mb-1.5 border-l-2 border-teal-500/50 pl-3">
              {line.trim()}
            </h4>
          );
        }
        if (line.match(/^[│┌├└┘┐─┤]+/) || line.startsWith('  │')) {
          return <div key={i} className="font-mono text-[10px] text-slate-300 leading-relaxed whitespace-pre">{line}</div>;
        }
        if (line.includes('│') && line.split('│').length > 2) {
          return <div key={i} className="font-mono text-[10px] text-slate-300 leading-relaxed whitespace-pre bg-slate-950/40 px-1">{line}</div>;
        }
        if (line.trim().startsWith('➤')) {
          const text = line.trim().slice(1).trim();
          return (
            <div key={i} className="flex items-start gap-2.5 py-1.5 px-3 rounded-xl bg-teal-950/20 border border-teal-500/10 mb-1.5">
              <span className="text-teal-400 font-bold mt-0.5 shrink-0 text-sm">➤</span>
              <span className="text-xs text-slate-200 leading-relaxed">{text}</span>
            </div>
          );
        }
        if (line.trim().startsWith('•')) {
          const text = line.trim().slice(1).trim();
          const boldMatch = text.match(/^([^:]+:)(.*)/);
          return (
            <div key={i} className="flex items-start gap-2 ml-3 py-0.5">
              <span className="text-teal-400 mt-1 shrink-0 text-xs">•</span>
              <span className="text-xs text-slate-300 leading-relaxed">
                {boldMatch && boldMatch[1].length < 50 ? (
                  <><span className="font-semibold text-slate-100">{boldMatch[1]}</span>{boldMatch[2]}</>
                ) : text}
              </span>
            </div>
          );
        }
        if (line.trim().startsWith('→')) {
          return (
            <div key={i} className="flex items-start gap-2 ml-7 py-0.5">
              <span className="text-cyan-400 mt-1 shrink-0 text-xs">→</span>
              <span className="text-xs text-slate-400 leading-relaxed">{line.trim().slice(1).trim()}</span>
            </div>
          );
        }
        if (line.trim().startsWith('⚠')) {
          return (
            <div key={i} className="flex items-start gap-2 ml-3 py-1 px-3 rounded-lg bg-amber-500/10 border border-amber-500/20 mb-1">
              <span className="text-amber-400 mt-0.5 shrink-0">⚠</span>
              <span className="text-xs text-amber-200 leading-relaxed font-medium">{line.trim().slice(1).trim()}</span>
            </div>
          );
        }
        if (line.trim().match(/^\d+\.\s/) && !line.trim().match(/^[IVX]+\./)) {
          const numMatch = line.trim().match(/^(\d+\.\s+)(.*)/);
          return (
            <div key={i} className="flex items-start gap-2 ml-3 py-0.5">
              <span className="text-teal-400 font-bold shrink-0 text-xs mt-0.5 font-mono">{numMatch?.[1]}</span>
              <span className="text-xs text-slate-200 leading-relaxed">{numMatch?.[2]}</span>
            </div>
          );
        }
        return <p key={i} className="text-xs text-slate-300 leading-relaxed ml-1">{line}</p>;
      })}
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────
// CHAPTER QCM SECTION
// ─────────────────────────────────────────────────────────────────

function ChapterQCMSection({ questions, chapterTitle }: { questions: QuestionData[]; chapterTitle: string }) {
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [submitted, setSubmitted] = useState(false);
  const [currentQ, setCurrentQ] = useState(0);

  const handleSelect = (qid: string, opt: string) => {
    if (submitted) return;
    setAnswers(prev => ({ ...prev, [qid]: opt }));
  };

  const correctCount = questions.filter(q => answers[q.id] === q.correctOption).length;
  const score = questions.length > 0 ? Math.round((correctCount / questions.length) * 100) : 0;

  return (
    <section className="mt-10 pt-8 border-t-2 border-teal-500/20">
      {/* QCM Header */}
      <div className="flex items-center gap-3 mb-6">
        <div className="w-10 h-10 rounded-xl bg-purple-500/15 border border-purple-500/30 flex items-center justify-center">
          <Brain className="w-5 h-5 text-purple-400" />
        </div>
        <div>
          <h2 className="text-base font-bold text-white">Quiz de Fin de Chapitre</h2>
          <p className="text-[11px] text-slate-400">{chapterTitle} — {questions.length} QCMs ciblés</p>
        </div>
        {submitted && (
          <div className={`ml-auto px-4 py-2 rounded-xl font-bold text-sm border ${score >= 70 ? 'bg-emerald-500/15 border-emerald-500/35 text-emerald-300' : 'bg-rose-500/15 border-rose-500/35 text-rose-300'}`}>
            {score}% — {score >= 70 ? '✓ Validé' : '✗ À revoir'}
          </div>
        )}
      </div>

      {/* Progress dots */}
      <div className="flex items-center gap-2 mb-6 flex-wrap">
        {questions.map((q, i) => {
          const isAnswered = !!answers[q.id];
          const isCurrent = i === currentQ;
          const isCorrect = submitted && answers[q.id] === q.correctOption;
          const isWrong = submitted && isAnswered && answers[q.id] !== q.correctOption;
          return (
            <button
              key={q.id}
              onClick={() => setCurrentQ(i)}
              className={`w-8 h-8 rounded-lg text-xs font-bold transition-all border ${
                isCurrent
                  ? 'bg-purple-600 text-white border-purple-400 shadow-lg shadow-purple-600/30 scale-110'
                  : isCorrect
                  ? 'bg-emerald-950/60 border-emerald-500 text-emerald-300'
                  : isWrong
                  ? 'bg-rose-950/60 border-rose-500 text-rose-300'
                  : isAnswered
                  ? 'bg-slate-700 border-slate-600 text-slate-200'
                  : 'bg-slate-900 border-slate-800 text-slate-500'
              }`}
            >
              {i + 1}
            </button>
          );
        })}
      </div>

      {/* Current Question */}
      <AnimatePresence mode="wait">
        <motion.div
          key={currentQ}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -20 }}
          transition={{ duration: 0.2 }}
          className="bg-slate-950/70 rounded-2xl p-5 border border-slate-800/80"
        >
          <div className="flex items-center gap-2 mb-4">
            <span className="px-2.5 py-1 rounded-lg bg-purple-500/15 text-purple-300 font-bold font-mono text-[11px] border border-purple-500/20">
              QCM {currentQ + 1}/{questions.length}
            </span>
            <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold border ${
              questions[currentQ].difficulty === 'HIGH_YIELD_PFE'
                ? 'bg-amber-500/15 text-amber-300 border-amber-500/30'
                : 'bg-slate-800 text-slate-400 border-slate-700'
            }`}>
              {questions[currentQ].difficulty}
            </span>
          </div>

          <p className="text-sm font-semibold text-white mb-4 leading-relaxed">{questions[currentQ].prompt}</p>

          <div className="space-y-2.5">
            {questions[currentQ].options.map(opt => {
              const isSelected = answers[questions[currentQ].id] === opt.id;
              const isCorrect = submitted && opt.id === questions[currentQ].correctOption;
              const isWrong = submitted && isSelected && !isCorrect;
              let style = 'bg-slate-900 border-slate-800 text-slate-300 hover:bg-slate-800/80 cursor-pointer';
              if (submitted) {
                if (isCorrect) style = 'bg-emerald-950/80 border-emerald-500 text-emerald-200 font-semibold';
                else if (isWrong) style = 'bg-rose-950/80 border-rose-500 text-rose-200';
                else style = 'bg-slate-900/60 border-slate-800/60 text-slate-500';
              } else if (isSelected) {
                style = 'bg-purple-950/80 border-purple-500 text-purple-100 font-semibold';
              }
              return (
                <div
                  key={opt.id}
                  onClick={() => handleSelect(questions[currentQ].id, opt.id)}
                  className={`p-3.5 rounded-xl border text-xs transition-all flex items-start gap-3 ${style}`}
                >
                  <span className="w-6 h-6 rounded-lg bg-slate-800/80 flex items-center justify-center font-bold font-mono text-slate-300 shrink-0 mt-0.5">
                    {opt.id}
                  </span>
                  <span className="leading-relaxed">{opt.text}</span>
                  {submitted && isCorrect && <CheckCircle2 className="w-4 h-4 text-emerald-400 ml-auto shrink-0" />}
                  {submitted && isWrong && <XCircle className="w-4 h-4 text-rose-400 ml-auto shrink-0" />}
                </div>
              );
            })}
          </div>

          {/* Explanation */}
          {submitted && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              className="mt-4 p-4 rounded-xl bg-teal-950/30 border border-teal-500/20"
            >
              <h4 className="text-xs font-bold text-teal-400 mb-2 flex items-center gap-1.5">
                <Lightbulb className="w-4 h-4" />
                Explication Médicale
              </h4>
              <p className="text-xs text-slate-300 leading-relaxed">{questions[currentQ].explanation}</p>
            </motion.div>
          )}

          {/* Navigation */}
          <div className="flex items-center justify-between mt-4">
            <button
              onClick={() => setCurrentQ(p => Math.max(0, p - 1))}
              disabled={currentQ === 0}
              className="flex items-center gap-1.5 text-xs font-semibold text-slate-400 hover:text-white disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
            >
              <ChevronLeft className="w-4 h-4" /> Précédent
            </button>
            <button
              onClick={() => setCurrentQ(p => Math.min(questions.length - 1, p + 1))}
              disabled={currentQ === questions.length - 1}
              className="flex items-center gap-1.5 text-xs font-semibold text-slate-400 hover:text-white disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
            >
              Suivant <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </motion.div>
      </AnimatePresence>

      {/* Submit / Retry */}
      <div className="mt-5 flex justify-end">
        {!submitted ? (
          <button
            onClick={() => setSubmitted(true)}
            disabled={Object.keys(answers).length < questions.length}
            className="px-6 py-3 rounded-xl bg-gradient-to-r from-purple-600 to-purple-500 text-white font-bold text-sm shadow-lg hover:opacity-95 transition-opacity disabled:opacity-40 disabled:cursor-not-allowed flex items-center gap-2"
          >
            <Target className="w-4 h-4" />
            Valider mes réponses ({Object.keys(answers).length}/{questions.length})
          </button>
        ) : (
          <button
            onClick={() => { setSubmitted(false); setAnswers({}); setCurrentQ(0); }}
            className="px-6 py-3 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 font-bold text-sm transition-colors"
          >
            Recommencer ce Quiz
          </button>
        )}
      </div>
    </section>
  );
}

// ─────────────────────────────────────────────────────────────────
// MAIN PAGE
// ─────────────────────────────────────────────────────────────────

export default function ChapterPage() {
  const [lessonIndex, setLessonIndex] = useState(0);
  const [rightPanel, setRightPanel] = useState<RightPanelMode>('DIAGRAM');
  const [readProgress, setReadProgress] = useState(0);
  const contentRef = useRef<HTMLDivElement>(null);

  const lesson = DETAILED_LESSONS[lessonIndex] || DETAILED_LESSONS[0];
  const totalLessons = DETAILED_LESSONS.length;
  const quizQuestions = SAMPLE_QUIZ.questions;

  // Track reading progress
  useEffect(() => {
    const el = contentRef.current;
    if (!el) return;
    const handleScroll = () => {
      const { scrollTop, scrollHeight, clientHeight } = el;
      const pct = scrollHeight > clientHeight ? Math.round((scrollTop / (scrollHeight - clientHeight)) * 100) : 100;
      setReadProgress(pct);
    };
    el.addEventListener('scroll', handleScroll);
    return () => el.removeEventListener('scroll', handleScroll);
  }, [lessonIndex]);

  useEffect(() => {
    setReadProgress(0);
    if (contentRef.current) contentRef.current.scrollTop = 0;
  }, [lessonIndex]);

  // Detect if lesson has an animation type
  const hasAnimation = !!lesson.animatedProcessType;

  const { setActiveSection } = useViewStore();

  return (
    <DashboardLayout>
      {/* ── BREADCRUMB ── */}
      <div className="flex items-center gap-2 text-xs text-slate-400 mb-4">
        <button onClick={() => setActiveSection('DASHBOARD')} className="hover:text-teal-400 transition-colors">Tableau de Bord</button>
        <ChevronRight className="w-3.5 h-3.5" />
        <button onClick={() => setActiveSection('CHAPTER_READER')} className="hover:text-teal-400 transition-colors">Cardiologie S5</button>
        <ChevronRight className="w-3.5 h-3.5" />
        <span className="text-teal-300 font-semibold truncate max-w-[200px]">{lesson.title}</span>
      </div>

      {/* ── CHAPTER SELECTOR STRIP ── */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2 mb-5 scrollbar-none">
        {DETAILED_LESSONS.map((l, idx) => (
          <button
            key={l.id}
            onClick={() => setLessonIndex(idx)}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-all border flex-shrink-0 ${
              idx === lessonIndex
                ? 'bg-teal-600 text-white border-teal-400/50 shadow-lg shadow-teal-600/25'
                : 'bg-slate-900/60 text-slate-400 border-slate-800 hover:bg-slate-800 hover:text-slate-200'
            }`}
          >
            Ch.{idx + 1} — {l.title.split(' ').slice(0, 3).join(' ')}...
          </button>
        ))}
      </div>

      {/* ── READING PROGRESS BAR ── */}
      <div className="w-full h-1 bg-slate-800 rounded-full mb-6 overflow-hidden">
        <motion.div
          className="h-full bg-gradient-to-r from-teal-500 to-cyan-400 rounded-full"
          animate={{ width: `${readProgress}%` }}
          transition={{ duration: 0.3 }}
        />
      </div>

      {/* ════════════════════════════════════════════════════════════
          SPLIT-SCREEN LAYOUT
      ════════════════════════════════════════════════════════════ */}
      <div className="grid grid-cols-1 xl:grid-cols-12 gap-6 items-start min-h-screen">

        {/* ── LEFT PANEL: Lesson Content (7/12) ── */}
        <div className="xl:col-span-7 flex flex-col gap-6">

          {/* Chapter Header */}
          <div className="glass-panel rounded-2xl p-5 border border-teal-500/20 bg-slate-900/80">
            <div className="flex items-center gap-3 mb-3 flex-wrap">
              <span className="px-3 py-1 rounded-lg bg-teal-500/15 border border-teal-500/25 text-teal-300 font-mono font-bold text-xs">
                CH. {String(lessonIndex + 1).padStart(2, '0')}/{String(totalLessons).padStart(2, '0')}
              </span>
              <span className="px-2 py-0.5 rounded-full bg-amber-500/15 border border-amber-500/25 text-amber-300 font-bold text-[10px]">
                🔥 High-Yield PFE
              </span>
              <span className="flex items-center gap-1 text-[10px] text-slate-400 ml-auto">
                <Clock className="w-3 h-3" /> ~{lesson.order * 15 + 20} min de lecture
              </span>
            </div>
            <h1 className="text-xl font-extrabold text-white leading-tight mb-2">{lesson.title}</h1>
            {lesson.summary && (
              <p className="text-xs text-slate-400 leading-relaxed border-l-2 border-teal-500/40 pl-3">{lesson.summary}</p>
            )}
          </div>

          {/* High-Yield Notes Callout */}
          {lesson.highYieldNotes && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="rounded-2xl p-5 border border-amber-500/35 shadow-xl"
              style={{ background: 'linear-gradient(135deg, rgba(120,53,15,0.45) 0%, rgba(15,23,42,0.95) 100%)', boxShadow: '0 8px 30px rgba(245,158,11,0.12)' }}
            >
              <div className="flex items-start gap-4">
                <div className="w-11 h-11 rounded-xl bg-amber-500/15 border border-amber-500/35 flex items-center justify-center text-amber-400 shrink-0">
                  <AlertTriangle className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-xs font-extrabold text-amber-300 uppercase tracking-widest mb-2 flex items-center gap-2">
                    🔥 Points Incontournables — PFE & Résidanat Maroc
                  </h3>
                  <div className="space-y-1">
                    {lesson.highYieldNotes.trim().split('\n').filter(l => l.trim()).map((line, i) => (
                      <p key={i} className="text-xs text-amber-100/90 leading-relaxed">{line}</p>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          )}

          {/* Main Lesson Content */}
          <div
            ref={contentRef}
            className="glass-panel rounded-2xl border border-slate-800 bg-slate-900/60 shadow-xl overflow-hidden xl:max-h-[calc(100vh-300px)] xl:overflow-y-auto"
          >
            <div className="flex items-center justify-between px-6 py-4 border-b border-slate-800 bg-slate-950/40 sticky top-0 z-10">
              <span className="flex items-center gap-2 text-xs font-semibold text-slate-200">
                <BookOpen className="w-4 h-4 text-teal-400" />
                Cours Complet — Référentiel CNOM Maroc
              </span>
              <span className="flex items-center gap-1.5 text-[10px] text-slate-400 bg-slate-950/60 px-2.5 py-1 rounded-full border border-slate-800">
                <BookmarkCheck className="w-3.5 h-3.5 text-emerald-400" />
                Validé FMPR
              </span>
            </div>
            <div className="px-6 py-6">
              <RichTextRenderer content={lesson.content} />

              {/* Inline clinical pearl examples */}
              <ClinicalPearl note="Mnémonique CHADS₂-VASc : C = Cardiopathy, H = HTA, A₂ = Age ≥75 (2pts), D = Diabète, S₂ = AVC/AIT antérieur (2pts), V = Vasculopathy, A = Age 65-74, Sc = Sexe (♀). Score ≥ 2 chez l'homme → anticoagulation." type="warning" />
            
              {/* 🎨 Dedicated Anatomical Dessins & Physiology Animations Section */}
              <div className="mt-8 pt-6 border-t border-slate-800 space-y-6">
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-xl bg-teal-500/15 border border-teal-500/30 flex items-center justify-center">
                    <Sparkles className="w-5 h-5 text-teal-400" />
                  </div>
                  <div>
                    <h3 className="text-sm font-bold text-white">Visualisations & Animations du Chapitre</h3>
                    <p className="text-[11px] text-slate-400">Schémas anatomiques à hotspots et processus physiologiques animés pas à pas</p>
                  </div>
                </div>

                {/* Interactive Diagram Component */}
                <div className="rounded-2xl border border-teal-500/20 overflow-hidden bg-slate-950/60 p-2">
                  <InteractiveDiagram diagram={CARDIOLOGY_DIAGRAM} />
                </div>

                {/* Animated Physiology Process Component */}
                <div className="rounded-2xl border border-purple-500/20 overflow-hidden bg-slate-950/60 p-2">
                  <AnimatedPhysiology type="CARDIAC_ACTION_POTENTIAL" />
                </div>
              </div>
            </div>

            {/* Chapter Navigation Footer */}
            <div className="flex items-center justify-between px-6 py-4 border-t border-slate-800 bg-slate-950/30">
              <button
                onClick={() => setLessonIndex(p => Math.max(0, p - 1))}
                disabled={lessonIndex === 0}
                className="text-xs font-semibold text-slate-400 hover:text-white disabled:opacity-30 flex items-center gap-1 transition-colors"
              >
                <ArrowLeft className="w-3.5 h-3.5" /> Chapitre précédent
              </button>
              <span className="text-[10px] text-slate-500 font-mono">{lessonIndex + 1} / {totalLessons}</span>
              <button
                onClick={() => setLessonIndex(p => Math.min(totalLessons - 1, p + 1))}
                disabled={lessonIndex === totalLessons - 1}
                className="text-xs font-semibold text-slate-400 hover:text-white disabled:opacity-30 flex items-center gap-1 transition-colors"
              >
                Chapitre suivant <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </div>

        {/* ── RIGHT PANEL: Interactive Visuals (5/12) ── */}
        <div className="xl:col-span-5 xl:sticky xl:top-24 space-y-4">

          {/* Panel Mode Selector */}
          <div className="flex items-center gap-2 bg-slate-900/80 border border-slate-800 rounded-xl p-1.5">
            {([
              { key: 'DIAGRAM', label: 'Anatomie', icon: <Sparkles className="w-3.5 h-3.5" /> },
              { key: 'ANIMATION', label: 'Physiologie', icon: <Activity className="w-3.5 h-3.5" /> },
              { key: 'SUMMARY', label: 'Résumé', icon: <Layers className="w-3.5 h-3.5" /> },
            ] as const).map(m => (
              <button
                key={m.key}
                onClick={() => setRightPanel(m.key)}
                className={`flex-1 flex items-center justify-center gap-1.5 py-2 rounded-lg text-xs font-semibold transition-all ${
                  rightPanel === m.key
                    ? 'bg-teal-600 text-white shadow-md'
                    : 'text-slate-400 hover:text-white hover:bg-slate-800'
                }`}
              >
                {m.icon}
                {m.label}
              </button>
            ))}
          </div>

          {/* Right Panel Content */}
          <AnimatePresence mode="wait">
            {rightPanel === 'DIAGRAM' && (
              <motion.div
                key="diagram"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.2 }}
              >
                <InteractiveDiagram diagram={CARDIOLOGY_DIAGRAM} />
              </motion.div>
            )}

            {rightPanel === 'ANIMATION' && (
              <motion.div
                key="animation"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.2 }}
              >
                <AnimatedPhysiology type="CARDIAC_ACTION_POTENTIAL" />
                <div className="mt-4">
                  <AnimatedPhysiology type="RENIN_ANGIOTENSIN_ALDOSTERONE" />
                </div>
              </motion.div>
            )}

            {rightPanel === 'SUMMARY' && (
              <motion.div
                key="summary"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.2 }}
                className="glass-panel rounded-2xl p-5 border border-slate-700/60 bg-slate-900/70 space-y-4"
              >
                <div className="flex items-center gap-2 pb-3 border-b border-slate-800">
                  <GraduationCap className="w-5 h-5 text-teal-400" />
                  <h3 className="text-sm font-bold text-white">Résumé du Chapitre</h3>
                </div>
                <div className="space-y-2">
                  {lesson.highYieldNotes?.trim().split('\n').filter(l => l.trim()).map((line, i) => (
                    <div key={i} className="flex items-start gap-2 p-3 rounded-xl bg-slate-900/70 border border-slate-800">
                      <CheckCircle2 className="w-4 h-4 text-teal-400 shrink-0 mt-0.5" />
                      <span className="text-xs text-slate-300 leading-relaxed">{line}</span>
                    </div>
                  ))}
                </div>
                <div className="pt-3 border-t border-slate-800 space-y-2">
                  <Link
                    href="/modules/mod-cardio-s5/final-exam"
                    className="w-full flex items-center justify-center gap-2 py-3 rounded-xl bg-gradient-to-r from-teal-600 to-cyan-600 text-white font-bold text-xs hover:opacity-95 transition-opacity"
                  >
                    <Target className="w-4 h-4" />
                    Passer l'Examen Final du Module
                  </Link>
                  <Link
                    href="/practice/random"
                    className="w-full flex items-center justify-center gap-2 py-3 rounded-xl bg-slate-800 border border-slate-700 text-slate-200 font-bold text-xs hover:bg-slate-700 transition-colors"
                  >
                    <Brain className="w-4 h-4 text-purple-400" />
                    Mode Entraînement Aléatoire
                  </Link>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

      {/* ════════════════════════════════════════════════════════════
          BOTTOM: CHAPTER QCM SECTION
      ════════════════════════════════════════════════════════════ */}
      <div className="mt-10 glass-panel rounded-2xl p-6 border border-purple-500/20 bg-slate-900/80 shadow-xl">
        <ChapterQCMSection questions={quizQuestions} chapterTitle={lesson.title} />
      </div>
    </DashboardLayout>
  );
}
