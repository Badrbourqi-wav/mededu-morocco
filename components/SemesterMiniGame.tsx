'use client';
// components/SemesterMiniGame.tsx
// MedEdu Morocco — Exhaustive 2D Medical Arcade Clinical Simulation Engine
// Full curriculum coverage (S1 to S12 - All Modules)

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Gamepad2, Sparkles, HeartPulse, Trophy, RefreshCcw, 
  Zap, CheckCircle2, XCircle, ShieldAlert, Timer, Flame, Award,
  Activity, Stethoscope, ChevronRight, Layers, Filter
} from 'lucide-react';

interface GameScenario {
  id: string;
  semesterCode: string;
  moduleName: string;
  title: string;
  clinicalPresentation: string;
  vitalSign: string;
  options: {
    id: string;
    text: string;
    isCorrect: boolean;
    feedbackText: string;
    points: number;
  }[];
}

const EXHAUSTIVE_MEDICAL_SCENARIOS: Record<string, GameScenario[]> = {
  S1: [
    {
      id: 'g-s1-1',
      semesterCode: 'S1',
      moduleName: 'Anatomie Humaine I',
      title: 'Fracture de la Diaphyse Humérale',
      clinicalPresentation: 'Un patient de 24 ans victime d un AVP présente une déformation du bras avec impotence fonctionnelle. À l examen : impossibilité d étendre le poignet et les doigts (main en goutte).',
      vitalSign: 'Nerf en péril | Déficit Moteur',
      options: [
        { id: 'A', text: 'Lésion du Nerf Radial (Sillon du nerf radial)', isCorrect: true, feedbackText: '✓ Parfait ! Le nerf radial chemine dans la gouttière humérale, sa paralysie entraîne la main en goutte.', points: 200 },
        { id: 'B', text: 'Lésion du Nerf Médian au canal carpien', isCorrect: false, feedbackText: '❌ Faux ! Le nerf médian innerve la loge antérieure de l avant-bras.', points: 0 },
        { id: 'C', text: 'Compression du Nerf Ulnaire à la rétro-épitrochlée', isCorrect: false, feedbackText: '❌ Faux ! Le nerf ulnaire donne la griffe ulnaire.', points: 0 },
      ],
    },
    {
      id: 'g-s1-2',
      semesterCode: 'S1',
      moduleName: 'Histologie & Cytologie',
      title: 'Barrière Alvéolo-Capillaire',
      clinicalPresentation: 'Exploration microscopique d un parenchyme pulmonaire. Quel type cellulaire pavimenteux très mince assure 95% des échanges gazeux alvéolaires ?',
      vitalSign: 'Épithélium Alvéolaire',
      options: [
        { id: 'A', text: 'Pneumocytes de Type I', isCorrect: true, feedbackText: '✓ Exact ! Les pneumocytes I forment l épithélium pavimenteux simple ultrapide (<0.2µm).', points: 150 },
        { id: 'B', text: 'Pneumocytes de Type II (Sécréteurs de Surfactant)', isCorrect: false, feedbackText: '❌ Faux ! Les pneumocytes II sécrètent le surfactant.', points: 0 },
        { id: 'C', text: 'Macrophages Alvéolaires (Cellules à poussière)', isCorrect: false, feedbackText: '❌ Faux ! Rôle d immunité innée.', points: 0 },
      ],
    },
  ],
  S2: [
    {
      id: 'g-s2-1',
      semesterCode: 'S2',
      moduleName: 'Physiologie Cellulaire',
      title: 'Potentiel d Action Myocardique',
      clinicalPresentation: 'Enregistrement d une fibre myocardique ventriculaire. Quelle entrée ionique rapide est responsable de la phase 0 de dépolarisation brute ?',
      vitalSign: 'Potentiel: -90mV ➔ +30mV',
      options: [
        { id: 'A', text: 'Influx sodique rapide via canaux Na+ voltage-dépendants', isCorrect: true, feedbackText: '✓ Bravo ! L ouverture des canaux INa rapides dépolarise la membrane en 1-2 ms.', points: 200 },
        { id: 'B', text: 'Efflux potassique via canaux K+ rectificateurs', isCorrect: false, feedbackText: '❌ Faux ! Responsable de la repolarisation.', points: 0 },
        { id: 'C', text: 'Entrée calcique lente par canaux L', isCorrect: false, feedbackText: '❌ Faux ! Responsable du plateau (Phase 2).', points: 0 },
      ],
    },
  ],
  S3: [
    {
      id: 'g-s3-1',
      semesterCode: 'S3',
      moduleName: 'Pharmacologie Générale',
      title: 'Bêta-Lactamines & Résistances',
      clinicalPresentation: 'Une souche de Staphylococcus aureus sécrète une bêta-lactamase (pénicillinase). Quel inhibiteur associer à l amoxicilline pour restaurer son activité ?',
      vitalSign: 'Antibiogramme / CMI',
      options: [
        { id: 'A', text: 'Acide Clavulanique (Augmentin®)', isCorrect: true, feedbackText: '✓ Correct ! L acide clavulanique inhibe irréversiblement les bêta-lactamases.', points: 200 },
        { id: 'B', text: 'Ciprofloxacine', isCorrect: false, feedbackText: '❌ Faux ! C est une fluoroquinolone.', points: 0 },
        { id: 'C', text: 'Gentamisine', isCorrect: false, feedbackText: '❌ Faux ! C est un aminoside.', points: 0 },
      ],
    },
  ],
  S4: [
    {
      id: 'g-s4-1',
      semesterCode: 'S4',
      moduleName: 'Sémiologie Médicale',
      title: 'Sémiologie Cardiaque',
      clinicalPresentation: 'Auscultation à l apex (foyer mitral) chez une patiente de 40 ans : Éclat de B1, claquement d ouverture mitrale et roulement diastolique. Quel diagnostic évoquez-vous ?',
      vitalSign: 'Foyer Mitral | Apex',
      options: [
        { id: 'A', text: 'Rétrécissement Mitral (RM)', isCorrect: true, feedbackText: '✓ Exact ! Triade classique de Duroziez signant le Rétrécissement Mitral.', points: 250 },
        { id: 'B', text: 'Insuffisance Aortique (IA)', isCorrect: false, feedbackText: '❌ Faux ! IA donne un souffle diastolique en foyer aortique.', points: 0 },
        { id: 'C', text: 'Insuffisance Mitrale (IM)', isCorrect: false, feedbackText: '❌ Faux ! IM donne un souffle holosystolique apex-aisselle.', points: 0 },
      ],
    },
  ],
  S5: [
    {
      id: 'g-s5-1',
      semesterCode: 'S5',
      moduleName: 'Cardiologie',
      title: 'SCA ST+ Antérieur (IDM Urgent)',
      clinicalPresentation: 'Homme de 52 ans, douleur rétrosternale constrictive violente depuis 1h30. ECG : Onde de Pardee V1 à V5. Délai estimé pour angioplastie primaire = 45 min.',
      vitalSign: 'PA: 140/90 | FC: 110 | SpO2: 96%',
      options: [
        { id: 'A', text: 'Angioplastie Primaire en urgence + Aspirine + Ticagrélor + Héparine', isCorrect: true, feedbackText: '✓ Excellent ! ICP primaire dans les 120min est le GOLD STANDARD absolu.', points: 300 },
        { id: 'B', text: 'Thrombolyse IV immédiate en première intention', isCorrect: false, feedbackText: '❌ Non ! Fibrinolyse indiquée seulement si ICP > 120min.', points: 0 },
        { id: 'C', text: 'Prescription de dérivés nitrés et surveillance 24h', isCorrect: false, feedbackText: '❌ Dangereux ! Perte de chance myocardique irréversible.', points: 0 },
      ],
    },
    {
      id: 'g-s5-2',
      semesterCode: 'S5',
      moduleName: 'Pneumologie',
      title: 'Exacerbation Sévère d Asthme (Asthme Aigu Grave)',
      clinicalPresentation: 'Jeune fille de 18 ans amenée aux urgences pour détresse respiratoire. Elle ne peut articuler deux mots. Auscultation : SILENCE RESPIRATOIRE bilatéral.',
      vitalSign: 'SpO2: 84% | FR: 36/min | Silence',
      options: [
        { id: 'A', text: 'O2 fort débit + Bêta-2 mimétiques nébulisés (Salbutamol) + Corticoïdes IV', isCorrect: true, feedbackText: '✓ Urgence vitale levée ! Le silence auscultatoire est un signe d extrême gravité.', points: 300 },
        { id: 'B', text: 'Sédatif léger et surveillance EFR', isCorrect: false, feedbackText: '❌ Mortel ! Risque d arrêt respiratoire imminent.', points: 0 },
        { id: 'C', text: 'Antibiothérapie seule par Amoxicilline', isCorrect: false, feedbackText: '❌ Inutile f l urgence aiguë.', points: 0 },
      ],
    },
  ],
  S6: [
    {
      id: 'g-s6-1',
      semesterCode: 'S6',
      moduleName: 'Neurologie',
      title: 'AVC Ischémique Sylvien (Time is Brain)',
      clinicalPresentation: 'Homme de 68 ans amené pour aphasie brutale et déviation de la bouche depuis 2h15. IRM : Hypersignal en diffusion dans le territoire sylvien gauche sans hématome.',
      vitalSign: 'NIHSS: 14 | PA: 175/95 mmHg',
      options: [
        { id: 'A', text: 'Thrombolyse IV par rt-PA (Altéplase) immédiate', isCorrect: true, feedbackText: '✓ Bravo ! Fenêtre thérapeutique < 4h30 respectée, revascularisation lancée.', points: 300 },
        { id: 'B', text: 'Baisse rapide de la PA sous 120/80 mmHg par nicardipine', isCorrect: false, feedbackText: '❌ Erreur majeure ! La baisse excessive de la PA aggrave l ischémie de pénombre.', points: 0 },
        { id: 'C', text: 'Prescription d Aspirine 500mg seule et attente', isCorrect: false, feedbackText: '❌ Insuffisant f la fenêtre thrombolytique.', points: 0 },
      ],
    },
    {
      id: 'g-s6-2',
      semesterCode: 'S6',
      moduleName: 'Gastro-Entérologie',
      title: 'Hépatite B Chronique (Sérologie)',
      clinicalPresentation: 'Bilan de santé d un patient de 35 ans : Ag HBs (+), Anti-HBc Total (+), Anti-HBs (-), Ag HBe (+), ADN-VHB > 20.000 UI/mL.',
      vitalSign: 'ALAT: 3x Normale | Fibroscan F2',
      options: [
        { id: 'A', text: 'Hépatite B Chronique Active (Indication au traitement par Ténofovir/Entecavir)', isCorrect: true, feedbackText: '✓ Correct ! Réplication virale élevée + cytolyse ➔ Traitement antiviral analogue.', points: 250 },
        { id: 'B', text: 'Patient vacciné immunisé contre le VHB', isCorrect: false, feedbackText: '❌ Faux ! Vacciné = Anti-HBs (+) isolé.', points: 0 },
        { id: 'C', text: 'Hépatite B ancienne guérie', isCorrect: false, feedbackText: '❌ Faux ! Guéri = Ag HBs (-).', points: 0 },
      ],
    },
  ],
  S7: [
    {
      id: 'g-s7-1',
      semesterCode: 'S7',
      moduleName: 'Néphrologie',
      title: 'Syndrome Néphrotique Pur de l Enfant',
      clinicalPresentation: 'Enfant de 4 ans présentant des œdèmes palpébraux et des membres inférieurs. Bilan : Protéinurie = 4.5 g/24h, Albuminémie = 21 g/L. Pas d hématurie ni HTA.',
      vitalSign: 'Protéinurie: 4.5g | Albuminémie: 21g',
      options: [
        { id: 'A', text: 'Néphrose Lipaïdique (LGM) ➔ Corticothérapie forte dose sans PBR', isCorrect: true, feedbackText: '✓ Parfait ! PBR inutile chez l enfant de 1-10 ans avec SN pur typique.', points: 300 },
        { id: 'B', text: 'Biopsie Rénale sous Scanner en urgence', isCorrect: false, feedbackText: '❌ Inutile et invasif chez l enfant.', points: 0 },
        { id: 'C', text: 'Dialyse péritonéale d emblée', isCorrect: false, feedbackText: '❌ Contre-sens thérapeutique.', points: 0 },
      ],
    },
  ],
  S8: [
    {
      id: 'g-s8-1',
      semesterCode: 'S8',
      moduleName: 'Pédiatrie',
      title: 'Déshydratation Aiguë du Nourrisson',
      clinicalPresentation: 'Nourrisson de 8 mois atteint de rotavirus avec diarrhée profuse et vomissements. Perte de poids mesurée à 12%. Plie cutané persistant et somnolence.',
      vitalSign: 'Perte de poids: 12% | Léthargie',
      options: [
        { id: 'A', text: 'Déshydratation Sévère Grade III ➔ Perfusion IV Ringer Lactate/Sérum Salé', isCorrect: true, feedbackText: '✓ Urgence réanimatoire ! Perte > 10% nécessite un remplissage IV immédiat.', points: 300 },
        { id: 'B', text: 'Solution de Réhydratation Orale (SRO) par cuillère', isCorrect: false, feedbackText: '❌ SRO indiqué seulement f les déshydratations légères à modérées (<10%).', points: 0 },
        { id: 'C', text: 'Arrêt complet de l allaitement et eau pure', isCorrect: false, feedbackText: '❌ Risque d hyponatrémie et d aggravation.', points: 0 },
      ],
    },
    {
      id: 'g-s8-2',
      semesterCode: 'S8',
      moduleName: 'Gynécologie & Obstétrique',
      title: 'Grossesse Extra-Utérine (GEU)',
      clinicalPresentation: 'Femme de 26 ans, amenorrhée de 6 semaines, métrorragies sépia et douleur aiguë en fosse iliaque droite. Bêta-hCG = 3400 UI/L. Échographie : Utérus vide.',
      vitalSign: 'b-hCG: 3400 UI/L | Écho: Vacuité',
      options: [
        { id: 'A', text: 'Diagnostic de GEU affirmé ➔ Prise en charge médicale (Méthotrexate) ou coelio', isCorrect: true, feedbackText: '✓ Excellent ! hCG > 2000 UI/L avec utérus vide = GEU jusqu à preuve du contraire.', points: 300 },
        { id: 'B', text: 'Grossesse intra-utérine normale débutante', isCorrect: false, feedbackText: '❌ Faux ! À 3400 UI/L le sac gestationnel doit être visible f l utérus.', points: 0 },
        { id: 'C', text: 'Prescription de progestérone seule', isCorrect: false, feedbackText: '❌ Risque de rupture tubaire mortelle.', points: 0 },
      ],
    },
  ],
  S9: [
    {
      id: 'g-s9-1',
      semesterCode: 'S9',
      moduleName: 'Maladies Infectieuses',
      title: 'Tuberculose Pulmonaire TPM+',
      clinicalPresentation: 'Homme de 42 ans présentant toux chronique depuis 4 semaines, hémoptysies, sueurs nocturnes et amaigrissement. Crachats GeneXpert : MTB (+), Rifampicine sensible.',
      vitalSign: 'Crachats GeneXpert: MTB+',
      options: [
        { id: 'A', text: 'Traitement PNLAT Maroc : 2 mois RHZE / 4 mois RH', isCorrect: true, feedbackText: '✓ Protocol national 100% respecté ! 2RHZE + 4RH sous surveillance.', points: 300 },
        { id: 'B', text: 'Monothérapie par Isoniazide pendant 1 an', isCorrect: false, feedbackText: '❌ Faux ! Générateur de sélection de souches mutantes résistantes.', points: 0 },
        { id: 'C', text: 'Amoxicilline + Acide Clavulanique 14 jours', isCorrect: false, feedbackText: '❌ Inefficace sur Mycobacterium tuberculosis.', points: 0 },
      ],
    },
  ],
  S10: [
    {
      id: 'g-s10-1',
      semesterCode: 'S10',
      moduleName: 'Urgences & Réanimation',
      title: 'Arrêt Cardiorespiratoire (ACR)',
      clinicalPresentation: 'Homme de 60 ans s effondre brusquement devant vous. Absence de réponse et d expansion thoracique (Gasps). Aucun pouls carotidien perçu.',
      vitalSign: 'Pouls: Absent | Cardio: FV',
      options: [
        { id: 'A', text: 'MCE immédiat (100-120/min) + Appel SAMU + DAE (Choc si FV/TV)', isCorrect: true, feedbackText: '✓ Réanimation cardiopulmonaire parfaite ! La défibrillation précoce sauve la vie.', points: 350 },
        { id: 'B', text: 'Mise en Position Latérale de Sécurité (PLS)', isCorrect: false, feedbackText: '❌ Grave erreur ! La PLS est réservée aux patients inconscients qui RESPIRENT.', points: 0 },
        { id: 'C', text: 'Injections d Atropine IV seule', isCorrect: false, feedbackText: '❌ Inutile f l ACR sur FV/TV.', points: 0 },
      ],
    },
  ],
  S11: [
    {
      id: 'g-s11-1',
      semesterCode: 'S11',
      moduleName: 'Stage Interné Médecine',
      title: 'Choc Septique f la Garde',
      clinicalPresentation: 'Patient f le service de médecine interne présentant de la fièvre à 39.8°C, marbrures aux genoux, PAS à 75 mmHg malgré le remplissage salé de 30 mL/kg.',
      vitalSign: 'Lactates: 4.8 mmol/L | PA: 75/40',
      options: [
        { id: 'A', text: 'Choc Septique ➔ Vasoactif (Noradrénaline IVSE) + Antibiothérapie large < 1h', isCorrect: true, feedbackText: '✓ Prise en charge réanimatoire parfaite ! Noradrénaline = 1er choix en choc septique.', points: 350 },
        { id: 'B', text: 'Continuer le remplissage seul sans vasoactifs', isCorrect: false, feedbackText: '❌ Risque d OAP iatrogène sans remontée de la PAM.', points: 0 },
        { id: 'C', text: 'Transfusion de Culots Globulaires', isCorrect: false, feedbackText: '❌ Non indiqué f l absence d anémie aiguë.', points: 0 },
      ],
    },
  ],
  S12: [
    {
      id: 'g-s12-1',
      semesterCode: 'S12',
      moduleName: 'Thèse PFE & Chirurgie',
      title: 'Péritonite Aiguë Généralisée (PFE)',
      clinicalPresentation: 'Patient de 30 ans avec douleur abdominale intense brusque en "coup de poignard". Examen : Abdomen de bois (contracture généralisée invincible).',
      vitalSign: 'Contracture | Disparition matité',
      options: [
        { id: 'A', text: 'Péritonite par perforation d Ulcère ➔ Chirurgie en URGENCE (Laparotomie)', isCorrect: true, feedbackText: '✓ Diagnostic PFE Validé ! Abdomen de bois = Urgence chirurgicale absolue.', points: 400 },
        { id: 'B', text: 'Traitement médical par antispasmodiques et retour à domicile', isCorrect: false, feedbackText: '❌ Erreur médico-légale grave !', points: 0 },
        { id: 'C', text: 'Lavement évacuateur', isCorrect: false, feedbackText: '❌ Risque de choc septique sur perforation.', points: 0 },
      ],
    },
  ],
};

