// lib/mock-data.ts
// Comprehensive Moroccan Medical Reform Curriculum Data (6-Year PFE Standard)
// ALL FULL DETAILS - NO SUMMARIES

import { SemesterData, ModuleData, DiagramData, LessonData, QCMQuizData } from '../types';

export const SEMESTERS: SemesterData[] = [
  {
    id: 's1', code: 'S1',
    title: 'Semestre 1 - Anatomie Humaine I & Biologie Médicale',
    number: 1, cycle: 'PRECLINICAL',
    description: 'Anatomie descriptive et topographique (Ostéologie, Arthrologie, Myologie), cytologie, histologie et biochimie fondamentale.',
    icon: 'Microscope', modulesCount: 4, progressPercent: 100,
  },
  {
    id: 's2', code: 'S2',
    title: 'Semestre 2 - Physiologie Humaine & Biophysique',
    number: 2, cycle: 'PRECLINICAL',
    description: 'Physiologie cellulaire, potentiels d action, grands systèmes neuro-musculaires et biophysique des rayonnements ionisants.',
    icon: 'Activity', modulesCount: 4, progressPercent: 92,
  },
  {
    id: 's3', code: 'S3',
    title: 'Semestre 3 - Anatomie Pathologique & Pharmacologie Générale',
    number: 3, cycle: 'PRECLINICAL',
    description: 'Processus tumoraux, réactions inflammatoires, lésion cellulaire et pharmacocinétique/ADME des médicaments.',
    icon: 'Pill', modulesCount: 5, progressPercent: 85,
  },
  {
    id: 's4', code: 'S4',
    title: 'Semestre 4 - Sémiologie Médicale & Chirurgicale de Base',
    number: 4, cycle: 'PRECLINICAL',
    description: 'Initiation à l examen clinique méthodique, interrogation par appareils, signes cardinaux et gestes élémentaires.',
    icon: 'Stethoscope', modulesCount: 5, progressPercent: 78,
  },
  {
    id: 's5', code: 'S5',
    title: 'Semestre 5 - Pathologies Cardio-Vasculaires & Pulmonaires',
    number: 5, cycle: 'CLINICAL',
    description: 'Sémiologie, ECG, insuffisance cardiaque, HTA, coronaropathies, tuberculose PNLAT et pathologies broncho-pulmonaires.',
    icon: 'HeartPulse', modulesCount: 5, progressPercent: 64,
  },
  {
    id: 's6', code: 'S6',
    title: 'Semestre 6 - Gastro-Entérologie & Neurologie Clinique',
    number: 6, cycle: 'CLINICAL',
    description: 'Hépatologie, oncologie digestive, sémiologie neurologique, AVC ischémique/hémorragique, épilepsies et céphalées.',
    icon: 'Brain', modulesCount: 5, progressPercent: 45,
  },
  {
    id: 's7', code: 'S7',
    title: 'Semestre 7 - Néphrologie, Urologie & Endocrinologie',
    number: 7, cycle: 'CLINICAL',
    description: 'Maladies rénales aiguës et chroniques, diabétologie type 1/2, dysthyroïdies et urologie oncologique.',
    icon: 'Dna', modulesCount: 5, progressPercent: 30,
  },
  {
    id: 's8', code: 'S8',
    title: 'Semestre 8 - Pédiatrie & Gynécologie-Obstétrique',
    number: 8, cycle: 'CLINICAL',
    description: 'Développement de l enfant, néonatologie, urgences pédiatriques, suivi de grossesse et dystocies.',
    icon: 'Baby', modulesCount: 4, progressPercent: 15,
  },
  {
    id: 's9', code: 'S9',
    title: 'Semestre 9 - Maladies Infectieuses & Dermatologie',
    number: 9, cycle: 'CLINICAL',
    description: 'Antibiothérapie raisonnée, Programme National Anti-Tuberculose (PNLAT Maroc), VIH, paludisme et dermatoses bulleuses.',
    icon: 'ShieldAlert', modulesCount: 4, progressPercent: 0,
  },
  {
    id: 's10', code: 'S10',
    title: 'Semestre 10 - Urgences, Réanimation & Thérapeutique',
    number: 10, cycle: 'CLINICAL',
    description: 'États de choc (septique, anaphylactique, cardiogénique), arrêt cardiorespiratoire (MCE/DSA) et prescription médicale raisonnée.',
    icon: 'Siren', modulesCount: 4, progressPercent: 0,
  },
  {
    id: 's11', code: 'S11',
    title: 'Semestre 11 - Stage Interné de Médecine & Pédiatrie',
    number: 11, cycle: 'INTERNSHIP',
    description: 'Responsabilité clinique directe en milieu hospitalier CHU/CHRH, gardes d urgence et démarches étiologiques.',
    icon: 'Building2', modulesCount: 3, progressPercent: 0,
  },
  {
    id: 's12', code: 'S12',
    title: 'Semestre 12 - Stage Chirurgical & Thèse de Fin d Études (PFE)',
    number: 12, cycle: 'INTERNSHIP',
    description: 'Pratique chirurgicale au bloc opératoire, examen clinique d aptitude national et défense du mémoire de Docteur en Médecine.',
    icon: 'GraduationCap', modulesCount: 3, progressPercent: 0,
  },
];

export const CARDIOLOGY_DIAGRAM: DiagramData = {
  id: 'diag-heart-01',
  title: 'Anatomie Cardiaque & Circuits Hémodynamiques (Niveau PFE)',
  category: 'Cardiologie Structurale',
  imageOrSvgType: 'HEART',
  hotspots: [
    {
      id: 'pin-aorta', x: 52, y: 18,
      label: 'Crosse de l Aorte', clinicalTerm: 'Aorta Thoracica',
      definition: 'Artère systémique majeure issue du VG. Pression systolique normale: 120 mmHg. Lieu d élection de la dissection aortique de type A de Stanford.',
      pathologyNote: 'PFE: Devant toute douleur thoracique rétrosternale migratrice, d emblée maximale, avec asymétrie tensionnelle > 20 mmHg, évoquer la Dissection Aortique. Contre-indication ABSOLUE aux thrombolytiques et anticoagulants.',
      pulseAnimation: true,
    },
    {
      id: 'pin-left-ventricle', x: 62, y: 65,
      label: 'Ventricule Gauche (VG)', clinicalTerm: 'Ventriculus Sinister',
      definition: 'Épaisseur pariétale normale en diastole: 8-11 mm. Fraction d Éjection normale (FEVG) ≥ 50-55%. Pression systolique intraventriculaire gauche = 120 mmHg.',
      pathologyNote: 'Insuffisance ventriculaire gauche: dyspnée d effort puis de repos (NYHA), râles crépitants pulmonaires bilatéraux en marée montante, galop B3 ou B4. Territoire antérieur irrigué par l IVA.',
      pulseAnimation: true,
    },
    {
      id: 'pin-right-atrium', x: 35, y: 42,
      label: 'Oreillette Droite (OD)', clinicalTerm: 'Atrium Dextrum',
      definition: 'Reçoit le retour veineux des veines caves supérieure et inférieure. Abrite le Nœud Sinusal (Keith & Flack), pacemaker naturel du cœur. Pression veineuse centrale normale: 2-8 mmHg.',
      pathologyNote: 'IVD: Turgescence jugulaire spontanée ou induite par Reflux Hépato-Jugulaire (RHJ), OMI gardant le godet, hépatomégalie douloureuse, ascite en cas d IVD sévère.',
      pulseAnimation: false,
    },
    {
      id: 'pin-mitral-valve', x: 54, y: 48,
      label: 'Valve Mitrale', clinicalTerm: 'Valva Mitralis',
      definition: 'Valve atrio-ventriculaire gauche bicuspide composée de deux feuillets (antérieur et postérieur) avec un appareil sous-valvulaire (cordages tendineux, piliers). Surface ostiale normale: 4 à 6 cm².',
      pathologyNote: 'RM serré: Surface < 1.5 cm². Étiologie prédominante au Maroc = RAA. Auscultation: Éclat de B1, claquement d ouverture mitrale (COM), roulement diastolique à renforcement présystolique à la pointe.',
      pulseAnimation: false,
    },
  ],
};

