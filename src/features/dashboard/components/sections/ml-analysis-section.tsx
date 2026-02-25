'use client';

import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Brain, TrendingUp, Users, BarChart3, Target, Layers } from 'lucide-react';

interface MLModel {
  name: string;
  type: 'classification' | 'regression' | 'clustering';
  description: string;
  useCase: string;
  accuracy?: number;
  applicable: boolean;
  evaluation?: {
    datasetWindow: string;
    splitStrategy: string;
    metrics: Array<{
      name: string;
      value: number;
      unit?: string;
      note?: string;
    }>;
    caveat?: string;
  };
}

interface MLAnalysisSectionProps {
  mlModels: MLModel[];
  predictiveAnalysis: {
    canUsePredictive: boolean;
    reason: string;
    recommendedApproach: string;
    dataReadiness: {
      historicalCoverageYears: number;
      dataPoints: number;
      featureCount: number;
      missingValueRatePct: number;
      recommendation: string;
    };
  };
}

const typeConfig = {
  classification: {
    icon: Target,
    color: 'blue',
    label: 'Klasifikasi',
  },
  regression: {
    icon: TrendingUp,
    color: 'emerald',
    label: 'Regresi',
  },
  clustering: {
    icon: Layers,
    color: 'violet',
    label: 'Clustering',
  },
};

