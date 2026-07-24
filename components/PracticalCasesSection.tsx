'use client';
// components/PracticalCasesSection.tsx
// MedEdu Morocco — Practical Clinical Exams & ECOS Station (Interprétation ECG, Imagerie, Biologie & Cas Pratiques)

import React, { useState } from 'react';
import { 
  Stethoscope, Activity, FileText, CheckCircle2, AlertTriangle, 
  Eye, HelpCircle, ArrowRight, RefreshCcw, Sparkles, Brain, Award
} from 'lucide-react';

interface PracticalCase {
  id: string;
  category: 'ECG' | 'IMAGERIE' | 'BIOLOGIE' | 'ECOS_PRATIQUE';
  title: string;
  patientHistory: string;
  clinicalExam: string;
  examData: string;
  questionsStep: {
    stepNum: number;
    questionText: string;
    options: { id: string; text: string }[];
    correctOption: string;
    explanation: string;
  }[];
}

const PRACTICAL_CLINICAL_CASES: PracticalCase[] = [
  {
    id: 'case-ecg-01',
    category: 'ECG',
    title: 'Station ECOS #1 : Interprétation d un ECG de Garde aux Urgences',
    patientHistory: 'Homme de 62 ans, hypertendu, diabétique, consultant à H2 pour douleur rétrosternale constrictive irradiant vers la mâchoire avec sueurs froides.',
    clinicalExam: 'PA: 155/90 mmHg, FC: 98 bpm, SpO2: 96% en air ambiant. Auscultation cardiopulmonaire sans rales.',
    examData: 'ECG 12 dérivations : Rythme sinusal régulier, Onde de Pardee (sus-décalage du segment ST de 4 mm) de V1 à V4 avec miroir sous-décalé en inférieur (DII, DIII, aVF).',
    questionsStep: [
      {
        stepNum: 1,
        questionText: 'Quel est le diagnostic électrocardiographique précis et le territoire coronarien concerné ?',
        options: [
          { id: 'A', text: 'SCA ST+ Inférieur par occlusion de l Artère Coronaire Droite' },
          { id: 'B', text: 'SCA ST+ Antero-Septal par occlusion de l Interventiculaire Antérieure (IVA)' },
          { id: 'C', text: 'Péricardite Aiguë par sus-décalage diffus concave vers le haut' },
          { id: 'D', text: 'Bloc de Branche Gauche complet récent' },
          { id: 'E', text: 'Ischémie sous-endocardique postérieure' },
        ],
        correctOption: 'B',
        explanation: 'Explication ECOS : Le sus-décalage du segment ST convexe vers le haut de V1 à V4 avec miroir inférieur signe l infarctus antérieur ou antéro-septal aigu par occlusion du troncs de l IVA.',
      },
      {
        stepNum: 2,
        questionText: 'Quelle est la conduite à tenir thérapeutique immédiate au SMUR / Urgences (Délai d accès au cathétérisme = 40 minutes) ?',
        options: [
          { id: 'A', text: 'Transfert d urgence pour Angioplastie Primaire (ICP) + Aspirine 300mg + Ticagrélor 180mg + Héparine' },
          { id: 'B', text: 'Thrombolyse IV immédiate par Tenectéplase et surveillance en salle de repos' },
          { id: 'C', text: 'Prescription de dérivés nitrés IV seuls et dosage de troponine à H6' },
          { id: 'D', text: 'Pose d un Pacemaker provisoire par voie veineuse centrale' },
          { id: 'E', text: 'Scintigraphie myocardique d effort au décours' },
        ],
        correctOption: 'A',
        explanation: 'Explication ECOS : Si l angioplastie primaire peut être réalisée dans un délai < 120 minutes par une équipe entraînée, elle constitue la stratégie de revascularisation recommandée (Recommandations ESC/SMC).',
      },
    ],
  },
  {
    id: 'case-img-01',
    category: 'IMAGERIE',
    title: 'Station ECOS #2 : Radio du Thorax & Détresse Respiratoire Aiguë',
    patientHistory: 'Homme de 22 ans, grand et longiligne, survenu brutalement lors d un effort de toux d une douleur thoracique droite vive en coup de poignard et dyspnée.',
    clinicalExam: 'Auscultation : Abolition du murmure vésiculaire à droite, tympanisme à la percussion et abolition des vibrations vocales.',
    examData: 'Radiographie du thorax de face en inspiration : Hyperclarté avasculaire périphérique du champ pulmonaire droit avec liseré pleural viscéral bien visible.',
    questionsStep: [
      {
        stepNum: 1,
        questionText: 'Quel est le diagnostic radiologique principal ?',
        options: [
          { id: 'A', text: 'Pneumopathie Lobaire Moyenne Droite' },
          { id: 'B', text: 'Pneumothorax Spontané Primordial Droit Complet' },
          { id: 'C', text: 'Pleurésie Séro-Hématique de Grande Abondance' },
          { id: 'D', text: 'Abonnement d emphysème bulleux géant' },
          { id: 'E', text: 'Abonnement d opacité de l atélectasie' },
        ],
        correctOption: 'B',
        explanation: 'Explication ECOS : La triade d Gaillard (abolition du MV, tympanisme, abolition des VV) associée à l hyperclarté avasculaire périphérique et liseré pleural signe le Pneumothorax complet.',
      },
    ],
  },
];

