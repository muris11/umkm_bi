'use client';

import { useState } from 'react';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { 
  BarChart3, 
  LineChart, 
  PieChart, 
  Map, 
  Users, 
  Building2, 
  MapPin,
  TrendingUp,
  Activity,
  Target,
  Lightbulb,
  Smartphone,
  FileCheck,
  Wallet,
  Briefcase,
  Store,
  Banknote,
  AlertCircle,
  PieChartIcon,
  Star
} from 'lucide-react';

type UserRole = 'waliKota' | 'dinasKoperasi' | 'camat' | 'investor';
type IconName = 
  | 'Building2' | 'Users' | 'TrendingUp' | 'MapPin' | 'Activity'
  | 'Smartphone' | 'FileCheck' | 'Wallet' | 'Briefcase'
  | 'Store' | 'Banknote' | 'AlertCircle' | 'PieChartIcon' | 'Star';

interface BIKPI {
  id: string;
  label: string;
  value: string | number;
  change?: number;
  icon: IconName;
  visualization: 'bar' | 'line' | 'pie' | 'heatmap' | 'gauge';
  description: string;
}

interface RoleBasedBI {
  role: UserRole;
  roleName: string;
  roleDescription: string;
  kpis: BIKPI[];
  visualizations: {
    type: 'bar' | 'line' | 'pie' | 'heatmap' | 'gauge';
    title: string;
    description: string;
    applicable: boolean;
  }[];
}

interface BIDashboardSectionProps {
  roleBasedData: RoleBasedBI[];
}

const roleIcons: Record<UserRole, React.ElementType> = {
  waliKota: Building2,
  dinasKoperasi: Activity,
  camat: MapPin,
  investor: TrendingUp,
};

const vizIcons = {
  bar: BarChart3,
  line: LineChart,
  pie: PieChart,
  heatmap: Map,
  gauge: Target,
};

const kpiIcons: Record<IconName, React.ElementType> = {
  Building2,
  Users,
  TrendingUp,
  MapPin,
  Activity,
  Smartphone,
  FileCheck,
  Wallet,
  Briefcase,
  Store,
  Banknote,
  AlertCircle,
  PieChartIcon,
  Star,
};

