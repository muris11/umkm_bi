'use client';

import { Cell, Legend, Pie, PieChart, ResponsiveContainer, Tooltip } from 'recharts';
import type { AggregatedSektor } from '../../lib/data-aggregator';

const SEKTOR_COLORS: Record<string, string> = {
  'Kuliner': '#0d9488', // Teal 600
  'Fashion': '#7c3aed', // Violet 600
  'Kerajinan': '#db2777', // Pink 600
  'Jasa': '#2563eb', // Blue 600
  'Pertanian Olahan': '#16a34a', // Green 600
  'Perdagangan': '#ea580c', // Orange 600
  'Teknologi': '#0891b2', // Cyan 600
};

interface SektorPieChartProps {
  data: AggregatedSektor[];
  title?: string;
}

export function SektorPieChart({ data, title = 'Distribusi UMKM per Sektor' }: SektorPieChartProps) {
  const chartData = data.map(d => ({
    name: d.sektor,
    value: d.totalUmkm,
  }));

  return (
    <article className="panel card-padding">
      <header className="card-head">
        <h3>{title}</h3>
        <p className="text-sm text-gray-500">Komposisi UMKM berdasarkan sektor usaha</p>
      </header>
      <div className="w-full overflow-x-auto pb-4">
        <div style={{ minWidth: '400px', height: 350 }}>
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={chartData}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                outerRadius={110}
                fill="#8884d8"
                dataKey="value"
              >
                {chartData.map((entry, index) => (
                  <Cell 
                    key={`cell-${index}`} 
                    fill={SEKTOR_COLORS[entry.name] || '#94a3b8'} 
                  />
                ))}
              </Pie>
              <Tooltip formatter={(value: number) => new Intl.NumberFormat('id-ID').format(value)} />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>
    </article>
  );
}
