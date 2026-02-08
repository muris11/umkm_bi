'use client';

import {
    Bar,
    BarChart,
    CartesianGrid,
    ReferenceLine,
    ResponsiveContainer,
    Tooltip,
    XAxis,
    YAxis
} from 'recharts';

interface YoYComparisonChartProps {
  data: {
    umkmGrowth: number;
    formalGrowth: number;
    digitalGrowth: number;
    omzetGrowth: number;
  };
}

export function YoYComparisonChart({ data }: YoYComparisonChartProps) {
  const chartData = [
    { name: 'UMKM', value: Number(data.umkmGrowth.toFixed(1)) },
    { name: 'Formalisasi', value: Number(data.formalGrowth.toFixed(1)) },
    { name: 'Digitalisasi', value: Number(data.digitalGrowth.toFixed(1)) },
    { name: 'Omzet', value: Number(data.omzetGrowth.toFixed(1)) },
  ];

  return (
    <article className="panel card-padding">
      <header className="card-head">
        <h3>Pertumbuhan Year-over-Year</h3>
        <p className="text-sm text-gray-500">Perbandingan indikator utama 2024 vs 2025</p>
      </header>
      <div style={{ width: '100%', height: 250 }}>
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={chartData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis tickFormatter={(v) => `${v}%`} />
            <Tooltip formatter={(v: number) => `${v}%`} />
            <ReferenceLine y={0} stroke="#94a3b8" />
            <Bar 
              dataKey="value" 
              fill="#0d9488"
              radius={[4, 4, 0, 0]}
            />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </article>
  );
}
