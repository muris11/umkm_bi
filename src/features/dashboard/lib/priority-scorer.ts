import type { AggregatedKecamatan } from './data-aggregator';

/**
 * Calculate priority score for a kecamatan
 * Score 0-100 indicating priority for intervention/support
 * Higher score = Higher priority
 */
export function calculatePriorityScore(data: AggregatedKecamatan): number {
  // Weights (total 1.0)
  const W_KEMISKINAN = 0.30;
  const W_PENGANGGURAN = 0.20;
  const W_POTENSI_UMKM = 0.20; // Density
  const W_READINESS = 0.30; // Internet + Logistics + Ease of Business

  // Normalize values (simplified min-max normalization assumptions based on typical ranges)
  const normKemiskinan = Math.min(data.avgTingkatKemiskinan / 20, 1) * 100;
  const normPengangguran = Math.min(data.avgTingkatPengangguran / 15, 1) * 100;
  
  // Potential: Higher density is better potential
  const normPotensi = Math.min(data.umkmPer1000Penduduk / 50, 1) * 100;
  
  // Readiness: Average of indices
  const readinessScore = (
    data.avgIndeksInfrastrukturInternet + 
    data.avgIndeksBiayaLogistik + 
    data.avgIndeksKemudahanBerusaha
  ) / 3;

  // Composite Score
  // We prioritize high poverty/unemployment (Need) AND high readiness/potential (Feasibility)
  // This is a strategic choice: help those who need it most AND can use it
  
  const score = (
    (normKemiskinan * W_KEMISKINAN) +
    (normPengangguran * W_PENGANGGURAN) +
    (normPotensi * W_POTENSI_UMKM) +
    (readinessScore * W_READINESS)
  );

  return Number(score.toFixed(2));
}
