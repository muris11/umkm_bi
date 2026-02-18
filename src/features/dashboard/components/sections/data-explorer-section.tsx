'use client';

import React, { useState, useMemo } from 'react';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { 
  Search, 
  Filter, 
  MapPin, 
  Building2,
  TrendingUp,
  Download,
  Eye,
  ChevronDown,
  ChevronUp,
  BarChart3
} from 'lucide-react';

interface DataRow {
  id: string;
  kecamatan: string;
  kabKota: string;
  jumlahUmkm: number;
  sektor: string;
  digitalRate: number;
  formalRate: number;
  omzet: number;
  priority: 'high' | 'medium' | 'low';
}

const sampleData: DataRow[] = [
  { id: '1', kecamatan: 'Bandung Wetan', kabKota: 'Bandung', jumlahUmkm: 1247, sektor: 'Kuliner', digitalRate: 58, formalRate: 41, omzet: 45.2, priority: 'high' },
  { id: '2', kecamatan: 'Coblong', kabKota: 'Bandung', jumlahUmkm: 2156, sektor: 'Fashion', digitalRate: 62, formalRate: 38, omzet: 78.5, priority: 'high' },
  { id: '3', kecamatan: 'Bogor Tengah', kabKota: 'Bogor', jumlahUmkm: 1890, sektor: 'Kuliner', digitalRate: 45, formalRate: 32, omzet: 52.1, priority: 'medium' },
  { id: '4', kecamatan: 'Sukasari', kabKota: 'Bandung', jumlahUmkm: 987, sektor: 'Kerajinan', digitalRate: 35, formalRate: 28, omzet: 28.3, priority: 'medium' },
  { id: '5', kecamatan: 'Bekasi Timur', kabKota: 'Bekasi', jumlahUmkm: 3421, sektor: 'Elektronik', digitalRate: 67, formalRate: 52, omzet: 125.4, priority: 'high' },
  { id: '6', kecamatan: 'Depok I', kabKota: 'Depok', jumlahUmkm: 1567, sektor: 'Jasa', digitalRate: 48, formalRate: 35, omzet: 41.7, priority: 'medium' },
  { id: '7', kecamatan: 'Cimahi Selatan', kabKota: 'Cimahi', jumlahUmkm: 892, sektor: 'Otomotif', digitalRate: 42, formalRate: 31, omzet: 35.2, priority: 'low' },
  { id: '8', kecamatan: 'Tasikmalaya Kota', kabKota: 'Tasikmalaya', jumlahUmkm: 2234, sektor: 'Tekstil', digitalRate: 38, formalRate: 29, omzet: 58.9, priority: 'high' },
];

const kabKotaOptions = ['Semua', 'Bandung', 'Bogor', 'Bekasi', 'Depok', 'Cimahi', 'Tasikmalaya'];
const sektorOptions = ['Semua', 'Kuliner', 'Fashion', 'Kerajinan', 'Elektronik', 'Jasa', 'Otomotif', 'Tekstil'];
const priorityOptions = ['Semua', 'High', 'Medium', 'Low'];

