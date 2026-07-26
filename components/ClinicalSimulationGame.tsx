'use client';

import React, { useState, useEffect, useMemo } from 'react';
import { HeartPulse, Activity, Wind, Award, Trophy, ChevronRight, User, Star, List, RotateCcw } from 'lucide-react';

interface Option {
  text: string;
  correct: boolean;
  explanation: string;
}

interface Scenario {
  id: number;
  specialty: string;
  level: string;
  title: string;
  description: string;
  options: Option[];
}

const RAW_SCENARIOS: Scenario[] = [
  { id: 1, specialty: 'Cardiologie', level: 'Externe', title: 'Douleur thoracique aiguë', description: 'Patient de 55 ans, fumeur, présente une douleur thoracique rétrosternale constrictive irradiant vers le bras gauche depuis 45 minutes. ECG: sus-décalage du segment ST en antérieur.', options: [{ text: 'Aspirine, Clopidogrel, Héparine, et angioplastie primaire', correct: true, explanation: 'STEMI antérieur. Reperfusion urgente.' }, { text: 'Paracétamol et retour à domicile', correct: false, explanation: 'Infarctus = Urgence absolue.' }, { text: 'Echocardiographie transthoracique', correct: false, explanation: 'Ne doit pas retarder la reperfusion.' }, { text: 'Aérosol de salbutamol', correct: false, explanation: 'Aucun rapport.' }] },
  { id: 2, specialty: 'Neurologie', level: 'Interne', title: 'Déficit neurologique brutal', description: 'Patiente de 70 ans, hypertendue, présente une hémiplégie droite et aphasie brutale il y a 1h30.', options: [{ text: 'Aspirine immédiatement', correct: false, explanation: 'Ne jamais donner d\'aspirine avant l\'imagerie.' }, { text: 'Scanner cérébral sans injection en urgence', correct: true, explanation: 'Éliminer une hémorragie avant thrombolyse.' }, { text: 'Ponction lombaire', correct: false, explanation: 'Dangereux et inutile.' }, { text: 'Surveillance clinique seule', correct: false, explanation: 'Urgence thérapeutique (thrombolyse).' }] },
  { id: 3, specialty: 'Infectiologie', level: 'Résident', title: 'Fièvre et céphalées', description: 'Homme de 20 ans, fièvre à 40°C, céphalées intenses, vomissements, photophobie, raideur méningée.', options: [{ text: 'Antibiothérapie per os', correct: false, explanation: 'Hospitalisation et IV requis.' }, { text: 'Scanner de contrôle à J3', correct: false, explanation: 'Urgence = PL et ATB.' }, { text: 'Hémocultures, PL puis antibiothérapie immédiate', correct: true, explanation: 'Suspicion méningite bactérienne.' }, { text: 'AINS uniquement', correct: false, explanation: 'Inapproprié.' }] },
  { id: 4, specialty: 'Pneumologie', level: 'Externe', title: 'Dyspnée sifflante', description: 'Patient asthmatique de 25 ans, crise d\'asthme sévère avec difficulté à parler, FR=35/min.', options: [{ text: 'Antibiotiques per os', correct: false, explanation: 'Non indiqué sauf infection.' }, { text: 'Sirop antitussif', correct: false, explanation: 'Contre-indiqué.' }, { text: 'Intubation d\'emblée', correct: false, explanation: 'Pour les arrêts ou comas.' }, { text: 'Salbutamol nébulisé + Corticoïdes systémiques + O2', correct: true, explanation: 'Traitement de référence crise sévère.' }] },
  { id: 5, specialty: 'Endocrinologie', level: 'Interne', title: 'Coma et déshydratation', description: 'Diabétique type 1, confus, polypnéique. Dextro > 5g/L, BU: cétonurie +++, glycosurie +++.', options: [{ text: 'Hydratation IV NaCl 0.9% et Insulinothérapie IV', correct: true, explanation: 'Traitement de l\'acidocétose diabétique.' }, { text: 'Insuline sous-cutanée', correct: false, explanation: 'IV continue requise.' }, { text: 'Bicarbonates', correct: false, explanation: 'Seulement si pH < 6.9.' }, { text: 'Glucagon', correct: false, explanation: 'Patient en hyperglycémie !' }] },
  { id: 6, specialty: 'Chirurgie', level: 'Externe', title: 'Douleur FID', description: 'Homme de 18 ans, douleur exquise FID, défense, fièvre 38°C.', options: [{ text: 'Antalgiques majeurs et sortie', correct: false, explanation: 'Risque péritonite.' }, { text: 'Echo/Scanner abdominal, bilan pré-op, chirurgie', correct: true, explanation: 'Suspicion appendicite aiguë.' }, { text: 'Lavement évacuateur', correct: false, explanation: 'Risque perforation.' }, { text: 'ATB seule en ambulatoire', correct: false, explanation: 'Nécessite évaluation chirurgicale.' }] },
  { id: 7, specialty: 'Cardiologie', level: 'Résident', title: 'Insuffisance cardiaque aiguë', description: 'Patiente 80 ans, orthopnée, crépitants bilatéraux, HTA 180/100, SpO2 85%.', options: [{ text: 'Bêtabloquants IV', correct: false, explanation: 'Contre-indiqués en phase aiguë.' }, { text: 'Remplissage vasculaire', correct: false, explanation: 'Va aggraver l\'OAP.' }, { text: 'Oxygénothérapie, Diurétiques IV, Dérivés nitrés', correct: true, explanation: 'OAP cardiogénique.' }, { text: 'Antibiotiques', correct: false, explanation: 'Non, sauf si foyer infectieux.' }] },
  { id: 8, specialty: 'Gynécologie', level: 'Interne', title: 'Convulsions chez la femme enceinte', description: 'Grossesse 34 SA, crise convulsive tonico-clonique. TA=170/110, protéinurie +++.', options: [{ text: 'Diazépam et retour à domicile', correct: false, explanation: 'L\'éclampsie engage le pronostic vital.' }, { text: 'Sulfate de magnésium, antihypertenseurs, extraction fœtale', correct: true, explanation: 'Éclampsie : urgence absolue.' }, { text: 'Diurétiques de l\'anse', correct: false, explanation: 'Non recommandés en première ligne.' }, { text: 'Surveillance simple', correct: false, explanation: 'Extraction fœtale requise.' }] },
  { id: 9, specialty: 'Pneumologie', level: 'Résident', title: 'Douleur basithoracique et dyspnée', description: 'Jeune homme de 20 ans, grand, longiligne. Douleur thoracique brutale droite et dyspnée.', options: [{ text: 'ECG et troponines en première intention', correct: false, explanation: 'Terrain évoque plutôt pneumothorax.' }, { text: 'Aérosols de corticoïdes', correct: false, explanation: 'Aucune indication.' }, { text: 'Radiographie thoracique (recherche pneumothorax)', correct: true, explanation: 'Pneumothorax spontané suspecté.' }, { text: 'Echocardiographie', correct: false, explanation: 'Pas en première intention.' }] },
  { id: 10, specialty: 'Infectiologie', level: 'Interne', title: 'Choc septique', description: 'Patiente 65 ans, frissons, marbrures, TA 70/40 mmHg, FC 120/min, oligurie, fièvre 39.5°C.', options: [{ text: 'Dobutamine d\'emblée', correct: false, explanation: 'Priorité au remplissage et Noradrénaline.' }, { text: 'Remplissage vasculaire 30ml/kg, Hémocultures, ATB IV large spectre', correct: true, explanation: 'Golden hours du sepsis.' }, { text: 'Antibiothérapie per os', correct: false, explanation: 'Insuffisant.' }, { text: 'Diurétiques', correct: false, explanation: 'Va aggraver l\'hypovolémie.' }] },
  { id: 11, specialty: 'Pédiatrie', level: 'Interne', title: 'Détresse respiratoire du nourrisson', description: 'Nourrisson 6 mois en hiver, toux, sibilants, tirage intercostal, polypnée.', options: [{ text: 'Désobstruction rhinopharyngée, fractionnement repas, O2 si besoin', correct: true, explanation: 'Bronchiolite aiguë.' }, { text: 'Antibiothérapie systématique', correct: false, explanation: 'Origine virale (VRS).' }, { text: 'Corticoïdes inhalés', correct: false, explanation: 'Pas d\'indication en première crise.' }, { text: 'Aérosols de salbutamol d\'emblée', correct: false, explanation: 'Non recommandés en 1ère intention.' }] },
  { id: 12, specialty: 'Gastroentérologie', level: 'Externe', title: 'Hématémèse', description: 'Homme 50 ans, cirrhotique connu, vomit du sang rouge vif en abondance.', options: [{ text: 'IPP per os', correct: false, explanation: 'Urgence hémodynamique.' }, { text: 'Echographie abdominale', correct: false, explanation: 'L\'endoscopie est l\'examen clé.' }, { text: 'Poser 2 VVP, remplissage, culots globulaires, endoscopie en urgence', correct: true, explanation: 'Suspicion de rupture de varices œsophagiennes.' }, { text: 'Chirurgie hépatique immédiate', correct: false, explanation: 'Traitement endoscopique d\'abord.' }] },
  { id: 13, specialty: 'Traumatologie', level: 'Externe', title: 'Chute sur le moignon de l\'épaule', description: 'Patient 25 ans, judoka. Douleur de l\'épaule, signe de la touche de piano.', options: [{ text: 'Réduction sous AG immédiate', correct: false, explanation: 'Pas une luxation gléno-humérale vraie.' }, { text: 'Radiographie épaule, immobilisation, avis chirurgical', correct: true, explanation: 'Disjonction acromio-claviculaire.' }, { text: 'AINS et sport autorisé', correct: false, explanation: 'Immobilisation nécessaire.' }, { text: 'Infiltration de corticoïdes', correct: false, explanation: 'Contre-indiqué en aigu.' }] },
  { id: 14, specialty: 'Psychiatrie', level: 'Interne', title: 'Agitation et délire', description: 'Homme 30 ans, hallucinations auditives, syndrome de persécution, agitation hétéro-agressive.', options: [{ text: 'Psychothérapie analytique', correct: false, explanation: 'Pas en phase aiguë.' }, { text: 'Antidépresseurs', correct: false, explanation: 'Risque de virage maniaque/aggravation.' }, { text: 'Sédation (neuroleptique), contention si besoin, hospitalisation sous contrainte', correct: true, explanation: 'Bouffée délirante aiguë avec dangerosité.' }, { text: 'Retour à domicile avec somnifères', correct: false, explanation: 'Danger pour lui et autrui.' }] },
  { id: 15, specialty: 'Néphrologie', level: 'Résident', title: 'Oligurie et hyperkaliémie', description: 'Patient en IRA, K+ = 7.5 mmol/L avec anomalies ECG (QRS larges).', options: [{ text: 'Kayexalate per os', correct: false, explanation: 'Délai d\'action trop long.' }, { text: 'Furosémide à faible dose', correct: false, explanation: 'Insuffisant.' }, { text: 'Gluconate de calcium IV, Insuline-Glucose, Dialyse en urgence', correct: true, explanation: 'Hyperkaliémie menaçante.' }, { text: 'Restriction hydrique seule', correct: false, explanation: 'Urgence vitale rythmique.' }] },
  { id: 16, specialty: 'Hématologie', level: 'Résident', title: 'Fièvre et purpura', description: 'Femme 25 ans, fièvre, purpura pétéchial étendu, saignements gingivaux, anémie sévère.', options: [{ text: 'Antibiothérapie seule', correct: false, explanation: 'Risque hémorragique majeur.' }, { text: 'Corticothérapie per os', correct: false, explanation: 'Masque le diagnostic.' }, { text: 'Recherche de thrombophilie', correct: false, explanation: 'Tableau d\'insuffisance médullaire.' }, { text: 'NFS, Myélogramme en urgence, support transfusionnel', correct: true, explanation: 'Suspicion de Leucémie Aiguë.' }] },
  { id: 17, specialty: 'Ophtalmologie', level: 'Interne', title: 'Baisse d\'acuité visuelle brutale', description: 'Patient diabétique, BAV brutale indolore de l\'œil droit avec myodésopsies.', options: [{ text: 'Collyre antibiotique', correct: false, explanation: 'Aucun rapport.' }, { text: 'Examen du fond d\'œil en urgence', correct: true, explanation: 'Suspicion d\'hémorragie intravitréenne.' }, { text: 'IRM cérébrale', correct: false, explanation: 'FO en première intention.' }, { text: 'Lunettes de repos', correct: false, explanation: 'Urgence ophtalmologique.' }] },
  { id: 18, specialty: 'ORL', level: 'Externe', title: 'Épistaxis abondante', description: 'Patient hypertendu, saignement de nez abondant non contrôlé par pincement.', options: [{ text: 'Cautérisation systématique d\'emblée', correct: false, explanation: 'Difficile si saignement abondant.' }, { text: 'Méchage antérieur, contrôle TA, bilan coagulation', correct: true, explanation: 'Epistaxis sévère.' }, { text: 'Aspirine pour fluidifier', correct: false, explanation: 'Contre-indiqué !' }, { text: 'Lavage nasal à l\'eau', correct: false, explanation: 'Inefficace.' }] },
  { id: 19, specialty: 'Dermatologie', level: 'Interne', title: 'Éruption vésiculeuse unilatérale', description: 'Homme 60 ans, éruption vésiculeuse très douloureuse en hémi-ceinture thoracique.', options: [{ text: 'Corticoïdes locaux', correct: false, explanation: 'Risque de dissémination.' }, { text: 'Antiviraux (Valaciclovir) et antalgiques', correct: true, explanation: 'Zona intercostal.' }, { text: 'Antibiotiques topiques', correct: false, explanation: 'Origine virale.' }, { text: 'Immunosuppresseurs', correct: false, explanation: 'Contre-indiqué.' }] },
  { id: 20, specialty: 'Réanimation', level: 'Résident', title: 'Polytraumatisé', description: 'Patient accident de la route, inconscient (Glasgow 7), TA 80/40, SpO2 88%.', options: [{ text: 'Scanner cérébral seul d\'emblée', correct: false, explanation: 'Stabilisation hémodynamique et ventilatoire d\'abord.' }, { text: 'Sutures des plaies superficielles', correct: false, explanation: 'Priorité aux fonctions vitales.' }, { text: 'Intubation, remplissage, transfusion, body-scanner', correct: true, explanation: 'Prise en charge ABCDE.' }, { text: 'Transfert en chambre standard', correct: false, explanation: 'Nécessite la Réanimation.' }] }
];

