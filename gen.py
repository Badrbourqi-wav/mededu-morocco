import json
import os

faculties = {
    'FMPR': 'FMP Rabat — Université Mohammed V',
    'FMPC': 'FMP Casablanca — Université Hassan II',
    'FMPF': 'FMP Fès — Université Sidi Mohammed Ben Abdellah',
    'FMPM': 'FMP Marrakech — Université Cadi Ayyad',
    'FMPO': 'FMP Oujda — Université Mohammed Premier',
    'FMPT': 'FMP Tanger — Université Abdelmalek Essaâdi'
}

exams = [
    # FMPR
    {'f': 'FMPR', 'y': '2019-2020', 's': 'S1', 'm': 'Anatomie', 't': 'QCM'},
    {'f': 'FMPR', 'y': '2021-2022', 's': 'S2', 'm': 'Physiologie', 't': 'QCM'},
    {'f': 'FMPR', 'y': '2022-2023', 's': 'S5', 'm': 'Cardiologie', 't': 'CAS_CLINIQUE'},
    {'f': 'FMPR', 'y': '2023-2024', 's': 'S5', 'm': 'Pneumologie', 't': 'QCM'},
    # FMPC
    {'f': 'FMPC', 'y': '2020-2021', 's': 'S1', 'm': 'Histologie', 't': 'QCM'},
    {'f': 'FMPC', 'y': '2022-2023', 's': 'S3', 'm': 'Pharmacologie', 't': 'QCM'},
    {'f': 'FMPC', 'y': '2023-2024', 's': 'S6', 'm': 'Neurologie', 't': 'CAS_CLINIQUE'},
    {'f': 'FMPC', 'y': '2023-2024', 's': 'S6', 'm': 'Psychiatrie', 't': 'QROC'},
    # FMPF
    {'f': 'FMPF', 'y': '2021-2022', 's': 'S2', 'm': 'Biophysique', 't': 'QCM'},
    {'f': 'FMPF', 'y': '2022-2023', 's': 'S4', 'm': 'Sémiologie', 't': 'QCM'},
    {'f': 'FMPF', 'y': '2023-2024', 's': 'S7', 'm': 'Diabétologie', 't': 'CAS_CLINIQUE'},
    {'f': 'FMPF', 'y': '2023-2024', 's': 'S7', 'm': 'Endocrinologie', 't': 'QCM'},
    # FMPM
    {'f': 'FMPM', 'y': '2020-2021', 's': 'S1', 'm': 'Biochimie', 't': 'QCM'},
    {'f': 'FMPM', 'y': '2021-2022', 's': 'S5', 'm': 'Cardiologie', 't': 'QCM'},
    {'f': 'FMPM', 'y': '2023-2024', 's': 'S8', 'm': 'Pédiatrie', 't': 'CAS_CLINIQUE'},
    {'f': 'FMPM', 'y': '2023-2024', 's': 'S8', 'm': 'Gynécologie', 't': 'QCM'},
    # FMPO
    {'f': 'FMPO', 'y': '2022-2023', 's': 'S3', 'm': 'Bactériologie', 't': 'QCM'},
    {'f': 'FMPO', 'y': '2023-2024', 's': 'S6', 'm': 'Gastro-entérologie', 't': 'CAS_CLINIQUE'},
    {'f': 'FMPO', 'y': '2023-2024', 's': 'S6', 'm': 'Hépatologie', 't': 'QCM'},
    {'f': 'FMPO', 'y': '2023-2024', 's': 'S6', 'm': 'Maladies Infectieuses', 't': 'QROC'},
    # FMPT
    {'f': 'FMPT', 'y': '2022-2023', 's': 'S4', 'm': 'Sémiologie Chirurgicale', 't': 'QCM'},
    {'f': 'FMPT', 'y': '2023-2024', 's': 'S9', 'm': 'Dermatologie', 't': 'CAS_CLINIQUE'},
    {'f': 'FMPT', 'y': '2023-2024', 's': 'S9', 'm': 'Rhumatologie', 't': 'QCM'},
    {'f': 'FMPT', 'y': '2023-2024', 's': 'S9', 'm': 'Orthopédie', 't': 'QROC'},
]

