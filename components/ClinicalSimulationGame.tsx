'use client';

import React, { useState, useEffect } from 'react';
import { HeartPulse, Activity, Wind, Award, Trophy, ChevronRight, User, Star, List, RotateCcw } from 'lucide-react';

const SCENARIOS = [
  { id: 1, specialty: 'Cardiologie', level: 'Externe', title: 'Douleur thoracique aiguë', description: 'Patient de 55 ans, fumeur, présente une douleur thoracique rétrosternale constrictive irradiant vers le bras gauche depuis 45 minutes. ECG: sus-décalage du segment ST en antérieur.', options: [{ text: 'Aspirine, Clopidogrel, Héparine, et angioplastie primaire', correct: true, explanation: 'STEMI antérieur. Reperfusion urgente.' }, { text: 'Paracétamol et retour à domicile', correct: false, explanation: 'Infarctus = Urgence absolue.' }, { text: 'Echocardiographie transthoracique', correct: false, explanation: 'Ne doit pas retarder la reperfusion.' }, { text: 'Aérosol de salbutamol', correct: false, explanation: 'Aucun rapport.' }] },
  { id: 2, specialty: 'Neurologie', level: 'Interne', title: 'Déficit neurologique brutal', description: 'Patiente de 70 ans, hypertendue, présente une hémiplégie droite et aphasie brutale il y a 1h30.', options: [{ text: 'Scanner cérébral sans injection en urgence', correct: true, explanation: 'Éliminer une hémorragie avant thrombolyse.' }, { text: 'Aspirine immédiatement', correct: false, explanation: 'Ne jamais donner d\'aspirine avant l\'imagerie.' }, { text: 'Ponction lombaire', correct: false, explanation: 'Dangereux et inutile.' }, { text: 'Surveillance clinique seule', correct: false, explanation: 'Urgence thérapeutique (thrombolyse).' }] },
  { id: 3, specialty: 'Infectiologie', level: 'Résident', title: 'Fièvre et céphalées', description: 'Homme de 20 ans, fièvre à 40°C, céphalées intenses, vomissements, photophobie, raideur méningée.', options: [{ text: 'Hémocultures, PL puis antibiothérapie immédiate', correct: true, explanation: 'Suspicion méningite bactérienne.' }, { text: 'Antibiothérapie per os', correct: false, explanation: 'Hospitalisation et IV requis.' }, { text: 'Scanner de contrôle à J3', correct: false, explanation: 'Urgence = PL et ATB.' }, { text: 'AINS uniquement', correct: false, explanation: 'Inapproprié.' }] },
  { id: 4, specialty: 'Pneumologie', level: 'Externe', title: 'Dyspnée sifflante', description: 'Patient asthmatique de 25 ans, crise d\'asthme sévère avec difficulté à parler, FR=35/min.', options: [{ text: 'Salbutamol nébulisé + Corticoïdes systémiques + O2', correct: true, explanation: 'Traitement de référence crise sévère.' }, { text: 'Antibiotiques per os', correct: false, explanation: 'Non indiqué sauf infection.' }, { text: 'Sirop antitussif', correct: false, explanation: 'Contre-indiqué.' }, { text: 'Intubation d\'emblée', correct: false, explanation: 'Pour les arrêts ou comas.' }] },
  { id: 5, specialty: 'Endocrinologie', level: 'Interne', title: 'Coma et déshydratation', description: 'Diabétique type 1, confus, polypnéique. Dextro > 5g/L, BU: cétonurie +++, glycosurie +++.', options: [{ text: 'Hydratation IV NaCl 0.9% et Insulinothérapie IV', correct: true, explanation: 'Traitement de l\'acidocétose diabétique.' }, { text: 'Insuline sous-cutanée', correct: false, explanation: 'IV continue requise.' }, { text: 'Bicarbonates', correct: false, explanation: 'Seulement si pH < 6.9.' }, { text: 'Glucagon', correct: false, explanation: 'Patient en hyperglycémie !' }] },
  { id: 6, specialty: 'Chirurgie', level: 'Externe', title: 'Douleur FID', description: 'Homme de 18 ans, douleur exquise FID, défense, fièvre 38°C.', options: [{ text: 'Echo/Scanner abdominal, bilan pré-op, chirurgie', correct: true, explanation: 'Suspicion appendicite aiguë.' }, { text: 'Antalgiques majeurs et sortie', correct: false, explanation: 'Risque péritonite.' }, { text: 'Lavement évacuateur', correct: false, explanation: 'Risque perforation.' }, { text: 'ATB seule en ambulatoire', correct: false, explanation: 'Nécessite évaluation chirurgicale.' }] },
  { id: 7, specialty: 'Cardiologie', level: 'Résident', title: 'Insuffisance cardiaque aiguë', description: 'Patiente 80 ans, orthopnée, crépitants bilatéraux, HTA 180/100, SpO2 85%.', options: [{ text: 'Oxygénothérapie, Diurétiques IV, Dérivés nitrés', correct: true, explanation: 'OAP cardiogénique.' }, { text: 'Bêtabloquants IV', correct: false, explanation: 'Contre-indiqués en phase aiguë.' }, { text: 'Remplissage vasculaire', correct: false, explanation: 'Va aggraver l\'OAP.' }, { text: 'Antibiotiques', correct: false, explanation: 'Non, sauf si foyer infectieux.' }] },
  { id: 8, specialty: 'Gynécologie', level: 'Interne', title: 'Convulsions chez la femme enceinte', description: 'Grossesse 34 SA, crise convulsive tonico-clonique. TA=170/110, protéinurie +++.', options: [{ text: 'Sulfate de magnésium, antihypertenseurs, extraction fœtale', correct: true, explanation: 'Éclampsie : urgence absolue.' }, { text: 'Diazépam et retour à domicile', correct: false, explanation: 'L\'éclampsie engage le pronostic vital.' }, { text: 'Diurétiques de l\'anse', correct: false, explanation: 'Non recommandés en première ligne.' }, { text: 'Surveillance simple', correct: false, explanation: 'Extraction fœtale requise.' }] },
  { id: 9, specialty: 'Pneumologie', level: 'Résident', title: 'Douleur basithoracique et dyspnée', description: 'Jeune homme de 20 ans, grand, longiligne. Douleur thoracique brutale droite et dyspnée.', options: [{ text: 'Radiographie thoracique (recherche pneumothorax)', correct: true, explanation: 'Pneumothorax spontané suspecté.' }, { text: 'ECG et troponines en première intention', correct: false, explanation: 'Terrain évoque plutôt pneumothorax.' }, { text: 'Aérosols de corticoïdes', correct: false, explanation: 'Aucune indication.' }, { text: 'Echocardiographie', correct: false, explanation: 'Pas en première intention.' }] },
  { id: 10, specialty: 'Infectiologie', level: 'Interne', title: 'Choc septique', description: 'Patiente 65 ans, frissons, marbrures, TA 70/40 mmHg, FC 120/min, oligurie, fièvre 39.5°C.', options: [{ text: 'Remplissage vasculaire 30ml/kg, Hémocultures, ATB IV large spectre', correct: true, explanation: 'Golden hours du sepsis.' }, { text: 'Dobutamine d\'emblée', correct: false, explanation: 'Priorité au remplissage et Noradrénaline.' }, { text: 'Antibiothérapie per os', correct: false, explanation: 'Insuffisant.' }, { text: 'Diurétiques', correct: false, explanation: 'Va aggraver l\'hypovolémie.' }] },
  { id: 11, specialty: 'Pédiatrie', level: 'Interne', title: 'Détresse respiratoire du nourrisson', description: 'Nourrisson 6 mois en hiver, toux, sibilants, tirage intercostal, polypnée.', options: [{ text: 'Désobstruction rhinopharyngée, fractionnement repas, O2 si besoin', correct: true, explanation: 'Bronchiolite aiguë.' }, { text: 'Antibiothérapie systématique', correct: false, explanation: 'Origine virale (VRS).' }, { text: 'Corticoïdes inhalés', correct: false, explanation: 'Pas d\'indication en première crise.' }, { text: 'Aérosols de salbutamol d\'emblée', correct: false, explanation: 'Non recommandés en 1ère intention.' }] },
  { id: 12, specialty: 'Gastroentérologie', level: 'Externe', title: 'Hématémèse', description: 'Homme 50 ans, cirrhotique connu, vomit du sang rouge vif en abondance.', options: [{ text: 'Poser 2 VVP, remplissage, culots globulaires, endoscopie en urgence', correct: true, explanation: 'Suspicion de rupture de varices œsophagiennes.' }, { text: 'IPP per os', correct: false, explanation: 'Urgence hémodynamique.' }, { text: 'Echographie abdominale', correct: false, explanation: 'L\'endoscopie est l\'examen clé.' }, { text: 'Chirurgie hépatique immédiate', correct: false, explanation: 'Traitement endoscopique d\'abord.' }] },
  { id: 13, specialty: 'Traumatologie', level: 'Externe', title: 'Chute sur le moignon de l\'épaule', description: 'Patient 25 ans, judoka. Douleur de l\'épaule, signe de la touche de piano.', options: [{ text: 'Radiographie épaule, immobilisation, avis chirurgical', correct: true, explanation: 'Disjonction acromio-claviculaire.' }, { text: 'Réduction sous AG immédiate', correct: false, explanation: 'Pas une luxation gléno-humérale vraie.' }, { text: 'AINS et sport autorisé', correct: false, explanation: 'Immobilisation nécessaire.' }, { text: 'Infiltration de corticoïdes', correct: false, explanation: 'Contre-indiqué en aigu.' }] },
  { id: 14, specialty: 'Psychiatrie', level: 'Interne', title: 'Agitation et délire', description: 'Homme 30 ans, hallucinations auditives, syndrome de persécution, agitation hétéro-agressive.', options: [{ text: 'Sédation (neuroleptique), contention si besoin, hospitalisation sous contrainte', correct: true, explanation: 'Bouffée délirante aiguë avec dangerosité.' }, { text: 'Psychothérapie analytique', correct: false, explanation: 'Pas en phase aiguë.' }, { text: 'Antidépresseurs', correct: false, explanation: 'Risque de virage maniaque/aggravation.' }, { text: 'Retour à domicile avec somnifères', correct: false, explanation: 'Danger pour lui et autrui.' }] },
  { id: 15, specialty: 'Néphrologie', level: 'Résident', title: 'Oligurie et hyperkaliémie', description: 'Patient en IRA, K+ = 7.5 mmol/L avec anomalies ECG (QRS larges).', options: [{ text: 'Gluconate de calcium IV, Insuline-Glucose, Dialyse en urgence', correct: true, explanation: 'Hyperkaliémie menaçante.' }, { text: 'Kayexalate per os', correct: false, explanation: 'Délai d\'action trop long.' }, { text: 'Furosémide à faible dose', correct: false, explanation: 'Insuffisant.' }, { text: 'Restriction hydrique seule', correct: false, explanation: 'Urgence vitale rythmique.' }] },
  { id: 16, specialty: 'Hématologie', level: 'Résident', title: 'Fièvre et purpura', description: 'Femme 25 ans, fièvre, purpura pétéchial étendu, saignements gingivaux, anémie sévère.', options: [{ text: 'NFS, Myélogramme en urgence, support transfusionnel', correct: true, explanation: 'Suspicion de Leucémie Aiguë.' }, { text: 'Antibiothérapie seule', correct: false, explanation: 'Risque hémorragique majeur.' }, { text: 'Corticothérapie per os', correct: false, explanation: 'Masque le diagnostic.' }, { text: 'Recherche de thrombophilie', correct: false, explanation: 'Tableau d\'insuffisance médullaire.' }] },
  { id: 17, specialty: 'Ophtalmologie', level: 'Interne', title: 'Baisse d\'acuité visuelle brutale', description: 'Patient diabétique, BAV brutale indolore de l\'œil droit avec myodésopsies.', options: [{ text: 'Examen du fond d\'œil en urgence', correct: true, explanation: 'Suspicion d\'hémorragie intravitréenne.' }, { text: 'Collyre antibiotique', correct: false, explanation: 'Aucun rapport.' }, { text: 'IRM cérébrale', correct: false, explanation: 'FO en première intention.' }, { text: 'Lunettes de repos', correct: false, explanation: 'Urgence ophtalmologique.' }] },
  { id: 18, specialty: 'ORL', level: 'Externe', title: 'Épistaxis abondante', description: 'Patient hypertendu, saignement de nez abondant non contrôlé par pincement.', options: [{ text: 'Méchage antérieur, contrôle TA, bilan coagulation', correct: true, explanation: 'Epistaxis sévère.' }, { text: 'Cautérisation systématique d\'emblée', correct: false, explanation: 'Difficile si saignement abondant.' }, { text: 'Aspirine pour fluidifier', correct: false, explanation: 'Contre-indiqué !' }, { text: 'Lavage nasal à l\'eau', correct: false, explanation: 'Inefficace.' }] },
  { id: 19, specialty: 'Dermatologie', level: 'Interne', title: 'Éruption vésiculeuse unilatérale', description: 'Homme 60 ans, éruption vésiculeuse très douloureuse en hémi-ceinture thoracique.', options: [{ text: 'Antiviraux (Valaciclovir) et antalgiques', correct: true, explanation: 'Zona intercostal.' }, { text: 'Corticoïdes locaux', correct: false, explanation: 'Risque de dissémination.' }, { text: 'Antibiotiques topiques', correct: false, explanation: 'Origine virale.' }, { text: 'Immunosuppresseurs', correct: false, explanation: 'Contre-indiqué.' }] },
  { id: 20, specialty: 'Réanimation', level: 'Résident', title: 'Polytraumatisé', description: 'Patient accident de la route, inconscient (Glasgow 7), TA 80/40, SpO2 88%.', options: [{ text: 'Intubation, remplissage, transfusion, body-scanner', correct: true, explanation: 'Prise en charge ABCDE.' }, { text: 'Scanner cérébral seul d\'emblée', correct: false, explanation: 'Stabilisation hémodynamique et ventilatoire d\'abord.' }, { text: 'Sutures des plaies superficielles', correct: false, explanation: 'Priorité aux fonctions vitales.' }, { text: 'Transfert en chambre standard', correct: false, explanation: 'Nécessite la Réanimation.' }] }
];

