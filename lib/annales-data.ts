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

const faculties = {
  FMPR: 'FMP Rabat — Université Mohammed V',
  FMPC: 'FMP Casablanca — Université Hassan II',
  FMPF: 'FMP Fès — Université Sidi Mohammed Ben Abdellah',
  FMPM: 'FMP Marrakech — Université Cadi Ayyad',
  FMPO: 'FMP Oujda — Université Mohammed Premier',
  FMPT: 'FMP Tanger — Université Abdelmalek Essaâdi'
};

const mockQuestions = (examId: string, module: string, type: string) => {
  if (type === 'QCM') {
    return [1, 2, 3, 4, 5].map(i => ({
      id: `${examId}-q${i}`,
      num: i,
      text: `Question ${i} concernant ${module} - quel est le signe clinique le plus typique ?`,
      options: [
        { id: 'A', text: `Proposition A pour ${module}` },
        { id: 'B', text: `Proposition B pour ${module}` },
        { id: 'C', text: `Proposition C pour ${module}` },
        { id: 'D', text: `Proposition D pour ${module}` },
        { id: 'E', text: `Proposition E pour ${module}` }
      ],
      correctOption: 'C',
      officialRationale: `Correction Officielle : La proposition C est la bonne réponse car elle correspond aux recommandations.`
    }));
  }
  return [];
};

const mockPractical = (examId: string, module: string, type: string) => {
  if (type !== 'QCM') {
    return [
      {
        id: `${examId}-p1`,
        num: 1,
        questionTitle: `Cas Clinique : ${module}`,
        clinicalContext: `Patient de 45 ans se présentant aux urgences avec des signes typiques de pathologie en ${module}. Les constantes sont stables mais l'examen révèle des anomalies.`,
        examDataText: `Bilan biologique et radiologique montrant des signes caractéristiques.`,
        qrocQuestions: [1, 2, 3, 4, 5].map(i => ({
          questionLabel: `${i}. Quel est le diagnostic ou la prochaine étape ?`,
          expectedAnswerKey: `Mot-clé attendu ${i}`,
          facultyDetailedCorrection: `Explication détaillée pour la question ${i} validée par le jury.`
        }))
      }
    ];
  }
  return [];
};

const buildExam = (f: FacultyCode, y: string, s: string, m: string, t: ExamType, i: number): AnnaleExam => {
  const id = `${f.toLowerCase()}-${s.toLowerCase()}-${y.split('-')[0]}-${i}`;
  return {
    id,
    facultyCode: f,
    facultyName: faculties[f],
    year: y,
    semester: s,
    moduleTitle: m,
    examType: t,
    sessionType: 'Normale',
    durationMinutes: 60,
    qcmQuestions: mockQuestions(id, m, t),
    practicalQuestions: mockPractical(id, m, t)
  };
};

export const ANNALES_DATA: AnnaleExam[] = [
  buildExam('FMPR', '2019-2020', 'S1', 'Anatomie', 'QCM', 1),
  buildExam('FMPR', '2021-2022', 'S2', 'Physiologie', 'QCM', 2),
  buildExam('FMPR', '2022-2023', 'S5', 'Cardiologie', 'CAS_CLINIQUE', 3),
  buildExam('FMPR', '2023-2024', 'S5', 'Pneumologie', 'QCM', 4),
  buildExam('FMPC', '2020-2021', 'S1', 'Histologie', 'QCM', 5),
  buildExam('FMPC', '2022-2023', 'S3', 'Pharmacologie', 'QCM', 6),
  buildExam('FMPC', '2023-2024', 'S6', 'Neurologie', 'CAS_CLINIQUE', 7),
  buildExam('FMPC', '2023-2024', 'S6', 'Psychiatrie', 'QROC', 8),
  buildExam('FMPF', '2021-2022', 'S2', 'Biophysique', 'QCM', 9),
  buildExam('FMPF', '2022-2023', 'S4', 'Sémiologie', 'QCM', 10),
  buildExam('FMPF', '2023-2024', 'S7', 'Diabétologie', 'CAS_CLINIQUE', 11),
  buildExam('FMPF', '2023-2024', 'S7', 'Endocrinologie', 'QCM', 12),
  buildExam('FMPM', '2020-2021', 'S1', 'Biochimie', 'QCM', 13),
  buildExam('FMPM', '2021-2022', 'S5', 'Cardiologie', 'QCM', 14),
  buildExam('FMPM', '2023-2024', 'S8', 'Pédiatrie', 'CAS_CLINIQUE', 15),
  buildExam('FMPM', '2023-2024', 'S8', 'Gynécologie', 'QCM', 16),
  buildExam('FMPO', '2022-2023', 'S3', 'Bactériologie', 'QCM', 17),
  buildExam('FMPO', '2023-2024', 'S6', 'Gastro-entérologie', 'CAS_CLINIQUE', 18),
  buildExam('FMPO', '2023-2024', 'S6', 'Hépatologie', 'QCM', 19),
  buildExam('FMPO', '2023-2024', 'S6', 'Maladies Infectieuses', 'QROC', 20),
  buildExam('FMPT', '2022-2023', 'S4', 'Sémiologie Chirurgicale', 'QCM', 21),
  buildExam('FMPT', '2023-2024', 'S9', 'Dermatologie', 'CAS_CLINIQUE', 22),
  buildExam('FMPT', '2023-2024', 'S9', 'Rhumatologie', 'QCM', 23),
  buildExam('FMPT', '2023-2024', 'S9', 'Orthopédie', 'QROC', 24)
];
