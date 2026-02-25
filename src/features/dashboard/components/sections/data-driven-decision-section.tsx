'use client';

import { useState } from 'react';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { 
  Target, 
  Scale, 
  Lightbulb, 
  CheckCircle2, 
  XCircle,
  TrendingUp,
  BarChart3,
  FileText,
  ArrowRight,
  Building2
} from 'lucide-react';

interface PolicyAlternative {
  id: string;
  name: string;
  description: string;
  pros: string[];
  cons: string[];
  estimatedImpact: {
    metric: string;
    value: string;
  };
  costEstimate: 'low' | 'medium' | 'high';
  timeframe: 'short' | 'medium' | 'long';
}

interface DataDrivenDecision {
  selectedPolicy: {
    name: string;
    description: string;
    targetIndicators: string[];
    expectedOutcome: string;
  };
  alternatives: PolicyAlternative[];
  decisionRationale: {
    comparedAlternatives: string[];
    keyInsight: string;
    primaryIndicator: string;
    confidenceLevel: 'high' | 'medium' | 'low';
  };
  implementation: {
    steps: string[];
    responsibleParties: string[];
    timeline: string;
    successMetrics: string[];
  };
  decisionTrace: {
    method: string;
    weights: {
      impact: number;
      feasibility: number;
      risk: number;
      timeToValue: number;
    };
    ranking: Array<{
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
    }>;
  };
}

interface DataDrivenDecisionSectionProps {
  decision: DataDrivenDecision;
}

const costLabels = {
  low: { text: 'Biaya Rendah', color: 'bg-emerald-100 text-emerald-700' },
  medium: { text: 'Biaya Sedang', color: 'bg-yellow-100 text-yellow-700' },
  high: { text: 'Biaya Tinggi', color: 'bg-red-100 text-red-700' },
};

const timeframeLabels = {
  short: { text: 'Jangka Pendek', color: 'bg-blue-100 text-blue-700' },
  medium: { text: 'Jangka Menengah', color: 'bg-purple-100 text-purple-700' },
  long: { text: 'Jangka Panjang', color: 'bg-slate-100 text-slate-700' },
};

const confidenceLabels = {
  high: { text: 'Tinggi', color: 'bg-emerald-100 text-emerald-700' },
  medium: { text: 'Sedang', color: 'bg-yellow-100 text-yellow-700' },
  low: { text: 'Rendah', color: 'bg-orange-100 text-orange-700' },
};