export default function ClinicalSimulationGame() {
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

  useEffect(() => {
    const saved = localStorage.getItem('mededu-leaderboard');
    if (saved) setLeaderboard(JSON.parse(saved));
  }, []);

  // Timer logic
  useEffect(() => {
    if (!gameOver && feedback === null && timeLeft > 0) {
      const t = setTimeout(() => setTimeLeft(l => l - 1), 1000);
      return () => clearTimeout(t);
    }
  }, [timeLeft, gameOver, feedback]);

  const currentScenario = SCENARIOS[currentScenarioIndex];

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
      if (currentScenarioIndex < SCENARIOS.length - 1) {
        setCurrentScenarioIndex(prev => prev + 1);
      } else {
        handleGameOver();
      }
    }, 3000);
  };

  const handleGameOver = () => {
    setGameOver(true);
    // Simple badge logic based on score
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
    setCurrentScenarioIndex(0);
    setScore(0);
    setCombo(0);
    setGameOver(false);
    setShowLeaderboard(false);
    setTimeLeft(60);
    setPlayerBadges([]);
  };

  if (gameOver) {
    return (
      <div className="max-w-4xl mx-auto py-8">
        <div className="bg-slate-900/80 border border-slate-700/80 rounded-3xl p-8 backdrop-blur-xl text-center shadow-2xl">
          <Trophy className="w-20 h-20 text-amber-400 mx-auto mb-6" />
          <h2 className="text-4xl font-extrabold text-white mb-2">Simulation Terminée</h2>
          <p className="text-xl text-slate-300 mb-6">Score Final : <span className="text-teal-400 font-bold text-3xl">{Math.round(score)}</span></p>
          
          {playerBadges.length > 0 && (
            <div className="mb-8">
              <h3 className="text-lg text-slate-400 mb-3">Badges Débloqués :</h3>
              <div className="flex justify-center gap-4">
                {playerBadges.map((b, i) => (
                  <span key={i} className="px-4 py-2 bg-slate-800 border border-amber-500/50 rounded-xl text-amber-300 font-bold shadow-lg shadow-amber-500/10">
                    {b}
                  </span>
                ))}
              </div>
            </div>
          )}

          {!showLeaderboard ? (
            <div className="max-w-md mx-auto space-y-4">
              <input 
                type="text" 
                placeholder="Entrez votre nom..." 
                value={playerName}
                onChange={(e) => setPlayerName(e.target.value)}
                className="w-full bg-slate-800 border border-slate-700 text-white px-4 py-3 rounded-xl focus:border-teal-500 outline-none"
              />
              <button 
                onClick={saveScore}
                className="w-full py-3 bg-teal-500 text-slate-900 font-bold rounded-xl hover:bg-teal-400 transition-colors"
              >
                Enregistrer mon score
              </button>
            </div>
          ) : (
            <div className="max-w-lg mx-auto bg-slate-800/50 rounded-2xl p-6 border border-slate-700 mt-6">
              <h3 className="text-xl font-bold text-white flex items-center justify-center gap-2 mb-4">
                <List className="w-5 h-5 text-teal-400" />
                Leaderboard (Top 10)
              </h3>
              <div className="space-y-2 mb-6 text-left">
                {leaderboard.map((l, i) => (
                  <div key={i} className="flex justify-between p-3 bg-slate-900/60 rounded-lg border border-slate-800">
                    <span className="text-slate-300 font-medium">#{i+1} {l.name}</span>
                    <span className="text-teal-400 font-bold">{l.score}</span>
                  </div>
                ))}
              </div>
              <button 
                onClick={resetGame}
                className="w-full py-3 bg-slate-700 text-white font-bold rounded-xl hover:bg-slate-600 transition-colors flex items-center justify-center gap-2"
              >
                <RotateCcw className="w-5 h-5" />
                Rejouer
              </button>
            </div>
          )}
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto py-8">
      {/* Header Info */}
      <div className="flex flex-wrap items-center justify-between mb-8 bg-slate-900/60 p-4 rounded-2xl border border-teal-500/30 gap-4">
        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-2 text-teal-400">
            <Activity className="w-5 h-5" />
            <span className="font-bold text-lg">Score: {Math.round(score)}</span>
          </div>
          {combo > 1 && (
            <div className="px-3 py-1 bg-amber-500/20 text-amber-400 text-sm font-bold rounded-lg border border-amber-500/30 animate-pulse">
              Combo x{combo}!
            </div>
          )}
        </div>
        
        {/* Health / Timer Bar */}
        <div className="flex-1 max-w-xs mx-4">
          <div className="flex justify-between text-xs text-slate-400 mb-1">
            <span>Urgence (Temps)</span>
            <span className={timeLeft < 15 ? 'text-red-400 font-bold animate-pulse' : ''}>{timeLeft}s</span>
          </div>
          <div className="w-full h-2 bg-slate-800 rounded-full overflow-hidden">
            <div 
              className={`h-full transition-all duration-1000 ${timeLeft < 15 ? 'bg-red-500' : 'bg-teal-500'}`} 
              style={{ width: `${(timeLeft / 60) * 100}%` }} 
            />
          </div>
        </div>

        <div className="text-slate-400 text-sm font-medium">
          Cas {currentScenarioIndex + 1} / {SCENARIOS.length}
        </div>
      </div>

      {/* Scenario Card */}
      <div className="bg-slate-900/80 border border-slate-700/80 rounded-3xl p-6 sm:p-8 relative overflow-hidden backdrop-blur-xl transition-all duration-500">
        <div className="absolute top-0 left-0 w-full h-1 bg-slate-800">
          <div className="h-full bg-teal-500 transition-all duration-300" style={{ width: `${((currentScenarioIndex) / SCENARIOS.length) * 100}%` }} />
        </div>

        <div className="flex flex-wrap items-center gap-3 mb-6">
          <span className="px-3 py-1 bg-teal-500/20 text-teal-300 border border-teal-500/30 rounded-full text-xs font-bold uppercase tracking-wider">
            {currentScenario.specialty}
          </span>
          <span className="px-3 py-1 bg-purple-500/20 text-purple-300 border border-purple-500/30 rounded-full text-xs font-bold uppercase tracking-wider">
            Niveau {currentScenario.level}
          </span>
        </div>

        <h3 className="text-2xl font-bold text-white mb-4 leading-tight">{currentScenario.title}</h3>
        <p className="text-slate-300 text-lg leading-relaxed mb-8">{currentScenario.description}</p>

        {/* Options */}
        <div className="grid grid-cols-1 gap-4">
          {currentScenario.options.map((opt, i) => (
            <button
              key={i}
              disabled={feedback !== null}
              onClick={() => handleAnswer(opt.correct, opt.explanation)}
              className="w-full text-left p-4 rounded-xl border border-slate-700 bg-slate-800/50 hover:bg-slate-700 hover:border-teal-500/50 text-slate-200 transition-all font-medium disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-between group"
            >
              <span>{opt.text}</span>
              <ChevronRight className="w-5 h-5 text-slate-500 group-hover:text-teal-400 transition-colors opacity-0 group-hover:opacity-100" />
            </button>
          ))}
        </div>

        {/* Feedback Overlay */}
        {feedback && (
          <div className={`absolute inset-0 flex flex-col items-center justify-center p-8 backdrop-blur-xl bg-slate-900/95 ${feedback.isCorrect ? 'text-teal-400' : 'text-red-400'} animate-in fade-in duration-200 z-10`}>
            {feedback.isCorrect ? <Award className="w-24 h-24 mb-6 drop-shadow-[0_0_15px_rgba(45,212,191,0.5)]" /> : <Wind className="w-24 h-24 mb-6 drop-shadow-[0_0_15px_rgba(248,113,113,0.5)]" />}
            <h4 className="text-4xl font-extrabold mb-4">{feedback.isCorrect ? 'Excellent !' : 'Incorrect'}</h4>
            <p className="text-xl text-slate-200 text-center max-w-2xl bg-slate-800/50 p-4 rounded-xl border border-slate-700/50">{feedback.text}</p>
          </div>
        )}
      </div>
    </div>
  );
}
