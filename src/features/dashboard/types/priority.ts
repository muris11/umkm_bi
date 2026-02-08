import type { AggregatedKecamatan } from '../lib/data-aggregator';

export interface Priority extends AggregatedKecamatan {
    priorityScore: number;
    rank: number;
    // Add any specific priority-related flags or breakdowns here
    isPriority: boolean;
    reason?: string;
}
