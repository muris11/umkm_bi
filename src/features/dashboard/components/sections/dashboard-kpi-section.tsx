import { motion } from 'framer-motion';
import { Building2, Users, Wallet, Zap } from 'lucide-react';
import { formatNumber, formatPercent } from '../../lib/format-utils';
import type { DashboardViewModelExtended } from '../../types';
import { StatCard } from '../stat-card';

interface DashboardKpiSectionProps {
  summary: DashboardViewModelExtended['kpiSummary'];
}

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1
    }
  }
};

export function DashboardKpiSection({ summary }: DashboardKpiSectionProps) {
  return (
    <motion.section 
      variants={container}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true }}
      className="grid grid-cols-2 lg:grid-cols-4 gap-2 sm:gap-3 lg:gap-4 mb-6 sm:mb-8"
    >
      <StatCard
        title="Total UMKM"
        value={formatNumber(summary.totalUmkm)}
        description="Unit Usaha Terdaftar"
        icon={<Building2 className="h-5 w-5" />}
        delay={1}
        className="border-l-4 border-l-brand-teal"
      />
      <StatCard
        title="Tenaga Kerja"
        value={formatNumber(summary.totalTenagaKerja)}
        description="Orang Terserap"
        icon={<Users className="h-5 w-5" />}
        delay={2}
        className="border-l-4 border-l-brand-blue"
      />
      <StatCard
        title="Total Omzet"
        value={`${(summary.totalOmzetMiliar / 1000).toFixed(1)}T`}
        description="Estimasi Rupiah"
        icon={<Wallet className="h-5 w-5" />}
        delay={3}
        className="border-l-4 border-l-brand-purple"
      />
      <StatCard
        title="Go Digital"
        value={formatPercent(summary.avgPersenDigital)}
        description="Tingkat Adopsi"
        icon={<Zap className="h-5 w-5" />}
        delay={4}
        className="border-l-4 border-l-brand-orange"
      />
    </motion.section>
  );
}
