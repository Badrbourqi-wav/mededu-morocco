'use client';
// components/AnimatedPhysiology.tsx
// Framer Motion SVG Animated Physiological Diagrams
// MedEdu Morocco — Interactive Medical Animations

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence, useAnimation } from 'framer-motion';
import { Play, Pause, RotateCcw, Info, Zap, Activity, Droplets } from 'lucide-react';

type ProcessType =
  | 'CARDIAC_ACTION_POTENTIAL'
  | 'RENIN_ANGIOTENSIN_ALDOSTERONE'
  | 'SYNAPTIC_TRANSMISSION'
  | 'CARDIAC_CYCLE';

interface AnimatedPhysiologyProps {
  type: ProcessType;
  className?: string;
}

// ─────────────────────────────────────────────────────────────────
// CARDIAC ACTION POTENTIAL ANIMATION
// ─────────────────────────────────────────────────────────────────

function CardiacActionPotential() {
  const [phase, setPhase] = useState<0 | 1 | 2 | 3 | 4>(4);
  const [playing, setPlaying] = useState(false);

  const phases = [
    {
      id: 0,
      label: 'Phase 0 — Dépolarisation Rapide',
      color: '#f43f5e',
      ion: 'Na⁺ ↓ (entrant)',
      mv: '+30 mV',
      channel: 'Canaux Na⁺ rapides (INa)',
      drug: 'Bloqués par : Lidocaïne, Flécaïnide',
      description: 'Ouverture massive des canaux Na⁺ voltage-dépendants. Dépolarisation de -90 mV à +30 mV en < 2 ms.',
    },
    {
      id: 1,
      label: 'Phase 1 — Repolarisation Initiale',
      color: '#fb923c',
      ion: 'K⁺ ↑ (sortant) + Na⁺ ↓ fermeture',
      mv: '0 mV',
      channel: 'Canaux Ito (K⁺ transitoire)',
      drug: 'Peu ciblée en thérapeutique',
      description: 'Repolarisation partielle rapide due à l\'inactivation des canaux Na⁺ et activation des canaux K⁺ transitoires (Ito).',
    },
    {
      id: 2,
      label: 'Phase 2 — Plateau (Spécifique au Cœur)',
      color: '#0d9488',
      ion: 'Ca²⁺ ↓ (entrant) = K⁺ ↑ (sortant)',
      mv: '+10 mV',
      channel: 'Canaux Ca²⁺ de type L (ICaL)',
      drug: 'Bloqués par : Verapamil, Diltiazem, DHP',
      description: 'UNIQUE AU CŒUR. Équilibre entre entrée Ca²⁺ (ICaL) et sortie K⁺. Le Ca²⁺ entrant déclenche la contraction musculaire (CICR).',
    },
    {
      id: 3,
      label: 'Phase 3 — Repolarisation Finale',
      color: '#8b5cf6',
      ion: 'K⁺ ↑↑ (sortant dominant)',
      mv: '-90 mV',
      channel: 'Canaux IKr + IKs (K⁺ rectifiants)',
      drug: 'Bloqués par : Amiodarone, Sotalol (classe III)',
      description: 'Repolarisation rapide vers le potentiel de repos via les courants K⁺ sortants (IKr, IKs). Allongement par hypoK⁺ ou antiarythmiques.',
    },
    {
      id: 4,
      label: 'Phase 4 — Potentiel de Repos / Diastole',
      color: '#06b6d4',
      ion: 'K⁺ équilibre + If (nœud SA)',
      mv: '-90 mV',
      channel: 'IK1 (cellules contractiles) / If (pacemaker)',
      drug: 'If bloqué par : Ivabradine',
      description: 'Potentiel de repos stable (-90 mV) dans les cellules contractiles. Dans le nœud sinusal, dépolarisation spontanée lente (If = courant "funny") → automatisme.',
    },
  ];

  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (playing) {
      timer = setInterval(() => {
        setPhase(prev => {
          const next = ((prev + 1) % 5) as 0 | 1 | 2 | 3 | 4;
          return next;
        });
      }, 2000);
    }
    return () => clearInterval(timer);
  }, [playing]);

  const currentPhase = phases[phase];

  // Build the action potential curve path
  // Phases: 4(-90) → 0(+30) → 1(0) → 2(+10) → 3(-90) → 4(-90)
  const pathD = `M 40 160 L 40 160 L 80 20 L 110 60 L 160 55 L 220 160 L 300 160`;

  const getPhaseX = (p: number) => {
    const xs = [80, 105, 145, 210, 280];
    return xs[p] || 280;
  };

  return (
    <div className="space-y-4">
      {/* SVG Curve */}
      <div className="relative bg-slate-950/90 rounded-2xl p-4 border border-slate-800 overflow-hidden">
        {/* Grid */}
        <svg viewBox="0 0 340 200" className="w-full h-48">
          {/* Grid lines */}
          {[20, 60, 100, 140, 180].map(y => (
            <line key={y} x1="30" y1={y} x2="320" y2={y} stroke="#1e293b" strokeWidth="1" />
          ))}
          {[80, 160, 240].map(x => (
            <line key={x} x1={x} y1="10" x2={x} y2="190" stroke="#1e293b" strokeWidth="1" strokeDasharray="4 4" />
          ))}
          {/* mV Labels */}
          <text x="5" y="24" fontSize="8" fill="#475569">+30</text>
          <text x="5" y="64" fontSize="8" fill="#475569">0</text>
          <text x="5" y="164" fontSize="8" fill="#475569">-90</text>
          {/* Baseline */}
          <line x1="30" y1="160" x2="320" y2="160" stroke="#334155" strokeWidth="1" strokeDasharray="6 3" />

          {/* Action Potential Curve */}
          <motion.path
            d={pathD}
            fill="none"
            stroke="#0d9488"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            filter="drop-shadow(0 0 6px rgba(13,148,136,0.6))"
            initial={{ pathLength: 0, opacity: 0 }}
            animate={{ pathLength: 1, opacity: 1 }}
            transition={{ duration: 1.5, ease: 'easeInOut' }}
          />

          {/* Animated Phase Marker */}
          <motion.circle
            cx={getPhaseX(phase)}
            cy={[20, 60, 55, 160, 160][phase]}
            r="6"
            fill={currentPhase.color}
            stroke="white"
            strokeWidth="2"
            filter="drop-shadow(0 0 8px currentColor)"
            animate={{
              cx: getPhaseX(phase),
              cy: [20, 60, 55, 160, 160][phase],
            }}
            transition={{ type: 'spring', stiffness: 120, damping: 14 }}
          />

          {/* Phase Labels on Curve */}
          {[0, 1, 2, 3, 4].map(p => (
            <text
              key={p}
              x={getPhaseX(p)}
              y={[10, 50, 45, 185, 185][p]}
              fontSize="8"
              fill={p === phase ? phases[p].color : '#475569'}
              textAnchor="middle"
              fontWeight={p === phase ? 'bold' : 'normal'}
            >
              Ph.{p}
            </text>
          ))}
        </svg>

        {/* Phase Selector Buttons */}
        <div className="flex items-center justify-center gap-2 mt-2">
          {phases.map(p => (
            <button
              key={p.id}
              onClick={() => { setPhase(p.id as any); setPlaying(false); }}
              className={`w-7 h-7 rounded-lg text-[10px] font-bold border transition-all ${
                phase === p.id
                  ? 'text-slate-900 border-transparent'
                  : 'bg-slate-900 border-slate-700 text-slate-400 hover:border-slate-500'
              }`}
              style={phase === p.id ? { background: p.color } : {}}
            >
              {p.id}
            </button>
          ))}
          <div className="w-px h-5 bg-slate-700 mx-1" />
          <button
            onClick={() => setPlaying(!playing)}
            className="w-7 h-7 rounded-lg bg-teal-600 text-white flex items-center justify-center hover:bg-teal-500 transition-colors"
          >
            {playing ? <Pause className="w-3 h-3" /> : <Play className="w-3 h-3" />}
          </button>
          <button
            onClick={() => { setPhase(4); setPlaying(false); }}
            className="w-7 h-7 rounded-lg bg-slate-800 text-slate-400 flex items-center justify-center hover:bg-slate-700"
          >
            <RotateCcw className="w-3 h-3" />
          </button>
        </div>
      </div>

      {/* Phase Info Card */}
      <AnimatePresence mode="wait">
        <motion.div
          key={phase}
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -8 }}
          transition={{ duration: 0.25 }}
          className="rounded-xl p-4 border"
          style={{
            background: `${currentPhase.color}12`,
            borderColor: `${currentPhase.color}40`,
          }}
        >
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-bold" style={{ color: currentPhase.color }}>
              {currentPhase.label}
            </span>
            <span className="text-xs font-mono font-bold text-white bg-slate-900/80 px-2 py-0.5 rounded-lg border border-slate-700">
              {currentPhase.mv}
            </span>
          </div>
          <p className="text-xs text-slate-300 leading-relaxed mb-3">{currentPhase.description}</p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-[11px]">
            <div className="bg-slate-900/60 rounded-lg p-2 border border-slate-800">
              <span className="text-slate-400 block mb-0.5">Ion dominant</span>
              <span className="font-semibold text-white">{currentPhase.ion}</span>
            </div>
            <div className="bg-slate-900/60 rounded-lg p-2 border border-slate-800">
              <span className="text-slate-400 block mb-0.5">Canal impliqué</span>
              <span className="font-semibold text-white">{currentPhase.channel}</span>
            </div>
          </div>
          <div className="mt-2 flex items-start gap-2 bg-amber-500/10 border border-amber-500/25 rounded-lg p-2">
            <Zap className="w-3.5 h-3.5 text-amber-400 shrink-0 mt-0.5" />
            <span className="text-[11px] text-amber-200/90 font-medium">{currentPhase.drug}</span>
          </div>
        </motion.div>
      </AnimatePresence>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────