export const DETAILED_LESSONS: LessonData[] = [
  // ============================================================
  // CHAPITRE 1 - INSUFFISANCE CARDIAQUE AIGUE & OAP
  // ============================================================
  {
    id: 'les-cardio-01',
    title: '1. Insuffisance Cardiaque Aiguë (ICA) & OAP Flash',
    order: 1,
    summary: '',
    content: `
═══════════════════════════════════════════════════════════════
INSUFFISANCE CARDIAQUE AIGUË (ICA) & ŒDÈME AIGU DU POUMON (OAP)
S5 — Module Cardiologie & Pathologies Vasculaires — PFE Maroc
═══════════════════════════════════════════════════════════════

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
I. DÉFINITIONS & ÉPIDÉMIOLOGIE NATIONALE
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

L'Insuffisance Cardiaque Aiguë (ICA) désigne la survenue rapide ou l'aggravation brutale des symptômes et signes d'insuffisance cardiaque, résultant d'une incapacité soudaine du cœur à assurer un débit cardiaque suffisant aux besoins métaboliques de l'organisme, ou d'une inadaptation des pressions de remplissage ventriculaire.

Au Maroc, l'ICA représente la 1ère cause d'hospitalisation en urgence cardiologique dans les CHU (Casablanca, Rabat, Marrakech, Fès). Elle est associée à une mortalité intra-hospitalière de 5 à 10 % et une ré-hospitalisation à 30 jours de plus de 25 %.

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
II. PHYSIOPATHOLOGIE COMPLÈTE
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

La décompensation cardiaque aiguë repose sur 3 mécanismes fondamentaux:

➤ 1. AUGMENTATION AIGUË DE LA PRÉCHARGE (Volume):
   • Rétention hydrosodée excessive secondaire à une insuffisance rénale aiguë fonctionnelle.
   • Écart alimentaire avec une prise excessive de sel et d'eau.
   • Arrêt intempestif du traitement diurétique.
   • Transfusion sanguine trop rapide chez un patient à faible réserve cardiaque.

➤ 2. AUGMENTATION AIGUË DE LA POSTCHARGE (Résistances Vasculaires):
   • Urgence hypertensive (PAS > 180 mmHg) causant une élévation des résistances artérielles systémiques.
   • Rétrécissement aortique serré décompensé.
   • Embolie pulmonaire massive (Augmentation de la postcharge du Ventricule Droit).

➤ 3. BAISSE AIGUË DE LA CONTRACTILITÉ (Inotropisme):
   • Nécrose myocardique aiguë étendue (SCA ST+, STEMI avec occlusion coronaire totale).
   • Myocardite aiguë virale ou auto-immune.
   • Troubles du rythme auriculaire rapides (Fibrillation Auriculaire avec réponse ventriculaire rapide > 130 bpm).
   • Bradycardie sévère ou bloc auriculo-ventriculaire complet (BAV III).
   • Toxicité médicamenteuse (Anticalciques, Antiarythmiques de classe I).

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
III. CLASSIFICATION DE STEVENSON (Évaluation au Lit)
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

L'évaluation clinique rapide permet de classer le patient en 4 profils hémodynamiques:

┌─────────────────────┬──────────────────────────┬──────────────────────────────────┐
│  Profil             │  Signes Cliniques          │  Traitement Principal            │
├─────────────────────┼──────────────────────────┼──────────────────────────────────┤
│ A — Sec & Chaud     │ Pas de congestion, bonne   │ Réévaluation, optim. traitement  │
│ (Normal / Stable)   │ perfusion périphérique     │ de fond IC                       │
├─────────────────────┼──────────────────────────┼──────────────────────────────────┤
│ B — Humide & Chaud  │ Congestion (OAP, OMI),     │ Diurétiques IV + Nitrés IV       │
│ (OAP Classique)     │ bonne perfusion centrale   │ (si PAS > 110 mmHg)              │
├─────────────────────┼──────────────────────────┼──────────────────────────────────┤
│ L — Sec & Froid     │ Hypoperfusion, sans         │ Prudence: Remplissage vasculaire │
│ (Hypovolémique)     │ congestion clinique         │ prudent + Dobutamine si IC       │
├─────────────────────┼──────────────────────────┼──────────────────────────────────┤
│ C — Humide & Froid  │ Congestion PLUS signes     │ Dobutamine + Noradrénaline +     │
│ (Choc Cardiogénique)│ d'hypoperfusion (marbrures)│ Assistance circulatoire?         │
└─────────────────────┴──────────────────────────┴──────────────────────────────────┘

Signes d'Hypoperfusion Périphérique (FROID):
  • PAS < 90 mmHg ou chute > 30 mmHg par rapport à la pression habituelle.
  • Marbrures cutanées genoux/extrémités, temps de recoloration capillaire > 3 secondes.
  • Oligurie < 0.5 mL/kg/h (Anurie si sévère).
  • Confusion mentale, somnolence, agitation.
  • Froideur des extrémités distales (mains, pieds).
  • Lactates artériels > 2 mmol/L.

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
IV. SÉMIOLOGIE CLINIQUE DÉTAILLÉE
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

A. Tableau Clinique d'OAP Flash (Profil B — Humide & Chaud):

INTERROGATOIRE:
  • Antécédents de cardiopathie connue (IDM, valvulopathie, cardiopathie dilatée).
  • Facteur déclenchant: Écart alimentaire, arrêt de traitement, infection, fibrillation auriculaire.
  • Dyspnée aiguë paroxystique en décubitus nocturne: Orthopnée imposant la position assise en urgence.

INSPECTION:
  • Patient assis au bord du lit ou au fauteuil, incapable de se recoucher.
  • Polypnée superficielle (> 30 cycles/min), tirage intercostal, tirage sus-claviculaire.
  • Cyanose des lèvres et des extrémités (Insuffisance respiratoire hypoxémique associée).
  • Sueurs profuses froides par hypercapnie et hyperstimulation sympathique.
  • Expectoration mousseuse, rosée ou saumonée, pathognomonique de la transsudation alvéolaire.

AUSCULTATION PULMONAIRE (Signe Clé):
  • Râles crépitants bilatéraux, symétriques, fins, humides, débutant aux bases et montant progressivement vers les apex: Image en "marée montante" (Bruit de la marée qui monte dans les arbres bronchiques).
  • Dans les formes modérées: Râles crépitants limités aux bases.
  • Dans les formes sévères: Envahissement total des deux champs avec distension thoracique et impossibilité d'ausculter les bruits du cœur.

AUSCULTATION CARDIAQUE:
  • Tachycardie sinusale réflexe (FC > 100 bpm), pouls rapide et filant.
  • Bruit de Galop B3 Proto-Diastolique (Cœur de papier froissé): Traduit une FEVG basse, une dysfonction systolique sévère.
  • Bruit de Galop B4 Présystolique: Traduit une altération de la compliance ventriculaire, une dysfonction diastolique.
  • Souffle d'Insuffisance Mitrale Fonctionnelle (Souffle holosystolique apical) par dilatation de l'anneau mitral.

B. Signes d'Insuffisance Cardiaque Droite (IVD) Associée:
  • Turgescence jugulaire spontanée (Angle de 45°) ou induite par le Reflux Hépato-Jugulaire (RHJ) positif.
  • Œdèmes des Membres Inférieurs (OMI) bilatéraux, blancs, mous, indolores, "gardant le godet".
  • Hépatomégalie congestive, douloureuse, lisse, à bord inférieur tranchant (Signe du glaçon).
  • Ascite dans les formes très sévères (Anasarque).

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
V. EXAMENS COMPLÉMENTAIRES D'URGENCE
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

1. ÉLECTROCARDIOGRAMME (ECG 12 Dérivations + V7-V9 + V3R-V4R):
   Priorité absolue — Réalisé et interprété dans les 10 premières minutes.
   • Recherche d'un SCA ST+ sous-jacent (Sus-décalage > 1mm en membres, > 2mm en précordiales).
   • Recherche de Fibrillation Auriculaire (Absence d'onde P, RR irréguliers, ondulations de la ligne isoélectrique).
   • Hypertrophie Ventriculaire Gauche: Critères de Sokolow > 35 mm (S en V1 + R en V5 ou V6).

2. BIOLOGIE D'URGENCE:
   ┌──────────────────────────────┬──────────────────────────────────────────────────┐
   │ Examen                        │ Signification & Valeurs Seuils PFE               │
   ├──────────────────────────────┼──────────────────────────────────────────────────┤
   │ BNP (Brain Natriuretic Peptide) │ > 400 pg/mL: Origine cardiaque confirmée         │
   │ NT-proBNP                       │ > 900 pg/mL: Origine cardiaque confirmée         │
   │ (Valeur Prédictive Négative)    │ BNP < 100 pg/mL: Origine cardiaque quasi exclue  │
   ├──────────────────────────────┼──────────────────────────────────────────────────┤
   │ Troponine I ou T Hs             │ Élévation = Nécrose myocardique aiguë associée   │
   ├──────────────────────────────┼──────────────────────────────────────────────────┤
   │ Ionogramme + Créatinine         │ Kaliémie (risque d'hypokaliémie sous furosémide) │
   │                                 │ Créatinine et urée (Syndrome cardio-rénal)       │
   ├──────────────────────────────┼──────────────────────────────────────────────────┤
   │ NFS (Formule sanguine)          │ Anémie comme facteur déclenchant                 │
   ├──────────────────────────────┼──────────────────────────────────────────────────┤
   │ Gaz du Sang Artériels (GSA)    │ PaO2, PaCO2, pH — Évaluation de l'hypoxémie       │
   └──────────────────────────────┴──────────────────────────────────────────────────┘

3. RADIOGRAPHIE THORACIQUE DE FACE (Au Lit, Urgence):
   • Cardiomégalie: Index Cardio-Thoracique (ICT) = Diamètre transversal cœur / Diamètre thoracique > 0.50.
   • Redistribution vasculaire vers les sommets (Aspect de "cornes de cerf").
   • Opacités alvéolaires floues bilatérales en "ailes de papillon" en cas d'OAP massif.
   • Opacités interstitielles bilatérales avec lignes B de Kerley (Épaississement des septa interlobulaires).
   • Épanchements pleuraux bilatéraux ou prédominants à droite.

4. ÉCHOCARDIOGRAPHIE-DOPPLER TRANSTHORACIQUE (ETT — Examen Clé):
   Réalisée dès que possible après stabilisation initiale.
   • Évalue la Fraction d'Éjection Ventriculaire Gauche (FEVG): Méthode de Simpson biplan.
   • Recherche d'une dysfonction diastolique (E/e' > 13 = élévation des pressions de remplissage VG).
   • Cinétique segmentaire: Hypokinesie, akinesie, diskinesie (SCA sous-jacent).
   • Valvulopathies aiguës (Insuffisance mitrale aiguë par rupture de cordage, EAo).
   • Tamponnade péricardique (Péricardite avec hémopéricarde).
   • Estimation des pressions pulmonaires systoliques (PAPs).

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
VI. PROTOCOLE THÉRAPEUTIQUE D'URGENCE COMPLET
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

ÉTAPE 1 — CONDITIONNEMENT IMMÉDIAT (Dans les 5 premières minutes):
  • Hospitalisation en USIC (Unité de Soins Intensifs Cardiologiques) ou Déchocage.
  • Monitoring continu: ECG scope, SpO2, Pression Artérielle non invasive (toutes les 5 min).
  • Voie Veineuse Périphérique (VVP) de bon calibre (G18).
  • POSITIONNEMENT CRUCIAL: Position assise, jambes pendantes sur le bord du lit ou du fauteuil.
    → Réduit le retour veineux et donc la précharge du VG.
    → Améliore la mécanique respiratoire (libère le diaphragme).
    ⚠ NE JAMAIS allonger un patient en OAP (Aggravation immédiate).

ÉTAPE 2 — OXYGÉNOTHÉRAPIE (Immédiate):
  • Si SpO2 < 90% ou PaO2 < 60 mmHg: Masque à haute concentration 6-10 L/min.
  • Si épuisement respiratoire, hypercapnie (PaCO2 > 50 mmHg), SpO2 < 85% malgré O2 haut débit:
    → VNI (Ventilation Non Invasive): CPAP de Boussignac (Pression 5-10 cmH2O).
  • Si insuffisance respiratoire réfractaire: Intubation Oro-Trachéale (IOT) et Ventilation Mécanique.

ÉTAPE 3 — TRAITEMENT MÉDICAMENTEUX (OAP Profil B — Humide & Chaud):

  ➤ DIURÉTIQUES DE L'ANSE IV (FUROSÉMIDE — LASILIX®):
    • Dose: 40 à 80 mg en bolus IV direct (ou double de la dose orale habituelle si patient déjà traité).
    • Mécanisme: Effet vénodilatatoire immédiat (< 15 min) précédant l'effet diurétique.
    • Effet diurétique: Apparaît en 30 à 60 min, avec diurèse abondante.
    • Si résistance aux diurétiques: Perfusion continue ou association Furosémide + Acide Éthacrinique.
    • Surveillance obligatoire: Kaliémie (Supplémentation KCl si K+ < 3.5 mEq/L), créatinine.

  ➤ DÉRIVÉS NITRÉS IV (ISOSORBIDE DINITRATE — RISORDAN® / TRINITRINE):
    • Indication: PAS ≥ 110 mmHg (Contre-indiqués si PAS < 90 mmHg ou sténose aortique sévère).
    • Dose: Début à 1 mg/h à la PSE, augmentation progressive de 1 mg/h toutes les 15 min.
    • Dose maximale: 3 à 5 mg/h selon la tolérance tensionnelle.
    • Mécanisme: Vasodilatation veineuse prédominante (réduit la précharge), puis artérielle (réduit la postcharge) et coronaire (effet anti-ischémique).
    • Surveillance: PA toutes les 5 min, arrêt si PAS < 90 mmHg.

  ➤ MORPHINE IV (Controversée — Non recommandée en Routine 2023):
    • Anciennement utilisée pour l'anxiolyse et la vasodilatation veineuse.
    • Études récentes montrent une augmentation de la mortalité (Dépression respiratoire, retard de diagnostic).
    • À éviter sauf en cas d'angoisse extrême résistante, sous surveillance rapprochée.

ÉTAPE 4 — CHOC CARDIOGÉNIQUE (Profil C — Humide & Froid, PAS < 90 mmHg):
  • NE PAS donner de Furosémide ni de Nitrés (Risque d'effondrement tensionnel).
  • INOTROPES POSITIFS IV (à la PSE):
    → Dobutamine (Dobutrex®): 2.5 à 20 µg/kg/min (Agoniste β1 inotrope et chronotrope).
    → Si dopaminergique: Dopamine (Dose intermédiaire 5-10 µg/kg/min = Effet β1 inotrope).
  • Si PAM < 65 mmHg malgré inotropes:
    → Noradrénaline (Levophed®): 0.1 à 1 µg/kg/min (Vasoconstricteur α1 pour restaurer la pression de perfusion).
  • Assistance Circulatoire Mécanique si réfractaire: IABP (Ballon de Contre-Pulsion Intra-Aortique), Impella ou ECMO-VA.

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
VII. SURVEILLANCE HOSPITALIÈRE & CRITÈRES DE SORTIE
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

  Critères de Sortie et de Transition en Chambre:
  • Disparition de la dyspnée de repos et à la marche légère.
  • SpO2 ≥ 94% en air ambiant.
  • PA contrôlée, kaliémie normale, créatinine stable.
  • Diurèse quotidienne > 1500 mL, perte de poids de > 1 kg/jour (Premier signe de décongestion).
  • Éducation thérapeutique (Régime sans sel, surveillance poids quotidienne, automédication diurétique).
  `,
    highYieldNotes: `
🔥 INCONTOURNABLES PFE & RÉSIDANAT MAROC:

1. TRAITEMENT D'URGENCE OAP: Position assise + O2 + Furosémide IV 40-80 mg + Nitrés IV (si PAS > 110 mmHg).
2. CONTRE-INDICATIONS ABSOLUES EN DÉCOMPENSATION AIGUË: Bêta-bloquants (inotrope négatif) + Inhibiteurs calciques bradycardisants (Verapamil/Diltiazem).
3. CLASSIFICATION DE STEVENSON: Profil B = Diurétiques + Nitrés. Profil C = Dobutamine + Noradrénaline.
4. BNP < 100 pg/mL ou NT-proBNP < 300 pg/mL: Origine cardiaque de la dyspnée quasi exclue (Valeur Prédictive Négative excellente).
5. SIGNE DE L'OAP: Râles crépitants en MARÉE MONTANTE (montent des bases vers les sommets).
6. CHOC CARDIOGÉNIQUE: PAM < 65 mmHg + Marbrures + Oligurie → Dobutamine IV PSE en URGENCE.
  `,
    diagrams: [CARDIOLOGY_DIAGRAM],
    animatedProcessType: 'CARDIAC_CYCLE',
  },

  // ============================================================
  // CHAPITRE 2 - SYNDROMES CORONARIENS AIGUS
  // ============================================================
  {
    id: 'les-cardio-02',
    title: '2. Syndromes Coronariens Aigus (SCA ST+ et ST-)',
    order: 2,
    summary: '',
    content: `
═══════════════════════════════════════════════════════════════
SYNDROMES CORONARIENS AIGUS (SCA)
SCA ST+ (STEMI) & SCA ST- (NSTEMI/ANGOR INSTABLE)
S5 — Module Cardiologie — Réforme PFE Maroc
═══════════════════════════════════════════════════════════════

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
I. DÉFINITION & PHYSIOPATHOLOGIE CORONARIENNE
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Un Syndrome Coronarien Aigu (SCA) est défini comme une ischémie myocardique aiguë résultant d'une rupture ou d'une érosion d'une plaque d'athérome coronaire avec formation d'un thrombus riche en plaquettes et/ou en fibrine, entraînant une réduction partielle ou totale du flux sanguin coronarien.

Physiopathologie en 5 étapes (Cascade de Fuster):
  1. Formation de la Plaque d'Athérome: Dépôt de cholestérol LDL oxydé dans l'intima artérielle, recrutement de macrophages, formation de cellules spumeuses et de stries lipidiques.
  2. Plaque Vulnérable: Plaque riche en lipides, coiffe fibreuse fine, infiltrée de cellules inflammatoires (macrophages, lymphocytes T).
  3. Rupture ou Érosion de la Plaque: Activation des métalloprotéinases (MMP) par les macrophages → Amincissement et perforation de la coiffe fibreuse.
  4. Activation Plaquettaire: Le sous-endothélium exposé active les plaquettes (via collagène et facteur de von Willebrand) → Thrombus blanc riche en plaquettes (Plug primaire).
  5. Cascade de Coagulation: Génération de thrombine → Transformation du fibrinogène en fibrine → Thrombus rouge riche en fibrine → Occlusion totale ou sub-totale.

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
II. CLASSIFICATION DES SCA
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

  • SCA ST+ (STEMI — Infarctus du Myocarde avec sus-décalage ST):
    → Occlusion coronaire TOTALE et prolongée.
    → Nécrose transmurale (toute l'épaisseur du myocarde).
    → Sus-décalage ST persistant ≥ 1 mm dans ≥ 2 dérivations contiguës des membres ou ≥ 2 mm en précordiales.
    → Urgence absolue: Reperfusion dans les 120 minutes.

  • SCA ST- (NSTEMI — Infarctus sans sus-décalage ST):
    → Occlusion coronaire PARTIELLE ou sub-totale.
    → Nécrose myocardique non transmurale (Sous-endocardique).
    → Troponine élevée SANS sus-décalage ST persistant (Sous-décalage ST ou onde T négative ou ECG normal).

  • Angor Instable (AI):
    → Ischémie sans nécrose: Troponine NORMALE.
    → Angor de repos, angor de novo, angor aggravé.

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
III. DIAGNOSTIC CLINIQUE
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

La Douleur Thoracique Coronarienne Typique (Angor):
  • SIÈGE: Rétrosternale médiane ou basse, diffuse, en barre ou en étau, non latéralisable du bout du doigt.
  • IRRADIATIONS CARACTÉRISTIQUES:
    - Épaule gauche (ou les deux épaules).
    - Face interne du bras gauche jusqu'aux doigts 4 et 5.
    - Mâchoire inférieure et pharynx (Forme trompeuse pseudo-dentaire).
    - Creux épigastrique (Forme trompeuse pseudo-gastrique — Penser à l'IDM inférieur!).
  • CARACTÈRE: Constrictive ("comme un étau"), oppressante, angoissante, "sensation de mort imminente".
  • DURÉE: Prolongée, > 20 minutes, résistant totalement à la Trinitrine sublinguale.
  • FACTEURS DÉCLENCHANTS: Effort physique intense, émotion forte, froid intense, repas copieux.

Formes Trompeuses (Pièges Diagnostiques PFE):
  • IDM INFÉRIEUR: Douleur épigastrique + vomissements → Pseudo-gastrite. Dériver V3R-V4R systématiquement!
  • IDM DU DIABÉTIQUE: Forme indolore (neuropathie autonome) — Dyspnée isolée ou malaise.
  • IDM DU SUJET ÂGÉ: Confusion mentale, malaise général, chute.
  • IDM DE LA FEMME: Dyspnée, fatigue, nausées, sueurs froides sans douleur thoracique typique.

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
IV. ÉLECTROCARDIOGRAMME & TOPOGRAPHIE CORONAIRE
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Délai: ECG 12 dérivations en moins de 10 minutes après le 1er contact médical.

┌────────────────────┬───────────────────────────┬──────────────────────────────────┐
│  Dérivations ECG   │  Territoire Myocardique    │  Artère Coronaire Responsable    │
├────────────────────┼───────────────────────────┼──────────────────────────────────┤
│  V1, V2, V3, V4    │  Antéro-Septal             │  IVA (Interventriculaire Ant.)   │
├────────────────────┼───────────────────────────┼──────────────────────────────────┤
│  V5, V6, D1, VL    │  Latéral Haut et Bas       │  Circonflexe (Cx) ou Diagonale   │
├────────────────────┼───────────────────────────┼──────────────────────────────────┤
│  V1 à V6 + D1 + VL │  Antérieur Étendu          │  IVA Proximale (Tronc Commun?)   │
├────────────────────┼───────────────────────────┼──────────────────────────────────┤
│  D2, D3, VF        │  Inférieur (Diaphragmatique│  Coronaire Droite (CD) dominante │
├────────────────────┼───────────────────────────┼──────────────────────────────────┤
│  V7, V8, V9        │  Basal (Postérieur Pur)    │  Circonflexe ou CD               │
├────────────────────┼───────────────────────────┼──────────────────────────────────┤
│  V3R, V4R          │  Ventricule Droit (VD)     │  CD Proximale                    │
└────────────────────┴───────────────────────────┴──────────────────────────────────┘

Évolution Chronologique des Signes ECG dans un STEMI:
  • Phase 0 (Minutes): Ondes T amples, géantes, pointues ("Ondes T hyperaiguës de De Winter").
  • Phase 1 (Heures): Sus-décalage du segment ST convexe vers le haut (Courant de Lésion), aspect en "Dôme" ou "Monophasique".
  • Phase 2 (Heures à Jours): Apparition de l'onde Q de nécrose (Large > 40 ms, Profonde > 25% de l'onde R), inversion de l'onde T.
  • Phase 3 (Semaines-Mois): Persistance des séquelles: Onde Q résiduelle + Onde T négative = IDM cicatriciel.

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
V. PRISE EN CHARGE PRÉHOSPITALIÈRE (SAMU/SMUR)
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

  • Mise en condition immédiate: Décubitus strict, scope ECG, 2 VVP, SpO2.
  • Aspirin (250-500 mg) per os ou IV + P2Y12 Ticagrelor (180 mg) ou Clopidogrel (600 mg).
  • Anticoagulation: Héparine Non Fractionnée (HNF) IV bolus 60-70 UI/kg (max 5000 UI).
  • Transport médicalisé direct vers Centre d'Angioplastie (CATH LAB) ou Hôpital thrombolyseur.

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
VI. STRATÉGIE DE REPERFUSION CORONAIRE (STEMI)
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

L'objectif absolu = Reperfuser le myocarde le plus rapidement possible ("Time is Muscle").
  → Chaque 30 minutes de retard = 7.5% de mortalité supplémentaire.

A. ANGIOPLASTIE CORONAIRE PRIMAIRE (PCI) — GOLD STANDARD:
  • Indication: Délai ECG → Ballon (Door-to-Balloon) < 120 minutes.
  • Technique: Cathétérisme par voie radiale de préférence (Moins de complications hémorragiques).
  • Franchissement de la lésion par un guide coronaire → Dilatation par ballon → Implantation d'un stent coronaire actif (Drug-Eluting Stent — DES).
  • Résultat immédiat: Reperméabilisation de l'artère coupable, reperfusion du myocarde nécrosé.

B. THROMBOLYSE / FIBRINOLYSE IV (Si PCI impossible dans les délais):
  • Indication: Délai avant PCI > 120 minutes ET absence de contre-indications.
  • Molécule: Ténectéplase (Metalyse®) — Bolus IV unique adapté au poids corporel.
    - ≤ 60 kg: 30 mg | 60-70 kg: 35 mg | 70-80 kg: 40 mg | > 90 kg: 50 mg.
  • Délai impératif: Injection dans les 10 minutes suivant la décision thérapeutique.
  • CONTRE-INDICATIONS ABSOLUES À LA THROMBOLYSE:
    - Antécédent d'AVC hémorragique à tout âge.
    - AVC ischémique dans les 6 derniers mois.
    - Dissection aortique suspectée ou connue.
    - Hémorragie interne active (Digestive, urinaire, cérébrale).
    - Traumatisme crânien ou chirurgie majeure dans les 3 dernières semaines.

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
VII. ORDONNANCE DE SORTIE — BASIC (Incontournable PFE)
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

  • B — BÊTA-BLOQUANTS: Bisoprolol (Cardensiel® 5-10 mg/j) ou Métoprolol.
    → Réduit la FC, la consommation en O2, les récidives ischémiques et la mortalité post-IDM.
  • A — ANTIAGRÉGANTS PLAQUETTAIRES (Bithérapie 12 mois):
    → Aspirine 75 mg/j (à vie) + Ticagrelor 90 mg × 2/j ou Clopidogrel 75 mg/j.
  • S — STATINES À FORTE DOSE: Atorvastatine (Tahor® 80 mg/j).
    → Objectif LDL-Cholestérol < 0.55 g/L (55 mg/dL) en post-SCA.
  • I — INHIBITEURS DE L'ECA (ou ARA2 si intolérants): Périndopril (Coversyl® 5-10 mg/j) ou Ramipril.
    → Réduit le remodelage ventriculaire gauche post-nécrose, prévient l'IC chronique.
  • C — CONTRÔLE DES FACTEURS DE RISQUE CARDIOVASCULAIRES (FDRCV):
    → Arrêt TOTAL et définitif du tabac (Tabagisme = 1er FDRCV modifiable).
    → Contrôle HTA (Cible < 130/80 mmHg).
    → Contrôle diabète (HbA1c < 7%).
    → Activité physique adaptée et régulière.
    → Réhabilitation cardiaque en centre spécialisé.
  `,
    highYieldNotes: `
🔥 PIÈGES ET POINTS CLÉS PFE MAROC:

1. IDM INFÉRIEUR (D2, D3, VF): Dériver TOUJOURS V3R et V4R → IDM du VD associé = Contre-indication absolue aux Nitrés et Diurétiques (Risque d'effondrement tensionnel par réduction de la précharge VD).
2. ORDONNANCE BASIC: Bêta-bloquants + Antiagrégants + Statines + IEC + Contrôle FDRCV. Mémoriser impérativement.
3. TROPONINE: Si positive SANS sus-décalage ST = NSTEMI. Si positive AVEC sus-décalage ST = STEMI.
4. DÉLAI PCI: < 90 min = Optimal | < 120 min = Acceptable | > 120 min = Thrombolyse.
5. CONTRE-INDICATION THROMBOLYSE: AVC hémorragique, dissection aortique, chirurgie récente.
6. SCORE GRACE: Stratification du risque dans les SCA ST- (Prise en charge invasive précoce si score élevé).
  `,
    diagrams: [CARDIOLOGY_DIAGRAM],
    animatedProcessType: 'CORONARY_FLOW',
  },

  // ============================================================
  // CHAPITRE 3 - HYPERTENSION ARTÉRIELLE
  // ============================================================
  {
    id: 'les-cardio-03',
    title: '3. Hypertension Artérielle (HTA) — Définition, Bilan & Traitement',
    order: 3,
    summary: '',
    content: `
═══════════════════════════════════════════════════════════════
HYPERTENSION ARTÉRIELLE (HTA)
Définition, Classifications, Bilan, Urgences Hypertensives & Traitement
S5 — Module Cardiologie — Réforme PFE Maroc
═══════════════════════════════════════════════════════════════

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
I. DÉFINITION & ÉPIDÉMIOLOGIE
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

L'HTA est définie par une élévation chronique de la pression artérielle systolique (PAS) ≥ 140 mmHg et/ou de la pression artérielle diastolique (PAD) ≥ 90 mmHg, mesurée au cabinet médical en position assise, à deux reprises distinctes, lors de deux consultations séparées.

Prévalence au Maroc: Estimée à 29-34% de la population adulte de plus de 18 ans.
Principales complications au Maroc: AVC (1ère cause de mortalité), insuffisance rénale chronique, cardiopathie ischémique, rétinopathie hypertensive.

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
II. CLASSIFICATION DE L'HTA (ESC 2018 / Recommandations Marocaines)
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

┌──────────────────────────┬───────────────────┬───────────────────┐
│  Classification           │  PAS (mmHg)        │  PAD (mmHg)        │
├──────────────────────────┼───────────────────┼───────────────────┤
│  Normale                  │  120 à 129         │  < 80              │
├──────────────────────────┼───────────────────┼───────────────────┤
│  Normale Haute            │  130 à 139         │  85 à 89           │
├──────────────────────────┼───────────────────┼───────────────────┤
│  HTA Grade 1 (Légère)     │  140 à 159         │  90 à 99           │
├──────────────────────────┼───────────────────┼───────────────────┤
│  HTA Grade 2 (Modérée)    │  160 à 179         │  100 à 109         │
├──────────────────────────┼───────────────────┼───────────────────┤
│  HTA Grade 3 (Sévère)     │  ≥ 180             │  ≥ 110             │
├──────────────────────────┼───────────────────┼───────────────────┤
│  HTA Systolique Isolée    │  ≥ 140             │  < 90              │
└──────────────────────────┴───────────────────┴───────────────────┘

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
III. BILAN D'UN HYPERTANDU (Recommandé PFE)
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

A. Bilan Biologique Initial (Systématique):
  • Ionogramme sanguin: Kaliémie (Hypokaliémie → HTA secondaire à Hyperaldostéronisme Primaire de Conn?).
  • Créatinine + Clairance (CKD-EPI): Retentissement rénal.
  • Glycémie à jeun: Diabète associé (Syndrome métabolique).
  • Bilan lipidique complet: Cholestérol total, LDL, HDL, Triglycérides.
  • ECG 12 dérivations: Hypertrophie Ventriculaire Gauche (Sokolow > 35 mm), troubles du rythme.
  • Fond d'œil (FO): Rétinopathie hypertensive (Stades I à IV de Keith-Wagener-Barker).
  • Microalbuminurie / Protéinurie des 24 heures.

B. Bilan d'HTA Secondaire (Si suspicion):
  • HTA Rénovasculaire: Écho-Doppler des artères rénales (Sténose d'artère rénale).
  • Phéochromocytome: Dosage des catécholamines urinaires des 24h ou des métanéphrines plasmatiques.
  • Hyperaldostéronisme Primaire (Conn): Rapport Aldostérone/Rénine plasmatique > 30.
  • Syndrome de Cushing: Cortisol libre urinaire 24h, Test de freinage à la Dexaméthasone.
  • Coarctation de l'Aorte: Différence de PA bras-jambes > 20 mmHg.

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
IV. URGENCES HYPERTENSIVES
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

  • URGENCE HYPERTENSIVE VRAIE (avec souffrance d'organe cible):
    → PAS > 180 mmHg et/ou PAD > 120 mmHg AVEC atteinte viscérale aiguë.
    → Exemples: OAP hypertensif, AVC hypertensif, Encéphalopathie hypertensive, IDM, Dissection aortique aiguë, Pré-éclampsie sévère.
    → Traitement: Baisse progressive de la PA de 20-25% en 1 heure par voie IV (Nicardipine, Labetalol, Nitroprussiate).

  • URGENCE HYPERTENSIVE SIMPLE (sans souffrance d'organe cible):
    → PA très élevée sans atteinte viscérale. Traitement oral, baisse progressive sur 24-48h.

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
V. TRAITEMENT ANTIHYPERTENSEUR (5 Classes Principales)
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

5 Classes de Médicaments Antihypertenseurs (Acronyme: "ABCDI"):
  A → IEC (Inhibiteurs de l'Enzyme de Conversion): Périndopril, Ramipril, Lisinopril.
    Indiqués: Diabète + HTA, IC + HTA, post-IDM.
    Contre-indications: Grossesse, Hyperkaliémie, Sténose bilatérale des artères rénales.
  B → Bêta-Bloquants: Bisoprolol, Nébivolol, Aténolol.
    Indiqués: HTA + coronaropathie, HTA + IC, HTA + Tachyarythmies.
  C → Inhibiteurs Calciques (ICa): Amlodipine, Nifédipine, Vérapamil, Diltiazem.
    Indiqués: HTA + BPCO (Car pas de Bêta-bloquants), HTA + Personnes âgées.
  D → Diurétiques Thiazidiques: Hydrochlorothiazide, Indapamide.
    Indiqués: HTA légère à modérée, HTA + ostéoporose.
  I → ARA2 (Antagonistes des Récepteurs de l'Angiotensine II): Losartan, Valsartan, Irbésartan.
    Indiqués: Même indications que les IEC si intolérance aux IEC (Toux sèche).

Cible Tensionnelle:
  • Adulte < 65 ans: PAS 120-130 mmHg.
  • Adulte > 65 ans: PAS 130-140 mmHg.
  • Diabétique: PAS 130-140 mmHg.
  • Insuffisant Rénal Chronique: < 130/80 mmHg.
  `,
    highYieldNotes: `
🔥 POINTS CLÉS HTA PFE MAROC:

1. DÉFINITION: PAS ≥ 140 ET/OU PAD ≥ 90 mmHg lors de 2 consultations différentes.
2. CAUSES SECONDAIRES: Hyperaldostéronisme Primaire (Conn) = HTA + Hypokaliémie + Rapport Aldo/Rénine > 30.
3. URGENCE HYPERTENSIVE: Ne jamais baisser la PA trop rapidement (Risque d'AVC ischémique par hypoperfusion).
4. RÈGLE DES 20-25%: Baisser la PAM de 20-25% en 1 heure dans l'urgence vraie.
5. ACRONYME "ABCDI": IEC + Bêta-bloquants + ICa + Diurétiques + ARA2.
6. IEC/ARA2 CONTRE-INDIQUÉS: Grossesse ABSOLUE (Foetotoxique au 2e et 3e trimestre).
  `,
    diagrams: [CARDIOLOGY_DIAGRAM],
    animatedProcessType: 'BP_REGULATION',
  },

  // ============================================================
  // CHAPITRE 4 - ANATOMIE DU COEUR (S1)
  // ============================================================
  {
    id: 'les-anat-s1',
    title: '4. Anatomie Descriptive du Cœur & Vascularisation Coronarienne (S1)',
    order: 4,
    summary: '',
    content: `
═══════════════════════════════════════════════════════════════
ANATOMIE DESCRIPTIVE DU CŒUR & VASCULARISATION CORONARIENNE
Semestre 1 — Anatomie Humaine I — Réforme PFE Maroc
═══════════════════════════════════════════════════════════════

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
I. SITUATION & CONFIGURATION EXTERNE
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Le cœur est un organe fibromusculaire creux, en forme de cône aplati, situé dans le médiastin antérieur et inférieur, enveloppé par le péricarde (sac fibro-séreux).

Poids moyen: 280 à 340 g (Adulte). Dimensions: 14 cm de hauteur × 12 cm de largeur × 8 cm d'épaisseur.

Orientation Spatiale:
  • La base (Partie haute): Répond aux gros vaisseaux (Aorte, Artère Pulmonaire, Veines Caves, Veines Pulmonaires).
  • L'apex (Pointe): Dirigé vers le bas, en avant et à gauche, au niveau du 5ème espace intercostal gauche, sur la ligne médioclaviculaire gauche.
    → C'est là qu'on palpe et ausculte le choc de pointe (ou Ictus Cordis).

Rapports Anatomiques Principaux:
  • En avant (Ventral): Le plastron sterno-costal, sternum et cartilages costaux des côtes 3 à 6.
  • En arrière (Dorsal): Médiastin postérieur: Œsophage thoracique (T4-T12) et Aorte descendante thoracique.
  • En bas (Caudal): Le Centre Phrénique (Tendineux) du Diaphragme.
  • Latéralement (Droit et Gauche): Les deux poumons avec leur plèvre pariétale et viscérale.

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
II. PÉRICARDE
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Le péricarde est composé de deux couches:
  • Péricarde Fibreux (Externe): Tissu fibreux solide, inextensible, adhérent aux gros vaisseaux et au diaphragme.
  • Péricarde Séreux (Interne): Composé de deux feuillets (Viscéral = épicarde + Pariétal) délimitant la cavité péricardique.
  → La cavité péricardique contient normalement 15 à 50 mL de liquide péricardique (Lubrifiant).
  → Épanchement péricardique: > 50 mL. Tamponnade: > 200-500 mL avec compression des cavités droites.

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
III. CONFIGURATION INTERNE DES 4 CAVITÉS
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

A. OREILLETTE DROITE (Atrium Dextrum):
  • Reçoit le sang veineux désoxygéné (riche en CO2) des deux veines caves:
    - Veine Cave Supérieure (VCS): Retour veineux de la moitié supérieure du corps (Tête, cou, membres supérieurs).
    - Veine Cave Inférieure (VCI): Retour veineux de la moitié inférieure du corps (Membres inférieurs, abdomen, bassin).
  • Contient le Nœud Sino-Auriculaire (Nœud de Keith & Flack): Situé à la jonction VCS-OD, il est le pacemaker physiologique du cœur (Génère 60-100 impulsions/min).
  • Paroi interne: Surface irrégulière avec des muscles pectinés.

B. VENTRICULE DROIT (Ventriculus Dexter):
  • Éjecte le sang désoxygéné dans la Circulation Pulmonaire via le Tronc de l'Artère Pulmonaire (TAP).
  • Paroi musculaire fine (Épaisseur 4-5 mm): Car résistances pulmonaires faibles.
  • La Valve Tricuspide (3 feuillets) empêche le reflux pendant la systole ventriculaire.

C. OREILLETTE GAUCHE (Atrium Sinistrum):
  • Reçoit le sang artérialisé (riche en O2) des 4 Veines Pulmonaires (2 droites + 2 gauches) revenant des poumons.
  • Paroi lisse interne, fine.
  • Reliée au VG par la Valve Mitrale (Bicuspide, 2 feuillets: Antérieur et Postérieur).

D. VENTRICULE GAUCHE (Ventriculus Sinister):
  • Éjecte le sang artérialisé dans la Circulation Systémique via la Valve Aortique puis l'Aorte.
  • Paroi musculaire épaisse (Épaisseur 8-11 mm en diastole): Car résistances systémiques élevées.
  • Le myocarde VG est organisé en faisceaux musculaires complexes (Muscles Papillaires, Cordages Tendineux).

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
IV. LES VALVES CARDIAQUES (Anatomie Détaillée)
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

┌──────────────────┬────────────────────┬──────────────────────────────────────────┐
│  Valve            │  Position Anatomique│  Rôle & Pathologie                       │
├──────────────────┼────────────────────┼──────────────────────────────────────────┤
│  Tricuspide       │  OD → VD (Droite)  │  Empêche reflux VD→OD en systole.         │
│  (3 feuillets)    │                    │  IT = Insuffisance Tricuspide (RAA, HTAP)  │
├──────────────────┼────────────────────┼──────────────────────────────────────────┤
│  Pulmonaire       │  VD → AP (Droite)  │  Empêche reflux AP→VD en diastole.        │
│  (3 sigmoïdes)   │                    │  Rétrécissement Pulmonaire Congénital      │
├──────────────────┼────────────────────┼──────────────────────────────────────────┤
│  Mitrale          │  OG → VG (Gauche)  │  Empêche reflux VG→OG en systole.         │
│  (2 feuillets)   │                    │  RM = RAA (étiologie Maroc). IM = RAA, CMP │
├──────────────────┼────────────────────┼──────────────────────────────────────────┤
│  Aortique         │  VG → Aorte (Gauche│  Empêche reflux Aorte→VG en diastole.     │
│  (3 sigmoïdes)   │  Proximale)        │  RAo = Dégénérescente (> 65 ans), Bicuspide│
└──────────────────┴────────────────────┴──────────────────────────────────────────┘

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
V. VASCULARISATION CORONARIENNE (Artères Coronaires)
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Les artères coronaires naissent des Sinus de Valsalva Aortiques (Situés juste au-dessus de la Valve Aortique).

A. ARTÈRE CORONAIRE GAUCHE (ACG / Tronc Commun):
  Courte (5-20 mm), se divise en 2 branches principales:
  1. Artère Interventriculaire Antérieure (IVA) — "Widow Maker":
     → Parcourt le sillon interventriculaire antérieur de la base à l'apex.
     → Irrigue: Les 2/3 antérieurs du Septum Interventriculaire, la Paroi Antérieure du VG, l'Apex.
     → Branches: Diagonales (Paroi latérale VG), Septales perforantes (Septum).
  2. Artère Circonflexe (Cx):
     → Parcourt le sillon atrio-ventriculaire gauche.
     → Irrigue: La paroi latérale et postéro-latérale du VG, l'Oreillette Gauche.
     → Branches: Marginales obtuses.

B. ARTÈRE CORONAIRE DROITE (ACD):
  → Parcourt le sillon atrio-ventriculaire droit puis postérieur.
  → Irrigue: Oreillette Droite (Nœud Sinusal 60% des cas), Ventricule Droit, Paroi Inférieure du VG.
  → Branches: Artère du Nœud Sinusal (60%), Artère du Nœud Auriculo-Ventriculaire (80%), Artère Interventriculaire Postérieure (Artère du 1/3 inférieur du SIV).

DOMINANCE CORONAIRE:
  • Dominance Droite (70%): ACD donne l'artère IVP.
  • Dominance Gauche (15%): Circonflexe donne l'artère IVP.
  • Co-dominance (15%): ACD et Cx partagent l'irrigation inférieure.
  `,
    highYieldNotes: `
🔥 PIÈGE ANATOMIE S1 & PFE:

1. L'IVA (Artère Interventriculaire Antérieure) est surnommée "Widow Maker" car son occlusion (SCA antéro-septal) provoque l'infarctus le plus étendu et le plus mortel.
2. Le Nœud Sinusal est irrigué par l'ACD dans 60% des cas → IDM inférieur peut causer une bradycardie sinusale.
3. Le Nœud Auriculo-Ventriculaire (NAV) est irrigué par l'ACD dans 80% des cas → IDM inférieur peut causer un BAV.
4. SUPERFICIE VALVE AORTIQUE NORMALE: 3-4 cm². Rétrécissement Aortique Serré: < 1 cm².
5. FOSSE OVALE: Vestige du Foramen Ovale fœtal dans le septum inter-auriculaire. Sa perméabilité (FOP) favorise les AVC paradoxaux par embolie veineuse.
  `,
    diagrams: [CARDIOLOGY_DIAGRAM],
    animatedProcessType: 'HEART_ANATOMY',
  },
];

