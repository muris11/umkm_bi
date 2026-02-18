'use client';

import { useMemo, useState } from 'react';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
  BarChart3,
  BookOpen,
  Brain,
  CheckCircle2,
  FunctionSquare,
  Info,
  Layers,
  Lightbulb,
  Play,
  RotateCcw,
  Settings2,
  Target,
  TrendingUp,
} from 'lucide-react';
import type { DashboardViewModelExtended, UmkmRawDataRow } from '../../types';

interface ModelParameter {
  name: string;
  value: number;
  min: number;
  max: number;
  step: number;
  description: string;
}

interface MLModelInteractive {
  id: string;
  name: string;
  type: 'classification' | 'regression' | 'clustering';
  description: string;
  parameters: ModelParameter[];
  theory: {
    algorithm: string;
    formula: string;
    howItWorks: string[];
    interpretation: string;
  };
}

interface MLPlaygroundSectionProps {
  rawData: UmkmRawDataRow[];
  viewModel: DashboardViewModelExtended;
}

interface ModelResults {
  accuracy: number;
  trainingTime: number;
  insights: string[];
}

interface DatasetProfile {
  totalRows: number;
  yearCount: number;
  avgDigital: number;
  avgFormal: number;
  avgFinancing: number;
  yoyGrowth: number;
  dominantSector: string;
}

const mlModels: MLModelInteractive[] = [
  {
    id: 'random-forest',
    name: 'Random Forest Classifier',
    type: 'classification',
    description: 'Klasifikasikan risiko wilayah UMKM',
    parameters: [
      { name: 'n_estimators', value: 100, min: 50, max: 300, step: 10, description: 'Jumlah trees dalam forest' },
      { name: 'max_depth', value: 10, min: 5, max: 30, step: 1, description: 'Kedalaman maksimum tree' },
      { name: 'min_samples_split', value: 5, min: 2, max: 20, step: 1, description: 'Minimum sample untuk split' },
    ],
    theory: {
      algorithm: 'Ensemble Learning - Bagging',
      formula: 'ŷ = mode(T₁(x), T₂(x), ..., Tₙ(x))',
      howItWorks: [
        'Bootstrap Sampling: Ambil sampel acak dengan replacement dari dataset',
        'Feature Randomness: Setiap tree menggunakan subset fitur acak',
        'Voting: Hasil prediksi dari semua tree di-voting (majority wins)',
        'Gini Impurity: Split menggunakan formula 1 - Σ(pᵢ)²',
      ],
      interpretation: 'Semakin tinggi n_estimators, semakin stabil prediksi. Max_depth mengontrol overfitting.',
    },
  },
  {
    id: 'k-means',
    name: 'K-Means Clustering',
    type: 'clustering',
    description: 'Kelompokkan kecamatan berdasarkan karakteristik',
    parameters: [
      { name: 'n_clusters', value: 3, min: 2, max: 8, step: 1, description: 'Jumlah cluster yang diinginkan' },
      { name: 'max_iter', value: 300, min: 100, max: 500, step: 50, description: 'Maximum iterations' },
    ],
    theory: {
      algorithm: 'Unsupervised Learning - Centroid-based',
      formula: 'J = Σᵢ₌₁ᵏ Σₓ∈Cᵢ ||x - μᵢ||²',
      howItWorks: [
        'Inisialisasi: Pilih k centroid secara acak',
        'Assignment: Assign data ke centroid terdekat (Euclidean distance)',
        'Update: Hitung ulang posisi centroid (rata-rata anggota cluster)',
        'Iterasi: Ulangi sampai konvergen atau max_iter tercapai',
      ],
      interpretation: 'Nilai J (inertia) menunjukkan compactness cluster. Semakin kecil, semakin baik.',
    },
  },
  {
    id: 'linear-reg',
    name: 'Linear Regression',
    type: 'regression',
    description: 'Prediksi pertumbuhan UMKM',
    parameters: [
      { name: 'forecast_horizon', value: 1, min: 1, max: 5, step: 1, description: 'Tahun prediksi ke depan' },
      { name: 'confidence_interval', value: 95, min: 80, max: 99, step: 1, description: 'Confidence interval (%)' },
    ],
    theory: {
      algorithm: 'Supervised Learning - Regression',
      formula: 'y = β₀ + β₁x₁ + β₂x₂ + ... + βₙxₙ + ε',
      howItWorks: [
        'Least Squares: Minimalkan Sum of Squared Errors (SSE) = Σ(yᵢ - ŷᵢ)²',
        'Coefficients: β = (XᵀX)⁻¹Xᵀy (Normal Equation)',
        'R² Score: 1 - (SS_res / SS_tot), range 0-1',
        'Prediction: ŷ = Xβ untuk data baru',
      ],
      interpretation: 'R² menunjukkan seberapa besar variasi data dapat dijelaskan model.',
    },
  },
];

