import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Lightbulb } from 'lucide-react';

interface DashboardInsightSectionProps {
  insights: string[];
}

export function DashboardInsightSection({ insights }: DashboardInsightSectionProps) {
  if (insights.length === 0) return null;

  return (
    <Card className="mb-8 border-amber-200 bg-amber-50/50 backdrop-blur-none">
      <CardHeader className="pb-2">
        <div className="flex items-center gap-2">
            <div className="p-2 bg-amber-100 rounded-lg text-amber-600">
                <Lightbulb className="w-5 h-5" />
            </div>
            <CardTitle className="text-amber-900">Key Insights</CardTitle>
        </div>
      </CardHeader>
      <CardContent>
        <ul className="grid gap-3">
            {insights.map((insight, index) => (
            <li key={index} className="flex gap-3 text-amber-800 text-sm p-3 rounded-lg bg-amber-100/50 border border-amber-200/50">
                <span className="font-bold text-amber-600">•</span>
                {insight}
            </li>
            ))}
        </ul>
      </CardContent>
    </Card>
  );
}