// RAAS ANIMATION
// ─────────────────────────────────────────────────────────────────

function RaasAnimation() {
  const [activeStep, setActiveStep] = useState(0);
  const [playing, setPlaying] = useState(false);

  const steps = [
    { id: 0, organ: 'Rein (cellules JGA)', molecule: 'Rénine', trigger: 'Hypotension, Hyponatrémie, Stimulation β1', color: '#ef4444', x: 160, y: 30 },
    { id: 1, organ: 'Foie', molecule: 'Angiotensinogène → Angiotensine I', trigger: 'Rénine clive l\'angiotensinogène', color: '#f97316', x: 260, y: 100 },
    { id: 2, organ: 'Poumons (ECA)', molecule: 'Angiotensine I → Angiotensine II', trigger: 'Enzyme de conversion (ECA)', color: '#0d9488', x: 260, y: 170 },
    { id: 3, organ: 'Surrénale (zona glomerulosa)', molecule: 'Aldostérone ↑', trigger: 'Ang II stimule la surrénale', color: '#8b5cf6', x: 160, y: 240 },
    { id: 4, organ: 'Rein + Cerveau + Vaisseaux', molecule: 'Effets finaux', trigger: 'Rétention Na⁺/H₂O, vasoconstriction, soif', color: '#06b6d4', x: 60, y: 170 },
  ];

  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (playing) timer = setInterval(() => setActiveStep(p => (p + 1) % steps.length), 2000);
    return () => clearInterval(timer);
  }, [playing]);

  const drugs = [
    { target: 'Rénine', drug: 'Aliskirène (IRD)', color: '#ef4444' },
    { target: 'ECA', drug: 'IEC (énalapril, ramipril)', color: '#0d9488' },
    { target: 'Récepteur AT1', drug: 'ARAII (losartan, valsartan)', color: '#8b5cf6' },
    { target: 'Aldostérone', drug: 'Spironolactone, Éplérénone', color: '#f97316' },
  ];

  return (
    <div className="space-y-4">
      <div className="relative bg-slate-950/90 rounded-2xl border border-slate-800 overflow-hidden p-4">
        <svg viewBox="0 0 340 280" className="w-full h-56">
          {/* Connection arrows */}
          {steps.map((step, i) => {
            if (i === steps.length - 1) return null;
            const next = steps[i + 1];
            return (
              <motion.line
                key={`line-${i}`}
                x1={step.x} y1={step.y + 15}
                x2={next.x} y2={next.y - 15}
                stroke={i <= activeStep ? step.color : '#1e293b'}
                strokeWidth="2"
                strokeDasharray="6 3"
                animate={{ opacity: i <= activeStep ? 1 : 0.3 }}
                transition={{ duration: 0.4 }}
              />
            );
          })}
          {/* Last arrow back to kidney (feedback) */}
          <motion.path
            d={`M ${steps[4].x - 15} ${steps[4].y} Q 10 200 ${steps[0].x - 20} ${steps[0].y + 15}`}
            fill="none"
            stroke={activeStep === 4 ? '#06b6d4' : '#1e293b'}
            strokeWidth="1.5"
            strokeDasharray="4 4"
            animate={{ opacity: activeStep === 4 ? 1 : 0.3 }}
          />

          {/* Step Nodes */}
          {steps.map((step, i) => (
            <g key={step.id} onClick={() => { setActiveStep(i); setPlaying(false); }} style={{ cursor: 'pointer' }}>
              <motion.circle
                cx={step.x} cy={step.y}
                r={i === activeStep ? 18 : 13}
                fill={i === activeStep ? step.color : '#1e293b'}
                stroke={step.color}
                strokeWidth="2"
                animate={{ r: i === activeStep ? 18 : 13 }}
                transition={{ type: 'spring', stiffness: 200 }}
                filter={i === activeStep ? `drop-shadow(0 0 10px ${step.color})` : undefined}
              />
              <text x={step.x} y={step.y + 4} textAnchor="middle" fontSize="10" fill="white" fontWeight="bold">
                {step.id + 1}
              </text>
              <text x={step.x} y={step.y + 28} textAnchor="middle" fontSize="7" fill={step.color} fontWeight="600">
                {step.molecule.split('→')[0].trim().split(' ').slice(0, 2).join(' ')}
              </text>
            </g>
          ))}
        </svg>

        <div className="flex justify-center gap-2">
          <button
            onClick={() => setPlaying(!playing)}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-teal-600 text-white text-xs font-semibold"
          >
            {playing ? <Pause className="w-3 h-3" /> : <Play className="w-3 h-3" />}
            {playing ? 'Pause' : 'Animer'}
          </button>
          <button
            onClick={() => { setActiveStep(0); setPlaying(false); }}
            className="p-1.5 rounded-lg bg-slate-800 text-slate-400"
          >
            <RotateCcw className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* Active Step Info */}
      <AnimatePresence mode="wait">
        <motion.div
          key={activeStep}
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -8 }}
          className="rounded-xl p-4 border border-slate-700 bg-slate-900/60 space-y-2"
        >
          <div className="flex items-center gap-2">
            <span className="w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-bold text-white" style={{ background: steps[activeStep].color }}>
              {activeStep + 1}
            </span>
            <span className="text-xs font-bold text-white">{steps[activeStep].organ}</span>
          </div>
          <p className="text-[11px] text-slate-400 leading-relaxed">{steps[activeStep].trigger}</p>
        </motion.div>
      </AnimatePresence>

      {/* Drug Block Panel */}
      <div className="grid grid-cols-2 gap-2">
        {drugs.map(d => (
          <div key={d.target} className="rounded-xl p-3 bg-slate-900/70 border border-slate-800 text-[11px]">
            <span className="block text-slate-400 mb-0.5">Blocage {d.target}</span>
            <span className="font-semibold" style={{ color: d.color }}>{d.drug}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────
// SYNAPTIC TRANSMISSION ANIMATION
// ─────────────────────────────────────────────────────────────────

function SynapticTransmission() {
  const [step, setStep] = useState(0);
  const [playing, setPlaying] = useState(false);

  const steps = [
    { label: 'Potentiel d\'action arrive → dépolarisation terminaison', detail: 'Le PA se propage le long de l\'axone jusqu\'à la terminaison présynaptique. Ouverture des canaux Na⁺.', color: '#f43f5e' },
    { label: 'Entrée Ca²⁺ via canaux voltage-dépendants', detail: 'La dépolarisation ouvre les canaux Ca²⁺ de type N/P/Q. Le Ca²⁺ entre dans la terminaison présynaptique.', color: '#fb923c' },
    { label: 'Fusion des vésicules synaptiques → exocytose', detail: 'Le Ca²⁺ se lie aux protéines SNARE (synaptotagmine). Les vésicules fusionnent avec la membrane → libération du NT dans la fente.', color: '#0d9488' },
    { label: 'Neurotransmetteur traverse la fente synaptique', detail: 'Le NT diffuse à travers la fente synaptique (20-40 nm). Liaison aux récepteurs post-synaptiques (ionotropes ou métabotropes).', color: '#8b5cf6' },
    { label: 'Activation récepteurs post-synaptiques → PPSE/PPSI', detail: 'PPSE (excitateur) = influx Na⁺/Ca²⁺ via AMPA/NMDA. PPSI (inhibiteur) = influx Cl⁻ via GABA-A. Sommation temporelle et spatiale.', color: '#06b6d4' },
    { label: 'Recapture + dégradation du neurotransmetteur', detail: 'Recapture par transporteurs présynaptiques (NET, DAT, SERT). Dégradation enzymatique (AChE pour acétylcholine, MAO pour catécholamines).', color: '#a3e635' },
  ];

  useEffect(() => {
    let t: NodeJS.Timeout;
    if (playing) t = setInterval(() => setStep(p => (p + 1) % steps.length), 2200);
    return () => clearInterval(t);
  }, [playing]);

  return (
    <div className="space-y-4">
      {/* Synapse SVG */}
      <div className="bg-slate-950/90 rounded-2xl border border-slate-800 p-4">
        <svg viewBox="0 0 340 160" className="w-full h-40">
          {/* Axon */}
          <rect x="10" y="50" width="120" height="60" rx="8" fill="#1e293b" stroke="#334155" strokeWidth="1.5" />
          <text x="70" y="75" textAnchor="middle" fontSize="9" fill="#94a3b8">Terminaison</text>
          <text x="70" y="88" textAnchor="middle" fontSize="9" fill="#94a3b8">Présynaptique</text>

          {/* Vesicles */}
          {[0, 1, 2, 3].map(i => (
            <motion.circle
              key={i}
              cx={30 + i * 25}
              cy={80}
              r="8"
              fill="#0d9488"
              fillOpacity="0.4"
              stroke="#0d9488"
              strokeWidth="1.5"
              animate={{
                cy: step >= 2 ? [80, 115, 115] : 80,
                fillOpacity: step >= 2 ? 0 : 0.4,
              }}
              transition={{ delay: i * 0.1, duration: 0.5 }}
            />
          ))}

          {/* Synaptic cleft */}
          <rect x="130" y="50" width="80" height="60" rx="2" fill="#0f172a" stroke="#1e293b" strokeWidth="1" />
          <text x="170" y="83" textAnchor="middle" fontSize="8" fill="#475569">Fente</text>
          <text x="170" y="93" textAnchor="middle" fontSize="8" fill="#475569">~30 nm</text>

          {/* NT molecules in cleft */}
          {step >= 3 && [0, 1, 2, 3, 4, 5].map(i => (
            <motion.circle
              key={`nt-${i}`}
              r="4"
              fill="#f59e0b"
              fillOpacity="0.9"
              initial={{ cx: 130 + (i % 3) * 8, cy: 55 + Math.floor(i / 3) * 50 }}
              animate={{ cx: 155 + (i % 4) * 10, cy: 60 + Math.floor(i / 4) * 40 }}
              transition={{ delay: i * 0.08, duration: 0.5 }}
            />
          ))}

          {/* Post-synaptic membrane */}
          <rect x="210" y="50" width="120" height="60" rx="8" fill="#1e293b" stroke="#334155" strokeWidth="1.5" />
          <text x="270" y="75" textAnchor="middle" fontSize="9" fill="#94a3b8">Membrane</text>
          <text x="270" y="88" textAnchor="middle" fontSize="9" fill="#94a3b8">Post-synaptique</text>

          {/* Receptors */}
          {step >= 4 && [0, 1, 2].map(i => (
            <motion.rect
              key={`rec-${i}`}
              x={220 + i * 22}
              y="105"
              width="14"
              height="8"
              rx="3"
              fill={steps[step].color}
              fillOpacity="0.8"
              initial={{ scaleY: 0 }}
              animate={{ scaleY: 1 }}
              transition={{ delay: i * 0.1 }}
            />
          ))}

          {/* Calcium ions */}
          {step === 1 && [0, 1, 2].map(i => (
            <motion.text
              key={`ca-${i}`}
              x={85 + i * 15}
              y={55}
              fontSize="8"
              fill="#06b6d4"
              fontWeight="bold"
              initial={{ y: 45, opacity: 0 }}
              animate={{ y: 65, opacity: 1 }}
              transition={{ delay: i * 0.15 }}
            >
              Ca²⁺
            </motion.text>
          ))}

          {/* Step indicator */}
          <text x="170" y="145" textAnchor="middle" fontSize="9" fill="#475569">
            Étape {step + 1}/6
          </text>
        </svg>

        {/* Step controls */}
        <div className="flex justify-center gap-2 mt-2">
          {steps.map((_, i) => (
            <button
              key={i}
              onClick={() => { setStep(i); setPlaying(false); }}
              className="w-6 h-6 rounded-full text-[10px] font-bold border transition-all"
              style={i === step
                ? { background: steps[i].color, borderColor: 'transparent', color: '#0f172a' }
                : { background: '#1e293b', borderColor: '#334155', color: '#64748b' }
              }
            >
              {i + 1}
            </button>
          ))}
          <button
            onClick={() => setPlaying(!playing)}
            className="w-6 h-6 rounded-full bg-teal-600 text-white flex items-center justify-center"
          >
            {playing ? <Pause className="w-3 h-3" /> : <Play className="w-3 h-3" />}
          </button>
        </div>
      </div>

      {/* Step Description */}
      <AnimatePresence mode="wait">
        <motion.div
          key={step}
          initial={{ opacity: 0, x: 10 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -10 }}
          className="rounded-xl p-4 border"
          style={{ borderColor: `${steps[step].color}35`, background: `${steps[step].color}0d` }}
        >
          <div className="flex items-center gap-2 mb-2">
            <span className="w-5 h-5 rounded-full text-[9px] font-bold flex items-center justify-center text-slate-900" style={{ background: steps[step].color }}>
              {step + 1}
            </span>
            <span className="text-xs font-bold" style={{ color: steps[step].color }}>{steps[step].label}</span>
          </div>
          <p className="text-[11px] text-slate-300 leading-relaxed">{steps[step].detail}</p>
        </motion.div>
      </AnimatePresence>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────
// MAIN COMPONENT
// ─────────────────────────────────────────────────────────────────

const PROCESS_META: Record<ProcessType, { title: string; icon: React.ReactNode; badge: string }> = {
  CARDIAC_ACTION_POTENTIAL: {
    title: 'Potentiel d\'Action Cardiaque — Phases 0 à 4',
    icon: <Zap className="w-5 h-5 text-rose-400" />,
    badge: 'Électrophysiologie Cardiaque',
  },
  RENIN_ANGIOTENSIN_ALDOSTERONE: {
    title: 'Système Rénine-Angiotensine-Aldostérone (SRAA)',
    icon: <Droplets className="w-5 h-5 text-teal-400" />,
    badge: 'Physiopathologie HTA & IC',
  },
  SYNAPTIC_TRANSMISSION: {
    title: 'Transmission Synaptique — Du PA à la Réponse',
    icon: <Activity className="w-5 h-5 text-purple-400" />,
    badge: 'Neurophysiologie Fondamentale',
  },
  CARDIAC_CYCLE: {
    title: 'Cycle Cardiaque',
    icon: <Activity className="w-5 h-5 text-cyan-400" />,
    badge: 'Cardiologie Physiologique',
  },
};

export default function AnimatedPhysiology({ type, className = '' }: AnimatedPhysiologyProps) {
  const meta = PROCESS_META[type];

  return (
    <div className={`glass-panel rounded-2xl p-5 border border-slate-700/60 bg-slate-900/70 ${className}`}>
      {/* Header */}
      <div className="flex items-center gap-3 mb-4 pb-4 border-b border-slate-800">
        <div className="w-9 h-9 rounded-xl bg-slate-800 border border-slate-700 flex items-center justify-center">
          {meta.icon}
        </div>
        <div>
          <span className="text-[10px] font-bold uppercase tracking-wider text-teal-400 bg-teal-500/10 px-2 py-0.5 rounded-full border border-teal-500/25 block mb-1">
            {meta.badge}
          </span>
          <h3 className="text-sm font-bold text-white leading-tight">{meta.title}</h3>
        </div>
      </div>

      {/* Animation Content */}
      {type === 'CARDIAC_ACTION_POTENTIAL' && <CardiacActionPotential />}
      {type === 'RENIN_ANGIOTENSIN_ALDOSTERONE' && <RaasAnimation />}
      {type === 'SYNAPTIC_TRANSMISSION' && <SynapticTransmission />}
      {type === 'CARDIAC_CYCLE' && (
        <div className="text-center py-8 text-slate-400 text-sm">
          <Activity className="w-10 h-10 mx-auto mb-2 text-cyan-400/50" />
          Animation du Cycle Cardiaque — Prochainement
        </div>
      )}

      {/* Footer Note */}
      <div className="mt-4 pt-3 border-t border-slate-800/60 flex items-center gap-2 text-[10px] text-slate-500">
        <Info className="w-3.5 h-3.5 text-teal-500/60 shrink-0" />
        <span>Cliquez sur les étapes pour naviguer • Référentiel CNOM Maroc & ESC Guidelines</span>
      </div>
    </div>
  );
}
