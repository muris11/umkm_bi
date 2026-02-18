'use client';

import { useState, useMemo } from 'react';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { 
  Calculator, 
  TrendingUp, 
  Users, 
  Wallet,
  Building2,
  RotateCcw,
  Play,
  Lightbulb,
  ArrowRight,
  Target,
  BarChart3
} from 'lucide-react';

interface ScenarioVariable {
  id: string;
  name: string;
  unit: string;
  min: number;
  max: number;
  step: number;
  defaultValue: number;
  currentValue: number;
  impact: 'positive' | 'negative' | 'neutral';
}

interface ScenarioResult {
  umkmGrowth: number;
  employmentImpact: number;
  economicImpact: number;
  roi: number;
  riskLevel: 'low' | 'medium' | 'high';
  confidence: number;
  insights: string[];
}

const defaultVariables: ScenarioVariable[] = [
  {
    id: 'budget',
    name: 'Anggaran Program',
    unit: 'Miliar Rp',
    min: 10,
    max: 200,
    step: 10,
    defaultValue: 50,
    currentValue: 50,
    impact: 'positive',
  },
  {
    id: 'coverage',
    name: 'Jumlah UMKM Target',
    unit: 'Unit',
    min: 100,
    max: 5000,
    step: 100,
    defaultValue: 500,
    currentValue: 500,
    impact: 'positive',
  },
  {
    id: 'digital-adoption',
    name: 'Target Digitalisasi',
    unit: '%',
    min: 20,
    max: 90,
    step: 5,
    defaultValue: 60,
    currentValue: 60,
    impact: 'positive',
  },
  {
    id: 'financing-access',
    name: 'Akses Pembiayaan',
    unit: '%',
    min: 10,
    max: 70,
    step: 5,
    defaultValue: 40,
    currentValue: 40,
    impact: 'positive',
  },
  {
    id: 'implementation-time',
    name: 'Waktu Implementasi',
    unit: 'Bulan',
    min: 6,
    max: 36,
    step: 3,
    defaultValue: 18,
    currentValue: 18,
    impact: 'negative',
  },
  {
    id: 'success-rate',
    name: 'Tingkat Keberhasilan',
    unit: '%',
    min: 30,
    max: 95,
    step: 5,
    defaultValue: 75,
    currentValue: 75,
    impact: 'positive',
  },
];

