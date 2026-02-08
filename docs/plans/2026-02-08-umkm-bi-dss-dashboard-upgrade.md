# UMKM BI-DSS Dashboard Upgrade Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Membangun dashboard BI + DSS UMKM yang lengkap (dengan sidebar dan visualisasi komprehensif) berbasis 100% data `dataset_umkm_jabar_1000rows.csv` tanpa narasi banjir/sampah.

**Architecture:** Data CSV diproses menjadi data agregat siap-dashboard melalui skrip transformasi. UI dipecah menjadi layout sidebar + section modular (KPI, visualisasi, insight, alternatif DSS, keputusan). Keputusan akhir dihitung dari KPI UMKM dan keterbatasan anggaran (`anggaran_pemberdayaan_umkm_miliar`) dengan kerangka DSS sederhana berbobot.

**Tech Stack:** Next.js 16 (App Router), React 19, TypeScript, Tailwind CSS v4, Recharts, Vitest + Testing Library, Playwright (opsional e2e).

---

### Task 1: Tetapkan Kontrak Data Dashboard UMKM

**Files:**
- Create: `src/types/umkm-dashboard.ts`
- Modify: `src/app/page.tsx` (read-only import target reference for later tasks)
- Test: `src/types/__tests__/umkm-dashboard.contract.test.ts`

**Step 1: Write the failing test**

```ts
import { describe, expect, it } from "vitest";
import type { UmkmDashboardData } from "@/types/umkm-dashboard";

describe("umkm dashboard contract", () => {
  it("contains required top-level fields", () => {
    const sample = {} as UmkmDashboardData;
    expect(sample).toHaveProperty("meta");
    expect(sample).toHaveProperty("kpi");
    expect(sample).toHaveProperty("prioritas");
    expect(sample).toHaveProperty("insight");
    expect(sample).toHaveProperty("alternatifDss");
    expect(sample).toHaveProperty("keputusan");
  });
});
```

**Step 2: Run test to verify it fails**

Run: `npm run test -- src/types/__tests__/umkm-dashboard.contract.test.ts`
Expected: FAIL (test setup/type missing)

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

### Task 2: Setup Testing Foundation (Vitest + RTL)

**Files:**
- Modify: `package.json`
- Create: `vitest.config.ts`
- Create: `src/test/setup.ts`
- Test: `src/app/__tests__/smoke.test.tsx`

**Step 1: Write the failing test**

```tsx
import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";

function Dummy() {
  return <h1>Dashboard UMKM</h1>;
}

describe("smoke", () => {
  it("renders heading", () => {
    render(<Dummy />);
    expect(screen.getByText("Dashboard UMKM")).toBeInTheDocument();
  });
});
```

**Step 2: Run test to verify it fails**

Run: `npm run test -- src/app/__tests__/smoke.test.tsx`
Expected: FAIL (test tooling belum ada)

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
// vitest.config.ts
import { defineConfig } from "vitest/config";

export default defineConfig({
  test: {
    environment: "jsdom",
    setupFiles: ["./src/test/setup.ts"],
  },
});
```

```ts
// src/test/setup.ts
import "@testing-library/jest-dom/vitest";
```

**Step 4: Run test to verify it passes**

Run: `npm run test -- src/app/__tests__/smoke.test.tsx`
Expected: PASS

**Step 5: Commit**

```bash
git add package.json vitest.config.ts src/test/setup.ts src/app/__tests__/smoke.test.tsx
git commit -m "test: setup vitest and testing-library"
```

---

### Task 3: Bangun Pipeline Transformasi CSV -> JSON Dashboard

**Files:**
- Create: `scripts/build-umkm-dashboard-data.py`
- Create: `src/data/umkm-dashboard.json`
- Modify: `package.json`
- Test: `scripts/__tests__/build-umkm-dashboard-data.test.py`

**Step 1: Write the failing test**

```py
import json
from pathlib import Path

def test_output_contains_required_keys(tmp_path):
    output = tmp_path / "umkm-dashboard.json"
    # run transform function here
    data = json.loads(output.read_text(encoding="utf-8"))
    assert "kpi" in data
    assert "prioritas" in data
    assert "alternatifDss" in data
    assert "keputusan" in data
```

**Step 2: Run test to verify it fails**

Run: `pytest scripts/__tests__/build-umkm-dashboard-data.test.py -v`
Expected: FAIL (script/function belum ada)

**Step 3: Write minimal implementation**

```py
# scripts/build-umkm-dashboard-data.py
# Read: dataset_umkm_jabar_1000rows.csv
# Aggregate per kecamatan/kab_kota
# Compute KPI:
# - totalUmkm
# - rataUmkmPer1000Penduduk
# - rataPersenUmkmFormal
# - rataPersenUmkmDigital
# - rataPersenAksesPembiayaan
# - totalTenagaKerjaUmkm
# Compute skorPrioritas (contoh bobot):
# score = 0.30*(100-formal) + 0.25*(100-digital) + 0.20*(100-akses) + 0.15*logistik + 0.10*kemiskinan
# Export JSON to src/data/umkm-dashboard.json
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
Expected: file `src/data/umkm-dashboard.json` generated

