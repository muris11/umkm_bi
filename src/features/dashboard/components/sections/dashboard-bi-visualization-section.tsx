'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { motion } from 'framer-motion';
import type { DashboardViewModelExtended } from '../../types';
import {
    KabKotaBarChart,
    SektorPieChart,
    YoYComparisonChart
} from '../charts';

interface DashboardBiVisualizationSectionProps {
  data: DashboardViewModelExtended; // Pass full VM to access aggregated data
}

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2
    }
  }
};

const item = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0 }
};

export function DashboardBiVisualizationSection({ data }: DashboardBiVisualizationSectionProps) {
  return (
    <motion.section 
      variants={container}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: "-100px" }}
      className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8"
    >
      {/* Sektor Distribution */}
      <motion.div variants={item}>
        <Card className="h-full">
          <CardHeader>
            <CardTitle>Distribusi Sektor UMKM</CardTitle>
          </CardHeader>
          <CardContent>
            <SektorPieChart 
              data={data.bySektor} 
              title="" // Title handled by Card
            />
          </CardContent>
        </Card>
      </motion.div>

      {/* Kab/Kota Comparison (Top 10) */}
      <motion.div variants={item}>
        <Card className="h-full">
          <CardHeader>
            <CardTitle>Top 10 Wilayah dengan UMKM Terbanyak</CardTitle>
            <p className="text-sm text-slate-500">Jumlah unit usaha per Kabupaten/Kota</p>
          </CardHeader>
          <CardContent>
             <KabKotaBarChart 
              data={data.byKabKota} 
              metric="totalUmkm" 
              title=""
              description=""
            />
          </CardContent>
        </Card>
      </motion.div>

      {/* Digital Adoption Comparison */}
      <motion.div variants={item}>
        <Card className="h-full">
          <CardHeader>
             <CardTitle>Adopsi Digital per Wilayah</CardTitle>
             <p className="text-sm text-slate-500">Rata-rata persentase UMKM Go-Digital</p>
          </CardHeader>
          <CardContent>
            <KabKotaBarChart 
              data={data.byKabKota} 
              metric="avgPersenDigital" 
              title=""
              description=""
            />
          </CardContent>
        </Card>
      </motion.div>

      {/* YoY Comparison (if avail) */}
      <motion.div variants={item}>
        <Card className="h-full">
          <CardHeader>
            <CardTitle>Pertumbuhan Tahunan (YoY)</CardTitle>
          </CardHeader>
          <CardContent>
            {data.yoyComparison ? (
               <YoYComparisonChart data={data.yoyComparison} />
            ) : (
              <div className="flex h-[300px] items-center justify-center text-slate-400 text-sm">
                Data perbandingan tahunan tidak tersedia untuk filter saat ini.
              </div>
            )}
          </CardContent>
        </Card>
      </motion.div>
    </motion.section>
  );
}
