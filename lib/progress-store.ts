import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface ProgressStore {
  // Quiz scores: { moduleId: { date: string, score: number, total: number }[] }
  quizHistory: Record<string, { date: string; score: number; total: number }[]>;
  // Module progress: { moduleId: completionPercent }
  moduleProgress: Record<string, number>;
  // Study streak (days)
  streak: number;
  lastStudyDate: string;
  totalStudyMinutes: number;
  // Actions
  recordQuizResult: (moduleId: string, score: number, total: number) => void;
  updateModuleProgress: (moduleId: string, percent: number) => void;
  addStudyMinutes: (minutes: number) => void;
  checkAndUpdateStreak: () => void;
}

export const useProgressStore = create<ProgressStore>()(
  persist(
    (set, get) => ({
      quizHistory: {},
      moduleProgress: {},
      streak: 0,
      lastStudyDate: '',
      totalStudyMinutes: 0,

      recordQuizResult: (moduleId, score, total) =>
        set((state) => {
          const history = state.quizHistory[moduleId] || [];
          return {
            quizHistory: {
              ...state.quizHistory,
              [moduleId]: [...history, { date: new Date().toISOString(), score, total }],
            },
          };
        }),

      updateModuleProgress: (moduleId, percent) =>
        set((state) => ({
          moduleProgress: {
            ...state.moduleProgress,
            [moduleId]: percent,
          },
        })),

      addStudyMinutes: (minutes) =>
        set((state) => ({
          totalStudyMinutes: state.totalStudyMinutes + minutes,
        })),

      checkAndUpdateStreak: () =>
        set((state) => {
          const today = new Date().toDateString();
          if (state.lastStudyDate === today) return state; // Already studied today

          const lastDate = new Date(state.lastStudyDate);
          const yesterday = new Date();
          yesterday.setDate(yesterday.getDate() - 1);

          let newStreak = state.streak;
          if (lastDate.toDateString() === yesterday.toDateString()) {
            newStreak += 1;
          } else {
            newStreak = 1;
          }

          return {
            streak: newStreak,
            lastStudyDate: today,
          };
        }),
    }),
    {
      name: 'student-progress-storage',
    }
  )
);
