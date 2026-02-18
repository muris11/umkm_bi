export type MLModelType = 'classification' | 'regression' | 'clustering';

export interface MLModel {
  name: string;
  type: MLModelType;
  description: string;
  useCase: string;
  accuracy?: number;
  applicable: boolean;
}

export interface PredictiveAnalysis {
  canUsePredictive: boolean;
  reason: string;
  recommendedApproach: string;
}

export interface MLAnalysisData {
  mlModels: MLModel[];
  predictiveAnalysis: PredictiveAnalysis;
}
