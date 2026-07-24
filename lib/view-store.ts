// lib/view-store.ts
// MedEdu Morocco — In-Memory SPA Section Switcher (No URL changes required)

import { create } from 'zustand';

export type AppSection = 'DASHBOARD' | 'CHAPTER_READER' | 'FINAL_EXAM' | 'RANDOM_PRACTICE' | 'MINI_GAME' | 'ANNALES_FACULTES' | 'PRACTICAL_CASES';

interface ViewState {
  activeSection: AppSection;
  setActiveSection: (section: AppSection) => void;
}

export const useViewStore = create<ViewState>((set) => ({
  activeSection: 'DASHBOARD',
  setActiveSection: (section: AppSection) => set({ activeSection: section }),
}));