export function DataDrivenDecisionEnhancedSection({ decision }: DataDrivenDecisionSectionProps) {
  const [selectedAlternative, setSelectedAlternative] = useState<string | null>(null);
  
  if (!decision || !decision.selectedPolicy) return null;

  return (
    <Card className="mb-8 overflow-hidden border-emerald-200 bg-gradient-to-br from-emerald-50/50 to-white">
      <CardHeader className="pb-4 border-b border-emerald-100">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2.5 bg-emerald-100 rounded-xl text-emerald-600">
              <Scale className="w-6 h-6" />
            </div>
            <div>
              <CardTitle className="text-emerald-900 text-xl">
                Keputusan Berbasis Data (Data-Driven Decision Making)
              </CardTitle>
              <p className="text-sm text-emerald-600 mt-1">
                Kebijakan strategis dengan analisis alternatif dan indikator pendukung
              </p>
            </div>
          </div>
          <Badge 
            variant={decision.decisionRationale.confidenceLevel === 'high' ? "success" : "warning"}
            className="text-xs"
          >
            Confidence: {confidenceLabels[decision.decisionRationale.confidenceLevel].text}
          </Badge>
        </div>
      </CardHeader>
      
      <CardContent className="p-6">
        <div className="mb-6 p-4 bg-white/70 rounded-xl border border-emerald-100">
          <div className="flex items-start gap-3">
            <div className="p-2 bg-emerald-100 rounded-lg text-emerald-600 mt-0.5">
              <CheckCircle2 className="w-5 h-5" />
            </div>
            <div className="flex-1">
              <div className="text-xs font-semibold uppercase text-emerald-600 mb-1 tracking-wider">
                Kebijakan Terpilih
              </div>
              <h4 className="text-lg font-bold text-emerald-900 mb-2">
                {decision.selectedPolicy.name}
              </h4>
              <p className="text-sm text-slate-600 leading-relaxed mb-3">
                {decision.selectedPolicy.description}
              </p>
              
              <div className="flex flex-wrap gap-2 mb-3">
                {decision.selectedPolicy.targetIndicators.map((indicator, idx) => (
                  <Badge key={idx} variant="success" className="bg-emerald-50 text-emerald-700 border-emerald-200">
                    <BarChart3 className="w-3 h-3 mr-1" />
                    {indicator}
                  </Badge>
                ))}
              </div>
              
              <div className="p-3 bg-emerald-50/50 rounded-lg border border-emerald-100">
                <div className="text-xs font-medium text-emerald-700 mb-1">Outcome yang Diharapkan</div>
                <p className="text-sm text-emerald-800">{decision.selectedPolicy.expectedOutcome}</p>
              </div>
            </div>
          </div>
        </div>

        <div className="mb-6">
          <h4 className="text-sm font-semibold text-emerald-900 mb-4 flex items-center gap-2">
            <Target className="w-4 h-4" />
            Perbandingan Alternatif Kebijakan
          </h4>
          
          <div className="space-y-3">
            {decision.alternatives.map((alt) => {
              const isSelected = selectedAlternative === alt.id;
              const costStyle = costLabels[alt.costEstimate];
              const timeStyle = timeframeLabels[alt.timeframe];
              
              return (
                <div 
                  key={alt.id}
                  className={`p-4 rounded-xl border transition-all cursor-pointer ${
                    isSelected 
                      ? 'bg-white border-emerald-300 shadow-md' 
                      : 'bg-white/50 border-slate-200 hover:border-emerald-200'
                  }`}
                  onClick={() => setSelectedAlternative(isSelected ? null : alt.id)}
                >
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex items-center gap-3">
                      <h5 className="font-semibold text-slate-900">{alt.name}</h5>
                      <div className="flex gap-1">
                        <span className={`text-[10px] px-2 py-0.5 rounded-full ${costStyle.color}`}>
                          {costStyle.text}
                        </span>
                        <span className={`text-[10px] px-2 py-0.5 rounded-full ${timeStyle.color}`}>
                          {timeStyle.text}
                        </span>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-xs text-slate-400">Est. Impact</div>
                      <div className="text-sm font-bold text-emerald-600">{alt.estimatedImpact.value}</div>
                      <div className="text-[10px] text-slate-500">{alt.estimatedImpact.metric}</div>
                    </div>
                  </div>
                  
                  <p className="text-sm text-slate-600 mb-3">{alt.description}</p>
                  
                  {isSelected && (
                    <div className="pt-3 border-t border-slate-100 grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <div className="text-xs font-medium text-emerald-600 mb-2 flex items-center gap-1">
                          <CheckCircle2 className="w-3 h-3" />
                          Kelebihan
                        </div>
                        <ul className="space-y-1">
                          {alt.pros.map((pro, idx) => (
                            <li key={idx} className="text-xs text-slate-600 flex items-start gap-2">
                              <span className="text-emerald-500 mt-0.5">+</span>
                              {pro}
                            </li>
                          ))}
                        </ul>
                      </div>
                      <div>
                        <div className="text-xs font-medium text-red-600 mb-2 flex items-center gap-1">
                          <XCircle className="w-3 h-3" />
                          Kekurangan
                        </div>
                        <ul className="space-y-1">
                          {alt.cons.map((con, idx) => (
                            <li key={idx} className="text-xs text-slate-600 flex items-start gap-2">
                              <span className="text-red-400 mt-0.5">-</span>
                              {con}
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  )}
                  
                  {!isSelected && (
                    <div className="text-xs text-emerald-600 flex items-center gap-1 mt-2">
                      Klik untuk detail <ArrowRight className="w-3 h-3" />
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        <div className="mb-6 p-4 bg-amber-50/50 rounded-xl border border-amber-200">
          <div className="flex items-start gap-3">
            <div className="p-2 bg-amber-100 rounded-lg text-amber-600 mt-0.5">
              <Lightbulb className="w-5 h-5" />
            </div>
            <div className="flex-1">
              <h4 className="font-semibold text-amber-900 text-sm mb-2">
                Rasional Keputusan
              </h4>
              <p className="text-sm text-amber-800 leading-relaxed mb-3">
                {decision.decisionRationale.keyInsight}
              </p>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <div className="text-xs font-medium text-amber-700 mb-1">Alternatif yang Dibandingkan</div>
                  <div className="flex flex-wrap gap-1">
                    {decision.decisionRationale.comparedAlternatives.map((alt, idx) => (
                      <Badge key={idx} variant="warning" className="text-[10px]">
                        {alt}
                      </Badge>
                    ))}
                  </div>
                </div>
                <div>
                  <div className="text-xs font-medium text-amber-700 mb-1">Indikator Utama</div>
                  <p className="text-sm text-amber-800">{decision.decisionRationale.primaryIndicator}</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="mb-6 p-4 bg-blue-50/60 rounded-xl border border-blue-200">
          <h4 className="font-semibold text-blue-900 text-sm mb-2">Trace Perhitungan Keputusan</h4>
          <p className="text-xs text-blue-800 mb-3">
            Metode: <strong>{decision.decisionTrace.method}</strong> | Bobot: Impact {Math.round(decision.decisionTrace.weights.impact * 100)}%,
            Feasibility {Math.round(decision.decisionTrace.weights.feasibility * 100)}%, Risk {Math.round(decision.decisionTrace.weights.risk * 100)}%,
            Time-to-Value {Math.round(decision.decisionTrace.weights.timeToValue * 100)}%
          </p>
          <div className="space-y-2">
            {decision.decisionTrace.ranking.map((item, index) => (
              <div key={item.alternativeId} className="rounded-lg border border-blue-100 bg-white p-3">
                <div className="flex items-center justify-between gap-3 mb-1">
                  <div className="text-sm font-medium text-slate-900">#{index + 1} {item.alternativeName}</div>
                  <div className="text-sm font-bold text-blue-700">{item.weightedScore.toFixed(2)}</div>
                </div>
                <div className="text-xs text-slate-600">
                  Impact {item.scoreBreakdown.impact} | Feasibility {item.scoreBreakdown.feasibility} | Risk {item.scoreBreakdown.risk} | Time {item.scoreBreakdown.timeToValue}
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="p-4 bg-white rounded-xl border border-slate-200">
          <h4 className="text-sm font-semibold text-slate-900 mb-4 flex items-center gap-2">
            <FileText className="w-4 h-4" />
            Rencana Implementasi
          </h4>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <div className="text-xs font-medium text-slate-500 mb-2 flex items-center gap-1">
                <TrendingUp className="w-3 h-3" />
                Langkah-langkah
              </div>
              <ol className="space-y-2">
                {decision.implementation.steps.map((step, idx) => (
                  <li key={idx} className="text-sm text-slate-700 flex items-start gap-2">
                    <span className="flex-shrink-0 w-5 h-5 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center text-xs font-medium">
                      {idx + 1}
                    </span>
                    {step}
                  </li>
                ))}
              </ol>
            </div>
            
            <div className="space-y-4">
              <div>
                <div className="text-xs font-medium text-slate-500 mb-2 flex items-center gap-1">
                  <Building2 className="w-3 h-3" />
                  Pihak Bertanggung Jawab
                </div>
                <div className="flex flex-wrap gap-1">
                  {decision.implementation.responsibleParties.map((party, idx) => (
                    <Badge key={idx} variant="default" className="text-xs">
                      {party}
                    </Badge>
                  ))}
                </div>
              </div>
              
              <div>
                <div className="text-xs font-medium text-slate-500 mb-2">Timeline</div>
                <p className="text-sm text-slate-700">{decision.implementation.timeline}</p>
              </div>
              
              <div>
                <div className="text-xs font-medium text-slate-500 mb-2 flex items-center gap-1">
                  <BarChart3 className="w-3 h-3" />
                  Metrik Keberhasilan
                </div>
                <ul className="space-y-1">
                  {decision.implementation.successMetrics.map((metric, idx) => (
                    <li key={idx} className="text-xs text-slate-600 flex items-center gap-2">
                      <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full" />
                      {metric}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-6 p-4 bg-gradient-to-r from-emerald-600 to-teal-600 rounded-xl text-white">
          <div className="flex items-center gap-2 mb-2">
            <TrendingUp className="w-4 h-4 text-emerald-200" />
            <h4 className="font-semibold text-sm">Konsep Data-Driven Decision Making</h4>
          </div>
          <p className="text-xs text-emerald-100 leading-relaxed">
            Keputusan berbasis data menggunakan <strong>evidence dari dashboard BI</strong> untuk memilih 
            kebijakan optimal. Proses ini melibatkan: (1) Identifikasi masalah dari data, 
            (2) Generasi alternatif solusi, (3) Evaluasi berdasarkan indikator KPI, 
            (4) Seleksi kebijakan terbaik, dan (5) Monitoring implementasi dengan metrik yang terukur.
          </p>
        </div>
      </CardContent>
    </Card>
  );
}
