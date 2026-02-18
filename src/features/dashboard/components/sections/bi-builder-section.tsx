'use client';

import { useState, useMemo } from 'react';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { 
  BarChart3, 
  LineChart, 
  PieChart, 
  Map, 
  Target,
  X,
  Eye,
  EyeOff,
  Palette,
  Download,
  Share2,
  Check,
  TrendingUp,
  Smartphone,
  FileCheck,
  Wallet,
  Building2,
  Users,
  MapPin,
  Briefcase,
  Store,
  AlertCircle,
  PieChart as PieChartIcon
} from 'lucide-react';
import {
  LineChart as ReLineChart,
  Line,
  BarChart,
  Bar,
  PieChart as RePieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';

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

const availableKPIs: KPIOption[] = [
  { id: 'total-umkm', label: 'Total UMKM', value: '9.45 Juta', category: 'ekonomi' },
  { id: 'tenaga-kerja', label: 'Tenaga Kerja', value: '18.46 Juta', category: 'sosial' },
  { id: 'kontribusi-pdrb', label: 'Kontribusi PDRB', value: '23.4%', category: 'ekonomi' },
  { id: 'digitalisasi', label: 'Digitalisasi', value: '42.3%', category: 'digital' },
  { id: 'formalisasi', label: 'Formalisasi', value: '34.2%', category: 'ekonomi' },
  { id: 'pembiayaan', label: 'Akses Pembiayaan', value: '28.5%', category: 'ekonomi' },
  { id: 'wilayah', label: 'Wilayah Cakupan', value: '27 Kab/Kota', category: 'geografis' },
  { id: 'sektor-dominan', label: 'Sektor Dominan', value: 'Kuliner', category: 'ekonomi' },
  { id: 'pertumbuhan', label: 'Pertumbuhan YoY', value: '+12.5%', category: 'ekonomi' },
  { id: 'market-size', label: 'Market Size', value: 'Rp 124T', category: 'ekonomi' },
  { id: 'umkm-kecamatan', label: 'UMKM per Kecamatan', value: '1,247', category: 'geografis' },
  { id: 'intervensi', label: 'Butuh Intervensi', value: '23%', category: 'sosial' },
];

const availableVisualizations: VisualizationOption[] = [
  { id: 'tren-umkm', type: 'line', title: 'Tren Pertumbuhan UMKM', description: 'Grafik garis 5 tahun' },
  { id: 'perbandingan-kab', type: 'bar', title: 'Perbandingan Kabupaten', description: 'Bar chart horizontal' },
  { id: 'distribusi-sektor', type: 'pie', title: 'Distribusi Sektor', description: 'Pie chart komposisi' },
  { id: 'peta-sebaran', type: 'heatmap', title: 'Peta Sebaran UMKM', description: 'Heatmap geografis' },
  { id: 'indeks-kesehatan', type: 'gauge', title: 'Indeks Kesehatan', description: 'Gauge meter' },
  { id: 'digitalisasi-wilayah', type: 'bar', title: 'Digitalisasi per Wilayah', description: 'Stacked bar' },
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

const COLORS = ['#0891b2', '#10b981', '#8b5cf6', '#f59e0b', '#ef4444', '#6366f1'];

const lineData = [
  { year: '2021', value: 7200000 },
  { year: '2022', value: 7850000 },
  { year: '2023', value: 8620000 },
  { year: '2024', value: 9100000 },
  { year: '2025', value: 9450000 },
];

const barData = [
  { name: 'Bandung', value: 2100000 },
  { name: 'Bekasi', value: 1850000 },
  { name: 'Bogor', value: 1420000 },
  { name: 'Depok', value: 980000 },
  { name: 'Tasik', value: 850000 },
];

const pieData = [
  { name: 'Kuliner', value: 31 },
  { name: 'Fashion', value: 24 },
  { name: 'Kerajinan', value: 18 },
  { name: 'Elektronik', value: 12 },
  { name: 'Lainnya', value: 15 },
];

function ChartPreview({ type }: { type: string }) {
  if (type === 'line') {
    return (
      <ResponsiveContainer width="100%" height={180}>
        <ReLineChart data={lineData}>
          <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
          <XAxis dataKey="year" tick={{ fontSize: 10 }} stroke="#64748b" />
          <YAxis tick={{ fontSize: 10 }} stroke="#64748b" tickFormatter={(value) => `${(value / 1000000).toFixed(0)}M`} />
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
        <BarChart data={barData} layout="vertical">
          <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" horizontal={false} />
          <XAxis type="number" tick={{ fontSize: 10 }} stroke="#64748b" tickFormatter={(value) => `${(value / 1000000).toFixed(0)}M`} />
          <YAxis type="category" dataKey="name" tick={{ fontSize: 10 }} stroke="#64748b" width={60} />
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
            data={pieData}
            cx="50%"
            cy="50%"
            innerRadius={40}
            outerRadius={70}
            paddingAngle={2}
            dataKey="value"
          >
            {pieData.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
            ))}
          </Pie>
          <Tooltip formatter={(value: number) => [`${value}%`, '']} contentStyle={{ fontSize: 12, borderRadius: 8 }} />
        </RePieChart>
      </ResponsiveContainer>
    );
  }

  if (type === 'gauge') {
    return (
      <div className="flex items-center justify-center h-[180px]">
        <div className="relative w-32 h-32">
          <svg className="w-full h-full transform -rotate-90" viewBox="0 0 100 100">
            <circle
              cx="50"
              cy="50"
              r="40"
              fill="none"
              stroke="#e2e8f0"
              strokeWidth="10"
            />
            <circle
              cx="50"
              cy="50"
              r="40"
              fill="none"
              stroke="#10b981"
              strokeWidth="10"
              strokeDasharray={`${0.72 * 251.2} 251.2`}
              strokeLinecap="round"
            />
          </svg>
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <span className="text-2xl font-bold text-slate-900">72</span>
            <span className="text-xs text-slate-500">Indeks</span>
          </div>
        </div>
      </div>
    );
  }

  if (type === 'heatmap') {
    const heatmapData = [
      { x: 0, y: 0, value: 85, kab: 'Bandung' },
      { x: 1, y: 0, value: 72, kab: 'Bekasi' },
      { x: 2, y: 0, value: 68, kab: 'Bogor' },
      { x: 0, y: 1, value: 55, kab: 'Depok' },
      { x: 1, y: 1, value: 48, kab: 'Cimahi' },
      { x: 2, y: 1, value: 42, kab: 'Tasik' },
    ];
    
    const getColor = (value: number) => {
      if (value >= 80) return '#ef4444';
      if (value >= 60) return '#f59e0b';
      if (value >= 40) return '#10b981';
      return '#3b82f6';
    };
    
    return (
      <div className="h-[180px] flex flex-col">
        <div className="flex-1 grid grid-cols-3 gap-1 p-2">
          {heatmapData.map((cell, idx) => (
            <div
              key={idx}
              className="rounded flex flex-col items-center justify-center text-white text-xs font-medium cursor-pointer hover:opacity-80 transition-opacity"
              style={{ backgroundColor: getColor(cell.value) }}
            >
              <span className="text-[10px] opacity-80">{cell.kab}</span>
              <span className="text-sm font-bold">{cell.value}%</span>
            </div>
          ))}
        </div>
        <div className="flex items-center justify-center gap-4 mt-2 text-[10px] text-slate-500">
          <div className="flex items-center gap-1"><div className="w-3 h-3 rounded bg-red-500"></div> Tinggi</div>
          <div className="flex items-center gap-1"><div className="w-3 h-3 rounded bg-amber-500"></div> Sedang</div>
          <div className="flex items-center gap-1"><div className="w-3 h-3 rounded bg-emerald-500"></div> Rendah</div>
        </div>
      </div>
    );
  }

  return (
    <div className="h-[180px] bg-slate-50 rounded-lg border border-dashed border-slate-300 flex items-center justify-center">
      <span className="text-xs text-slate-400">Preview {type} chart</span>
    </div>
  );
}

