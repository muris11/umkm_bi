#!/usr/bin/env python3

import csv
import json
import sys
from pathlib import Path
from typing import Any


def main() -> None:
    project_root = Path(__file__).parent.parent
    csv_path = project_root / "dataset_umkm_jabar_1000rows.csv"
    output_path = project_root / "src" / "data" / "umkm-dashboard.json"

    output_path.parent.mkdir(parents=True, exist_ok=True)

    with open(csv_path, encoding="utf-8") as f:
        reader = csv.DictReader(f)
        rows = list(reader)

    if not rows:
        print("ERROR: CSV is empty", file=sys.stderr)
        sys.exit(1)

    for row in rows:
        for field in [
            "penduduk",
            "jumlah_umkm",
            "umkm_per_1000_penduduk",
            "persen_umkm_formal",
            "persen_umkm_digital",
            "persen_umkm_akses_pembiayaan",
            "rata2_omzet_bulanan_juta",
            "omzet_tahunan_miliar",
            "tenaga_kerja_umkm",
            "indeks_infrastruktur_internet",
            "indeks_biaya_logistik",
            "jumlah_pelatihan_inkubasi",
            "anggaran_pemberdayaan_umkm_miliar",
            "indeks_kemudahan_berusaha",
            "tingkat_pengangguran_terbuka_persen",
            "tingkat_kemiskinan_persen",
            "kejadian_gangguan_distribusi_tahun",
        ]:
            try:
                row[field] = float(row[field])
            except (ValueError, KeyError):
                row[field] = 0.0
        try:
            row["tahun"] = int(row["tahun"])
        except (ValueError, KeyError):
            row["tahun"] = 2025

    total_umkm = sum(float(r["jumlah_umkm"]) for r in rows)
    total_tenaga_kerja = sum(float(r["tenaga_kerja_umkm"]) for r in rows)
    n = len(rows)
    rata_umkm_per_1000 = sum(float(r["umkm_per_1000_penduduk"]) for r in rows) / n
    rata_formal = sum(float(r["persen_umkm_formal"]) for r in rows) / n
    rata_digital = sum(float(r["persen_umkm_digital"]) for r in rows) / n
    rata_akses = sum(float(r["persen_umkm_akses_pembiayaan"]) for r in rows) / n
    rata_omzet = sum(float(r["rata2_omzet_bulanan_juta"]) for r in rows) / n

    kpi = {
        "totalUmkm": int(total_umkm),
        "rataUmkmPer1000Penduduk": round(rata_umkm_per_1000, 2),
        "rataPersenUmkmFormal": round(rata_formal, 2),
        "rataPersenUmkmDigital": round(rata_digital, 2),
        "rataPersenAksesPembiayaan": round(rata_akses, 2),
        "totalTenagaKerjaUmkm": int(total_tenaga_kerja),
        "rataOmzetBulananJuta": round(rata_omzet, 2),
    }

    for row in rows:
        score = (
            0.30 * (100 - float(row["persen_umkm_formal"]))
            + 0.25 * (100 - float(row["persen_umkm_digital"]))
            + 0.20 * (100 - float(row["persen_umkm_akses_pembiayaan"]))
            + 0.15 * float(row["indeks_biaya_logistik"])
            + 0.10 * float(row["tingkat_kemiskinan_persen"])
        )
        row["_prioritas_score"] = score

    rows_sorted = sorted(rows, key=lambda x: float(x["_prioritas_score"]), reverse=True)
    top4 = rows_sorted[:4]
    labels = ["A", "B", "C", "D"]

    prioritas = []
    for i, row in enumerate(top4):
        prioritas.append(
            {
                "label": labels[i],
                "kecamatan": row["kecamatan"],
                "kabKota": row["kab_kota"],
                "umkmPer1000Penduduk": round(float(row["umkm_per_1000_penduduk"]), 2),
                "persenUmkmFormal": round(float(row["persen_umkm_formal"]), 2),
                "persenUmkmDigital": round(float(row["persen_umkm_digital"]), 2),
                "persenAksesPembiayaan": round(
                    float(row["persen_umkm_akses_pembiayaan"]), 2
                ),
                "indeksBiayaLogistik": round(float(row["indeks_biaya_logistik"]), 2),
                "anggaranMiliar": round(
                    float(row["anggaran_pemberdayaan_umkm_miliar"]), 2
                ),
                "skorPrioritas": round(float(row["_prioritas_score"]), 2),
            }
        )

    wilayah_prioritas = f"{top4[0]['kecamatan']}, {top4[0]['kab_kota']}"
    stable = min(rows, key=lambda x: float(x["_prioritas_score"]))
    wilayah_stabil = f"{stable['kecamatan']}, {stable['kab_kota']}"

    insight = {
        "wilayahPrioritasUtama": wilayah_prioritas,
        "wilayahPalingStabil": wilayah_stabil,
        "narasi": [
            f"Wilayah prioritas utama adalah {wilayah_prioritas} dengan skor prioritas {prioritas[0]['skorPrioritas']}.",
            f"Formalisasi UMKM di wilayah prioritas masih rendah ({prioritas[0]['persenUmkmFormal']}%).",
            f"Digitalisasi UMKM perlu ditingkatkan di wilayah prioritas ({prioritas[0]['persenUmkmDigital']}%).",
            f"Akses pembiayaan UMKM masih terbatas di wilayah prioritas ({prioritas[0]['persenAksesPembiayaan']}%).",
        ],
    }

    alternatif_dss = [
        {
            "alternatif": "Program Pelatihan Digital UMKM",
            "dampak": "Meningkatkan adopsi digital 15-20% dalam 1 tahun",
            "biaya": "Rp 5-8 miliar per kecamatan",
            "risiko": "Rendah - teknologi matang, SDM tersedia",
            "skorEfektivitas": 85,
            "skorKelayakanAnggaran": 70,
        },
        {
            "alternatif": "Fasilitasi Formalisasi UMKM",
            "dampak": "Meningkatkan formalisasi 10-15% dalam 1 tahun",
            "biaya": "Rp 3-5 miliar per kecamatan",
            "risiko": "Sedang - butuh koordinasi lintas instansi",
            "skorEfektivitas": 75,
            "skorKelayakanAnggaran": 85,
        },
        {
            "alternatif": "Program Akses Pembiayaan UMKM",
            "dampak": "Meningkatkan akses pembiayaan 12-18% dalam 1 tahun",
            "biaya": "Rp 10-15 miliar per kecamatan",
            "risiko": "Sedang - memerlukan kemitraan dengan lembaga keuangan",
            "skorEfektivitas": 80,
            "skorKelayakanAnggaran": 60,
        },
        {
            "alternatif": "Optimasi Logistik UMKM",
            "dampak": "Mengurangi biaya logistik 8-12% dalam 1 tahun",
            "biaya": "Rp 7-10 miliar per kecamatan",
            "risiko": "Tinggi - infrastruktur kompleks, memerlukan investasi jangka panjang",
            "skorEfektivitas": 70,
            "skorKelayakanAnggaran": 65,
        },
    ]

    keputusan = {
        "pilihanUtama": "Program Pelatihan Digital UMKM",
        "alasan": "Skor efektivitas tertinggi (85) dengan risiko rendah. Teknologi matang dan SDM tersedia. Dampak signifikan terhadap digitalisasi UMKM di wilayah prioritas.",
        "wilayahFokus": [p["kecamatan"] for p in prioritas[:2]],
    }

    meta = {
        "sumber": "dataset_umkm_jabar_1000rows.csv",
        "jumlahBaris": len(rows),
        "tahun": rows[0]["tahun"],
        "catatanMetodologi": [
            "Skor prioritas menggunakan weighted score: 0.30*(100-formal) + 0.25*(100-digital) + 0.20*(100-akses) + 0.15*biaya_logistik + 0.10*kemiskinan",
            "KPI dihitung dari rata-rata atau total seluruh kecamatan",
            "Wilayah prioritas adalah 4 kecamatan dengan skor prioritas tertinggi",
        ],
    }

    output: dict[str, Any] = {
        "meta": meta,
        "kpi": kpi,
        "prioritas": prioritas,
        "insight": insight,
        "alternatifDss": alternatif_dss,
        "keputusan": keputusan,
    }

    with open(output_path, "w", encoding="utf-8") as f:
        json.dump(output, f, indent=2, ensure_ascii=False)

    print(f"Generated {output_path}")
    print(f"  - Total UMKM: {kpi['totalUmkm']:,}")
    print(f"  - Top prioritas: {prioritas[0]['kecamatan']}")
    print(f"  - Skor prioritas: {prioritas[0]['skorPrioritas']}")


if __name__ == "__main__":
    main()
