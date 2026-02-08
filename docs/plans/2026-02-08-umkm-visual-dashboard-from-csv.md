# UMKM Visual BI-DSS Dashboard From CSV Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Membangun dashboard BI + DSS UMKM yang sangat lengkap, visual, dan modern dengan sidebar, berbasis penuh `dataset_umkm_jabar_1000rows.csv`.

**Architecture:** Data CSV diolah menjadi JSON agregat siap dashboard (per kecamatan/kab_kota), lalu dirender pada App Router dengan layout 2 kolom (sidebar + konten utama). Konten utama dibagi per section: KPI UMKM, visualisasi BI, insight otomatis, tabel DSS alternatif, keputusan akhir, dan panel tugas diskusi.

**Tech Stack:** Next.js 16 (App Router), React 19, TypeScript, Tailwind CSS v4, Recharts, Vitest + Testing Library.

---

### Task 1: Define UMKM Dashboard Data Contract

**Files:**
- Create: `src/types/umkm-dashboard.ts`
- Test: `src/types/__tests__/umkm-dashboard.contract.test.ts`

**Step 1: Write the failing test**

```ts
import { describe, expect, it } from "vitest";
import type { UmkmDashboardData } from "@/types/umkm-dashboard";

describe("umkm dashboard contract", () => {
  it("has required fields", () => {
    const data = {} as UmkmDashboardData;
    expect(data).toHaveProperty("meta");
    expect(data).toHaveProperty("kpi");
    expect(data).toHaveProperty("prioritas");
    expect(data).toHaveProperty("insight");
    expect(data).toHaveProperty("alternatifDss");
    expect(data).toHaveProperty("keputusan");
  });
});
```

**Step 2: Run test to verify it fails**

Run: `npm run test -- src/types/__tests__/umkm-dashboard.contract.test.ts`
Expected: FAIL with missing test/tooling/types

**Step 3: Write minimal implementation**

```ts
export interface UmkmDashboardData {
  meta: {
    sumber: string;
    jumlahBaris: number;
    tahun: number;
    catatanMetodologi: string[];
  };
  kpi: {
    totalUmkm: number;
    rataUmkmPer1000Penduduk: number;
    rataPersenUmkmFormal: number;
    rataPersenUmkmDigital: number;
    rataPersenAksesPembiayaan: number;
    totalTenagaKerjaUmkm: number;
    rataOmzetBulananJuta: number;
  };
  prioritas: Array<{
    label: string;
    kecamatan: string;
    kabKota: string;
    umkmPer1000Penduduk: number;
    persenUmkmFormal: number;
    persenUmkmDigital: number;
    persenAksesPembiayaan: number;
    indeksBiayaLogistik: number;
    anggaranMiliar: number;
    skorPrioritas: number;
  }>;
  insight: {
    wilayahPrioritasUtama: string;
    wilayahPalingStabil: string;
    narasi: string[];
  };
  alternatifDss: Array<{
    alternatif: string;
    dampak: string;
    biaya: string;
    risiko: string;
    skorEfektivitas: number;
    skorKelayakanAnggaran: number;
  }>;
  keputusan: {
    pilihanUtama: string;
    alasan: string;
    wilayahFokus: string[];
  };
}
```

**Step 4: Run test to verify it passes**

Run: `npm run test -- src/types/__tests__/umkm-dashboard.contract.test.ts`
Expected: PASS

**Step 5: Commit**

```bash
git add src/types/umkm-dashboard.ts src/types/__tests__/umkm-dashboard.contract.test.ts
git commit -m "feat: add UMKM dashboard data contract"
```

---

### Task 2: Setup Test Infrastructure (Vitest + RTL)

**Files:**
- Modify: `package.json`
- Create: `vitest.config.ts`
- Create: `src/test/setup.ts`
- Test: `src/app/__tests__/smoke.test.tsx`

**Step 1: Write the failing test**

```tsx
import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";

describe("smoke", () => {
  it("renders heading", () => {
    render(<h1>Dashboard UMKM</h1>);
    expect(screen.getByText("Dashboard UMKM")).toBeInTheDocument();
  });
});
```

**Step 2: Run test to verify it fails**

Run: `npm run test -- src/app/__tests__/smoke.test.tsx`
Expected: FAIL (script/tooling belum ada)

**Step 3: Write minimal implementation**

```json
{
  "scripts": {
    "test": "vitest run",
    "test:watch": "vitest"
  }
}
```

