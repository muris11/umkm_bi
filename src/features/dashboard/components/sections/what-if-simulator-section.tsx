'use client';

import { useEffect, useMemo, useState } from 'react';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
  ArrowRight,
  BarChart3,
  Building2,
  Calculator,
  Lightbulb,
  Play,
  RotateCcw,
  Target,
  TrendingUp,
  Users,
  Wallet,
} from 'lucide-react';
import type { DashboardViewModelExtended } from '../../types';

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

interface WhatIfSimulatorSectionProps {
  viewModel: DashboardViewModelExtended;
}

function buildDefaultVariables(viewModel: DashboardViewModelExtended): ScenarioVariable[] {
  const baselineUmkm = Math.max(1, viewModel.kpiSummary.totalUmkm);
  const avgDigital = viewModel.kpiSummary.avgPersenDigital;
  const avgFinancing = viewModel.kpiSummary.avgPersenAksesPembiayaan;
  const baselineBudget = Math.max(10, Math.round(viewModel.topKecamatan.reduce((acc, item) => acc + item.totalAnggaranMiliar, 0) / 10));

  return [
    {
      id: 'budget',
      name: 'Anggaran Program',
      unit: 'Miliar Rp',
      min: Math.max(10, Math.round(baselineBudget * 0.4)),
      max: Math.max(120, Math.round(baselineBudget * 2.2)),
      step: 5,
      defaultValue: baselineBudget,
      currentValue: baselineBudget,
      impact: 'positive',
    },
    {
      id: 'coverage',
      name: 'Jumlah UMKM Target',
      unit: 'Unit',
      min: 100,
      max: Math.max(1000, Math.round(baselineUmkm * 0.35)),
      step: 100,
      defaultValue: Math.max(100, Math.round(baselineUmkm * 0.08)),
      currentValue: Math.max(100, Math.round(baselineUmkm * 0.08)),
      impact: 'positive',
    },
    {
      id: 'digital-adoption',
      name: 'Target Digitalisasi',
      unit: '%',
      min: Math.max(20, Math.floor(avgDigital)),
      max: 95,
      step: 1,
      defaultValue: Math.min(95, Math.round(avgDigital + 10)),
      currentValue: Math.min(95, Math.round(avgDigital + 10)),
      impact: 'positive',
    },
    {
      id: 'financing-access',
      name: 'Akses Pembiayaan',
      unit: '%',
      min: Math.max(10, Math.floor(avgFinancing)),
      max: 90,
      step: 1,
      defaultValue: Math.min(90, Math.round(avgFinancing + 8)),
      currentValue: Math.min(90, Math.round(avgFinancing + 8)),
      impact: 'positive',
    },
    {
      id: 'implementation-time',
      name: 'Waktu Implementasi',
      unit: 'Bulan',
      min: 6,
      max: 36,
      step: 1,
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
      step: 1,
      defaultValue: 75,
      currentValue: 75,
      impact: 'positive',
    },
  ];
}