export const SAMPLE_LESSON = DETAILED_LESSONS[0];

export const SAMPLE_QUIZ: QCMQuizData = {
  id: 'quiz-cardio-s5',
  title: 'QCM d Évaluation — Cardiologie & Pathologies Vasculaires (Format PFE Maroc)',
  description: 'Série de QCMs conformes aux examens facultaires marocains (FMPR, FMPC, FMPM) avec explications cliniques détaillées.',
  questions: [
    {
      id: 'q1',
      prompt: 'Concernant l Œdème Aigu du Poumon (OAP) cardiogénique, quelle est la proposition EXACTE ?',
      options: [
        { id: 'A', text: 'Le traitement immédiat repose sur l administration de Bêta-bloquants IV à forte dose pour réduire la fréquence cardiaque.' },
        { id: 'B', text: 'L auscultation pulmonaire retrouve typiquement des râles sibilants diffus bilatéraux isolés en faveur d un bronchospasme.' },
        { id: 'C', text: 'Le Furosémide (diurétique de l anse) en injection IV directe est un pilier immédiat de la prise en charge en urgence.' },
        { id: 'D', text: 'La position allongée strictement à plat améliore le retour veineux et est recommandée en première intention.' },
      ],
      correctOption: 'C',
      explanation: 'Le Furosémide IV (40-80 mg) est indiqué en urgence absolue dans l OAP cardiogénique: il exerce un effet vénodilatatoire immédiat (< 15 min) puis diurétique (30-60 min), réduisant la précharge et décongestion nant l arbre vasculaire pulmonaire. Les bêta-bloquants sont formellement contre-indiqués en décompensation aiguë. Le patient doit être ASSIS, jambes pendantes. Les râles crépitants (non sibilants) sont le signe auscultatoire cardinale.',
      difficulty: 'HIGH_YIELD_PFE',
    },
    {
      id: 'q2',
      prompt: 'Devant un ECG montrant un sus-décalage du segment ST de 3 mm dans les dérivations V1, V2, V3, V4, quel est le territoire coronaire et l artère coupable ?',
      options: [
        { id: 'A', text: 'Territoire Inférieur — Artère Coronaire Droite (ACD)' },
        { id: 'B', text: 'Territoire Antéro-Septal — Artère Interventriculaire Antérieure (IVA)' },
        { id: 'C', text: 'Territoire Latéral Haut — Artère Circonflexe (Cx)' },
        { id: 'D', text: 'Territoire du Ventricule Droit — Artère Coronaire Droite Proximale' },
      ],
      correctOption: 'B',
      explanation: 'Les dérivations V1-V4 explorent exclusivement le territoire antéro-septal du VG, irrigué par l Artère Interventriculaire Antérieure (IVA). Le territoire inférieur (D2-D3-VF) est irrigué par l ACD. Le territoire latéral (V5-V6-D1-VL) est irrigué par la Circonflexe. Le territoire du VD est exploré par V3R-V4R.',
      difficulty: 'MEDIUM',
    },
    {
      id: 'q3',
      prompt: 'Concernant la classification de Stevenson dans l insuffisance cardiaque aiguë, quelle est la prise en charge du Profil C ("Humide & Froid") ?',
      options: [
        { id: 'A', text: 'Furosémide IV 80 mg en bolus + Nitrés IV + Position assise.' },
        { id: 'B', text: 'Dobutamine IV à la PSE + Noradrénaline si PAM < 65 mmHg.' },
        { id: 'C', text: 'Hydratation IV rapide par soluté isotonique 0.9% (500 mL en 30 min).' },
        { id: 'D', text: 'Métoprolol IV pour réduire la fréquence cardiaque et la consommation en O2.' },
      ],
      correctOption: 'B',
      explanation: 'Le Profil C ("Humide & Froid" = Congestion + Hypoperfusion) correspond au CHOC CARDIOGÉNIQUE: PAS < 90 mmHg, marbrures, oligurie. Le traitement repose sur des inotropes positifs: Dobutamine (2.5-20 µg/kg/min) pour améliorer la contractilité, associée à la Noradrénaline si la PAM reste < 65 mmHg. Les Furosémide et Nitrés sont CONTRE-INDIQUÉS (risque d effondrement tensionnel). L hydratation est aussi contre-indiquée (Aggrave la congestion).',
      difficulty: 'HIGH_YIELD_PFE',
    },
  ],
};