export default function SemesterMiniGame({ semesterCode = 'S5' }: { semesterCode?: string }) {
  const [selectedSem, setSelectedSem] = useState<string>(semesterCode);
  const [currentIdx, setCurrentIdx] = useState(0);
  const [score, setScore] = useState(0);
  const [streak, setStreak] = useState(0);
  const [lives, setLives] = useState(3);
  const [gameState, setGameState] = useState<'IDLE' | 'PLAYING' | 'FEEDBACK' | 'GAMEOVER' | 'VICTORY'>('IDLE');
  const [lastAnswer, setLastAnswer] = useState<{ isCorrect: boolean; text: string } | null>(null);
  const [timeLeft, setTimeLeft] = useState(15);

  const semestersList = ['S1', 'S2', 'S3', 'S4', 'S5', 'S6', 'S7', 'S8', 'S9', 'S10', 'S11', 'S12'];

  const levelData = EXHAUSTIVE_MEDICAL_SCENARIOS[selectedSem] || EXHAUSTIVE_MEDICAL_SCENARIOS.S5;
  const currentQ = levelData[currentIdx % levelData.length];

  useEffect(() => {
    if (gameState !== 'PLAYING') return;
    if (timeLeft <= 0) {
      handleOptionSelect(false, '⏱️ Temps écoulé ! Échec de la décision d urgence.');
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

  const handleOptionSelect = (isCorrect: boolean, feedbackText: string) => {
    setLastAnswer({ isCorrect, text: feedbackText });
    setGameState('FEEDBACK');

    if (isCorrect) {
      setScore(s => s + 150 + streak * 25);
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
    <div className="glass-panel rounded-3xl border border-amber-500/30 p-6 bg-slate-950/90 shadow-2xl relative overflow-hidden">
      {/* Background Pulse Ambient */}
      <div className="absolute -top-20 -right-20 w-80 h-80 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -bottom-20 -left-20 w-80 h-80 bg-teal-500/10 rounded-full blur-3xl pointer-events-none" />

      {/* Top Controls & Semester Switcher */}
      <div className="flex flex-col md:flex-row md:items-center justify-between pb-4 mb-6 border-b border-slate-800 gap-4">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-amber-500 to-teal-500 flex items-center justify-center text-slate-950 font-bold shadow-lg shadow-amber-500/25 shrink-0">
            <Gamepad2 className="w-6 h-6" />
          </div>
          <div>
            <h3 className="text-lg font-extrabold text-white flex items-center gap-2">
              Jeu 2D Simulation Clinique
              <span className="px-2.5 py-0.5 rounded-full bg-amber-500/15 border border-amber-500/30 text-amber-300 text-[10px] font-bold">
                Tous Semestres (S1-S12)
              </span>
            </h3>
            <p className="text-xs text-slate-400">Joueur : <span className="text-teal-300 font-bold">Badr Bourqi</span> | Mode Simulation Urgences</p>
          </div>
        </div>

        {/* Semester Selector Buttons */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-none max-w-full">
          {semestersList.map(s => (
            <button
              key={s}
              onClick={() => { setSelectedSem(s); setGameState('IDLE'); }}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold font-mono transition-all border shrink-0 ${
                selectedSem === s
                  ? 'bg-amber-500 text-slate-950 border-amber-400 shadow-md shadow-amber-500/20 scale-105'
                  : 'bg-slate-900 text-slate-400 border-slate-800 hover:border-amber-500/40 hover:text-white'
              }`}
            >
              {s}
            </button>
          ))}
        </div>
      </div>

      {/* IDLE STATE */}
      {gameState === 'IDLE' && (
        <div className="text-center py-12 space-y-5">
          <div className="w-20 h-20 rounded-3xl bg-amber-500/15 border border-amber-500/30 flex items-center justify-center text-amber-400 mx-auto animate-bounce shadow-xl shadow-amber-500/10">
            <Trophy className="w-10 h-10" />
          </div>
          <div>
            <h4 className="text-xl font-extrabold text-white mb-2">
              Simulation Clinique 2D — Semestre <span className="text-amber-400">{selectedSem}</span>
            </h4>
            <p className="text-xs text-slate-300 max-w-lg mx-auto leading-relaxed">
              Module actuel : <span className="text-teal-300 font-bold">{levelData[0]?.moduleName}</span>. Testez vos décisions d urgence médicale sous pression de chrono !
            </p>
          </div>
          <button
            onClick={startGame}
            className="px-8 py-3.5 rounded-2xl bg-gradient-to-r from-amber-500 to-teal-500 text-slate-950 font-extrabold text-sm shadow-xl shadow-amber-500/30 hover:scale-105 transition-transform flex items-center gap-2 mx-auto"
          >
            <Zap className="w-5 h-5 fill-current" />
            Lancer la Partie 2D ({selectedSem})
          </button>
        </div>
      )}

      {/* PLAYING / FEEDBACK STATE */}
      {(gameState === 'PLAYING' || gameState === 'FEEDBACK') && (
        <div className="space-y-5">
          {/* Game HUD Bar */}
          <div className="flex items-center justify-between bg-slate-900/90 border border-slate-800 rounded-2xl px-5 py-3">
            <div className="flex items-center gap-3">
              <span className="px-3 py-1 rounded-lg bg-teal-500/15 border border-teal-500/30 text-teal-300 font-mono font-bold text-xs">
                {currentQ.moduleName}
              </span>
              <span className="text-xs font-bold text-white hidden sm:inline">{currentQ.title}</span>
            </div>

            <div className="flex items-center gap-4">
              {/* Hearts */}
              <div className="flex items-center gap-1">
                {[1, 2, 3].map(h => (
                  <span key={h} className={`text-sm ${h <= lives ? 'opacity-100 scale-110' : 'opacity-20'} transition-all`}>
                    ❤️
                  </span>
                ))}
              </div>

              {/* Score */}
              <div className="bg-slate-950 px-3.5 py-1.5 rounded-xl border border-amber-500/30 text-xs font-mono font-bold text-amber-300 flex items-center gap-2">
                <Trophy className="w-3.5 h-3.5 text-amber-400" />
                {score} pts
              </div>
            </div>
          </div>

          {/* Clinical Scenario Box */}
          <div className="bg-gradient-to-r from-slate-900 to-slate-950 border border-teal-500/30 rounded-2xl p-5 relative overflow-hidden">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-3">
              <div className="flex items-center gap-2">
                <Stethoscope className="w-4 h-4 text-teal-400" />
                <span className="text-xs font-extrabold text-teal-300 uppercase tracking-wider">Cas Clinique d Urgence</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="px-2.5 py-1 rounded-lg bg-slate-900 border border-slate-800 text-[11px] font-mono text-cyan-300 flex items-center gap-1">
                  <Activity className="w-3.5 h-3.5 text-rose-400 animate-pulse" />
                  {currentQ.vitalSign}
                </span>
                <span className={`px-2.5 py-1 rounded-lg border text-xs font-mono font-bold flex items-center gap-1 ${timeLeft <= 5 ? 'bg-rose-500/20 text-rose-300 border-rose-500/40 animate-ping' : 'bg-slate-900 text-amber-300 border-slate-800'}`}>
                  <Timer className="w-3.5 h-3.5" />
                  {timeLeft}s
                </span>
              </div>
            </div>
            <p className="text-sm font-semibold text-white leading-relaxed">{currentQ.clinicalPresentation}</p>
          </div>

          {/* Choices Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            {currentQ.options.map(opt => (
              <button
                key={opt.id}
                disabled={gameState === 'FEEDBACK'}
                onClick={() => handleOptionSelect(opt.isCorrect, opt.feedbackText)}
                className={`p-4 rounded-2xl border text-xs text-left font-bold transition-all flex flex-col justify-between min-h-[100px] ${
                  gameState === 'FEEDBACK'
                    ? opt.isCorrect
                      ? 'bg-emerald-950/90 border-emerald-500 text-emerald-200 ring-2 ring-emerald-500/40'
                      : 'bg-slate-900/40 border-slate-800 text-slate-500 opacity-50'
                    : 'bg-slate-900/80 border-slate-800 hover:border-amber-500/50 hover:bg-slate-800 text-slate-200 hover:scale-[1.02]'
                }`}
              >
                <div className="flex items-center justify-between w-full mb-2">
                  <span className="w-7 h-7 rounded-lg bg-slate-800 text-slate-300 flex items-center justify-center font-mono font-bold text-xs">
                    {opt.id}
                  </span>
                  {gameState === 'FEEDBACK' && opt.isCorrect && <CheckCircle2 className="w-5 h-5 text-emerald-400" />}
                </div>
                <span className="leading-relaxed">{opt.text}</span>
              </button>
            ))}
          </div>

          {/* Feedback banner */}
          {gameState === 'FEEDBACK' && lastAnswer && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className={`p-5 rounded-2xl border text-xs flex items-center justify-between gap-4 ${
                lastAnswer.isCorrect
                  ? 'bg-emerald-950/90 border-emerald-500 text-emerald-100'
                  : 'bg-rose-950/90 border-rose-500 text-rose-100'
              }`}
            >
              <div className="flex items-start gap-3">
                {lastAnswer.isCorrect ? <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" /> : <ShieldAlert className="w-5 h-5 text-rose-400 shrink-0 mt-0.5" />}
                <div>
                  <span className="font-extrabold uppercase text-xs tracking-wider block mb-1">
                    {lastAnswer.isCorrect ? '✓ Décision Médicale Correcte !' : '❌ Erreur Clinique !'}
                  </span>
                  <p className="text-xs leading-relaxed">{lastAnswer.text}</p>
                </div>
              </div>
              <button
                onClick={nextQuestion}
                className="px-5 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-extrabold text-xs border border-slate-700 shrink-0 flex items-center gap-1.5"
              >
                Suivant <ChevronRight className="w-4 h-4" />
              </button>
            </motion.div>
          )}
        </div>
      )}

      {/* GAMEOVER / VICTORY */}
      {(gameState === 'GAMEOVER' || gameState === 'VICTORY') && (
        <div className="text-center py-10 space-y-4">
          <div className="w-20 h-20 rounded-3xl bg-slate-900 border border-slate-800 flex items-center justify-center mx-auto text-3xl shadow-xl">
            {gameState === 'VICTORY' ? '🏆' : '💀'}
          </div>
          <h4 className="text-xl font-extrabold text-white">
            {gameState === 'VICTORY' ? 'Félicitations Badr Bourqi ! Simulation Validée' : 'Échec de la Réanimation'}
          </h4>
          <p className="text-xs text-slate-300">
            Score Final : <span className="text-amber-400 font-bold text-base">{score} pts</span> sur le Semestre {selectedSem}
          </p>
          <div className="flex justify-center gap-3 pt-2">
            <button
              onClick={startGame}
              className="px-6 py-3 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-extrabold text-xs shadow-lg transition-all flex items-center gap-2"
            >
              <RefreshCcw className="w-4 h-4" /> Recommencer ce Semestre
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
