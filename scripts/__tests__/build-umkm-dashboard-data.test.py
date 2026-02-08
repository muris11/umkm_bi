import json
from pathlib import Path


def test_generated_json_structure():
    project_root = Path(__file__).parent.parent.parent
    json_path = project_root / "src" / "data" / "umkm-dashboard.json"

    assert json_path.exists(), f"JSON file not found: {json_path}"

    with open(json_path, encoding="utf-8") as f:
        data = json.load(f)

    assert "meta" in data
    assert "kpi" in data
    assert "prioritas" in data
    assert "insight" in data
    assert "alternatifDss" in data
    assert "keputusan" in data

    meta = data["meta"]
    assert "sumber" in meta
    assert "jumlahBaris" in meta
    assert "tahun" in meta
    assert "catatanMetodologi" in meta
    assert meta["jumlahBaris"] > 0
    assert len(meta["catatanMetodologi"]) > 0

    kpi = data["kpi"]
    assert "totalUmkm" in kpi
    assert "rataUmkmPer1000Penduduk" in kpi
    assert "rataPersenUmkmFormal" in kpi
    assert "rataPersenUmkmDigital" in kpi
    assert "rataPersenAksesPembiayaan" in kpi
    assert "totalTenagaKerjaUmkm" in kpi
    assert "rataOmzetBulananJuta" in kpi
    assert kpi["totalUmkm"] > 0
    assert kpi["totalTenagaKerjaUmkm"] > 0

    prioritas = data["prioritas"]
    assert len(prioritas) == 4
    labels = {p["label"] for p in prioritas}
    assert labels == {"A", "B", "C", "D"}
    for p in prioritas:
        assert "kecamatan" in p
        assert "kabKota" in p
        assert "umkmPer1000Penduduk" in p
        assert "persenUmkmFormal" in p
        assert "persenUmkmDigital" in p
        assert "persenAksesPembiayaan" in p
        assert "indeksBiayaLogistik" in p
        assert "anggaranMiliar" in p
        assert "skorPrioritas" in p
        assert p["kecamatan"] != ""
        assert p["skorPrioritas"] > 0

    insight = data["insight"]
    assert "wilayahPrioritasUtama" in insight
    assert "wilayahPalingStabil" in insight
    assert "narasi" in insight
    assert insight["wilayahPrioritasUtama"] != ""
    assert insight["wilayahPalingStabil"] != ""
    assert len(insight["narasi"]) > 0

    alternatif_dss = data["alternatifDss"]
    assert len(alternatif_dss) > 0
    for alt in alternatif_dss:
        assert "alternatif" in alt
        assert "dampak" in alt
        assert "biaya" in alt
        assert "risiko" in alt
        assert "skorEfektivitas" in alt
        assert "skorKelayakanAnggaran" in alt
        assert alt["alternatif"] != ""
        assert alt["skorEfektivitas"] > 0

    keputusan = data["keputusan"]
    assert "pilihanUtama" in keputusan
    assert "alasan" in keputusan
    assert "wilayahFokus" in keputusan
    assert keputusan["pilihanUtama"] != ""
    assert keputusan["alasan"] != ""
    assert len(keputusan["wilayahFokus"]) > 0

    print("All JSON structure and content validations passed")


if __name__ == "__main__":
    test_generated_json_structure()