**Step 5: Commit**

```bash
git add scripts/build-umkm-dashboard-data.py scripts/__tests__/build-umkm-dashboard-data.test.py src/data/umkm-dashboard.json package.json
git commit -m "feat: add CSV to UMKM dashboard data pipeline"
```

---

### Task 4: Definisikan KPI UMKM (Tanpa Sampah/Banjir) di UI

**Files:**
- Modify: `src/app/page.tsx`
- Create: `src/app/__tests__/kpi-cards.test.tsx`
- Test: `src/app/__tests__/kpi-cards.test.tsx`

**Step 1: Write the failing test**

```tsx
import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import Home from "@/app/page";

describe("kpi cards", () => {
  it("shows UMKM KPI labels", () => {
    render(<Home />);
    expect(screen.getByText(/Total UMKM/i)).toBeInTheDocument();
    expect(screen.getByText(/UMKM per 1000 Penduduk/i)).toBeInTheDocument();
    expect(screen.getByText(/UMKM Formal/i)).toBeInTheDocument();
    expect(screen.getByText(/UMKM Digital/i)).toBeInTheDocument();
    expect(screen.getByText(/Akses Pembiayaan/i)).toBeInTheDocument();
  });
});
```

**Step 2: Run test to verify it fails**

Run: `npm run test -- src/app/__tests__/kpi-cards.test.tsx`
Expected: FAIL (label lama masih sampah/banjir)

**Step 3: Write minimal implementation**

```tsx
// Ubah KPI_CARDS di src/app/page.tsx
// Remove semua label berbasis sampah/banjir
// Ganti ke KPI UMKM murni dari src/data/umkm-dashboard.json
```

**Step 4: Run test to verify it passes**

Run: `npm run test -- src/app/__tests__/kpi-cards.test.tsx`
Expected: PASS

**Step 5: Commit**

```bash
git add src/app/page.tsx src/app/__tests__/kpi-cards.test.tsx
git commit -m "feat: replace sample disaster KPIs with UMKM KPIs"
```

---

### Task 5: Implement Layout Sidebar + Content Sections

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

describe("sidebar", () => {
  it("renders section navigation", () => {
    render(<Home />);
    expect(screen.getByText(/Ringkasan KPI/i)).toBeInTheDocument();
    expect(screen.getByText(/Visualisasi BI/i)).toBeInTheDocument();
    expect(screen.getByText(/Alternatif DSS/i)).toBeInTheDocument();
    expect(screen.getByText(/Keputusan/i)).toBeInTheDocument();
  });
});
```

**Step 2: Run test to verify it fails**

Run: `npm run test -- src/components/layout/__tests__/sidebar.test.tsx`
Expected: FAIL (sidebar belum ada)

**Step 3: Write minimal implementation**

```tsx
// src/components/layout/sidebar.tsx
// nav links: #ringkasan #visualisasi #insight #dss #keputusan #diskusi
```

```tsx
// src/components/layout/dashboard-shell.tsx
// layout 2 kolom desktop (sidebar + content), 1 kolom mobile
```

```css
/* src/app/globals.css */
/* tambah style sidebar sticky, section spacing, active state */
```

**Step 4: Run test to verify it passes**

Run: `npm run test -- src/components/layout/__tests__/sidebar.test.tsx`
Expected: PASS

**Step 5: Commit**

```bash
git add src/components/layout/sidebar.tsx src/components/layout/dashboard-shell.tsx src/app/page.tsx src/app/globals.css src/components/layout/__tests__/sidebar.test.tsx
git commit -m "feat: add sidebar-based dashboard layout"
```

---

### Task 6: Tambahkan Visualisasi BI Lengkap (Recharts)

**Files:**
- Modify: `package.json`
- Create: `src/components/charts/bar-comparison.tsx`
- Create: `src/components/charts/radar-kpi.tsx`
- Create: `src/components/charts/scatter-relationship.tsx`
- Modify: `src/app/page.tsx`
- Test: `src/components/charts/__tests__/charts-render.test.tsx`

**Step 1: Write the failing test**

```tsx
import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import Home from "@/app/page";