export function BIBuilderSection() {
  const [selectedKPIs, setSelectedKPIs] = useState<string[]>(['total-umkm', 'digitalisasi', 'pertumbuhan']);
  const [selectedVizs, setSelectedVizs] = useState<string[]>(['tren-umkm', 'distribusi-sektor']);
  const [dashboardName, setDashboardName] = useState('Dashboard Saya');
  const [showPreview, setShowPreview] = useState(true);

  const selectedKPIData = useMemo(() => 
    availableKPIs.filter(kpi => selectedKPIs.includes(kpi.id)),
    [selectedKPIs]
  );

  const selectedVizData = useMemo(() =>
    availableVisualizations.filter(viz => selectedVizs.includes(viz.id)),
    [selectedVizs]
  );

  const toggleKPI = (kpiId: string) => {
    setSelectedKPIs(prev => 
      prev.includes(kpiId) 
        ? prev.filter(id => id !== kpiId)
        : [...prev, kpiId]
    );
  };

  const toggleViz = (vizId: string) => {
    setSelectedVizs(prev =>
      prev.includes(vizId)
        ? prev.filter(id => id !== vizId)
        : [...prev, vizId]
    );
  };

  const removeKPI = (kpiId: string) => {
    setSelectedKPIs(prev => prev.filter(id => id !== kpiId));
  };

  const removeViz = (vizId: string) => {
    setSelectedVizs(prev => prev.filter(id => id !== vizId));
  };

  return (
    <Card className="mb-6 sm:mb-8 overflow-hidden border-cyan-200 bg-gradient-to-br from-cyan-50/50 to-white">
      <CardHeader className="pb-3 sm:pb-4 border-b border-cyan-100 p-4 sm:p-6">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 sm:gap-0">
          <div className="flex items-center gap-2 sm:gap-3">
            <div className="p-2 sm:p-2.5 bg-cyan-100 rounded-lg sm:rounded-xl text-cyan-600 shrink-0">
              <Palette className="w-5 h-5 sm:w-6 sm:h-6" />
            </div>
            <div className="min-w-0">
              <CardTitle className="text-cyan-900 text-lg sm:text-xl">BI Dashboard Builder</CardTitle>
              <p className="text-xs sm:text-sm text-cyan-600 mt-0.5 sm:mt-1">
                Buat dashboard custom dengan KPI dan visualisasi pilihan Anda
              </p>
            </div>
          </div>
          <div className="flex gap-2">
            <button
              onClick={() => setShowPreview(!showPreview)}
              className="flex items-center gap-1.5 sm:gap-2 px-2.5 sm:px-3 py-2 text-xs sm:text-sm font-medium text-slate-600 bg-white border border-slate-200 rounded-lg hover:border-cyan-300 transition-colors"
            >
              {showPreview ? <EyeOff className="w-3.5 h-3.5 sm:w-4 sm:h-4" /> : <Eye className="w-3.5 h-3.5 sm:w-4 sm:h-4" />}
              <span className="hidden sm:inline">{showPreview ? 'Sembunyikan Preview' : 'Tampilkan Preview'}</span>
              <span className="sm:hidden">{showPreview ? 'Hide' : 'Show'}</span>
            </button>
            <button className="flex items-center gap-1.5 sm:gap-2 px-2.5 sm:px-3 py-2 text-xs sm:text-sm font-medium text-white bg-cyan-600 rounded-lg hover:bg-cyan-700 transition-colors">
              <Download className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
              <span className="hidden sm:inline">Simpan</span>
            </button>
          </div>
        </div>
      </CardHeader>
      
      <CardContent className="p-3 sm:p-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
          <div className="space-y-4 sm:space-y-6">
            <div className="p-3 sm:p-4 bg-white rounded-lg sm:rounded-xl border border-slate-200">
              <div className="flex items-center justify-between mb-3 sm:mb-4">
                <span className="font-semibold text-slate-900 text-sm sm:text-base">Pilih KPI</span>
                <Badge variant="info" className="text-xs">{selectedKPIs.length} dipilih</Badge>
              </div>

              <div className="space-y-3">
                {Object.entries(categoryLabels).map(([category, label]) => (
                  <div key={category}>
                    <div className="text-[10px] sm:text-xs font-medium text-slate-500 uppercase tracking-wider mb-2">{label}</div>
                    <div className="grid grid-cols-1 gap-2">
                      {availableKPIs
                        .filter(kpi => kpi.category === category)
                        .map(kpi => {
                          const isSelected = selectedKPIs.includes(kpi.id);
                          const colors = categoryColors[category];
                          
                          return (
                            <button
                              key={kpi.id}
                              onClick={() => toggleKPI(kpi.id)}
                              className={`flex items-center justify-between p-2.5 sm:p-3 rounded-lg border text-left transition-all ${
                                isSelected 
                                  ? `${colors.bg} ${colors.border} border-2` 
                                  : 'bg-slate-50 border-slate-200 hover:border-slate-300'
                              }`}
                            >
                              <div className="min-w-0">
                                <div className={`text-xs sm:text-sm font-medium ${isSelected ? colors.text : 'text-slate-700'}`}>
                                  {kpi.label}
                                </div>
                                <div className="text-[10px] sm:text-xs text-slate-500">{kpi.value}</div>
                              </div>
                              {isSelected && <Check className={`w-3.5 h-3.5 sm:w-4 sm:h-4 ${colors.text} shrink-0`} />}
                            </button>
                          );
                        })}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="p-3 sm:p-4 bg-white rounded-lg sm:rounded-xl border border-slate-200">
              <div className="flex items-center justify-between mb-3 sm:mb-4">
                <span className="font-semibold text-slate-900 text-sm sm:text-base">Pilih Visualisasi</span>
                <Badge variant="info" className="text-xs">{selectedVizs.length} dipilih</Badge>
              </div>

              <div className="grid grid-cols-1 gap-2">
                {availableVisualizations.map(viz => {
                  const isSelected = selectedVizs.includes(viz.id);
                  
                  return (
                    <button
                      key={viz.id}
                      onClick={() => toggleViz(viz.id)}
                      className={`flex items-center gap-2 sm:gap-3 p-2.5 sm:p-3 rounded-lg border text-left transition-all ${
                        isSelected 
                          ? 'bg-cyan-50 border-cyan-300 border-2' 
                          : 'bg-slate-50 border-slate-200 hover:border-slate-300'
                      }`}
                    >
                      <div className={`p-1.5 sm:p-2 rounded-lg shrink-0 ${isSelected ? 'bg-cyan-100 text-cyan-600' : 'bg-slate-200 text-slate-500'}`}>
                        {viz.type === 'line' && <TrendingUp className="w-3.5 h-3.5 sm:w-4 sm:h-4" />}
                        {viz.type === 'bar' && <BarChart3 className="w-3.5 h-3.5 sm:w-4 sm:h-4" />}
                        {viz.type === 'pie' && <PieChartIcon className="w-3.5 h-3.5 sm:w-4 sm:h-4" />}
                        {viz.type === 'gauge' && <Target className="w-3.5 h-3.5 sm:w-4 sm:h-4" />}
                        {viz.type === 'heatmap' && <Map className="w-3.5 h-3.5 sm:w-4 sm:h-4" />}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className={`text-xs sm:text-sm font-medium ${isSelected ? 'text-cyan-900' : 'text-slate-700'}`}>
                          {viz.title}
                        </div>
                        <div className="text-[10px] sm:text-xs text-slate-500 truncate">{viz.description}</div>
                      </div>
                      {isSelected && <Check className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-cyan-600 shrink-0" />}
                    </button>
                  );
                })}
              </div>
            </div>
          </div>

          {showPreview && (
            <div className="space-y-3 sm:space-y-4">
              <div className="flex items-center justify-between">
                <input
                  type="text"
                  value={dashboardName}
                  onChange={(e) => setDashboardName(e.target.value)}
                  className="text-base sm:text-lg font-bold text-slate-900 bg-transparent border-b border-transparent hover:border-slate-300 focus:border-cyan-500 focus:outline-none transition-colors w-full mr-2"
                />
                <div className="flex gap-2">
                  <button className="flex items-center gap-1 text-[10px] sm:text-xs text-slate-500 hover:text-slate-700">
                    <Share2 className="w-3 h-3" />
                    <span className="hidden sm:inline">Bagikan</span>
                  </button>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-2 sm:gap-3">
                {selectedKPIData.map((kpi) => {
                  const colors = categoryColors[kpi.category];
                  return (
                    <div key={kpi.id} className={`relative p-3 sm:p-4 rounded-lg sm:rounded-xl border ${colors.bg} ${colors.border}`}>
                      <button
                        onClick={() => removeKPI(kpi.id)}
                        className="absolute top-1.5 right-1.5 sm:top-2 sm:right-2 p-1 rounded-full hover:bg-white/50 text-slate-400 hover:text-red-500 transition-colors"
                      >
                        <X className="w-3 h-3" />
                      </button>
                      <div className={`text-[10px] sm:text-xs font-medium ${colors.text} mb-1 truncate`}>{kpi.label}</div>
                      <div className="text-lg sm:text-xl font-bold text-slate-900">{kpi.value}</div>
                    </div>
                  );
                })}
              </div>

              <div className="space-y-2 sm:space-y-3">
                {selectedVizData.map((viz) => {
                  return (
                    <div key={viz.id} className="relative p-3 sm:p-4 bg-white rounded-lg sm:rounded-xl border border-slate-200">
                      <button
                        onClick={() => removeViz(viz.id)}
                        className="absolute top-1.5 right-1.5 sm:top-2 sm:right-2 p-1 rounded-full hover:bg-slate-100 text-slate-400 hover:text-red-500 transition-colors z-10"
                      >
                        <X className="w-3 h-3" />
                      </button>
                      <div className="flex items-center gap-2 sm:gap-3 mb-2 sm:mb-3">
                        <div className="p-1.5 sm:p-2 bg-cyan-100 rounded-lg text-cyan-600 shrink-0">
                          {viz.type === 'line' && <TrendingUp className="w-4 h-4 sm:w-5 sm:h-5" />}
                          {viz.type === 'bar' && <BarChart3 className="w-4 h-4 sm:w-5 sm:h-5" />}
                          {viz.type === 'pie' && <PieChartIcon className="w-4 h-4 sm:w-5 sm:h-5" />}
                          {viz.type === 'gauge' && <Target className="w-4 h-4 sm:w-5 sm:h-5" />}
                          {viz.type === 'heatmap' && <Map className="w-4 h-4 sm:w-5 sm:h-5" />}
                        </div>
                        <div className="min-w-0">
                          <div className="font-medium text-slate-900 text-sm sm:text-base truncate">{viz.title}</div>
                          <div className="text-[10px] sm:text-xs text-slate-500 truncate">{viz.description}</div>
                        </div>
                      </div>
                      <ChartPreview type={viz.type} />
                    </div>
                  );
                })}
              </div>

              {selectedKPIs.length === 0 && selectedVizs.length === 0 && (
                <div className="p-6 sm:p-8 text-center border-2 border-dashed border-slate-200 rounded-lg sm:rounded-xl">
                  <Palette className="w-10 h-10 sm:w-12 sm:h-12 text-slate-300 mx-auto mb-3" />
                  <p className="text-sm text-slate-500">Dashboard masih kosong</p>
                  <p className="text-xs text-slate-400 mt-1">Pilih KPI dan visualisasi di sebelah kiri</p>
                </div>
              )}
            </div>
          )}
        </div>

        <div className="mt-4 sm:mt-6 p-3 sm:p-4 bg-gradient-to-r from-cyan-600 to-teal-600 rounded-lg sm:rounded-xl text-white">
          <div className="flex items-center gap-2 mb-2">
            <Palette className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-cyan-200" />
            <h4 className="font-semibold text-xs sm:text-sm">Tips Membangun Dashboard Efektif</h4>
          </div>
          <ul className="text-[10px] sm:text-xs text-cyan-100 leading-relaxed space-y-1 ml-3 sm:ml-4">
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