export default function PracticalCasesSection() {
  const [selectedCase, setSelectedCase] = useState<PracticalCase>(PRACTICAL_CLINICAL_CASES[0]);
  const [userAnswers, setUserAnswers] = useState<Record<string, string>>({});
  const [submitted, setSubmitted] = useState<boolean>(false);

  const handleSelectOption = (qIdx: number, optId: string) => {
    if (submitted) return;
    setUserAnswers(prev => ({ ...prev, [qIdx]: optId }));
  };

  return (
    <div className="space-y-6">
      {/* Banner */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-slate-900 via-slate-800 to-cyan-950 border border-cyan-500/20 p-6 sm:p-8 shadow-2xl">
        <div className="relative z-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/15 border border-cyan-500/30 text-cyan-300 text-xs font-bold mb-3">
            <Stethoscope className="w-3.5 h-3.5" />
            <span>Examens Pratiques & ECOS (Pratique Médicale)</span>
          </div>
          <h2 className="text-xl sm:text-3xl font-extrabold text-white tracking-tight leading-tight mb-2">
            🔬 Cas Cliniques Pratiques & Interprétation d Imagerie / ECG
          </h2>
          <p className="text-xs sm:text-sm text-slate-300 max-w-2xl leading-relaxed">
            Entraînez-vous sur les cas cliniques réels, interprétations d ECG, radiographies thoraciques et bilans biologiques des stages internés et ECOS nationaux du Maroc.
          </p>
        </div>
      </div>

      {/* Case Selector Tabs */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {PRACTICAL_CLINICAL_CASES.map(c => (
          <div
            key={c.id}
            onClick={() => { setSelectedCase(c); setSubmitted(false); setUserAnswers({}); }}
            className={`p-5 rounded-2xl border cursor-pointer transition-all ${
              selectedCase.id === c.id
                ? 'bg-cyan-950/40 border-cyan-500 shadow-xl ring-2 ring-cyan-500/30'
                : 'bg-slate-900/60 border-slate-800 hover:border-cyan-500/40 hover:bg-slate-900'
            }`}
          >
            <div className="flex items-center justify-between mb-2">
              <span className="px-2.5 py-0.5 rounded-full bg-cyan-500/15 text-cyan-300 border border-cyan-500/30 text-[10px] font-bold font-mono">
                {c.category}
              </span>
              <span className="text-[10px] text-slate-400 font-semibold">{c.questionsStep.length} Étapes d Examen</span>
            </div>
            <h4 className="text-sm font-bold text-white mb-1 leading-snug">{c.title}</h4>
            <p className="text-xs text-slate-400 line-clamp-2">{c.patientHistory}</p>
          </div>
        ))}
      </div>

      {/* Selected Case Workspace */}
      <div className="glass-panel rounded-3xl p-6 sm:p-8 border border-slate-800 bg-slate-950/90 shadow-2xl space-y-6">
        <div className="pb-4 border-b border-slate-800">
          <span className="px-3 py-1 rounded-full bg-cyan-500/15 border border-cyan-500/30 text-cyan-300 text-xs font-bold font-mono">
            {selectedCase.category}
          </span>
          <h3 className="text-lg sm:text-xl font-bold text-white mt-2">{selectedCase.title}</h3>
        </div>

        {/* Patient Clinical Profile Card */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="p-4 rounded-2xl bg-slate-900/80 border border-slate-800">
            <span className="text-[11px] font-bold text-teal-400 uppercase tracking-wider block mb-1">
              👤 Anamnèse & Histoire Maladie
            </span>
            <p className="text-xs text-slate-300 leading-relaxed">{selectedCase.patientHistory}</p>
          </div>
          <div className="p-4 rounded-2xl bg-slate-900/80 border border-slate-800">
            <span className="text-[11px] font-bold text-cyan-400 uppercase tracking-wider block mb-1">
              🩺 Examen Clinique & Constantes
            </span>
            <p className="text-xs text-slate-300 leading-relaxed">{selectedCase.clinicalExam}</p>
          </div>
          <div className="p-4 rounded-2xl bg-slate-900/80 border border-slate-800">
            <span className="text-[11px] font-bold text-amber-400 uppercase tracking-wider block mb-1">
              📊 Imagerie / Tracé ECG / Biologie
            </span>
            <p className="text-xs text-slate-300 leading-relaxed">{selectedCase.examData}</p>
          </div>
        </div>

        {/* Questions Steps */}
        <div className="space-y-6 pt-4 border-t border-slate-800">
          {selectedCase.questionsStep.map((q, idx) => {
            const isUserRight = userAnswers[idx] === q.correctOption;
            return (
              <div key={idx} className="p-5 rounded-2xl bg-slate-900/90 border border-slate-800">
                <div className="flex items-start gap-3 mb-4">
                  <span className="w-7 h-7 rounded-xl bg-cyan-500/20 border border-cyan-500/40 text-cyan-300 font-mono font-bold text-xs flex items-center justify-center shrink-0">
                    E{q.stepNum}
                  </span>
                  <p className="text-sm font-semibold text-white leading-relaxed">{q.questionText}</p>
                </div>

                <div className="grid grid-cols-1 gap-2.5 pl-0 sm:pl-10">
                  {q.options.map(opt => {
                    const isSelected = userAnswers[idx] === opt.id;
                    const isRight = opt.id === q.correctOption;
                    let style = 'bg-slate-950/60 border-slate-800 text-slate-300 hover:border-cyan-500/40';

                    if (submitted) {
                      if (isRight) style = 'bg-emerald-950/70 border-emerald-500 text-emerald-200 font-bold';
                      else if (isSelected) style = 'bg-rose-950/70 border-rose-500 text-rose-200';
                    } else if (isSelected) {
                      style = 'bg-cyan-600/20 border-cyan-400 text-cyan-200 font-bold';
                    }

                    return (
                      <button
                        key={opt.id}
                        disabled={submitted}
                        onClick={() => handleSelectOption(idx, opt.id)}
                        className={`p-3.5 rounded-xl border text-xs text-left transition-all flex items-start gap-3 ${style}`}
                      >
                        <span className="w-6 h-6 rounded-lg bg-slate-800 text-slate-300 font-mono font-bold text-[11px] flex items-center justify-center shrink-0">
                          {opt.id}
                        </span>
                        <span className="leading-relaxed">{opt.text}</span>
                      </button>
                    );
                  })}
                </div>

                {submitted && (
                  <div className="mt-4 ml-0 sm:ml-10 p-4 rounded-xl bg-cyan-950/30 border border-cyan-500/30 text-xs">
                    <div className="font-bold text-cyan-400 mb-1 flex items-center gap-1.5">
                      <CheckCircle2 className="w-4 h-4" />
                      Correction du Cas Pratique / Station ECOS
                    </div>
                    <p className="text-slate-300 leading-relaxed">{q.explanation}</p>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Submit Bar */}
        <div className="flex justify-end pt-4">
          {!submitted ? (
            <button
              onClick={() => setSubmitted(true)}
              disabled={Object.keys(userAnswers).length < selectedCase.questionsStep.length}
              className="px-6 py-3 rounded-xl bg-gradient-to-r from-cyan-500 to-teal-500 text-slate-950 font-extrabold text-xs shadow-lg hover:opacity-95 transition-opacity disabled:opacity-40 disabled:cursor-not-allowed"
            >
              Valider les Réponses du Cas Pratique
            </button>
          ) : (
            <button
              onClick={() => { setSubmitted(false); setUserAnswers({}); }}
              className="px-6 py-3 rounded-xl bg-slate-800 hover:bg-slate-700 text-white font-bold text-xs transition-colors"
            >
              Recommencer le Cas Pratique
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