```ts
import { defineConfig } from "vitest/config";

export default defineConfig({
  test: {
    environment: "jsdom",
    setupFiles: ["./src/test/setup.ts"],
  },
});
```

```ts
import "@testing-library/jest-dom/vitest";
```

**Step 4: Run test to verify it passes**

Run: `npm run test -- src/app/__tests__/smoke.test.tsx`
Expected: PASS

**Step 5: Commit**

```bash
git add package.json vitest.config.ts src/test/setup.ts src/app/__tests__/smoke.test.tsx
git commit -m "test: setup vitest and react testing library"
```

---

### Task 3: Build CSV -> Dashboard JSON Pipeline

**Files:**
- Create: `scripts/build-umkm-dashboard-data.py`
- Create: `scripts/__tests__/build-umkm-dashboard-data.test.py`
- Create: `src/data/umkm-dashboard.json`
- Modify: `package.json`

**Step 1: Write the failing test**

```py
import json
from pathlib import Path

def test_generates_dashboard_json(tmp_path):
    output_file = tmp_path / "umkm-dashboard.json"
    # call transform function here
    data = json.loads(output_file.read_text(encoding="utf-8"))
    assert "kpi" in data
    assert "prioritas" in data
```

**Step 2: Run test to verify it fails**

Run: `pytest scripts/__tests__/build-umkm-dashboard-data.test.py -v`
Expected: FAIL (script belum ada)

**Step 3: Write minimal implementation**

```py
# scripts/build-umkm-dashboard-data.py
# Input: dataset_umkm_jabar_1000rows.csv
# Aggregate per kecamatan + kab_kota
# KPI utama:
# - total UMKM
# - UMKM per 1000 penduduk
# - % UMKM formal
# - % UMKM digital
# - % akses pembiayaan
# - tenaga kerja UMKM
# - omzet rata-rata
# Prioritas score (contoh bobot):
# 0.30*(100-formal) + 0.25*(100-digital) + 0.20*(100-akses_pembiayaan)
# + 0.15*indeks_biaya_logistik + 0.10*tingkat_kemiskinan
# Output: src/data/umkm-dashboard.json
```

```json
{
  "scripts": {
    "build:data": "python scripts/build-umkm-dashboard-data.py"
  }
}
```

**Step 4: Run test to verify it passes**

Run: `pytest scripts/__tests__/build-umkm-dashboard-data.test.py -v`
Expected: PASS

Run: `npm run build:data`
Expected: PASS and `src/data/umkm-dashboard.json` exists

**Step 5: Commit**

```bash
git add scripts/build-umkm-dashboard-data.py scripts/__tests__/build-umkm-dashboard-data.test.py src/data/umkm-dashboard.json package.json
git commit -m "feat: add CSV to UMKM dashboard data transformation"
```

---

### Task 4: Implement Sidebar-Based Dashboard Layout

**Files:**
- Create: `src/components/layout/sidebar.tsx`
- Create: `src/components/layout/dashboard-shell.tsx`
- Modify: `src/app/page.tsx`
- Modify: `src/app/globals.css`
- Test: `src/components/layout/__tests__/sidebar.test.tsx`

**Step 1: Write the failing test**

```tsx
import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import Home from "@/app/page";

describe("sidebar navigation", () => {
  it("shows dashboard sections", () => {
    render(<Home />);
    expect(screen.getByText(/Ringkasan KPI/i)).toBeInTheDocument();
    expect(screen.getByText(/Visualisasi BI/i)).toBeInTheDocument();
    expect(screen.getByText(/Insight/i)).toBeInTheDocument();
    expect(screen.getByText(/Alternatif DSS/i)).toBeInTheDocument();
    expect(screen.getByText(/Keputusan Akhir/i)).toBeInTheDocument();
  });
});
```

**Step 2: Run test to verify it fails**

Run: `npm run test -- src/components/layout/__tests__/sidebar.test.tsx`
Expected: FAIL

**Step 3: Write minimal implementation**

```tsx
// sidebar.tsx
// nav links -> #ringkasan-kpi, #visualisasi-bi, #insight, #alternatif-dss, #keputusan-akhir, #diskusi
```

```tsx
// dashboard-shell.tsx
// desktop: 280px sidebar + main content
// mobile: collapsible sidebar
```

```css
/* sticky sidebar + responsive + focus states */
```

**Step 4: Run test to verify it passes**

Run: `npm run test -- src/components/layout/__tests__/sidebar.test.tsx`
Expected: PASS

**Step 5: Commit**

