import type { Alternative, ScoredAlternative } from '../types/alternative';

/**
 * Score alternatives based on criteria
 * Currently a simple pass-through or placeholder for TOPSIS/SAW logic
 */
export function scoreAlternatives(alternatives: Alternative[]): ScoredAlternative[] {
  return alternatives.map((alt, index) => {
    // Determine priority based on available data (mock scoring logic for now)
    // In real app, this would use the criteria weights
    const score = Math.random() * 100;

    return {
      ...alt,
      score: Number(score.toFixed(2)),
      rank: 0, // Will be sorted later
      criteriaScores: {
        // Mock criteria breakdown
        'Kepadatan UMKM': Math.random() * 100,
        'Potensi Pasar': Math.random() * 100,
      }
    };
  }).sort((a, b) => b.score - a.score)
    .map((alt, i) => ({ ...alt, rank: i + 1 }));
}
