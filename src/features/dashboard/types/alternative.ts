import type { AggregatedKecamatan } from '../lib/data-aggregator';

export interface Alternative extends AggregatedKecamatan {
  id: string;
  name: string; // Alias for kecamatan for display
}

export interface ScoredAlternative extends Alternative {
  score: number; // 0-100 or 0-1
  rank: number;
  criteriaScores: {
    [key: string]: number; // breakdown by criteria
  };
}