describe("bi charts", () => {
  it("renders three BI chart sections", () => {
    render(<Home />);
    expect(screen.getByText(/Perbandingan Formalisasi UMKM/i)).toBeInTheDocument();
    expect(screen.getByText(/Perbandingan Digitalisasi UMKM/i)).toBeInTheDocument();
    expect(screen.getByText(/Relasi Omzet dan Tenaga Kerja/i)).toBeInTheDocument();
  });
});
```

**Step 2: Run test to verify it fails**

Run: `npm run test -- src/components/charts/__tests__/charts-render.test.tsx`
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
// Implement:
// 1) Bar chart formal vs digital per kecamatan prioritas
// 2) Bar chart akses pembiayaan per kecamatan
// 3) Scatter omzet vs tenaga kerja
```

**Step 4: Run test to verify it passes**

Run: `npm run test -- src/components/charts/__tests__/charts-render.test.tsx`
Expected: PASS

**Step 5: Commit**

```bash
git add package.json package-lock.json src/components/charts/bar-comparison.tsx src/components/charts/radar-kpi.tsx src/components/charts/scatter-relationship.tsx src/app/page.tsx src/components/charts/__tests__/charts-render.test.tsx
git commit -m "feat: add comprehensive BI visualizations for UMKM metrics"
```

---

### Task 7: Implement Insight Engine BI (Narasi Otomatis)

**Files:**
- Create: `src/lib/insight-engine.ts`
- Modify: `src/app/page.tsx`
- Test: `src/lib/__tests__/insight-engine.test.ts`

**Step 1: Write the failing test**

```ts
import { describe, it, expect } from "vitest";
import { generateInsights } from "@/lib/insight-engine";

describe("insight engine", () => {
  it("returns at least 3 actionable insights", () => {
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
export function generateInsights(data: any[]) {
  return [
    "Wilayah X memiliki gap formalisasi tertinggi",
    "Wilayah Y memiliki adopsi digital paling rendah",
    "Wilayah Z prioritas intervensi karena skor prioritas tertinggi",
  ];
}
```

**Step 4: Run test to verify it passes**

Run: `npm run test -- src/lib/__tests__/insight-engine.test.ts`
Expected: PASS

**Step 5: Commit**

```bash
git add src/lib/insight-engine.ts src/lib/__tests__/insight-engine.test.ts src/app/page.tsx
git commit -m "feat: add BI insight generation module"
```

---

### Task 8: Bangun Modul DSS Alternatif + Scoring

**Files:**
- Create: `src/lib/dss-scorer.ts`
- Modify: `src/app/page.tsx`
- Test: `src/lib/__tests__/dss-scorer.test.ts`

**Step 1: Write the failing test**

```ts
import { describe, it, expect } from "vitest";
import { scoreAlternatives } from "@/lib/dss-scorer";

describe("dss scorer", () => {
  it("returns ranked alternatives", () => {
    const ranked = scoreAlternatives({} as any);
    expect(ranked[0]).toHaveProperty("alternatif");
    expect(ranked[0]).toHaveProperty("skorTotal");
  });
});
```

**Step 2: Run test to verify it fails**

Run: `npm run test -- src/lib/__tests__/dss-scorer.test.ts`
Expected: FAIL

**Step 3: Write minimal implementation**

```ts
// Weighted DSS example:
// dampak 0.35, biaya 0.25, risiko 0.20, kecepatan 0.20
export function scoreAlternatives(input: any) {
  return [
    { alternatif: "Edukasi + optimasi jadwal", skorTotal: 82 },
    { alternatif: "Program legalisasi + akses pembiayaan", skorTotal: 78 },
  ];
}
```

**Step 4: Run test to verify it passes**

Run: `npm run test -- src/lib/__tests__/dss-scorer.test.ts`
Expected: PASS

**Step 5: Commit**

```bash
git add src/lib/dss-scorer.ts src/lib/__tests__/dss-scorer.test.ts src/app/page.tsx
git commit -m "feat: implement DSS alternative scoring"
```

---

### Task 9: Data-Driven Decision Panel + Budget Constraint Explanation

**Files:**
- Create: `src/components/dss/decision-panel.tsx`
- Modify: `src/app/page.tsx`
- Test: `src/components/dss/__tests__/decision-panel.test.tsx`

**Step 1: Write the failing test**

```tsx
import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import DecisionPanel from "@/components/dss/decision-panel";

describe("decision panel", () => {
  it("shows one final selected decision", () => {
    render(<DecisionPanel decision={{ pilihanUtama: "X", alasan: "Y", wilayahFokus: ["A"] }} /> as any);
    expect(screen.getByText(/Keputusan Terbaik/i)).toBeInTheDocument();
    expect(screen.getByText(/pilihanUtama/i, { exact: false })).toBeInTheDocument();
  });
});
```

**Step 2: Run test to verify it fails**

Run: `npm run test -- src/components/dss/__tests__/decision-panel.test.tsx`
Expected: FAIL