export function WhatIfSimulatorSection({ viewModel }: WhatIfSimulatorSectionProps) {
  const baselineUmkm = Math.max(1, viewModel.kpiSummary.totalUmkm);
  const baselineEmployment = Math.max(1, viewModel.kpiSummary.totalTenagaKerja);
  const baselineEconomy = Math.max(1, viewModel.kpiSummary.totalOmzetMiliar);

  const baselineVariables = useMemo(() => buildDefaultVariables(viewModel), [viewModel]);

  const [variables, setVariables] = useState<ScenarioVariable[]>(baselineVariables);
  const [isSimulating, setIsSimulating] = useState(false);
  const [results, setResults] = useState<ScenarioResult | null>(null);

  useEffect(() => {
    setVariables(baselineVariables);
    setResults(null);
  }, [baselineVariables]);

  const handleVariableChange = (id: string, value: number) => {
    setVariables((prev) => prev.map((v) => (v.id === id ? { ...v, currentValue: value } : v)));
    setResults(null);
  };

  const resetVariables = () => {
    setVariables(baselineVariables);
    setResults(null);
  };

  const runSimulation = () => {
    setIsSimulating(true);

    setTimeout(() => {
      const budget = variables.find((v) => v.id === 'budget')?.currentValue ?? baselineVariables[0].defaultValue;
      const coverage = variables.find((v) => v.id === 'coverage')?.currentValue ?? baselineVariables[1].defaultValue;
      const digitalTarget = variables.find((v) => v.id === 'digital-adoption')?.currentValue ?? baselineVariables[2].defaultValue;
      const financingTarget = variables.find((v) => v.id === 'financing-access')?.currentValue ?? baselineVariables[3].defaultValue;
      const timeline = variables.find((v) => v.id === 'implementation-time')?.currentValue ?? baselineVariables[4].defaultValue;
      const successRate = variables.find((v) => v.id === 'success-rate')?.currentValue ?? baselineVariables[5].defaultValue;

      const coverageRate = Math.min(1, coverage / baselineUmkm);
      const adoptionLift = Math.max(0, (digitalTarget - viewModel.kpiSummary.avgPersenDigital) / 100);
      const financingLift = Math.max(0, (financingTarget - viewModel.kpiSummary.avgPersenAksesPembiayaan) / 100);
      const timeFactor = Math.max(0.5, 1 - (timeline - 12) / 40);
      const successFactor = successRate / 100;

      const efficiency = (0.35 + adoptionLift * 0.8 + financingLift * 0.6) * successFactor * timeFactor;
      const umkmGrowth = baselineUmkm * coverageRate * efficiency * 0.08;
      const employmentPerUmkm = baselineEmployment / baselineUmkm;
      const employmentImpact = umkmGrowth * employmentPerUmkm;
      const economicImpact = baselineEconomy * coverageRate * efficiency * 0.12;
      const roi = ((economicImpact - budget) / Math.max(budget, 1)) * 100;

      let riskLevel: 'low' | 'medium' | 'high' = 'medium';
      if (successRate >= 80 && timeline <= 18 && roi > 20) riskLevel = 'low';
      else if (successRate < 60 || timeline > 24 || roi < 0) riskLevel = 'high';

      const confidence = Math.max(
        50,
        Math.min(95, Math.round(successRate * 0.7 + Math.min(25, viewModel.meta.jumlahBaris / 600)))
      );

      const insights = [
        `Simulasi berbasis baseline ${baselineUmkm.toLocaleString('id-ID')} UMKM dan omzet ${baselineEconomy.toLocaleString('id-ID')} miliar per tahun.`,
        coverageRate < 0.05
          ? 'Cakupan program masih kecil terhadap populasi UMKM. Pertimbangkan ekspansi target bertahap.'
          : 'Cakupan program cukup signifikan untuk mendorong perubahan indikator makro.',
        digitalTarget > viewModel.kpiSummary.avgPersenDigital + 15
          ? 'Target digitalisasi agresif. Pastikan ada dukungan pelatihan dan adopsi platform yang memadai.'
          : 'Target digitalisasi realistis terhadap kondisi baseline saat ini.',
        roi > 25
          ? 'Proyeksi ROI sangat kuat, skenario layak diprioritaskan untuk implementasi.'
          : roi > 10
          ? 'Proyeksi ROI positif, namun masih ada ruang optimasi efisiensi program.'
          : 'Proyeksi ROI rendah/negatif, perlu revisi cakupan, timeline, atau kualitas intervensi.',
      ];

      setResults({
        umkmGrowth,
        employmentImpact: Math.round(employmentImpact),
        economicImpact: Number(economicImpact.toFixed(1)),
        roi: Number(roi.toFixed(1)),
        riskLevel,
        confidence,
        insights,
      });

      setIsSimulating(false);
    }, 1200);
  };

  const getRiskBadge = (level: string) => {
    switch (level) {
      case 'low':
        return { variant: 'success', text: 'Risiko Rendah' };
      case 'medium':
        return { variant: 'warning', text: 'Risiko Sedang' };
      case 'high':
        return { variant: 'error', text: 'Risiko Tinggi' };
      default:
        return { variant: 'default', text: level };
    }
  };

  return (
    <Card className="mb-8 overflow-hidden border-emerald-200 bg-gradient-to-br from-emerald-50/50 to-white">
      <CardHeader className="border-b border-emerald-100 p-4 pb-3 sm:p-6 sm:pb-4">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between sm:gap-0">
          <div className="flex items-center gap-2 sm:gap-3">
            <div className="shrink-0 rounded-lg bg-emerald-100 p-2 text-emerald-600 sm:rounded-xl sm:p-2.5">
              <Calculator className="h-5 w-5 sm:h-6 sm:w-6" />
            </div>
            <div className="min-w-0">
              <CardTitle className="text-lg text-emerald-900 sm:text-xl">What-If Scenario Simulator</CardTitle>
              <p className="mt-0.5 text-xs text-emerald-600 sm:mt-1 sm:text-sm">
                Simulasi dampak kebijakan dengan variabel berbasis data aktif
              </p>
            </div>
          </div>
          <button
            onClick={resetVariables}
            className="self-start rounded-lg border border-slate-200 bg-white px-2.5 py-2 text-xs font-medium text-slate-600 transition-colors hover:border-emerald-300 sm:self-auto sm:px-3 sm:text-sm"
          >
            <span className="flex items-center gap-1.5 sm:gap-2">
              <RotateCcw className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
              Reset
            </span>
          </button>
        </div>
      </CardHeader>

      <CardContent className="p-3 sm:p-6">
        <div className="mb-4 rounded-lg border border-emerald-200 bg-emerald-50 p-3 text-[10px] text-emerald-800 sm:text-xs">
          Baseline saat ini: {baselineUmkm.toLocaleString('id-ID')} UMKM, {baselineEmployment.toLocaleString('id-ID')} tenaga kerja,
          dan omzet {baselineEconomy.toLocaleString('id-ID')} miliar per tahun.
        </div>

        <div className="grid grid-cols-1 gap-4 sm:gap-6 lg:grid-cols-2">
          <div className="space-y-3 sm:space-y-4">
            <div className="mb-2 flex items-center justify-between">
              <span className="text-sm font-semibold text-slate-900 sm:text-base">Variabel Kebijakan</span>
              <Badge variant="default" className="text-xs">{variables.length} variabel</Badge>
            </div>

            {variables.map((variable) => (
              <div key={variable.id} className="rounded-lg border border-slate-200 bg-white p-3 sm:rounded-xl sm:p-4">
                <div className="mb-2 flex items-center justify-between sm:mb-3">
                  <div className="mr-2 flex min-w-0 items-center gap-2">
                    {variable.impact === 'positive' ? (
                      <TrendingUp className="h-3.5 w-3.5 shrink-0 text-emerald-500 sm:h-4 sm:w-4" />
                    ) : variable.impact === 'negative' ? (
                      <TrendingUp className="h-3.5 w-3.5 shrink-0 rotate-180 text-red-500 sm:h-4 sm:w-4" />
                    ) : (
                      <Target className="h-3.5 w-3.5 shrink-0 text-slate-400 sm:h-4 sm:w-4" />
                    )}
                    <span className="truncate text-sm font-medium text-slate-900">{variable.name}</span>
                  </div>
                  <Badge variant="info" className="shrink-0 font-mono text-xs">
                    {variable.currentValue} {variable.unit}
                  </Badge>
                </div>

                <input
                  type="range"
                  min={variable.min}
                  max={variable.max}
                  step={variable.step}
                  value={variable.currentValue}
                  onChange={(event) => handleVariableChange(variable.id, Number(event.target.value))}
                  className="h-2 w-full cursor-pointer appearance-none rounded-lg bg-slate-200 accent-emerald-600"
                />

                <div className="mt-1 flex justify-between text-[10px] text-slate-400">
                  <span>{variable.min} {variable.unit}</span>
                  <span className="hidden sm:inline">Default: {variable.defaultValue}</span>
                  <span>{variable.max} {variable.unit}</span>
                </div>
              </div>
            ))}

            <button
              onClick={runSimulation}
              disabled={isSimulating}
              className="w-full rounded-lg bg-emerald-600 px-4 py-2.5 text-sm font-medium text-white transition-colors hover:bg-emerald-700 disabled:cursor-not-allowed disabled:opacity-50 sm:rounded-xl sm:py-3 sm:text-base"
            >
              <span className="flex items-center justify-center gap-2">
                {isSimulating ? (
                  <>
                    <div className="h-4 w-4 animate-spin rounded-full border-2 border-white/30 border-t-white" />
                    <span>Menghitung...</span>
                  </>
                ) : (
                  <>
                    <Play className="h-4 w-4" />
                    <span>Jalankan Simulasi</span>
                  </>
                )}
              </span>
            </button>
          </div>

          <div className="space-y-3 sm:space-y-4">
            {results ? (
              <>
                <div className="grid grid-cols-2 gap-2 sm:gap-3">
                  <div className="rounded-lg border border-slate-200 bg-white p-3 sm:rounded-xl sm:p-4">
                    <div className="mb-1.5 flex items-center gap-1.5 sm:mb-2 sm:gap-2">
                      <Building2 className="h-3.5 w-3.5 text-emerald-600 sm:h-4 sm:w-4" />
                      <span className="truncate text-[10px] text-slate-500 sm:text-xs">Pertumbuhan UMKM</span>
                    </div>
                    <div className="text-xl font-bold text-slate-900 sm:text-2xl">+{results.umkmGrowth.toFixed(0)}</div>
                    <div className="text-[10px] text-slate-400 sm:text-xs">unit baru</div>
                  </div>

                  <div className="rounded-lg border border-slate-200 bg-white p-3 sm:rounded-xl sm:p-4">
                    <div className="mb-1.5 flex items-center gap-1.5 sm:mb-2 sm:gap-2">
                      <Users className="h-3.5 w-3.5 text-blue-600 sm:h-4 sm:w-4" />
                      <span className="truncate text-[10px] text-slate-500 sm:text-xs">Lapangan Kerja</span>
                    </div>
                    <div className="text-xl font-bold text-slate-900 sm:text-2xl">+{results.employmentImpact.toLocaleString('id-ID')}</div>
                    <div className="text-[10px] text-slate-400 sm:text-xs">tenaga kerja</div>
                  </div>

                  <div className="rounded-lg border border-slate-200 bg-white p-3 sm:rounded-xl sm:p-4">
                    <div className="mb-1.5 flex items-center gap-1.5 sm:mb-2 sm:gap-2">
                      <Wallet className="h-3.5 w-3.5 text-violet-600 sm:h-4 sm:w-4" />
                      <span className="truncate text-[10px] text-slate-500 sm:text-xs">Dampak Ekonomi</span>
                    </div>
                    <div className="text-xl font-bold text-slate-900 sm:text-2xl">Rp {results.economicImpact.toLocaleString('id-ID')}M</div>
                    <div className="text-[10px] text-slate-400 sm:text-xs">tambahan/tahun</div>
                  </div>

                  <div className="rounded-lg border border-slate-200 bg-white p-3 sm:rounded-xl sm:p-4">
                    <div className="mb-1.5 flex items-center gap-1.5 sm:mb-2 sm:gap-2">
                      <BarChart3 className="h-3.5 w-3.5 text-amber-600 sm:h-4 sm:w-4" />
                      <span className="truncate text-[10px] text-slate-500 sm:text-xs">ROI</span>
                    </div>
                    <div className={`text-xl font-bold sm:text-2xl ${results.roi > 0 ? 'text-emerald-600' : 'text-red-600'}`}>
                      {results.roi > 0 ? '+' : ''}{results.roi}%
                    </div>
                    <div className="text-[10px] text-slate-400 sm:text-xs">return</div>
                  </div>
                </div>

                <div className="flex flex-wrap gap-2 sm:gap-3">
                  <Badge
                    variant={results.riskLevel === 'low' ? 'success' : results.riskLevel === 'medium' ? 'warning' : 'error'}
                    className="text-[10px] sm:text-xs"
                  >
                    {getRiskBadge(results.riskLevel).text}
                  </Badge>
                  <Badge variant="info" className="text-[10px] sm:text-xs">
                    Confidence: {results.confidence}%
                  </Badge>
                </div>

                <div className="rounded-lg border border-amber-200 bg-amber-50 p-3 sm:rounded-xl sm:p-4">
                  <div className="mb-2 flex items-center gap-2 sm:mb-3">
                    <Lightbulb className="h-4 w-4 text-amber-600 sm:h-5 sm:w-5" />
                    <span className="text-sm font-semibold text-amber-900 sm:text-base">Insight & Rekomendasi</span>
                  </div>
                  <ul className="space-y-2">
                    {results.insights.map((insight, idx) => (
                      <li key={idx} className="flex items-start gap-2 text-xs text-amber-800 sm:text-sm">
                        <ArrowRight className="mt-0.5 h-3.5 w-3.5 shrink-0 text-amber-500 sm:h-4 sm:w-4" />
                        <span className="leading-relaxed">{insight}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="rounded-lg bg-emerald-600 p-3 text-white sm:rounded-xl sm:p-4">
                  <div className="mb-2 text-xs font-semibold sm:text-sm">Kesimpulan Simulasi</div>
                  <p className="text-[10px] leading-relaxed text-emerald-100 sm:text-xs">
                    Dengan anggaran Rp {variables.find((v) => v.id === 'budget')?.currentValue} miliar dan target{' '}
                    {variables.find((v) => v.id === 'coverage')?.currentValue?.toLocaleString('id-ID')} UMKM,
                    proyeksi ROI {results.roi > 0 ? 'positif' : 'negatif'} sebesar {results.roi}%.
                    {results.riskLevel === 'low'
                      ? ' Risk profile rendah, rekomendasi untuk implementasi.'
                      : results.riskLevel === 'medium'
                      ? ' Risk profile sedang, perlu mitigation plan.'
                      : ' Risk profile tinggi, evaluasi ulang parameter kritis.'}
                  </p>
                </div>
              </>
            ) : (
              <div className="flex min-h-[200px] h-full flex-col items-center justify-center rounded-lg border-2 border-dashed border-slate-200 p-6 sm:rounded-xl sm:p-8">
                <Calculator className="mb-4 h-12 w-12 text-slate-300 sm:h-16 sm:w-16" />
                <p className="text-center text-sm text-slate-500">Sesuaikan variabel di sebelah kiri</p>
                <p className="mt-1 text-center text-xs text-slate-400">Jalankan simulasi untuk melihat dampak kebijakan</p>
              </div>
            )}
          </div>
        </div>

        <div className="mt-4 rounded-lg bg-gradient-to-r from-emerald-600 to-teal-600 p-3 text-white sm:mt-6 sm:rounded-xl sm:p-4">
          <div className="mb-2 flex items-center gap-2">
            <Target className="h-3.5 w-3.5 text-emerald-200 sm:h-4 sm:w-4" />
            <h4 className="text-xs font-semibold sm:text-sm">Apa itu What-If Analysis?</h4>
          </div>
          <p className="text-[10px] leading-relaxed text-emerald-100 sm:text-xs">
            What-If Analysis membantu mengeksplorasi trade-off antar kebijakan sebelum komitmen sumber daya.
            Simulasi di atas memakai baseline data aktual dashboard, bukan asumsi statis.
          </p>
        </div>
      </CardContent>
    </Card>
  );
}
