'use client';

import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import type { ScoredAlternative } from '../../types';

interface DashboardDssSectionProps {
  alternatives: ScoredAlternative[];
}

export function DashboardDssSection({ alternatives }: DashboardDssSectionProps) {
  if (alternatives.length === 0) return null;

  return (
    <Card className="h-full overflow-hidden">
      <CardHeader>
        <div className="flex items-center justify-between">
            <CardTitle>Ranking Prioritas Wilayah (DSS)</CardTitle>
            <Badge variant="info">Top 10</Badge>
        </div>
        <p className="text-sm text-slate-500">
          Hasil pemeringkatan menggunakan metode scoring tertimbang (MCDM).
        </p>
      </CardHeader>
      
      <CardContent className="p-0">
        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left">
            <thead className="text-xs text-slate-500 uppercase bg-slate-50/50 border-b border-slate-100">
              <tr>
                <th className="px-6 py-4 font-semibold">Rank</th>
                <th className="px-6 py-4 font-semibold">Wilayah</th>
                <th className="px-6 py-4 font-semibold">Sektor Dominan</th>
                <th className="px-6 py-4 font-semibold text-right">Skor</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {alternatives.slice(0, 10).map((alt, index) => (
                <tr 
                    key={alt.id} 
                    className="group hover:bg-slate-50/50 transition-colors"
                >
                  <td className="px-6 py-4">
                    <div className={`
                        flex h-8 w-8 items-center justify-center rounded-full font-bold text-xs
                        ${index === 0 ? 'bg-yellow-100 text-yellow-700 ring-4 ring-yellow-50' : 
                          index === 1 ? 'bg-slate-200 text-slate-700 ring-4 ring-slate-50' :
                          index === 2 ? 'bg-orange-100 text-orange-700 ring-4 ring-orange-50' :
                          'bg-slate-100 text-slate-500'}
                    `}>
                        #{alt.rank}
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="font-medium text-slate-900 group-hover:text-brand-teal transition-colors">{alt.name}</div>
                    <div className="text-xs text-slate-500">{alt.kabKota}</div>
                  </td>
                  <td className="px-6 py-4">
                    <span className="inline-flex items-center rounded-md bg-slate-50 px-2 py-1 text-xs font-medium text-slate-600 ring-1 ring-inset ring-slate-500/10">
                        {alt.sektorDominan}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <span className="font-bold text-brand-teal font-grotesk text-lg">
                        {alt.score.toFixed(2)}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </CardContent>
    </Card>
  );
}
