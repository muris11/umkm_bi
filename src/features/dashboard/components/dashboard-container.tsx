'use client';

import { DashboardLayout } from '@/components/layout/dashboard-layout';
import { useMemo, useState } from 'react';
import { buildExtendedViewModel } from '../lib';
import type {
    DashboardViewModelExtended,
    SektorUmkm,
    UmkmRawDataRow
} from '../types';
import { DashboardFilters } from './filters';
import {
    BIBuilderSection,
    BIDashboardSection,
    DashboardBiVisualizationSection,
    DashboardDecisionSection,
    DashboardDiscussionSection,
    DashboardDssSection,
    DashboardHeroSection,
    DashboardInsightSection,
    DashboardKpiSection,
    DataDrivenDecisionEnhancedSection,
    DataExplorerSection,
    MLAnalysisSection,
    MLPlaygroundSection,
    WhatIfSimulatorSection
} from './sections';

interface DashboardContainerProps {
  rawData: UmkmRawDataRow[];
  meta: DashboardViewModelExtended['meta'];
}

export function DashboardContainer({ rawData, meta }: DashboardContainerProps) {
  const defaultYear = meta.tahun.length > 0 ? meta.tahun[meta.tahun.length - 1] : 2025;
  
  const [selectedYear, setSelectedYear] = useState<number>(defaultYear);
  const [selectedKabKota, setSelectedKabKota] = useState<string | null>(null);
  const [selectedSektor, setSelectedSektor] = useState<SektorUmkm | null>(null);

  const viewModel = useMemo(() => {
    return buildExtendedViewModel(rawData, meta, {
      tahun: selectedYear,
      kabKota: selectedKabKota || undefined,
      sektor: selectedSektor || undefined,
    });
  }, [rawData, meta, selectedYear, selectedKabKota, selectedSektor]);

  const kabKotaList = useMemo(() => {
    return Array.from(new Set(rawData.map(d => d.kabKota))).sort();
  }, [rawData]);

  return (
    <DashboardLayout>
       <DashboardHeroSection meta={viewModel.meta} />
        
        <DashboardFilters 
          years={meta.tahun}
          kabKotaList={kabKotaList}
          sektorList={meta.sektorList} 
          selectedYear={selectedYear}
          selectedKabKota={selectedKabKota}
          selectedSektor={selectedSektor}
          onYearChange={setSelectedYear}
          onKabKotaChange={setSelectedKabKota}
          onSektorChange={setSelectedSektor}
          filteredData={viewModel.filteredData}
        />

        <DashboardKpiSection summary={viewModel.kpiSummary} />
        
        <MLAnalysisSection 
          mlModels={viewModel.mlAnalysis.mlModels}
          predictiveAnalysis={viewModel.mlAnalysis.predictiveAnalysis}
        />
        
        <MLPlaygroundSection />
        
        <BIDashboardSection 
          roleBasedData={viewModel.biDashboard.roleBasedData}
        />
        
        <BIBuilderSection />
        
        <DashboardBiVisualizationSection data={viewModel} />
        
        <DashboardInsightSection insights={viewModel.insights} />
        
        <DataDrivenDecisionEnhancedSection 
          decision={viewModel.dataDrivenDecision}
        />
        
        <WhatIfSimulatorSection />
        
        <DataExplorerSection />
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
           <div className="flex flex-col gap-6">
             <DashboardDecisionSection decision={viewModel.decision} />
             <DashboardDiscussionSection meta={viewModel.meta} />
           </div>
           
           <div>
             <DashboardDssSection alternatives={viewModel.topKecamatan.map((k, i) => ({
               ...k,
               id: k.kecamatan,
               name: `Kec. ${k.kecamatan}`,
               score: k.priorityScore,
               rank: i + 1,
               criteriaScores: {}
             }))} /> 
           </div>
        </div>
    </DashboardLayout>
  );
}