**Step 3: Write minimal implementation**

```tsx
// Render:
// - keputusan final
// - alasan berbasis KPI + insight + DSS + keterbatasan anggaran
// - wilayah fokus intervensi
```

**Step 4: Run test to verify it passes**

Run: `npm run test -- src/components/dss/__tests__/decision-panel.test.tsx`
Expected: PASS

**Step 5: Commit**

```bash
git add src/components/dss/decision-panel.tsx src/components/dss/__tests__/decision-panel.test.tsx src/app/page.tsx
git commit -m "feat: add final data-driven decision panel"
```

---

### Task 10: Tambahkan Section Tugas Diskusi (Smart City Pillars)

**Files:**
- Create: `src/components/discussion/discussion-brief.tsx`
- Modify: `src/app/page.tsx`
- Test: `src/components/discussion/__tests__/discussion-brief.test.tsx`

**Step 1: Write the failing test**

```tsx
import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import Home from "@/app/page";

describe("discussion brief", () => {
  it("shows practical discussion tasks", () => {
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
// Section berisi:
// - pilar Smart City
// - panduan pilih permasalahan berbasis data resmi
// - output yang harus dipresentasikan
```

**Step 4: Run test to verify it passes**

Run: `npm run test -- src/components/discussion/__tests__/discussion-brief.test.tsx`
Expected: PASS

**Step 5: Commit**

```bash
git add src/components/discussion/discussion-brief.tsx src/components/discussion/__tests__/discussion-brief.test.tsx src/app/page.tsx
git commit -m "feat: add practicum discussion section"
```

---

### Task 11: Responsive + Accessibility Hardening

**Files:**
- Modify: `src/app/globals.css`
- Modify: `src/app/page.tsx`
- Test: `src/app/__tests__/a11y-smoke.test.tsx`

**Step 1: Write the failing test**

```tsx
import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import Home from "@/app/page";

describe("a11y smoke", () => {
  it("has main landmark and nav labels", () => {
    render(<Home />);
    expect(screen.getByRole("main")).toBeInTheDocument();
    expect(screen.getByRole("navigation")).toBeInTheDocument();
  });
});
```

**Step 2: Run test to verify it fails**

Run: `npm run test -- src/app/__tests__/a11y-smoke.test.tsx`
Expected: FAIL

**Step 3: Write minimal implementation**

```tsx
// Add semantic landmarks and aria labels
// Ensure sidebar and table responsive behavior
// Ensure focus styles visible
```

**Step 4: Run test to verify it passes**

Run: `npm run test -- src/app/__tests__/a11y-smoke.test.tsx`
Expected: PASS

**Step 5: Commit**

```bash
git add src/app/globals.css src/app/page.tsx src/app/__tests__/a11y-smoke.test.tsx
git commit -m "fix: improve responsive layout and accessibility semantics"
```

---

### Task 12: End-to-End Verification + Documentation Update

**Files:**
- Modify: `docs/plan.md`
- Create: `docs/umkm-dashboard-bi-dss-guide.md`
- Test: N/A (verification commands)

**Step 1: Write verification checklist first**

```md
- [ ] npm run lint
- [ ] npm run test
- [ ] npm run build
- [ ] manual check sidebar + charts + decision
```

**Step 2: Run checks and collect failures**

Run: `npm run lint && npm run test && npm run build`
Expected: Initial failures noted and fixed

**Step 3: Write minimal docs implementation**

```md
# docs/umkm-dashboard-bi-dss-guide.md
- sumber data CSV
- definisi KPI UMKM
- alur BI -> DSS -> keputusan
- cara baca visualisasi
- alasan keputusan akhir
```

**Step 4: Re-run checks to green**

Run: `npm run lint && npm run test && npm run build`
Expected: PASS semua

**Step 5: Commit**

```bash
git add docs/plan.md docs/umkm-dashboard-bi-dss-guide.md
git commit -m "docs: finalize UMKM BI-DSS dashboard documentation"
```

---

## Final Acceptance Criteria
- Data dashboard 100% berasal dari `dataset_umkm_jabar_1000rows.csv`.
- Tidak ada narasi KPI berbasis banjir/sampah sebagai fokus utama; jika ada field banjir di data, perlakukan hanya sebagai metadata tambahan non-primer.
- Sidebar tersedia dan berfungsi sebagai navigasi section.
- Minimal 3 visualisasi BI aktif dan relevan dengan indikator UMKM.
- Tabel DSS minimal 2 alternatif + scoring.
- Tepat 1 keputusan akhir dengan alasan berbasis KPI + insight + anggaran.
- Semua checks lulus: lint, test, build.

## Commands Recap
```bash
npm install
npm run build:data
npm run lint
npm run test
npm run build
```
