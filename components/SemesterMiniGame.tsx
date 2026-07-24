'use client';
// components/SemesterMiniGame.tsx
// MedEdu Morocco — 2D Interactive Medical Arcade Mini-Game
// Dynamic 2D game per semester/module (ECG Rush, Anatomy Target, Emergency Blitz)

import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Gamepad2, Sparkles, HeartPulse, Trophy, RefreshCcw, 
  Zap, CheckCircle2, XCircle, ShieldAlert, Timer, Flame, Award
} from 'lucide-react';

interface GameQuestion {
  id: string;
  scenario: string;
  vitalSign: string;
  category: string;
  options: { text: string; isCorrect: boolean; actionEffect: string }[];
}

const MEDICAL_GAME_LEVELS: Record<string, GameQuestion[]> = {
  S1: [
    {
      id: 'g-s1-1',
      scenario: 'Fracture spiroïde du tiers moyen de l humérus. Quel nerf est en péril immédiat ?',
      vitalSign: 'Traumatologie / Ostéologie',
      category: 'Anatomie S1',
      options: [
        { text: 'Nerf Radial (Main tombante)', isCorrect: true, actionEffect: 'Immobilisation & Neuro-exploration' },
        { text: 'Nerf Médian (Canal carpien)', isCorrect: false, actionEffect: 'Erreur diagnostique' },
        { text: 'Nerf Ulnaire (Épitrochlée)', isCorrect: false, actionEffect: 'Lésion évitée' },
      ],
    },
    {
      id: 'g-s1-2',
      scenario: 'L oie du carpe le plus fréquemment fracturé lors d une chute sur la paume ?',
      vitalSign: 'Poignet / Carpe',
      category: 'Anatomie S1',
      options: [
        { text: 'Scaphoïde (Risque nécrose)', isCorrect: true, actionEffect: 'Radiographie tabatière anatomique' },
        { text: 'Pisiforme', isCorrect: false, actionEffect: 'Faux diagnostic' },
        { text: 'Capitatum', isCorrect: false, actionEffect: 'Faux diagnostic' },
      ],
    },
  ],
  S5: [
    {
      id: 'g-s5-1',
      scenario: 'Patient en OAP Flash avec PAS à 210 mmHg. ECG : Sus-décalage V1-V4.',
      vitalSign: 'SpO2: 82% | FC: 135 bpm | PA: 210/115',
      category: 'Cardiologie S5',
      options: [
        { text: 'Angioplastie Primaire + BASIC + VNI', isCorrect: true, actionEffect: 'Reperfusion coronaire réussie !' },
        { text: 'Dérivés Nitrés en bolus sans ECG', isCorrect: false, actionEffect: 'Hypotension sévère !' },
        { text: 'Thrombolyse sans vérifier PA', isCorrect: false, actionEffect: 'Risque AVC Hémorragique !' },
      ],
    },
    {
      id: 'g-s5-2',
      scenario: 'Crise d asthme sévère avec silence auscultatoire et cyanose.',
      vitalSign: 'SpO2: 85% | FR: 34/min | Silence',
      category: 'Pneumologie S5',
      options: [
        { text: 'Oxygène fort débit + Nébulisation Salbutamol/Ipratropium', isCorrect: true, actionEffect: 'Bronchodilatation d urgence !' },
        { text: 'Sédatif léger pour calmer la toux', isCorrect: false, actionEffect: 'Arrêt respiratoire imminent !' },
        { text: 'Attendre les EFR', isCorrect: false, actionEffect: 'Contre-indication en urgence !' },
      ],
    },
  ],
  S6: [
    {
      id: 'g-s6-1',
      scenario: 'AVC Ischémique Sylvien Gauche vu à 2h du début. PA: 170/95 mmHg.',
      vitalSign: 'Aphasie | Hémiplégie Droite | H: 2.0',
      category: 'Neurologie S6',
      options: [
        { text: 'Thrombolyse IV par rt-PA (Alteplase)', isCorrect: true, actionEffect: 'Pénombre ischémique sauvée !' },
        { text: 'Baisse de PA sous 120/80 mmHg', isCorrect: false, actionEffect: 'Extention de la nécrose !' },
        { text: 'Attendre 24 heures', isCorrect: false, actionEffect: 'Délai dépassé !' },
      ],
    },
  ],
  DEFAULT: [
    {
      id: 'g-def-1',
      scenario: 'Arrêt Cardiorespiratoire chez un adulte inconscient sans respiration.',
      vitalSign: 'Pouls: Absent | Respiration: Gasps',
      category: 'Urgences S10',
      options: [
        { text: 'MCE 100-120/min + Alerte 15 + DAE', isCorrect: true, actionEffect: 'Restauration de la circulation !' },
        { text: 'Placer en Position Latérale de Sécurité', isCorrect: false, actionEffect: 'Inutile en ACR !' },
        { text: 'Injections d Atropine seule', isCorrect: false, actionEffect: 'Non recommandé !' },
      ],
    },
  ],
};

