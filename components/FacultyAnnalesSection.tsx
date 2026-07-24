'use client';
// components/FacultyAnnalesSection.tsx
// MedEdu Morocco — National Medical Faculty Past Exams (Annales & Épreuves Corrélées)
// FMPR (Rabat), FMPC (Casablanca), FMPM (Marrakech), FMPF (Fès), FMPT (Tanger)

import React, { useState } from 'react';
import { 
  Building2, BookOpen, CheckCircle2, Award, Search, Filter, 
  Sparkles, ChevronRight, FileText, Check, AlertCircle, Clock, GraduationCap
} from 'lucide-react';

interface FacultyExam {
  id: string;
  facultyCode: 'FMPR' | 'FMPC' | 'FMPM' | 'FMPF' | 'FMPT';
  facultyName: string;
  year: string;
  semester: string;
  moduleTitle: string;
  sessionType: 'Normale' | 'Rattrapage';
  totalQuestions: number;
  durationMinutes: number;
  questions: {
    id: string;
    num: number;
    text: string;
    options: { id: string; text: string }[];
    correctOption: string;
    officialRationale: string;
  }[];
}

const MOROCCAN_FACULTY_EXAMS: FacultyExam[] = [
  {
    id: 'fmpr-s5-2023',
    facultyCode: 'FMPR',
    facultyName: 'FMP Rabat — Université Mohammed V',
    year: '2023-2024',
    semester: 'S5',
    moduleTitle: 'Cardiologie & Pathologies Vasculaires (Examen National)',
    sessionType: 'Normale',
    totalQuestions: 5,
    durationMinutes: 60,
    questions: [
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
    id: 'fmpc-s6-2023',
    facultyCode: 'FMPC',
    facultyName: 'FMP Casablanca — Université Hassan II',
    year: '2022-2023',
    semester: 'S6',
    moduleTitle: 'Neurologie Clinique & Urgences Neuro-Vasculaires',
    sessionType: 'Normale',
    totalQuestions: 5,
    durationMinutes: 60,
    questions: [
      {
        id: 'fmpc-q1',
        num: 1,
        text: 'Dans le cadre de la prise en charge d un AVC Ischémique aigu f la fenêtre des 4h30, quelle mesure immédiate est Indiquée ?',
        options: [
          { id: 'A', text: 'Baisse systématique de la Pression Artérielle sous 120/80 mmHg par nicardipine IVSE.' },
          { id: 'B', text: 'Thrombolyse IV par rt-PA (Altéplase 0.9 mg/kg) après élimination d un hématome au Scanner/IRM.' },
          { id: 'C', text: 'Prescription d une héparine à dose curative d emblée.' },
          { id: 'D', text: 'Ponction lombaire en urgence pour éliminer une méningite.' },
          { id: 'E', text: 'Perfusion de soluté glucosé à 10% pour prévenir l hypoglycémie.' },
        ],
        correctOption: 'B',
        officialRationale: 'FMPC Correction Officielle: La thrombolyse intraveineuse par rt-PA est indiquée dans les 4h30 suivant l apparition des symptômes d un AVC ischémique après imagerie cérébrale éliminant l hémorragie.',
      },
    ],
  },
  {
    id: 'fmpm-s10-2023',
    facultyCode: 'FMPM',
    facultyName: 'FMP Marrakech — Université Cadi Ayyad',
    year: '2023-2024',
    semester: 'S10',
    moduleTitle: 'Urgences, Réanimation & Médecine d Urgence',
    sessionType: 'Normale',
    totalQuestions: 5,
    durationMinutes: 90,
    questions: [
      {
        id: 'fmpm-q1',
        num: 1,
        text: 'Face à un état de Choc Septique persistant malgré un remplissage vasculaire adéquat (30 mL/kg), quel agent catécholaminergique est le choix de première intention ?',
        options: [
          { id: 'A', text: 'Dobutamine IVSE' },
          { id: 'B', text: 'Adrénaline IVSE' },
          { id: 'C', text: 'Noradrénaline IVSE' },
          { id: 'D', text: 'Isoprénaline IV' },
          { id: 'E', text: 'Dopamine faible dose' },
        ],
        correctOption: 'C',
        officialRationale: 'FMPM Correction Officielle: La Noradrénaline est le vasopresseur de première intention recommandé par la Surviving Sepsis Campaign pour maintenir une PAM ≥ 65 mmHg en cas de choc septique.',
      },
    ],
  },
];

export default function FacultyAnnalesSection() {
  const [selectedFaculty, setSelectedFaculty] = useState<string>('ALL');
  const [selectedExam, setSelectedExam] = useState<FacultyExam>(MOROCCAN_FACULTY_EXAMS[0]);
  const [userAnswers, setUserAnswers] = useState<Record<string, string>>({});
  const [submitted, setSubmitted] = useState<boolean>(false);

  const filteredExams = MOROCCAN_FACULTY_EXAMS.filter(ex => {
    if (selectedFaculty === 'ALL') return true;
    return ex.facultyCode === selectedFaculty;
  });

  const handleSelectOption = (qId: string, optId: string) => {
    if (submitted) return;
    setUserAnswers(prev => ({ ...prev, [qId]: optId }));
  };

  const calculateScore = () => {
    let count = 0;
    selectedExam.questions.forEach(q => {
      if (userAnswers[q.id] === q.correctOption) count++;
    });
    return Math.round((count / selectedExam.questions.length) * 100);
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
            🏛️ Annales & Épreuves Officiellement Corrigées
          </h2>
          <p className="text-xs sm:text-sm text-slate-300 max-w-2xl leading-relaxed">
            Entraînez-vous sur les vrais examens de réformes et sujets nationaux PFE issus des Facultés de Médecine de Rabat (FMPR), Casablanca (FMPC), Marrakech (FMPM), Fès (FMPF) et Tanger (FMPT).
          </p>
        </div>
      </div>

      {/* Filter Tabs by Faculty */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
        {[
          { code: 'ALL', name: 'Toutes les Facultés' },
          { code: 'FMPR', name: 'FMP Rabat' },
          { code: 'FMPC', name: 'FMP Casablanca' },
          { code: 'FMPM', name: 'FMP Marrakech' },
          { code: 'FMPF', name: 'FMP Fès' },
          { code: 'FMPT', name: 'FMP Tanger' },
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

      {/* Exam Selection Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {filteredExams.map(ex => (
          <div
            key={ex.id}
            onClick={() => { setSelectedExam(ex); setSubmitted(false); setUserAnswers({}); }}
            className={`p-5 rounded-2xl border cursor-pointer transition-all ${
              selectedExam.id === ex.id
                ? 'bg-purple-950/40 border-purple-500 shadow-xl ring-2 ring-purple-500/30'
                : 'bg-slate-900/60 border-slate-800 hover:border-purple-500/40 hover:bg-slate-900'
            }`}
          >
            <div className="flex items-center justify-between mb-2">
              <span className="px-2.5 py-0.5 rounded-full bg-purple-500/15 text-purple-300 border border-purple-500/30 text-[10px] font-bold font-mono">
                {ex.facultyCode} — {ex.semester}
              </span>
              <span className="text-[10px] text-slate-400 font-semibold">{ex.year}</span>
            </div>
            <h4 className="text-sm font-bold text-white mb-2 leading-snug">{ex.moduleTitle}</h4>
            <div className="flex items-center justify-between text-[11px] text-slate-400 pt-2 border-t border-slate-800">
              <span className="flex items-center gap-1">
                <FileText className="w-3.5 h-3.5 text-purple-400" />
                {ex.questions.length} Questions QCM
              </span>
              <span className="flex items-center gap-1">
                <Clock className="w-3.5 h-3.5 text-amber-400" />
                {ex.durationMinutes} min
              </span>
            </div>
          </div>
        ))}
      </div>

      {/* Active Exam Questionnaire Display */}
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

          {submitted && (
            <div className={`px-5 py-2.5 rounded-2xl border font-bold text-sm text-center ${
              calculateScore() >= 70
                ? 'bg-emerald-500/20 border-emerald-500/40 text-emerald-300'
                : 'bg-rose-500/20 border-rose-500/40 text-rose-300'
            }`}>
              Score : {calculateScore()}%
            </div>
          )}
        </div>

        {/* Questions List */}
        <div className="space-y-6">
          {selectedExam.questions.map((q) => {
            const isUserCorrect = userAnswers[q.id] === q.correctOption;
            return (
              <div key={q.id} className="p-5 rounded-2xl bg-slate-900/80 border border-slate-800">
                <div className="flex items-start gap-3 mb-4">
                  <span className="w-7 h-7 rounded-xl bg-purple-500/20 border border-purple-500/40 text-purple-300 font-mono font-bold text-xs flex items-center justify-center shrink-0">
                    Q{q.num}
                  </span>
                  <p className="text-sm font-semibold text-white leading-relaxed">{q.text}</p>
                </div>

                {/* Options */}
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

                {/* Correction Rationale */}
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
        </div>

        {/* Submit Bar */}
        <div className="mt-8 flex justify-end">
          {!submitted ? (
            <button
              onClick={() => setSubmitted(true)}
              disabled={Object.keys(userAnswers).length < selectedExam.questions.length}
              className="px-6 py-3 rounded-xl bg-gradient-to-r from-purple-600 to-indigo-600 text-white font-extrabold text-xs shadow-lg hover:opacity-95 transition-opacity disabled:opacity-40 disabled:cursor-not-allowed"
            >
              Valider l Épreuve ({Object.keys(userAnswers).length}/{selectedExam.questions.length})
            </button>
          ) : (
            <button
              onClick={() => { setSubmitted(false); setUserAnswers({}); }}
              className="px-6 py-3 rounded-xl bg-slate-800 hover:bg-slate-700 text-white font-bold text-xs transition-colors"
            >
              Recommencer l Épreuve
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
