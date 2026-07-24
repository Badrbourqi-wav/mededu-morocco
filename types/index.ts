// types/index.ts
// Data contracts and TypeScript definitions for MedEdu Morocco

export type CycleType = 'PRECLINICAL' | 'CLINICAL' | 'INTERNSHIP';

export interface SemesterData {
  id: string;
  code: string; // S1, S2 ... S12
  title: string;
  number: number;
  cycle: CycleType;
  description: string;
  icon: string;
  modulesCount: number;
  progressPercent: number;
}

export interface ModuleData {
  id: string;
  code: string;
  title: string;
  description: string;
  icon: string;
  duration: number; // in hours
  semesterId: string;
  semesterCode: string;
  progressPercent: number;
  highYieldBadge?: boolean;
  lessonsCount: number;
  quizzesCount: number;
}

export interface DiagramHotspot {
  id: string;
  x: number; // Percentage X position (0-100)
  y: number; // Percentage Y position (0-100)
  label: string;
  clinicalTerm: string;
  definition: string;
  pathologyNote?: string;
  pulseAnimation?: boolean;
}

export interface DiagramData {
  id: string;
  title: string;
  category: string;
  imageOrSvgType: 'HEART' | 'BRAIN' | 'KIDNEY' | 'LUNGS';
  hotspots: DiagramHotspot[];
}

export interface QuestionData {
  id: string;
  prompt: string;
  options: { id: string; text: string }[];
  correctOption: string;
  explanation: string;
  difficulty: 'EASY' | 'MEDIUM' | 'HARD' | 'HIGH_YIELD_PFE';
}

export interface LessonData {
  id: string;
  title: string;
  order: number;
  summary: string;
  content: string; // Markdown / Clinical Notes
  highYieldNotes: string;
  diagrams?: DiagramData[];
  animatedProcessType?: string;
}

export interface QCMQuizData {
  id: string;
  title: string;
  description: string;
  questions: QuestionData[];
}