export function MLAnalysisSection({ mlModels, predictiveAnalysis }: MLAnalysisSectionProps) {
  if (!mlModels || mlModels.length === 0) return null;

  return (
    <Card className="mb-8 overflow-hidden border-indigo-200 bg-gradient-to-br from-indigo-50/50 to-white">
      <CardHeader className="pb-4 border-b border-indigo-100 px-4 sm:px-6">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <div className="p-2.5 bg-indigo-100 rounded-xl text-indigo-600">
              <Brain className="w-6 h-6" />
            </div>
            <div>
              <CardTitle className="text-indigo-900 text-xl">Analisis Machine Learning</CardTitle>
              <p className="text-sm text-indigo-600 mt-1">
                Potensi Prediktif & Model ML untuk UMKM Jabar
              </p>
            </div>
          </div>
          <Badge 
            variant={predictiveAnalysis.canUsePredictive ? "success" : "warning"}
            className="text-xs"
          >
            {predictiveAnalysis.canUsePredictive ? 'Prediktif: Aktif' : 'Prediktif: Terbatas'}
          </Badge>
        </div>
      </CardHeader>
      
      <CardContent className="p-4 sm:p-6">
        <div className="mb-6 p-4 bg-white/70 rounded-xl border border-indigo-100">
          <h4 className="text-sm font-semibold text-indigo-900 mb-2 flex items-center gap-2">
            <TrendingUp className="w-4 h-4" />
            Assessment Pendekatan Prediktif
          </h4>
          <p className="text-sm text-slate-600 leading-relaxed mb-3">
            {predictiveAnalysis.reason}
          </p>
          <div className="flex items-center gap-2 text-xs">
            <span className="font-medium text-indigo-700">Rekomendasi:</span>
            <span className="text-slate-600">{predictiveAnalysis.recommendedApproach}</span>
          </div>
        </div>

        <div className="mb-6 grid grid-cols-2 md:grid-cols-4 gap-2 sm:gap-3">
          <div className="rounded-lg border border-indigo-100 bg-white p-2 sm:p-3">
            <div className="text-[10px] uppercase tracking-wider text-slate-500">Histori</div>
            <div className="text-sm font-semibold text-slate-900">{predictiveAnalysis.dataReadiness.historicalCoverageYears} tahun</div>
          </div>
          <div className="rounded-lg border border-indigo-100 bg-white p-2 sm:p-3">
            <div className="text-[10px] uppercase tracking-wider text-slate-500">Data Points</div>
            <div className="text-sm font-semibold text-slate-900">{predictiveAnalysis.dataReadiness.dataPoints.toLocaleString('id-ID')}</div>
          </div>
          <div className="rounded-lg border border-indigo-100 bg-white p-2 sm:p-3">
            <div className="text-[10px] uppercase tracking-wider text-slate-500">Feature</div>
            <div className="text-sm font-semibold text-slate-900">{predictiveAnalysis.dataReadiness.featureCount}</div>
          </div>
          <div className="rounded-lg border border-indigo-100 bg-white p-2 sm:p-3">
            <div className="text-[10px] uppercase tracking-wider text-slate-500">Missing Rate</div>
            <div className="text-sm font-semibold text-slate-900">{predictiveAnalysis.dataReadiness.missingValueRatePct.toFixed(2)}%</div>
          </div>
        </div>

        <div className="mb-6 rounded-lg border border-indigo-100 bg-indigo-50/60 p-3 text-xs text-indigo-900">
          <span className="font-semibold">Data Readiness:</span> {predictiveAnalysis.dataReadiness.recommendation}
        </div>

        <h4 className="text-sm font-semibold text-indigo-900 mb-4 flex items-center gap-2">
          <BarChart3 className="w-4 h-4" />
          Model ML yang Direkomendasikan
        </h4>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4">
          {mlModels.map((model, index) => {
            const config = typeConfig[model.type];
            const Icon = config.icon;
            
            return (
              <div
                key={index}
                className={`p-3 sm:p-4 rounded-xl border transition-all duration-200 ${
                  model.applicable 
                    ? 'bg-white border-indigo-100 shadow-sm hover:shadow-md' 
                    : 'bg-slate-50/50 border-slate-200 opacity-60'
                }`}
              >
                <div className="flex items-start justify-between mb-3">
                  <div className={`p-2 rounded-lg ${
                    model.type === 'classification' ? 'bg-blue-100 text-blue-600' :
                    model.type === 'regression' ? 'bg-emerald-100 text-emerald-600' :
                    'bg-violet-100 text-violet-600'
                  }`}>
                    <Icon className="w-4 h-4" />
                  </div>
                  <Badge 
                    variant={model.applicable ? "info" : "default"}
                    className="text-[10px]"
                  >
                    {config.label}
                  </Badge>
                </div>
                
                <h5 className="font-semibold text-slate-900 mb-1 text-sm break-words">{model.name}</h5>
                <p className="text-xs text-slate-500 mb-3 leading-relaxed break-words">{model.description}</p>
                
                <div className="pt-3 border-t border-slate-100">
                  <div className="text-[10px] uppercase tracking-wider text-slate-400 mb-1">Use Case</div>
                  <p className="text-xs text-slate-700 break-words">{model.useCase}</p>
                </div>
                
                {model.accuracy && model.applicable && (
                  <div className="mt-3 flex items-center gap-2">
                    <div className="flex-1 h-1.5 bg-slate-100 rounded-full overflow-hidden">
                      <div 
                        className={`h-full rounded-full ${
                          model.accuracy >= 85 ? 'bg-emerald-500' :
                          model.accuracy >= 70 ? 'bg-yellow-500' :
                          'bg-orange-500'
                        }`}
                        style={{ width: `${model.accuracy}%` }}
                      />
                    </div>
                    <span className="text-xs font-medium text-slate-600">{model.accuracy}%</span>
                  </div>
                )}

                {model.evaluation && (
                  <div className="mt-3 rounded-lg border border-slate-100 bg-slate-50 p-2">
                    <div className="text-[10px] uppercase tracking-wider text-slate-500 mb-1">Evaluasi</div>
                    <div className="text-[11px] text-slate-600 mb-1">{model.evaluation.datasetWindow}</div>
                    <div className="text-[11px] text-slate-600 mb-2">Split: {model.evaluation.splitStrategy}</div>
                    <ul className="space-y-1">
                      {model.evaluation.metrics.slice(0, 2).map((metric) => (
                        <li key={`${model.name}-${metric.name}`} className="text-[11px] text-slate-700">
                          <span className="font-medium">{metric.name}:</span> {metric.value}
                          {metric.unit ? ` ${metric.unit}` : ''}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        <div className="mt-6 p-4 bg-gradient-to-r from-indigo-600 to-violet-600 rounded-xl text-white">
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-2 mb-2">
            <Users className="w-4 h-4 text-indigo-200" />
            <h4 className="font-semibold text-sm">Konteks Smart City</h4>
          </div>
          <p className="text-xs text-indigo-100 leading-relaxed">
            Dalam ekosistem Smart City, ML membedakan diri dari Big Data dan BI: 
            <strong> Big Data</strong> berfokus pada volume dan velocity data; 
            <strong> BI</strong> menyajikan insights deskriptif dari data historis; 
            sedangkan <strong> ML</strong> memungkinkan prediksi dan otomatisasi keputusan 
            untuk perencanaan UMKM yang proaktif.
          </p>
        </div>
      </CardContent>
    </Card>
  );
}