export default function SemesterMiniGame({ semesterCode = 'S5' }: { semesterCode?: string }) {
  const levelData = MEDICAL_GAME_LEVELS[semesterCode] || MEDICAL_GAME_LEVELS.S5 || MEDICAL_GAME_LEVELS.DEFAULT;
  const [currentIdx, setCurrentIdx] = useState(0);
  const [score, setScore] = useState(0);
  const [streak, setStreak] = useState(0);
  const [lives, setLives] = useState(3);
  const [gameState, setGameState] = useState<'IDLE' | 'PLAYING' | 'FEEDBACK' | 'GAMEOVER' | 'VICTORY'>('IDLE');
  const [lastAnswer, setLastAnswer] = useState<{ isCorrect: boolean; text: string } | null>(null);
  const [timeLeft, setTimeLeft] = useState(15);

  const currentQ = levelData[currentIdx % levelData.length];

  // Timer loop during playing
  useEffect(() => {
    if (gameState !== 'PLAYING') return;
    if (timeLeft <= 0) {
      handleOptionSelect(false, 'Temps écoulé ! Échec de la prise en charge d urgence.');
      return;
    }
    const timer = setInterval(() => setTimeLeft(t => t - 1), 1000);
    return () => clearInterval(timer);
  }, [gameState, timeLeft]);

  const startGame = () => {
    setScore(0);
    setStreak(0);
    setLives(3);
    setCurrentIdx(0);
    setTimeLeft(15);
    setGameState('PLAYING');
  };

  const handleOptionSelect = (isCorrect: boolean, effectText: string) => {
    setLastAnswer({ isCorrect, text: effectText });
    setGameState('FEEDBACK');

    if (isCorrect) {
      setScore(s => s + 150 + streak * 20);
      setStreak(st => st + 1);
    } else {
      setStreak(0);
      setLives(l => {
        const nextLives = l - 1;
        if (nextLives <= 0) {
          setTimeout(() => setGameState('GAMEOVER'), 1200);
        }
        return nextLives;
      });
    }
  };

  const nextQuestion = () => {
    if (lives <= 0) {
      setGameState('GAMEOVER');
      return;
    }
    if (currentIdx + 1 >= levelData.length * 2) {
      setGameState('VICTORY');
      return;
    }
    setCurrentIdx(i => i + 1);
    setTimeLeft(15);
    setGameState('PLAYING');
  };

  return (
    <div className="glass-panel rounded-3xl border border-teal-500/30 p-6 bg-slate-950/80 shadow-2xl relative overflow-hidden">
      {/* Background Arcade Pulse */}
      <div className="absolute -top-16 -right-16 w-64 h-64 bg-teal-500/10 rounded-full blur-3xl pointer-events-none" />

      {/* Header */}
      <div className="flex items-center justify-between pb-4 mb-4 border-b border-slate-800">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-amber-500 to-teal-600 flex items-center justify-center text-slate-950 font-bold shadow-lg shadow-amber-500/20">
            <Gamepad2 className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-base font-extrabold text-white flex items-center gap-2">
              Jeu 2D Simulation Clinique — {semesterCode}
              <span className="px-2 py-0.5 rounded-full bg-amber-500/15 border border-amber-500/30 text-amber-300 text-[10px] font-bold">
                Arcade Médical
              </span>
            </h3>
            <p className="text-xs text-slate-400">Prenez les décisions d urgence médicale avant la fin du chrono !</p>
          </div>
        </div>

        {gameState === 'PLAYING' && (
          <div className="flex items-center gap-4">
            {/* Lives */}
            <div className="flex items-center gap-1">
              {[1, 2, 3].map(heart => (
                <span key={heart} className={`text-base ${heart <= lives ? 'opacity-100 scale-110' : 'opacity-20'} transition-all`}>
                  ❤️
                </span>
              ))}
            </div>

            {/* Score & Streak */}
            <div className="bg-slate-900 border border-slate-800 px-3 py-1.5 rounded-xl flex items-center gap-3 text-xs">
              <span className="font-bold text-teal-300">{score} pts</span>
              {streak > 1 && (
                <span className="font-bold text-amber-400 text-[11px] flex items-center gap-0.5">
                  <Flame className="w-3.5 h-3.5" /> x{streak}
                </span>
              )}
            </div>
          </div>
        )}
      </div>

      {/* IDLE STATE */}
      {gameState === 'IDLE' && (
        <div className="text-center py-10 space-y-4">
          <div className="w-16 h-16 rounded-3xl bg-teal-500/15 border border-teal-500/30 flex items-center justify-center text-teal-400 mx-auto animate-bounce">
            <Trophy className="w-8 h-8" />
          </div>
          <h4 className="text-lg font-bold text-white">Prêt à relever le Défi Médical 2D ?</h4>
          <p className="text-xs text-slate-300 max-w-md mx-auto leading-relaxed">
            Testez vos réflexes cliniques ! Répondez aux urgences vitales du semestre <span className="text-teal-300 font-bold">{semesterCode}</span> avant le temps imparti.
          </p>
          <button
            onClick={startGame}
            className="px-8 py-3 rounded-2xl bg-gradient-to-r from-teal-500 to-cyan-500 text-slate-950 font-extrabold text-sm shadow-xl shadow-teal-500/30 hover:scale-105 transition-transform flex items-center gap-2 mx-auto"
          >
            <Zap className="w-4 h-4 fill-current" />
            Lancer la Simulation 2D
          </button>
        </div>
      )}

      {/* PLAYING / FEEDBACK STATE */}
      {(gameState === 'PLAYING' || gameState === 'FEEDBACK') && (
        <div className="space-y-5">
          {/* Patient Card HUD */}
          <div className="bg-slate-900/90 border border-teal-500/30 rounded-2xl p-4 flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="space-y-1">
              <span className="text-[10px] uppercase font-mono font-bold tracking-widest text-teal-400">{currentQ.category}</span>
              <p className="text-sm font-bold text-white leading-relaxed">{currentQ.scenario}</p>
            </div>
            <div className="flex items-center gap-3 shrink-0">
              <div className="bg-slate-950 px-3 py-1.5 rounded-xl border border-slate-800 text-[11px] font-mono text-cyan-300 font-semibold flex items-center gap-1.5">
                <HeartPulse className="w-3.5 h-3.5 text-rose-400 animate-pulse" />
                {currentQ.vitalSign}
              </div>
              <div className={`px-3 py-1.5 rounded-xl border text-xs font-mono font-bold flex items-center gap-1 ${timeLeft <= 5 ? 'bg-rose-500/20 text-rose-300 border-rose-500/40 animate-ping' : 'bg-slate-800 text-amber-300 border-slate-700'}`}>
                <Timer className="w-3.5 h-3.5" />
                {timeLeft}s
              </div>
            </div>
          </div>

          {/* Decision Choices */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            {currentQ.options.map((opt, idx) => (
              <button
                key={idx}
                disabled={gameState === 'FEEDBACK'}
                onClick={() => handleOptionSelect(opt.isCorrect, opt.actionEffect)}
                className={`p-4 rounded-2xl border text-xs text-left font-bold transition-all flex flex-col justify-between min-h-[90px] ${
                  gameState === 'FEEDBACK'
                    ? opt.isCorrect
                      ? 'bg-emerald-950/80 border-emerald-500 text-emerald-200'
                      : 'bg-slate-900/40 border-slate-800 text-slate-500 opacity-50'
                    : 'bg-slate-900/80 border-slate-800 hover:border-teal-500/60 hover:bg-slate-800 text-slate-200 hover:scale-[1.02]'
                }`}
              >
                <div className="flex items-center justify-between w-full mb-2">
                  <span className="w-6 h-6 rounded-lg bg-slate-800 text-slate-300 flex items-center justify-center font-mono text-[11px]">
                    {String.fromCharCode(65 + idx)}
                  </span>
                  {gameState === 'FEEDBACK' && opt.isCorrect && <CheckCircle2 className="w-4 h-4 text-emerald-400" />}
                </div>
                <span className="leading-snug">{opt.text}</span>
              </button>
            ))}
          </div>

          {/* Feedback banner */}
          {gameState === 'FEEDBACK' && lastAnswer && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className={`p-4 rounded-2xl border text-xs flex items-center justify-between ${
                lastAnswer.isCorrect
                  ? 'bg-emerald-950/80 border-emerald-500 text-emerald-200'
                  : 'bg-rose-950/80 border-rose-500 text-rose-200'
              }`}
            >
              <div className="flex items-center gap-3">
                {lastAnswer.isCorrect ? <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" /> : <ShieldAlert className="w-5 h-5 text-rose-400 shrink-0" />}
                <div>
                  <span className="font-extrabold uppercase text-[10px] tracking-wider block">
                    {lastAnswer.isCorrect ? '✓ Décision Médicale Correcte !' : '❌ Erreur Clinique !'}
                  </span>
                  <span>{lastAnswer.text}</span>
                </div>
              </div>
              <button
                onClick={nextQuestion}
                className="px-4 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs border border-slate-700 shrink-0"
              >
                Suivant ➔
              </button>
            </motion.div>
          )}
        </div>
      )}

      {/* GAMEOVER / VICTORY */}
      {(gameState === 'GAMEOVER' || gameState === 'VICTORY') && (
        <div className="text-center py-8 space-y-4">
          <div className="w-16 h-16 rounded-3xl bg-slate-900 border border-slate-800 flex items-center justify-center mx-auto text-2xl">
            {gameState === 'VICTORY' ? '🏆' : '💀'}
          </div>
          <h4 className="text-lg font-bold text-white">
            {gameState === 'VICTORY' ? 'Félicitations Docteur ! Simulation Validée' : 'Échec de la Réanimation'}
          </h4>
          <p className="text-xs text-slate-300">
            Score Final : <span className="text-teal-300 font-bold text-sm">{score} pts</span>
          </p>
          <button
            onClick={startGame}
            className="px-6 py-2.5 rounded-xl bg-teal-500 hover:bg-teal-400 text-slate-950 font-bold text-xs shadow-lg transition-all flex items-center gap-2 mx-auto"
          >
            <RefreshCcw className="w-4 h-4" /> Recommencer la Partie
          </button>
        </div>
      )}
    </div>
  );
}
