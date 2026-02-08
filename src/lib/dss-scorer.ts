interface AlternativeInput {
  alternatif: string;
  dampak: string;
  biaya: string;
  risiko: string;
  skorEfektivitas: number;
  skorKelayakanAnggaran: number;
}

interface ScoredAlternative extends AlternativeInput {
  skorTotal: number;
  skorDampak: number;
  skorBiaya: number;
  skorRisiko: number;
  skorKecepatan: number;
}

const WEIGHTS = {
  dampak: 0.35,
  biaya: 0.25,
  risiko: 0.2,
  kecepatan: 0.2,
};

function parseDampakScore(dampak: string): number {
  if (dampak.includes("15-20%")) return 90;
  if (dampak.includes("12-18%")) return 85;
  if (dampak.includes("10-15%")) return 80;
  if (dampak.includes("8-12%")) return 75;
  return 70;
}

function parseBiayaScore(biaya: string): number {
  if (biaya.includes("3-5")) return 90;
  if (biaya.includes("5-8")) return 85;
  if (biaya.includes("7-10")) return 75;
  if (biaya.includes("10-15")) return 70;
  return 60;
}

function parseRisikoScore(risiko: string): number {
  const lower = risiko.toLowerCase();
  if (lower.includes("rendah")) return 90;
  if (lower.includes("sedang")) return 75;
  if (lower.includes("tinggi")) return 60;
  return 70;
}

function parseKecepatanScore(dampak: string): number {
  if (dampak.includes("1 tahun")) return 85;
  if (dampak.includes("6 bulan")) return 90;
  return 80;
}

export function scoreAlternatives(
  alternatives: AlternativeInput[]
): ScoredAlternative[] {
  const scored = alternatives.map((alt) => {
    const skorDampak = parseDampakScore(alt.dampak);
    const skorBiaya = parseBiayaScore(alt.biaya);
    const skorRisiko = parseRisikoScore(alt.risiko);
    const skorKecepatan = parseKecepatanScore(alt.dampak);

    const skorTotal =
      skorDampak * WEIGHTS.dampak +
      skorBiaya * WEIGHTS.biaya +
      skorRisiko * WEIGHTS.risiko +
      skorKecepatan * WEIGHTS.kecepatan;

    return {
      ...alt,
      skorDampak,
      skorBiaya,
      skorRisiko,
      skorKecepatan,
      skorTotal: Math.round(skorTotal * 100) / 100,
    };
  });

  return scored.sort((a, b) => b.skorTotal - a.skorTotal);
}