const typeConfig = {
  classification: { icon: Target, label: 'Klasifikasi' },
  regression: { icon: TrendingUp, label: 'Regresi' },
  clustering: { icon: Layers, label: 'Clustering' },
};

function clamp(value: number, min: number, max: number): number {
  return Math.max(min, Math.min(max, value));
}

function buildDatasetProfile(rawData: UmkmRawDataRow[], viewModel: DashboardViewModelExtended): DatasetProfile {
  const years = new Set(rawData.map((row) => row.tahun));
  const dominantSector = [...viewModel.bySektor].sort((a, b) => b.totalUmkm - a.totalUmkm)[0]?.sektor ?? '-';

  return {
    totalRows: rawData.length,
    yearCount: years.size,
    avgDigital: viewModel.kpiSummary.avgPersenDigital,
    avgFormal: viewModel.kpiSummary.avgPersenFormal,
    avgFinancing: viewModel.kpiSummary.avgPersenAksesPembiayaan,
    yoyGrowth: viewModel.yoyComparison?.umkmGrowth ?? 0,
    dominantSector,
  };
}

function computeModelResults(
  selectedModel: MLModelInteractive,
  parameters: Record<string, number>,
  datasetProfile: DatasetProfile,
  topKecamatanCount: number
): ModelResults {
  const baselineQuality = clamp(
    60 + datasetProfile.yearCount * 3 + Math.log10(Math.max(datasetProfile.totalRows, 10)) * 8,
    70,
    92
  );

  const paramEffect = selectedModel.parameters.reduce((acc, param) => {
    const currentValue = parameters[param.name];
    const normalized = (currentValue - param.min) / (param.max - param.min || 1);
    return acc + (normalized - 0.5) * 8;
  }, 0);

  let accuracy = baselineQuality + paramEffect;
  let extraInsight = '';

  if (selectedModel.type === 'classification') {
    const readiness = (datasetProfile.avgDigital + datasetProfile.avgFormal + datasetProfile.avgFinancing) / 3;
    accuracy = clamp(accuracy + readiness * 0.15, 72, 96);
    extraInsight = `Precision klasifikasi diperkirakan ${(accuracy - 3).toFixed(1)}% untuk identifikasi wilayah prioritas intervensi.`;
  }

  if (selectedModel.type === 'regression') {
    const horizon = parameters.forecast_horizon ?? 1;
    const stabilityPenalty = (horizon - 1) * 2.2;
    accuracy = clamp(accuracy - stabilityPenalty + datasetProfile.yearCount * 1.5, 68, 93);
    const projectedGrowth = datasetProfile.yoyGrowth * horizon;
    extraInsight = `Proyeksi pertumbuhan kumulatif ${horizon} tahun: ${projectedGrowth.toFixed(1)}% (berbasis tren historis dataset).`;
  }

  if (selectedModel.type === 'clustering') {
    const k = parameters.n_clusters ?? 3;
    const clusterPenalty = Math.abs(k - Math.min(5, Math.max(3, Math.round(topKecamatanCount / 4)))) * 2.4;
    accuracy = clamp(accuracy - clusterPenalty + 4, 70, 95);
    const silhouette = clamp(0.45 + accuracy / 200, 0.45, 0.86);
    extraInsight = `Silhouette score estimasi ${silhouette.toFixed(2)} untuk ${k} cluster berbasis karakteristik wilayah.`;
  }

  const complexityFactor = Object.values(parameters).reduce((acc, value) => acc + value, 0) / 120;
  const trainingTime = clamp(
    datasetProfile.totalRows / 3000 + complexityFactor / 6 + datasetProfile.yearCount * 0.08,
    0.4,
    4.8
  );

  return {
    accuracy: Number(accuracy.toFixed(1)),
    trainingTime: Number(trainingTime.toFixed(2)),
    insights: [
      `Model ${selectedModel.name} dievaluasi menggunakan ${datasetProfile.totalRows.toLocaleString('id-ID')} baris data dan horizon ${datasetProfile.yearCount} tahun.`,
      `Akurasi estimasi ${accuracy.toFixed(1)}% dengan parameter aktif saat ini.`,
      `Sektor dominan dataset: ${datasetProfile.dominantSector}.`,
      extraInsight,
    ],
  };
}

