// lib/view-store.ts
// MedEdu Morocco — In-Memory SPA Section Switcher (No URL changes required)

import { create } from 'zustand';
import { CycleType } from '../types';

export type AppSection = 'DASHBOARD' | 'CHAPTER_READER' | 'FINAL_EXAM' | 'RANDOM_PRACTICE' | 'MINI_GAME' | 'ANNALES_FACULTES' | 'PRACTICAL_CASES' | 'COMMUNITY_CHAT';

interface ViewState {
  activeSection: AppSection;
  setActiveSection: (section: AppSection) => void;
  activeCycleFilter: CycleType | 'ALL';
  setActiveCycleFilter: (cycle: CycleType | 'ALL') => void;
}

export const useViewStore = create<ViewState>((set) => ({
  activeSection: 'DASHBOARD',
  setActiveSection: (section: AppSection) => set({ activeSection: section }),
  activeCycleFilter: 'ALL',
  setActiveCycleFilter: (cycle) => set({ activeCycleFilter: cycle }),
}));
