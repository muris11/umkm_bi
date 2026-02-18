export type UserRole = 'waliKota' | 'dinasKoperasi' | 'camat' | 'investor';

export type VisualizationType = 'bar' | 'line' | 'pie' | 'heatmap' | 'gauge';

export type IconName = 
  | 'Building2' | 'Users' | 'TrendingUp' | 'MapPin' | 'Activity'
  | 'Smartphone' | 'FileCheck' | 'Wallet' | 'Briefcase'
  | 'Store' | 'Banknote' | 'AlertCircle' | 'PieChartIcon' | 'Star';

export interface BIKPI {
  id: string;
  label: string;
  value: string | number;
  change?: number;
  icon: IconName;
  visualization: VisualizationType;
  description: string;
}

export interface BIVisualization {
  type: VisualizationType;
  title: string;
  description: string;
  applicable: boolean;
}

export interface RoleBasedBI {
  role: UserRole;
  roleName: string;
  roleDescription: string;
  kpis: BIKPI[];
  visualizations: BIVisualization[];
}

export interface BIDashboardData {
  roleBasedData: RoleBasedBI[];
}