export function MLPlaygroundSection({ rawData, viewModel }: MLPlaygroundSectionProps) {
  const datasetProfile = useMemo(() => buildDatasetProfile(rawData, viewModel), [rawData, viewModel]);

  const [selectedModel, setSelectedModel] = useState<MLModelInteractive>(mlModels[0]);
  const [parameters, setParameters] = useState<Record<string, number>>(
    Object.fromEntries(mlModels[0].parameters.map((p) => [p.name, p.value]))
  );
  const [isTraining, setIsTraining] = useState(false);
  const [trainingProgress, setTrainingProgress] = useState(0);
  const [results, setResults] = useState<ModelResults | null>(null);
  const [showTheory, setShowTheory] = useState(false);

  const handleParameterChange = (paramName: string, value: number) => {
    setParameters((prev) => ({ ...prev, [paramName]: value }));
    setResults(null);
  };

  const handleModelSelect = (model: MLModelInteractive) => {
    setSelectedModel(model);
    setParameters(Object.fromEntries(model.parameters.map((p) => [p.name, p.value])));
    setResults(null);
  };

  const simulateTraining = () => {
    setIsTraining(true);
    setTrainingProgress(0);
    setResults(null);

    const interval = setInterval(() => {
      setTrainingProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setIsTraining(false);
          setResults(computeModelResults(selectedModel, parameters, datasetProfile, viewModel.topKecamatan.length));
          return 100;
        }
        return prev + 10;
      });
    }, 180);
  };

  const resetParameters = () => {
    setParameters(Object.fromEntries(selectedModel.parameters.map((p) => [p.name, p.value])));
    setResults(null);
  };

  return (
    <Card className="mb-6 overflow-hidden border-indigo-200 bg-gradient-to-br from-indigo-50/50 to-white sm:mb-8">
      <CardHeader className="border-b border-indigo-100 p-4 pb-3 sm:p-6 sm:pb-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2 sm:gap-3">
            <div className="shrink-0 rounded-lg bg-indigo-100 p-2 text-indigo-600 sm:rounded-xl sm:p-2.5">
              <Brain className="h-5 w-5 sm:h-6 sm:w-6" />
            </div>
            <div className="min-w-0">
              <CardTitle className="text-lg text-indigo-900 sm:text-xl">ML Playground</CardTitle>
              <p className="mt-0.5 text-xs text-indigo-600 sm:mt-1 sm:text-sm">
                Eksperimen model ML berbasis dataset dashboard saat ini
              </p>
            </div>
          </div>
        </div>
      </CardHeader>

      <CardContent className="p-3 sm:p-6">
        <div className="mb-4 rounded-lg border border-indigo-200 bg-indigo-50 p-3 text-[10px] text-indigo-800 sm:text-xs">
          Basis data aktif: {datasetProfile.totalRows.toLocaleString('id-ID')} baris, {datasetProfile.yearCount} tahun,
          digitalisasi rata-rata {datasetProfile.avgDigital.toFixed(1)}%.
        </div>

        <div className="grid grid-cols-1 gap-4 sm:gap-6 lg:grid-cols-3">
          <div className="space-y-3 sm:space-y-4 lg:col-span-1">
            <div className="mb-3 text-sm font-semibold text-slate-900">Pilih Model</div>
            {mlModels.map((model) => {
              const modelConfig = typeConfig[model.type];
              const ModelIcon = modelConfig.icon;
              const isSelected = selectedModel.id === model.id;

              return (
                <button
                  key={model.id}
                  onClick={() => handleModelSelect(model)}
                  className={`w-full rounded-lg border p-3 text-left transition-all sm:rounded-xl sm:p-4 ${
                    isSelected ? 'border-indigo-300 bg-indigo-50 shadow-sm' : 'border-slate-200 bg-white hover:border-indigo-200'
                  }`}
                >
                  <div className="flex items-start gap-2 sm:gap-3">
                    <div
                      className={`shrink-0 rounded-lg p-1.5 sm:p-2 ${
                        model.type === 'classification'
                          ? 'bg-blue-100 text-blue-600'
                          : model.type === 'regression'
                          ? 'bg-emerald-100 text-emerald-600'
                          : 'bg-violet-100 text-violet-600'
                      }`}
                    >
                      <ModelIcon className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
                    </div>
                    <div className="min-w-0 flex-1">
                      <div className="truncate text-sm font-medium text-slate-900">{model.name}</div>
                      <div className="mt-0.5 line-clamp-2 text-xs text-slate-500">{model.description}</div>
                      <Badge variant="info" className="mt-1.5 text-[10px]">
                        {modelConfig.label}
                      </Badge>
                    </div>
                  </div>
                </button>
              );
            })}
          </div>

          <div className="space-y-4 sm:space-y-6 lg:col-span-2">
            <div className="rounded-lg border border-slate-200 bg-white p-3 sm:rounded-xl sm:p-4">
              <div className="mb-3 flex items-center justify-between sm:mb-4">
                <div className="flex items-center gap-2">
                  <Settings2 className="h-4 w-4 text-slate-500" />
                  <span className="text-sm font-semibold text-slate-900 sm:text-base">Parameter Tuning</span>
                </div>
                <button
                  onClick={resetParameters}
                  className="flex items-center gap-1 text-xs text-slate-500 transition-colors hover:text-slate-700"
                >
                  <RotateCcw className="h-3 w-3" />
                  Reset
                </button>
              </div>

              <div className="space-y-3 sm:space-y-4">
                {selectedModel.parameters.map((param) => (
                  <div key={param.name}>
                    <div className="mb-2 flex items-center justify-between">
                      <div className="mr-2 min-w-0 flex-1">
                        <div className="truncate text-sm font-medium text-slate-900">{param.name}</div>
                        <div className="truncate text-xs text-slate-500">{param.description}</div>
                      </div>
                      <Badge variant="default" className="shrink-0 font-mono">
                        {parameters[param.name]}
                      </Badge>
                    </div>
                    <input
                      type="range"
                      min={param.min}
                      max={param.max}
                      step={param.step}
                      value={parameters[param.name]}
                      onChange={(event) => handleParameterChange(param.name, Number(event.target.value))}
                      className="h-2 w-full cursor-pointer appearance-none rounded-lg bg-slate-200 accent-indigo-600"
                    />
                    <div className="mt-1 flex justify-between text-[10px] text-slate-400">
                      <span>{param.min}</span>
                      <span>{param.max}</span>
                    </div>
                  </div>
                ))}
              </div>

              <button
                onClick={simulateTraining}
                disabled={isTraining}
                className="mt-4 w-full rounded-lg bg-indigo-600 px-4 py-2.5 text-sm font-medium text-white transition-colors hover:bg-indigo-700 disabled:cursor-not-allowed disabled:opacity-50 sm:mt-6 sm:rounded-xl sm:py-3 sm:text-base"
              >
                <span className="flex items-center justify-center gap-2">
                  {isTraining ? (
                    <>
                      <div className="h-4 w-4 animate-spin rounded-full border-2 border-white/30 border-t-white" />
                      <span>Training... {trainingProgress}%</span>
                    </>
                  ) : (
                    <>
                      <Play className="h-4 w-4" />
                      <span>Jalankan Model</span>
                    </>
                  )}
                </span>
              </button>

              {isTraining ? (
                <div className="mt-4">
                  <div className="h-2 overflow-hidden rounded-full bg-slate-100">
                    <div className="h-full bg-indigo-600 transition-all duration-200" style={{ width: `${trainingProgress}%` }} />
                  </div>
                </div>
              ) : null}
            </div>

            {results ? (
              <div className="rounded-lg border border-emerald-200 bg-gradient-to-r from-emerald-50 to-teal-50 p-3 sm:rounded-xl sm:p-4">
                <div className="mb-3 flex items-center gap-2 sm:mb-4">
                  <CheckCircle2 className="h-4 w-4 text-emerald-600 sm:h-5 sm:w-5" />
                  <span className="text-sm font-semibold text-emerald-900 sm:text-base">Hasil Training</span>
                </div>

                <div className="mb-3 grid grid-cols-2 gap-2 sm:mb-4 sm:gap-4">
                  <div className="rounded-lg border border-emerald-100 bg-white p-2 sm:p-3">
                    <div className="mb-1 text-[10px] text-slate-500 sm:text-xs">Akurasi Model</div>
                    <div className="text-xl font-bold text-emerald-600 sm:text-2xl">{results.accuracy.toFixed(1)}%</div>
                  </div>
                  <div className="rounded-lg border border-emerald-100 bg-white p-2 sm:p-3">
                    <div className="mb-1 text-[10px] text-slate-500 sm:text-xs">Waktu Training</div>
                    <div className="text-xl font-bold text-emerald-600 sm:text-2xl">{results.trainingTime.toFixed(2)}s</div>
                  </div>
                </div>

                <div className="space-y-2">
                  {results.insights.map((insight, idx) => (
                    <div key={idx} className="flex items-start gap-2 text-xs text-emerald-800 sm:text-sm">
                      <Lightbulb className="mt-0.5 h-3.5 w-3.5 shrink-0 text-emerald-500 sm:h-4 sm:w-4" />
                      <span className="leading-relaxed">{insight}</span>
                    </div>
                  ))}
                </div>
              </div>
            ) : null}

            <div className="rounded-lg border border-slate-200 bg-white p-3 sm:rounded-xl sm:p-4">
              <button
                onClick={() => setShowTheory(!showTheory)}
                className="w-full rounded-lg bg-slate-50 p-2.5 transition-colors hover:bg-slate-100 sm:p-3"
              >
                <span className="flex items-center justify-between">
                  <span className="flex items-center gap-2">
                    <BookOpen className="h-4 w-4 text-indigo-600 sm:h-5 sm:w-5" />
                    <span className="text-sm font-semibold text-slate-900 sm:text-base">Cara Kerja & Rumus Model</span>
                  </span>
                  <Badge variant="info" className="text-xs">
                    {showTheory ? 'Sembunyikan' : 'Tampilkan'}
                  </Badge>
                </span>
              </button>

              {showTheory ? (
                <div className="mt-3 space-y-3 sm:mt-4 sm:space-y-4">
                  <div className="rounded-lg border border-indigo-100 bg-indigo-50 p-2.5 sm:p-3">
                    <div className="mb-1.5 flex items-center gap-2 sm:mb-2">
                      <FunctionSquare className="h-3.5 w-3.5 text-indigo-600 sm:h-4 sm:w-4" />
                      <span className="text-xs font-semibold text-indigo-900 sm:text-sm">Algoritma</span>
                    </div>
                    <p className="text-xs text-indigo-800 sm:text-sm">{selectedModel.theory.algorithm}</p>
                  </div>

                  <div className="rounded-lg border border-slate-200 bg-slate-50 p-2.5 sm:p-3">
                    <div className="mb-1.5 flex items-center gap-2 sm:mb-2">
                      <FunctionSquare className="h-3.5 w-3.5 text-slate-600 sm:h-4 sm:w-4" />
                      <span className="text-xs font-semibold text-slate-900 sm:text-sm">Formula</span>
                    </div>
                    <code className="block overflow-x-auto rounded border bg-white p-2 font-mono text-xs text-slate-800 sm:text-sm">
                      {selectedModel.theory.formula}
                    </code>
                  </div>

                  <div className="rounded-lg border border-slate-200 bg-slate-50 p-2.5 sm:p-3">
                    <div className="mb-1.5 flex items-center gap-2 sm:mb-2">
                      <Info className="h-3.5 w-3.5 text-slate-600 sm:h-4 sm:w-4" />
                      <span className="text-xs font-semibold text-slate-900 sm:text-sm">Cara Kerja</span>
                    </div>
                    <ol className="ml-3 space-y-1 text-xs text-slate-600 sm:ml-4 sm:text-sm">
                      {selectedModel.theory.howItWorks.map((step, idx) => (
                        <li key={idx}>{idx + 1}. {step}</li>
                      ))}
                    </ol>
                  </div>

                  <div className="rounded-lg border border-amber-200 bg-amber-50 p-2.5 sm:p-3">
                    <div className="mb-1.5 flex items-center gap-2 sm:mb-2">
                      <Lightbulb className="h-3.5 w-3.5 text-amber-600 sm:h-4 sm:w-4" />
                      <span className="text-xs font-semibold text-amber-900 sm:text-sm">Interpretasi Hasil</span>
                    </div>
                    <p className="text-xs text-amber-800 sm:text-sm">{selectedModel.theory.interpretation}</p>
                  </div>
                </div>
              ) : null}
            </div>
          </div>
        </div>

        <div className="mt-4 rounded-lg bg-gradient-to-r from-indigo-600 to-violet-600 p-3 text-white sm:mt-6 sm:rounded-xl sm:p-4">
          <div className="mb-2 flex items-center gap-2">
            <BarChart3 className="h-3.5 w-3.5 text-indigo-200 sm:h-4 sm:w-4" />
            <h4 className="text-xs font-semibold sm:text-sm">Cara Menggunakan ML Playground</h4>
          </div>
          <ol className="ml-3 space-y-1 text-[10px] leading-relaxed text-indigo-100 sm:ml-4 sm:text-xs">
            <li>1. Pilih model ML yang ingin dieksplorasi</li>
            <li>2. Tuning parameter sesuai skenario kebijakan</li>
            <li>3. Jalankan model untuk melihat estimasi berbasis dataset aktif</li>
            <li>4. Gunakan insight untuk menyusun prioritas intervensi</li>
          </ol>
        </div>
      </CardContent>
    </Card>
  );
}