ts_content = """export type ExamType = 'QCM' | 'CAS_CLINIQUE' | 'QROC' | 'DISSERTATION';
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

export const ANNALES_DATA: AnnaleExam[] = [
"""

for i, ex in enumerate(exams):
    exam_id = f"{ex['f'].lower()}-{ex['s'].lower()}-{ex['y'][:4]}-{i}"
    ts_content += f"  {{\n"
    ts_content += f"    id: '{exam_id}',\n"
    ts_content += f"    facultyCode: '{ex['f']}',\n"
    ts_content += f"    facultyName: '{faculties[ex['f']]}',\n"
    ts_content += f"    year: '{ex['y']}',\n"
    ts_content += f"    semester: '{ex['s']}',\n"
    ts_content += f"    moduleTitle: '{ex['m']}',\n"
    ts_content += f"    examType: '{ex['t']}',\n"
    ts_content += f"    sessionType: 'Normale',\n"
    ts_content += f"    durationMinutes: 60,\n"
    
    if ex['t'] == 'QCM':
        ts_content += f"    qcmQuestions: [\n"
        for q_idx in range(1, 6):
            ts_content += f"      {{\n"
            ts_content += f"        id: '{exam_id}-q{q_idx}',\n"
            ts_content += f"        num: {q_idx},\n"
            ts_content += f"        text: 'Question {q_idx} concernant {ex['m']} - quel est le signe clinique typique ?',\n"
            ts_content += f"        options: [\n"
            ts_content += f"          {{ id: 'A', text: 'Proposition A pour {ex['m']}' }},\n"
            ts_content += f"          {{ id: 'B', text: 'Proposition B pour {ex['m']}' }},\n"
            ts_content += f"          {{ id: 'C', text: 'Proposition C pour {ex['m']}' }},\n"
            ts_content += f"          {{ id: 'D', text: 'Proposition D pour {ex['m']}' }},\n"
            ts_content += f"          {{ id: 'E', text: 'Proposition E pour {ex['m']}' }},\n"
            ts_content += f"        ],\n"
            ts_content += f"        correctOption: 'C',\n"
            ts_content += f"        officialRationale: 'Correction Officielle {ex['f']}: La proposition C est la bonne réponse selon les recommandations de {ex['y']}.'\n"
            ts_content += f"      }},\n"
        ts_content += f"    ]\n"
    else:
        ts_content += f"    practicalQuestions: [\n"
        ts_content += f"      {{\n"
        ts_content += f"        id: '{exam_id}-p1',\n"
        ts_content += f"        num: 1,\n"
        ts_content += f"        questionTitle: 'Cas Clinique : {ex['m']}',\n"
        ts_content += f"        clinicalContext: 'Patient de 45 ans se présentant aux urgences avec des signes typiques de pathologie en {ex['m']}. Les constantes sont stables mais l\\'examen révèle des anomalies.',\n"
        ts_content += f"        examDataText: 'Bilan biologique et radiologique montrant des signes caractéristiques.',\n"
        ts_content += f"        qrocQuestions: [\n"
        for q_idx in range(1, 6):
            ts_content += f"          {{\n"
            ts_content += f"            questionLabel: '{q_idx}. Quel est le diagnostic ou la prochaine étape ?',\n"
            ts_content += f"            expectedAnswerKey: 'Mot-clé attendu {q_idx}',\n"
            ts_content += f"            facultyDetailedCorrection: 'Explication détaillée pour la question {q_idx} validée par le jury de {ex['f']}.'\n"
            ts_content += f"          }},\n"
        ts_content += f"        ]\n"
        ts_content += f"      }}\n"
        ts_content += f"    ]\n"
    
    ts_content += f"  }},\n"

ts_content += "];\n"

with open(r'C:\Users\FLAKKA\.gemini\antigravity\scratch\mededu-morocco\lib\annales-data.ts', 'w', encoding='utf-8') as f:
    f.write(ts_content)
print('annales-data.ts generated successfully.')
