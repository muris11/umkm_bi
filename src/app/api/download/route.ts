import fullData from '@/data/umkm-jabar-full.json';
import { aggregateByKabKota, aggregateBySektor } from '@/features/dashboard/lib/data-aggregator';
import type { UmkmRawDataRow } from '@/features/dashboard/types/umkm-raw-data';
import { NextRequest, NextResponse } from 'next/server';

// Helper to convert array of objects to CSV string
function toCSV(data: any[]): string {
  if (!data || data.length === 0) return '';
  const headers = Object.keys(data[0]);
  const csvRows = [
    headers.join(','),
    ...data.map(row => 
      headers.map(fieldName => {
        const val = row[fieldName];
        // Escape quotes
        const stringVal = val === null || val === undefined ? '' : String(val);
        const escaped = stringVal.replace(/"/g, '""');
        return `"${escaped}"`;
      }).join(',')
    )
  ];
  return csvRows.join('\n');
}

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const type = searchParams.get('type');

  // Cast because of strict JSON import
  const rawData = (fullData as any).data as UmkmRawDataRow[];

  let dataToExport: any[] = [];
  let filename = 'data-umkm-jabar';

  if (type === 'kabkota') {
    dataToExport = aggregateByKabKota(rawData);
    filename = 'summary-umkm-jabar-per-kabkota';
  } else if (type === 'sektor') {
    dataToExport = aggregateBySektor(rawData);
    filename = 'summary-umkm-jabar-per-sektor';
  } else {
    // Default to full raw data
    dataToExport = rawData;
    filename = 'dataset-lengkap-umkm-jabar-2024-2025';
  }

  const csv = toCSV(dataToExport);

  // Return as CSV attachment
  return new NextResponse(csv, {
    status: 200,
    headers: {
      'Content-Type': 'text/csv',
      'Content-Disposition': `attachment; filename=${filename}.csv`,
    },
  });
}
