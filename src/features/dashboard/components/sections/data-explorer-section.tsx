'use client';

import React, { useMemo, useState } from 'react';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { BarChart3, ChevronDown, ChevronUp, Download, Search } from 'lucide-react';
import type { UmkmRawDataRow } from '../../types';

type PriorityLevel = 'high' | 'medium' | 'low';

interface DataRow {
  id: string;
  kecamatan: string;
  kabKota: string;
  jumlahUmkm: number;
  sektor: string;
  digitalRate: number;
  formalRate: number;
  omzet: number;
  priority: PriorityLevel;
  tenagaKerja: number;
}

interface DataExplorerSectionProps {
  data: UmkmRawDataRow[];
}

interface PriorityBadge {
  variant: 'default' | 'success' | 'warning' | 'error' | 'info';
  text: string;
}

function sum(values: number[]): number {
  return values.reduce((acc, value) => acc + value, 0);
}

function avg(values: number[]): number {
  return values.length === 0 ? 0 : sum(values) / values.length;
}

function resolvePriority(digitalRate: number, formalRate: number, financingRate: number): PriorityLevel {
  const compositeScore = digitalRate * 0.45 + formalRate * 0.35 + financingRate * 0.2;
  if (compositeScore < 40) return 'high';
  if (compositeScore < 60) return 'medium';
  return 'low';
}

function getPriorityBadge(priority: PriorityLevel): PriorityBadge {
  switch (priority) {
    case 'high':
      return { variant: 'error', text: 'High' };
    case 'medium':
      return { variant: 'warning', text: 'Medium' };
    case 'low':
      return { variant: 'success', text: 'Low' };
    default:
      return { variant: 'default', text: priority };
  }
}

function buildExplorerRows(data: UmkmRawDataRow[]): DataRow[] {
  const grouped = new Map<string, UmkmRawDataRow[]>();

  for (const row of data) {
    const key = `${row.kecamatan}|${row.kabKota}`;
    const current = grouped.get(key);
    if (current) current.push(row);
    else grouped.set(key, [row]);
  }

  return Array.from(grouped.entries()).map(([key, rows]) => {
    const [kecamatan, kabKota] = key.split('|');

    const jumlahUmkm = sum(rows.map((r) => r.jumlahUmkm));
    const digitalRate = avg(rows.map((r) => r.persenUmkmDigital));
    const formalRate = avg(rows.map((r) => r.persenUmkmFormal));
    const financingRate = avg(rows.map((r) => r.persenAksesPembiayaan));
    const omzet = sum(rows.map((r) => r.omzetTahunanMiliar));
    const tenagaKerja = sum(rows.map((r) => r.tenagaKerjaUmkm));

    const sektorMap = new Map<string, number>();
    for (const r of rows) {
      sektorMap.set(r.sektorUtama, (sektorMap.get(r.sektorUtama) ?? 0) + r.jumlahUmkm);
    }

    const sektor = Array.from(sektorMap.entries()).sort((a, b) => b[1] - a[1])[0]?.[0] ?? '-';

    return {
      id: key,
      kecamatan,
      kabKota,
      jumlahUmkm,
      sektor,
      digitalRate: Number(digitalRate.toFixed(1)),
      formalRate: Number(formalRate.toFixed(1)),
      omzet: Number(omzet.toFixed(1)),
      priority: resolvePriority(digitalRate, formalRate, financingRate),
      tenagaKerja,
    };
  });
}

