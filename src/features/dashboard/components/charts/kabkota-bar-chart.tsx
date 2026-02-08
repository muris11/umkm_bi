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
      <div style={{ width: '100%', height: 500 }}>
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
            />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </article>
  );
}
