"use client"

import { Button } from "@/components/ui/button"
import type { UmkmRawDataRow } from "@/features/dashboard/types/umkm-raw-data"
import { exportToCSV, exportToExcel } from "@/lib/export-utils"
import { Download } from "lucide-react"
import { useState } from "react"

interface DownloadButtonProps {
  data: UmkmRawDataRow[];
  label?: string;
}

export function DownloadButton({ data, label = "Download Data" }: DownloadButtonProps) {
  const [isExporting, setIsExporting] = useState(false);

  const handleDownload = (format: 'csv' | 'excel') => {
    setIsExporting(true);
    setTimeout(() => {
        if (format === 'csv') {
            exportToCSV(data);
        } else {
            exportToExcel(data);
        }
        setIsExporting(false);
    }, 500);
  };

  return (
    <div className="flex items-center gap-2">
      <Button 
        variant="outline" 
        size="sm"
        onClick={() => handleDownload('csv')}
        disabled={isExporting}
        className="gap-2 bg-white"
      >
        <Download className="h-4 w-4" />
        {isExporting ? "Exporting..." : label}
      </Button>
    </div>
  )
}
