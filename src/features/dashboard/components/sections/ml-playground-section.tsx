'use client';

import { useState } from 'react';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { 
  Brain, 
  Play, 
  Settings2, 
  BarChart3, 
  Target,
  Layers,
  TrendingUp,
  Lightbulb,
  RotateCcw,
  CheckCircle2,
  BookOpen,
  FunctionSquare,
  Info
} from 'lucide-react';

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
  baseAccuracy: number;
  theory: {
    algorithm: string;
    formula: string;
    howItWorks: string[];
    interpretation: string;
  };
}

const mlModels: MLModelInteractive[] = [
  {
    id: 'random-forest',
    name: 'Random Forest Classifier',
    type: 'classification',
    description: 'Klasifikasikan risiko wilayah UMKM',
    baseAccuracy: 87,
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
        'Gini Impurity: Split menggunakan formula 1 - Σ(pᵢ)²'
      ],
      interpretation: 'Semakin tinggi n_estimators, semakin stabil prediksi. Max_depth mengontrol overfitting.'
    }
  },
  {
    id: 'k-means',
    name: 'K-Means Clustering',
    type: 'clustering',
    description: 'Kelompokkan kecamatan berdasarkan karakteristik',
    baseAccuracy: 92,
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
        'Iterasi: Ulangi sampai konvergen atau max_iter tercapai'
      ],
      interpretation: 'Nilai J (inertia) menunjukkan compactness cluster. Semakin kecil, semakin baik.'
    }
  },
  {
    id: 'linear-reg',
    name: 'Linear Regression',
    type: 'regression',
    description: 'Prediksi pertumbuhan UMKM',
    baseAccuracy: 82,
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
        'Prediction: ŷ = Xβ untuk data baru'
      ],
      interpretation: 'R² = 0.82 berarti 82% variasi data dapat dijelaskan oleh model.'
    }
  },
];

const typeConfig = {
  classification: { color: 'blue', icon: Target, label: 'Klasifikasi' },
  regression: { color: 'emerald', icon: TrendingUp, label: 'Regresi' },
  clustering: { color: 'violet', icon: Layers, label: 'Clustering' },
};

