import type { 
  RoleBasedBI,
  MLModel, 
  MLEvaluationSummary,
  PredictiveAnalysis,
  DataDrivenDecision,
  DecisionTrace,
  PolicyAlternative,
  SelectedPolicy,
  DecisionRationale,
  ImplementationPlan
} from '../types';
import type { AggregatedKecamatan, AggregatedSektor } from './data-aggregator';

interface MLAnalysisInput {
  historicalCoverageYears: number;
  dataPoints: number;
  featureCount: number;
  missingValueRatePct: number;
}

export function generateMLAnalysis(
  input: MLAnalysisInput
): { mlModels: MLModel[]; predictiveAnalysis: PredictiveAnalysis } {
  const {
    historicalCoverageYears,
    dataPoints,
    featureCount,
    missingValueRatePct,
  } = input;

  const hasHistoricalData = historicalCoverageYears >= 2;
  const canUsePredictive = hasHistoricalData && dataPoints >= 500 && missingValueRatePct <= 15;
  const dataReadinessRecommendation = canUsePredictive
    ? 'Data cukup untuk baseline model prediktif. Lanjutkan validasi out-of-time dan monitoring drift.'
    : 'Data belum ideal untuk prediksi penuh. Prioritaskan quality improvement, harmonisasi histori, dan feature engineering.';

  const datasetWindow = `${historicalCoverageYears} tahun histori, ${dataPoints.toLocaleString('id-ID')} baris`;
  const defaultSplit = hasHistoricalData ? '70/15/15 + validasi out-of-time' : '80/20 holdout (eksploratif)';

  const classificationEval: MLEvaluationSummary = {
    datasetWindow,
    splitStrategy: defaultSplit,
    metrics: [
      { name: 'Accuracy', value: 0.87, unit: 'ratio', note: 'Baseline simulasi untuk klasifikasi risiko wilayah' },
      { name: 'F1-Score', value: 0.84, unit: 'ratio' },
      { name: 'ROC-AUC', value: 0.89, unit: 'ratio' },
    ],
    caveat: 'Skor akan berubah setelah training aktual per fold dan kalibrasi threshold.',
  };

  const regressionEval: MLEvaluationSummary = {
    datasetWindow,
    splitStrategy: defaultSplit,
    metrics: [
      { name: 'R²', value: 0.82, unit: 'ratio' },
      { name: 'RMSE', value: 125, unit: 'unit UMKM' },
      { name: 'MAE', value: 94, unit: 'unit UMKM' },
    ],
    caveat: 'Evaluasi regresi sensitif terhadap anomali wilayah dengan volume UMKM ekstrem.',
  };

  const clusteringEval: MLEvaluationSummary = {
    datasetWindow,
    splitStrategy: 'Unsupervised (no train/test split), evaluasi internal cluster quality',
    metrics: [
      { name: 'Silhouette', value: 0.68, unit: 'ratio' },
      { name: 'Davies-Bouldin', value: 0.72, unit: 'index' },
    ],
    caveat: 'Kualitas cluster harus divalidasi dengan interpretasi domain (aksi kebijakan per cluster).',
  };
  
  const mlModels: MLModel[] = [
    {
      name: 'Random Forest Classifier',
      type: 'classification',
      description: 'Mengklasifikasikan wilayah ke dalam kategori risiko UMKM (tinggi/sedang/rendah) berdasarkan karakteristik ekonomi.',
      useCase: 'Mengelompokkan kecamatan dengan potensi gagal bayar atau kesulitan UMKM',
      accuracy: 87,
      applicable: canUsePredictive,
      evaluation: classificationEval,
    },
    {
      name: 'K-Means Clustering',
      type: 'clustering',
      description: 'Mengelompokkan kecamatan berdasarkan karakteristik UMKM serupa (jumlah, sektor, digitalisasi).',
      useCase: 'Segmentasi wilayah untuk program intervensi yang terarah',
      applicable: true,
      evaluation: clusteringEval,
    },
    {
      name: 'Linear Regression',
      type: 'regression',
      description: 'Memprediksi jumlah UMKM dan tenaga kerja di masa depan berdasarkan tren historis.',
      useCase: 'Forecasting pertumbuhan UMKM 1-2 tahun ke depan',
      accuracy: hasHistoricalData ? 82 : undefined,
      applicable: canUsePredictive,
      evaluation: regressionEval,
    },
    {
      name: 'Decision Tree',
      type: 'classification',
      description: 'Menentukan sektor UMKM yang paling berpotensi di suatu wilayah berdasarkan fitur geografis dan demografis.',
      useCase: 'Rekomendasi sektor prioritas untuk kecamatan tertentu',
      accuracy: 79,
      applicable: true,
      evaluation: classificationEval,
    },
    {
      name: 'Time Series Analysis (ARIMA)',
      type: 'regression',
      description: 'Menganalisis pola temporal UMKM untuk prediksi multi-period.',
      useCase: 'Proyeksi jangka panjang (3-5 tahun) untuk perencanaan strategis',
      accuracy: hasHistoricalData ? 75 : undefined,
      applicable: canUsePredictive && dataPoints > 500,
      evaluation: regressionEval,
    },
    {
      name: 'Hierarchical Clustering',
      type: 'clustering',
      description: 'Mengelompokkan kabupaten/kota dalam hierarki berdasarkan kemiripan profil UMKM.',
      useCase: 'Identifikasi region dengan karakteristik serupa untuk benchmarking',
      applicable: true,
      evaluation: clusteringEval,
    },
  ];

  const predictiveAnalysis: PredictiveAnalysis = {
    canUsePredictive,
    reason: canUsePredictive 
      ? `Dataset memiliki ${dataPoints.toLocaleString('id-ID')} data points dengan cakupan histori ${historicalCoverageYears} tahun. Kondisi ini cukup untuk baseline prediksi dan validasi bertahap.`
      : `Dataset belum ideal untuk prediksi penuh: histori ${historicalCoverageYears} tahun, ${dataPoints.toLocaleString('id-ID')} data points, missing value ${missingValueRatePct.toFixed(1)}%. Fokus awal sebaiknya quality assurance data dan analisis deskriptif/diagnostik.`,
    recommendedApproach: canUsePredictive
      ? 'Gunakan kombinasi Classification (risiko), Regression (forecast), dan Clustering (segmentasi). Mulai dari baseline, lanjut validasi out-of-time, lalu operational monitoring.'
      : 'Fokus pada Clustering untuk segmentasi wilayah dan BI deskriptif. Lengkapi histori dan turunkan missing value sebelum mengaktifkan prediktif operasional.',
    dataReadiness: {
      historicalCoverageYears,
      dataPoints,
      featureCount,
      missingValueRatePct,
      recommendation: dataReadinessRecommendation,
    },
  };

  return { mlModels, predictiveAnalysis };
}

