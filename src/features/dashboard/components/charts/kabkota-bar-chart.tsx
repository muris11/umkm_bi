'use client';

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
  const config = METRIC_CONFIG[metric];
  
  const chartData = data
    .sort((a, b) => b[metric] - a[metric])
    .slice(0, 10)
    .map(d => ({
      name: d.kabKota.replace('Kabupaten ', 'Kab. ').replace('Kota ', ''),
      value: metric === 'totalUmkm' ? d[metric] : Number(d[metric].toFixed(1)),
    }));

  return (
    <article className="panel card-padding">
      <header className="card-head">
        <h3>{title}</h3>
        <p className="text-sm text-gray-500">{description}</p>
      </header>
      <div style={{ width: '100%', height: 350 }}>
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={chartData} layout="vertical" margin={{ left: 80 }}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis type="number" />
            <YAxis dataKey="name" type="category" width={100} tick={{ fontSize: 12 }} />
            <Tooltip />
            <Legend />
            <Bar 
              dataKey="value" 
              fill={config.fill} 
              name={config.name}
              radius={[0, 4, 4, 0]}
            />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </article>
  );
}
