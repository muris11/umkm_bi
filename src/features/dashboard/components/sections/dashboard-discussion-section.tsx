import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { BookOpen } from 'lucide-react';
import type { DashboardViewModelExtended } from '../../types';

interface DashboardDiscussionSectionProps {
  meta: DashboardViewModelExtended['meta'];
}

export function DashboardDiscussionSection({ meta }: DashboardDiscussionSectionProps) {
  return (
    <Card className="h-full">
      <CardHeader>
        <div className="flex items-center gap-2">
            <BookOpen className="w-5 h-5 text-slate-500" />
            <CardTitle>Catatan Metodologi</CardTitle>
        </div>
      </CardHeader>
      <CardContent>
        <div className="prose prose-sm prose-slate max-w-none">
          <p>
            Data yang disajikan berasal dari <strong className="text-brand-teal">{meta.sumber}</strong> mencakup <span className="font-medium bg-slate-100 px-1 rounded">{meta.jumlahBaris}</span> entitas data 
            di {meta.kabKotaCount} Kabupaten/Kota dan {meta.kecamatanCount} Kecamatan.
          </p>
          <p className="mt-4">
            <strong>Sektor UMKM</strong> dikategorikan menjadi {meta.sektorList.length} kelompok utama: 
          </p>
          <div className="flex flex-wrap gap-2 mt-2">
            {meta.sektorList.map((s, i) => (
                <span key={i} className="px-2 py-1 bg-slate-100 text-xs rounded-md text-slate-600 border border-slate-200">
                    {s}
                </span>
            ))}
          </div>
          
          {meta.catatanMetodologi && meta.catatanMetodologi.length > 0 && (
            <div className="mt-6 p-4 bg-slate-50 rounded-xl border border-slate-200">
                <h4 className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2">Catatan Tambahan</h4>
                <ul className="space-y-1">
                    {meta.catatanMetodologi.map((note, i) => (
                    <li key={i} className="text-xs text-slate-600 flex gap-2">
                        <span>•</span> {note}
                    </li>
                    ))}
                </ul>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