export function generateBIDashboardData(
  totalUmkm: number,
  totalTenagaKerja: number,
  avgDigital: number,
  kabKotaCount: number,
  topSektor: string
): { roleBasedData: RoleBasedBI[] } {
  return {
    roleBasedData: [
    {
      role: 'waliKota',
      roleName: 'Wali Kota / Bupati',
      roleDescription: 'Overview strategis untuk perencanaan pembangunan daerah dan alokasi anggaran. Fokus pada metrik agregat dan tren jangka panjang.',
      kpis: [
        {
          id: 'total-umkm',
          label: 'Total UMKM',
          value: totalUmkm.toLocaleString('id-ID'),
          change: 12.5,
          icon: 'Building2',
          visualization: 'line',
          description: 'Jumlah unit UMKM aktif di wilayah ini',
        },
        {
          id: 'tenaga-kerja',
          label: 'Tenaga Kerja UMKM',
          value: totalTenagaKerja.toLocaleString('id-ID'),
          change: 8.3,
          icon: 'Users',
          visualization: 'bar',
          description: 'Total penyerapan tenaga kerja sektor UMKM',
        },
        {
          id: 'kontribusi-ekonomi',
          label: 'Kontribusi Ekonomi',
          value: '23.4%',
          change: 2.1,
          icon: 'TrendingUp',
          visualization: 'gauge',
          description: 'Kontribusi UMKM terhadap PDRB daerah',
        },
        {
          id: 'wilayah-cakupan',
          label: 'Wilayah Cakupan',
          value: `${kabKotaCount} Kab/Kota`,
          icon: 'MapPin',
          visualization: 'heatmap',
          description: 'Jumlah kabupaten/kota dalam analisis',
        },
      ],
      visualizations: [
        {
          type: 'line',
          title: 'Tren Pertumbuhan UMKM (5 Tahun)',
          description: 'Grafik garis untuk melihat tren kenaikan/penurunan jumlah UMKM dari waktu ke waktu.',
          applicable: true,
        },
        {
          type: 'bar',
          title: 'Perbandingan Kabupaten/Kota',
          description: 'Bar chart horizontal membandingkan performa UMKM antar wilayah.',
          applicable: true,
        },
        {
          type: 'gauge',
          title: 'Indeks Kesehatan UMKM',
          description: 'Gauge chart menunjukkan kondisi overall UMKM daerah.',
          applicable: true,
        },
        {
          type: 'heatmap',
          title: 'Peta Panas Sebaran UMKM',
          description: 'Heatmap geografis intensitas UMKM per kecamatan.',
          applicable: true,
        },
      ],
    },
    {
      role: 'dinasKoperasi',
      roleName: 'Dinas Koperasi & UMKM',
      roleDescription: 'Data operasional untuk perencanaan program, monitoring target, dan evaluasi kebijakan sektoral.',
      kpis: [
        {
          id: 'digitalisasi',
          label: 'Tingkat Digitalisasi',
          value: `${avgDigital.toFixed(1)}%`,
          change: 5.7,
          icon: 'Smartphone',
          visualization: 'gauge',
          description: 'Persentase UMKM yang telah mengadopsi digital',
        },
        {
          id: 'formal',
          label: 'UMKM Formal',
          value: '34.2%',
          change: 3.2,
          icon: 'FileCheck',
          visualization: 'pie',
          description: 'Persentase UMKM berizin/IUMK',
        },
        {
          id: 'pembiayaan',
          label: 'Akses Pembiayaan',
          value: '28.5%',
          change: -1.2,
          icon: 'Wallet',
          visualization: 'bar',
          description: 'Persentase UMKM dengan akses kredit/leasing',
        },
        {
          id: 'sektor-top',
          label: 'Sektor Dominan',
          value: topSektor,
          icon: 'Briefcase',
          visualization: 'pie',
          description: 'Sektor UMKM dengan kontribusi terbesar',
        },
      ],
      visualizations: [
        {
          type: 'pie',
          title: 'Distribusi Sektor UMKM',
          description: 'Pie chart komposisi sektor usaha (kuliner, fashion, kerajinan, dll).',
          applicable: true,
        },
        {
          type: 'bar',
          title: 'Program Digitalisasi per Wilayah',
          description: 'Stacked bar chart progress program per kecamatan.',
          applicable: true,
        },
        {
          type: 'line',
          title: 'Tren Formalisasi UMKM',
          description: 'Line chart persentase UMKM formal per periode.',
          applicable: true,
        },
        {
          type: 'heatmap',
          title: 'Peta Pemetaan Program',
          description: 'Heatmap cakupan program per wilayah.',
          applicable: true,
        },
      ],
    },
    {
      role: 'camat',
      roleName: 'Camat / Lurah',
      roleDescription: 'Data spesifik wilayah untuk perencanaan intervensi lokal, identifikasi masalah, dan pelaporan.',
      kpis: [
        {
          id: 'umkm-kecamatan',
          label: 'UMKM di Kecamatan',
          value: '1,247',
          change: 15.3,
          icon: 'Store',
          visualization: 'bar',
          description: 'Jumlah UMKM dalam wilayah kecamatan',
        },
        {
          id: 'serapan-kerja',
          label: 'Serapan Tenaga Kerja',
          value: '3,891',
          change: 12.1,
          icon: 'Users',
          visualization: 'line',
          description: 'Total pekerja di UMKM lokal',
        },
        {
          id: 'omzet-lokal',
          label: 'Omzet UMKM',
          value: 'Rp 45.2M',
          change: 8.7,
          icon: 'Banknote',
          visualization: 'gauge',
          description: 'Total omzet UMKM kecamatan per tahun',
        },
        {
          id: 'kebutuhan-intervensi',
          label: 'Butuh Intervensi',
          value: '23%',
          icon: 'AlertCircle',
          visualization: 'pie',
          description: 'Persentase UMKM yang memerlukan bantuan',
        },
      ],
      visualizations: [
        {
          type: 'bar',
          title: 'UMKM per Kelurahan/Desa',
          description: 'Bar chart distribusi UMKM di tiap desa/kelurahan.',
          applicable: true,
        },
        {
          type: 'pie',
          title: 'Jenis Usaha Dominan',
          description: 'Pie chart komposisi jenis usaha di kecamatan.',
          applicable: true,
        },
        {
          type: 'gauge',
          title: 'Indeks Daya Saing',
          description: 'Gauge daya saing UMKM kecamatan vs rata-rata.',
          applicable: true,
        },
        {
          type: 'heatmap',
          title: 'Peta Sebaran UMKM',
          description: 'Peta detail lokasi UMKM di kecamatan.',
          applicable: true,
        },
      ],
    },
    {
      role: 'investor',
      roleName: 'Investor / Pemodal',
      roleDescription: 'Analisis potensi investasi, ROI, dan identifikasi peluang bisnis di sektor UMKM.',
      kpis: [
        {
          id: 'pertumbuhan',
          label: 'Pertumbuhan YoY',
          value: '+12.5%',
          change: 2.3,
          icon: 'TrendingUp',
          visualization: 'line',
          description: 'Pertumbuhan jumlah UMKM year-over-year',
        },
        {
          id: 'market-size',
          label: 'Market Size',
          value: 'Rp 124T',
          change: 18.2,
          icon: 'PieChartIcon',
          visualization: 'gauge',
          description: 'Estimasi total pasar UMKM di wilayah',
        },
        {
          id: 'digital-ready',
          label: 'UMKM Digital-Ready',
          value: '42%',
          change: 8.5,
          icon: 'Smartphone',
          visualization: 'bar',
          description: 'Persentase UMKM siap digitalisasi',
        },
        {
          id: 'sektor-potensial',
          label: 'Sektor Potensial',
          value: topSektor,
          icon: 'Star',
          visualization: 'pie',
          description: 'Sektor dengan potensi ROI tertinggi',
        },
      ],
      visualizations: [
        {
          type: 'line',
          title: 'Tren ROI Sektor UMKM',
          description: 'Line chart ROI historis dan proyeksi per sektor.',
          applicable: true,
        },
        {
          type: 'bar',
          title: 'Potensi Wilayah Investasi',
          description: 'Bar chart peringkat kabupaten berdasarkan potensi.',
          applicable: true,
        },
        {
          type: 'pie',
          title: 'Komposisi Peluang Investasi',
          description: 'Pie chart distribusi peluang per sektor.',
          applicable: true,
        },
        {
          type: 'gauge',
          title: 'Indeks Investasi UMKM',
          description: 'Gauge kelayakan investasi wilayah (0-100).',
          applicable: true,
        },
      ],
    },
  ],
  };
}

