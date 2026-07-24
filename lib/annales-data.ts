export type ExamType = 'QCM' | 'CAS_CLINIQUE' | 'QROC' | 'DISSERTATION';
export type FacultyCode = 'FMPR' | 'FMPC' | 'FMPF' | 'FMPM' | 'FMPO' | 'FMPT';

export interface QCMQuestion {
  id: string;
  num: number;
  text: string;
  options: { id: string; text: string }[];
  correctOption: string;
  officialRationale: string;
}

export interface PracticalQuestion {
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

export interface AnnaleExam {
  id: string;
  facultyCode: FacultyCode;
  facultyName: string;
  year: string;
  semester: string;
  moduleTitle: string;
  examType: ExamType;
  sessionType: 'Normale' | 'Rattrapage';
  durationMinutes: number;
  qcmQuestions?: QCMQuestion[];
  practicalQuestions?: PracticalQuestion[];
}

const faculties: Record<FacultyCode, string> = {
  FMPR: 'FMP Rabat — Université Mohammed V',
  FMPC: 'FMP Casablanca — Université Hassan II',
  FMPF: 'FMP Fès — Université Sidi Mohammed Ben Abdellah',
  FMPM: 'FMP Marrakech — Université Cadi Ayyad',
  FMPO: 'FMP Oujda — Université Mohammed Premier',
  FMPT: 'FMP Tanger — Université Abdelmalek Essaâdi'
};

// ─────────────────────────────────────────────────────────────────────────────
// AUTHENTIC MOROCCAN FACULTY EXAM DATABASE
// ─────────────────────────────────────────────────────────────────────────────

export const ANNALES_DATA: AnnaleExam[] = [
  // 1. FMPR - S1 Anatomie 2019-2020 (QCM)
  {
    id: 'fmpr-s1-2019-1',
    facultyCode: 'FMPR',
    facultyName: faculties.FMPR,
    year: '2019-2020',
    semester: 'S1',
    moduleTitle: 'Anatomie Humaine 1',
    examType: 'QCM',
    sessionType: 'Normale',
    durationMinutes: 60,
    qcmQuestions: [
      {
        id: 'fmpr-s1-q1',
        num: 1,
        text: 'Concernant la vascularisation artérielle du cœur, quelle est la proposition exacte ?',
        options: [
          { id: 'A', text: 'L\'artère coronaire gauche provient du sinus de Valsalva postérieur' },
          { id: 'B', text: 'L\'artère interventriculaire antérieure (IVA) est une branche de la coronaire droite' },
          { id: 'C', text: 'L\'artère circonflexe chemine dans le sillon atrio-ventriculaire gauche' },
          { id: 'D', text: 'Le nœud sinusal est toujours vascularisé par la coronaire gauche' },
          { id: 'E', text: 'La grande veine du cœur se jette directement dans l\'oreillette gauche' }
        ],
        correctOption: 'C',
        officialRationale: 'Correction FMPR : L\'artère circonflexe dérive du tronc commun de la coronaire gauche et chemine dans le sillon atrio-ventriculaire gauche (sillon coronaire gauche).'
      },
      {
        id: 'fmpr-s1-q2',
        num: 2,
        text: 'Au niveau du membre supérieur, le nerf radial traverse quelle région anatomique vulnérable aux fractures ?',
        options: [
          { id: 'A', text: 'Le canal carpien au niveau du poignet' },
          { id: 'B', text: 'La gouttière de torsion à la face postérieure de la diaphyse humérale' },
          { id: 'C', text: 'La gouttière épitrochléo-olécrânienne' },
          { id: 'D', text: 'Le creux axillaire sous la veine sous-clavière' },
          { id: 'E', text: 'Le canal de Guyon au bord médial de la main' }
        ],
        correctOption: 'B',
        officialRationale: 'Correction FMPR : Le nerf radial chemine directement contre la face postérieure de l\'humérus dans le sillon du nerf radial (gouttière de torsion). Une fracture diaphysaire humérale risque d\'entraîner une paralysie radiale (main en goutte).'
      },
      {
        id: 'fmpr-s1-q3',
        num: 3,
        text: 'La segmentation hépatique selon la classification anatomique de Couinaud repose sur :',
        options: [
          { id: 'A', text: 'La distribution des artères intercostales' },
          { id: 'B', text: 'La division de la veine porte et des veines sus-hépatiques en 8 segments autonomes' },
          { id: 'C', text: 'Le trajet de la veine cave inférieure uniquement' },
          { id: 'D', text: 'La séparation en deux lobes égaux par le ligament rond' },
          { id: 'E', text: 'La position de la vésicule biliaire au niveau du lobe caudé' }
        ],
        correctOption: 'B',
        officialRationale: 'Correction FMPR : Couinaud a divisé le foie en 8 segments fonctionnels indépendants sur la base de la vascularisation portale et du drainage biliaire et sus-hépatique.'
      },
      {
        id: 'fmpr-s1-q4',
        num: 4,
        text: 'Le paquet vasculo-nerveux intercostal chemine précisément :',
        options: [
          { id: 'A', text: 'Au bord supérieur de la côte sous-jacente' },
          { id: 'B', text: 'Au niveau de la gouttière sous-costale située au bord inférieur de la côte sur-jacente' },
          { id: 'C', text: 'En plein milieu du muscle intercostal externe' },
          { id: 'D', text: 'En arrière du sternum dans le médiastin antérieur' },
          { id: 'E', text: 'À la face externe de la plèvre pariétale sans contact osseux' }
        ],
        correctOption: 'B',
        officialRationale: 'Correction FMPR : Le paquet vasculo-nerveux intercostal (Veine, Artère, Nerf de haut en bas: VAN) chemine dans le sillon sous-costal (bord inférieur de la côte sur-jacente). Toute ponction pleurale doit donc se faire au bord supérieur de la côte inférieure.'
      },
      {
        id: 'fmpr-s1-q5',
        num: 5,
        text: 'Le nerf maxillaire inférieur (V3), branche du nerf trijumeau, émerge du crâne par quel foramen ?',
        options: [
          { id: 'A', text: 'Le foramen rond' },
          { id: 'B', text: 'Le foramen ovale' },
          { id: 'C', text: 'Le foramen épineux' },
          { id: 'D', text: 'La fente sphénoïdale' },
          { id: 'E', text: 'Le trou stilo-mastoïdien' }
        ],
        correctOption: 'B',
        officialRationale: 'Correction FMPR : V1 (ophtalmique) passe par la fissure orbitaire supérieure, V2 (maxillaire) par le foramen rond, et V3 (mandibulaire) par le foramen ovale.'
      }
    ]
  },

  // 2. FMPR - S2 Physiologie 2021-2022 (QCM)
  {
    id: 'fmpr-s2-2021-2',
    facultyCode: 'FMPR',
    facultyName: faculties.FMPR,
    year: '2021-2022',
    semester: 'S2',
    moduleTitle: 'Physiologie Cardiovasculaire & Rénale',
    examType: 'QCM',
    sessionType: 'Normale',
    durationMinutes: 60,
    qcmQuestions: [
      {
        id: 'fmpr-s2-q1',
        num: 1,
        text: 'La phase 0 du potentiel d\'action des cellules ventriculaires cardiaques est caractérisée par :',
        options: [
          { id: 'A', text: 'Une entrée massive et rapide d\'ions Sodium (Na+) via les canaux sodiques voltage-dépendants' },
          { id: 'B', text: 'Une sortie rapide d\'ions Potassium (K+)' },
          { id: 'C', text: 'Une entrée lente et prolongée de Calcium (Ca2+)' },
          { id: 'D', text: 'La fermeture complète des canaux potassiques de rectification' },
          { id: 'E', text: 'L\'activation de la pompe Na+/K+ ATPase uniquement' }
        ],
        correctOption: 'A',
        officialRationale: 'Correction FMPR : La phase 0 (dépolarisation rapide) est due à l\'ouverture brutale des canaux sodiques rapides INa.'
      },
      {
        id: 'fmpr-s2-q2',
        num: 2,
        text: 'La pression efficace de filtration glomérulaire rénale (PEF) augmente lors de :',
        options: [
          { id: 'A', text: 'L\'augmentation de la pression hydrostatique dans la capsule de Bowman' },
          { id: 'B', text: 'La vasoconstriction de l\'artériole afférente' },
          { id: 'C', text: 'La vasoconstriction de l\'artériole efférente sous l\'effet de l\'Angiotensine II' },
          { id: 'D', text: 'La baisse importante de la pression artérielle systémique < 70 mmHg' },
          { id: 'E', text: 'L\'augmentation de la concentration des protéines plasmatiques (pression oncotique)' }
        ],
        correctOption: 'C',
        officialRationale: 'Correction FMPR : La vasoconstriction de l\'artériole efférente augmente la pression hydrostatique glomérulaire (Pcap), élevant ainsi la PEF et le Débit de Filtration Glomérulaire (DFG).'
      },
      {
        id: 'fmpr-s2-q3',
        num: 3,
        text: 'Selon la loi de Fick, le débit de diffusion alvéolo-capillaire d\'un gaz est inversement proportionnel à :',
        options: [
          { id: 'A', text: 'La surface d\'échange alvéolaire' },
          { id: 'B', text: 'Le gradient de pression partielle de ce gaz' },
          { id: 'C', text: 'L\'épaisseur de la membrane alvéolo-capillaire' },
          { id: 'D', text: 'Le coefficient de solubilité du gaz dans l\'eau' },
          { id: 'E', text: 'La perfusion capillaire pulmonaire' }
        ],
        correctOption: 'C',
        officialRationale: 'Correction FMPR : Loi de Fick V = (S × D × ΔP) / E. L\'épaisseur E de la membrane est au dénominateur ; son augmentation (ex: fibrose pulmonaire) réduit la diffusion.'
      },
      {
        id: 'fmpr-s2-q4',
        num: 4,
        text: 'Le liquide céphalo-rachidien (LCR) est principalement produit par :',
        options: [
          { id: 'A', text: 'Les arachnoïdes et la pie-mère' },
          { id: 'B', text: 'Les plexus choroïdes des ventricules cérébraux' },
          { id: 'C', text: 'Les astrocytes de la substance blanche' },
          { id: 'D', text: 'Les cellules microgliales du cortex' },
          { id: 'E', text: 'Les sinus veineux duraux' }
        ],
        correctOption: 'B',
        officialRationale: 'Correction FMPR : Le LCR est sécrété activement par les plexus choroïdes (environ 500 mL/jour) et résorbé par les villosités arachnoïdiennes dans le sinus sagittal supérieur.'
      },
      {
        id: 'fmpr-s2-q5',
        num: 5,
        text: 'Lors de la contraction du muscle squelettique, la fixation du Calcium sur quelle protéine déclenche le déplacement de la tropomyosine ?',
        options: [
          { id: 'A', text: 'La Myosine' },
          { id: 'B', text: 'La Troponine C' },
          { id: 'C', text: 'L\'Actine F' },
          { id: 'D', text: 'La Titine' },
          { id: 'E', text: 'La Calmoduline' }
        ],
        correctOption: 'B',
        officialRationale: 'Correction FMPR : Le Ca2+ se fixe sur la Troponine C, induisant un changement de conformation qui déplace la tropomyosine et démasque les sites de liaison actine-myosine.'
      }
    ]
  },

  // 3. FMPR - S5 Cardiologie 2022-2023 (Cas Clinique)
  {
    id: 'fmpr-s5-2022-3',
    facultyCode: 'FMPR',
    facultyName: faculties.FMPR,
    year: '2022-2023',
    semester: 'S5',
    moduleTitle: 'Pathologie Cardiovasculaire — SCA',
    examType: 'CAS_CLINIQUE',
    sessionType: 'Normale',
    durationMinutes: 90,
    practicalQuestions: [
      {
        id: 'fmpr-s5-p1',
        num: 1,
        questionTitle: 'Cas Clinique : Syndrome Coronarien Aigu en Urgence',
        clinicalContext: `Un homme de 62 ans, tabagique (40 PA) et diabétique de type 2 sous metformine, consulte aux urgences du CHU Ibn Sina de Rabat pour une douleur thoracique rétrosternale constrictive intense évoluant depuis 2 heures, irradiant vers la mâchoire et le membre supérieur gauche, accompagnée de sueurs profuses.\nConstantes : PA = 135/85 mmHg, FC = 88 bpm, SpO2 = 97% en air ambiant.\nECG 12 dérivations réalisé immédiatement : Sus-décalage du segment ST de 3 mm en DII, DIII, aVF avec sous-décalage miroir en DI et aVL.`,
        examDataText: `Biologie initiale (en attente) : Troponine I ultrasensible demandée.\nECG : Onde Q débutante en DIII.`,
        qrocQuestions: [
          {
            questionLabel: '1. Quel est votre diagnostic précis électro-clinique ?',
            expectedAnswerKey: 'SCA ST+ / Infarctus du myocarde inférieur aigu (STEMI inférieur)',
            facultyDetailedCorrection: 'Le diagnostic est un Syndrome Coronarien Aigu avec sus-décalage du segment ST (SCA ST+ / STEMI) du territoire inférieur (dérivations DII, DIII, aVF), vu dans la fenêtre de thrombolyse/angioplastie (< 12 heures).'
          },
          {
            questionLabel: '2. Quelle est l\'artère coronarienne la plus probablement occluse ?',
            expectedAnswerKey: 'Artère coronaire droite (ACD)',
            facultyDetailedCorrection: 'Dans 85 à 90% des cas, la vascularisation du territoire inférieur (diaphragmatique) dépend de l\'artère coronaire droite (réseau droit dominant).'
          },
          {
            questionLabel: '3. Quelle est la stratégie de revascularisation de première intention recommandée au CHU ?',
            expectedAnswerKey: 'Angioplastie coronaire transluminale primaire par voie radiale avec stenting dans les < 120 minutes',
            facultyDetailedCorrection: 'La stratégie de choix est l\'angioplastie primaire (PCI) avec stent si elle peut être réalisée dans les 120 minutes suivant le premier contact médical. Sinon, la fibrinolyse IV est indiquée immédiatement.'
          },
          {
            questionLabel: '4. Quelle complication électrophysiologique aiguë devez-vous surveiller attentivement ?',
            expectedAnswerKey: 'Bloc auriculo-ventriculaire complet (BAV 3) par ischémie du nœud AV',
            facultyDetailedCorrection: 'L\'infarctus inférieur s\'accompagne souvent d\'une ischémie du nœud AV (nourri par la coronaire droite), risquant d\'entraîner un BAV du 3ème degré avec bradycardie extrême et collapsus.'
          },
          {
            questionLabel: '5. Rédigez l\'ordonnance de sortie au long cours (ordonnance type BASIC).',
            expectedAnswerKey: 'Bêtabloquant + Antiagrégants doubles (Aspirine + Ticagrelor/Clopidogrel) + Statine forte dose (Atorvastatine 80mg) + IEC (Ramipril) + Contrôle du diabète',
            facultyDetailedCorrection: 'Ordonnance ordonnée selon la règle BASIC : Bêtabloquant (Bisoprolol), Antiagrégants (Aspirine 100mg + Ticagrelor 90mgx2 pendant 12 mois), Statine (Atorvastatine 80mg), IEC (Ramipril), Contrôle strict du glycémie.'
          }
        ]
      }
    ]
  },

  // 4. FMPR - S5 Pneumologie 2023-2024 (QCM)
  {
    id: 'fmpr-s5-2023-4',
    facultyCode: 'FMPR',
    facultyName: faculties.FMPR,
    year: '2023-2024',
    semester: 'S5',
    moduleTitle: 'Pathologie Respiratoire — Pneumologie',
    examType: 'QCM',
    sessionType: 'Normale',
    durationMinutes: 60,
    qcmQuestions: [
      {
        id: 'fmpr-s5-q1',
        num: 1,
        text: 'Concernant la tuberculose pulmonaire commune à bacille de Koch (BK), quelle proposition est EXACTE ?',
        options: [
          { id: 'A', text: 'La présence d\'une caverne au sommet pulmonaire à la radio est hautement contributive' },
          { id: 'B', text: 'L\'intradermoréaction à la tuberculine négative élimine formellement le diagnostic' },
          { id: 'C', text: 'Le traitement de première intention dure 2 mois au total' },
          { id: 'D', text: 'L\'Isoniazide ne nécessite aucune supplémentation en vitamine B6' },
          { id: 'E', text: 'La rifampicine est excrétée sans colorer les sécrétions biologiques' }
        ],
        correctOption: 'A',
        officialRationale: 'Correction FMPR : Les lésions radiologiques caractéristiques de la TB secondaire sont les infiltrats et cavernes des segments apexo-dorsaux. La Rifampicine colore les urines et larmes en orange/rouge.'
      },
      {
        id: 'fmpr-s5-q2',
        num: 2,
        text: 'Lequel des critères suivants signe la gravité extrême d\'une crise d\'asthme aigu grave (AAG) ?',
        options: [
          { id: 'A', text: 'Une fréquence respiratoire à 22 cycles/minute' },
          { id: 'B', text: 'La présence de râles sibilants diffus aux deux champs pulmonaires' },
          { id: 'C', text: 'Un silence auscultatoire à la stéthoscopie avec épuisement respiratoire' },
          { id: 'D', text: 'Une mesure du DEP (Débit d\'Électro-Pointe) à 75% de la théorique' },
          { id: 'E', text: 'La présence de toux sèche paroxysmique' }
        ],
        correctOption: 'C',
        officialRationale: 'Correction FMPR : Le silence auscultatoire ("poumon muet") témoigne d\'un bronchospasme extrême et du collapsus des débits aériens ; c\'est un signe pré-terminal nécessitant une réanimation immédiate.'
      },
      {
        id: 'fmpr-s5-q3',
        num: 3,
        text: 'Le diagnostic spirographique de la Broncho-Pneumopathie Chronique Obstructive (BPCO) repose sur :',
        options: [
          { id: 'A', text: 'Un rapport VEMS/CVF < 0,70 persistant après administration de bronchodilatateur' },
          { id: 'B', text: 'Une baisse isolée de la Capacité Vitale Forcée (CVF) avec VEMS normal' },
          { id: 'C', text: 'Une réversibilité du VEMS de plus de 12% et 200 mL après Salbutamol' },
          { id: 'D', text: 'Une augmentation de la capacité de diffusion du monoxyde de carbone (DLCO)' },
          { id: 'E', text: 'Une alcalose respiratoire pure à la gazométrie' }
        ],
        correctOption: 'A',
        officialRationale: 'Correction FMPR : La définition GOLD de la BPCO est la présence d\'un trouble ventilatoire obstructif (TVO) non complètement réversible, défini par un rapport VEMS/CVF post-bronchodilatateur < 0.70.'
      },
      {
        id: 'fmpr-s5-q4',
        num: 4,
        text: 'Devant une suspicion d\'Embolie Pulmonaire à risque intermédiaire/élevé chez un patient hémodynamiquement stable, l\'examen de confirmation de première intention est :',
        options: [
          { id: 'A', text: 'La scintigraphie pulmonaire de ventilation/perfusion' },
          { id: 'B', text: 'L\'Angio-scanner thoracique spiralé' },
          { id: 'C', text: 'L\'Angiographie pulmonaire conventionnelle' },
          { id: 'D', text: 'Le dosage isolé des D-Dimères' },
          { id: 'E', text: 'La radiographie du thorax face et profil' }
        ],
        correctOption: 'B',
        officialRationale: 'Correction FMPR : L\'angio-scanner thoracique est l\'examen d\'imagerie de première intention pour confirmer l\'embolie pulmonaire en visualisant directement le thrombus endoluminal.'
      },
      {
        id: 'fmpr-s5-q5',
        num: 5,
        text: 'Selon les critères de Light, un liquide pleural est défini comme un EXSUDAT si :',
        options: [
          { id: 'A', text: 'Le rapport Protéines pleurales / Protéines plasmatiques est > 0,5' },
          { id: 'B', text: 'La concentration des protéines pleurales est strictement < 20 g/L' },
          { id: 'C', text: 'Le taux de LDH pleural est inférieur au 2/3 de la limite supérieure du sérum' },
          { id: 'D', text: 'Le liquide est eau de roche avec moins de 100 éléments/mm3' },
          { id: 'E', text: 'Le rapport LDH pleural / LDH plasmatique est < 0,6' }
        ],
        correctOption: 'A',
        officialRationale: 'Correction FMPR : Les critères de Light définissent un exsudat si au moins un des critères suivants est présent: Prot pleure/prot sang > 0.5, LDH pleur/LDH sang > 0.6, ou LDH pleur > 2/3 de la normale supérieure sérique.'
      }
    ]
  },

  // 5. FMPC - S1 Histologie 2020-2021 (QCM)
  {
    id: 'fmpc-s1-2020-5',
    facultyCode: 'FMPC',
    facultyName: faculties.FMPC,
    year: '2020-2021',
    semester: 'S1',
    moduleTitle: 'Histologie & Embryologie Médicale',
    examType: 'QCM',
    sessionType: 'Normale',
    durationMinutes: 60,
    qcmQuestions: [
      {
        id: 'fmpc-s1-q1',
        num: 1,
        text: 'L\'épithélium respiratoire de la trachée et des grosses bronchioles est classé comme :',
        options: [
          { id: 'A', text: 'Épithélium pavimenteux stratifié kératinisé' },
          { id: 'B', text: 'Épithélium pseudostratifié prismatique cilié avec cellules caliciformes' },
          { id: 'C', text: 'Épithélium cubique simple sans différenciation apicale' },
          { id: 'D', text: 'Épithélium de transition (urothélium)' },
          { id: 'E', text: 'Épithélium bicolomnaire glandulaire endocrine' }
        ],
        correctOption: 'B',
        officialRationale: 'Correction FMPC : L\'épithélium respiratoire classique est pseudostratifié, prismatique (ou cylindrique), cilié et contient des cellules caliciformes sécrétrices de mucus.'
      },
      {
        id: 'fmpc-s1-q2',
        num: 2,
        text: 'Les ostéoclastes responsables de la résorption osseuse dérivent de quelle lignée cellulaire ?',
        options: [
          { id: 'A', text: 'Des ostéoblastes matures' },
          { id: 'B', text: 'Des cellules mésenchymateuses stramidales' },
          { id: 'C', text: 'De la lignée hématopoïétique monocytaire / macrophagique' },
          { id: 'D', text: 'Des chondrocytes de la plaque de croissance' },
          { id: 'E', text: 'Des péricytes vasculaires' }
        ],
        correctOption: 'C',
        officialRationale: 'Correction FMPC : Les ostéoclastes sont de grandes cellules multinucléées issues de la fusion de précurseurs monocytaires hématopoïétiques (lignée macrophage).'
      },
      {
        id: 'fmpc-s1-q3',
        num: 3,
        text: 'Les granulations spécifiques (secondaires) des polynucléaires neutrophiles contiennent principalement :',
        options: [
          { id: 'A', text: 'De l\'histamine et de la sérotonine' },
          { id: 'B', text: 'De la myéloperoxydase uniquement' },
          { id: 'C', text: 'De la lysozyme et de la lactoferrine' },
          { id: 'D', text: 'Des anticorps de type IgE' },
          { id: 'E', text: 'Du facteur Willebrand' }
        ],
        correctOption: 'C',
        officialRationale: 'Correction FMPC : Les granules secondaires neutrophiles renferment des agents antibactériens comme la lactoferrine, la lysozyme et la transcobalamine I.'
      },
      {
        id: 'fmpc-s1-q4',
        num: 4,
        text: 'Dans le muscle squelettique strié, le sarcomère est délimité par :',
        options: [
          { id: 'A', text: 'Deux lignes M successives' },
          { id: 'B', text: 'Deux strie Z (lignes Z) consécutives' },
          { id: 'C', text: 'La bande I centrale' },
          { id: 'D', text: 'Les limites de la membrane plasmique (sarcolemme)' },
          { id: 'E', text: 'La zone H uniquement' }
        ],
        correctOption: 'B',
        officialRationale: 'Correction FMPC : Le sarcomère est l\'unité contractile fondamentale du muscle strié, s\'étendant d\'une strie Z à la strie Z suivante.'
      },
      {
        id: 'fmpc-s1-q5',
        num: 5,
        text: 'Dans le système nerveux périphérique (SNP), la gaine de myéline autour des axones est produite par :',
        options: [
          { id: 'A', text: 'Les oligodendrocytes' },
          { id: 'B', text: 'Les cellules de Schwann' },
          { id: 'C', text: 'Les astrocytes de type I' },
          { id: 'D', text: 'Les cellules épendymaires' },
          { id: 'E', text: 'La microglie' }
        ],
        correctOption: 'B',
        officialRationale: 'Correction FMPC : Les cellules de Schwann assurent la myélinisation dans le SNP (un seul axone par cellule), tandis que les oligodendrocytes myélinisent le SNC.'
      }
    ]
  },

  // 6. FMPC - S3 Pharmacologie 2022-2023 (QCM)
  {
    id: 'fmpc-s3-2022-6',
    facultyCode: 'FMPC',
    facultyName: faculties.FMPC,
    year: '2022-2023',
    semester: 'S3',
    moduleTitle: 'Pharmacologie Générale & Spéciale',
    examType: 'QCM',
    sessionType: 'Normale',
    durationMinutes: 60,
    qcmQuestions: [
      {
        id: 'fmpc-s3-q1',
        num: 1,
        text: 'L\'effet secondaire classique et fréquent des inhibiteurs de l\'enzyme de conversion (IEC) comme le Ramipril est :',
        options: [
          { id: 'A', text: 'Une hypokaliémie sévère' },
          { id: 'B', text: 'Une toux sèche, quinteuse, non productive liée à l\'accumulation de bradykinine' },
          { id: 'C', text: 'Une tachycardie réflexe permanente' },
          { id: 'D', text: 'Une sécheresse buccale avec rétention urinaire' },
          { id: 'E', text: 'Un syndrome parkinsonien iatrogène' }
        ],
        correctOption: 'B',
        officialRationale: 'Correction FMPC : Les IEC bloquent la dégradation de la bradykinine au niveau pulmonaire, entraînant une toux sèche irritative chez 5 à 15% des patients, cédant à l\'arrêt ou au passage sous ARA2.'
      },
      {
        id: 'fmpc-s3-q2',
        num: 2,
        text: 'La toxicité majeure et spécifique à surveiller lors d\'un traitement par aminosides (ex: Gentamicine) associe :',
        options: [
          { id: 'A', text: 'Ototoxicité (cochléaire et vestibulaire) et Néphrotoxicité' },
          { id: 'B', text: 'Hépatotoxicité cytolytique et Agranulocytose' },
          { id: 'C', text: 'Rhabdomyolyse et Pancréatite aiguë' },
          { id: 'D', text: 'Troubles du rythme ventriculaire par allongement du QT' },
          { id: 'E', text: 'Anémie aplasique et névrite optique' }
        ],
        correctOption: 'A',
        officialRationale: 'Correction FMPC : Les aminosides sont des antibiotiques à marge thérapeutique étroite responsables d\'ototoxicité irréversible et de néphrotoxicité tubulaire (réversible).'
      },
      {
        id: 'fmpc-s3-q3',
        num: 3,
        text: 'L\'antidote spécifique administré en urgence lors d\'une intoxication aiguë au Paracétamol est :',
        options: [
          { id: 'A', text: 'La Naloxone' },
          { id: 'B', text: 'Le Flumazénil' },
          { id: 'C', text: 'La N-acétylcystéine (NAC)' },
          { id: 'D', text: 'Le Sulfate de protamine' },
          { id: 'E', text: 'L\'Atropine' }
        ],
        correctOption: 'C',
        officialRationale: 'Correction FMPC : La N-acétylcystéine (NAC) restaure les stocks de glutathion hépatique nécessaires à la détoxification du métabolite toxique du paracétamol (NAPQI).'
      },
      {
        id: 'fmpc-s3-q4',
        num: 4,
        text: 'La surveillance biologique d\'un traitement anticoagulant par Héparine Non Fractionnée (HNF) se fait par :',
        options: [
          { id: 'A', text: 'Le taux d\'INR (International Normalized Ratio)' },
          { id: 'B', text: 'Le Temps de Céphaline Activée (TCA), recherchant un ratio patient/témoin entre 1,5 et 2,5' },
          { id: 'C', text: 'Le temps de saignement isolé' },
          { id: 'D', text: 'Le dosage du fibrinogène circulant' },
          { id: 'E', text: 'Le taux de D-Dimères' }
        ],
        correctOption: 'B',
        officialRationale: 'Correction FMPC : L\'HNF se surveille par le TCA (cible 1.5 à 2.5× le témoin) ou par l\'activité anti-Xa (0.3 à 0.7 UI/mL). L\'INR surveille les AVK.'
      },
      {
        id: 'fmpc-s3-q5',
        num: 5,
        text: 'La biodisponibilité (F) d\'un médicament administré par voie intraveineuse stricte est égale à :',
        options: [
          { id: 'A', text: '0 %' },
          { id: 'B', text: '50 %' },
          { id: 'C', text: '100 % (F = 1)' },
          { id: 'D', text: 'Dépendante du premier passage hépatique' },
          { id: 'E', text: 'Variable selon le pH gastrique' }
        ],
        correctOption: 'C',
        officialRationale: 'Correction FMPC : Par voie intraveineuse, la totalité de la dose atteint directement la circulation systémique sans passer par l\'absorption ni le premier passage hépatique (F = 100%).'
      }
    ]
  },

  // 7. FMPC - S6 Neurologie 2023-2024 (Cas Clinique)
  {
    id: 'fmpc-s6-2023-7',
    facultyCode: 'FMPC',
    facultyName: faculties.FMPC,
    year: '2023-2024',
    semester: 'S6',
    moduleTitle: 'Neurologie & Neurochirurgie — AVC',
    examType: 'CAS_CLINIQUE',
    sessionType: 'Normale',
    durationMinutes: 90,
    practicalQuestions: [
      {
        id: 'fmpc-s6-p1',
        num: 1,
        questionTitle: 'Cas Clinique : Déficit Neurologique Focal Aigu',
        clinicalContext: `Une femme de 68 ans, hypertendue et diabétique, est amenée aux urgences de l'Hôpital Ibn Rochd de Casablanca à 10h00 pour un déficit moteur d'apparition brutale survenu à 8h30 du matin pendant son petit-déjeuner.\nL'examen neurologique note :\n- Une hémiplégie droite prédominant au membre supérieur et à la face (paralysie faciale centrale droite).\n- Une aphasie de Broca (expression très réduite, compréhension conservée).\n- Une déviation conjuguée de la tête et des yeux vers la gauche.\nConstantes : PA = 175/95 mmHg, FC = 84 bpm sinusal, Glycémie = 1,45 g/L.`,
        examDataText: `Score NIHSS calculé à l'admission = 14.\nPas de traumatisme crânien récent ni de chirurgie dans les 3 mois.`,
        qrocQuestions: [
          {
            questionLabel: '1. Quel est votre diagnostic topographique et étiologique très probable ?',
            expectedAnswerKey: 'AVC Ischémique aigu du territoire cérébral moyen gauche (sylvien gauche superficiel et profond)',
            facultyDetailedCorrection: 'Il s\'agit d\'un Accident Vasculaire Cérébral ischémique aigu dans le territoire de l\'artère sylvienne (cérébrale moyenne) gauche, associant hémiplégie droite brachio-faciale, aphasie d\'expression de Broca et déviation de la tête vers la lésion.'
          },
          {
            questionLabel: '2. Quel examen neuro-radiologique devez-vous demander en urgence absolue et que recherchez-vous ?',
            expectedAnswerKey: 'IRM cérébrale (séquences Diffusion, FLAIR, T2*, SWI) ou Scanner cérébral sans injection',
            facultyDetailedCorrection: 'L\'IRM cérébrale en urgence permet de confirmer le hypersignal précoce en diffusion, d\'éliminer une hématome (T2*/EG) et d\'évaluer la pénombre ischémique (mismatch Diffusion/FLAIR). À défaut, un scanner cérébral sans injection élimine une hémorragie.'
          },
          {
            questionLabel: '3. La patiente est-elle éligible à la thrombolyse par voie intraveineuse (rtPA) ? Justifiez.',
            expectedAnswerKey: 'Oui, car le délai depuis le début des symptômes (1h30) est < 4 heures 30 et absence de contre-indication absolue.',
            facultyDetailedCorrection: 'La patiente est dans la fenêtre thérapeutique (< 4h30), la tension est < 185/110 mmHg et il n\'y a pas de CI. La thrombolyse par Alteplase (rtPA) 0.9 mg/kg doit être débutée au plus vite.'
          },
          {
            questionLabel: '4. Si une occlusion d\'un gros tronc artériel (artère sylvienne M1) est visible à l\'angio-IRM, quel geste endovasculaire complémentaire est indiqué ?',
            expectedAnswerKey: 'Thrombectomie mécanique par voie endovasculaire (dans les 6 heures)',
            facultyDetailedCorrection: 'En cas d\'occlusion d\'un gros tronc proximal (M1 ou carotide interne), la thrombectomie mécanique est indiquée en association à la thrombolyse IV dans un délai de 6h.'
          },
          {
            questionLabel: '5. Cite 3 examens indispensables dans le bilan étiologique de cet AVC après la phase aiguë.',
            expectedAnswerKey: 'ECG Holter 24h + Échocardiographie transthoracique/transœsophagienne + Écho-Doppler des vaisseaux du cou',
            facultyDetailedCorrection: 'Le bilan étiologique recherche une cause emboligène : Écho-Doppler des artères carotides et vertébrales, ECG et Holter-ECG à la recherche de Fibrillation Auriculaire paroxystique, et Échocardiographie.'
          }
        ]
      }
    ]
  },

  // 8. FMPC - S6 Psychiatrie 2023-2024 (QROC)
  {
    id: 'fmpc-s6-2023-8',
    facultyCode: 'FMPC',
    facultyName: faculties.FMPC,
    year: '2023-2024',
    semester: 'S6',
    moduleTitle: 'Psychiatrie & Santé Mentale',
    examType: 'QROC',
    sessionType: 'Normale',
    durationMinutes: 60,
    practicalQuestions: [
      {
        id: 'fmpc-s6-qroc-p1',
        num: 1,
        questionTitle: 'Questions à Réponse Ouverte et Courte (QROC)',
        clinicalContext: 'Évaluation des connaissances cliniques en psychiatrie générale et urgences psychiatriques.',
        examDataText: 'Répondez de manière synthétique et précise.',
        qrocQuestions: [
          {
            questionLabel: '1. Énumérez les 5 critères cardinaux d\'un Épisode Dépressif Caractérisé (EDC) selon le DSM-5.',
            expectedAnswerKey: 'Humeur dépressive quasi-permanente, Anédonie (perte d\'intérêt/plaisir), Fatigue/asthénie, Perturbations du sommeil, Idées de dévalorisation ou culpabilité, Pensées suicidaires',
            facultyDetailedCorrection: 'Au moins 5 symptômes pendant au moins 2 semaines, incluant obligatoirement soit l\'humeur dépressive, soit l\'anédonie.'
          },
          {
            questionLabel: '2. Quelle est la différence fondamentale entre le Trouble Bipolaire de Type 1 et de Type 2 ?',
            expectedAnswerKey: 'Type 1 = Au moins un épisode Maniaque caractérisé. Type 2 = Épisodes Dépressifs + au moins un épisode Hypomaniaque (jamais de manie franche).',
            facultyDetailedCorrection: 'Le type 1 comporte des accès maniaques francs (avec ou sans symptômes psychotiques ou hospitalisation). Le type 2 alterne dépression et hypomanie sans manie vraie.'
          },
          {
            questionLabel: '3. Décrivez la prise en charge immédiate d\'une crise d\'angoisse aiguë (attaque de panique) aux urgences.',
            expectedAnswerKey: 'Isolement au calme + Rassurance verbale + Contrôle de l\'hyperventilation (respiration dans un sac ou lente) + Benzodiazépine orale ou sublinguale d\'action rapide (ex: Alprazolam ou Diazépam).',
            facultyDetailedCorrection: 'Rassurer le patient, contrôler l\'hyperventilation alcalosante, et administrer un anxiolytique type benzodiazépine à courte demi-vie si nécessaire.'
          },
          {
            questionLabel: '4. Quels sont les éléments du bilan pré-thérapeutique obligatoire avant d\'instaurer un traitement par Carbonate de Lithium ?',
            expectedAnswerKey: 'Fonction rénale (Urée, Créatininémie, DFG) + Bilan thyroïdien (TSH) + Bilan cardiaque (ECG) + Test de grossesse (b-hCG) + Calcémie.',
            facultyDetailedCorrection: 'Le Lithium est néphrotoxique et thyréotoxique. Le bilan rénal, thyroïdien et cardiaque est obligatoire avant d\'initier la lithémie.'
          }
        ]
      }
    ]
  },

  // 9. FMPF - S2 Biophysique 2021-2022 (QCM)
  {
    id: 'fmpf-s2-2021-9',
    facultyCode: 'FMPF',
    facultyName: faculties.FMPF,
    year: '2021-2022',
    semester: 'S2',
    moduleTitle: 'Biophysique & Imagerie Médicale',
    examType: 'QCM',
    sessionType: 'Normale',
    durationMinutes: 60,
    qcmQuestions: [
      {
        id: 'fmpf-s2-q1',
        num: 1,
        text: 'L\'atténuation d\'un faisceau monoénergétique de rayons X traversant un milieu matériel suit la loi exponentielle de Beer-Lambert I = I0 · e^(-μx). Le coefficient d\'atténuation linéaire μ augmente avec :',
        options: [
          { id: 'A', text: 'L\'augmentation de l\'énergie des photons X' },
          { id: 'B', text: 'L\'augmentation du numéro atomique (Z) et de la masse volumique du milieu traversé' },
          { id: 'C', text: 'La diminution de la densité électronique de la matière' },
          { id: 'D', text: 'L\'augmentation de la longueur d\'onde de l\'onde ultrasonore associée' },
          { id: 'E', text: 'L\'épaisseur seule du filtre en aluminium' }
        ],
        correctOption: 'B',
        officialRationale: 'Correction FMPF : L\'effet photoélectrique prédomine aux faibles énergies et dépend fortement du numéro atomique (Z^3) et de la densité de la matière.'
      },
      {
        id: 'fmpf-s2-q2',
        num: 2,
        text: 'En électrocardiographie, l\'axe électrique moyen du cœur dans le plan frontal correspond à la direction moyenne du vecteur de dépolarisation de :',
        options: [
          { id: 'A', text: 'L\'onde P (dépolarisation auriculaire)' },
          { id: 'B', text: 'L\'ensemble du complexe QRS (dépolarisation ventriculaire)' },
          { id: 'C', text: 'L\'onde T (repolarisation ventriculaire)' },
          { id: 'D', text: 'Le segment PR uniquement' },
          { id: 'E', text: 'L\'onde U pathologique' }
        ],
        correctOption: 'B',
        officialRationale: 'Correction FMPF : L\'axe électrique moyen du cœur correspond au vecteur résultant de la dépolarisation des ventricules (complexe QRS), normalement situé entre 0° et +90°.'
      },
      {
        id: 'fmpf-s2-q3',
        num: 3,
        text: 'Un œil myope présente quelle anomalie optique et se corrige par quel type de verre ?',
        options: [
          { id: 'A', text: 'Œil trop court, image en arrière de la rétine ; corrigé par verre convergent (convexe)' },
          { id: 'B', text: 'Œil trop puissant/long, image en avant de la rétine ; corrigé par verre divergent (concave)' },
          { id: 'C', text: 'Inégalité de courbure de la cornée ; corrigé par verre cylindrique' },
          { id: 'D', text: 'Perte d\'accommodation liée à l\'âge ; corrigé par verre bifocal' },
          { id: 'E', text: 'Opacification du cristallin ; corrigé par implant chirurgical uniquement' }
        ],
        correctOption: 'B',
        officialRationale: 'Correction FMPF : La myopie correspond à un œil trop puissant ou trop long ; les rayons convergent en avant de la rétine. La correction nécessite des verres divergents (puissance dioptrique négative).'
      },
      {
        id: 'fmpf-s2-q4',
        num: 4,
        text: 'La pression osmotique π d\'une solution continent n solutés dissous est donnée par la formule de van \'t Hoff π = i · C · R · T. Que représente le facteur i ?',
        options: [
          { id: 'A', text: 'Le coefficient d\'activité de l\'eau' },
          { id: 'B', text: 'Le nombre d\'ions ou particules dissociées fournies par une molécule de soluté (coefficient de van \'t Hoff)' },
          { id: 'C', text: 'La masse molaire du solvant' },
          { id: 'D', text: 'La température en degrés Celsius' },
          { id: 'E', text: 'Le débit de perfusion veineuse' }
        ],
        correctOption: 'B',
        officialRationale: 'Correction FMPF : Pour NaCl, i = 2 (se dissocie en Na+ et Cl-). Pour le glucose, i = 1 (non dissocié).'
      },
      {
        id: 'fmpf-s2-q5',
        num: 5,
        text: 'En Imagerie par Résonance Magnétique (IRM), le temps de relaxation T1 (longitudinal) correspond à :',
        options: [
          { id: 'A', text: 'La repousse de l\'aimantation longitudinale Mz vers son état d\'équilibre M0' },
          { id: 'B', text: 'La disparition complète de l\'aimantation transversale Mxy' },
          { id: 'C', text: 'Le temps nécessaire pour émettre l\'impulsion de radiofréquence 90°' },
          { id: 'D', text: 'Le temps de vol des protons en mouvement dans les artères' },
          { id: 'E', text: 'La décroissance liée aux hétérogénéités du champ magnétique statique B0' }
        ],
        correctOption: 'A',
        officialRationale: 'Correction FMPF : T1 est le temps de relaxation spin-réseau (longitudinal), correspondant à la repousse de 63% de l\'aimantation longitudinale Mz.'
      }
    ]
  },

  // 10. FMPF - S4 Sémiologie 2022-2023 (QCM)
  {
    id: 'fmpf-s4-2022-10',
    facultyCode: 'FMPF',
    facultyName: faculties.FMPF,
    year: '2022-2023',
    semester: 'S4',
    moduleTitle: 'Sémiologie Médicale & Chirurgicale',
    examType: 'QCM',
    sessionType: 'Normale',
    durationMinutes: 60,
    qcmQuestions: [
      {
        id: 'fmpf-s4-q1',
        num: 1,
        text: 'À l\'auscultation pulmonaire, la présence de râles crépitants inspiratoires de fine tonalité, comparables au bruit de pas dans la neige ou au frottement de cheveux, évoque en premier lieu :',
        options: [
          { id: 'A', text: 'Un encombrement des grosses voies aériennes par du mucus (râles ronflants)' },
          { id: 'B', text: 'Un comblement alvéolaire par du liquide (OAP ou pneumonie aiguë)' },
          { id: 'C', text: 'Un bronchospasme asthmatique aigu (sibilants)' },
          { id: 'D', text: 'Un épanchement pleural liquide abondant (silence auscultatoire)' },
          { id: 'E', text: 'Une brèche pariétale pneumothoracique' }
        ],
        correctOption: 'B',
        officialRationale: 'Correction FMPF : Les râles crépitants sont dus à l\'ouverture brutale des alvéoles comblées de liquide (exsudat dans la pneumonie, transudat dans l\'OAP cardiogénique).'
      },
      {
        id: 'fmpc-s4-q2',
        num: 2,
        text: 'Un souffle holosystolique intense, maximal au foyer mitral, irradiant vers l\'aisselle gauche est caractéristique de :',
        options: [
          { id: 'A', text: 'Un rétrécissement aortique serré' },
          { id: 'B', text: 'Une insuffisance mitrale' },
          { id: 'C', text: 'Une insuffisance aortique décompensée' },
          { id: 'D', text: 'Un rétrécissement mitral pur' },
          { id: 'E', text: 'Une communication inter-auriculaire (CIA)' }
        ],
        correctOption: 'B',
        officialRationale: 'Correction FMPF : L\'insuffisance mitrale donne un souffle holosystolique en jet de vapeur, max au foyer mitral (apex), irradiant vers l\'aisselle.'
      },
      {
        id: 'fmpf-s4-q3',
        num: 3,
        text: 'Le signe de Babinski (réflexe cutané-plantaire en extension du gros orteil) traduit une atteinte de :',
        options: [
          { id: 'A', text: 'La voie cérébelleuse' },
          { id: 'B', text: 'Le faisceau pyramidal (voie corticospinale)' },
          { id: 'C', text: 'Le système extra-pyramidal nigrostrié' },
          { id: 'D', text: 'Le nerf périphérique sciatique poplité externe' },
          { id: 'E', text: 'Les cordons postérieurs de la moelle' }
        ],
        correctOption: 'B',
        officialRationale: 'Correction FMPF : Le signe de Babinski est le signe pathognomique d\'une lésion du faisceau pyramidal (syndrome pyramidal).'
      },
      {
        id: 'fmpf-s4-q4',
        num: 4,
        text: 'Le signe de Murphy clinique positif lors de la palpation abdominale s\'observe dans :',
        options: [
          { id: 'A', text: 'L\'appendicite aiguë de la fosse iliaque droite' },
          { id: 'B', text: 'La cholécystite aiguë lithiasique (inhibition respiratoire à la palpation de l\'hypochondre droit)' },
          { id: 'C', text: 'La pancréatite aiguë nécrosante' },
          { id: 'D', text: 'La péritonite généralisée' },
          { id: 'E', text: 'L\'infarctus mésentérique' }
        ],
        correctOption: 'B',
        officialRationale: 'Correction FMPF : Le signe de Murphy est provoqué par la pression sous-costale droite à l\'inspiration profonde qui bloque la respiration par douleur vésiculaire.'
      },
      {
        id: 'fmpf-s4-q5',
        num: 5,
        text: 'La sciatique L5 pure se caractérise par une trajectoire douloureuse descendant :',
        options: [
          { id: 'A', text: 'À la face postérieure de la cuisse, du mollet et jusqu\'au talon/plante du pied' },
          { id: 'B', text: 'À la face posterolactérale de la cuisse, face externe de la jambe et dos du pied jusqu\'au gros orteil' },
          { id: 'C', text: 'À la face antérieure du genou jusqu\'à la malléole interne' },
          { id: 'D', text: 'Au niveau de la région inguinale pure' },
          { id: 'E', text: 'Au niveau du creux poplité sans dépasser le genou' }
        ],
        correctOption: 'B',
        officialRationale: 'Correction FMPF : La radiculalgie L5 suit la face posterolactérale de la cuisse, externe de la jambe, le dos du pied et le 1er orteil (gros orteil).'
      }
    ]
  },

  // 11. FMPF - S7 Diabétologie 2023-2024 (Cas Clinique)
  {
    id: 'fmpf-s7-2023-11',
    facultyCode: 'FMPF',
    facultyName: faculties.FMPF,
    year: '2023-2024',
    semester: 'S7',
    moduleTitle: 'Diabétologie & Endocrinologie — Acidocétose',
    examType: 'CAS_CLINIQUE',
    sessionType: 'Normale',
    durationMinutes: 90,
    practicalQuestions: [
      {
        id: 'fmpf-s7-p1',
        num: 1,
        questionTitle: 'Cas Clinique : Décompensation Aiguë du Diabète',
        clinicalContext: `Un jeune homme de 22 ans, suivi pour diabète de type 1 depuis 4 ans sous schéma basal-bolus, est amené par sa famille aux urgences du CHU Hassan II de Fès pour troubles de la conscience (somnolence), vomissements répétés et dyspnée majeure d'apparition progressive depuis 24h suite à une angine fébrile non traitée.\nExamen clinique : Obnubilation (GCS 13), polypnée ample et profonde de Kussmaul, odeur de l'haleine acétonique (pomme de reinette), sécheresse buccale intense et plis cutané persistant.\nConstantes : PA = 100/60 mmHg, FC = 115 bpm, T° = 38,2°C.\nGlycémie capillaire : 4.10 g/L. Bandelette urinaire : Glucosurie ++++, Cétonurie ++++.`,
        examDataText: `Gaz du sang artériel : pH = 7.12, HCO3- = 8 mmol/L, PaCO2 = 22 mmHg.\nIonogramme sanguin : Na+ = 132 mmol/L, K+ = 3.1 mmol/L (hypokaliémie initiale).`,
        qrocQuestions: [
          {
            questionLabel: '1. Quel est votre diagnostic précis de décompensation diabétique ?',
            expectedAnswerKey: 'Acidocétose diabétique sévère inaugurale ou secondaire à un sous-dosage d\'insuline/infection',
            facultyDetailedCorrection: 'Diagnostic : Acidocétose diabétique sévère (pH < 7.20, HCO3- < 10, cétonurie massive), déclenchée par un épisode infectieux (angine) avec arrêt probable des injections.'
          },
          {
            questionLabel: '2. Quelle est la règle ABSOLUE concernant la kaliémie avant d\'administrer l\'insulinothérapie IV ?',
            expectedAnswerKey: 'Corriger l\'hypokaliémie (< 3.3 mmol/L) par apport IV de KCl AVANT de démarrer l\'insuline.',
            facultyDetailedCorrection: 'L\'insuline fait pénétrer le potassium dans les cellules. Administrer de l\'insuline sur une kaliémie à 3.1 mmol/L provoquerait une hypokaliémie profonde responsable d\'un arrêt cardiaque par fibrillation ventriculaire.'
          },
          {
            questionLabel: '3. Détaillez les 3 piliers de la prise en charge thérapeutique initiale en réanimation.',
            expectedAnswerKey: '1. Réhydratation saline abondante (NaCl 0.9%) IV. 2. Recharge potassique IV (KCl). 3. Insulinothérapie rapide IV continue à la pousse-seringue (0.1 UI/kg/h).',
            facultyDetailedCorrection: '1. Hydratation IV massive par sérum salé 0.9% (1L la 1ère heure). 2. Apport immédiat de KCl dès la 1ère heure. 3. Insuline humaine rapide IVD puis continue (0.1 UI/kg/h).'
          },
          {
            questionLabel: '4. Quand devez-vous introduire le sérum glucosé 5% dans la perfusion ?',
            expectedAnswerKey: 'Dès que la glycémie descend sous 2.50 g/L (2.0 - 2.5 g/L).',
            facultyDetailedCorrection: 'Lorsque la glycémie atteint 2.5 g/L, il faut ajouter du Glucosé 5% pour poursuivre l\'insulinothérapie nécessaire à l\'extinction de la cétose sans provoquer d\'hypoglycémie.'
          }
        ]
      }
    ]
  },

  // 12. FMPF - S7 Endocrinologie 2023-2024 (QCM)
  {
    id: 'fmpf-s7-2023-12',
    facultyCode: 'FMPF',
    facultyName: faculties.FMPF,
    year: '2023-2024',
    semester: 'S7',
    moduleTitle: 'Endocrinologie & Métabolisme',
    examType: 'QCM',
    sessionType: 'Normale',
    durationMinutes: 60,
    qcmQuestions: [
      {
        id: 'fmpf-s7-q1',
        num: 1,
        text: 'La cause la plus fréquente d\'hypothyroïdie acquise de l\'adulte en zone de normo-carence iodée est :',
        options: [
          { id: 'A', text: 'La thyroïdie de Hashimoto (auto-immune avec anticorps anti-TPO élevés)' },
          { id: 'B', text: 'L\'adénome hypophysaire à TSH' },
          { id: 'C', text: 'La maladie de Basedow au stade initial' },
          { id: 'D', text: 'Le carcinome anaplasique de la thyroïde' },
          { id: 'E', text: 'La surdosage en iode radioactif' }
        ],
        correctOption: 'A',
        officialRationale: 'Correction FMPF : La thyroïdite chronique auto-immune de Hashimoto est la première cause d\'hypothyroïdie primaire chez l\'adulte.'
      },
      {
        id: 'fmpf-s7-q2',
        num: 2,
        text: 'Dans l\'Insuffisance Surrénalienne Aiguë (ISA), l\'anomalie biologique caractéristiques associe :',
        options: [
          { id: 'A', text: 'Hypernatrémie et Hypokaliémie avec alcalose' },
          { id: 'B', text: 'Hyponatrémie, Hyperkaliémie et Hypoglycémie' },
          { id: 'C', text: 'Hypercalcémie sévère isolée' },
          { id: 'D', text: 'Hyperglycémie avec cétose' },
          { id: 'E', text: 'Hypocristallurie avec hyperuricémie' }
        ],
        correctOption: 'B',
        officialRationale: 'Correction FMPF : Le déficit en minéralocorticoïdes (Aldostérone) et glucocorticoïdes entraîne perte de sodium, rétention de potassium (hyponatrémie + hyperkaliémie) et hypoglycémie.'
      },
      {
        id: 'fmpf-s7-q3',
        num: 3,
        text: 'Le traitement de première intention d\'un micro-prolactinome hypophysaire symptomatique est :',
        options: [
          { id: 'A', text: 'La résection chirurgicale par voie trans-sphénoïdale' },
          { id: 'B', text: 'La radiothérapie stéréotaxique' },
          { id: 'C', text: 'Un traitement médical par agoniste dopaminergique (Cabergoline)' },
          { id: 'D', text: 'La thyroïdectomie totale' },
          { id: 'E', text: 'L\'octréotide (analogue de la somatostatine)' }
        ],
        correctOption: 'C',
        officialRationale: 'Correction FMPF : Les prolactinomes (micro ou macro) se traitent en première intention médicalement par agonistes dopaminergiques (Cabergoline), très efficaces sur la taille et la sécrétion.'
      },
      {
        id: 'fmpf-s7-q4',
        num: 4,
        text: 'L\'hyperparathyroïdie primaire se traduit biologiquement par :',
        options: [
          { id: 'A', text: 'Hypercalcémie + Hypophosphatémie + PTH sérique élevée ou inappropriée' },
          { id: 'B', text: 'Hypocalcémie + Hyperphosphatémie + PTH effondrée' },
          { id: 'C', text: 'Calcémie normale + Phosphatémie élevée + Vitamine D effondrée' },
          { id: 'D', text: 'Hypernatrémie + PTH normale' },
          { id: 'E', text: 'Hypocalcémie avec calciurie effondrée' }
        ],
        correctOption: 'A',
        officialRationale: 'Correction FMPF : L\'excès de PTH stimule la résorption osseuse (hypercalcémie) et la phosphaturie rénale (hypophosphatémie).'
      },
      {
        id: 'fmpf-s7-q5',
        num: 5,
        text: 'Le test de freinage fort à la Dexaméthasone (8 mg) permet de faire le diagnostic différentiel de :',
        options: [
          { id: 'A', text: 'Un syndrome de Cushing ACTH-dépendant (Maladie de Cushing hypophysaire vs sécrétion ectopique d\'ACTH)' },
          { id: 'B', text: 'Une insuffisance rénale aiguë' },
          { id: 'C', text: 'Un phéochromocytome surrénalien' },
          { id: 'D', text: 'Un diabète insipide central' },
          { id: 'E', text: 'Une maladie de Biermer' }
        ],
        correctOption: 'A',
        officialRationale: 'Correction FMPF : L\'adénome hypophysaire corticotrope garde une sensibilité partielle au freinage fort par la dexaméthasone (baisse du cortisol > 50%), contrairement à la sécrétion ectopique d\'ACTH.'
      }
    ]
  },

  // 13. FMPM - S1 Biochimie 2020-2021 (QCM)
  {
    id: 'fmpm-s1-2020-13',
    facultyCode: 'FMPM',
    facultyName: faculties.FMPM,
    year: '2020-2021',
    semester: 'S1',
    moduleTitle: 'Biochimie Structurale & Métabolique',
    examType: 'QCM',
    sessionType: 'Normale',
    durationMinutes: 60,
    qcmQuestions: [
      {
        id: 'fmpm-s1-q1',
        num: 1,
        text: 'Les trois réactions irréversibles et régulatrices de la glycolyse cytosolique sont catalysées par :',
        options: [
          { id: 'A', text: 'Hexokinase, Phosphofructokinase-1 (PFK-1), Pyruvate Kinase' },
          { id: 'B', text: 'Aldolase, Triose-phosphate isomérase, Enolase' },
          { id: 'C', text: 'Pyruvate déshydrogénase, Citrate synthétase, Fumarase' },
          { id: 'D', text: 'Glucose-6-phosphatase, Fructose-1,6-bisphosphatase, PEPCK' },
          { id: 'E', text: 'Lactate déshydrogénase et Malate déshydrogénase' }
        ],
        correctOption: 'A',
        officialRationale: 'Correction FMPM : Les étapes 1 (Hexokinase), 3 (PFK-1, étape clé) et 10 (Pyruvate kinase) sont exergoniques et irréversibles.'
      },
      {
        id: 'fmpm-s1-q2',
        num: 2,
        text: 'Un tour complet du cycle de Krebs (cycle de l\'acide citrique) à partir d\'un acétyl-CoA produit exactement :',
        options: [
          { id: 'A', text: '3 NADH, 1 FADH2, 1 GTP (ou ATP) et 2 CO2' },
          { id: 'B', text: '1 NADH, 3 FADH2, 2 ATP' },
          { id: 'C', text: '10 ATP directs sans coenzymes réduits' },
          { id: 'D', text: '2 Pyruvates et 4 NADPH' },
          { id: 'E', text: '6 CO2 et 12 H2O' }
        ],
        correctOption: 'A',
        officialRationale: 'Correction FMPM : Chaque acétyl-CoA oxydé génère 3 NADH,H+, 1 FADH2 et 1 GTP au niveau du substrat.'
      },
      {
        id: 'fmpm-s1-q3',
        num: 3,
        text: 'La liaison peptidique réunissant deux acides aminés consécutifs présente les caractéristiques suivantes SAUF :',
        options: [
          { id: 'A', text: 'C\'est une liaison amide covalente' },
          { id: 'B', text: 'Elle possède un caractère partiel de double liaison (rigide et plane)' },
          { id: 'C', text: 'Elle autorise une libre rotation autour de l\'axe C-N' },
          { id: 'D', text: 'La configuration trans des atomes est nettement favorisée' },
          { id: 'E', text: 'Elle relie le groupe α-carboxyle au groupe α-aminé' }
        ],
        correctOption: 'C',
        officialRationale: 'Correction FMPM : En raison de la résonance, la liaison C-N du peptide n\'a PAS de libre rotation (caractère de double liaison).'
      },
      {
        id: 'fmpm-s1-q4',
        num: 4,
        text: 'La Bêta-oxydation des acides gras (hélice de Lynen) se déroule dans quel compartiment cellulaire ?',
        options: [
          { id: 'A', text: 'Le cytosol' },
          { id: 'B', text: 'La matrice mitochondriale' },
          { id: 'C', text: 'Le réticulum endoplasmique lisse' },
          { id: 'D', text: 'L\'appareil de Golgi' },
          { id: 'E', text: 'Le noyau' }
        ],
        correctOption: 'B',
        officialRationale: 'Correction FMPM : La dégradation des acides gras a lieu dans la matrice mitochondriale après transfert par la navette carnitine.'
      },
      {
        id: 'fmpm-s1-q5',
        num: 5,
        text: 'En cinétique enzymatique Michaelienne, l\'effet d\'un inhibiteur compétitif sur l\'enzyme se traduit par :',
        options: [
          { id: 'A', text: 'Une augmentation du Km (diminution d\'affinité) sans modification de la Vmax' },
          { id: 'B', text: 'Une baisse de la Vmax sans changement du Km' },
          { id: 'C', text: 'Une baisse simultanée du Km et de la Vmax' },
          { id: 'D', text: 'Une hausse de la Vmax et du Km' },
          { id: 'E', text: 'L\'inactivation irréversible du site allostérique' }
        ],
        correctOption: 'A',
        officialRationale: 'Correction FMPM : L\'inhibiteur compétitif se fixe sur le site actif ; son effet est surmontable par excès de substrat (Vmax inchangée, Km apparent augmenté).'
      }
    ]
  },

  // 14. FMPM - S5 Cardiologie 2021-2022 (QCM)
  {
    id: 'fmpm-s5-2021-14',
    facultyCode: 'FMPM',
    facultyName: faculties.FMPM,
    year: '2021-2022',
    semester: 'S5',
    moduleTitle: 'Pathologie Cardiovasculaire — Insuffisance Cardiaque',
    examType: 'QCM',
    sessionType: 'Normale',
    durationMinutes: 60,
    qcmQuestions: [
      {
        id: 'fmpm-s5-q1',
        num: 1,
        text: 'Les 4 piliers thérapeutiques recommandés (ESC 2023) réduisant la mortalité dans l\'Insuffisance Cardiaque à Fraction d\'Éjection Altérée (IC-FEa ≤ 40%) sont :',
        options: [
          { id: 'A', text: 'IEC (ou ARNI) + Bêtabloquant + Antagoniste des récepteurs minéralocorticoïdes (ARM) + inhibiteur SGLT2' },
          { id: 'B', text: 'Diurétique de l\'anse + Digoxine + Nitrés + Aspirine' },
          { id: 'C', text: 'Inhibiteur calcique dihydropyridine + Statine + Amiodarone + Clopidogrel' },
          { id: 'D', text: 'Anti-vitamine K + Fibrates + Anti-arythmique de classe IC + Héparine' },
          { id: 'E', text: 'IEC + Diurétique thiazidique + Vérapamil + dérivés nitrés' }
        ],
        correctOption: 'A',
        officialRationale: 'Correction FMPM : Les 4 piliers fantastiques sont : ARNI (ou IEC), Bêtabloquant (Bisoprolol/Carvedilol), ARM (Spironolactone/Eplerenone) et iSGLT2 (Dapagliflozine/Empagliflozine).'
      },
      {
        id: 'fmpm-s5-q2',
        num: 2,
        text: 'Sur un tracé ECG, le diagnostic de Fibrillation Auriculaire (FA) repose sur :',
        options: [
          { id: 'A', text: 'L\'absence d\'ondes P identifiables, remplacées par une activité auriculaire anarchique (lignes trémulantes f) et des complexes QRS irrationnellement irréguliers' },
          { id: 'B', text: 'La présence d\'ondes de flutter en dents de scie régulières à 300/min' },
          { id: 'C', text: 'Un espace PR allongé de manière constante > 0.22s' },
          { id: 'D', text: 'Des QRS larges avec aspect d\'onde delta' },
          { id: 'E', text: 'Un sus-décalage du segment ST dans toutes les dérivations' }
        ],
        correctOption: 'A',
        officialRationale: 'Correction FMPM : La FA se caractérise par la perte du rythme sinusal (pas d\'onde P) et l\'irrégularité complète des espaces R-R.'
      },
      {
        id: 'fmpm-s5-q3',
        num: 3,
        text: 'Devant un rétrécissement aortique serré symptomatique (surface < 1 cm2), la triade clinique d\'effort classique comporte :',
        options: [
          { id: 'A', text: 'Angor d\'effort, Syncope d\'effort et Dyspnée d\'effort' },
          { id: 'B', text: 'Toux sèche, Hémoptysie et Fièvre' },
          { id: 'C', text: 'Palpitations, Céphalées et Sueurs' },
          { id: 'D', text: 'Claudication intermittente, Œdème des membres et Cyanose' },
          { id: 'E', text: 'Hippocratisme digital, Souffle sous-clavier et Vertiges' }
        ],
        correctOption: 'A',
        officialRationale: 'Correction FMPM : La triade d\'effort du RA serré (Angor, Syncope, Dyspnée) indique une décompensation grave imposant le remplacement valvulaire aortique (TAVI ou chirurgie).'
      },
      {
        id: 'fmpm-s5-q4',
        num: 4,
        text: 'L\'ECG d\'une péricardite aiguë au stade I (stade initial) montre typiquement :',
        options: [
          { id: 'A', text: 'Un sus-décalage du segment ST concave vers le haut, diffus sans miroir, avec sous-décalage du segment PQ' },
          { id: 'B', text: 'Un sus-décalage du segment ST convexe vers le haut avec miroir strict' },
          { id: 'C', text: 'Des ondes T négatives profondes et symétriques en V1-V4' },
          { id: 'D', text: 'Un bloc de branche gauche complet d\'apparition récente' },
          { id: 'E', text: 'Une onde Q de nécrose transmurale' }
        ],
        correctOption: 'A',
        officialRationale: 'Correction FMPM : Le stade I de Holzmann se caractérise par un sus-décalage ST concave vers le haut diffus non coronarien et un sous-décalage du segment PQ.'
      },
      {
        id: 'fmpm-s5-q5',
        num: 5,
        text: 'Le score de CHA2DS2-VASc est utilisé en cardiologie pour :',
        options: [
          { id: 'A', text: 'Évaluer le risque thrombo-embolique dans la Fibrillation Auriculaire et guider l\'indication des anticoagulants' },
          { id: 'B', text: 'Mesurer le risque hémorragique sous héparine' },
          { id: 'C', text: 'Classifier la sévérité de l\'insuffisance rénale' },
          { id: 'D', text: 'Calculer la dose initiale de amiodarone' },
          { id: 'E', text: 'Prédire le succès d\'une cardioversion électrique' }
        ],
        correctOption: 'A',
        officialRationale: 'Correction FMPM : Un score CHA2DS2-VASc ≥ 2 chez l\'homme ou ≥ 3 chez la femme pose l\'indication formelle d\'une anticoagulation au long cours (AOD ou AVK).'
      }
    ]
  },

  // 15. FMPM - S8 Pédiatrie 2023-2024 (Cas Clinique)
  {
    id: 'fmpm-s8-2023-15',
    facultyCode: 'FMPM',
    facultyName: faculties.FMPM,
    year: '2023-2024',
    semester: 'S8',
    moduleTitle: 'Pédiatrie & Neuropédiatrie — Méningite',
    examType: 'CAS_CLINIQUE',
    sessionType: 'Normale',
    durationMinutes: 90,
    practicalQuestions: [
      {
        id: 'fmpm-s8-p1',
        num: 1,
        questionTitle: 'Cas Clinique : Méningite Bactérienne du Nourrisson',
        clinicalContext: `Un nourrisson de 9 mois, mal vacciné, est emmené aux urgences pédiatriques du CHU Mohammed VI de Marrakech pour une fièvre élevée à 39,8°C depuis 12h, des vomissements en jet et une irritabilité extrême avec pleurs inconsolables au moindre toucher.\nExamen pédiatrique : Nourrisson gémissant, raideur de la nuque évidente, hypotonie axiale et bombement net de la fontanelle antérieure en dehors des cris.\nIl n\'y a pas d\'éléments purpuriques sur le corps. PAS de signes de focalisation ni de crise convulsive.`,
        examDataText: `Biologie sanguine : SGB = 21.000 /mm3 à prédominance de PNN (85%), CRP = 140 mg/L.\nFonction rénale et ionogramme normaux.`,
        qrocQuestions: [
          {
            questionLabel: '1. Quel est votre diagnostic le plus probable ?',
            expectedAnswerKey: 'Méningite bactérienne aiguë du nourrisson (suspicion de Pneumocoque ou Méningocoque)',
            facultyDetailedCorrection: 'Diagnostic : Méningite purulente aiguë bactérienne du nourrisson devant le syndrome méningé complet (fontanelle bombante, raideur, irritabilité) et le syndrome infectieux marqué.'
          },
          {
            questionLabel: '2. Quel examen indispensable devez-vous réaliser immédiatement aux urgences ?',
            expectedAnswerKey: 'Ponction lombaire (PL) pour analyse du LCR (cytologie, biochimie, examen direct Gram et culture)',
            facultyDetailedCorrection: 'La ponction lombaire urgente est l\'examen clé. Elle confirme l\'infection (LCR trouble/purulent, hypercytose à PNN, hyperprotéinorachie, hypoglycorachie).'
          },
          {
            questionLabel: '3. Énumérez 3 contre-indications majeures à la ponction lombaire d\'emblée chez l\'enfant.',
            expectedAnswerKey: '1. Instabilité hémodynamique / Choc. 2. Purpura fulminans. 3. Signes d\'engagement cérébral ou de focalisation neurologique. 4. Troubles de l\'hémostase connus.',
            facultyDetailedCorrection: 'En présence d\'un purpura fulminans ou d\'un choc, l\'antibiothérapie IV est injectée immédiatement SANS attendre la PL.'
          },
          {
            questionLabel: '4. Quelle est l\'antibiothérapie probabiliste d\'urgence à instaurer dès les prélèvements ?',
            expectedAnswerKey: 'Céfotaxime IV (200 mg/kg/j) ou Ceftriaxone IV (100 mg/kg/j) + Dexaméthasone IV',
            facultyDetailedCorrection: 'C3G injectable à forte dose (Céfotaxime ou Ceftriaxone) par voie IV, associée à la Dexaméthasone (0.15 mg/kg) injectée avant ou pendant la 1ère dose d\'antibiotique pour prévenir la surdité.'
          }
        ]
      }
    ]
  },

  // 16. FMPM - S8 Gynécologie 2023-2024 (QCM)
  {
    id: 'fmpm-s8-2023-16',
    facultyCode: 'FMPM',
    facultyName: faculties.FMPM,
    year: '2023-2024',
    semester: 'S8',
    moduleTitle: 'Gynécologie — Obstétrique',
    examType: 'QCM',
    sessionType: 'Normale',
    durationMinutes: 60,
    qcmQuestions: [
      {
        id: 'fmpm-s8-q1',
        num: 1,
        text: 'La pré-éclampsie est définie chez une femme enceinte après 20 semaines d\'aménorrhée (SA) par :',
        options: [
          { id: 'A', text: 'Une HTA (PAS ≥ 140 mmHg et/ou PAD ≥ 90 mmHg) associée à une protéinurie significative (≥ 0,3 g/24h)' },
          { id: 'B', text: 'Une protéinurie isolée sans élévation de la pression artérielle' },
          { id: 'C', text: 'Un diabète gestationnel équilibré par le régime' },
          { id: 'D', text: 'Des œdèmes des membres inférieurs isolés sans HTA' },
          { id: 'E', text: 'Une métrorragie du 1er trimestre avec sac gestationnel tonique' }
        ],
        correctOption: 'A',
        officialRationale: 'Correction FMPM : La pré-éclampsie associe obligatoirement une HTA nouvelle apparue après 20 SA et une protéinurie pathologique (≥ 300 mg/24h).'
      },
      {
        id: 'fmpm-s8-q2',
        num: 2,
        text: 'La triade clinique classique évoquant une Grossesse Extra-Utérine (GEU) comporte :',
        options: [
          { id: 'A', text: 'Aménorrhée, Douleurs pelviennes et Métrorragies indolores noirâtres (sépia)' },
          { id: 'B', text: 'Fièvre à 40°C, Leucorrhées nauséabondes et Masse ovarienne' },
          { id: 'C', text: 'Nausées matinales, Prurit vulvaire et Dysurie' },
          { id: 'D', text: 'Contractions utérines régulières, Perte des eaux et métrorragies rouges' },
          { id: 'E', text: 'Aménorrhée, Galactorrhée et Céphalées' }
        ],
        correctOption: 'A',
        officialRationale: 'Correction FMPM : La GEU associe un retard de règles, des douleurs pelviennes unilatérales et de légers saignements sépia/marron foncé.'
      },
      {
        id: 'fmpm-s8-q3',
        num: 3,
        text: 'L\'agent étiologique principal responsable de plus de 95% des cancers du col de l\'utérus est :',
        options: [
          { id: 'A', text: 'Le Virus Papillome Humain (HPV) oncogène, en particulier les génotypes 16 et 18' },
          { id: 'B', text: 'Le virus Herpes Simplex de type 2 (HSV-2)' },
          { id: 'C', text: 'Chlamydia trachomatis' },
          { id: 'D', text: 'Le virus d\'Epstein-Barr (EBV)' },
          { id: 'E', text: 'Candida albicans' }
        ],
        correctOption: 'A',
        officialRationale: 'Correction FMPM : L\'infection persistante par les HPV à haut risque (HPV 16 et 18 en tête) est la cause nécessaire du cancer invasif du col du utérus.'
      },
      {
        id: 'fmpm-s8-q4',
        num: 4,
        text: 'Le traitement médicamenteux de première intention pour prévenir et traiter l\'atonie utérine dans l\'hémorragie de la délivrance est :',
        options: [
          { id: 'A', text: 'L\'Oxytocine (Syntocinon) en perfusion IV ou IV lente' },
          { id: 'B', text: 'L\'Aspirine à forte dose' },
          { id: 'C', text: 'La Progestérone naturelle' },
          { id: 'D', text: 'Le Sulfate de Magnésium' },
          { id: 'E', text: 'L\'Urokinase' }
        ],
        correctOption: 'A',
        officialRationale: 'Correction FMPM : L\'utérotonique de référence immédiat est l\'Oxytocine IV (5 à 10 UI), associée au massage utérin et à la délivrance artificielle si le placenta n\'est pas expulsé.'
      },
      {
        id: 'fmpm-s8-q5',
        num: 5,
        text: 'La complication aiguë la plus redoutable de la pré-éclampsie sévère associant cytolyse hépatique, thrombopénie et hémolyse est :',
        options: [
          { id: 'A', text: 'Le HELLP Syndrome' },
          { id: 'B', text: 'Le syndrome de Turner' },
          { id: 'C', text: 'La môle hydatiforme' },
          { id: 'D', text: 'L\'endométrite du postpartum' },
          { id: 'E', text: 'La mastite carcinomateuse' }
        ],
        correctOption: 'A',
        officialRationale: 'Correction FMPM : Le HELLP syndrome (Hemolysis, Elevated Liver enzymes, Low Platelets) est une urgence vitale materno-fœtale imposant l\'extraction fœtale rapide.'
      }
    ]
  },

  // 17. FMPO - S3 Bactériologie 2022-2023 (QCM)
  {
    id: 'fmpo-s3-2022-17',
    facultyCode: 'FMPO',
    facultyName: faculties.FMPO,
    year: '2022-2023',
    semester: 'S3',
    moduleTitle: 'Microbiologie & Infectiologie — Bactériologie',
    examType: 'QCM',
    sessionType: 'Normale',
    durationMinutes: 60,
    qcmQuestions: [
      {
        id: 'fmpo-s3-q1',
        num: 1,
        text: 'La différence structurale majeure entre la paroi des bactéries Gram-positives et Gram-négatives est :',
        options: [
          { id: 'A', text: 'Les Gram-négatives possèdent une membrane externe riche en Lipopolysaccharide (LPS / Endotoxine)' },
          { id: 'B', text: 'Les Gram-positives ont une couche de peptidoglycane très fine' },
          { id: 'C', text: 'Les Gram-positives ne possèdent pas d\'acides téichoïques' },
          { id: 'D', text: 'Les Gram-négatives fixent le violet de gentiane de manière irréversible' },
          { id: 'E', text: 'Les Gram-négatives sont dépourvues de membrane cytoplasmique' }
        ],
        correctOption: 'A',
        officialRationale: 'Correction FMPO : La paroi des Gram- comprend une fine couche de peptidoglycane entourée d\'une membrane externe contenant le LPS (endotoxine responsable du choc septique).'
      },
      {
        id: 'fmpo-s3-q2',
        num: 2,
        text: 'Staphylococcus aureus se distingue des Staphylocoques à coagulase négative (ex: S. epidermidis) par :',
        options: [
          { id: 'A', text: 'La présence d\'une enzyme Coagulase positive et le caractère pathogène majeur' },
          { id: 'B', text: 'L\'absence totale de catalase' },
          { id: 'C', text: 'Une forme en bacille à la coloration de Gram' },
          { id: 'D', text: 'Une résistance naturelle à la Vancomycine' },
          { id: 'E', text: 'Sa croissance uniquement en milieu anaérobie strict' }
        ],
        correctOption: 'A',
        officialRationale: 'Correction FMPO : Staphylococcus aureus est l\'espèce pathogène humaine majeure caractérisée par la production de coagulase libre et de staphylocoagulase.'
      },
      {
        id: 'fmpo-s3-q3',
        num: 3,
        text: 'La coloration spécifique utilisée au laboratoire pour mettre en évidence les Bacilles Alcoolo-Acido Résistants (BAAR) comme Mycobacterium tuberculosis est :',
        options: [
          { id: 'A', text: 'La coloration de Gram' },
          { id: 'B', text: 'La coloration de Ziehl-Neelsen (ou Auramine en fluorescence)' },
          { id: 'C', text: 'La coloration au bleu de méthylène' },
          { id: 'D', text: 'L\'imprégnation argentique de Fontana-Tribondeau' },
          { id: 'E', text: 'L\'encre de Chine' }
        ],
        correctOption: 'B',
        officialRationale: 'Correction FMPO : En raison de la richesse en acides mycoliques de leur paroi, les mycobactéries résistent à la décoloration par l\'acide et l\'alcool (Ziehl-Neelsen).'
      },
      {
        id: 'fmpo-s3-q4',
        num: 4,
        text: 'La résistance de Staphylococcus aureus à la Méticilline (SARM) repose sur :',
        options: [
          { id: 'A', text: 'La synthèse d\'une nouvelle Protéine de Liaison à la Pénicilline à faible affinité (PLP2a codée par le gène mecA)' },
          { id: 'B', text: 'La sécrétion d\'une pénicillinase plasmidique simple' },
          { id: 'C', text: 'Une mutation du gène de la gyrase (gyrA)' },
          { id: 'D', text: 'L\'imperméabilité par fermeture des porines' },
          { id: 'E', text: 'Une pompe de reflux dépendant de l\'ATP' }
        ],
        correctOption: 'A',
        officialRationale: 'Correction FMPO : La méticillino-résistance des staphylocoques est due à l\'acquisition du gène mecA qui code la PLP2a, conférant une résistance à TOUTES les bêta-lactamines.'
      },
      {
        id: 'fmpo-s3-q5',
        num: 5,
        text: 'Les bactéries appartenant à la famille des Enterobacteriaceae (ex: Escherichia coli) partagent les caractères suivants SAUF :',
        options: [
          { id: 'A', text: 'Bacilles à Gram négatif' },
          { id: 'B', text: 'Oxydase négative' },
          { id: 'C', text: 'Aéro-anaérobies facultatifs fermentant le glucose' },
          { id: 'D', text: 'Réduisent les nitrates en nitrites (Nitrate réductase +)' },
          { id: 'E', text: 'Exigent un milieu enrichi au sang cuit sous CO2 pour pousser' }
        ],
        correctOption: 'E',
        officialRationale: 'Correction FMPO : Les entérobactéries sont des germes non exigeants poussant facilement sur milieux ordinaires (MacConkey, Gelose ordinaire).'
      }
    ]
  },

  // 18. FMPO - S6 Gastro-entérologie 2023-2024 (Cas Clinique)
  {
    id: 'fmpo-s6-2023-18',
    facultyCode: 'FMPO',
    facultyName: faculties.FMPO,
    year: '2023-2024',
    semester: 'S6',
    moduleTitle: 'Hépatologie & Gastro-entérologie — Rupture Varices',
    examType: 'CAS_CLINIQUE',
    sessionType: 'Normale',
    durationMinutes: 90,
    practicalQuestions: [
      {
        id: 'fmpo-s6-p1',
        num: 1,
        questionTitle: 'Cas Clinique : Hémorragie Digestive Haute sur Cirrhose',
        clinicalContext: `Un homme de 54 ans, connu cirrhotique d'origine éthylique (score Child-Pugh B8), est amené en urgence au CHU Mohammed VI d'Oujda suite à un épisode d'hématémèse de sang rouge de grande abondance (environ 800 mL) suivi de méléna.\nExamen à l'admission : Patient anxieux, marbré aux genoux, sueurs froides.\nConstantes : PA = 85/50 mmHg, FC = 122 bpm, SpO2 = 94% en air ambiant.\nAbdomen : Circulation veineuse collatérale abdominale, matité des flancs déclive (ascite).`,
        examDataText: `NFS en urgence : Taux d'hémoglobine = 6,8 g/dL, Plaquettes = 65.000/mm3, TP = 48%, INR = 1.7.`,
        qrocQuestions: [
          {
            questionLabel: '1. Quel est votre diagnostic étiologique le plus probable concernant l\'origine de l\'hématémèse ?',
            expectedAnswerKey: 'Hémorragie digestive haute par rupture de varices œsophagiennes (ou tubérositaires) sur hypertension portale cirrhotique',
            facultyDetailedCorrection: 'Chez un patient cirrhotique connu avec signes d\'HTP, une hématémèse massive est secondaire dans 80% des cas à la rupture de varices œsophagiennes (RVO).'
          },
          {
            questionLabel: '2. Détaillez les gestes de réanimation hémodynamique et le traitement médical vasoactif à débuter immédiatement.',
            expectedAnswerKey: 'Pose 2 voies veineuses périphériques gros calibre + Remplissage par cristalloïdes + Vasoactif IV (Terlipressine ou Somatostatine) + Antibiothérapie de couverture (Cefotaxime ou Norfloxacine) + Transfusion CGR si Hb<7.',
            facultyDetailedCorrection: 'Stabilisation tensionnelle (viser PAS 90-100 mmHg), perfusion précoce de Terlipressine (2mg IVD) ou Somatostatine, antibioprophylaxie IV (Céfotaxime) pour prévenir l\'infection du liquide d\'ascite.'
          },
          {
            questionLabel: '3. Quel examen endoscopique est indiqué après stabilisation et quel est le geste d\'hémostase de choix ?',
            expectedAnswerKey: 'Endoscopie œso-gastro-duodénale (EOGD) en urgence (< 12h) avec Ligature Élastique des Varices Œsophagiennes (LEV).',
            facultyDetailedCorrection: 'L\'EOGD sous contrôle médical permet le diagnostic de certitude et le traitement d\'hémostase d\'emblée par ligature élastique des varices.'
          },
          {
            questionLabel: '4. Quelle est la prévention secondaire à long terme pour éviter la récidive hémorragique ?',
            expectedAnswerKey: 'Association Bêtabloquant non cardiosélectif (Propranolol ou Nadolol) + Séances de ligature élastique jusqu\'à éradication des varices.',
            facultyDetailedCorrection: 'La prévention secondaire associe les bêtabloquants non sélectifs à dose titrée (baisse FC de 25%) et des séances itératives de ligature élastique toutes les 3-4 semaines.'
          }
        ]
      }
    ]
  },

  // 19. FMPO - S6 Hépatologie 2023-2024 (QCM)
  {
    id: 'fmpo-s6-2023-19',
    facultyCode: 'FMPO',
    facultyName: faculties.FMPO,
    year: '2023-2024',
    semester: 'S6',
    moduleTitle: 'Hépatologie — Cirrhose & CHC',
    examType: 'QCM',
    sessionType: 'Normale',
    durationMinutes: 60,
    qcmQuestions: [
      {
        id: 'fmpo-s6-q1',
        num: 1,
        text: 'La définition histologique incontournable de la cirrhose hépatique associe :',
        options: [
          { id: 'A', text: 'Une désorganisation complète de l\'architecture hépatique avec fibrose annulaire mutilante et nodules de régénération' },
          { id: 'B', text: 'Une stéatose macro-vésiculaire isolée sans fibrose' },
          { id: 'C', text: 'Une nécrose centro-lobulaire aiguë reversible' },
          { id: 'D', text: 'Une dilatation des espaces portes par des kystes biliaires' },
          { id: 'E', text: 'Une infiltration lymphocytaire isolée des canaux biliaires' }
        ],
        correctOption: 'A',
        officialRationale: 'Correction FMPO : La cirrhose est définie histologiquement par une fibrose diffuse entravant l\'architecture lobulaire normale et délimitant des nodules de régénération.'
      },
      {
        id: 'fmpo-s6-q2',
        num: 2,
        text: 'Le dépistage du Carcinome Hépatocellulaire (CHC) chez tout patient cirrhotique repose sur :',
        options: [
          { id: 'A', text: 'Une Échographie hépatique semestrielle (tous les 6 mois) associée au dosage de l\'Alfa-fœtoprotéine (AFP)' },
          { id: 'B', text: 'Un scanner abdominal tous les 5 ans' },
          { id: 'C', text: 'Une ponction-biopsie hépatique annuelle' },
          { id: 'D', text: 'Une IRM hépatique tous les 3 mois' },
          { id: 'E', text: 'Le dosage de la bilirubinémie totale uniquement' }
        ],
        correctOption: 'A',
        officialRationale: 'Correction FMPO : La surveillance recommandée du cirrhotique pour dépistage précoce du CHC est une échographie hépatique tous les 6 mois (avec ou sans AFP).'
      },
      {
        id: 'fmpo-s6-q3',
        num: 3,
        text: 'L\'Infection Spontanée du Liquide d\'Ascite (ISLA) chez le cirrhotique est affirmée par la ponction d\'ascite devant :',
        options: [
          { id: 'A', text: 'Un taux de Polynucléaires Neutrophiles (PNN) dans le liquide d\'ascite ≥ 250 / mm3' },
          { id: 'B', text: 'La présence isolée de globules rouges > 10.000 / mm3' },
          { id: 'C', text: 'Un taux de protides pleurales > 40 g/L' },
          { id: 'D', text: 'Une culture négative sur milieu ordinaire' },
          { id: 'E', text: 'Un pH du liquide strictement supérieur à 7,65' }
        ],
        correctOption: 'A',
        officialRationale: 'Correction FMPO : L\'ISLA (ou PNETA) est définie par un chiffre de PNN ≥ 250/mm3 dans le liquide d\'ascite, imposant une antibiothérapie IV immédiate (Céfotaxime).'
      },
      {
        id: 'fmpo-s6-q4',
        num: 4,
        text: 'Lequel des facteurs suivants est le facteur déclenchant le PLUS fréquent de l\'Encéphalopathie Hépatique chez le cirrhotique ?',
        options: [
          { id: 'A', text: 'Une hémorragie digestive haute (digestion du sang apportant une charge azotée/ammoniacale)' },
          { id: 'B', text: 'L\'arrêt d\'un traitement bêtabloquant' },
          { id: 'C', text: 'Un régime hyperglucidique sans protéines' },
          { id: 'D', text: 'L\'activité physique modérée' },
          { id: 'E', text: 'Une supplémentation en vitamine B12' }
        ],
        correctOption: 'A',
        officialRationale: 'Correction FMPO : L\'hémorragie digestive (apport protéique massif dans le tube digestif hydrolysé en ammoniac NH3) et les infections sont les 2 premiers facteurs déclenchants d\'EH.'
      },
      {
        id: 'fmpo-s6-q5',
        num: 5,
        text: 'Une sérologie de l\'hépatite B montrant : Ag HBs positif, Anti-HBC positifs (IgG), Anti-HBs négatifs oriente vers :',
        options: [
          { id: 'A', text: 'Une infection chronique par le VHB (Hépatite B chronique ou portage)' },
          { id: 'B', text: 'Une vaccination réussie contre le VHB' },
          { id: 'C', text: 'Une hépatite B guérie ancienne' },
          { id: 'D', text: 'Une fausse réaction sérologique sans contact VHB' },
          { id: 'E', text: 'Une hépatite A surajoutée' }
        ],
        correctOption: 'A',
        officialRationale: 'Correction FMPO : La persistance de l\'Ag HBs plus de 6 mois définit l\'infection chronique par le VHB. Les AC Anti-HBs ne sont positifs qu\'en cas de guérison ou de vaccination.'
      }
    ]
  },

  // 20. FMPO - S6 Maladies Infectieuses 2023-2024 (QROC)
  {
    id: 'fmpo-s6-2023-20',
    facultyCode: 'FMPO',
    facultyName: faculties.FMPO,
    year: '2023-2024',
    semester: 'S6',
    moduleTitle: 'Maladies Infectieuses — Sepsis & Paludisme',
    examType: 'QROC',
    sessionType: 'Normale',
    durationMinutes: 60,
    practicalQuestions: [
      {
        id: 'fmpo-s6-qroc-p1',
        num: 1,
        questionTitle: 'Questions à Réponse Ouverte et Courte (QROC)',
        clinicalContext: 'Pathologies infectieuses et urgences bactériennes et parasitaires.',
        examDataText: 'Répondez avec précision aux questions posées.',
        qrocQuestions: [
          {
            questionLabel: '1. Donnez la définition exacte du CHOC SEPTIQUE selon les critères Sepsis-3.',
            expectedAnswerKey: 'Sepsis (dysfonction d\'organe ΔSOFA ≥ 2) nécessitant l\'introduction de vasopresseurs (Noradrénaline) pour maintenir une PAM ≥ 65 mmHg ET avec un taux de Lactates sériques > 2 mmol/L malgré une réhydratation adéquate.',
            facultyDetailedCorrection: 'Le choc septique est un sous-groupe de sepsis caractérisé par des anomalies circulatoires et métaboliques profondes entraînant une mortalité élevée.'
          },
          {
            questionLabel: '2. Quel est le traitement de première intention recommandé dans le Paludisme grave à Plasmodium falciparum chez l\'adulte ?',
            expectedAnswerKey: 'Artésunate IV (2,4 mg/kg à H0, H12, H24 puis 1x/j) jusqu\'à relais oral.',
            facultyDetailedCorrection: 'L\'Artésunate par voie IV est supérieur à la Quinine IV en termes de réduction de la mortalité dans l\'accès pernicieux / paludisme grave.'
          },
          {
            questionLabel: '3. Énumérez les 4 étapes de la conduite à tenir d\'urgence après une morsure par un chien suspect de rage au Maroc.',
            expectedAnswerKey: '1. Nettoyage et lavage abondant à l\'eau et au savon (15 min) + désinfection. 2. Vérification/Rappel antitétanique. 3. Vaccination antirabique immédiate (J0, J3, J7, J14, J28). 4. Sérum/Immunoglobulines antirabiques locales et IM si morsure grave.',
            facultyDetailedCorrection: 'Lavage prolongé au savon, vaccination antirabique post-exposition selon le protocole de l\'OMS et sérothérapie si lésion de catégorie III.'
          },
          {
            questionLabel: '4. Quel est l\'antibiotique de première intention recommandé pour le traitement d\'un érysipèle (dermo-hypodermite bactérienne aiguë) non compliqué de la jambe ?',
            expectedAnswerKey: 'Amoxicilline par voie orale (ou IV si forme sévère) à la dose de 3 à 4,5 g/jour pendant 7 jours.',
            facultyDetailedCorrection: 'L\'érysipèle est causé par le Streptocoque bêta-hémolytique du groupe A (S. pyogenes), d\'où l\'efficacité constante de l\'Amoxicilline.'
          }
        ]
      }
    ]
  },

  // 21. FMPT - S4 Sémiologie Chirurgicale 2022-2023 (QCM)
  {
    id: 'fmpt-s4-2022-21',
    facultyCode: 'FMPT',
    facultyName: faculties.FMPT,
    year: '2022-2023',
    semester: 'S4',
    moduleTitle: 'Sémiologie Chirurgicale & Urgences Abdominales',
    examType: 'QCM',
    sessionType: 'Normale',
    durationMinutes: 60,
    qcmQuestions: [
      {
        id: 'fmpt-s4-q1',
        num: 1,
        text: 'Le signe physique majeur de la péritonite aiguë généralisée d\'origine appendiculaire ou ulcéreuse est :',
        options: [
          { id: 'A', text: 'La contracture abdominale ("ventre de bois") : permanente, invoulontaire, douloureuse et invincible' },
          { id: 'B', text: 'Un météorisme abdominal asymétrique tympanique' },
          { id: 'C', text: 'Une masse battante et soufflante épigastrique' },
          { id: 'D', text: 'Un signe de Courvoisier-Terrier positif' },
          { id: 'E', text: 'La présence de bruits hydro-aériques augmentés à l\'auscultation' }
        ],
        correctOption: 'A',
        officialRationale: 'Correction FMPT : La contracture abdominale généralisée ("ventre de bois") est le maître signe pathognomonique de la péritonite aiguë.'
      },
      {
        id: 'fmpt-s4-q2',
        num: 2,
        text: 'La triade clinique classique d\'une occlusion intestinale aiguë comporte :',
        options: [
          { id: 'A', text: 'Douleur abdominale paroxystique + Vomissements + Arrêt des matières et des gaz' },
          { id: 'B', text: 'Fièvre à 40°C + Ictère + Hématémèse' },
          { id: 'C', text: 'Dysurie + Hématurie + Douleur lombaire' },
          { id: 'D', text: 'Diarrhée glairo-sanglante + Ténesme + Faux besoins' },
          { id: 'E', text: 'Céphalées + Photophobie + Vomissements en jet' }
        ],
        correctOption: 'A',
        officialRationale: 'Correction FMPT : La triade fonctionnelle occlusive associe douleur abdominale, vomissements et arrêt des matières et des gaz (le plus spécifique).'
      },
      {
        id: 'fmpt-s4-q3',
        num: 3,
        text: 'Le diagnostic d\'une Hernie Inguinale Étranglée repose cliniquement sur :',
        options: [
          { id: 'A', text: 'Une tuméfaction inguinale douloureuse, tendue, irréductible et non impulsive à la toux' },
          { id: 'B', text: 'Une masse inguinale molle, réductible et indolore' },
          { id: 'C', text: 'Une adénopathie inguinale crottée mobile' },
          { id: 'D', text: 'Un anévrisme de l\'artère fémorale' },
          { id: 'E', text: 'Une varicocèle gauche avec reflux' }
        ],
        correctOption: 'A',
        officialRationale: 'Correction FMPT : L\'étranglement herniaire est une urgence chirurgicale caractérisée par l\'irréductibilité et l\'absence d\'impulsion à la toux d\'une hernie douloureuse.'
      },
      {
        id: 'fmpt-s4-q4',
        num: 4,
        text: 'À l\'examen clinique d\'une appendicite aiguë non compliquée de la fosse iliaque droite, le signe de Blumberg correspond à :',
        options: [
          { id: 'A', text: 'Une douleur vive déclenchée par la décompression brusque de la fosse iliaque droite' },
          { id: 'B', text: 'Une douleur déclenchée par la palpation de la fosse iliaque gauche (Rovsing)' },
          { id: 'C', text: 'Une douleur lors de la flexion contrariée de la cuisse (Psoitis)' },
          { id: 'D', text: 'Une matité à la percussion du flanc droit' },
          { id: 'E', text: 'Un tympanisme péri-ombilical' }
        ],
        correctOption: 'A',
        officialRationale: 'Correction FMPT : Le signe de Blumberg (douleur à la décompression brusque) traduit une irritation péritonéale localisée au niveau du carrefour iléo-cæcal.'
      },
      {
        id: 'fmpt-s4-q5',
        num: 5,
        text: 'Sur une radiographie de l\'abdomen sans préparation (ASP) debout, des Niveaux Hydro-Aériques (NHA) plus larges que hauts situés au centre de l\'abdomen évoquent :',
        options: [
          { id: 'A', text: 'Une occlusion du grêle (mécanique par bride ou volvulus)' },
          { id: 'B', text: 'Une occlusion colique par cancer du sigmoïde' },
          { id: 'C', text: 'Un pneumopéritoine sous-diaphragmatique' },
          { id: 'D', text: 'Une aérobilie' },
          { id: 'E', text: 'Un iléus paralytique réflexe' }
        ],
        correctOption: 'A',
        officialRationale: 'Correction FMPT : Les NHA du grêle sont centraux, plus larges que hauts et nombreux. Les NHA coliques sont périphériques, plus hauts que larges.'
      }
    ]
  },

  // 22. FMPT - S9 Dermatologie 2023-2024 (Cas Clinique)
  {
    id: 'fmpt-s9-2023-22',
    facultyCode: 'FMPT',
    facultyName: faculties.FMPT,
    year: '2023-2024',
    semester: 'S9',
    moduleTitle: 'Dermatologie — Psoriasis',
    examType: 'CAS_CLINIQUE',
    sessionType: 'Normale',
    durationMinutes: 90,
    practicalQuestions: [
      {
        id: 'fmpt-s9-p1',
        num: 1,
        questionTitle: 'Cas Clinique : Dermatose Érythémato-Squameuse Chronique',
        clinicalContext: `Un homme de 38 ans consulte au CHU de Tanger pour des lésions cutanées évoluant depuis 3 ans par poussées, exacerbées par le stress professionnel.\nExamen dermatologique : Plaques érythémato-squameuses bien limitées, arrondies, recouvertes de squames épaisses, sèches et blanchâtres (nacre), siégeant préférentiellement au niveau des faces d'extension des coudes, des genoux, de la région lombo-sacrée et du cuir chevelu.\nLe grattage méthodique de Brocq retrouve le signe de la tache de bougie et le rosée sanglant de Auspitz. Les ongles présentent un piquetage en dé à coudre.`,
        examDataText: `Signe de Koebner positif (apparition de nouvelles plaques sur les cicatrices d'excoriation).\nBilan biologique standard : Syndrome inflammatoire modéré.`,
        qrocQuestions: [
          {
            questionLabel: '1. Quel est votre diagnostic dermatologique de certitude ?',
            expectedAnswerKey: 'Psoriasis vulgaire en plaques (Psoriasis chronique)',
            facultyDetailedCorrection: 'Le diagnostic est un Psoriasis vulgaire en plaques typique devant la topographie des lésions sur les zones de friction (faces d\'extension), le grattage méthodique de Brocq et le piquetage unguéal.'
          },
          {
            questionLabel: '2. Citez les 3 anomalies histologiques cutanées caractéristiques du psoriasis.',
            expectedAnswerKey: '1. Hyperkératose parakératosique (rétention de noyaux dans la couche cornée). 2. Acanthose (épaississement du corps muqueux de Malpighi). 3. Micro-abcès de Munro-Sabouraud (PNN dans la couche cornée).',
            facultyDetailedCorrection: 'L\'histologie montre un renouvellement épidermique accéléré : parakératose, papillomatose, acanthose et infiltrat à polynucléaires neutrophiles (micro-abcès de Munro).'
          },
          {
            questionLabel: '3. Quelle atteinte articulaire extracutanée devez-vous dépister systématiquement chez ce patient ?',
            expectedAnswerKey: 'Rhumatisme psoriasique (atteinte axiale ou périphérique enthésitique/dactylite)',
            facultyDetailedCorrection: 'Le rhumatisme psoriasique survient chez 15 à 20% des patients atteints de psoriasis cutané ; il se manifeste par des dactylites, des enthésopathies ou des polyarthrites séronégatives.'
          },
          {
            questionLabel: '4. Quel est le traitement local de première intention pour des plaques de psoriasis limitées ?',
            expectedAnswerKey: 'Association dermo-corticoïde de classe forte (ex: Clobétasol) + analogue de la vitamine D3 (Calcipotriol).',
            facultyDetailedCorrection: 'L\'association Calcipotriol + Betaméthasone en gel ou pommade 1x/jour pendant 4 semaines constitue le traitement de référence des formes localisées.'
          }
        ]
      }
    ]
  },

  // 23. FMPT - S9 Rhumatologie 2023-2024 (QCM)
  {
    id: 'fmpt-s9-2023-23',
    facultyCode: 'FMPT',
    facultyName: faculties.FMPT,
    year: '2023-2024',
    semester: 'S9',
    moduleTitle: 'Rhumatologie — Polyarthrite Rhumatoïde',
    examType: 'QCM',
    sessionType: 'Normale',
    durationMinutes: 60,
    qcmQuestions: [
      {
        id: 'fmpt-s9-q1',
        num: 1,
        text: 'La Polyarthrite Rhumatoïde (PR) se caractérise sur le plan clinique par :',
        options: [
          { id: 'A', text: 'Une polyarthrite chronique, bilatérale, symétrique et destructrice prédominant aux poignets et métacarpophalangiennes (MCP)' },
          { id: 'B', text: 'Une monoarthrite aiguë du gros orteil' },
          { id: 'C', text: 'Une oligoarthrite asymétrique des membres inférieurs avec dactylite' },
          { id: 'D', text: 'Des rachialgies lombaires d\'horaire mécanique' },
          { id: 'E', text: 'Une atteinte prédominante des interphalangiennes distales (IPD) isolée' }
        ],
        correctOption: 'A',
        officialRationale: 'Correction FMPT : La PR touche préférentiellement les petites articulations des mains (MCP, IPP, poignets) de manière bilatérale et symétrique, en épargnant les IPD.'
      },
      {
        id: 'fmpt-s9-q2',
        num: 2,
        text: 'Les anticorps les plus spécifiques de la Polyarthrite Rhumatoïde, utiles pour le diagnostic précoce, sont :',
        options: [
          { id: 'A', text: 'Les anticorps anti-peptides citrullinés (Anti-CCP / ACPA)' },
          { id: 'B', text: 'Les anticorps anti-ADN natif double brin' },
          { id: 'C', text: 'Les anticorps anti-centromères' },
          { id: 'D', text: 'Les anticorps anti-Scl70' },
          { id: 'E', text: 'Les anticorps anti-cytoplasme des neutrophiles (ANCA)' }
        ],
        correctOption: 'A',
        officialRationale: 'Correction FMPT : Les ACPA (anti-CCP) ont une spécificité > 95% pour la PR et permettent d\'identifier les formes érosives sévères précocement.'
      },
      {
        id: 'fmpt-s9-q3',
        num: 3,
        text: 'L\'accès goutteux aigu de la première métatarso-phalangienne (hallux) est confirmé par l\'analyse du liquide synovial qui montre :',
        options: [
          { id: 'A', text: 'Des microcristaux d\'urate de sodium en aiguilles intracellulaires négativement réfringents' },
          { id: 'B', text: 'Des cristaux de pyrophosphate de calcium rectangulaires faiblement positifs' },
          { id: 'C', text: 'Un liquide pauvre en cellules (< 200 éléments/mm3)' },
          { id: 'D', text: 'La présence exclusive de bacilles de Koch' },
          { id: 'E', text: 'Un liquide hémorragique incoagulable' }
        ],
        correctOption: 'A',
        officialRationale: 'Correction FMPT : Les cristaux d\'urate de sodium sont fins, en forme d\'aiguilles et fortement réfringents à lumière polarisée avec biréfringence négative.'
      },
      {
        id: 'fmpt-s9-q4',
        num: 4,
        text: 'Sur le plan radiographique, les 4 signes cardinaux de l\'arthrose périphérique comportent :',
        options: [
          { id: 'A', text: 'Pincement articulaire localisé + Ostéosclérose sous-chondrale + Ostéophytes + Géodes sous-chondrales' },
          { id: 'B', text: 'Déminéralisation osseuse en bande + Érosions marginales + Ankylose osseuse complète' },
          { id: 'C', text: 'Osteolyse vertébrale + Tassement cunéiforme' },
          { id: 'D', text: 'Épaississement périosté en écaille + Réaction périostée spiculée' },
          { id: 'E', text: 'Calcification des ligaments interépineux (aspect en tige de bambou)' }
        ],
        correctOption: 'A',
        officialRationale: 'Correction FMPT : Les 4 signes radiologiques de l\'arthrose sont : Pincement localisé de l\'interligne, ostéosclérose sous-chondrale, ostéophytose marginale et géodes de hyperpression.'
      },
      {
        id: 'fmpt-s9-q5',
        num: 5,
        text: 'Le traitement de fond biologique ciblé d\'action anti-TNF alpha utilisé dans la spondylarthrite ankylosante sévère nécessite au préalable :',
        options: [
          { id: 'A', text: 'Le dépistage et le traitement d\'une tuberculose latente (IDR/Quantiferon + Radio thorax)' },
          { id: 'B', text: 'Une biopsie rénale systématique' },
          { id: 'C', text: 'Une coloscopie totale avec biopsies' },
          { id: 'D', text: 'Un scanner cérébral avec injection' },
          { id: 'E', text: 'Une scintigraphie osseuse globale' }
        ],
        correctOption: 'A',
        officialRationale: 'Correction FMPT : Les anti-TNF alpha risquent de réactiver une tuberculose latente. Un dépistage systématique (Quantiferon/IDR + Téléthorax) est obligatoire avant l\'instauration.'
      }
    ]
  },

  // 24. FMPT - S9 Orthopédie 2023-2024 (QROC)
  {
    id: 'fmpt-s9-2023-24',
    facultyCode: 'FMPT',
    facultyName: faculties.FMPT,
    year: '2023-2024',
    semester: 'S9',
    moduleTitle: 'Traumatologie & Orthopédie — Urgences',
    examType: 'QROC',
    sessionType: 'Normale',
    durationMinutes: 60,
    practicalQuestions: [
      {
        id: 'fmpt-s9-qroc-p1',
        num: 1,
        questionTitle: 'Questions à Réponse Ouverte et Courte (QROC)',
        clinicalContext: 'Urgences traumatologiques du membre supérieur et inférieur.',
        examDataText: 'Répondez brièvement avec les termes médicaux et chirurgicaux précis.',
        qrocQuestions: [
          {
            questionLabel: '1. Décrivez les déformations caractéristiques de face et de profil de la fracture de Pouteau-Colles à l\'examen clinique du poignet.',
            expectedAnswerKey: 'De face : Déformation en baïonnette (main translatée en dehors). De profil : Déformation en dos de cuillère (bascule postérieure du fragment distal).',
            facultyDetailedCorrection: 'La fracture de Pouteau-Colles est une fracture de l\'extrémité inférieure du radius à déplacement postérieur et externe, donnant l\'aspect en dos de cuillère de profil et en baïonnette de face.'
          },
          {
            questionLabel: '2. Quelle est la définition et la conduite à tenir chirurgicale d\'urgence devant un SYNDROME DE LOGES AIGU du mollet ?',
            expectedAnswerKey: 'Définition : Augmentation de la pression tissulaire dans une loge ostéo-aponévrotique fermée entraînant une ischémie. Traitement : APONÉVROTOMIE de décharge en urgence absolue.',
            facultyDetailedCorrection: 'Le syndrome de loges est une urgence chirurgicale absolue (< 6h). Le traitement repose sur l\'aponévrotomie large de décharge des 4 loges de la jambe pour éviter la nécrose musculaire irréversible (syndrome de Volkmann).'
          },
          {
            questionLabel: '3. Quels sont les 3 signes cliniques cardinaux à l\'inspection lors de la présentation d\'une FRACTURE DU COL DU FÉMUR déplacée chez la personne âgée ?',
            expectedAnswerKey: '1. Raccourcissement du membre inférieur affecté. 2. Rotation externe du pied. 3. Adduction du membre.',
            facultyDetailedCorrection: 'L\'inspection d\'une fracture de l\'extrémité supérieure du fémur déplacée montre le membre inférieur raccourci, en rotation externe marquée (bord externe du pied reposant sur le lit) et en adduction.'
          },
          {
            questionLabel: '4. Quel est le test clinique spécifique le plus sensible pour diagnostiquer une rupture du ligament croisé antérieur (LCA) du genou ?',
            expectedAnswerKey: 'Le test de Lachman-Trillat (arrêt dur retardé ou mou à 20-30° de flexion du genou).',
            facultyDetailedCorrection: 'Le test de Lachman (tiroir antérieur à 20° de flexion) est le test le plus sensible et spécifique d\'une rupture du LCA.'
          }
        ]
      }
    ]
  }
];
