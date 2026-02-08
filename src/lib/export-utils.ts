import type { UmkmRawDataRow } from "../features/dashboard/types/umkm-raw-data";

// Since we cannot use 'export-to-csv' library without installing it,
// and the user env is sensitive to package installs,
// I will implement a simple CSV generator manually.

export function exportToCSV(data: UmkmRawDataRow[], filename: string = "data-umkm-jabar") {
  if (!data || data.length === 0) return;

  const headers = Object.keys(data[0]);
  const csvContent = [
    headers.join(","),
    ...data.map(row => 
      headers.map(fieldName => {
        const value = (row as any)[fieldName];
        // Handle strings with commas
        if (typeof value === 'string' && value.includes(',')) {
          return `"${value}"`;
        }
        return value;
      }).join(",")
    )
  ].join("\n");

  const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
  const link = document.createElement("a");
  if (link.download !== undefined) {
    const url = URL.createObjectURL(blob);
    link.setAttribute("href", url);
    link.setAttribute("download", `${filename}.csv`);
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }
}

export function exportToExcel(data: UmkmRawDataRow[], filename: string = "data-umkm-jabar") {
  // For Excel, CSV with proper separator (tab or semicolon) often opens well in Excel.
  // Or we can just use the same CSV function for now as "Excel Compatible CSV".
  exportToCSV(data, filename);
}