export function generateDataDrivenDecision(
  topKecamatan: (AggregatedKecamatan & { priorityScore: number })[],
  bySektor: AggregatedSektor[],
  avgDigital: number
): DataDrivenDecision {
  const topKec = topKecamatan[0];
  const topSektor = bySektor.sort((a, b) => b.totalUmkm - a.totalUmkm)[0];
  
  const selectedPolicy: SelectedPolicy = {
    name: 'Program Pemberdayaan UMKM Berbasis Digitalisasi dan Akses Pembiayaan',
    description: `Implementasi program komprehensif untuk meningkatkan kapasitas UMKM di ${topKec?.kecamatan || 'wilayah prioritas'} dengan fokus pada digitalisasi operasional, akses pembiayaan mikro, dan pendampingan teknis berkelanjutan. Program ini menargetkan peningkatan digitalisasi UMKM dari ${avgDigital.toFixed(1)}% menjadi 60% dalam 2 tahun.`,
    targetIndicators: [
      'Tingkat Digitalisasi UMKM',
      'Akses Pembiayaan Formal',
      'Jumlah UMKM Tervalidasi',
      'Penyerapan Tenaga Kerja',
    ],
    expectedOutcome: 'Peningkatan daya saing UMKM sebesar 25%, penambahan 500 unit UMKM formal, dan terciptanya 1.200 lapangan kerja baru dalam 2 tahun.',
  };

  const alternatives: PolicyAlternative[] = [
    {
      id: 'alt-1',
      name: 'Program Pelatihan Kewirausahaan Massal',
      description: 'Fokus pada pelatihan soft skills dan manajemen bisnis untuk calon pengusaha dengan pendekatan workshop intensif.',
      pros: [
        'Biaya implementasi relatif rendah',
        'Jangkauan luas dalam waktu singkat',
        'Mudah dievaluasi dengan pre-post test',
      ],
      cons: [
        'Tidak berkelanjutan tanpa pendampingan',
        'Tingkat konversi ke bisnis nyata rendah',
        'Tidak menyelesaikan masalah akses modal',
      ],
      estimatedImpact: {
        metric: 'UMKM Baru',
        value: '+150 unit',
      },
      costEstimate: 'low',
      timeframe: 'short',
    },
    {
      id: 'alt-2',
      name: 'Subsidi Bunga Kredit UMKM',
      description: 'Memberikan subsidi bunga kredit melalui perbankan daerah untuk UMKM yang telah berjalan minimal 2 tahun.',
      pros: [
        'Langsung mengatasi masalah akses modal',
        'Mendorong formalisasi UMKM',
        'Dapat diukur dampaknya secara kuantitatif',
      ],
      cons: [
        'Memerlukan anggaran besar',
        'Risiko kredit macet perlu dikelola',
        'Tidak semua UMKM memenuhi syarat bank',
      ],
      estimatedImpact: {
        metric: 'Akses Pembiayaan',
        value: '+35%',
      },
      costEstimate: 'high',
      timeframe: 'medium',
    },
    {
      id: 'alt-3',
      name: 'Pendampingan Teknis 1-on-1',
      description: 'Mentoring individu oleh praktisi bisnis untuk UMKM yang sudah berjalan dengan seleksi berbasis potensi.',
      pros: [
        'Dampak nyata dan terukur',
        'Pendekatan personal sesuai kebutuhan',
        'Transfer knowledge berkualitas',
      ],
      cons: [
        'Coverage terbatas (biaya per unit tinggi)',
        'Memerlukan mentor berkualitas banyak',
        'Waktu implementasi panjang',
      ],
      estimatedImpact: {
        metric: 'Peningkatan Omzet',
        value: '+45%',
      },
      costEstimate: 'medium',
      timeframe: 'long',
    },
  ];

  const decisionTrace = buildDecisionTrace(alternatives);
  const bestAlternative = decisionTrace.ranking[0];

  const decisionRationale: DecisionRationale = {
    comparedAlternatives: alternatives.map((alt) => alt.name),
    keyInsight: `Berdasarkan data, ${topKec?.kecamatan || 'wilayah prioritas'} memiliki skor prioritas ${topKec?.priorityScore.toFixed(2) || 'N/A'} dengan sektor dominan ${topSektor?.sektor || 'N/A'}. Alternatif ${bestAlternative?.alternativeName || 'terbaik'} memperoleh weighted score tertinggi (${bestAlternative?.weightedScore.toFixed(1) || 'N/A'}) karena seimbang antara dampak, kelayakan anggaran, risiko, dan kecepatan manfaat.`,
    primaryIndicator: 'Skor komposit berbobot: Impact (40%), Feasibility (25%), Risk (20%), Time-to-Value (15%)',
    confidenceLevel: avgDigital > 30 ? 'high' : 'medium',
  };

  const implementation: ImplementationPlan = {
    steps: [
      'Identifikasi dan validasi 500 UMKM target melalui survey lapangan',
      'Kerjasama dengan 3 fintech/Bank untuk akses pembiayaan',
      'Pelatihan digitalisasi batch 1 (250 UMKM) - Bulan 1-3',
      'Monitoring dan evaluasi intermidiate - Bulan 6',
      'Pelatihan batch 2 dan pendalaman - Bulan 7-12',
      'Evaluasi akhir dan rekomendasi perluasan - Bulan 18',
    ],
    responsibleParties: [
      'Dinas Koperasi & UMKM',
      'Diskominfo (Digitalisasi)',
      'Bank Jabar Banten',
      'Kecamatan setempat',
    ],
    timeline: '18 bulan (Q1 2025 - Q2 2026)',
    successMetrics: [
      '60% UMKM peserta terdigitalisasi',
      '40% peserta mendapatkan akses pembiayaan',
      'Rata-rata peningkatan omzet 30%',
      '300 UMKM formal baru terdaftar',
    ],
  };

  return {
    selectedPolicy,
    alternatives,
    decisionRationale,
    implementation,
    decisionTrace,
  };
}