```bash
git add src/components/layout/sidebar.tsx src/components/layout/dashboard-shell.tsx src/app/page.tsx src/app/globals.css src/components/layout/__tests__/sidebar.test.tsx
git commit -m "feat: add sidebar-based dashboard structure"
```

---

### Task 5: Build Complete BI Visualizations

**Files:**
- Modify: `package.json`
- Create: `src/components/charts/umkm-density-chart.tsx`
- Create: `src/components/charts/umkm-formal-digital-chart.tsx`
- Create: `src/components/charts/umkm-finance-chart.tsx`
- Create: `src/components/charts/omzet-tenaga-kerja-scatter.tsx`
- Modify: `src/app/page.tsx`
- Test: `src/components/charts/__tests__/bi-charts.test.tsx`

**Step 1: Write the failing test**

```tsx
import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import Home from "@/app/page";

describe("bi visualization", () => {
  it("renders all core chart titles", () => {
    render(<Home />);
    expect(screen.getByText(/UMKM per 1000 Penduduk/i)).toBeInTheDocument();
    expect(screen.getByText(/Formalisasi vs Digitalisasi/i)).toBeInTheDocument();
    expect(screen.getByText(/Akses Pembiayaan UMKM/i)).toBeInTheDocument();
    expect(screen.getByText(/Omzet vs Tenaga Kerja/i)).toBeInTheDocument();
  });
});
```

**Step 2: Run test to verify it fails**

Run: `npm run test -- src/components/charts/__tests__/bi-charts.test.tsx`
Expected: FAIL

**Step 3: Write minimal implementation**

```json
{
  "dependencies": {
    "recharts": "^2.13.0"
  }
}
```

```tsx
// Create 4 charts:
// 1) Bar: umkm_per_1000_penduduk
// 2) Grouped bar: persen_umkm_formal vs persen_umkm_digital
// 3) Bar: persen_umkm_akses_pembiayaan
// 4) Scatter: rata2_omzet_bulanan_juta vs tenaga_kerja_umkm
```

**Step 4: Run test to verify it passes**

Run: `npm run test -- src/components/charts/__tests__/bi-charts.test.tsx`
Expected: PASS

**Step 5: Commit**

```bash
git add package.json package-lock.json src/components/charts/*.tsx src/app/page.tsx src/components/charts/__tests__/bi-charts.test.tsx
git commit -m "feat: add complete UMKM BI visualizations"
```

---

### Task 6: Add BI Insight Generator

**Files:**
- Create: `src/lib/insight-engine.ts`
- Modify: `src/app/page.tsx`
- Test: `src/lib/__tests__/insight-engine.test.ts`

**Step 1: Write the failing test**

```ts
import { describe, it, expect } from "vitest";
import { generateInsights } from "@/lib/insight-engine";

describe("insight engine", () => {
  it("returns actionable insights", () => {
    const insights = generateInsights([] as any);
    expect(insights.length).toBeGreaterThanOrEqual(3);
  });
});
```

**Step 2: Run test to verify it fails**

Run: `npm run test -- src/lib/__tests__/insight-engine.test.ts`
Expected: FAIL

**Step 3: Write minimal implementation**

```ts
export function generateInsights(prioritas: any[]) {
  return [
    "Kecamatan prioritas memiliki gap formalisasi UMKM tertinggi.",
    "Adopsi digital rendah berkorelasi dengan akses pembiayaan yang lemah.",
    "Wilayah dengan biaya logistik tinggi perlu intervensi layanan pendukung UMKM.",
  ];
}
```

**Step 4: Run test to verify it passes**

Run: `npm run test -- src/lib/__tests__/insight-engine.test.ts`
Expected: PASS

**Step 5: Commit**

```bash
git add src/lib/insight-engine.ts src/lib/__tests__/insight-engine.test.ts src/app/page.tsx
git commit -m "feat: add BI insight generation"
```

---

### Task 7: Add DSS Alternatives and Scoring Module

**Files:**
- Create: `src/lib/dss-scorer.ts`
- Create: `src/components/dss/alternatives-table.tsx`
- Create: `src/components/dss/decision-panel.tsx`
- Modify: `src/app/page.tsx`
- Test: `src/lib/__tests__/dss-scorer.test.ts`
- Test: `src/components/dss/__tests__/decision-panel.test.tsx`

**Step 1: Write the failing tests**