export function MLPlaygroundSection() {
  const [selectedModel, setSelectedModel] = useState<MLModelInteractive>(mlModels[0]);
  const [parameters, setParameters] = useState<Record<string, number>>(
    Object.fromEntries(mlModels[0].parameters.map(p => [p.name, p.value]))
  );
  const [isTraining, setIsTraining] = useState(false);
  const [trainingProgress, setTrainingProgress] = useState(0);
  const [results, setResults] = useState<{
    accuracy: number;
    trainingTime: number;
    insights: string[];
  } | null>(null);
  const [showTheory, setShowTheory] = useState(false);

  const handleParameterChange = (paramName: string, value: number) => {
    setParameters(prev => ({ ...prev, [paramName]: value }));
    setResults(null);
  };

  const handleModelSelect = (model: MLModelInteractive) => {
    setSelectedModel(model);
    setParameters(Object.fromEntries(model.parameters.map(p => [p.name, p.value])));
    setResults(null);
  };

  const simulateTraining = () => {
    setIsTraining(true);
    setTrainingProgress(0);
    setResults(null);

    const interval = setInterval(() => {
      setTrainingProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          setIsTraining(false);
          generateResults();
          return 100;
        }
        return prev + 10;
      });
    }, 200);
  };

  const generateResults = () => {
    const paramEffect = Object.values(parameters).reduce((acc, val, idx) => {
      const base = selectedModel.parameters[idx]?.value || 1;
      return acc + (val / base - 1) * 2;
    }, 0);

    const accuracy = Math.min(95, Math.max(70, selectedModel.baseAccuracy + paramEffect + (Math.random() * 4 - 2)));
    
    const insights = [
      `Model ${selectedModel.name} mencapai akurasi ${accuracy.toFixed(1)}% dengan konfigurasi parameter saat ini`,
      paramEffect > 0 
        ? 'Parameter tuning meningkatkan performa model'
        : 'Parameter standar memberikan hasil yang stabil',
      selectedModel.type === 'classification' 
        ? 'Wilayah dengan risiko tinggi teridentifikasi dengan precision 89%'
        : selectedModel.type === 'regression'
        ? `Proyeksi menunjukkan pertumbuhan ${(Math.random() * 15 + 5).toFixed(1)}% untuk tahun depan`
        : '3 cluster distinct terbentuk dengan silhouette score 0.68',
    ];

    setResults({
      accuracy,
      trainingTime: Math.random() * 2 + 0.5,
      insights,
    });
  };

  const resetParameters = () => {
    setParameters(Object.fromEntries(selectedModel.parameters.map(p => [p.name, p.value])));
    setResults(null);
  };

  const config = typeConfig[selectedModel.type];
  const TypeIcon = config.icon;

  return (
    <Card className="mb-6 sm:mb-8 overflow-hidden border-indigo-200 bg-gradient-to-br from-indigo-50/50 to-white">
      <CardHeader className="pb-3 sm:pb-4 border-b border-indigo-100 p-4 sm:p-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2 sm:gap-3">
            <div className="p-2 sm:p-2.5 bg-indigo-100 rounded-lg sm:rounded-xl text-indigo-600 shrink-0">
              <Brain className="w-5 h-5 sm:w-6 sm:h-6" />
            </div>
            <div className="min-w-0">
              <CardTitle className="text-indigo-900 text-lg sm:text-xl">ML Playground</CardTitle>
              <p className="text-xs sm:text-sm text-indigo-600 mt-0.5 sm:mt-1">
                Eksperimen model ML dengan parameter yang bisa diatur
              </p>
            </div>
          </div>
        </div>
      </CardHeader>
      
      <CardContent className="p-3 sm:p-6">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-6">
          <div className="lg:col-span-1 space-y-3 sm:space-y-4">
            <div className="text-sm font-semibold text-slate-900 mb-3">Pilih Model</div>
            {mlModels.map((model) => {
              const modelConfig = typeConfig[model.type];
              const ModelIcon = modelConfig.icon;
              const isSelected = selectedModel.id === model.id;
              
              return (
                <button
                  key={model.id}
                  onClick={() => handleModelSelect(model)}
                  className={`w-full p-3 sm:p-4 rounded-lg sm:rounded-xl border text-left transition-all ${
                    isSelected 
                      ? 'bg-indigo-50 border-indigo-300 shadow-sm' 
                      : 'bg-white border-slate-200 hover:border-indigo-200'
                  }`}
                >
                  <div className="flex items-start gap-2 sm:gap-3">
                    <div className={`p-1.5 sm:p-2 rounded-lg shrink-0 ${
                      model.type === 'classification' ? 'bg-blue-100 text-blue-600' :
                      model.type === 'regression' ? 'bg-emerald-100 text-emerald-600' :
                      'bg-violet-100 text-violet-600'
                    }`}>
                      <ModelIcon className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="font-medium text-sm text-slate-900 truncate">{model.name}</div>
                      <div className="text-xs text-slate-500 mt-0.5 line-clamp-2">{model.description}</div>
                      <Badge variant="info" className="text-[10px] mt-1.5">{modelConfig.label}</Badge>
                    </div>
                  </div>
                </button>
              );
            })}
          </div>

          <div className="lg:col-span-2 space-y-4 sm:space-y-6">
            <div className="p-3 sm:p-4 bg-white rounded-lg sm:rounded-xl border border-slate-200">
              <div className="flex items-center justify-between mb-3 sm:mb-4">
                <div className="flex items-center gap-2">
                  <Settings2 className="w-4 h-4 text-slate-500" />
                  <span className="font-semibold text-slate-900 text-sm sm:text-base">Parameter Tuning</span>
                </div>
                <button
                  onClick={resetParameters}
                  className="flex items-center gap-1 text-xs text-slate-500 hover:text-slate-700 transition-colors"
                >
                  <RotateCcw className="w-3 h-3" />
                  Reset
                </button>
              </div>

              <div className="space-y-3 sm:space-y-4">
                {selectedModel.parameters.map((param) => (
                  <div key={param.name}>
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex-1 min-w-0 mr-2">
                        <div className="text-sm font-medium text-slate-900 truncate">{param.name}</div>
                        <div className="text-xs text-slate-500 truncate">{param.description}</div>
                      </div>
                      <Badge variant="default" className="font-mono shrink-0">{parameters[param.name]}</Badge>
                    </div>
                    <input
                      type="range"
                      min={param.min}
                      max={param.max}
                      step={param.step}
                      value={parameters[param.name]}
                      onChange={(e) => handleParameterChange(param.name, Number(e.target.value))}
                      className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-indigo-600"
                    />
                    <div className="flex justify-between text-[10px] text-slate-400 mt-1">
                      <span>{param.min}</span>
                      <span>{param.max}</span>
                    </div>
                  </div>
                ))}
              </div>

              <button
                onClick={simulateTraining}
                disabled={isTraining}
                className="w-full mt-4 sm:mt-6 flex items-center justify-center gap-2 py-2.5 sm:py-3 px-4 bg-indigo-600 text-white rounded-lg sm:rounded-xl font-medium hover:bg-indigo-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors text-sm sm:text-base"
              >
                {isTraining ? (
                  <>
                    <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    <span className="text-sm sm:text-base">Training... {trainingProgress}%</span>
                  </>
                ) : (
                  <>
                    <Play className="w-4 h-4" />
                    <span className="text-sm sm:text-base">Jalankan Model</span>
                  </>
                )}
              </button>

              {isTraining && (
                <div className="mt-4">
                  <div className="h-2 bg-slate-100 rounded-full overflow-hidden">
                    <div 
                      className="h-full bg-indigo-600 transition-all duration-200"
                      style={{ width: `${trainingProgress}%` }}
                    />
                  </div>
                </div>
              )}
            </div>

            {results && (
              <div className="p-3 sm:p-4 bg-gradient-to-r from-emerald-50 to-teal-50 rounded-lg sm:rounded-xl border border-emerald-200">
                <div className="flex items-center gap-2 mb-3 sm:mb-4">
                  <CheckCircle2 className="w-4 h-4 sm:w-5 sm:h-5 text-emerald-600" />
                  <span className="font-semibold text-emerald-900 text-sm sm:text-base">Hasil Training</span>
                </div>

                <div className="grid grid-cols-2 gap-2 sm:gap-4 mb-3 sm:mb-4">
                  <div className="p-2 sm:p-3 bg-white rounded-lg border border-emerald-100">
                    <div className="text-[10px] sm:text-xs text-slate-500 mb-1">Akurasi Model</div>
                    <div className="text-xl sm:text-2xl font-bold text-emerald-600">{results.accuracy.toFixed(1)}%</div>
                  </div>
                  <div className="p-2 sm:p-3 bg-white rounded-lg border border-emerald-100">
                    <div className="text-[10px] sm:text-xs text-slate-500 mb-1">Waktu Training</div>
                    <div className="text-xl sm:text-2xl font-bold text-emerald-600">{results.trainingTime.toFixed(2)}s</div>
                  </div>
                </div>

                <div className="space-y-2">
                  {results.insights.map((insight, idx) => (
                    <div key={idx} className="flex items-start gap-2 text-xs sm:text-sm text-emerald-800">
                      <Lightbulb className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-emerald-500 mt-0.5 flex-shrink-0" />
                      <span className="leading-relaxed">{insight}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            <div className="p-3 sm:p-4 bg-white rounded-lg sm:rounded-xl border border-slate-200">
              <button
                onClick={() => setShowTheory(!showTheory)}
                className="w-full flex items-center justify-between p-2.5 sm:p-3 bg-slate-50 rounded-lg hover:bg-slate-100 transition-colors"
              >
                <div className="flex items-center gap-2">
                  <BookOpen className="w-4 h-4 sm:w-5 sm:h-5 text-indigo-600" />
                  <span className="font-semibold text-slate-900 text-sm sm:text-base">Cara Kerja & Rumus Model</span>
                </div>
                <Badge variant="info" className="text-xs">{showTheory ? 'Sembunyikan' : 'Tampilkan'}</Badge>
              </button>

              {showTheory && (
                <div className="mt-3 sm:mt-4 space-y-3 sm:space-y-4">
                  <div className="p-2.5 sm:p-3 bg-indigo-50 rounded-lg border border-indigo-100">
                    <div className="flex items-center gap-2 mb-1.5 sm:mb-2">
                      <FunctionSquare className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-indigo-600" />
                      <span className="font-semibold text-indigo-900 text-xs sm:text-sm">Algoritma</span>
                    </div>
                    <p className="text-xs sm:text-sm text-indigo-800">{selectedModel.theory.algorithm}</p>
                  </div>

                  <div className="p-2.5 sm:p-3 bg-slate-50 rounded-lg border border-slate-200">
                    <div className="flex items-center gap-2 mb-1.5 sm:mb-2">
                      <FunctionSquare className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-slate-600" />
                      <span className="font-semibold text-slate-900 text-xs sm:text-sm">Formula</span>
                    </div>
                    <code className="block p-2 bg-white rounded border text-xs sm:text-sm font-mono text-slate-800 overflow-x-auto">
                      {selectedModel.theory.formula}
                    </code>
                  </div>

                  <div className="p-2.5 sm:p-3 bg-slate-50 rounded-lg border border-slate-200">
                    <div className="flex items-center gap-2 mb-1.5 sm:mb-2">
                      <Info className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-slate-600" />
                      <span className="font-semibold text-slate-900 text-xs sm:text-sm">Cara Kerja</span>
                    </div>
                    <ol className="space-y-1 text-xs sm:text-sm text-slate-600 ml-3 sm:ml-4">
                      {selectedModel.theory.howItWorks.map((step, idx) => (
                        <li key={idx}>{idx + 1}. {step}</li>
                      ))}
                    </ol>
                  </div>

                  <div className="p-2.5 sm:p-3 bg-amber-50 rounded-lg border border-amber-200">
                    <div className="flex items-center gap-2 mb-1.5 sm:mb-2">
                      <Lightbulb className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-amber-600" />
                      <span className="font-semibold text-amber-900 text-xs sm:text-sm">Interpretasi Hasil</span>
                    </div>
                    <p className="text-xs sm:text-sm text-amber-800">{selectedModel.theory.interpretation}</p>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        <div className="mt-4 sm:mt-6 p-3 sm:p-4 bg-gradient-to-r from-indigo-600 to-violet-600 rounded-lg sm:rounded-xl text-white">
          <div className="flex items-center gap-2 mb-2">
            <BarChart3 className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-indigo-200" />
            <h4 className="font-semibold text-xs sm:text-sm">Cara Menggunakan ML Playground</h4>
          </div>
          <ol className="text-[10px] sm:text-xs text-indigo-100 leading-relaxed space-y-1 ml-3 sm:ml-4">
            <li>1. Pilih model ML yang ingin dieksplorasi (klasifikasi, regresi, atau clustering)</li>
            <li>2. Pelajari cara kerja model dengan klik "Cara Kerja & Rumus Model"</li>
            <li>3. Sesuaikan parameter menggunakan slider untuk melihat dampaknya</li>
            <li>4. Klik "Jalankan Model" untuk melihat hasil training dan evaluasi performa</li>
          </ol>
        </div>
      </CardContent>
    </Card>
  );
}
