import { Button } from '@/components/ui/button';
import { ChevronDown, ChevronUp } from 'lucide-react';
import { useState } from 'react';
import {
    Bar,
    BarChart,
    CartesianGrid,
    Legend,
    ResponsiveContainer,
    Tooltip,
    XAxis,
    YAxis,
} from 'recharts';
import type { AggregatedKabKota } from '../../lib/data-aggregator';

interface KabKotaBarChartProps {
  data: AggregatedKabKota[];
  metric: 'totalUmkm' | 'avgPersenFormal' | 'avgPersenDigital';
  title: string;
  description: string;
}

const METRIC_CONFIG = {
  totalUmkm: { fill: '#0d9488', name: 'Total UMKM', suffix: ' unit' },
  avgPersenFormal: { fill: '#2563eb', name: '% Formal', suffix: '%' },
  avgPersenDigital: { fill: '#7c3aed', name: '% Digital', suffix: '%' },
};

export function KabKotaBarChart({ data, metric, title, description }: KabKotaBarChartProps) {
  const [showAll, setShowAll] = useState(false);
  const config = METRIC_CONFIG[metric];
  
  const sortedData = [...data].sort((a, b) => b[metric] - a[metric]);
  const displayData = showAll ? sortedData : sortedData.slice(0, 10);

  const chartData = displayData.map(d => ({
      name: d.kabKota.replace('Kabupaten ', 'Kab. ').replace('Kota ', ''),
      value: metric === 'totalUmkm' ? d[metric] : Number(d[metric].toFixed(1)),
    }));

  // Dynamic height calculation: Base 500px for Top 10, expand for All (approx 35px per bar)
  const chartHeight = showAll ? Math.max(500, chartData.length * 40) : 500;

  return (
    <article className="panel card-padding transition-all duration-500 ease-in-out">
      <header className="card-head flex flex-row justify-between items-start gap-4">
        <div>
            <h3>{title}</h3>
            <p className="text-sm text-gray-500">{description}</p>
        </div>
        <Button 
            variant="outline" 
            size="sm" 
            onClick={() => setShowAll(!showAll)}
            className="text-xs h-8 shrink-0"
        >
            {showAll ? (
                <>
                    <ChevronUp className="w-3 h-3 mr-1" />
                    Top 10
                </>
            ) : (
                <>
                    <ChevronDown className="w-3 h-3 mr-1" />
                    Lihat Semua
                </>
            )}
        </Button>
      </header>
      
      <div style={{ width: '100%', height: chartHeight }} className="transition-all duration-500 ease-in-out">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={chartData} layout="vertical" margin={{ top: 5, right: 10, left: 10, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" horizontal={true} vertical={true} stroke="#e2e8f0" />
            <XAxis type="number" tick={{ fontSize: 10 }} />
            <YAxis 
              dataKey="name" 
              type="category" 
              width={110} 
              tick={{ fontSize: 10, width: 100 }} 
              interval={0}
            />
            <Tooltip 
              cursor={{ fill: 'transparent' }}
              contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
            />
            <Legend verticalAlign="top" height={36}/>
            <Bar 
              dataKey="value" 
              fill={config.fill} 
              name={config.name}
              radius={[0, 4, 4, 0]}
              barSize={24}
              animationDuration={500}
            />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </article>
  );
}
