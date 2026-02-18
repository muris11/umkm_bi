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
    <Card className="mb-6 sm:mb-8 overflow-hidden border-violet-200 bg-gradient-to-br from-violet-50/50 to-white">
      <CardHeader className="pb-3 sm:pb-4 border-b border-violet-100 p-4 sm:p-6">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 sm:gap-0">
          <div className="flex items-center gap-2 sm:gap-3">
            <div className="p-2 sm:p-2.5 bg-violet-100 rounded-lg sm:rounded-xl text-violet-600 shrink-0">
              <Search className="w-5 h-5 sm:w-6 sm:h-6" />
            </div>
            <div className="min-w-0">
              <CardTitle className="text-violet-900 text-lg sm:text-xl">Data Explorer</CardTitle>
              <p className="text-xs sm:text-sm text-violet-600 mt-0.5 sm:mt-1">
                Jelajahi data UMKM dengan filter dan pencarian interaktif
              </p>
            </div>
          </div>
          <button className="flex items-center gap-1.5 sm:gap-2 px-2.5 sm:px-3 py-2 text-xs sm:text-sm font-medium text-slate-600 bg-white border border-slate-200 rounded-lg hover:border-violet-300 transition-colors self-start sm:self-auto">
            <Download className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
            <span className="hidden sm:inline">Export Data</span>
            <span className="sm:hidden">Export</span>
          </button>
        </div>
      </CardHeader>
      
      <CardContent className="p-3 sm:p-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 mb-4 sm:mb-6">
          <div className="relative sm:col-span-2 lg:col-span-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <input
              type="text"
              placeholder="Cari kecamatan..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 bg-white border border-slate-200 rounded-lg text-sm focus:outline-none focus:border-violet-500 min-h-[44px]"
            />
          </div>

          <select
            value={selectedKabKota}
            onChange={(e) => setSelectedKabKota(e.target.value)}
            className="px-3 py-2 bg-white border border-slate-200 rounded-lg text-sm focus:outline-none focus:border-violet-500 min-h-[44px]"
          >
            {kabKotaOptions.map(opt => <option key={opt} value={opt}>{opt}</option>)}
          </select>

          <select
            value={selectedSektor}
            onChange={(e) => setSelectedSektor(e.target.value)}
            className="px-3 py-2 bg-white border border-slate-200 rounded-lg text-sm focus:outline-none focus:border-violet-500 min-h-[44px]"
          >
            {sektorOptions.map(opt => <option key={opt} value={opt}>{opt}</option>)}
          </select>

          <select
            value={selectedPriority}
            onChange={(e) => setSelectedPriority(e.target.value)}
            className="px-3 py-2 bg-white border border-slate-200 rounded-lg text-sm focus:outline-none focus:border-violet-500 min-h-[44px]"
          >
            {priorityOptions.map(opt => <option key={opt} value={opt}>Priority: {opt}</option>)}
          </select>
        </div>

        <div className="grid grid-cols-3 gap-2 sm:gap-4 mb-4 sm:mb-6">
          <div className="p-3 sm:p-4 bg-white rounded-lg sm:rounded-xl border border-slate-200">
            <div className="text-[10px] sm:text-xs text-slate-500 mb-1">Total UMKM</div>
            <div className="text-lg sm:text-2xl font-bold text-slate-900">{stats.totalUmkm.toLocaleString()}</div>
          </div>
          <div className="p-3 sm:p-4 bg-white rounded-lg sm:rounded-xl border border-slate-200">
            <div className="text-[10px] sm:text-xs text-slate-500 mb-1 truncate">Rata-rata Digital</div>
            <div className="text-lg sm:text-2xl font-bold text-violet-600">{stats.avgDigital.toFixed(1)}%</div>
          </div>
          <div className="p-3 sm:p-4 bg-white rounded-lg sm:rounded-xl border border-slate-200">
            <div className="text-[10px] sm:text-xs text-slate-500 mb-1 truncate">Prioritas Tinggi</div>
            <div className="text-lg sm:text-2xl font-bold text-red-600">{stats.highPriority}</div>
          </div>
        </div>

        <div className="overflow-x-auto -mx-3 sm:-mx-6 px-3 sm:px-6">
          <table className="w-full text-xs sm:text-sm min-w-[600px]">
            <thead>
              <tr className="border-b border-slate-200">
                <th className="text-left py-2.5 sm:py-3 px-2 sm:px-4 font-medium text-slate-500">Kecamatan</th>
                <th className="text-left py-2.5 sm:py-3 px-2 sm:px-4 font-medium text-slate-500 hidden sm:table-cell">Kab/Kota</th>
                <th 
                  className="text-left py-2.5 sm:py-3 px-2 sm:px-4 font-medium text-slate-500 cursor-pointer hover:text-violet-600"
                  onClick={() => {
                    if (sortBy === 'jumlahUmkm') setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
                    else { setSortBy('jumlahUmkm'); setSortOrder('desc'); }
                  }}
                >
                  <div className="flex items-center gap-1">
                    <span className="hidden sm:inline">Jumlah UMKM</span>
                    <span className="sm:hidden">UMKM</span>
                    {sortBy === 'jumlahUmkm' && (
                      sortOrder === 'asc' ? <ChevronUp className="w-3 h-3" /> : <ChevronDown className="w-3 h-3" />
                    )}
                  </div>
                </th>
                <th className="text-left py-2.5 sm:py-3 px-2 sm:px-4 font-medium text-slate-500 hidden md:table-cell">Sektor</th>
                <th 
                  className="text-left py-2.5 sm:py-3 px-2 sm:px-4 font-medium text-slate-500 cursor-pointer hover:text-violet-600"
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
                <th className="text-left py-2.5 sm:py-3 px-2 sm:px-4 font-medium text-slate-500">Prioritas</th>
                <th className="text-left py-2.5 sm:py-3 px-2 sm:px-4 font-medium text-slate-500 w-10"></th>
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
                      <td className="py-2.5 sm:py-3 px-2 sm:px-4">
                        <div className="font-medium text-slate-900 text-xs sm:text-sm">{row.kecamatan}</div>
                        <div className="text-[10px] sm:text-xs text-slate-500 sm:hidden">{row.kabKota}</div>
                      </td>
                      <td className="py-2.5 sm:py-3 px-2 sm:px-4 text-slate-600 hidden sm:table-cell">{row.kabKota}</td>
                      <td className="py-2.5 sm:py-3 px-2 sm:px-4 text-slate-900 font-medium">{row.jumlahUmkm.toLocaleString()}</td>
                      <td className="py-2.5 sm:py-3 px-2 sm:px-4 hidden md:table-cell">
                        <Badge variant="default" className="text-[10px] sm:text-xs">{row.sektor}</Badge>
                      </td>
                      <td className="py-2.5 sm:py-3 px-2 sm:px-4">
                        <div className="flex items-center gap-1.5 sm:gap-2">
                          <div className="w-10 sm:w-16 h-1.5 sm:h-2 bg-slate-200 rounded-full overflow-hidden">
                            <div 
                              className="h-full bg-violet-500 rounded-full"
                              style={{ width: `${row.digitalRate}%` }}
                            />
                          </div>
                          <span className="text-[10px] sm:text-xs text-slate-600">{row.digitalRate}%</span>
                        </div>
                      </td>
                      <td className="py-2.5 sm:py-3 px-2 sm:px-4">
                        <Badge 
                          variant={priorityBadge.variant as any} 
                          className="text-[10px] sm:text-xs"
                        >
                          {priorityBadge.text}
                        </Badge>
                      </td>
                      <td className="py-2.5 sm:py-3 px-2 sm:px-4">
                        <button className="p-1 hover:bg-slate-200 rounded">
                          {isExpanded ? <ChevronUp className="w-3.5 h-3.5 sm:w-4 sm:h-4" /> : <ChevronDown className="w-3.5 h-3.5 sm:w-4 sm:h-4" />}
                        </button>
                      </td>
                    </tr>
                    {isExpanded && (
                      <tr className="bg-slate-50">
                        <td colSpan={7} className="py-3 sm:py-4 px-2 sm:px-4">
                          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4">
                            <div>
                              <div className="text-[10px] sm:text-xs text-slate-500 mb-1">Formalisasi Rate</div>
                              <div className="text-base sm:text-lg font-semibold text-slate-900">{row.formalRate}%</div>
                            </div>
                            <div>
                              <div className="text-[10px] sm:text-xs text-slate-500 mb-1">Omzet Tahunan</div>
                              <div className="text-base sm:text-lg font-semibold text-slate-900">Rp {row.omzet}M</div>
                            </div>
                            <div>
                              <div className="text-[10px] sm:text-xs text-slate-500 mb-1">Est. Tenaga Kerja</div>
                              <div className="text-base sm:text-lg font-semibold text-slate-900">{(row.jumlahUmkm * 2.1).toFixed(0)}</div>
                            </div>
                            <div className="flex items-end">
                              <button className="flex items-center gap-1.5 sm:gap-2 px-2.5 sm:px-3 py-1.5 sm:py-2 text-[10px] sm:text-xs font-medium text-violet-600 bg-violet-50 rounded-lg hover:bg-violet-100">
                                <BarChart3 className="w-3 h-3" />
                                Detail
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

        <div className="mt-3 sm:mt-4 text-[10px] sm:text-xs text-slate-500 text-center">
          Menampilkan {filteredData.length} dari {sampleData.length} data
        </div>
      </CardContent>
    </Card>
  );
}
