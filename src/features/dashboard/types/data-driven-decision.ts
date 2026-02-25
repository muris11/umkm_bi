export type CostEstimate = 'low' | 'medium' | 'high';
export type Timeframe = 'short' | 'medium' | 'long';
export type ConfidenceLevel = 'high' | 'medium' | 'low';

export interface PolicyAlternative {
  id: string;
  name: string;
  description: string;
  pros: string[];
  cons: string[];
  estimatedImpact: {
    metric: string;
    value: string;
  };
  costEstimate: CostEstimate;
  timeframe: Timeframe;
}

export interface SelectedPolicy {
  name: string;
  description: string;
  targetIndicators: string[];
  expectedOutcome: string;
}

export interface DecisionRationale {
  comparedAlternatives: string[];
  keyInsight: string;
  primaryIndicator: string;
  confidenceLevel: ConfidenceLevel;
}

export interface DecisionTraceItem {
  alternativeId: string;
  alternativeName: string;
  weightedScore: number;
  scoreBreakdown: {
    impact: number;
    feasibility: number;
    risk: number;
    timeToValue: number;
  };
  notes: string;
}

export interface DecisionTrace {
  method: string;
  weights: {
    impact: number;
    feasibility: number;
    risk: number;
    timeToValue: number;
  };
  ranking: DecisionTraceItem[];
}

export interface ImplementationPlan {
  steps: string[];
  responsibleParties: string[];
  timeline: string;
  successMetrics: string[];
}

export interface DataDrivenDecision {
  selectedPolicy: SelectedPolicy;
  alternatives: PolicyAlternative[];
  decisionRationale: DecisionRationale;
  implementation: ImplementationPlan;
  decisionTrace: DecisionTrace;
}
