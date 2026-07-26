'use client';

import React, { useState, useEffect } from 'react';
import { 
  Award, CheckCircle2, XCircle, Timer, FileText, Download, Printer, 
  Sparkles, ShieldCheck, Stethoscope, Medal, ArrowRight, RotateCcw,
  BookOpen, Star, Trophy
} from 'lucide-react';
import { BankQuestion, GLOBAL_QUESTION_BANK, generateRandomQuiz } from '../lib/question-bank';
import { useProgressStore } from '../lib/progress-store';

export default function MockExamCertificateSection() {
  const [examStarted, setExamStarted] = useState(false);
  const [examCompleted, setExamCompleted] = useState(false);
  const [questions, setQuestions] = useState<BankQuestion[]>([]);
  const [currentIdx, setCurrentIdx] = useState(0);
  const [userAnswers, setUserAnswers] = useState<Record<number, string>>({});
  const [studentName, setStudentName] = useState('Dr. Etudiant MedEdu');
  const [facultyName, setFacultyName] = useState('Faculté de Médecine et de Pharmacie de Rabat');
  const [timeLeft, setTimeLeft] = useState(1800); // 30 minutes in seconds

  const recordQuizResult = useProgressStore(state => state.recordQuizResult);
  const addStudyMinutes = useProgressStore(state => state.addStudyMinutes);

  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (examStarted && !examCompleted && timeLeft > 0) {
      timer = setInterval(() => {
        setTimeLeft(prev => {
          if (prev <= 1) {
            handleSubmitExam();
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }
    return () => clearInterval(timer);
  }, [examStarted, examCompleted, timeLeft]);

  const handleStartExam = () => {
    const randomQuestions = generateRandomQuiz(20);
    setQuestions(randomQuestions);
    setUserAnswers({});
    setCurrentIdx(0);
    setTimeLeft(1200); // 20 mins timer
    setExamStarted(true);
    setExamCompleted(false);
  };

  const handleSelectOption = (questionIdx: number, optionId: string) => {
    setUserAnswers(prev => ({ ...prev, [questionIdx]: optionId }));
  };

  const calculateScore = () => {
    let correctCount = 0;
    questions.forEach((q, idx) => {
      if (userAnswers[idx] === q.correctOption) {
        correctCount++;
      }
    });
    return {
      score: correctCount,
      total: questions.length,
      percentage: Math.round((correctCount / questions.length) * 100)
    };
  };

  const handleSubmitExam = () => {
    setExamCompleted(true);
    const { score, total } = calculateScore();
    recordQuizResult('EXAM_BLANC', score, total);
    addStudyMinutes(20);
  };

  const handlePrintCertificate = () => {
    window.print();
  };

  const scoreData = examCompleted ? calculateScore() : { score: 0, total: 20, percentage: 0 };
  const passedExam = scoreData.percentage >= 60;

  const minutes = Math.floor(timeLeft / 60);
  const seconds = timeLeft % 60;

  return (
    <div className="p-4 sm:p-6 bg-[#030305] min-h-screen text-white select-none space-y-6"
      style={{ fontFamily: '-apple-system, BlinkMacSystemFont, "SF Pro Text", sans-serif' }}>
      
      {/* HEADER */}
      <div className="relative overflow-hidden rounded-3xl p-6 sm:p-8 border border-amber-500/20"
        style={{ background: 'linear-gradient(135deg, #1c1505 0%, #050401 100%)', boxShadow: '0 0 45px rgba(245,158,11,0.15)' }}>
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 relative z-10">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="px-3 py-1 rounded-full text-[11px] font-bold bg-amber-500/20 text-amber-300 border border-amber-500/40 tracking-wide flex items-center gap-1.5">
                <Trophy className="w-3.5 h-3.5 text-amber-400" />
                EXAMEN BLANC NATIONALE PFE & CERTIFICATION
              </span>
            </div>
            <h1 className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight flex items-center gap-3">
              <Award className="w-8 h-8 text-amber-400 animate-pulse" />
              Épreuve Blanche & Attestation d'Excellence
            </h1>
            <p className="text-slate-400 text-xs sm:text-sm mt-2 max-w-2xl leading-relaxed">
              Testez vos connaissances en conditions réelles d'examen (20 QCMs tirés aléatoirement avec chronomètre). 
              Obtenez un score de 60% minimum pour débloquer votre **Attestation d'Excellence Médicale Officielle** !
            </p>
          </div>

          {!examStarted && (
            <button onClick={handleStartExam}
              className="px-6 py-3.5 rounded-2xl bg-amber-500 hover:bg-amber-400 text-black font-extrabold text-sm shadow-xl shadow-amber-500/20 flex items-center gap-2.5 transition-all shrink-0">
              <Sparkles className="w-4 h-4" />
              <span>Lancer l'Épreuve Blanche</span>
            </button>
          )}
        </div>
      </div>

      {/* BEFORE EXAM START */}
      {!examStarted && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-[#0e0e12] rounded-3xl border border-white/10 p-6 space-y-3">
            <Timer className="w-8 h-8 text-amber-400" />
            <h3 className="text-base font-bold text-white">Chronométré 20 Mins</h3>
            <p className="text-slate-400 text-xs leading-relaxed">
              Conditions réelles d'examen PFE & Résidanat. Le temps défile automatiquement.
            </p>
          </div>
          <div className="bg-[#0e0e12] rounded-3xl border border-white/10 p-6 space-y-3">
            <BookOpen className="w-8 h-8 text-teal-400" />
            <h3 className="text-base font-bold text-white">Banque 200+ QCMs</h3>
            <p className="text-slate-400 text-xs leading-relaxed">
              Tirage au sort aléatoire couvrant tous les semestres S1 à S12 et les 6 facultés marocaines.
            </p>
          </div>
          <div className="bg-[#0e0e12] rounded-3xl border border-white/10 p-6 space-y-3">
            <Medal className="w-8 h-8 text-amber-300" />
            <h3 className="text-base font-bold text-white">Attestation Officielle</h3>
            <p className="text-slate-400 text-xs leading-relaxed">
              Obtenez au moins 12/20 (60%) pour générer et imprimer votre certificat d'excellence personnalisé.
            </p>
          </div>
        </div>
      )}

      {/* EXAM IN PROGRESS */}
      {examStarted && !examCompleted && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          
          {/* Main Question Card (Col 8) */}
          <div className="lg:col-span-8 bg-[#0e0e12] rounded-3xl border border-white/10 p-6 sm:p-8 space-y-6">
            
            {/* Top info bar */}
            <div className="flex items-center justify-between pb-4 border-b border-white/10">
              <span className="px-3 py-1 rounded-full text-xs font-bold bg-teal-500/20 text-teal-300 border border-teal-500/30">
                Question {currentIdx + 1} / {questions.length}
              </span>
              
              <div className="flex items-center gap-2 bg-amber-500/20 text-amber-300 border border-amber-500/40 px-3 py-1 rounded-full text-xs font-mono font-bold">
                <Timer className="w-3.5 h-3.5 animate-spin" style={{ animationDuration: '4s' }} />
                <span>{String(minutes).padStart(2, '0')}:{String(seconds).padStart(2, '0')}</span>
              </div>
            </div>

            {/* Question Text */}
            <h2 className="text-lg sm:text-xl font-bold text-white leading-relaxed">
              {questions[currentIdx]?.prompt}
            </h2>

            {/* Options list */}
            <div className="space-y-3 pt-2">
              {questions[currentIdx]?.options.map((opt) => {
                const isSelected = userAnswers[currentIdx] === opt.id;
                return (
                  <button key={opt.id} onClick={() => handleSelectOption(currentIdx, opt.id)}
                    className={`w-full text-left p-4 rounded-2xl text-sm font-medium transition-all flex items-center justify-between border ${
                      isSelected
                        ? 'bg-amber-500/20 border-amber-500 text-amber-200 font-bold shadow-lg shadow-amber-500/10'
                        : 'bg-[#141418] border-white/5 text-slate-300 hover:border-white/20 hover:text-white'
                    }`}>
                    <div className="flex items-center gap-3">
                      <span className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-mono font-bold ${
                        isSelected ? 'bg-amber-500 text-black' : 'bg-white/10 text-slate-400'
                      }`}>
                        {opt.id}
                      </span>
                      <span>{opt.text}</span>
                    </div>
                  </button>
                );
              })}
            </div>

            {/* Navigation bottom bar */}
            <div className="flex items-center justify-between pt-4 border-t border-white/10">
              <button onClick={() => setCurrentIdx(prev => Math.max(0, prev - 1))} disabled={currentIdx === 0}
                className="px-4 py-2 rounded-xl text-xs font-bold bg-white/5 hover:bg-white/10 text-slate-300 disabled:opacity-30">
                Précédent
              </button>

              {currentIdx < questions.length - 1 ? (
                <button onClick={() => setCurrentIdx(prev => Math.min(questions.length - 1, prev + 1))}
                  className="px-5 py-2 rounded-xl text-xs font-bold bg-amber-500 hover:bg-amber-400 text-black flex items-center gap-1.5">
                  <span>Suivant</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              ) : (
                <button onClick={handleSubmitExam}
                  className="px-6 py-2.5 rounded-xl text-xs font-extrabold bg-emerald-500 hover:bg-emerald-400 text-black shadow-lg shadow-emerald-500/20">
                  Terminer et Soumettre
                </button>
              )}
            </div>

          </div>

          {/* Question Grid Sidebar (Col 4) */}
          <div className="lg:col-span-4 bg-[#0e0e12] rounded-3xl border border-white/10 p-6 space-y-4">
            <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider">Avancement de l'épreuve</h4>
            
            <div className="grid grid-cols-5 gap-2">
              {questions.map((_, idx) => {
                const isAnswered = userAnswers[idx] !== undefined;
                const isCurrent = idx === currentIdx;
                return (
                  <button key={idx} onClick={() => setCurrentIdx(idx)}
                    className={`aspect-square rounded-xl text-xs font-mono font-bold flex items-center justify-center transition-all ${
                      isCurrent
                        ? 'ring-2 ring-amber-400 bg-amber-500/30 text-amber-200'
                        : isAnswered
                        ? 'bg-teal-500/20 text-teal-300 border border-teal-500/40'
                        : 'bg-white/5 text-slate-500 border border-white/5 hover:border-white/20'
                    }`}>
                    {idx + 1}
                  </button>
                );
              })}
            </div>

            <div className="pt-4 border-t border-white/10 space-y-2 text-xs text-slate-400">
              <div className="flex items-center justify-between">
                <span>Questions répondues :</span>
                <span className="font-mono font-bold text-teal-400">{Object.keys(userAnswers).length} / {questions.length}</span>
              </div>
            </div>
          </div>

        </div>
      )}

      {/* EXAM COMPLETED & CERTIFICATE DISPLAY */}
      {examCompleted && (
        <div className="space-y-8">
          
          {/* Result Card */}
          <div className={`rounded-3xl p-6 sm:p-8 border ${
            passedExam ? 'bg-emerald-950/40 border-emerald-500/40' : 'bg-rose-950/40 border-rose-500/40'
          }`}>
            <div className="flex flex-col sm:flex-row items-center justify-between gap-6">
              <div className="flex items-center gap-4">
                <div className={`w-16 h-16 rounded-2xl flex items-center justify-center shrink-0 ${
                  passedExam ? 'bg-emerald-500/20 text-emerald-400' : 'bg-rose-500/20 text-rose-400'
                }`}>
                  {passedExam ? <Trophy className="w-8 h-8" /> : <XCircle className="w-8 h-8" />}
                </div>
                <div>
                  <h2 className="text-xl sm:text-2xl font-bold text-white">
                    {passedExam ? 'Félicitations ! Épreuve Réussie 🎓' : 'Épreuve Non Validée'}
                  </h2>
                  <p className="text-slate-300 text-xs sm:text-sm mt-1">
                    Score final : <strong className="text-amber-400 font-mono text-base">{scoreData.score} / {scoreData.total} ({scoreData.percentage}%)</strong>
                  </p>
                </div>
              </div>

              <button onClick={handleStartExam}
                className="px-5 py-2.5 rounded-xl text-xs font-bold bg-white/10 hover:bg-white/20 text-white flex items-center gap-2 shrink-0">
                <RotateCcw className="w-3.5 h-3.5" />
                <span>Recommencer l'épreuve</span>
              </button>
            </div>
          </div>

          {/* DIPLOMA CERTIFICATE CARD (If Passed) */}
          {passedExam && (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-bold text-white flex items-center gap-2">
                  <Award className="w-5 h-5 text-amber-400" />
                  Votre Attestation d'Excellence Personnalisée
                </h3>

                <button onClick={handlePrintCertificate}
                  className="px-4 py-2 rounded-xl bg-amber-500 text-black text-xs font-extrabold flex items-center gap-2 shadow-lg shadow-amber-500/20 hover:bg-amber-400">
                  <Printer className="w-4 h-4" />
                  <span>Imprimer / Télécharger (PDF)</span>
                </button>
              </div>

              {/* PRINTABLE DIPLOMA CARD */}
              <div className="bg-[#fffdf7] text-slate-900 rounded-3xl p-8 sm:p-12 border-8 border-amber-600/30 relative overflow-hidden shadow-2xl space-y-6 print:border-none print:shadow-none"
                style={{ fontFamily: 'Georgia, serif' }}>
                
                {/* Certificate Gold Watermark Stamp */}
                <div className="absolute top-6 right-6 opacity-15 pointer-events-none">
                  <Medal className="w-48 h-48 text-amber-700" />
                </div>

                {/* Top Certificate Header */}
                <div className="text-center space-y-2 border-b-2 border-amber-700/20 pb-6">
                  <span className="text-xs tracking-widest text-amber-800 font-sans font-bold uppercase">
                    ROYAUME DU MAROC — MEDEDU MOROCCO ACADEMY
                  </span>
                  <h1 className="text-2xl sm:text-4xl font-extrabold text-amber-900 tracking-tight">
                    ATTESTATION D'EXCELLENCE MÉDICALE
                  </h1>
                  <p className="text-xs text-amber-800 italic">
                    Décernée au titre de la validation de l'épreuve blanche nationale de préparation au PFE & Résidanat
                  </p>
                </div>

                {/* Candidate Name Input & Details */}
                <div className="text-center space-y-4 py-4">
                  <p className="text-sm text-slate-600 font-sans">
                    Le Conseil Académique de MedEdu Morocco atteste que :
                  </p>
                  
                  <div className="inline-block border-b-2 border-amber-700/40 px-8 py-1">
                    <input type="text" value={studentName} onChange={e => setStudentName(e.target.value)}
                      className="text-2xl sm:text-3xl font-bold text-amber-950 text-center bg-transparent border-none focus:outline-none w-full font-serif" />
                  </div>

                  <p className="text-xs text-slate-600 font-sans max-w-xl mx-auto leading-relaxed">
                    a réussi avec succès l'épreuve blanche théorique et pratique avec la mention 
                    <strong className="text-amber-800"> EXCELLENT ({scoreData.percentage}%)</strong>, 
                    démontrant une parfaite maîtrise des disciplines médicales et chirurgicales du cursus FMP.
                  </p>

                  <div className="pt-2">
                    <input type="text" value={facultyName} onChange={e => setFacultyName(e.target.value)}
                      className="text-xs text-slate-500 font-sans text-center bg-transparent border-none focus:outline-none w-full italic" />
                  </div>
                </div>

                {/* Footer Signatures & Official Stamp */}
                <div className="flex items-end justify-between pt-6 border-t-2 border-amber-700/20 text-xs font-sans">
                  <div className="space-y-1 text-slate-600">
                    <p className="font-bold text-amber-900">Code de Vérification Unique :</p>
                    <p className="font-mono text-[10px] text-slate-500">MED-MA-2024-{Math.random().toString(36).substring(2, 9).toUpperCase()}</p>
                    <p className="text-[10px]">Délivré le : {new Date().toLocaleDateString('fr-FR')}</p>
                  </div>

                  {/* Stamp Graphic */}
                  <div className="w-20 h-20 rounded-full border-4 border-amber-700 flex flex-col items-center justify-center text-center p-1 transform -rotate-12 bg-amber-50">
                    <ShieldCheck className="w-6 h-6 text-amber-800" />
                    <span className="text-[8px] font-bold text-amber-900 leading-tight">OFFICIEL VERIFIED</span>
                  </div>
                </div>

              </div>
            </div>
          )}

        </div>
      )}

    </div>
  );
}
