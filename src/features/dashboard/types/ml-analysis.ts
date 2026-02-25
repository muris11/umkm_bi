export type MLModelType = 'classification' | 'regression' | 'clustering';

export interface MLEvaluationMetric {
  name: string;
  value: number;
  unit?: string;
  note?: string;
}

export interface MLEvaluationSummary {
  datasetWindow: string;
  splitStrategy: string;
  metrics: MLEvaluationMetric[];
  caveat?: string;
}

export interface MLDataReadiness {
  historicalCoverageYears: number;
  dataPoints: number;
  featureCount: number;
  missingValueRatePct: number;
  recommendation: string;
}

export interface MLModel {
  name: string;
  type: MLModelType;
  description: string;
  useCase: string;
  accuracy?: number;
  applicable: boolean;
  evaluation?: MLEvaluationSummary;
}

export interface PredictiveAnalysis {
  canUsePredictive: boolean;
  reason: string;
  recommendedApproach: string;
  dataReadiness: MLDataReadiness;
}

export interface MLAnalysisData {
  mlModels: MLModel[];
  predictiveAnalysis: PredictiveAnalysis;
}
