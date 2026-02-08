import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { CheckCircle2, Target } from 'lucide-react';
import type { DashboardViewModelExtended } from '../../types';

interface DashboardDecisionSectionProps {
  decision: DashboardViewModelExtended['decision'];
}

export function DashboardDecisionSection({ decision }: DashboardDecisionSectionProps) {
  if (!decision.pilihanUtama) return null;

  return (
    <Card className="mb-8 border-teal-200 bg-teal-50/50 backdrop-blur-none">
      <CardHeader className="pb-2">
        <div className="flex items-center gap-2">
            <div className="p-2 bg-teal-100 rounded-lg text-teal-700">
                <Target className="w-5 h-5" />
            </div>
            <CardTitle className="text-teal-900">Rekomendasi Strategis</CardTitle>
        </div>
      </CardHeader>
      
      <CardContent>
        <div className="mb-6 p-4 bg-white/60 rounded-xl border border-teal-100 shadow-sm">
            <div className="flex items-start gap-3">
                <CheckCircle2 className="w-5 h-5 text-teal-600 mt-0.5" />
                <div>
                    <div className="text-xs font-semibold uppercase text-teal-600 mb-1 tracking-wider">Pilihan Utama</div>
                    <div className="text-xl font-bold font-grotesk text-teal-900">{decision.pilihanUtama}</div>
                </div>
            </div>
        </div>
        
        <div className="mb-6">
            <div className="text-xs font-semibold uppercase text-teal-600 mb-2 tracking-wider">Alasan Penentuan</div>
            <p className="text-teal-800 leading-relaxed text-sm">
                {decision.alasan}
            </p>
        </div>

        {decision.wilayahFokus.length > 0 && (
            <div>
            <div className="text-xs font-semibold uppercase text-teal-600 mb-3 tracking-wider">Wilayah Fokus Lainnya</div>
            <div className="flex flex-wrap gap-2">
                {decision.wilayahFokus.map((w) => (
                   <Badge key={w} variant="success" className="bg-white/80 border-teal-200 text-teal-700 hover:bg-white">
                      {w}
                   </Badge>
                ))}
            </div>
            </div>
        )}
      </CardContent>
    </Card>
  );
}
