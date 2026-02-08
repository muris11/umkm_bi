export function formatNumber(value: number): string {
  return new Intl.NumberFormat('id-ID').format(value);
}

export function formatCurrency(value: number): string {
  // Handle billions if large enough, or just basic currency
  return new Intl.NumberFormat('id-ID', { 
    style: 'currency', 
    currency: 'IDR',
    maximumFractionDigits: 0
  }).format(value);
}

export function formatPercent(value: number): string {
  // Input expected to be 0-100, so we divide by 100 for Intl (which expects 0-1)
  return new Intl.NumberFormat('id-ID', { 
    style: 'percent', 
    maximumFractionDigits: 1 
  }).format(value / 100);
}
