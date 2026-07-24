'use client';

import React, { useState, useMemo } from 'react';
import { 
  Building2, BookOpen, CheckCircle2, Award, Search, Filter, 
  Sparkles, ChevronRight, FileText, Check, AlertCircle, Clock, GraduationCap,
  Stethoscope, HelpCircle, FileCheck, Layers, Eye, X, BarChart3, Calendar, ListFilter
} from 'lucide-react';
import { ANNALES_DATA, AnnaleExam, FacultyCode } from '../lib/annales-data';

const FACULTY_COLORS: Record<string, { bg: string; text: string; border: string; ring: string }> = {
  FMPR: { bg: 'bg-teal-500/15', text: 'text-teal-300', border: 'border-teal-500/30', ring: 'ring-teal-500/30' },
  FMPC: { bg: 'bg-blue-500/15', text: 'text-blue-300', border: 'border-blue-500/30', ring: 'ring-blue-500/30' },
  FMPF: { bg: 'bg-purple-500/15', text: 'text-purple-300', border: 'border-purple-500/30', ring: 'ring-purple-500/30' },
  FMPM: { bg: 'bg-amber-500/15', text: 'text-amber-300', border: 'border-amber-500/30', ring: 'ring-amber-500/30' },
  FMPO: { bg: 'bg-rose-500/15', text: 'text-rose-300', border: 'border-rose-500/30', ring: 'ring-rose-500/30' },
  FMPT: { bg: 'bg-cyan-500/15', text: 'text-cyan-300', border: 'border-cyan-500/30', ring: 'ring-cyan-500/30' },
};

