'use client';

import { useMemo, useState } from 'react';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
  BarChart3,
  Check,
  Download,
  Eye,
  EyeOff,
  Map as MapIcon,
  Palette,
  PieChart as PieChartIcon,
  Share2,
  Target,
  TrendingUp,
  X,
} from 'lucide-react';
import {
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  Line,
  LineChart as ReLineChart,
  Pie,
  PieChart as RePieChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts';
import type { DashboardViewModelExtended, UmkmRawDataRow } from '../../types';

interface KPIOption {
  id: string;
  label: string;
  value: string;
  category: 'ekonomi' | 'sosial' | 'digital' | 'geografis';
}

interface VisualizationOption {
  id: string;
  type: 'bar' | 'line' | 'pie' | 'heatmap' | 'gauge';
  title: string;
  description: string;
}

interface BIBuilderSectionProps {
  viewModel: DashboardViewModelExtended;
  rawData: UmkmRawDataRow[];
}

interface ChartPreviewData {
  lineData: { year: string; value: number }[];
  barData: { name: string; value: number }[];
  pieData: { name: string; value: number }[];
  heatmapData: { kab: string; value: number }[];
  healthIndex: number;
}

const availableVisualizations: VisualizationOption[] = [
  { id: 'tren-umkm', type: 'line', title: 'Tren Pertumbuhan UMKM', description: 'Grafik garis data historis' },
  { id: 'perbandingan-kab', type: 'bar', title: 'Perbandingan Kabupaten', description: 'Bar chart berdasarkan data aktif' },
  { id: 'distribusi-sektor', type: 'pie', title: 'Distribusi Sektor', description: 'Pie chart komposisi sektor' },
  { id: 'peta-sebaran', type: 'heatmap', title: 'Peta Sebaran UMKM', description: 'Heatmap digitalisasi wilayah' },
  { id: 'indeks-kesehatan', type: 'gauge', title: 'Indeks Kesehatan', description: 'Gauge indeks kesiapan UMKM' },
  { id: 'digitalisasi-wilayah', type: 'bar', title: 'Digitalisasi per Wilayah', description: 'Bar chart kabupaten digital-ready' },
];

const categoryColors: Record<string, { bg: string; text: string; border: string }> = {
  ekonomi: { bg: 'bg-emerald-50', text: 'text-emerald-700', border: 'border-emerald-200' },
  sosial: { bg: 'bg-blue-50', text: 'text-blue-700', border: 'border-blue-200' },
  digital: { bg: 'bg-violet-50', text: 'text-violet-700', border: 'border-violet-200' },
  geografis: { bg: 'bg-amber-50', text: 'text-amber-700', border: 'border-amber-200' },
};

const categoryLabels: Record<string, string> = {
  ekonomi: 'Ekonomi',
  sosial: 'Sosial',
  digital: 'Digital',
  geografis: 'Geografis',
};

const COLORS = ['#0891b2', '#10b981', '#8b5cf6', '#f59e0b', '#ef4444', '#6366f1', '#14b8a6'];

function formatCompactNumber(value: number): string {
  return new Intl.NumberFormat('id-ID', { notation: 'compact', maximumFractionDigits: 1 }).format(value);
}

function formatPercent(value: number): string {
  return `${value.toFixed(1)}%`;
}

function buildKPIOptions(viewModel: DashboardViewModelExtended): KPIOption[] {
  const topSektorName = [...viewModel.bySektor].sort((a, b) => b.totalUmkm - a.totalUmkm)[0]?.sektor ?? '-';
  const topKecamatan = viewModel.topKecamatan[0];
  const highNeedCount = viewModel.topKecamatan.filter((item) => item.priorityScore >= 60).length;
  const interventionRate =
    viewModel.topKecamatan.length > 0 ? (highNeedCount / viewModel.topKecamatan.length) * 100 : 0;

  return [
    {
      id: 'total-umkm',
      label: 'Total UMKM',
      value: viewModel.kpiSummary.totalUmkm.toLocaleString('id-ID'),
      category: 'ekonomi',
    },
    {
      id: 'tenaga-kerja',
      label: 'Tenaga Kerja',
      value: viewModel.kpiSummary.totalTenagaKerja.toLocaleString('id-ID'),
      category: 'sosial',
    },
    {
      id: 'kontribusi-pdrb',
      label: 'Kontribusi Ekonomi',
      value: formatPercent(viewModel.kpiSummary.avgPersenFormal),
      category: 'ekonomi',
    },
    {
      id: 'digitalisasi',
      label: 'Digitalisasi',
      value: formatPercent(viewModel.kpiSummary.avgPersenDigital),
      category: 'digital',
    },
    {
      id: 'formalisasi',
      label: 'Formalisasi',
      value: formatPercent(viewModel.kpiSummary.avgPersenFormal),
      category: 'ekonomi',
    },
    {
      id: 'pembiayaan',
      label: 'Akses Pembiayaan',
      value: formatPercent(viewModel.kpiSummary.avgPersenAksesPembiayaan),
      category: 'ekonomi',
    },
    {
      id: 'wilayah',
      label: 'Wilayah Cakupan',
      value: `${viewModel.meta.kabKotaCount} Kab/Kota`,
      category: 'geografis',
    },
    {
      id: 'sektor-dominan',
      label: 'Sektor Dominan',
      value: topSektorName,
      category: 'ekonomi',
    },
    {
      id: 'pertumbuhan',
      label: 'Pertumbuhan YoY',
      value: viewModel.yoyComparison ? formatPercent(viewModel.yoyComparison.umkmGrowth) : 'N/A',
      category: 'ekonomi',
    },
    {
      id: 'market-size',
      label: 'Market Size',
      value: `Rp ${formatCompactNumber(viewModel.kpiSummary.totalOmzetMiliar)} M`,
      category: 'ekonomi',
    },
    {
      id: 'umkm-kecamatan',
      label: 'UMKM per Kecamatan',
      value: topKecamatan ? topKecamatan.totalUmkm.toLocaleString('id-ID') : '0',
      category: 'geografis',
    },
    {
      id: 'intervensi',
      label: 'Butuh Intervensi',
      value: formatPercent(interventionRate),
      category: 'sosial',
    },
  ];
}

function buildChartPreviewData(
  rawData: UmkmRawDataRow[],
  viewModel: DashboardViewModelExtended
): ChartPreviewData {
  const yearlyMap = new Map<number, number>();
  for (const row of rawData) {
    yearlyMap.set(row.tahun, (yearlyMap.get(row.tahun) ?? 0) + row.jumlahUmkm);
  }
  const lineData = Array.from(yearlyMap.entries())
    .sort((a, b) => a[0] - b[0])
    .map(([year, value]) => ({ year: String(year), value }));

  const barData = [...viewModel.byKabKota]
    .sort((a, b) => b.totalUmkm - a.totalUmkm)
    .slice(0, 6)
    .map((item) => ({ name: item.kabKota, value: item.totalUmkm }));

  const totalBySektor = viewModel.bySektor.reduce((acc, item) => acc + item.totalUmkm, 0);
  const pieData = [...viewModel.bySektor]
    .sort((a, b) => b.totalUmkm - a.totalUmkm)
    .slice(0, 6)
    .map((item) => ({
      name: item.sektor,
      value: totalBySektor === 0 ? 0 : Number(((item.totalUmkm / totalBySektor) * 100).toFixed(1)),
    }));

  const heatmapData = [...viewModel.byKabKota]
    .sort((a, b) => b.avgPersenDigital - a.avgPersenDigital)
    .slice(0, 6)
    .map((item) => ({ kab: item.kabKota, value: Number(item.avgPersenDigital.toFixed(1)) }));

  const healthIndex = Math.max(
    0,
    Math.min(
      100,
      Number(
        (
          viewModel.kpiSummary.avgPersenDigital * 0.4 +
          viewModel.kpiSummary.avgPersenFormal * 0.35 +
          viewModel.kpiSummary.avgPersenAksesPembiayaan * 0.25
        ).toFixed(1)
      )
    )
  );

  return {
    lineData,
    barData,
    pieData,
    heatmapData,
    healthIndex,
  };
}

function ChartPreview({ type, chartData }: { type: string; chartData: ChartPreviewData }) {
  if (type === 'line') {
    return (
      <ResponsiveContainer width="100%" height={180}>
        <ReLineChart data={chartData.lineData}>
          <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
          <XAxis dataKey="year" tick={{ fontSize: 10 }} stroke="#64748b" />
          <YAxis tick={{ fontSize: 10 }} stroke="#64748b" tickFormatter={(value) => `${(value / 1000000).toFixed(1)}M`} />
          <Tooltip
            formatter={(value: number) => [`${(value / 1000000).toFixed(2)} Juta`, 'UMKM']}
            contentStyle={{ fontSize: 12, borderRadius: 8 }}
          />
          <Line
            type="monotone"
            dataKey="value"
            stroke="#0891b2"
            strokeWidth={2}
            dot={{ fill: '#0891b2', strokeWidth: 2, r: 3 }}
            activeDot={{ r: 5 }}
          />
        </ReLineChart>
      </ResponsiveContainer>
    );
  }

  if (type === 'bar') {
    return (
      <ResponsiveContainer width="100%" height={180}>
        <BarChart data={chartData.barData} layout="vertical">
          <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" horizontal={false} />
          <XAxis type="number" tick={{ fontSize: 10 }} stroke="#64748b" tickFormatter={(value) => `${(value / 1000000).toFixed(1)}M`} />
          <YAxis type="category" dataKey="name" tick={{ fontSize: 10 }} stroke="#64748b" width={80} />
          <Tooltip
            formatter={(value: number) => [`${(value / 1000000).toFixed(2)} Juta`, 'UMKM']}
            contentStyle={{ fontSize: 12, borderRadius: 8 }}
          />
          <Bar dataKey="value" fill="#0891b2" radius={[0, 4, 4, 0]} />
        </BarChart>
      </ResponsiveContainer>
    );
  }

  if (type === 'pie') {
    return (
      <ResponsiveContainer width="100%" height={180}>
        <RePieChart>
          <Pie
            data={chartData.pieData}
            cx="50%"
            cy="50%"
            innerRadius={40}
            outerRadius={70}
            paddingAngle={2}
            dataKey="value"
          >
            {chartData.pieData.map((entry, index) => (
              <Cell key={`${entry.name}-${index}`} fill={COLORS[index % COLORS.length]} />
            ))}
          </Pie>
          <Tooltip formatter={(value: number) => [`${value}%`, '']} contentStyle={{ fontSize: 12, borderRadius: 8 }} />
        </RePieChart>
      </ResponsiveContainer>
    );
  }

  if (type === 'gauge') {
    const circumference = 251.2;
    const stroke = (chartData.healthIndex / 100) * circumference;

    return (
      <div className="flex h-[180px] items-center justify-center">
        <div className="relative h-32 w-32">
          <svg className="h-full w-full -rotate-90 transform" viewBox="0 0 100 100">
            <circle cx="50" cy="50" r="40" fill="none" stroke="#e2e8f0" strokeWidth="10" />
            <circle
              cx="50"
              cy="50"
              r="40"
              fill="none"
              stroke="#10b981"
              strokeWidth="10"
              strokeDasharray={`${stroke} ${circumference}`}
              strokeLinecap="round"
            />
          </svg>
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <span className="text-2xl font-bold text-slate-900">{chartData.healthIndex.toFixed(0)}</span>
            <span className="text-xs text-slate-500">Indeks</span>
          </div>
        </div>
      </div>
    );
  }

  if (type === 'heatmap') {
    const getColor = (value: number) => {
      if (value >= 60) return '#ef4444';
      if (value >= 45) return '#f59e0b';
      if (value >= 30) return '#10b981';
      return '#3b82f6';
    };

    return (
      <div className="flex h-[180px] flex-col">
        <div className="grid flex-1 grid-cols-3 gap-1 p-2">
          {chartData.heatmapData.map((cell) => (
            <div
              key={cell.kab}
              className="flex cursor-pointer flex-col items-center justify-center rounded text-xs font-medium text-white transition-opacity hover:opacity-80"
              style={{ backgroundColor: getColor(cell.value) }}
            >
              <span className="text-[10px] opacity-80">{cell.kab}</span>
              <span className="text-sm font-bold">{cell.value}%</span>
            </div>
          ))}
        </div>
        <div className="mt-2 flex items-center justify-center gap-4 text-[10px] text-slate-500">
          <div className="flex items-center gap-1"><div className="h-3 w-3 rounded bg-red-500" /> Tinggi</div>
          <div className="flex items-center gap-1"><div className="h-3 w-3 rounded bg-amber-500" /> Sedang</div>
          <div className="flex items-center gap-1"><div className="h-3 w-3 rounded bg-emerald-500" /> Rendah</div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex h-[180px] items-center justify-center rounded-lg border border-dashed border-slate-300 bg-slate-50">
      <span className="text-xs text-slate-400">Preview {type} chart</span>
    </div>
  );
}

export function BIBuilderSection({ viewModel, rawData }: BIBuilderSectionProps) {
  const availableKPIs = useMemo(() => buildKPIOptions(viewModel), [viewModel]);
  const chartData = useMemo(() => buildChartPreviewData(rawData, viewModel), [rawData, viewModel]);

  const [selectedKPIs, setSelectedKPIs] = useState<string[]>(['total-umkm', 'digitalisasi', 'pertumbuhan']);
  const [selectedVizs, setSelectedVizs] = useState<string[]>(['tren-umkm', 'distribusi-sektor']);
  const [dashboardName, setDashboardName] = useState('Dashboard Saya');
  const [showPreview, setShowPreview] = useState(true);
  const [shareStatus, setShareStatus] = useState<{
    tone: 'success' | 'error' | 'idle';
    message: string;
  }>({
    tone: 'idle',
    message: '',
  });

  const selectedKPIData = useMemo(
    () => availableKPIs.filter((kpi) => selectedKPIs.includes(kpi.id)),
    [availableKPIs, selectedKPIs]
  );

  const selectedVizData = useMemo(
    () => availableVisualizations.filter((viz) => selectedVizs.includes(viz.id)),
    [selectedVizs]
  );

  const toggleKPI = (kpiId: string) => {
    setSelectedKPIs((prev) =>
      prev.includes(kpiId) ? prev.filter((id) => id !== kpiId) : [...prev, kpiId]
    );
  };

  const toggleViz = (vizId: string) => {
    setSelectedVizs((prev) =>
      prev.includes(vizId) ? prev.filter((id) => id !== vizId) : [...prev, vizId]
    );
  };

  const removeKPI = (kpiId: string) => {
    setSelectedKPIs((prev) => prev.filter((id) => id !== kpiId));
  };

  const removeViz = (vizId: string) => {
    setSelectedVizs((prev) => prev.filter((id) => id !== vizId));
  };

  const handleShareDashboard = async () => {
    if (typeof window === 'undefined') return;

    const params = new URLSearchParams(window.location.search);
    params.set('builderName', dashboardName.trim() || 'Dashboard Saya');
    params.set('builderKpis', selectedKPIs.join(','));
    params.set('builderViz', selectedVizs.join(','));

    const shareUrl = `${window.location.origin}${window.location.pathname}?${params.toString()}`;
    const shareText = `Dashboard BI: ${dashboardName.trim() || 'Dashboard Saya'} | KPI ${selectedKPIs.length} | Visualisasi ${selectedVizs.length}`;

    try {
      if (navigator.share) {
        await navigator.share({
          title: 'Dashboard BI Builder',
          text: shareText,
          url: shareUrl,
        });

        setShareStatus({ tone: 'success', message: 'Dashboard berhasil dibagikan.' });
        return;
      }

      if (navigator.clipboard?.writeText) {
        await navigator.clipboard.writeText(shareUrl);
        setShareStatus({ tone: 'success', message: 'Link dashboard disalin ke clipboard.' });
        return;
      }

      setShareStatus({ tone: 'error', message: 'Browser tidak mendukung fitur bagikan/clipboard.' });
    } catch {
      setShareStatus({ tone: 'error', message: 'Gagal membagikan dashboard. Coba lagi.' });
    }
  };

  return (
    <Card className="mb-6 overflow-hidden border-cyan-200 bg-gradient-to-br from-cyan-50/50 to-white sm:mb-8">
      <CardHeader className="border-b border-cyan-100 p-4 pb-3 sm:p-6 sm:pb-4">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between sm:gap-0">
          <div className="flex items-center gap-2 sm:gap-3">
            <div className="shrink-0 rounded-lg bg-cyan-100 p-2 text-cyan-600 sm:rounded-xl sm:p-2.5">
              <Palette className="h-5 w-5 sm:h-6 sm:w-6" />
            </div>
            <div className="min-w-0">
              <CardTitle className="text-lg text-cyan-900 sm:text-xl">BI Dashboard Builder</CardTitle>
              <p className="mt-0.5 text-xs text-cyan-600 sm:mt-1 sm:text-sm">
                Buat dashboard custom dengan KPI dan visualisasi pilihan Anda
              </p>
            </div>
          </div>
          <div className="flex gap-2">
            <button
              onClick={() => setShowPreview(!showPreview)}
              className="flex items-center gap-1.5 rounded-lg border border-slate-200 bg-white px-2.5 py-2 text-xs font-medium text-slate-600 transition-colors hover:border-cyan-300 sm:gap-2 sm:px-3 sm:text-sm"
            >
              {showPreview ? <EyeOff className="h-3.5 w-3.5 sm:h-4 sm:w-4" /> : <Eye className="h-3.5 w-3.5 sm:h-4 sm:w-4" />}
              <span className="hidden sm:inline">{showPreview ? 'Sembunyikan Preview' : 'Tampilkan Preview'}</span>
              <span className="sm:hidden">{showPreview ? 'Hide' : 'Show'}</span>
            </button>
            <button className="flex items-center gap-1.5 rounded-lg bg-cyan-600 px-2.5 py-2 text-xs font-medium text-white transition-colors hover:bg-cyan-700 sm:gap-2 sm:px-3 sm:text-sm">
              <Download className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
              <span className="hidden sm:inline">Simpan</span>
            </button>
          </div>
        </div>
      </CardHeader>

      <CardContent className="p-3 sm:p-6">
        <div className="grid grid-cols-1 gap-4 sm:gap-6 lg:grid-cols-2">
          <div className="space-y-4 sm:space-y-6">
            <div className="rounded-lg border border-slate-200 bg-white p-3 sm:rounded-xl sm:p-4">
              <div className="mb-3 flex items-center justify-between sm:mb-4">
                <span className="text-sm font-semibold text-slate-900 sm:text-base">Pilih KPI</span>
                <Badge variant="info" className="text-xs">{selectedKPIs.length} dipilih</Badge>
              </div>

              <div className="space-y-3">
                {Object.entries(categoryLabels).map(([category, label]) => (
                  <div key={category}>
                    <div className="mb-2 text-[10px] font-medium uppercase tracking-wider text-slate-500 sm:text-xs">{label}</div>
                    <div className="grid grid-cols-1 gap-2">
                      {availableKPIs
                        .filter((kpi) => kpi.category === category)
                        .map((kpi) => {
                          const isSelected = selectedKPIs.includes(kpi.id);
                          const colors = categoryColors[category];

                          return (
                            <button
                              key={kpi.id}
                              onClick={() => toggleKPI(kpi.id)}
                              className={`flex items-center justify-between rounded-lg border p-2.5 text-left transition-all sm:p-3 ${
                                isSelected
                                  ? `${colors.bg} ${colors.border} border-2`
                                  : 'border-slate-200 bg-slate-50 hover:border-slate-300'
                              }`}
                            >
                              <div className="min-w-0">
                                <div className={`text-xs font-medium sm:text-sm ${isSelected ? colors.text : 'text-slate-700'}`}>
                                  {kpi.label}
                                </div>
                                <div className="text-[10px] text-slate-500 sm:text-xs">{kpi.value}</div>
                              </div>
                              {isSelected ? <Check className={`h-3.5 w-3.5 shrink-0 sm:h-4 sm:w-4 ${colors.text}`} /> : null}
                            </button>
                          );
                        })}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="rounded-lg border border-slate-200 bg-white p-3 sm:rounded-xl sm:p-4">
              <div className="mb-3 flex items-center justify-between sm:mb-4">
                <span className="text-sm font-semibold text-slate-900 sm:text-base">Pilih Visualisasi</span>
                <Badge variant="info" className="text-xs">{selectedVizs.length} dipilih</Badge>
              </div>

              <div className="grid grid-cols-1 gap-2">
                {availableVisualizations.map((viz) => {
                  const isSelected = selectedVizs.includes(viz.id);

                  return (
                    <button
                      key={viz.id}
                      onClick={() => toggleViz(viz.id)}
                      className={`flex items-center gap-2 rounded-lg border p-2.5 text-left transition-all sm:gap-3 sm:p-3 ${
                        isSelected ? 'border-2 border-cyan-300 bg-cyan-50' : 'border-slate-200 bg-slate-50 hover:border-slate-300'
                      }`}
                    >
                      <div className={`shrink-0 rounded-lg p-1.5 sm:p-2 ${isSelected ? 'bg-cyan-100 text-cyan-600' : 'bg-slate-200 text-slate-500'}`}>
                        {viz.type === 'line' ? <TrendingUp className="h-3.5 w-3.5 sm:h-4 sm:w-4" /> : null}
                        {viz.type === 'bar' ? <BarChart3 className="h-3.5 w-3.5 sm:h-4 sm:w-4" /> : null}
                        {viz.type === 'pie' ? <PieChartIcon className="h-3.5 w-3.5 sm:h-4 sm:w-4" /> : null}
                        {viz.type === 'gauge' ? <Target className="h-3.5 w-3.5 sm:h-4 sm:w-4" /> : null}
                        {viz.type === 'heatmap' ? <MapIcon className="h-3.5 w-3.5 sm:h-4 sm:w-4" /> : null}
                      </div>
                      <div className="min-w-0 flex-1">
                        <div className={`text-xs font-medium sm:text-sm ${isSelected ? 'text-cyan-900' : 'text-slate-700'}`}>
                          {viz.title}
                        </div>
                        <div className="truncate text-[10px] text-slate-500 sm:text-xs">{viz.description}</div>
                      </div>
                      {isSelected ? <Check className="h-3.5 w-3.5 shrink-0 text-cyan-600 sm:h-4 sm:w-4" /> : null}
                    </button>
                  );
                })}
              </div>
            </div>
          </div>

          {showPreview ? (
            <div className="space-y-3 sm:space-y-4">
              <div className="flex items-center justify-between">
                <input
                  type="text"
                  value={dashboardName}
                  onChange={(event) => setDashboardName(event.target.value)}
                  className="mr-2 w-full border-b border-transparent bg-transparent text-base font-bold text-slate-900 transition-colors hover:border-slate-300 focus:border-cyan-500 focus:outline-none sm:text-lg"
                />
                <div className="flex gap-2">
                  <button
                    onClick={handleShareDashboard}
                    className="flex items-center gap-1 text-[10px] text-slate-500 hover:text-slate-700 sm:text-xs"
                  >
                    <Share2 className="h-3 w-3" />
                    <span className="hidden sm:inline">Bagikan</span>
                  </button>
                </div>
              </div>

              {shareStatus.message ? (
                <div
                  className={`rounded-lg border px-2.5 py-1.5 text-[10px] sm:text-xs ${
                    shareStatus.tone === 'success'
                      ? 'border-emerald-200 bg-emerald-50 text-emerald-700'
                      : 'border-rose-200 bg-rose-50 text-rose-700'
                  }`}
                >
                  {shareStatus.message}
                </div>
              ) : null}

              <div className="grid grid-cols-2 gap-2 sm:gap-3">
                {selectedKPIData.map((kpi) => {
                  const colors = categoryColors[kpi.category];
                  return (
                    <div key={kpi.id} className={`relative rounded-lg border p-3 sm:rounded-xl sm:p-4 ${colors.bg} ${colors.border}`}>
                      <button
                        onClick={() => removeKPI(kpi.id)}
                        className="absolute right-1.5 top-1.5 rounded-full p-1 text-slate-400 transition-colors hover:bg-white/50 hover:text-red-500 sm:right-2 sm:top-2"
                      >
                        <X className="h-3 w-3" />
                      </button>
                      <div className={`mb-1 truncate text-[10px] font-medium sm:text-xs ${colors.text}`}>{kpi.label}</div>
                      <div className="text-lg font-bold text-slate-900 sm:text-xl">{kpi.value}</div>
                    </div>
                  );
                })}
              </div>

              <div className="space-y-2 sm:space-y-3">
                {selectedVizData.map((viz) => (
                  <div key={viz.id} className="relative rounded-lg border border-slate-200 bg-white p-3 sm:rounded-xl sm:p-4">
                    <button
                      onClick={() => removeViz(viz.id)}
                      className="absolute right-1.5 top-1.5 z-10 rounded-full p-1 text-slate-400 transition-colors hover:bg-slate-100 hover:text-red-500 sm:right-2 sm:top-2"
                    >
                      <X className="h-3 w-3" />
                    </button>
                    <div className="mb-2 flex items-center gap-2 sm:mb-3 sm:gap-3">
                      <div className="shrink-0 rounded-lg bg-cyan-100 p-1.5 text-cyan-600 sm:p-2">
                        {viz.type === 'line' ? <TrendingUp className="h-4 w-4 sm:h-5 sm:w-5" /> : null}
                        {viz.type === 'bar' ? <BarChart3 className="h-4 w-4 sm:h-5 sm:w-5" /> : null}
                        {viz.type === 'pie' ? <PieChartIcon className="h-4 w-4 sm:h-5 sm:w-5" /> : null}
                        {viz.type === 'gauge' ? <Target className="h-4 w-4 sm:h-5 sm:w-5" /> : null}
                        {viz.type === 'heatmap' ? <MapIcon className="h-4 w-4 sm:h-5 sm:w-5" /> : null}
                      </div>
                      <div className="min-w-0">
                        <div className="truncate text-sm font-medium text-slate-900 sm:text-base">{viz.title}</div>
                        <div className="truncate text-[10px] text-slate-500 sm:text-xs">{viz.description}</div>
                      </div>
                    </div>
                    <ChartPreview type={viz.type} chartData={chartData} />
                  </div>
                ))}
              </div>

              {selectedKPIs.length === 0 && selectedVizs.length === 0 ? (
                <div className="rounded-lg border-2 border-dashed border-slate-200 p-6 text-center sm:rounded-xl sm:p-8">
                  <Palette className="mx-auto mb-3 h-10 w-10 text-slate-300 sm:h-12 sm:w-12" />
                  <p className="text-sm text-slate-500">Dashboard masih kosong</p>
                  <p className="mt-1 text-xs text-slate-400">Pilih KPI dan visualisasi di sebelah kiri</p>
                </div>
              ) : null}
            </div>
          ) : null}
        </div>

        <div className="mt-4 rounded-lg bg-gradient-to-r from-cyan-600 to-teal-600 p-3 text-white sm:mt-6 sm:rounded-xl sm:p-4">
          <div className="mb-2 flex items-center gap-2">
            <Palette className="h-3.5 w-3.5 text-cyan-200 sm:h-4 sm:w-4" />
            <h4 className="text-xs font-semibold sm:text-sm">Tips Membangun Dashboard Efektif</h4>
          </div>
          <ul className="ml-3 space-y-1 text-[10px] leading-relaxed text-cyan-100 sm:ml-4 sm:text-xs">
            <li>• Pilih 4-6 KPI yang paling relevan dengan tujuan Anda (jangan terlalu banyak)</li>
            <li>• Kombinasikan metrics dari kategori berbeda (ekonomi, sosial, digital)</li>
            <li>• Pilih visualisasi yang sesuai dengan tipe data (trend=line, komposisi=pie)</li>
            <li>• Dashboard yang baik menjawab pertanyaan spesifik, bukan menampilkan semua data</li>
          </ul>
        </div>
      </CardContent>
    </Card>
  );
}
