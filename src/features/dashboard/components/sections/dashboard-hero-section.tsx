import { Badge } from '@/components/ui/badge';
import { motion } from 'framer-motion';
import { formatNumber } from '../../lib/format-utils';
import type { DashboardViewModelExtended } from '../../types';

interface DashboardHeroSectionProps {
  meta: DashboardViewModelExtended['meta'];
}

export function DashboardHeroSection({ meta }: DashboardHeroSectionProps) {
  return (
    <motion.header 
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="mb-6 sm:mb-8"
    >
      <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
        <div className="flex-1 min-w-0">
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            className="flex items-center gap-2 mb-2"
          >
            <Badge variant="info" className="bg-brand-teal/10 text-brand-teal border-brand-teal/20 backdrop-blur-sm text-xs sm:text-sm">
              Jawa Barat 2025
            </Badge>
          </motion.div>
          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold font-grotesk text-slate-900 tracking-tight leading-tight">
            Dashboard UMKM <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-teal to-brand-blue">Jawa Barat</span>
          </h1>
          <p className="text-slate-500 mt-2 max-w-2xl text-sm sm:text-base leading-relaxed">
            Analisis komprehensif perkembangan ekosistem UMKM di 27 Kabupaten/Kota.
          </p>
        </div>
        
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="flex flex-wrap items-center gap-3 text-xs sm:text-sm text-slate-500 bg-white/50 p-3 sm:p-4 rounded-xl border border-white/60 shadow-sm backdrop-blur-md"
        >
            <div className="flex flex-col">
               <span className="text-[10px] sm:text-xs font-semibold text-slate-400 uppercase tracking-wider">Sumber</span>
               <span className="font-medium text-slate-700 truncate max-w-[100px] sm:max-w-none">{meta.sumber}</span>
            </div>
            <div className="h-8 w-[1px] bg-slate-200 mx-1 hidden sm:block" />
            <div className="flex flex-col">
               <span className="text-[10px] sm:text-xs font-semibold text-slate-400 uppercase tracking-wider">Data</span>
               <span className="font-medium text-slate-700">{formatNumber(meta.jumlahBaris)}</span>
            </div>
            <div className="h-8 w-[1px] bg-slate-200 mx-1 hidden sm:block" />
            <div className="flex flex-col">
               <span className="text-[10px] sm:text-xs font-semibold text-slate-400 uppercase tracking-wider">Update</span>
               <span className="font-medium text-slate-700">{new Date(meta.generatedAt).toLocaleDateString('id-ID', { day: 'numeric', month: 'short', year: 'numeric' })}</span>
            </div>
        </motion.div>
      </div>
    </motion.header>
  );
}
