export function shuffleArray<T>(arr: T[], seed: number): T[] {
  const result = [...arr];
  let currentSeed = seed;
  
  // simple LCG for seeded random
  const random = () => {
    currentSeed = (currentSeed * 9301 + 49297) % 233280;
    return currentSeed / 233280;
  };
  
  for (let i = result.length - 1; i > 0; i--) {
    const j = Math.floor(random() * (i + 1));
    [result[i], result[j]] = [result[j], result[i]];
  }
  return result;
}

export function getSessionSeed(moduleId: string): number {
  if (typeof window === 'undefined') return Date.now(); // SSR fallback
  
  const key = `quiz_seed_${moduleId}`;
  const stored = sessionStorage.getItem(key);
  
  if (stored) {
    return parseInt(stored, 10);
  }
  
  const newSeed = Math.floor(Math.random() * 1000000);
  sessionStorage.setItem(key, newSeed.toString());
  return newSeed;
}

export function getRandomQuestions(pool: any[], count: number, moduleId: string): any[] {
  const seed = getSessionSeed(moduleId);
  const shuffled = shuffleArray(pool, seed);
  return shuffled.slice(0, count);
}
