import { Card } from '@/components/ui/card';
import { DownloadButton } from '@/components/ui/download-button';
import { Briefcase, Calendar, Filter, MapPin } from 'lucide-react';
import type { SektorUmkm, UmkmRawDataRow } from '../../types/umkm-raw-data';

interface DashboardFiltersProps {
  years: number[];
  kabKotaList: string[];
  sektorList: SektorUmkm[];
  selectedYear: number;
  selectedKabKota: string | null;
  selectedSektor: SektorUmkm | null;
  onYearChange: (year: number) => void;
  onKabKotaChange: (kabKota: string | null) => void;
  onSektorChange: (sektor: SektorUmkm | null) => void;
  filteredData: UmkmRawDataRow[];
}

export function DashboardFilters({
  years,
  kabKotaList,
  sektorList = [],
  selectedYear,
  selectedKabKota,
  selectedSektor,
  onYearChange,
  onKabKotaChange,
  onSektorChange,
  filteredData,
}: DashboardFiltersProps) {
  return (
    <Card className="mb-6 sm:mb-8 bg-white/80 backdrop-blur-sm border-slate-200/60 shadow-sm transition-all duration-300">
      <div className="flex flex-col gap-3 sm:gap-4 p-3 sm:p-4">
        <div className="flex items-center gap-2 text-slate-500 font-medium">
            <Filter className="w-4 h-4 sm:w-5 sm:h-5" />
            <span className="text-sm sm:text-base">Filter Data</span>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {/* Year Filter */}
            <div className="relative group">
                <div className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-brand-teal transition-colors pointer-events-none">
                    <Calendar className="w-4 h-4" />
                </div>
                <select
                    id="year-filter"
                    value={selectedYear}
                    onChange={(e) => onYearChange(Number(e.target.value))}
                    className="w-full pl-9 pr-4 py-2 sm:py-2.5 bg-slate-50 border border-slate-200 rounded-lg sm:rounded-xl text-sm font-medium text-slate-700 focus:outline-none focus:ring-2 focus:ring-brand-teal/20 focus:border-brand-teal transition-all cursor-pointer hover:bg-slate-100 appearance-none min-h-[44px]"
                    style={{ backgroundImage: 'none' }}
                >
                {years.map((year) => (
                    <option key={year} value={year}>{year}</option>
                ))}
                </select>
            </div>

            {/* KabKota Filter */}
            <div className="relative group">
                <div className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-brand-teal transition-colors pointer-events-none">
                    <MapPin className="w-4 h-4" />
                </div>
                <select
                    id="kabkota-filter"
                    value={selectedKabKota || ''}
                    onChange={(e) => onKabKotaChange(e.target.value || null)}
                    className="w-full pl-9 pr-4 py-2 sm:py-2.5 bg-slate-50 border border-slate-200 rounded-lg sm:rounded-xl text-sm font-medium text-slate-700 focus:outline-none focus:ring-2 focus:ring-brand-teal/20 focus:border-brand-teal transition-all cursor-pointer hover:bg-slate-100 appearance-none min-h-[44px]"
                    style={{ backgroundImage: 'none' }}
                >
                <option value="">Semua Wilayah</option>
                {kabKotaList.map((kk) => (
                    <option key={kk} value={kk}>{kk}</option>
                ))}
                </select>
            </div>

            {/* Sektor Filter */}
             <div className="relative group sm:col-span-2 lg:col-span-1">
                <div className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-brand-teal transition-colors pointer-events-none">
                    <Briefcase className="w-4 h-4" />
                </div>
                <select
                    id="sektor-filter"
                    value={selectedSektor || ''}
                    onChange={(e) => onSektorChange((e.target.value as SektorUmkm) || null)}
                    className="w-full pl-9 pr-4 py-2 sm:py-2.5 bg-slate-50 border border-slate-200 rounded-lg sm:rounded-xl text-sm font-medium text-slate-700 focus:outline-none focus:ring-2 focus:ring-brand-teal/20 focus:border-brand-teal transition-all cursor-pointer hover:bg-slate-100 appearance-none min-h-[44px]"
                    style={{ backgroundImage: 'none' }}
                >
                <option value="">Semua Sektor UMKM</option>
                {sektorList.map((s) => (
                    <option key={s} value={s}>{s}</option>
                ))}
                </select>
            </div>
        </div>

        <div className="flex justify-end pt-2 border-t border-slate-100 sm:border-0 sm:pt-0">
            <DownloadButton data={filteredData} label="Unduh Data" />
        </div>
      </div>
    </Card>
  );
}