export default function ClinicalSimulationGame() {
  const [scenarios, setScenarios] = useState<Scenario[]>([]);
  const [currentScenarioIndex, setCurrentScenarioIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [combo, setCombo] = useState(0);
  const [gameOver, setGameOver] = useState(false);
  const [feedback, setFeedback] = useState<{ isCorrect: boolean; text: string } | null>(null);
  const [timeLeft, setTimeLeft] = useState(60);
  
  // Game state
  const [playerBadges, setPlayerBadges] = useState<string[]>([]);
  const [leaderboard, setLeaderboard] = useState<{name: string, score: number, date: string}[]>([]);
  const [playerName, setPlayerName] = useState('');
  const [showLeaderboard, setShowLeaderboard] = useState(false);

  // Initialize and shuffle scenarios on mount
  useEffect(() => {
    const shuffled = [...RAW_SCENARIOS].map(sc => {
      // Shuffle options deterministically for each scenario so correct answer is scattered across A, B, C, D
      const optionsCopy = [...sc.options];
      for (let i = optionsCopy.length - 1; i > 0; i--) {
        const j = (sc.id * 7 + i) % (i + 1);
        [optionsCopy[i], optionsCopy[j]] = [optionsCopy[j], optionsCopy[i]];
      }
      return { ...sc, options: optionsCopy };
    });
    setScenarios(shuffled);

    const saved = localStorage.getItem('mededu-leaderboard');
    if (saved) setLeaderboard(JSON.parse(saved));
  }, []);

  // Timer logic
  useEffect(() => {
    if (!gameOver && feedback === null && timeLeft > 0 && scenarios.length > 0) {
      const t = setTimeout(() => setTimeLeft(l => l - 1), 1000);
      return () => clearTimeout(t);
    }
  }, [timeLeft, gameOver, feedback, scenarios]);

  if (scenarios.length === 0) return null;

  const currentScenario = scenarios[currentScenarioIndex];

  const handleAnswer = (isCorrect: boolean, explanation: string) => {
    if (isCorrect) {
      const timeBonus = timeLeft > 30 ? 50 : 0;
      setScore(prev => prev + 100 * (1 + combo * 0.1) + timeBonus);
      setCombo(prev => prev + 1);
    } else {
      setCombo(0);
    }
    
    setFeedback({ isCorrect, text: explanation });
    
    setTimeout(() => {
      setFeedback(null);
      setTimeLeft(60);
      if (currentScenarioIndex < scenarios.length - 1) {
        setCurrentScenarioIndex(prev => prev + 1);
      } else {
        handleGameOver();
      }
    }, 3000);
  };

  const handleGameOver = () => {
    setGameOver(true);
    const newBadges = [];
    if (score > 1500) newBadges.push('🏆 Médecin Expert');
    if (score > 1000 && score <= 1500) newBadges.push('🧠 Diagnosticien Confirmé');
    if (score > 500 && score <= 1000) newBadges.push('🩺 Interne Motivé');
    setPlayerBadges(newBadges);
  };

  const saveScore = () => {
    if (!playerName.trim()) return;
    const entry = { name: playerName, score: Math.round(score), date: new Date().toLocaleDateString() };
    const updated = [...leaderboard, entry].sort((a, b) => b.score - a.score).slice(0, 10);
    setLeaderboard(updated);
    localStorage.setItem('mededu-leaderboard', JSON.stringify(updated));
    setShowLeaderboard(true);
  };

  const resetGame = () => {
    // Reshuffle on game restart
    const shuffled = [...RAW_SCENARIOS].map(sc => {
      const optionsCopy = [...sc.options];
      for (let i = optionsCopy.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [optionsCopy[i], optionsCopy[j]] = [optionsCopy[j], optionsCopy[i]];
      }
      return { ...sc, options: optionsCopy };
    });
    setScenarios(shuffled);
    setCurrentScenarioIndex(0);
    setScore(0);
    setCombo(0);
    setGameOver(false);
    setFeedback(null);
    setTimeLeft(60);
    setShowLeaderboard(false);
  };

  return (
    <div className="space-y-6 p-4 sm:p-6 bg-[#030305] min-h-screen text-white select-none"
      style={{ fontFamily: '-apple-system, BlinkMacSystemFont, "SF Pro Text", sans-serif' }}>
      
      {/* HEADER */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-[#0e0e12] p-6 rounded-3xl border border-white/10">
        <div>
          <span className="px-3 py-1 rounded-full text-[11px] font-bold bg-rose-500/20 text-rose-300 border border-rose-500/30">
            SIMULATION CLINIQUE ARCADE
          </span>
          <h1 className="text-xl sm:text-2xl font-extrabold text-white mt-1 flex items-center gap-2">
            <HeartPulse className="w-6 h-6 text-rose-400 animate-pulse" />
            Urgences & Cas Cliniques (20 Scénarios)
          </h1>
        </div>

        <div className="flex items-center gap-4 bg-[#141418] px-4 py-2 rounded-2xl border border-white/10">
          <div className="text-right">
            <span className="text-[10px] text-slate-400 block font-mono">SCORE TOTAL</span>
            <span className="text-lg font-mono font-extrabold text-amber-400">{Math.round(score)} pts</span>
          </div>
          <div className="w-px h-8 bg-white/10" />
          <div className="text-left">
            <span className="text-[10px] text-slate-400 block font-mono">COMBO</span>
            <span className="text-lg font-mono font-extrabold text-teal-400">x{combo}</span>
          </div>
        </div>
      </div>

      {!gameOver ? (
        <div className="max-w-3xl mx-auto space-y-6">
          {/* Progress Bar & Timer */}
          <div className="space-y-2">
            <div className="flex justify-between text-xs font-mono text-slate-400">
              <span>Scénario {currentScenarioIndex + 1} / {scenarios.length}</span>
              <span className={`font-bold ${timeLeft < 15 ? 'text-rose-400 animate-pulse' : 'text-teal-400'}`}>
                ⏱ Temps restant : {timeLeft}s
              </span>
            </div>
            <div className="w-full h-2 bg-white/10 rounded-full overflow-hidden">
              <div className="h-full bg-gradient-to-r from-teal-500 to-emerald-400 transition-all duration-300"
                style={{ width: `${((currentScenarioIndex + 1) / scenarios.length) * 100}%` }} />
            </div>
          </div>

          {/* Scenario Card */}
          <div className="bg-[#0e0e12] rounded-3xl border border-white/10 p-6 sm:p-8 space-y-6 relative overflow-hidden shadow-2xl">
            <div className="flex items-center justify-between">
              <span className="px-3 py-1 rounded-full text-xs font-bold bg-teal-500/20 text-teal-300 border border-teal-500/30">
                {currentScenario.specialty} • Niveau {currentScenario.level}
              </span>
              <span className="text-xs font-mono text-slate-500">#{currentScenario.id}</span>
            </div>

            <h2 className="text-lg sm:text-xl font-bold text-white leading-snug">
              {currentScenario.title}
            </h2>

            <p className="text-slate-300 text-sm leading-relaxed bg-black/40 p-4 rounded-2xl border border-white/5 font-medium">
              {currentScenario.description}
            </p>

            {/* Answer Options */}
            <div className="space-y-3 pt-2">
              {currentScenario.options.map((opt, idx) => {
                const letters = ['A', 'B', 'C', 'D'];
                return (
                  <button key={idx} disabled={feedback !== null}
                    onClick={() => handleAnswer(opt.correct, opt.explanation)}
                    className="w-full text-left p-4 rounded-2xl text-sm font-medium bg-[#141418] border border-white/5 text-slate-200 hover:border-teal-500/50 hover:bg-teal-500/10 hover:text-white transition-all flex items-center gap-3 disabled:opacity-50">
                    <span className="w-7 h-7 rounded-full bg-white/10 text-slate-300 flex items-center justify-center text-xs font-mono font-bold shrink-0">
                      {letters[idx]}
                    </span>
                    <span>{opt.text}</span>
                  </button>
                );
              })}
            </div>

            {/* Feedback Overlay */}
            {feedback && (
              <div className={`absolute inset-0 backdrop-blur-md flex flex-col items-center justify-center p-6 text-center z-20 animate-in fade-in duration-200 ${
                feedback.isCorrect ? 'bg-emerald-950/90 text-emerald-200' : 'bg-rose-950/90 text-rose-200'
              }`}>
                <span className="text-4xl mb-2">{feedback.isCorrect ? '🎯 Bravo !' : '❌ Erreur Clinique'}</span>
                <h3 className="text-lg font-bold text-white mb-2">{feedback.isCorrect ? 'Excellente Prise en Charge' : 'Diagnostic Inapproprié'}</h3>
                <p className="text-sm max-w-md leading-relaxed">{feedback.text}</p>
              </div>
            )}
          </div>
        </div>
      ) : (
        /* GAME OVER SCREEN */
        <div className="max-w-2xl mx-auto bg-[#0e0e12] rounded-3xl border border-white/10 p-8 space-y-6 text-center">
          <Trophy className="w-16 h-16 text-amber-400 mx-auto animate-bounce" />
          <h2 className="text-2xl font-bold text-white">Simulation Clinique Terminée !</h2>

          <div className="bg-[#141418] p-6 rounded-2xl border border-white/10 space-y-2">
            <span className="text-xs text-slate-400 font-mono block">SCORE FINAL</span>
            <span className="text-3xl font-mono font-extrabold text-amber-400">{Math.round(score)} points</span>
            
            {playerBadges.length > 0 && (
              <div className="pt-3 flex flex-wrap gap-2 justify-center">
                {playerBadges.map((b, i) => (
                  <span key={i} className="px-3 py-1 rounded-full text-xs font-bold bg-amber-500/20 text-amber-300 border border-amber-500/40">
                    {b}
                  </span>
                ))}
              </div>
            )}
          </div>

          {!showLeaderboard ? (
            <div className="space-y-3 pt-2">
              <input type="text" placeholder="Entrez votre Nom / Pseudo..." value={playerName} onChange={e => setPlayerName(e.target.value)}
                className="w-full px-4 py-3 rounded-xl bg-black/50 border border-white/10 text-white placeholder:text-slate-500 text-sm focus:outline-none focus:border-teal-500" />
              <button onClick={saveScore} disabled={!playerName.trim()}
                className="w-full py-3 rounded-xl bg-teal-500 text-black font-extrabold text-sm hover:bg-teal-400 transition-all disabled:opacity-50">
                Enregistrer mon score au Classement
              </button>
            </div>
          ) : (
            <div className="space-y-4 pt-2">
              <h3 className="text-sm font-bold text-slate-300">Classement des 10 Meilleurs Étudiants</h3>
              <div className="space-y-2 text-left">
                {leaderboard.map((entry, idx) => (
                  <div key={idx} className="flex items-center justify-between p-3 rounded-xl bg-[#141418] text-xs">
                    <span className="font-bold text-white">{idx + 1}. {entry.name}</span>
                    <span className="font-mono text-amber-400 font-bold">{entry.score} pts</span>
                  </div>
                ))}
              </div>
              <button onClick={resetGame}
                className="w-full py-3 rounded-xl bg-white/10 hover:bg-white/20 text-white font-bold text-sm flex items-center justify-center gap-2">
                <RotateCcw className="w-4 h-4" />
                <span>Rejouer une partie</span>
              </button>
            </div>
          )}
        </div>
      )}

    </div>
  );
}
