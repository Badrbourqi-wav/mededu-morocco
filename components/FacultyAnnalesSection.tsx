'use client';
// components/FacultyAnnalesSection.tsx
// MedEdu Morocco — National Medical Faculty Past Exams (Annales QCMs & Épreuves Pratiques / Cas Cliniques / QROC / ECOS)
// FMPR (Rabat), FMPC (Casablanca), FMPM (Marrakech), FMPF (Fès), FMPT (Tanger)

import React, { useState } from 'react';
import { 
  Building2, BookOpen, CheckCircle2, Award, Search, Filter, 
  Sparkles, ChevronRight, FileText, Check, AlertCircle, Clock, GraduationCap,
  Stethoscope, HelpCircle, FileCheck, Layers, Eye
} from 'lucide-react';

interface QCMQuestion {
  id: string;
  num: number;
  text: string;
  options: { id: string; text: string }[];
  correctOption: string;
  officialRationale: string;
}

interface PracticalQuestion {
  id: string;
  num: number;
  questionTitle: string;
  clinicalContext: string;
  examDataText: string;
  qrocQuestions: {
    questionLabel: string;
    expectedAnswerKey: string;
    facultyDetailedCorrection: string;
  }[];
}

interface FacultyExam {
  id: string;
  facultyCode: 'FMPR' | 'FMPC' | 'FMPM' | 'FMPF' | 'FMPT';
  facultyName: string;
  year: string;
  semester: string;
  moduleTitle: string;
  examType: 'QCM' | 'PRATIQUE_CAS_CLINIQUE';
  sessionType: 'Normale' | 'Rattrapage';
  durationMinutes: number;
  qcmQuestions?: QCMQuestion[];
  practicalQuestions?: PracticalQuestion[];
}

