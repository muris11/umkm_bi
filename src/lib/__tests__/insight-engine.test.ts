import { describe, it, expect } from "vitest";
import { generateInsights } from "../insight-engine";

describe("generateInsights", () => {
  it("returns at least 3 insights for valid priority data", () => {
    const priorities = [
      {
        label: "A",
        kecamatan: "Kecamatan_25",
        kabKota: "Kabupaten Pangandaran",
        umkmPer1000Penduduk: 20.19,
        persenUmkmFormal: 20.0,
        persenUmkmDigital: 23.0,
        persenAksesPembiayaan: 5.3,
        indeksBiayaLogistik: 78.4,
        anggaranMiliar: 16.7,
        skorPrioritas: 75.03,
      },
    ];

    const insights = generateInsights(priorities);

    expect(insights.length).toBeGreaterThanOrEqual(3);
    expect(Array.isArray(insights)).toBe(true);
    expect(insights.every((item) => typeof item === "string")).toBe(true);
  });

  it("returns insights containing actionable information", () => {
    const priorities = [
      {
        label: "A",
        kecamatan: "Test Kecamatan",
        kabKota: "Test Kabupaten",
        umkmPer1000Penduduk: 25.0,
        persenUmkmFormal: 25.0,
        persenUmkmDigital: 25.0,
        persenAksesPembiayaan: 10.0,
        indeksBiayaLogistik: 75.0,
        anggaranMiliar: 15.0,
        skorPrioritas: 70.0,
      },
    ];

    const insights = generateInsights(priorities);

    expect(insights.some((i) => i.includes("Test Kecamatan"))).toBe(true);
    expect(insights.some((i) => i.includes("prioritas"))).toBe(true);
  });

  it("returns empty array for empty priority list", () => {
    const insights = generateInsights([]);
    expect(insights).toEqual([]);
  });

  it("generates insights with high formalization rate", () => {
    const priorities = [
      {
        label: "A",
        kecamatan: "Kecamatan_25",
        kabKota: "Kabupaten Pangandaran",
        umkmPer1000Penduduk: 20.19,
        persenUmkmFormal: 80.0,
        persenUmkmDigital: 23.0,
        persenAksesPembiayaan: 5.3,
        indeksBiayaLogistik: 78.4,
        anggaranMiliar: 16.7,
        skorPrioritas: 75.03,
      },
    ];

    const insights = generateInsights(priorities);

    expect(insights.some((i) => i.includes("cukup baik"))).toBe(true);
  });

  it("generates insights with high digitalization rate", () => {
    const priorities = [
      {
        label: "A",
        kecamatan: "Kecamatan_25",
        kabKota: "Kabupaten Pangandaran",
        umkmPer1000Penduduk: 20.19,
        persenUmkmFormal: 20.0,
        persenUmkmDigital: 80.0,
        persenAksesPembiayaan: 5.3,
        indeksBiayaLogistik: 78.4,
        anggaranMiliar: 16.7,
        skorPrioritas: 75.03,
      },
    ];

    const insights = generateInsights(priorities);

    expect(insights.some((i) => i.includes("berkembang"))).toBe(true);
  });

  it("generates insights with high financing access", () => {
    const priorities = [
      {
        label: "A",
        kecamatan: "Kecamatan_25",
        kabKota: "Kabupaten Pangandaran",
        umkmPer1000Penduduk: 20.19,
        persenUmkmFormal: 20.0,
        persenUmkmDigital: 23.0,
        persenAksesPembiayaan: 35.0,
        indeksBiayaLogistik: 78.4,
        anggaranMiliar: 16.7,
        skorPrioritas: 75.03,
      },
    ];

    const insights = generateInsights(priorities);

    expect(insights.some((i) => i.includes("memadai"))).toBe(true);
  });
});
