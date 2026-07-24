import { PrismaClient, CycleCategory, QuestionDifficulty } from '@prisma/client';

const prisma = new PrismaClient();

// ─────────────────────────────────────────────────────────
// SEMESTERS SEED DATA (S1 TO S12 - MOROCCAN REFORM 6 YEARS)
// ─────────────────────────────────────────────────────────
const SEMESTERS_DATA = [
  {
    code: 'S1',
    number: 1,
    title: 'Semestre 1 — Biologie, Anatomie I & Biochimie',
    cycle: CycleCategory.PRECLINICAL,
    description: 'Bases fondamentales de la structure du corps humain.',
    icon: 'Microscope',
    colorHex: '#3b82f6',
    modules: [
      { code: 'MOD-ANAT-S1', title: 'Anatomie Humaine I', description: 'Ostéologie, Arthrologie & Membre Supérieur', icon: 'Bone', duration: 60, order: 1 },
      { code: 'MOD-HISTO-S1', title: 'Histologie & Cytologie', description: 'Structure cellulaire et tissus fondamentaux', icon: 'Microscope', duration: 45, order: 2 },
      { code: 'MOD-BIOCH-S1', title: 'Biochimie Fondamentale', description: 'Glucides, Lipides, Protéines et Enzymologie', icon: 'Dna', duration: 50, order: 3 },
      { code: 'MOD-GENET-S1', title: 'Génétique Médicale', description: 'Hérédité, ADN et cytogénétique', icon: 'Binary', duration: 30, order: 4 },
    ],
  },
  {
    code: 'S2',
    number: 2,
    title: 'Semestre 2 — Physiologie I, Anatomie II & Biophysique',
    cycle: CycleCategory.PRECLINICAL,
    description: 'Fonctionnement des systèmes physiologiques cellulaires et tissulaires.',
    icon: 'Activity',
    colorHex: '#06b6d4',
    modules: [
      { code: 'MOD-PHYS-S2', title: 'Physiologie Cellulaire', description: 'Potentiels de membrane et transports', icon: 'Zap', duration: 50, order: 1 },
      { code: 'MOD-ANAT2-S2', title: 'Anatomie Humaine II', description: 'Membre Inférieur & Thorax', icon: 'Bone', duration: 60, order: 2 },
      { code: 'MOD-BIOPH-S2', title: 'Biophysique Médicale', description: 'Fluides, rayonnements et imagerie', icon: 'Radiation', duration: 40, order: 3 },
      { code: 'MOD-EMBRYO-S2', title: 'Embryologie', description: 'Développement de l embryon humain', icon: 'Baby', duration: 35, order: 4 },
    ],
  },
  {
    code: 'S3',
    number: 3,
    title: 'Semestre 3 — Pharmacologie, Immunologie & Anapath',
    cycle: CycleCategory.PRECLINICAL,
    description: 'Introduction aux agents pathogènes, réponses immunitaires et médicaments.',
    icon: 'Pill',
    colorHex: '#8b5cf6',
    modules: [
      { code: 'MOD-PHARM-S3', title: 'Pharmacologie Générale', description: 'Pharmacocinétique, pharmacodynamie et classes médicamenteuses', icon: 'Pill', duration: 60, order: 1 },
      { code: 'MOD-IMMUNO-S3', title: 'Immunologie Fondamentale', description: 'Système immunitaire inné et adaptatif', icon: 'Shield', duration: 50, order: 2 },
      { code: 'MOD-ANAPATH-S3', title: 'Anatomie Pathologique', description: 'Lésions cellulaires, inflammation et néoplasies', icon: 'FileSearch', duration: 55, order: 3 },
      { code: 'MOD-BACTERIO-S3', title: 'Bactériologie & Virologie', description: 'Agents infectieux et antibiogrammes', icon: 'Bug', duration: 45, order: 4 },
    ],
  },
  {
    code: 'S4',
    number: 4,
    title: 'Semestre 4 — Sémiologie Médicale & Chirurgicale',
    cycle: CycleCategory.PRECLINICAL,
    description: 'Apprentissage de l examen clinique, de l anamnèse et de l imagerie.',
    icon: 'Stethoscope',
    colorHex: '#10b981',
    modules: [
      { code: 'MOD-SEM-MED-S4', title: 'Sémiologie Médicale', description: 'Examen physique par appareil et signes fonctionnels', icon: 'Stethoscope', duration: 70, order: 1 },
      { code: 'MOD-SEM-CHIR-S4', title: 'Sémiologie Chirurgicale', description: 'Abdomen aigu, traumatismes et pansements', icon: 'Scissors', duration: 50, order: 2 },
      { code: 'MOD-RADIO-S4', title: 'Radiologie & Imagerie', description: 'Lecture de clichés X, Scanner et IRM', icon: 'Scan', duration: 40, order: 3 },
      { code: 'MOD-PARASITO-S4', title: 'Parasitologie & Mycologie', description: 'Parasites et champignons d intérêt médical', icon: 'Bug', duration: 35, order: 4 },
    ],
  },
  {
    code: 'S5',
    number: 5,
    title: 'Semestre 5 — Cardiologie & Pneumologie',
    cycle: CycleCategory.CLINICAL,
    description: 'Pathologies cardiovasculaires et respiratoires majeures.',
    icon: 'Heart',
    colorHex: '#ef4444',
    modules: [
      { code: 'MOD-CARDIO-S5', title: 'Cardiologie & Pathologies Vasculaires', description: 'SCA, Insuffisance Cardiaque, HTA, Valvulopathies', icon: 'HeartPulse', duration: 80, order: 1 },
      { code: 'MOD-PNEUMO-S5', title: 'Pneumologie', description: 'Asthme, BPCO, Cancérologie thoracique, Pleurésies', icon: 'Wind', duration: 70, order: 2 },
    ],
  },
  {
    code: 'S6',
    number: 6,
    title: 'Semestre 6 — Gastro-Entérologie & Neurologie',
    cycle: CycleCategory.CLINICAL,
    description: 'Pathologies digestives, hépatiques et du système nerveux.',
    icon: 'Brain',
    colorHex: '#a855f7',
    modules: [
      { code: 'MOD-GASTRO-S6', title: 'Gastro-Entérologie & Hépatologie', description: 'Hépatites, Cirrhose, MICI, Ulcères, Cancérologie digestive', icon: 'UtensilsCrossed', duration: 75, order: 1 },
      { code: 'MOD-NEURO-S6', title: 'Neurologie Clinique', description: 'AVC, Épilepsie, Parkinson, SEP, Méningites', icon: 'BrainCircuit', duration: 75, order: 2 },
    ],
  },
  {
    code: 'S7',
    number: 7,
    title: 'Semestre 7 — Néphrologie, Urologie & Endocrinologie',
    cycle: CycleCategory.CLINICAL,
    description: 'Pathologies rénales, métaboliques et voies urinaires.',
    icon: 'Droplet',
    colorHex: '#f59e0b',
    modules: [
      { code: 'MOD-NEPHRO-S7', title: 'Néphrologie', description: 'Insuffisance Rénale Aiguë/Chronique, Syndromes Néphrotiques', icon: 'Filter', duration: 60, order: 1 },
      { code: 'MOD-URO-S7', title: 'Urologie', description: 'Cancer de Prostate, Lithiase Urinaire, HBP', icon: 'Droplets', duration: 50, order: 2 },
      { code: 'MOD-ENDOC-S7', title: 'Endocrinologie & Diabétologie', description: 'Diabète Type 1/2, Dysthyroïdies, Surrénales', icon: 'Flame', duration: 65, order: 3 },
    ],
  },
  {
    code: 'S8',
    number: 8,
    title: 'Semestre 8 — Pédiatrie & Gynécologie-Obstétrique',
    cycle: CycleCategory.CLINICAL,
    description: 'Santé de la femme, grossesse et pathologies de l enfant.',
    icon: 'Baby',
    colorHex: '#ec4899',
    modules: [
      { code: 'MOD-PEDIA-S8', title: 'Pédiatrie Générale', description: 'Développement, Déshydratation, Infectiologie pédiatrique', icon: 'Baby', duration: 80, order: 1 },
      { code: 'MOD-GYNECO-S8', title: 'Gynécologie & Obstétrique', description: 'Suivi de grossesse, GEU, Cancers gynécologiques, Accouchement', icon: 'Heart', duration: 80, order: 2 },
    ],
  },
  {
    code: 'S9',
    number: 9,
    title: 'Semestre 9 — Infectieux, Rhumatologie & Dermatologie',
    cycle: CycleCategory.CLINICAL,
    description: 'Maladies transmissibles, de l appareil locomoteur et cutanées.',
    icon: 'Syringe',
    colorHex: '#14b8a6',
    modules: [
      { code: 'MOD-INFECT-S9', title: 'Maladies Infectieuses', description: 'Tuberculose, VIH, Septicémies, Paludisme', icon: 'Bug', duration: 70, order: 1 },
      { code: 'MOD-RHUMATO-S9', title: 'Rhumatologie & Orthopédie', description: 'PR, SPA, Arthrose, Fractures', icon: 'Bone', duration: 65, order: 2 },
      { code: 'MOD-DERMATO-S9', title: 'Dermatologie', description: 'Psoriasis, Eczéma, Mélanome, Dermatoses infectieuses', icon: 'Sparkles', duration: 50, order: 3 },
    ],
  },
  {
    code: 'S10',
    number: 10,
    title: 'Semestre 10 — Urgences, Réanimation & Psychiatrie',
    cycle: CycleCategory.CLINICAL,
    description: 'Urgences vitales, soins intensifs et santé mentale.',
    icon: 'AlertTriangle',
    colorHex: '#dc2626',
    modules: [
      { code: 'MOD-URG-S10', title: 'Urgences & Réanimation', description: 'ACR, Choc, Polytrauma, Détresse respiratoire', icon: 'Siren', duration: 90, order: 1 },
      { code: 'MOD-PSY-S10', title: 'Psychiatrie', description: 'Schizophrénie, Troubles de l humeur, Addictions', icon: 'Brain', duration: 60, order: 2 },
    ],
  },
  {
    code: 'S11',
    number: 11,
    title: 'Semestre 11 — Stage Interné de Médecine & Pédiatrie',
    cycle: CycleCategory.INTERNSHIP,
    description: 'Immersion hospitalière CHU/CHRH et responsabilité clinique directe.',
    icon: 'Building2',
    colorHex: '#6366f1',
    modules: [
      { code: 'MOD-STAGE-MED-S11', title: 'Stage Hospitalier Médecine', description: 'Gardes d urgence et démarches étiologiques en médecine interne', icon: 'Building2', duration: 200, order: 1 },
      { code: 'MOD-STAGE-PED-S11', title: 'Stage Hospitalier Pédiatrie', description: 'Prise en charge des urgences pédiatriques', icon: 'Baby', duration: 150, order: 2 },
    ],
  },
  {
    code: 'S12',
    number: 12,
    title: 'Semestre 12 — Stage Chirurgical & Thèse de Fin d Études (PFE)',
    cycle: CycleCategory.INTERNSHIP,
    description: 'Pratique au bloc opératoire et soutenance de la Thèse de Docteur en Médecine.',
    icon: 'GraduationCap',
    colorHex: '#8b5cf6',
    modules: [
      { code: 'MOD-STAGE-CHIR-S12', title: 'Stage Hospitalier Chirurgie', description: 'Bloc opératoire, soins post-opératoires et traumatologie', icon: 'Scissors', duration: 200, order: 1 },
      { code: 'MOD-THESE-PFE-S12', title: 'Thèse PFE & Examen National', description: 'Préparation du mémoire de thèse et révisions PFE', icon: 'GraduationCap', duration: 300, order: 2 },
    ],
  },
];

