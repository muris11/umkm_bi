import { describe, it, expect } from "vitest";
import { scoreAlternatives } from "../dss-scorer";

describe("dss-scorer", () => {
  it("scores alternatives with weighted model and returns ranked output", () => {
    const input = [
      {
        alternatif: "Program Pelatihan Digital UMKM",
        dampak: "Meningkatkan adopsi digital 15-20% dalam 1 tahun",
        biaya: "Rp 5-8 miliar per kecamatan",
        risiko: "Rendah - teknologi matang, SDM tersedia",
        skorEfektivitas: 85,
        skorKelayakanAnggaran: 70,
      },
      {
        alternatif: "Fasilitasi Formalisasi UMKM",
        dampak: "Meningkatkan formalisasi 10-15% dalam 1 tahun",
        biaya: "Rp 3-5 miliar per kecamatan",
        risiko: "Sedang - butuh koordinasi lintas instansi",
        skorEfektivitas: 75,
        skorKelayakanAnggaran: 85,
      },
    ];

    const result = scoreAlternatives(input);

    expect(result).toHaveLength(2);
    expect(result[0]).toHaveProperty("skorTotal");
    expect(result[0].skorTotal).toBeGreaterThan(0);
    expect(result[0].skorTotal).toBeGreaterThan(result[1].skorTotal);
    expect(result[0].alternatif).toBe("Program Pelatihan Digital UMKM");
  });

  it("includes all score components in output", () => {
    const input = [
      {
        alternatif: "Test Alternative",
        dampak: "Meningkatkan adopsi digital 15-20% dalam 1 tahun",
        biaya: "Rp 5-8 miliar per kecamatan",
        risiko: "Rendah - teknologi matang, SDM tersedia",
        skorEfektivitas: 85,
        skorKelayakanAnggaran: 70,
      },
    ];

    const result = scoreAlternatives(input);

    expect(result[0]).toHaveProperty("skorDampak");
    expect(result[0]).toHaveProperty("skorBiaya");
    expect(result[0]).toHaveProperty("skorRisiko");
    expect(result[0]).toHaveProperty("skorKecepatan");
    expect(result[0]).toHaveProperty("skorTotal");
  });

  it("calculates weighted scores correctly", () => {
    const input = [
      {
        alternatif: "High Score Alternative",
        dampak: "Meningkatkan adopsi digital 15-20% dalam 1 tahun",
        biaya: "Rp 3-5 miliar per kecamatan",
        risiko: "Rendah - teknologi matang",
        skorEfektivitas: 90,
        skorKelayakanAnggaran: 90,
      },
      {
        alternatif: "Low Score Alternative",
        dampak: "Mengurangi biaya logistik 8-12% dalam 1 tahun",
        biaya: "Rp 10-15 miliar per kecamatan",
        risiko: "Tinggi - infrastruktur kompleks",
        skorEfektivitas: 60,
        skorKelayakanAnggaran: 50,
      },
    ];

    const result = scoreAlternatives(input);

    expect(result[0].alternatif).toBe("High Score Alternative");
    expect(result[1].alternatif).toBe("Low Score Alternative");
    expect(result[0].skorTotal).toBeGreaterThan(result[1].skorTotal);
  });
});