export function DataExplorerSection() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedKabKota, setSelectedKabKota] = useState('Semua');
  const [selectedSektor, setSelectedSektor] = useState('Semua');
  const [selectedPriority, setSelectedPriority] = useState('Semua');
  const [sortBy, setSortBy] = useState<'jumlahUmkm' | 'digitalRate' | 'omzet'>('jumlahUmkm');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('desc');
  const [expandedRow, setExpandedRow] = useState<string | null>(null);

  const filteredData = useMemo(() => {
    let data = sampleData;

    if (searchQuery) {
      data = data.filter(row => 
        row.kecamatan.toLowerCase().includes(searchQuery.toLowerCase()) ||
        row.kabKota.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    if (selectedKabKota !== 'Semua') {
      data = data.filter(row => row.kabKota === selectedKabKota);
    }

    if (selectedSektor !== 'Semua') {
      data = data.filter(row => row.sektor === selectedSektor);
    }

    if (selectedPriority !== 'Semua') {
      data = data.filter(row => row.priority === selectedPriority.toLowerCase());
    }

    data = [...data].sort((a, b) => {
      const aVal = a[sortBy];
      const bVal = b[sortBy];
      return sortOrder === 'asc' ? (aVal > bVal ? 1 : -1) : (aVal < bVal ? 1 : -1);
    });

    return data;
  }, [searchQuery, selectedKabKota, selectedSektor, selectedPriority, sortBy, sortOrder]);

  const stats = useMemo(() => ({
    totalUmkm: filteredData.reduce((acc, row) => acc + row.jumlahUmkm, 0),
    avgDigital: filteredData.length > 0 ? filteredData.reduce((acc, row) => acc + row.digitalRate, 0) / filteredData.length : 0,
    highPriority: filteredData.filter(row => row.priority === 'high').length,
  }), [filteredData]);

  const getPriorityBadge = (priority: string) => {
    switch (priority) {
      case 'high': return { variant: 'error', text: 'High' };
      case 'medium': return { variant: 'warning', text: 'Medium' };
      case 'low': return { variant: 'success', text: 'Low' };
      default: return { variant: 'default', text: priority };
    }
  };

  return (
    <Card className="mb-8 overflow-hidden border-violet-200 bg-gradient-to-br from-violet-50/50 to-white">
      <CardHeader className="pb-4 border-b border-violet-100">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2.5 bg-violet-100 rounded-xl text-violet-600">
              <Search className="w-6 h-6" />
            </div>
            <div>
              <CardTitle className="text-violet-900 text-xl">Data Explorer</CardTitle>
              <p className="text-sm text-violet-600 mt-1">
                Jelajahi data UMKM dengan filter dan pencarian interaktif
              </p>
            </div>
          </div>
          <button className="flex items-center gap-2 px-3 py-2 text-sm font-medium text-slate-600 bg-white border border-slate-200 rounded-lg hover:border-violet-300 transition-colors">
            <Download className="w-4 h-4" />
            Export Data
          </button>
        </div>
      </CardHeader>
      
      <CardContent className="p-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <input
              type="text"
              placeholder="Cari kecamatan..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 bg-white border border-slate-200 rounded-lg text-sm focus:outline-none focus:border-violet-500"
            />
          </div>

          <select
            value={selectedKabKota}
            onChange={(e) => setSelectedKabKota(e.target.value)}
            className="px-3 py-2 bg-white border border-slate-200 rounded-lg text-sm focus:outline-none focus:border-violet-500"
          >
            {kabKotaOptions.map(opt => <option key={opt} value={opt}>{opt}</option>)}
          </select>

          <select
            value={selectedSektor}
            onChange={(e) => setSelectedSektor(e.target.value)}
            className="px-3 py-2 bg-white border border-slate-200 rounded-lg text-sm focus:outline-none focus:border-violet-500"
          >
            {sektorOptions.map(opt => <option key={opt} value={opt}>{opt}</option>)}
          </select>

          <select
            value={selectedPriority}
            onChange={(e) => setSelectedPriority(e.target.value)}
            className="px-3 py-2 bg-white border border-slate-200 rounded-lg text-sm focus:outline-none focus:border-violet-500"
          >
            {priorityOptions.map(opt => <option key={opt} value={opt}>Priority: {opt}</option>)}
          </select>
        </div>

        <div className="grid grid-cols-3 gap-4 mb-6">
          <div className="p-4 bg-white rounded-xl border border-slate-200">
            <div className="text-xs text-slate-500 mb-1">Total UMKM</div>
            <div className="text-2xl font-bold text-slate-900">{stats.totalUmkm.toLocaleString()}</div>
          </div>
          <div className="p-4 bg-white rounded-xl border border-slate-200">
            <div className="text-xs text-slate-500 mb-1">Rata-rata Digitalisasi</div>
            <div className="text-2xl font-bold text-violet-600">{stats.avgDigital.toFixed(1)}%</div>
          </div>
          <div className="p-4 bg-white rounded-xl border border-slate-200">
            <div className="text-xs text-slate-500 mb-1">Wilayah Prioritas Tinggi</div>
            <div className="text-2xl font-bold text-red-600">{stats.highPriority}</div>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-slate-200">
                <th className="text-left py-3 px-4 font-medium text-slate-500">Kecamatan</th>
                <th className="text-left py-3 px-4 font-medium text-slate-500">Kab/Kota</th>
                <th 
                  className="text-left py-3 px-4 font-medium text-slate-500 cursor-pointer hover:text-violet-600"
                  onClick={() => {
                    if (sortBy === 'jumlahUmkm') setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
                    else { setSortBy('jumlahUmkm'); setSortOrder('desc'); }
                  }}
                >
                  <div className="flex items-center gap-1">
                    Jumlah UMKM
                    {sortBy === 'jumlahUmkm' && (
                      sortOrder === 'asc' ? <ChevronUp className="w-3 h-3" /> : <ChevronDown className="w-3 h-3" />
                    )}
                  </div>
                </th>
                <th className="text-left py-3 px-4 font-medium text-slate-500">Sektor</th>
                <th 
                  className="text-left py-3 px-4 font-medium text-slate-500 cursor-pointer hover:text-violet-600"
                  onClick={() => {
                    if (sortBy === 'digitalRate') setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
                    else { setSortBy('digitalRate'); setSortOrder('desc'); }
                  }}
                >
                  <div className="flex items-center gap-1">
                    Digital
                    {sortBy === 'digitalRate' && (
                      sortOrder === 'asc' ? <ChevronUp className="w-3 h-3" /> : <ChevronDown className="w-3 h-3" />
                    )}
                  </div>
                </th>
                <th className="text-left py-3 px-4 font-medium text-slate-500">Prioritas</th>
                <th className="text-left py-3 px-4 font-medium text-slate-500"></th>
              </tr>
            </thead>
            <tbody>
              {filteredData.map((row) => {
                const priorityBadge = getPriorityBadge(row.priority);
                const isExpanded = expandedRow === row.id;
                
                return (
                  <React.Fragment key={row.id}>
                    <tr 
                      className="border-b border-slate-100 hover:bg-slate-50 cursor-pointer"
                      onClick={() => setExpandedRow(isExpanded ? null : row.id)}
                    >
                      <td className="py-3 px-4 font-medium text-slate-900">{row.kecamatan}</td>
                      <td className="py-3 px-4 text-slate-600">{row.kabKota}</td>
                      <td className="py-3 px-4 text-slate-900">{row.jumlahUmkm.toLocaleString()}</td>
                      <td className="py-3 px-4">
                        <Badge variant="default" className="text-xs">{row.sektor}</Badge>
                      </td>
                      <td className="py-3 px-4">
                        <div className="flex items-center gap-2">
                          <div className="w-16 h-2 bg-slate-200 rounded-full overflow-hidden">
                            <div 
                              className="h-full bg-violet-500 rounded-full"
                              style={{ width: `${row.digitalRate}%` }}
                            />
                          </div>
                          <span className="text-xs text-slate-600">{row.digitalRate}%</span>
                        </div>
                      </td>
                      <td className="py-3 px-4">
                        <Badge 
                          variant={priorityBadge.variant as any} 
                          className="text-xs"
                        >
                          {priorityBadge.text}
                        </Badge>
                      </td>
                      <td className="py-3 px-4">
                        <button className="p-1 hover:bg-slate-200 rounded">
                          {isExpanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                        </button>
                      </td>
                    </tr>
                    {isExpanded && (
                      <tr className="bg-slate-50">
                        <td colSpan={7} className="py-4 px-4">
                          <div className="grid grid-cols-4 gap-4">
                            <div>
                              <div className="text-xs text-slate-500 mb-1">Formalisasi Rate</div>
                              <div className="text-lg font-semibold text-slate-900">{row.formalRate}%</div>
                            </div>
                            <div>
                              <div className="text-xs text-slate-500 mb-1">Omzet Tahunan</div>
                              <div className="text-lg font-semibold text-slate-900">Rp {row.omzet}M</div>
                            </div>
                            <div>
                              <div className="text-xs text-slate-500 mb-1">Est. Tenaga Kerja</div>
                              <div className="text-lg font-semibold text-slate-900">{(row.jumlahUmkm * 2.1).toFixed(0)}</div>
                            </div>
                            <div className="flex items-end">
                              <button className="flex items-center gap-2 px-3 py-2 text-xs font-medium text-violet-600 bg-violet-50 rounded-lg hover:bg-violet-100">
                                <BarChart3 className="w-3 h-3" />
                                Lihat Detail
                              </button>
                            </div>
                          </div>
                        </td>
                      </tr>
                    )}
                  </React.Fragment>
                );
              })}
            </tbody>
          </table>
        </div>

        <div className="mt-4 text-xs text-slate-500 text-center">
          Menampilkan {filteredData.length} dari {sampleData.length} data
        </div>
      </CardContent>
    </Card>
  );
}