async function main() {
  console.log('🌱 Starting MedEdu Morocco Database Seeding...');

  // 1. Clear existing curriculum data
  await prisma.globalQuestionBank.deleteMany();
  await prisma.moduleQuestion.deleteMany();
  await prisma.chapterQuestion.deleteMany();
  await prisma.moduleQuiz.deleteMany();
  await prisma.chapterQuiz.deleteMany();
  await prisma.chapter.deleteMany();
  await prisma.module.deleteMany();
  await prisma.semester.deleteMany();

  console.log('🧹 Cleaned existing database tables.');

  // 2. Seed Semesters & Modules
  for (const semData of SEMESTERS_DATA) {
    const semester = await prisma.semester.create({
      data: {
        code: semData.code,
        number: semData.number,
        title: semData.title,
        cycle: semData.cycle,
        description: semData.description,
        icon: semData.icon,
        colorHex: semData.colorHex,
        modules: {
          create: semData.modules.map(m => ({
            code: m.code,
            title: m.title,
            description: m.description,
            icon: m.icon,
            duration: m.duration,
            order: m.order,
          })),
        },
      },
      include: { modules: true },
    });
    console.log(`✅ Created Semester ${semester.code} (${semester.modules.length} modules)`);
  }

  // 3. Seed Detailed Content Payloads for Flagship Modules
  
  // === MODULE: CARDIOLOGIE (S5) ===
  const cardioModule = await prisma.module.findUnique({ where: { code: 'MOD-CARDIO-S5' } });
  if (cardioModule) {
    const chapter1 = await prisma.chapter.create({
      data: {
        title: 'Syndromes Coronariens Aigus : Infarctus du Myocarde (IDM)',
        order: 1,
        summary: 'Urgence diagnostique et thérapeutique absolue avec nécrose myocardique par occlusion coronaire.',
        content: `
# Infarctus du Myocarde (IDM ST+)

## I. Physiopathologie
L'IDM ST+ résulte de la rupture d'une plaque d'athérome vulnérable suivie d'un thrombus occlusif.
- **Ischémie transmurale**
- **Nécrose irréversible en l'absence de reperfusion précoce.**

## II. Diagnostic Clinique
- **Douleur rétrosternale constrictive**, atroce, irradiant vers la mâchoire et le bras gauche.
- Durée > 20 minutes, résistante à la trinitrine.

## III. ECG et Biologie
- **ECG (12 dérivations dans les 10 min) :** Onde de Pardee (sus-décalage ST convexe en haut) avec miroir.
- **Biologie :** Troponine I/T ultra-sensible (ne doit JAMAIS retarder la reperfusion).

## IV. Traitement
- **BASIC :** Bêtabloquants, Aspirine (dose de charge 250mg), Statine, Inhibiteur P2Y12, Coagulation (HNF/HBPM).
- **Reperfusion :** Angioplastie primaire dans les 120 min, sinon Thrombolyse IV.
        `,
        highYieldNotes: '🔥 PFE: Ne jamais attendre la Troponine pour transférer un SCA ST+ en coronarographie. Le temps c est du muscle !',
        durationMins: 45,
        moduleId: cardioModule.id,
      },
    });

    await prisma.chapterQuiz.create({
      data: {
        title: 'Quiz de Fin de Chapitre — Infarctus du Myocarde',
        chapterId: chapter1.id,
        questions: {
          create: [
            {
              prompt: 'Quel est l examen complémentaire prioritaire à réaliser dans les 10 minutes devant une suspicion d IDM ?',
              optionsJson: [
                { id: 'A', text: 'Dosage de la Troponine I' },
                { id: 'B', text: 'Électrocardiogramme (ECG) 12 dérivations' },
                { id: 'C', text: 'Radiographie du thorax' },
                { id: 'D', text: 'Échographie cardiaque trans-thoracique' },
              ],
              correctOption: 'B',
              explanation: 'L ECG 12 dérivations est l examen fondamental de première intention devant toute douleur thoracique. Il affirme le diagnostic de SCA ST+ dès les premières minutes.',
              difficulty: QuestionDifficulty.EASY,
              clinicalPearl: 'Tout retard de l ECG de 1ère intention aggrave le risque de nécrose myocardique définitive.',
            },
          ],
        },
      },
    });

    await prisma.globalQuestionBank.create({
      data: {
        prompt: 'Quelle est la contre-indication absolue aux dérivés nitrés dans l IDM ?',
        optionsJson: [
          { id: 'A', text: 'Infarctus antérieur' },
          { id: 'B', text: 'Infarctus du Ventricule Droit (VD)' },
          { id: 'C', text: 'Tachycardie sinusale' },
          { id: 'D', text: 'Diabète' },
        ],
        correctOption: 'B',
        explanation: 'Dans l IDM du ventricule droit, la baisse de précharge induite par les nitrés peut provoquer un collapsus hémodynamique sévère.',
        difficulty: QuestionDifficulty.HIGH_YIELD_PFE,
        semesterCode: 'S5',
        moduleId: cardioModule.id,
        disciplineTag: 'Cardiologie',
        topicTag: 'Urgences Cardiovasculaires',
        isVerified: true,
        source: 'Concours National de Résidanat',
      },
    });
    console.log('❤️ Seeded Cardiology module data');
  }

  // === MODULE: NEUROLOGIE (S6) ===
  const neuroModule = await prisma.module.findUnique({ where: { code: 'MOD-NEURO-S6' } });
  if (neuroModule) {
    const chapter1 = await prisma.chapter.create({
      data: {
        title: 'Accident Vasculaire Cérébral Ischémique (AVC)',
        order: 1,
        summary: 'Urgence neurologique absolue (Time is Brain).',
        content: `
# AVC Ischémique

## I. Sémiologie
- **Territoire Sylvien (ACM) :** Déficit moteur/sensitif brachio-facial + Aphasie si hémisphère dominant.
- **Territoire Antérieur (ACA) :** Déficit à prédominance crurale.

## II. Prise en charge
- **Thrombolyse IV (rt-PA) :** Si délai < 4h30.
- **Thrombectomie mécanique :** Si occlusion d un gros tronc < 6h.
        `,
        highYieldNotes: '🔥 PFE: Ne PAS baisser la tension artérielle à la phase aiguë sauf si > 220/120 mmHg (ou > 185/110 avant thrombolyse).',
        durationMins: 40,
        moduleId: neuroModule.id,
      },
    });

    await prisma.globalQuestionBank.create({
      data: {
        prompt: 'Quelle est la fenêtre thérapeutique maximale de la thrombolyse IV par rt-PA dans l AVC ischémique ?',
        optionsJson: [
          { id: 'A', text: '1 heure' },
          { id: 'B', text: '4 heures 30 minutes' },
          { id: 'C', text: '12 heures' },
          { id: 'D', text: '24 heures' },
        ],
        correctOption: 'B',
        explanation: 'La thrombolyse IV par rt-PA (Alteplase) est efficace et autorisée dans les 4h30 suivant l installation des premiers symptômes.',
        difficulty: QuestionDifficulty.MEDIUM,
        semesterCode: 'S6',
        moduleId: neuroModule.id,
        disciplineTag: 'Neurologie',
        topicTag: 'Urgences Neurologiques',
        isVerified: true,
      },
    });
    console.log('🧠 Seeded Neurology module data');
  }

  console.log('✨ Database Seeding Completed Successfully!');
}

main()
  .catch((e) => {
    console.error('❌ Seeding error:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