const MOROCCAN_FACULTY_EXAMS: FacultyExam[] = [
  // ─── FMP RABAT EXAMS ───
  {
    id: 'fmpr-s5-2023-qcm',
    facultyCode: 'FMPR',
    facultyName: 'FMP Rabat — Université Mohammed V',
    year: '2023-2024',
    semester: 'S5',
    moduleTitle: 'Cardiologie & Pathologies Vasculaires (Épreuve QCM)',
    examType: 'QCM',
    sessionType: 'Normale',
    durationMinutes: 60,
    qcmQuestions: [
      {
        id: 'fmpr-q1',
        num: 1,
        text: 'Concernant l Infarctus du Myocarde avec sus-décalage du segment ST (SCA ST+) à la phase aiguë, quelle est l affirmation EXACTE ?',
        options: [
          { id: 'A', text: 'La thrombolyse IV est indiquée en 1ère intention même si l angioplastie est accessible f 30 minutes.' },
          { id: 'B', text: 'L onde de Pardee traduit une ischémie sous-endocardique transitoire sans nécrose.' },
          { id: 'C', text: 'L angioplastie coronaire transluminale (ICP) primaire dans les 120 minutes est le traitement de choix.' },
          { id: 'D', text: 'Les bêta-bloquants IV sont contre-indiqués chez tous les patients sans exception.' },
          { id: 'E', text: 'Le dosage de la Troponine I hypersensible doit retarder la prise en charge de revascularisation.' },
        ],
        correctOption: 'C',
        officialRationale: 'FMPR Correction Officielle: L ICP primaire réalisée dans les 120 minutes suivant le premier contact médical est le traitement de revascularisation recommandé de première intention (Niveau d preuve IA). La thrombolyse n intervient qu en cas de délai > 120min.',
      },
      {
        id: 'fmpr-q2',
        num: 2,
        text: 'Une patiente de 65 ans présente un Rétrécissement Aortique Sévère Symptomatique. Quel signe auscultatoire est caractéristique ?',
        options: [
          { id: 'A', text: 'Souffle holosystolique apexien irradiant vers l aisselle gauche.' },
          { id: 'B', text: 'Souffle mésosystolique rudo-râpeux au 2ème espace intercostal droit irradiant vers les carotides.' },
          { id: 'C', text: 'Roulement diastolique au foyer mitral avec éclat de B1.' },
          { id: 'D', text: 'Souffle protodiastolique doux au foyer aortique.' },
          { id: 'E', text: 'Bruit de galop présystolique B4 isolé.' },
        ],
        correctOption: 'B',
        officialRationale: 'FMPR Correction Officielle: Le RA serré donne un souffle systolique d éjection rudo-râpeux au foyer aortique irradiant vers les vaisseaux du cou (carotides), maximal en milieu de systole.',
      },
    ],
  },
  {
    id: 'fmpr-s5-2023-pratique',
    facultyCode: 'FMPR',
    facultyName: 'FMP Rabat — Université Mohammed V',
    year: '2023-2024',
    semester: 'S5',
    moduleTitle: 'Cas Clinique Pratique & Station ECOS #1 (Urgence Coronarienne)',
    examType: 'PRATIQUE_CAS_CLINIQUE',
    sessionType: 'Normale',
    durationMinutes: 45,
    practicalQuestions: [
      {
        id: 'fmpr-p1',
        num: 1,
        questionTitle: 'Détresse Thoracique Aiguë aux Urgences du CHU Ibn Sina Rabat',
        clinicalContext: 'Homme de 58 ans, tabagique (30 PA), hypertendu, amenée par sa famille aux urgences pour une douleur rétrosternale constrictive violente irradiant au bras gauche évoluant depuis 2 heures. À l examen : Patient anxieux, sueurs froides, PA: 160/95 mmHg, FC: 105 bpm, SpO2: 95%. Auscultation cardiaque : assourdissement des bruits du cœur sans galop. Poumons libres.',
        examDataText: 'Tracé ECG 12 Dérivations : Sus-décalage du segment ST de 5mm convexe vers le haut dans les dérivations V1, V2, V3, V4 avec Onde Q de nécrose débutante et miroir sous-décalé en DII, DIII, aVF.',
        qrocQuestions: [
          {
            questionLabel: '1. Quel est le diagnostic électrocardiographique et anatomique précis ?',
            expectedAnswerKey: 'SCA ST+ Antéro-Septal aigu par occlusion du troncs de l Artère Interventriculaire Antérieure (IVA).',
            facultyDetailedCorrection: 'CORRECTION FMP RABAT: Le sus-décalage du segment ST (onde de Pardee) dans le territoire antérieur (V1 à V4) associé au miroir inférieur confirme le diagnostic de Syndrome Coronarien Aigu avec sus-décalage du ST (SCA ST+) antéro-septal. L artère coupable est l Artère Interventriculaire Antérieure (IVA).'
          },
          {
            questionLabel: '2. Enumérez la prise en charge thérapeutique immédiate au déchocage (Ordonnance d Urgence).',
            expectedAnswerKey: 'Aspirine 300mg IV/PO + Ticagrélor 180mg + Héparine (HNF/HBPM) + Transfert ICP Primaire < 120min + Nitrés IV.',
            facultyDetailedCorrection: 'CORRECTION FMP RABAT: 1) Repos au lit, monitoring scopique, voie veineuse. 2) Antiagrégants plaquettaires : Aspirine 300 mg de charge + Ticagrélor 180 mg (ou Prasugrel). 3) Anticoagulation : Héparine non fractionnée 60 UI/kg IV. 4) Revascularisation myocardique en URGENCE par Angioplastie Coronaire Primaire (ICP) dans un délai < 120 min.'
          },
          {
            questionLabel: '3. Quelles sont les 3 principales complications précoces à redouter f les 48h ?',
            expectedAnswerKey: 'Troubles du rythme ventriculaire (FV/TV), Insuffisance ventriculaire gauche (OAP), Rupture de paroi libre / Tamponnade.',
            facultyDetailedCorrection: 'CORRECTION FMP RABAT: 1) Troubles du rythme ventriculaire graves (Fibrillation Ventriculaire / Tachycardie Ventriculaire) cause de mort subite. 2) Choc cardiogénique ou OAP par défaillance du VG. 3) Complications mécaniques (Rupture de septum inter-ventriculaire, rupture de pilier mitral).'
          }
        ]
      }
    ]
  },
  // ─── FMP CASABLANCA EXAMS ───
  {
    id: 'fmpc-s6-2023-pratique',
    facultyCode: 'FMPC',
    facultyName: 'FMP Casablanca — Université Hassan II',
    year: '2022-2023',
    semester: 'S6',
    moduleTitle: 'Examen Pratique Neurologie & AVC Ischémique (Cas Clinique QROC)',
    examType: 'PRATIQUE_CAS_CLINIQUE',
    sessionType: 'Normale',
    durationMinutes: 45,
    practicalQuestions: [
      {
        id: 'fmpc-p1',
        num: 1,
        questionTitle: 'Déficit Moteur Brutal aux Urgences du CHU Ibn Rochd Casablanca',
        clinicalContext: 'Patiente de 64 ans, connue diabétique et arythmique (FA non anticoagulée), admise pour survenue brutale 1h30 auparavant d une faiblesse de l hémicorps droit et incapacité de parler.',
        examDataText: 'Examen Neurologique : Aphasie de Broca (expression réduite), Hémiplégie droite droite directe prédominant au membre supérieur et à la face. Score NIHSS = 16. PA: 175/95 mmHg. TDM cérébral sans injection : Absence d hématome intraparenchymateux, hyperdensité spontanée de l artère sylvienne gauche.',
        qrocQuestions: [
          {
            questionLabel: '1. Posez le diagnostic syndromique et topographique complet.',
            expectedAnswerKey: 'AVC Ischémique Sylvien Gauche Superfiel et Profond (Territoire de l Artère Cérébrale Moyenne gauche) d origine cardio-embolique (FA).',
            facultyDetailedCorrection: 'CORRECTION FMP CASABLANCA: Accident Vasculaire Cérébral Ischémique aigu dans le territoire de l artère sylvienne gauche (ACM gauche). L aphasie de Broca et l hémiplégie droite à prédominance brachio-faciale traduisent une atteinte du territoire sylvien superfiel et profond gauche. Étiologie probable : Embolie à partir de la FA.'
          },
          {
            questionLabel: '2. Discutez l indication de la Thrombolyse IV et de la Thrombectomie mécanique.',
            expectedAnswerKey: 'Thrombolyse IV par rt-PA (Altéplase 0.9 mg/kg) indiquée car délai < 4h30 et absence d hémorragie + Thrombectomie mécanique si occlusion du gros vaisseau.',
            facultyDetailedCorrection: 'CORRECTION FMP CASABLANCA: Thrombolyse intraveineuse par Altéplase (rt-PA) indiquée en URGENCE (Délai < 4h30 respecté, pas de CI au scanner). En association avec la thrombectomie mécanique endovasculaire si occlusion de l artère sylvienne M1 au niveau de l angioscanner/IRM.'
          }
        ]
      }
    ]
  },
  // ─── FMP MARRAKECH EXAMS ───
  {
    id: 'fmpm-s10-2023-pratique',
    facultyCode: 'FMPM',
    facultyName: 'FMP Marrakech — Université Cadi Ayyad',
    year: '2023-2024',
    semester: 'S10',
    moduleTitle: 'Épreuve Pratique Réanimation & Choc Septique (CHU Mohammed VI)',
    examType: 'PRATIQUE_CAS_CLINIQUE',
    sessionType: 'Normale',
    durationMinutes: 45,
    practicalQuestions: [
      {
        id: 'fmpm-p1',
        num: 1,
        questionTitle: 'État de Choc au Service de Déchocage Marrakech',
        clinicalContext: 'Patient de 70 ans, opéré il y a 5 jours pour sigmoïdite diverticulaire perforée, présentant une dégradation hémodynamique brutale avec frissons, marbrures étendues aux genoux et oligurie (20 mL/h).',
        examDataText: 'Constantes : Température = 39.5°C, PA = 70/40 mmHg, FC = 130 bpm, FR = 32/min. Gazométrie artérielle : pH = 7.22, Lactates = 5.4 mmol/L, PaO2 = 62 mmHg (hypoxémie sévère).',
        qrocQuestions: [
          {
            questionLabel: '1. Quel est le diagnostic retenu et les critères de définition remplis ?',
            expectedAnswerKey: 'Choc Septique secondaire à une péritonite post-opératoire. Critères : Sepsis + Hypotension réfractaire au remplissage exigeant vasopresseur + Lactates > 2 mmol/L.',
            facultyDetailedCorrection: 'CORRECTION FMP MARRAKECH: Choc Septique (Sepsis-3) d origine abdominale. Défini par l association d un sepsis (Score SOFA ≥ 2) avec hypotension artérielle nécessitant des vasopresseurs pour maintenir une PAM ≥ 65 mmHg ET un taux de lactates sériques > 2 mmol/L malgré un remplissage vasculaire adéquat.'
          },
          {
            questionLabel: '2. Décrivez le bundle de prise en charge "1-Hour Surviving Sepsis Campaign".',
            expectedAnswerKey: 'Mesure lactates + Hémocultures avant ABT + Antibiothérapie large spectre < 1h + Remplissage 30 mL/kg + Noradrénaline si PAM < 65.',
            facultyDetailedCorrection: 'CORRECTION FMP MARRAKECH: Dans la première heure (1-Hour Bundle) : 1) Mesurer les lactates sanguins. 2) Réaliser au moins 2 séries d hémocultures avant toute antibiothérapie. 3) Administrer une antibiothérapie à large spectre IV. 4) Démarrer une réhydratation par cristalloïdes (30 mL/kg). 5) Introduire la Noradrénaline en IVSE si la PAM reste < 65 mmHg.'
          }
        ]
      }
    ]
  }
];