export function WhatIfSimulatorSection() {
  const [variables, setVariables] = useState<ScenarioVariable[]>(defaultVariables);
  const [isSimulating, setIsSimulating] = useState(false);
  const [results, setResults] = useState<ScenarioResult | null>(null);
  const [showComparison, setShowComparison] = useState(false);

  const handleVariableChange = (id: string, value: number) => {
    setVariables(prev => prev.map(v => 
      v.id === id ? { ...v, currentValue: value } : v
    ));
    setResults(null);
  };

  const resetVariables = () => {
    setVariables(defaultVariables);
    setResults(null);
  };

  const runSimulation = () => {
    setIsSimulating(true);
    
    setTimeout(() => {
      const budget = variables.find(v => v.id === 'budget')?.currentValue || 50;
      const coverage = variables.find(v => v.id === 'coverage')?.currentValue || 500;
      const digital = variables.find(v => v.id === 'digital-adoption')?.currentValue || 60;
      const financing = variables.find(v => v.id === 'financing-access')?.currentValue || 40;
      const time = variables.find(v => v.id === 'implementation-time')?.currentValue || 18;
      const success = variables.find(v => v.id === 'success-rate')?.currentValue || 75;

      const budgetPerUMKM = (budget * 1000000000) / coverage;
      const efficiency = (digital * 0.4 + financing * 0.6) * (success / 100);
      const timeFactor = Math.max(0.5, 1 - (time - 12) / 48);

      const umkmGrowth = (coverage * (success / 100) * 0.3);
      const employmentImpact = umkmGrowth * 2.1;
      const economicImpact = (budget * efficiency * timeFactor) / 100;
      const roi = ((economicImpact - budget) / budget) * 100;

      let riskLevel: 'low' | 'medium' | 'high' = 'medium';
      if (success > 80 && budgetPerUMKM > 5000000) riskLevel = 'low';
      else if (success < 60 || budgetPerUMKM < 2000000) riskLevel = 'high';

      const confidence = Math.min(95, success * 0.8 + (budgetPerUMKM / 1000000));

      const insights = [
        budgetPerUMKM < 3000000 
          ? 'Anggaran per UMKM relatif rendah, pertimbangkan scaling down target atau meningkatkan budget'
          : 'Anggaran per UMKM dalam range ideal (Rp 5-10 juta)',
        
        digital > financing
          ? 'Fokus digitalisasi lebih tinggi dari akses pembiayaan. Pastikan UMKM memiliki modal untuk implementasi digital'
          : 'Keseimbangan digitalisasi dan pembiayaan optimal',
        
        time > 24
          ? 'Waktu implementasi panjang, risiko perubahan kebijakan dan stakeholder fatigue meningkat'
          : 'Timeline implementasi realistis dan achievable',
        
        roi > 50
          ? 'ROI proyeksi sangat menguntungkan, rekomendasi untuk proceed'
          : roi > 20
          ? 'ROI positif namun perlu optimasi efisiensi'
          : 'ROI marginal, evaluasi kembali strategi intervensi',
      ];

      setResults({
        umkmGrowth,
        employmentImpact: Math.round(employmentImpact),
        economicImpact: Math.round(economicImpact * 10) / 10,
        roi: Math.round(roi * 10) / 10,
        riskLevel,
        confidence: Math.round(confidence),
        insights,
      });

      setIsSimulating(false);
    }, 1500);
  };

  const getRiskBadge = (level: string) => {
    switch (level) {
      case 'low': return { variant: 'success', text: 'Risiko Rendah' };
      case 'medium': return { variant: 'warning', text: 'Risiko Sedang' };
      case 'high': return { variant: 'error', text: 'Risiko Tinggi' };
      default: return { variant: 'default', text: level };
    }
  };

  return (
    <Card className="mb-8 overflow-hidden border-emerald-200 bg-gradient-to-br from-emerald-50/50 to-white">
      <CardHeader className="pb-4 border-b border-emerald-100">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2.5 bg-emerald-100 rounded-xl text-emerald-600">
              <Calculator className="w-6 h-6" />
            </div>
            <div>
              <CardTitle className="text-emerald-900 text-xl">What-If Scenario Simulator</CardTitle>
              <p className="text-sm text-emerald-600 mt-1">
                Simulasi dampak kebijakan dengan mengubah variabel
              </p>
            </div>
          </div>
          <button
            onClick={resetVariables}
            className="flex items-center gap-2 px-3 py-2 text-sm font-medium text-slate-600 bg-white border border-slate-200 rounded-lg hover:border-emerald-300 transition-colors"
          >
            <RotateCcw className="w-4 h-4" />
            Reset
          </button>
        </div>
      </CardHeader>
      
      <CardContent className="p-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="space-y-4">
            <div className="flex items-center justify-between mb-2">
              <span className="font-semibold text-slate-900">Variabel Kebijakan</span>
              <Badge variant="default">{variables.length} variabel</Badge>
            </div>

            {variables.map((variable) => (
              <div key={variable.id} className="p-4 bg-white rounded-xl border border-slate-200">
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-2">
                    {variable.impact === 'positive' ? (
                      <TrendingUp className="w-4 h-4 text-emerald-500" />
                    ) : variable.impact === 'negative' ? (
                      <TrendingUp className="w-4 h-4 text-red-500 rotate-180" />
                    ) : (
                      <Target className="w-4 h-4 text-slate-400" />
                    )}
                    <span className="font-medium text-slate-900">{variable.name}</span>
                  </div>
                  <Badge variant="info" className="font-mono">
                    {variable.currentValue} {variable.unit}
                  </Badge>
                </div>

                <input
                  type="range"
                  min={variable.min}
                  max={variable.max}
                  step={variable.step}
                  value={variable.currentValue}
                  onChange={(e) => handleVariableChange(variable.id, Number(e.target.value))}
                  className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-emerald-600"
                />

                <div className="flex justify-between text-[10px] text-slate-400 mt-1">
                  <span>{variable.min} {variable.unit}</span>
                  <span>Default: {variable.defaultValue}</span>
                  <span>{variable.max} {variable.unit}</span>
                </div>
              </div>
            ))}

            <button
              onClick={runSimulation}
              disabled={isSimulating}
              className="w-full flex items-center justify-center gap-2 py-3 px-4 bg-emerald-600 text-white rounded-xl font-medium hover:bg-emerald-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              {isSimulating ? (
                <>
                  <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  Menghitung Scenario...
                </>
              ) : (
                <>
                  <Play className="w-4 h-4" />
                  Jalankan Simulasi
                </>
              )}
            </button>
          </div>

          <div className="space-y-4">
            {results ? (
              <>
                <div className="grid grid-cols-2 gap-3">
                  <div className="p-4 bg-white rounded-xl border border-slate-200">
                    <div className="flex items-center gap-2 mb-2">
                      <Building2 className="w-4 h-4 text-emerald-600" />
                      <span className="text-xs text-slate-500">Pertumbuhan UMKM</span>
                    </div>
                    <div className="text-2xl font-bold text-slate-900">+{results.umkmGrowth.toFixed(0)}</div>
                    <div className="text-xs text-slate-400">unit baru</div>
                  </div>

                  <div className="p-4 bg-white rounded-xl border border-slate-200">
                    <div className="flex items-center gap-2 mb-2">
                      <Users className="w-4 h-4 text-blue-600" />
                      <span className="text-xs text-slate-500">Lapangan Kerja</span>
                    </div>
                    <div className="text-2xl font-bold text-slate-900">+{results.employmentImpact.toLocaleString()}</div>
                    <div className="text-xs text-slate-400">tenaga kerja</div>
                  </div>

                  <div className="p-4 bg-white rounded-xl border border-slate-200">
                    <div className="flex items-center gap-2 mb-2">
                      <Wallet className="w-4 h-4 text-violet-600" />
                      <span className="text-xs text-slate-500">Dampak Ekonomi</span>
                    </div>
                    <div className="text-2xl font-bold text-slate-900">Rp {results.economicImpact}M</div>
                    <div className="text-xs text-slate-400">per tahun</div>
                  </div>

                  <div className="p-4 bg-white rounded-xl border border-slate-200">
                    <div className="flex items-center gap-2 mb-2">
                      <BarChart3 className="w-4 h-4 text-amber-600" />
                      <span className="text-xs text-slate-500">ROI</span>
                    </div>
                    <div className={`text-2xl font-bold ${results.roi > 0 ? 'text-emerald-600' : 'text-red-600'}`}>
                      {results.roi > 0 ? '+' : ''}{results.roi}%
                    </div>
                    <div className="text-xs text-slate-400">return on investment</div>
                  </div>
                </div>

                <div className="flex gap-3">
                  <Badge 
                    variant={results.riskLevel === 'low' ? 'success' : results.riskLevel === 'medium' ? 'warning' : 'error'}
                    className="text-xs"
                  >
                    {getRiskBadge(results.riskLevel).text}
                  </Badge>
                  <Badge variant="info" className="text-xs">
                    Confidence: {results.confidence}%
                  </Badge>
                </div>

                <div className="p-4 bg-amber-50 rounded-xl border border-amber-200">
                  <div className="flex items-center gap-2 mb-3">
                    <Lightbulb className="w-5 h-5 text-amber-600" />
                    <span className="font-semibold text-amber-900">Insight & Rekomendasi</span>
                  </div>
                  <ul className="space-y-2">
                    {results.insights.map((insight, idx) => (
                      <li key={idx} className="flex items-start gap-2 text-sm text-amber-800">
                        <ArrowRight className="w-4 h-4 text-amber-500 mt-0.5 flex-shrink-0" />
                        {insight}
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="p-4 bg-emerald-600 rounded-xl text-white">
                  <div className="text-sm font-semibold mb-2">Kesimpulan Simulasi</div>
                  <p className="text-xs text-emerald-100 leading-relaxed">
                    Dengan anggaran Rp {variables.find(v => v.id === 'budget')?.currentValue} miliar dan target 
                    {variables.find(v => v.id === 'coverage')?.currentValue} UMKM, program diproyeksikan menghasilkan 
                    ROI {results.roi > 0 ? 'positif' : 'negatif'} sebesar {results.roi}%. 
                    {results.riskLevel === 'low' 
                      ? 'Risk profile rendah, rekomendasi untuk implementasi.' 
                      : results.riskLevel === 'medium'
                      ? 'Risk profile sedang, perlu mitigation plan.'
                      : 'Risk profile tinggi, evaluasi ulang parameter kritis.'}
                  </p>
                </div>
              </>
            ) : (
              <div className="h-full flex flex-col items-center justify-center p-8 border-2 border-dashed border-slate-200 rounded-xl">
                <Calculator className="w-16 h-16 text-slate-300 mb-4" />
                <p className="text-sm text-slate-500 text-center">
                  Sesuaikan variabel di sebelah kiri
                </p>
                <p className="text-xs text-slate-400 text-center mt-1">
                  Kemudian jalankan simulasi untuk melihat dampak kebijakan
                </p>
              </div>
            )}
          </div>
        </div>

        <div className="mt-6 p-4 bg-gradient-to-r from-emerald-600 to-teal-600 rounded-xl text-white">
          <div className="flex items-center gap-2 mb-2">
            <Target className="w-4 h-4 text-emerald-200" />
            <h4 className="font-semibold text-sm">Apa itu What-If Analysis?</h4>
          </div>
          <p className="text-xs text-emerald-100 leading-relaxed">
            What-If Analysis adalah teknik decision support yang memungkinkan Anda mengeksplorasi 
            berbagai skenario dengan mengubah variabel input. Ini membantu pembuat kebijakan memahami 
            trade-off antara anggaran, coverage, timeline, dan outcome sebelum komitmen resources. 
            <strong> Tidak ada prediksi yang 100% akurat</strong>, namun simulasi memberikan range 
            estimasi untuk perencanaan yang lebih informed.
          </p>
        </div>
      </CardContent>
    </Card>
  );
}