const DECISION_WEIGHTS = {
  impact: 0.4,
  feasibility: 0.25,
  risk: 0.2,
  timeToValue: 0.15,
} as const;

function mapCostScore(costEstimate: PolicyAlternative['costEstimate']): number {
  if (costEstimate === 'low') return 90;
  if (costEstimate === 'medium') return 70;
  return 45;
}

function mapRiskScore(cons: string[]): number {
  const joined = cons.join(' ').toLowerCase();
  if (joined.includes('tinggi')) return 45;
  if (joined.includes('sedang')) return 70;
  return 85;
}

function mapTimeScore(timeframe: PolicyAlternative['timeframe']): number {
  if (timeframe === 'short') return 90;
  if (timeframe === 'medium') return 72;
  return 55;
}

function parseImpactScore(impactValue: string): number {
  const match = impactValue.match(/\d+/g);
  if (!match || match.length === 0) return 65;
  const values = match.map((v) => Number(v));
  const average = values.reduce((acc, curr) => acc + curr, 0) / values.length;
  return Math.min(95, Math.max(45, average * 2));
}

function buildDecisionTrace(alternatives: PolicyAlternative[]): DecisionTrace {
  const ranking = alternatives
    .map((alternative) => {
      const impact = parseImpactScore(alternative.estimatedImpact.value);
      const feasibility = mapCostScore(alternative.costEstimate);
      const risk = mapRiskScore(alternative.cons);
      const timeToValue = mapTimeScore(alternative.timeframe);

      const weightedScore =
        impact * DECISION_WEIGHTS.impact +
        feasibility * DECISION_WEIGHTS.feasibility +
        risk * DECISION_WEIGHTS.risk +
        timeToValue * DECISION_WEIGHTS.timeToValue;

      return {
        alternativeId: alternative.id,
        alternativeName: alternative.name,
        weightedScore: Number(weightedScore.toFixed(2)),
        scoreBreakdown: {
          impact,
          feasibility,
          risk,
          timeToValue,
        },
        notes: `Dampak diambil dari estimasi outcome (${alternative.estimatedImpact.value}); kelayakan dari costEstimate=${alternative.costEstimate}; risiko dari narasi cons; time-to-value dari timeframe=${alternative.timeframe}.`,
      };
    })
    .sort((a, b) => b.weightedScore - a.weightedScore);

  return {
    method: 'Weighted Sum Model',
    weights: DECISION_WEIGHTS,
    ranking,
  };
}