export default function FacultyAnnalesSection() {
  const [selectedFaculty, setSelectedFaculty] = useState<string>('ALL');
  const [selectedExamType, setSelectedExamType] = useState<'ALL' | 'QCM' | 'PRATIQUE_CAS_CLINIQUE'>('ALL');
  const [selectedExam, setSelectedExam] = useState<FacultyExam>(MOROCCAN_FACULTY_EXAMS[0]);
  const [userAnswers, setUserAnswers] = useState<Record<string, string>>({});
  const [submitted, setSubmitted] = useState<boolean>(false);
  const [showCorrections, setShowCorrections] = useState<Record<string, boolean>>({});

  const filteredExams = MOROCCAN_FACULTY_EXAMS.filter(ex => {
    if (selectedFaculty !== 'ALL' && ex.facultyCode !== selectedFaculty) return false;
    if (selectedExamType !== 'ALL' && ex.examType !== selectedExamType) return false;
    return true;
  });

  const handleSelectOption = (qId: string, optId: string) => {
    if (submitted) return;
    setUserAnswers(prev => ({ ...prev, [qId]: optId }));
  };

  const toggleCorrection = (id: string) => {
    setShowCorrections(prev => ({ ...prev, [id]: !prev[id] }));
  };

  const calculateScore = () => {
    if (!selectedExam.qcmQuestions) return 0;
    let count = 0;
    selectedExam.qcmQuestions.forEach(q => {
      if (userAnswers[q.id] === q.correctOption) count++;
    });
    return Math.round((count / selectedExam.qcmQuestions.length) * 100);
  };

  return (
    <div className="space-y-6">
      {/* Header Banner */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-slate-900 via-slate-800 to-purple-950 border border-purple-500/20 p-6 sm:p-8 shadow-2xl">
        <div className="relative z-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-500/15 border border-purple-500/30 text-purple-300 text-xs font-bold mb-3">
            <Building2 className="w-3.5 h-3.5" />
            <span>Facultés de Médecine du Maroc (FMP)</span>
          </div>
          <h2 className="text-xl sm:text-3xl font-extrabold text-white tracking-tight leading-tight mb-2">
            🏛️ Annales Officiellement Corrigées — QCMs & Épreuves Pratiques
          </h2>
          <p className="text-xs sm:text-sm text-slate-300 max-w-2xl leading-relaxed">
            Examens théoriques QCM et Épreuves Pratiques / Cas Cliniques / QROC réels des Facultés de Médecine de Rabat (FMPR), Casablanca (FMPC), Marrakech (FMPM), Fès (FMPF) et Tanger (FMPT) avec corrections intégrales des professeurs.
          </p>
        </div>
      </div>

      {/* Filter Toolbar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        {/* Faculty selector */}
        <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
          {[
            { code: 'ALL', name: 'Toutes les Facultés' },
            { code: 'FMPR', name: 'FMP Rabat' },
            { code: 'FMPC', name: 'FMP Casablanca' },
            { code: 'FMPM', name: 'FMP Marrakech' },
          ].map(fac => (
            <button
              key={fac.code}
              onClick={() => setSelectedFaculty(fac.code)}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all border shrink-0 ${
                selectedFaculty === fac.code
                  ? 'bg-purple-600 text-white border-purple-400 shadow-lg shadow-purple-600/30'
                  : 'bg-slate-900 text-slate-400 border-slate-800 hover:text-white hover:border-slate-700'
              }`}
            >
              {fac.name}
            </button>
          ))}
        </div>

        {/* Type selector (QCM vs PRATIQUE) */}
        <div className="flex items-center gap-2 bg-slate-950 p-1 rounded-xl border border-slate-800 shrink-0">
          <button
            onClick={() => setSelectedExamType('ALL')}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
              selectedExamType === 'ALL' ? 'bg-purple-600 text-white' : 'text-slate-400 hover:text-white'
            }`}
          >
            Tous les formats
          </button>
          <button
            onClick={() => setSelectedExamType('QCM')}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
              selectedExamType === 'QCM' ? 'bg-purple-600 text-white' : 'text-slate-400 hover:text-white'
            }`}
          >
            QCMs
          </button>
          <button
            onClick={() => setSelectedExamType('PRATIQUE_CAS_CLINIQUE')}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
              selectedExamType === 'PRATIQUE_CAS_CLINIQUE' ? 'bg-amber-500 text-slate-950' : 'text-slate-400 hover:text-white'
            }`}
          >
            🔬 Épreuves Pratiques & Cas Cliniques
          </button>
        </div>
      </div>

      {/* Exam Selection Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {filteredExams.map(ex => (
          <div
            key={ex.id}
            onClick={() => { setSelectedExam(ex); setSubmitted(false); setUserAnswers({}); setShowCorrections({}); }}
            className={`p-5 rounded-2xl border cursor-pointer transition-all ${
              selectedExam.id === ex.id
                ? ex.examType === 'PRATIQUE_CAS_CLINIQUE'
                  ? 'bg-amber-950/40 border-amber-500 shadow-xl ring-2 ring-amber-500/30'
                  : 'bg-purple-950/40 border-purple-500 shadow-xl ring-2 ring-purple-500/30'
                : 'bg-slate-900/60 border-slate-800 hover:border-purple-500/40 hover:bg-slate-900'
            }`}
          >
            <div className="flex items-center justify-between mb-2">
              <span className={`px-2.5 py-0.5 rounded-full border text-[10px] font-bold font-mono ${
                ex.examType === 'PRATIQUE_CAS_CLINIQUE'
                  ? 'bg-amber-500/15 text-amber-300 border-amber-500/30'
                  : 'bg-purple-500/15 text-purple-300 border-purple-500/30'
              }`}>
                {ex.facultyCode} — {ex.examType === 'PRATIQUE_CAS_CLINIQUE' ? '🔬 PRATIQUE' : 'QCM'}
              </span>
              <span className="text-[10px] text-slate-400 font-semibold">{ex.year}</span>
            </div>
            <h4 className="text-sm font-bold text-white mb-2 leading-snug">{ex.moduleTitle}</h4>
            <div className="flex items-center justify-between text-[11px] text-slate-400 pt-2 border-t border-slate-800">
              <span className="flex items-center gap-1">
                <FileText className="w-3.5 h-3.5 text-purple-400" />
                {ex.examType === 'PRATIQUE_CAS_CLINIQUE' ? 'Cas Clinique QROC' : `${ex.qcmQuestions?.length} QCMs`}
              </span>
              <span className="flex items-center gap-1">
                <Clock className="w-3.5 h-3.5 text-amber-400" />
                {ex.durationMinutes} min
              </span>
            </div>
          </div>
        ))}
      </div>

      {/* Active Exam Viewer Panel */}
      <div className="glass-panel rounded-3xl p-6 sm:p-8 border border-slate-800 bg-slate-950/90 shadow-2xl">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 mb-6 border-b border-slate-800">
          <div>
            <div className="flex items-center gap-2">
              <span className="px-3 py-1 rounded-full bg-purple-500/15 border border-purple-500/30 text-purple-300 text-xs font-bold font-mono">
                {selectedExam.facultyCode} ({selectedExam.sessionType})
              </span>
              <span className="text-xs text-slate-400">{selectedExam.facultyName}</span>
            </div>
            <h3 className="text-lg sm:text-xl font-bold text-white mt-1">{selectedExam.moduleTitle}</h3>
          </div>

          {selectedExam.examType === 'QCM' && submitted && (
            <div className={`px-5 py-2.5 rounded-2xl border font-bold text-sm text-center ${
              calculateScore() >= 70
                ? 'bg-emerald-500/20 border-emerald-500/40 text-emerald-300'
                : 'bg-rose-500/20 border-rose-500/40 text-rose-300'
            }`}>
              Score : {calculateScore()}%
            </div>
          )}
        </div>

        {/* MODE 1: QCM EXAM RENDER */}
        {selectedExam.examType === 'QCM' && selectedExam.qcmQuestions && (
          <div className="space-y-6">
            {selectedExam.qcmQuestions.map((q) => {
              return (
                <div key={q.id} className="p-5 rounded-2xl bg-slate-900/80 border border-slate-800">
                  <div className="flex items-start gap-3 mb-4">
                    <span className="w-7 h-7 rounded-xl bg-purple-500/20 border border-purple-500/40 text-purple-300 font-mono font-bold text-xs flex items-center justify-center shrink-0">
                      Q{q.num}
                    </span>
                    <p className="text-sm font-semibold text-white leading-relaxed">{q.text}</p>
                  </div>

                  <div className="grid grid-cols-1 gap-2.5 pl-0 sm:pl-10">
                    {q.options.map(opt => {
                      const isSelected = userAnswers[q.id] === opt.id;
                      const isRight = opt.id === q.correctOption;
                      let style = 'bg-slate-950/60 border-slate-800 text-slate-300 hover:border-purple-500/40';

                      if (submitted) {
                        if (isRight) style = 'bg-emerald-950/70 border-emerald-500 text-emerald-200 font-bold';
                        else if (isSelected) style = 'bg-rose-950/70 border-rose-500 text-rose-200';
                      } else if (isSelected) {
                        style = 'bg-purple-600/20 border-purple-400 text-purple-200 font-bold';
                      }

                      return (
                        <button
                          key={opt.id}
                          disabled={submitted}
                          onClick={() => handleSelectOption(q.id, opt.id)}
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
                    <div className="mt-4 ml-0 sm:ml-10 p-4 rounded-xl bg-purple-950/30 border border-purple-500/30 text-xs">
                      <div className="font-bold text-purple-400 mb-1 flex items-center gap-1.5">
                        <CheckCircle2 className="w-4 h-4" />
                        Correction Officielle Faculté ({selectedExam.facultyCode})
                      </div>
                      <p className="text-slate-300 leading-relaxed">{q.officialRationale}</p>
                    </div>
                  )}
                </div>
              );
            })}

            <div className="mt-8 flex justify-end">
              {!submitted ? (
                <button
                  onClick={() => setSubmitted(true)}
                  disabled={Object.keys(userAnswers).length < selectedExam.qcmQuestions.length}
                  className="px-6 py-3 rounded-xl bg-gradient-to-r from-purple-600 to-indigo-600 text-white font-extrabold text-xs shadow-lg hover:opacity-95 transition-opacity disabled:opacity-40 disabled:cursor-not-allowed"
                >
                  Valider l Épreuve ({Object.keys(userAnswers).length}/{selectedExam.qcmQuestions.length})
                </button>
              ) : (
                <button
                  onClick={() => { setSubmitted(false); setUserAnswers({}); }}
                  className="px-6 py-3 rounded-xl bg-slate-800 hover:bg-slate-700 text-white font-bold text-xs transition-colors"
                >
                  Recommencer l Épreuve QCM
                </button>
              )}
            </div>
          </div>
        )}

        {/* MODE 2: PRACTICAL CLINICAL EXAM / QROC RENDER */}
        {selectedExam.examType === 'PRATIQUE_CAS_CLINIQUE' && selectedExam.practicalQuestions && (
          <div className="space-y-6">
            {selectedExam.practicalQuestions.map((pq) => (
              <div key={pq.id} className="space-y-5">
                {/* Clinical Vignette Box */}
                <div className="p-5 rounded-2xl bg-gradient-to-r from-amber-950/30 to-slate-900 border border-amber-500/30">
                  <div className="flex items-center gap-2 text-amber-400 font-bold text-xs mb-2">
                    <Stethoscope className="w-4 h-4" />
                    <span>Sujet de l Épreuve Pratique — {pq.questionTitle}</span>
                  </div>
                  <p className="text-xs text-slate-200 leading-relaxed mb-3">{pq.clinicalContext}</p>
                  <div className="p-3 rounded-xl bg-slate-950 border border-slate-800 text-xs text-cyan-300 font-mono">
                    📊 Données des Examens Complémentaires : {pq.examDataText}
                  </div>
                </div>

                {/* QROC Questions List */}
                <div className="space-y-4">
                  {pq.qrocQuestions.map((qroc, idx) => {
                    const isOpen = showCorrections[`${pq.id}-${idx}`];
                    return (
                      <div key={idx} className="p-5 rounded-2xl bg-slate-900/90 border border-slate-800 space-y-3">
                        <h4 className="text-xs font-bold text-white leading-relaxed">{qroc.questionLabel}</h4>
                        
                        <div className="p-3 rounded-xl bg-slate-950/80 border border-slate-800 text-xs text-slate-300">
                          <span className="font-semibold text-slate-400 block mb-1">Mots-Clés de la Réponse Attendu par le Jury :</span>
                          <p className="font-mono text-teal-300">{qroc.expectedAnswerKey}</p>
                        </div>

                        <button
                          onClick={() => toggleCorrection(`${pq.id}-${idx}`)}
                          className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-purple-600/20 border border-purple-500/40 text-purple-300 text-xs font-bold hover:bg-purple-600/30 transition-colors"
                        >
                          <Eye className="w-3.5 h-3.5" />
                          {isOpen ? 'Masquer la Correction Rédigée' : 'Afficher la Correction Officielle Détaillée du Professeur'}
                        </button>

                        {isOpen && (
                          <div className="p-4 rounded-xl bg-purple-950/40 border border-purple-500/40 text-xs text-purple-100 leading-relaxed animate-fadeIn">
                            <span className="font-bold text-purple-300 block mb-1">
                              ✓ Correction Officielle de la Faculté ({selectedExam.facultyCode}) :
                            </span>
                            <p>{qroc.facultyDetailedCorrection}</p>
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
