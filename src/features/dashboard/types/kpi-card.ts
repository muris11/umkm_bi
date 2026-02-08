export type KpiTone = 'teal' | 'blue' | 'indigo' | 'rose' | 'amber' | 'slate' | 'violet';

export interface KpiCard {
  id?: string;
  title: string;
  value: string | number;
  description?: string;
  trend?: {
    value: number; // percentage
    direction: 'up' | 'down' | 'neutral';
    label?: string; // e.g. "vs tahun lalu"
  };
  desc?: string; // Alias for description for compatibility
  tone?: KpiTone;
  icon?: string; // name of icon to render
}