export function DataExplorerSection({ data }: DataExplorerSectionProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedKabKota, setSelectedKabKota] = useState('Semua');
  const [selectedSektor, setSelectedSektor] = useState('Semua');
  const [selectedPriority, setSelectedPriority] = useState('Semua');
  const [sortBy, setSortBy] = useState<'jumlahUmkm' | 'digitalRate' | 'omzet'>('jumlahUmkm');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('desc');
  const [expandedRow, setExpandedRow] = useState<string | null>(null);

  const explorerRows = useMemo(() => buildExplorerRows(data), [data]);

  const kabKotaOptions = useMemo(() => {
    const values = Array.from(new Set(explorerRows.map((row) => row.kabKota))).sort();
    return ['Semua', ...values];
  }, [explorerRows]);

  const sektorOptions = useMemo(() => {
    const values = Array.from(new Set(explorerRows.map((row) => row.sektor))).sort();
    return ['Semua', ...values];
  }, [explorerRows]);

  const priorityOptions = ['Semua', 'High', 'Medium', 'Low'];

  const filteredData = useMemo(() => {
    let mappedData = explorerRows;

    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      mappedData = mappedData.filter(
        (row) => row.kecamatan.toLowerCase().includes(query) || row.kabKota.toLowerCase().includes(query)
      );
    }

    if (selectedKabKota !== 'Semua') {
      mappedData = mappedData.filter((row) => row.kabKota === selectedKabKota);
    }

    if (selectedSektor !== 'Semua') {
      mappedData = mappedData.filter((row) => row.sektor === selectedSektor);
    }

    if (selectedPriority !== 'Semua') {
      mappedData = mappedData.filter((row) => row.priority === selectedPriority.toLowerCase());
    }

    return [...mappedData].sort((a, b) => {
      const aValue = a[sortBy];
      const bValue = b[sortBy];

      if (aValue === bValue) {
        return a.id.localeCompare(b.id);
      }

      return sortOrder === 'asc' ? (aValue > bValue ? 1 : -1) : aValue < bValue ? 1 : -1;
    });
  }, [explorerRows, searchQuery, selectedKabKota, selectedSektor, selectedPriority, sortBy, sortOrder]);

  const stats = useMemo(
    () => ({
      totalUmkm: filteredData.reduce((acc, row) => acc + row.jumlahUmkm, 0),
      avgDigital:
        filteredData.length > 0
          ? filteredData.reduce((acc, row) => acc + row.digitalRate, 0) / filteredData.length
          : 0,
      highPriority: filteredData.filter((row) => row.priority === 'high').length,
    }),
    [filteredData]
  );

  return (
    <Card className="mb-6 sm:mb-8 overflow-hidden border-violet-200 bg-gradient-to-br from-violet-50/50 to-white">
      <CardHeader className="border-b border-violet-100 p-4 pb-3 sm:p-6 sm:pb-4">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between sm:gap-0">
          <div className="flex items-center gap-2 sm:gap-3">
            <div className="shrink-0 rounded-lg bg-violet-100 p-2 text-violet-600 sm:rounded-xl sm:p-2.5">
              <Search className="h-5 w-5 sm:h-6 sm:w-6" />
            </div>
            <div className="min-w-0">
              <CardTitle className="text-lg text-violet-900 sm:text-xl">Data Explorer</CardTitle>
              <p className="mt-0.5 text-xs text-violet-600 sm:mt-1 sm:text-sm">
                Jelajahi data UMKM dengan filter dan pencarian interaktif
              </p>
            </div>
          </div>
          <button className="self-start rounded-lg border border-slate-200 bg-white px-2.5 py-2 text-xs font-medium text-slate-600 transition-colors hover:border-violet-300 sm:self-auto sm:px-3 sm:text-sm">
            <span className="flex items-center gap-1.5 sm:gap-2">
              <Download className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
              <span className="hidden sm:inline">Export Data</span>
              <span className="sm:hidden">Export</span>
            </span>
          </button>
        </div>
      </CardHeader>

      <CardContent className="p-3 sm:p-6">
        <div className="mb-4 grid grid-cols-1 gap-3 sm:mb-6 sm:grid-cols-2 sm:gap-4 lg:grid-cols-4">
          <div className="relative sm:col-span-2 lg:col-span-1">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              placeholder="Cari kecamatan..."
              value={searchQuery}
              onChange={(event) => setSearchQuery(event.target.value)}
              className="min-h-[44px] w-full rounded-lg border border-slate-200 bg-white py-2 pl-10 pr-4 text-sm focus:border-violet-500 focus:outline-none"
            />
          </div>

          <select
            value={selectedKabKota}
            onChange={(event) => setSelectedKabKota(event.target.value)}
            className="min-h-[44px] rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm focus:border-violet-500 focus:outline-none"
          >
            {kabKotaOptions.map((opt) => (
              <option key={opt} value={opt}>
                {opt}
              </option>
            ))}
          </select>

          <select
            value={selectedSektor}
            onChange={(event) => setSelectedSektor(event.target.value)}
            className="min-h-[44px] rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm focus:border-violet-500 focus:outline-none"
          >
            {sektorOptions.map((opt) => (
              <option key={opt} value={opt}>
                {opt}
              </option>
            ))}
          </select>

          <select
            value={selectedPriority}
            onChange={(event) => setSelectedPriority(event.target.value)}
            className="min-h-[44px] rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm focus:border-violet-500 focus:outline-none"
          >
            {priorityOptions.map((opt) => (
              <option key={opt} value={opt}>
                Priority: {opt}
              </option>
            ))}
          </select>
        </div>

        <div className="mb-4 grid grid-cols-3 gap-2 sm:mb-6 sm:gap-4">
          <div className="rounded-lg border border-slate-200 bg-white p-3 sm:rounded-xl sm:p-4">
            <div className="mb-1 text-[10px] text-slate-500 sm:text-xs">Total UMKM</div>
            <div className="text-lg font-bold text-slate-900 sm:text-2xl">{stats.totalUmkm.toLocaleString('id-ID')}</div>
          </div>
          <div className="rounded-lg border border-slate-200 bg-white p-3 sm:rounded-xl sm:p-4">
            <div className="mb-1 truncate text-[10px] text-slate-500 sm:text-xs">Rata-rata Digital</div>
            <div className="text-lg font-bold text-violet-600 sm:text-2xl">{stats.avgDigital.toFixed(1)}%</div>
          </div>
          <div className="rounded-lg border border-slate-200 bg-white p-3 sm:rounded-xl sm:p-4">
            <div className="mb-1 truncate text-[10px] text-slate-500 sm:text-xs">Prioritas Tinggi</div>
            <div className="text-lg font-bold text-red-600 sm:text-2xl">{stats.highPriority}</div>
          </div>
        </div>

        <div className="-mx-3 overflow-x-auto px-3 sm:-mx-6 sm:px-6">
          <table className="min-w-[600px] w-full text-xs sm:text-sm">
            <thead>
              <tr className="border-b border-slate-200">
                <th className="px-2 py-2.5 text-left font-medium text-slate-500 sm:px-4 sm:py-3">Kecamatan</th>
                <th className="hidden px-2 py-2.5 text-left font-medium text-slate-500 sm:table-cell sm:px-4 sm:py-3">Kab/Kota</th>
                <th
                  className="cursor-pointer px-2 py-2.5 text-left font-medium text-slate-500 hover:text-violet-600 sm:px-4 sm:py-3"
                  onClick={() => {
                    if (sortBy === 'jumlahUmkm') setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
                    else {
                      setSortBy('jumlahUmkm');
                      setSortOrder('desc');
                    }
                  }}
                >
                  <div className="flex items-center gap-1">
                    <span className="hidden sm:inline">Jumlah UMKM</span>
                    <span className="sm:hidden">UMKM</span>
                    {sortBy === 'jumlahUmkm' ?
                      sortOrder === 'asc' ? <ChevronUp className="h-3 w-3" /> : <ChevronDown className="h-3 w-3" />
                    : null}
                  </div>
                </th>
                <th className="hidden px-2 py-2.5 text-left font-medium text-slate-500 md:table-cell sm:px-4 sm:py-3">Sektor</th>
                <th
                  className="cursor-pointer px-2 py-2.5 text-left font-medium text-slate-500 hover:text-violet-600 sm:px-4 sm:py-3"
                  onClick={() => {
                    if (sortBy === 'digitalRate') setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
                    else {
                      setSortBy('digitalRate');
                      setSortOrder('desc');
                    }
                  }}
                >
                  <div className="flex items-center gap-1">
                    Digital
                    {sortBy === 'digitalRate' ?
                      sortOrder === 'asc' ? <ChevronUp className="h-3 w-3" /> : <ChevronDown className="h-3 w-3" />
                    : null}
                  </div>
                </th>
                <th className="px-2 py-2.5 text-left font-medium text-slate-500 sm:px-4 sm:py-3">Prioritas</th>
                <th className="w-10 px-2 py-2.5 text-left font-medium text-slate-500 sm:px-4 sm:py-3" />
              </tr>
            </thead>
            <tbody>
              {filteredData.map((row) => {
                const priorityBadge = getPriorityBadge(row.priority);
                const isExpanded = expandedRow === row.id;

                return (
                  <React.Fragment key={row.id}>
                    <tr
                      className="cursor-pointer border-b border-slate-100 hover:bg-slate-50"
                      onClick={() => setExpandedRow(isExpanded ? null : row.id)}
                    >
                      <td className="px-2 py-2.5 sm:px-4 sm:py-3">
                        <div className="text-xs font-medium text-slate-900 sm:text-sm">{row.kecamatan}</div>
                        <div className="text-[10px] text-slate-500 sm:hidden">{row.kabKota}</div>
                      </td>
                      <td className="hidden px-2 py-2.5 text-slate-600 sm:table-cell sm:px-4 sm:py-3">{row.kabKota}</td>
                      <td className="px-2 py-2.5 font-medium text-slate-900 sm:px-4 sm:py-3">
                        {row.jumlahUmkm.toLocaleString('id-ID')}
                      </td>
                      <td className="hidden px-2 py-2.5 md:table-cell sm:px-4 sm:py-3">
                        <Badge variant="default" className="text-[10px] sm:text-xs">
                          {row.sektor}
                        </Badge>
                      </td>
                      <td className="px-2 py-2.5 sm:px-4 sm:py-3">
                        <div className="flex items-center gap-1.5 sm:gap-2">
                          <div className="h-1.5 w-10 overflow-hidden rounded-full bg-slate-200 sm:h-2 sm:w-16">
                            <div className="h-full rounded-full bg-violet-500" style={{ width: `${row.digitalRate}%` }} />
                          </div>
                          <span className="text-[10px] text-slate-600 sm:text-xs">{row.digitalRate}%</span>
                        </div>
                      </td>
                      <td className="px-2 py-2.5 sm:px-4 sm:py-3">
                        <Badge variant={priorityBadge.variant} className="text-[10px] sm:text-xs">
                          {priorityBadge.text}
                        </Badge>
                      </td>
                      <td className="px-2 py-2.5 sm:px-4 sm:py-3">
                        <button className="rounded p-1 hover:bg-slate-200">
                          {isExpanded ? (
                            <ChevronUp className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
                          ) : (
                            <ChevronDown className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
                          )}
                        </button>
                      </td>
                    </tr>
                    {isExpanded ? (
                      <tr className="bg-slate-50">
                        <td colSpan={7} className="px-2 py-3 sm:px-4 sm:py-4">
                          <div className="grid grid-cols-2 gap-3 sm:grid-cols-4 sm:gap-4">
                            <div>
                              <div className="mb-1 text-[10px] text-slate-500 sm:text-xs">Formalisasi Rate</div>
                              <div className="text-base font-semibold text-slate-900 sm:text-lg">{row.formalRate}%</div>
                            </div>
                            <div>
                              <div className="mb-1 text-[10px] text-slate-500 sm:text-xs">Omzet Tahunan</div>
                              <div className="text-base font-semibold text-slate-900 sm:text-lg">Rp {row.omzet.toLocaleString('id-ID')}M</div>
                            </div>
                            <div>
                              <div className="mb-1 text-[10px] text-slate-500 sm:text-xs">Tenaga Kerja</div>
                              <div className="text-base font-semibold text-slate-900 sm:text-lg">{row.tenagaKerja.toLocaleString('id-ID')}</div>
                            </div>
                            <div className="flex items-end">
                              <button className="flex items-center gap-1.5 rounded-lg bg-violet-50 px-2.5 py-1.5 text-[10px] font-medium text-violet-600 hover:bg-violet-100 sm:gap-2 sm:px-3 sm:py-2 sm:text-xs">
                                <BarChart3 className="h-3 w-3" />
                                Detail
                              </button>
                            </div>
                          </div>
                        </td>
                      </tr>
                    ) : null}
                  </React.Fragment>
                );
              })}
            </tbody>
          </table>
        </div>

        <div className="mt-3 text-center text-[10px] text-slate-500 sm:mt-4 sm:text-xs">
          Menampilkan {filteredData.length} dari {explorerRows.length} data
        </div>
      </CardContent>
    </Card>
  );
}