export function BIDashboardSection({ roleBasedData }: BIDashboardSectionProps) {
  const [selectedRole, setSelectedRole] = useState<UserRole>('waliKota');
  
  const currentRoleData = roleBasedData.find(r => r.role === selectedRole);
  
  if (!currentRoleData) return null;

  const RoleIcon = roleIcons[selectedRole];

  return (
    <Card className="mb-8 overflow-hidden border-cyan-200 bg-gradient-to-br from-cyan-50/50 to-white">
      <CardHeader className="pb-4 border-b border-cyan-100 px-4 sm:px-6">
        <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="p-2.5 bg-cyan-100 rounded-xl text-cyan-600">
              <BarChart3 className="w-6 h-6" />
            </div>
            <div>
              <CardTitle className="text-cyan-900 text-xl">Dashboard Business Intelligence</CardTitle>
              <p className="text-sm text-cyan-600 mt-1">
                KPI & Visualisasi berbasis peran pengguna (Role-Based BI)
              </p>
            </div>
          </div>
          
          <div className="flex flex-wrap gap-2 w-full lg:w-auto">
            {(['waliKota', 'dinasKoperasi', 'camat', 'investor'] as UserRole[]).map((role) => {
              const Icon = roleIcons[role];
              const isActive = selectedRole === role;
              return (
                <button
                  key={role}
                  onClick={() => setSelectedRole(role)}
                  className={`flex items-center gap-2 px-3 py-2.5 min-h-[44px] rounded-lg text-xs font-medium transition-all ${
                    isActive 
                      ? 'bg-cyan-600 text-white shadow-md' 
                      : 'bg-white text-slate-600 border border-slate-200 hover:border-cyan-300'
                  }`}
                >
                  <Icon className="w-3.5 h-3.5" />
                  <span className="hidden sm:inline">
                    {role === 'waliKota' ? 'Wali Kota' :
                     role === 'dinasKoperasi' ? 'Dinas Koperasi' :
                     role === 'camat' ? 'Camat' : 'Investor'}
                  </span>
                </button>
              );
            })}
          </div>
        </div>
      </CardHeader>
      
      <CardContent className="p-4 sm:p-6">
        <div className="mb-6 p-4 bg-white/70 rounded-xl border border-cyan-100">
          <div className="flex items-start gap-3">
            <div className="p-2 bg-cyan-100 rounded-lg text-cyan-600 mt-0.5">
              <RoleIcon className="w-5 h-5" />
            </div>
            <div>
              <h4 className="font-semibold text-cyan-900 text-sm">
                Perspektif: {currentRoleData.roleName}
              </h4>
              <p className="text-xs text-slate-600 mt-1 leading-relaxed">
                {currentRoleData.roleDescription}
              </p>
            </div>
          </div>
        </div>

        <div className="mb-6">
          <h4 className="text-sm font-semibold text-cyan-900 mb-4 flex items-center gap-2">
            <Target className="w-4 h-4" />
            Key Performance Indicators (KPI)
          </h4>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-3 sm:gap-4">
            {currentRoleData.kpis.map((kpi) => {
              const KpiIcon = kpiIcons[kpi.icon];
              return (
                <div 
                  key={kpi.id}
                  className="p-4 bg-white rounded-xl border border-slate-100 shadow-sm hover:shadow-md transition-shadow"
                >
                  <div className="flex items-start justify-between mb-3">
                    <div className="p-2 bg-cyan-50 rounded-lg text-cyan-600">
                      <KpiIcon className="w-4 h-4" />
                    </div>
                    <Badge variant="info" className="text-[10px]">
                      {kpi.visualization === 'bar' ? 'Bar Chart' :
                       kpi.visualization === 'line' ? 'Line Chart' :
                       kpi.visualization === 'pie' ? 'Pie Chart' :
                       kpi.visualization === 'heatmap' ? 'Heatmap' : 'Gauge'}
                    </Badge>
                  </div>
                  
                  <div className="text-2xl font-bold text-slate-900 font-grotesk mb-1">
                    {kpi.value}
                  </div>
                  
                  <div className="text-xs text-slate-500 mb-2">{kpi.label}</div>
                  
                  {kpi.change !== undefined && (
                    <div className={`text-xs font-medium ${
                      kpi.change >= 0 ? 'text-emerald-600' : 'text-red-600'
                    }`}>
                      {kpi.change >= 0 ? '+' : ''}{kpi.change}% vs periode lalu
                    </div>
                  )}
                  
                  <p className="text-[10px] text-slate-400 mt-2 pt-2 border-t border-slate-50">
                    {kpi.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>

        <div>
          <h4 className="text-sm font-semibold text-cyan-900 mb-4 flex items-center gap-2">
            <Lightbulb className="w-4 h-4" />
            Visualisasi yang Direkomendasikan
          </h4>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {currentRoleData.visualizations.map((viz, index) => {
              const VizIcon = vizIcons[viz.type];
              return (
                <div 
                  key={index}
                  className={`p-4 rounded-xl border transition-all ${
                    viz.applicable 
                      ? 'bg-white border-cyan-100 shadow-sm' 
                      : 'bg-slate-50/50 border-slate-200 opacity-50'
                  }`}
                >
                  <div className="flex items-center gap-3 mb-3">
                    <div className={`p-2 rounded-lg ${
                      viz.applicable ? 'bg-cyan-100 text-cyan-600' : 'bg-slate-200 text-slate-400'
                    }`}>
                      <VizIcon className="w-4 h-4" />
                    </div>
                    <div>
                      <h5 className={`font-medium text-sm ${
                        viz.applicable ? 'text-slate-900' : 'text-slate-400'
                      }`}>
                        {viz.title}
                      </h5>
                      <Badge 
                        variant={viz.applicable ? "success" : "default"} 
                        className="text-[10px] mt-1"
                      >
                        {viz.applicable ? 'Tersedia' : 'Tidak Tersedia'}
                      </Badge>
                    </div>
                  </div>
                  <p className={`text-xs leading-relaxed ${
                    viz.applicable ? 'text-slate-600' : 'text-slate-400'
                  }`}>
                    {viz.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>

        <div className="mt-6 p-4 bg-gradient-to-r from-cyan-600 to-teal-600 rounded-xl text-white">
          <div className="flex items-center gap-2 mb-2">
            <Users className="w-4 h-4 text-cyan-200" />
            <h4 className="font-semibold text-sm">Konsep Role-Based BI</h4>
          </div>
          <p className="text-xs text-cyan-100 leading-relaxed">
            Dashboard BI yang efektif menyesuaikan KPI dan visualisasi berdasarkan peran pengguna. 
            <strong> Wali Kota</strong> memerlukan overview strategis; 
            <strong> Dinas Koperasi</strong> fokus pada operasional dan program; 
            <strong> Camat</strong> membutuhkan data wilayah spesifik; 
            sementara <strong> Investor</strong> mengutamakan potensi pertumbuhan dan ROI.
          </p>
        </div>
      </CardContent>
    </Card>
  );
}