export default function FacultyAnnalesSection() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedFaculty, setSelectedFaculty] = useState<string>('ALL');
  const [selectedYear, setSelectedYear] = useState<string>('ALL');
  const [selectedSemester, setSelectedSemester] = useState<string>('ALL');
  const [selectedExamType, setSelectedExamType] = useState<string>('ALL');
  
  const [selectedExam, setSelectedExam] = useState<AnnaleExam | null>(null);
  
  // QCM state
  const [userAnswers, setUserAnswers] = useState<Record<string, string>>({});
  const [showCorrections, setShowCorrections] = useState<Record<string, boolean>>({});
  
  const years = useMemo(() => Array.from(new Set(ANNALES_DATA.map(e => e.year))).sort(), []);
  const semesters = useMemo(() => Array.from(new Set(ANNALES_DATA.map(e => e.semester))).sort(), []);
  const examTypes = useMemo(() => Array.from(new Set(ANNALES_DATA.map(e => e.examType))), []);

  const filteredExams = useMemo(() => {
    return ANNALES_DATA.filter(ex => {
      const matchSearch = ex.moduleTitle.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          ex.facultyName.toLowerCase().includes(searchQuery.toLowerCase());
      const matchFac = selectedFaculty === 'ALL' || ex.facultyCode === selectedFaculty;
      const matchYear = selectedYear === 'ALL' || ex.year === selectedYear;
      const matchSem = selectedSemester === 'ALL' || ex.semester === selectedSemester;
      const matchType = selectedExamType === 'ALL' || ex.examType === selectedExamType;
      
      return matchSearch && matchFac && matchYear && matchSem && matchType;
    });
  }, [searchQuery, selectedFaculty, selectedYear, selectedSemester, selectedExamType]);

  const handleSelectOption = (qId: string, optId: string) => {
    setUserAnswers(prev => ({ ...prev, [qId]: optId }));
  };

  const revealCorrection = (qId: string) => {
    setShowCorrections(prev => ({ ...prev, [qId]: true }));
  };

  return (
    <div className="space-y-8 p-4 sm:p-6 bg-slate-950 min-h-screen text-slate-200">
      
      {/* STAT PILLS */}
      <div className="flex flex-wrap gap-4 text-xs font-semibold">
        <div className="flex items-center gap-2 px-4 py-2 bg-slate-900 border border-slate-800 rounded-full text-slate-300 shadow-sm">
          <Layers className="w-4 h-4 text-teal-400" />
          <span>{ANNALES_DATA.length} Examens</span>
        </div>
        <div className="flex items-center gap-2 px-4 py-2 bg-slate-900 border border-slate-800 rounded-full text-slate-300 shadow-sm">
          <Building2 className="w-4 h-4 text-teal-400" />
          <span>6 Facultés</span>
        </div>
        <div className="flex items-center gap-2 px-4 py-2 bg-slate-900 border border-slate-800 rounded-full text-slate-300 shadow-sm">
          <Calendar className="w-4 h-4 text-teal-400" />
          <span>{years.length} Années ({years[0]} - {years[years.length-1]})</span>
        </div>
        <div className="flex items-center gap-2 px-4 py-2 bg-slate-900 border border-slate-800 rounded-full text-slate-300 shadow-sm">
          <FileCheck className="w-4 h-4 text-teal-400" />
          <span>{examTypes.join(', ')}</span>
        </div>
      </div>

      {/* HERO SECTION */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-slate-900 to-slate-900 border border-teal-500/20 p-8 shadow-2xl">
        <div className="absolute top-0 right-0 p-12 opacity-10 pointer-events-none">
           <GraduationCap className="w-48 h-48 text-teal-400" />
        </div>
        <div className="relative z-10">
          <h1 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight mb-4">
            Examens Passés des Facultés Marocaines
          </h1>
          <p className="text-slate-400 max-w-2xl mb-8 leading-relaxed">
            Trouvez rapidement vos annales grâce à notre moteur de recherche profond.
            QCM, Cas cliniques et QROC entièrement corrigés.
          </p>
          
          <div className="relative max-w-2xl">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-teal-500" />
            <input 
              type="text"
              placeholder="Rechercher par module (ex: Cardiologie), faculté..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-slate-950 border border-slate-800 focus:border-teal-500 rounded-2xl py-4 pl-12 pr-4 text-white placeholder-slate-500 outline-none transition-all shadow-inner"
            />
          </div>
        </div>
      </div>

      {/* FILTER ROW */}
      <div className="flex flex-col xl:flex-row gap-4 items-start xl:items-center justify-between p-4 bg-slate-900 border border-slate-800 rounded-2xl">
        <div className="flex flex-wrap items-center gap-2">
          <ListFilter className="w-4 h-4 text-slate-500 mr-2" />
          {['ALL', 'FMPR', 'FMPC', 'FMPF', 'FMPM', 'FMPO', 'FMPT'].map(fac => (
            <button
              key={fac}
              onClick={() => setSelectedFaculty(fac)}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all border ${
                selectedFaculty === fac
                  ? 'bg-teal-500/20 text-teal-300 border-teal-500/50'
                  : 'bg-slate-950 text-slate-400 border-slate-800 hover:border-slate-700 hover:text-slate-300'
              }`}
            >
              {fac === 'ALL' ? 'Toutes Facultés' : fac}
            </button>
          ))}
        </div>
        
        <div className="flex flex-wrap items-center gap-3 w-full xl:w-auto">
          <select 
            value={selectedYear} 
            onChange={e => setSelectedYear(e.target.value)}
            className="bg-slate-950 border border-slate-800 text-slate-300 text-xs rounded-lg px-3 py-2 outline-none focus:border-teal-500"
          >
            <option value="ALL">Toutes Années</option>
            {years.map(y => <option key={y} value={y}>{y}</option>)}
          </select>

          <select 
            value={selectedSemester} 
            onChange={e => setSelectedSemester(e.target.value)}
            className="bg-slate-950 border border-slate-800 text-slate-300 text-xs rounded-lg px-3 py-2 outline-none focus:border-teal-500"
          >
            <option value="ALL">Tous Semestres</option>
            {semesters.map(s => <option key={s} value={s}>{s}</option>)}
          </select>

          <select 
            value={selectedExamType} 
            onChange={e => setSelectedExamType(e.target.value)}
            className="bg-slate-950 border border-slate-800 text-slate-300 text-xs rounded-lg px-3 py-2 outline-none focus:border-teal-500"
          >
            <option value="ALL">Tous Types</option>
            {examTypes.map(t => <option key={t} value={t}>{t}</option>)}
          </select>
        </div>
      </div>

      {/* EXAM CARDS GRID */}
      {!selectedExam && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {filteredExams.map(ex => {
            const colors = FACULTY_COLORS[ex.facultyCode] || FACULTY_COLORS.FMPR;
            const qCount = ex.qcmQuestions ? ex.qcmQuestions.length : ex.practicalQuestions?.[0]?.qrocQuestions.length || 0;
            
            return (
              <div 
                key={ex.id}
                className="group p-5 rounded-2xl bg-slate-900 border border-slate-800 hover:border-slate-600 transition-all cursor-pointer flex flex-col h-full hover:shadow-lg hover:shadow-black/50"
                onClick={() => {
                  setSelectedExam(ex);
                  setUserAnswers({});
                  setShowCorrections({});
                }}
              >
                <div className="flex items-center justify-between mb-3">
                  <span className={`px-2 py-1 rounded-md border text-[10px] font-bold ${colors.bg} ${colors.text} ${colors.border}`}>
                    {ex.facultyCode}
                  </span>
                  <span className="px-2 py-1 rounded-md bg-slate-800 text-slate-300 text-[10px] font-semibold border border-slate-700">
                    {ex.year} • {ex.sessionType}
                  </span>
                </div>
                
                <div className="mb-4 flex-grow">
                  <div className="text-xs text-teal-400 font-mono font-bold mb-1">{ex.semester}</div>
                  <h3 className="text-sm font-bold text-white leading-snug line-clamp-2">{ex.moduleTitle}</h3>
                </div>
                
                <div className="flex items-center justify-between pt-4 border-t border-slate-800">
                  <div className="flex items-center gap-1.5">
                    <span className="text-[10px] font-bold text-slate-400 bg-slate-950 px-2 py-1 rounded-md border border-slate-800">
                      {ex.examType.replace('_', ' ')}
                    </span>
                  </div>
                  <div className="flex items-center gap-3 text-[11px] text-slate-400">
                    <span className="flex items-center gap-1"><FileText className="w-3 h-3" /> {qCount} Qs</span>
                    <span className="flex items-center gap-1"><Clock className="w-3 h-3" /> {ex.durationMinutes}m</span>
                  </div>
                </div>

                <button className="mt-4 w-full py-2 rounded-lg bg-teal-500/10 text-teal-400 text-xs font-bold border border-teal-500/20 group-hover:bg-teal-500 group-hover:text-slate-950 transition-colors">
                  Voir l'Épreuve
                </button>
              </div>
            );
          })}
          {filteredExams.length === 0 && (
            <div className="col-span-full py-12 text-center text-slate-500">
              <AlertCircle className="w-12 h-12 mx-auto mb-3 opacity-20" />
              <p>Aucun examen trouvé pour ces critères.</p>
            </div>
          )}
        </div>
      )}

      {/* EXAM DETAIL EXPANDED VIEW */}
      {selectedExam && (
        <div className="animate-in fade-in slide-in-from-bottom-4 duration-300">
          <button 
            onClick={() => setSelectedExam(null)}
            className="mb-6 flex items-center gap-2 text-sm text-slate-400 hover:text-white transition-colors"
          >
            <ChevronRight className="w-4 h-4 rotate-180" />
            Retour aux examens
          </button>

          <div className="bg-slate-900 border border-slate-800 rounded-3xl overflow-hidden shadow-2xl">
            {/* Header */}
            <div className="p-6 sm:p-8 border-b border-slate-800 bg-slate-900/50">
              <div className="flex flex-wrap items-center gap-3 mb-4">
                <span className={`px-3 py-1 rounded-lg border text-xs font-bold ${FACULTY_COLORS[selectedExam.facultyCode]?.bg} ${FACULTY_COLORS[selectedExam.facultyCode]?.text} ${FACULTY_COLORS[selectedExam.facultyCode]?.border}`}>
                  {selectedExam.facultyCode}
                </span>
                <span className="text-sm text-slate-400">{selectedExam.facultyName}</span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-bold text-white mb-4">{selectedExam.moduleTitle}</h2>
              <div className="flex flex-wrap gap-4 text-xs font-medium text-slate-400">
                <span className="flex items-center gap-1.5"><Calendar className="w-4 h-4 text-slate-500" /> Année: {selectedExam.year}</span>
                <span className="flex items-center gap-1.5"><Layers className="w-4 h-4 text-slate-500" /> Semestre: {selectedExam.semester}</span>
                <span className="flex items-center gap-1.5"><FileCheck className="w-4 h-4 text-slate-500" /> Type: {selectedExam.examType}</span>
                <span className="flex items-center gap-1.5"><Award className="w-4 h-4 text-slate-500" /> Session: {selectedExam.sessionType}</span>
              </div>
            </div>

            {/* Content */}
            <div className="p-6 sm:p-8 space-y-8 bg-slate-950">
              {/* QCM Type */}
              {selectedExam.examType === 'QCM' && selectedExam.qcmQuestions?.map(q => (
                <div key={q.id} className="bg-slate-900 border border-slate-800 rounded-2xl p-5 sm:p-6">
                  <div className="flex gap-4 mb-6">
                    <div className="w-8 h-8 rounded-full bg-slate-800 text-teal-400 font-bold flex items-center justify-center shrink-0">
                      {q.num}
                    </div>
                    <p className="text-slate-200 font-medium leading-relaxed pt-1 text-sm sm:text-base">{q.text}</p>
                  </div>
                  
                  <div className="pl-0 sm:pl-12 space-y-2.5 mb-6">
                    {q.options.map(opt => {
                      const isSelected = userAnswers[q.id] === opt.id;
                      const isCorrect = opt.id === q.correctOption;
                      const isRevealed = showCorrections[q.id];
                      
                      let style = 'bg-slate-950 border-slate-800 text-slate-400 hover:border-slate-600';
                      
                      if (isRevealed) {
                        if (isCorrect) style = 'bg-emerald-500/10 border-emerald-500/50 text-emerald-200 font-medium';
                        else if (isSelected) style = 'bg-rose-500/10 border-rose-500/50 text-rose-300';
                      } else if (isSelected) {
                        style = 'bg-teal-500/20 border-teal-500/50 text-teal-200';
                      }

                      return (
                        <button
                          key={opt.id}
                          onClick={() => handleSelectOption(q.id, opt.id)}
                          disabled={isRevealed}
                          className={`w-full text-left p-3.5 rounded-xl border text-sm transition-all flex items-start gap-3 ${style}`}
                        >
                          <span className="w-6 h-6 rounded-md bg-slate-900/50 font-bold text-xs flex items-center justify-center shrink-0 border border-white/5">
                            {opt.id}
                          </span>
                          <span className="leading-relaxed">{opt.text}</span>
                        </button>
                      );
                    })}
                  </div>
                  
                  <div className="pl-0 sm:pl-12">
                    {!showCorrections[q.id] ? (
                      <button 
                        onClick={() => revealCorrection(q.id)}
                        className="text-xs font-bold text-teal-400 bg-teal-400/10 hover:bg-teal-400/20 px-4 py-2 rounded-lg transition-colors border border-teal-400/20"
                      >
                        Révéler Correction
                      </button>
                    ) : (
                      <div className="bg-slate-800/50 border border-slate-700 rounded-xl p-4 animate-in fade-in">
                        <div className="flex items-center gap-2 text-emerald-400 font-bold text-xs mb-2">
                          <CheckCircle2 className="w-4 h-4" /> Correction Officielle
                        </div>
                        <p className="text-sm text-slate-300 leading-relaxed">{q.officialRationale}</p>
                      </div>
                    )}
                  </div>
                </div>
              ))}

              {/* Cas Clinique / QROC Type */}
              {selectedExam.examType !== 'QCM' && selectedExam.practicalQuestions?.map(pq => (
                <div key={pq.id} className="space-y-6">
                  {/* Scenario Block */}
                  <div className="bg-gradient-to-br from-slate-800 to-slate-900 border border-slate-700 rounded-2xl p-6 sm:p-8">
                    <div className="flex items-center gap-2 text-teal-400 font-bold mb-4">
                      <Stethoscope className="w-5 h-5" />
                      <span>{pq.questionTitle}</span>
                    </div>
                    <p className="text-slate-300 leading-relaxed mb-6 whitespace-pre-wrap">{pq.clinicalContext}</p>
                    <div className="bg-slate-950 rounded-xl p-4 border border-slate-800 text-sm font-mono text-slate-400">
                      <span className="text-teal-500 font-bold block mb-2">Données complémentaires :</span>
                      {pq.examDataText}
                    </div>
                  </div>

                  {/* Questions */}
                  <div className="space-y-4">
                    {pq.qrocQuestions.map((qroc, idx) => {
                      const cId = `${pq.id}-qroc-${idx}`;
                      const isRevealed = showCorrections[cId];

                      return (
                        <div key={idx} className="bg-slate-900 border border-slate-800 rounded-2xl p-5 sm:p-6">
                          <h4 className="text-white font-medium mb-4">{qroc.questionLabel}</h4>
                          
                          {!isRevealed ? (
                            <button 
                              onClick={() => revealCorrection(cId)}
                              className="text-xs font-bold text-teal-400 bg-teal-400/10 hover:bg-teal-400/20 px-4 py-2 rounded-lg transition-colors border border-teal-400/20"
                            >
                              Voir les mots-clés et la correction
                            </button>
                          ) : (
                            <div className="space-y-4 animate-in fade-in">
                              <div className="bg-slate-950 border border-slate-800 rounded-xl p-4">
                                <span className="text-xs font-bold text-slate-500 uppercase tracking-wider block mb-1">Mots-clés attendus</span>
                                <p className="text-teal-300 font-mono text-sm">{qroc.expectedAnswerKey}</p>
                              </div>
                              <div className="bg-slate-800/50 border border-slate-700 rounded-xl p-4">
                                <span className="text-xs font-bold text-slate-500 uppercase tracking-wider block mb-1">Correction Détaillée</span>
                                <p className="text-slate-300 text-sm leading-relaxed">{qroc.facultyDetailedCorrection}</p>
                              </div>
                            </div>
                          )}
                        </div>
                      );
                    })}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