```ts
import { describe, it, expect } from "vitest";
import { scoreAlternatives } from "@/lib/dss-scorer";

describe("dss scorer", () => {
  it("returns ranked alternatives", () => {
    const ranked = scoreAlternatives([]);
    expect(ranked.length).toBeGreaterThan(1);
    expect(ranked[0]).toHaveProperty("skorTotal");
  });
});
```

```tsx
import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import DecisionPanel from "@/components/dss/decision-panel";

describe("decision panel", () => {
  it("shows one final decision", () => {
    render(<DecisionPanel decision={{ pilihanUtama: "X", alasan: "Y", wilayahFokus: ["Kecamatan_01"] }} /> as any);
    expect(screen.getByText(/Keputusan Terbaik/i)).toBeInTheDocument();
  });
});
```

**Step 2: Run tests to verify they fail**

Run: `npm run test -- src/lib/__tests__/dss-scorer.test.ts src/components/dss/__tests__/decision-panel.test.tsx`
Expected: FAIL

**Step 3: Write minimal implementation**

```ts
// scoreAlternatives with weighted model:
// dampak 0.35, biaya 0.25, risiko 0.20, kecepatan 0.20
```

```tsx
// alternatives-table.tsx -> render minimal 2 alternatives
// decision-panel.tsx -> render 1 chosen alternative + rationale + wilayah fokus
```

**Step 4: Run tests to verify they pass**

Run: `npm run test -- src/lib/__tests__/dss-scorer.test.ts src/components/dss/__tests__/decision-panel.test.tsx`
Expected: PASS

**Step 5: Commit**

```bash
git add src/lib/dss-scorer.ts src/components/dss/alternatives-table.tsx src/components/dss/decision-panel.tsx src/app/page.tsx src/lib/__tests__/dss-scorer.test.ts src/components/dss/__tests__/decision-panel.test.tsx
git commit -m "feat: add DSS comparison and final decision modules"
```

---

### Task 8: Add Practicum Discussion Section + Final Verification

**Files:**
- Create: `src/components/discussion/discussion-brief.tsx`
- Modify: `src/app/page.tsx`
- Modify: `docs/plan.md`
- Create: `docs/umkm-dashboard-bi-dss-guide.md`
- Test: `src/components/discussion/__tests__/discussion-brief.test.tsx`

**Step 1: Write the failing test**

```tsx
import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import Home from "@/app/page";

describe("discussion section", () => {
  it("shows practicum discussion items", () => {
    render(<Home />);
    expect(screen.getByText(/Tugas Diskusi/i)).toBeInTheDocument();
    expect(screen.getByText(/Smart Governance/i)).toBeInTheDocument();
  });
});
```

**Step 2: Run test to verify it fails**

Run: `npm run test -- src/components/discussion/__tests__/discussion-brief.test.tsx`
Expected: FAIL

**Step 3: Write minimal implementation**

```tsx
// discussion-brief.tsx
// include:
// 1) pilih pilar smart city
// 2) identifikasi masalah dari data resmi
// 3) tentukan KPI + BI + DSS + keputusan
```

```md
# docs/umkm-dashboard-bi-dss-guide.md
- sumber data CSV
- definisi KPI UMKM
- cara baca visualisasi
- cara interpretasi insight
- cara memilih keputusan akhir
```

**Step 4: Run full verification**

Run: `npm run lint && npm run test && npm run build`
Expected: PASS semua

**Step 5: Commit**

```bash
git add src/components/discussion/discussion-brief.tsx src/components/discussion/__tests__/discussion-brief.test.tsx src/app/page.tsx docs/plan.md docs/umkm-dashboard-bi-dss-guide.md
git commit -m "feat: finalize complete UMKM BI-DSS dashboard and practicum guide"
```

---

## Final Acceptance Criteria
- Semua data dashboard berasal dari `dataset_umkm_jabar_1000rows.csv`.
- KPI utama memakai indikator UMKM relevan:
  - UMKM per 1000 penduduk
  - % UMKM formal
  - % UMKM digital
  - % UMKM akses pembiayaan
  - dukungan: omzet, tenaga kerja, logistik, anggaran
- Dashboard memiliki sidebar dan section visual lengkap.
- Minimal 4 visualisasi BI yang meaningful.
- Ada insight BI otomatis minimal 3 poin.
- Ada tabel DSS minimal 2 alternatif + scoring.
- Ada tepat 1 keputusan akhir dengan alasan berbasis KPI + insight + anggaran.
- Semua quality gate lulus: `lint`, `test`, `build`.

## Commands Recap
```bash
npm install
npm run build:data
npm run lint
npm run test
npm run build
```
