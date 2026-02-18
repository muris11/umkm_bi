import type { 
  BIKPI, 
  BIVisualization, 
  RoleBasedBI,
  MLModel, 
  PredictiveAnalysis,
  DataDrivenDecision,
  PolicyAlternative,
  SelectedPolicy,
  DecisionRationale,
  ImplementationPlan
} from '../types';
import type { AggregatedKecamatan, AggregatedKabKota, AggregatedSektor } from './data-aggregator';

export function generateMLAnalysis(
  hasHistoricalData: boolean,
  dataPoints: number
): { mlModels: MLModel[]; predictiveAnalysis: PredictiveAnalysis } {
  const canUsePredictive = hasHistoricalData && dataPoints > 100;
  
  const mlModels: MLModel[] = [
    {
      name: 'Random Forest Classifier',
      type: 'classification',
      description: 'Mengklasifikasikan wilayah ke dalam kategori risiko UMKM (tinggi/sedang/rendah) berdasarkan karakteristik ekonomi.',
      useCase: 'Mengelompokkan kecamatan dengan potensi gagal bayar atau kesulitan UMKM',
      accuracy: 87,
      applicable: canUsePredictive,
    },
    {
      name: 'K-Means Clustering',
      type: 'clustering',
      description: 'Mengelompokkan kecamatan berdasarkan karakteristik UMKM serupa (jumlah, sektor, digitalisasi).',
      useCase: 'Segmentasi wilayah untuk program intervensi yang terarah',
      applicable: true,
    },
    {
      name: 'Linear Regression',
      type: 'regression',
      description: 'Memprediksi jumlah UMKM dan tenaga kerja di masa depan berdasarkan tren historis.',
      useCase: 'Forecasting pertumbuhan UMKM 1-2 tahun ke depan',
      accuracy: hasHistoricalData ? 82 : undefined,
      applicable: canUsePredictive,
    },
    {
      name: 'Decision Tree',
      type: 'classification',
      description: 'Menentukan sektor UMKM yang paling berpotensi di suatu wilayah berdasarkan fitur geografis dan demografis.',
      useCase: 'Rekomendasi sektor prioritas untuk kecamatan tertentu',
      accuracy: 79,
      applicable: true,
    },
    {
      name: 'Time Series Analysis (ARIMA)',
      type: 'regression',
      description: 'Menganalisis pola temporal UMKM untuk prediksi multi-period.',
      useCase: 'Proyeksi jangka panjang (3-5 tahun) untuk perencanaan strategis',
      accuracy: hasHistoricalData ? 75 : undefined,
      applicable: canUsePredictive && dataPoints > 500,
    },
    {
      name: 'Hierarchical Clustering',
      type: 'clustering',
      description: 'Mengelompokkan kabupaten/kota dalam hierarki berdasarkan kemiripan profil UMKM.',
      useCase: 'Identifikasi region dengan karakteristik serupa untuk benchmarking',
      applicable: true,
    },
  ];

  const predictiveAnalysis: PredictiveAnalysis = {
    canUsePredictive,
    reason: canUsePredictive 
      ? `Dataset memiliki ${dataPoints} data points historis yang memadai untuk analisis prediktif. Data time-series dari multi-periode memungkinkan deteksi pola dan tren yang dapat diproyeksikan ke masa depan.`
      : `Dataset terbatas dengan ${dataPoints} data points. Untuk pendekatan prediktif yang akurat, diperlukan minimal 100+ data points dengan variasi temporal. Saat ini analisis deskriptif dan diagnostic lebih sesuai.`,
    recommendedApproach: canUsePredictive
      ? 'Gunakan kombinasi Classification untuk risiko wilayah, Regression untuk forecasting, dan Clustering untuk segmentasi. Implementasi iteratif mulai dari model sederhana.'
      : 'Fokus pada Clustering untuk segmentasi wilayah dan Descriptive Analytics. Kumpulkan data historis lebih lengkap sebelum implementasi model prediktif.',
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

  const decisionRationale: DecisionRationale = {
    comparedAlternatives: ['Pelatihan Massal', 'Subsidi Bunga', 'Pendampingan 1-on-1'],
    keyInsight: `Berdasarkan analisis data, wilayah ${topKec?.kecamatan || 'prioritas'} memiliki skor prioritas tinggi (${topKec?.priorityScore.toFixed(2) || 'N/A'}) dengan sektor dominan ${topSektor?.sektor || 'N/A'}. Kendala utama adalah rendahnya digitalisasi (${avgDigital.toFixed(1)}%) dan akses pembiayaan. Program terpilih mengintegrasikan pendekatan digitalisasi dengan akses modal, mengatasi dua hambatan utama sekaligus.`,
    primaryIndicator: 'Digital Maturity Index dan Akses Pembiayaan sebagai proxy potensi pertumbuhan UMKM',
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
  };
}
