# Professional Folder Structure Refactor Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Merapikan struktur folder dashboard UMKM agar profesional, modular, mudah scaling, dan setiap bagian UI punya file yang jelas (section per file).

**Architecture:** Pisahkan kode berbasis domain `features/dashboard` lalu pecah `src/app/page.tsx` menjadi komponen section terpisah: hero, KPI, visualisasi BI, insight, DSS, keputusan, diskusi. Pertahankan data source dan perilaku saat ini, fokus pada maintainability + readability. Gunakan adaptor data tipis agar komponen presentational tidak tergantung raw JSON shape.

**Tech Stack:** Next.js 16 App Router, TypeScript, Tailwind CSS v4, Recharts, Vitest + Testing Library.

---

### Task 1: Buat Struktur Folder Target dan Barrel Exports

**Files:**
- Create: `src/features/dashboard/components/sections/index.ts`
- Create: `src/features/dashboard/components/charts/index.ts`
- Create: `src/features/dashboard/components/dss/index.ts`
- Create: `src/features/dashboard/components/discussion/index.ts`
- Create: `src/features/dashboard/lib/index.ts`
- Create: `src/features/dashboard/types/index.ts`
- Test: `src/features/dashboard/__tests__/barrels.test.ts`

**Step 1: Write the failing test**

```ts
import { describe, it, expect } from "vitest";
import * as sectionBarrel from "@/features/dashboard/components/sections";

describe("dashboard barrels", () => {
  it("exports section modules", () => {
    expect(sectionBarrel).toBeDefined();
  });
});
```

**Step 2: Run test to verify it fails**

Run: `npm run test -- src/features/dashboard/__tests__/barrels.test.ts`
Expected: FAIL with module not found

**Step 3: Write minimal implementation**

```ts
// src/features/dashboard/components/sections/index.ts
export {};
```

(ulang pola untuk barrel lain)

**Step 4: Run test to verify it passes**

Run: `npm run test -- src/features/dashboard/__tests__/barrels.test.ts`
Expected: PASS

**Step 5: Commit**

```bash
git add src/features/dashboard
 git commit -m "refactor: add professional dashboard feature folder skeleton"
```

---

### Task 2: Pisahkan Hero + KPI Jadi Section Per File

**Files:**
- Create: `src/features/dashboard/components/sections/dashboard-hero-section.tsx`
- Create: `src/features/dashboard/components/sections/dashboard-kpi-section.tsx`
- Modify: `src/app/page.tsx`
- Modify: `src/features/dashboard/components/sections/index.ts`
- Test: `src/features/dashboard/components/sections/__tests__/hero-kpi-section.test.tsx`

**Step 1: Write the failing test**

```tsx
import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import Home from "@/app/page";

describe("hero and kpi sections", () => {
  it("renders BI + DSS heading and KPI section", () => {
    render(<Home />);
    expect(screen.getByText(/Business Intelligence \+ Decision Support System/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/KPI utama/i)).toBeInTheDocument();
  });
});
```

**Step 2: Run test to verify it fails**

Run: `npm run test -- src/features/dashboard/components/sections/__tests__/hero-kpi-section.test.tsx`
Expected: FAIL initially if imports/components not wired

**Step 3: Write minimal implementation**

```tsx
// dashboard-hero-section.tsx
export function DashboardHeroSection({ meta }: { meta: { sumber: string; jumlahBaris: number; tahun: number } }) {
  return <section className="hero panel card-padding">...</section>;
}
```

```tsx
// dashboard-kpi-section.tsx
export function DashboardKpiSection({ cards }: { cards: Array<{ label: string; value: string; tone: string }> }) {
  return <section id="ringkasan-kpi" className="kpi-grid" aria-label="KPI utama">...</section>;
}
```

**Step 4: Run test to verify it passes**

Run: `npm run test -- src/features/dashboard/components/sections/__tests__/hero-kpi-section.test.tsx`
Expected: PASS

**Step 5: Commit**

```bash
git add src/features/dashboard/components/sections src/app/page.tsx
 git commit -m "refactor: extract hero and KPI sections into dedicated files"
```

---

### Task 3: Pisahkan Visualisasi BI Menjadi Section Container Terpisah

**Files:**
- Create: `src/features/dashboard/components/sections/dashboard-bi-visualization-section.tsx`
- Modify: `src/app/page.tsx`
- Modify: `src/features/dashboard/components/sections/index.ts`
- Test: `src/features/dashboard/components/sections/__tests__/bi-visualization-section.test.tsx`

**Step 1: Write the failing test**

```tsx
import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import Home from "@/app/page";

describe("BI visualization section", () => {
  it("renders all BI chart titles", () => {
    render(<Home />);
    expect(screen.getByText("UMKM per 1000 Penduduk")).toBeInTheDocument();
    expect(screen.getByText("Formalisasi vs Digitalisasi")).toBeInTheDocument();
    expect(screen.getByText("Akses Pembiayaan UMKM")).toBeInTheDocument();
    expect(screen.getByText("Omzet vs Tenaga Kerja")).toBeInTheDocument();
  });
});
```

**Step 2: Run test to verify it fails**

Run: `npm run test -- src/features/dashboard/components/sections/__tests__/bi-visualization-section.test.tsx`
Expected: FAIL when section not extracted/wired

**Step 3: Write minimal implementation**

```tsx
// dashboard-bi-visualization-section.tsx
import { UmkmDensityChart, UmkmFormalDigitalChart, UmkmFinanceChart, OmzetTenagaKerjaScatter } from "@/components/charts/...";

export function DashboardBiVisualizationSection({ priorities }: { priorities: any[] }) {
  return (
    <section id="visualisasi-bi" className="three-col" aria-label="Visualisasi indikator kinerja utama">
      <UmkmDensityChart data={priorities} />
      <UmkmFormalDigitalChart data={priorities} />
      <UmkmFinanceChart data={priorities} />
      <OmzetTenagaKerjaScatter data={priorities} />
    </section>
  );
}
```

**Step 4: Run test to verify it passes**

Run: `npm run test -- src/features/dashboard/components/sections/__tests__/bi-visualization-section.test.tsx`
Expected: PASS

**Step 5: Commit**

```bash
git add src/features/dashboard/components/sections src/app/page.tsx
 git commit -m "refactor: extract BI visualization section into single module"
```

---

### Task 4: Pisahkan Insight + DSS + Keputusan Menjadi Section Per File

**Files:**
- Create: `src/features/dashboard/components/sections/dashboard-insight-section.tsx`
- Create: `src/features/dashboard/components/sections/dashboard-dss-section.tsx`
- Create: `src/features/dashboard/components/sections/dashboard-decision-section.tsx`
- Modify: `src/app/page.tsx`
- Modify: `src/features/dashboard/components/sections/index.ts`
- Test: `src/features/dashboard/components/sections/__tests__/dss-decision-section.test.tsx`

**Step 1: Write the failing test**

```tsx
import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import Home from "@/app/page";

describe("DSS and decision sections", () => {
  it("renders alternatives and final decision", () => {
    render(<Home />);
    expect(screen.getByText(/Alternatif Kebijakan \(DSS\)/i)).toBeInTheDocument();
    expect(screen.getByText(/Keputusan Terbaik/i)).toBeInTheDocument();
  });
});
```

**Step 2: Run test to verify it fails**

Run: `npm run test -- src/features/dashboard/components/sections/__tests__/dss-decision-section.test.tsx`
Expected: FAIL before extraction wiring

**Step 3: Write minimal implementation**

```tsx
// dashboard-insight-section.tsx
export function DashboardInsightSection(...) { ... }

// dashboard-dss-section.tsx
export function DashboardDssSection(...) { ... }

// dashboard-decision-section.tsx
export function DashboardDecisionSection(...) { ... }
```

**Step 4: Run test to verify it passes**

Run: `npm run test -- src/features/dashboard/components/sections/__tests__/dss-decision-section.test.tsx`
Expected: PASS

**Step 5: Commit**

```bash
git add src/features/dashboard/components/sections src/app/page.tsx
 git commit -m "refactor: split insight dss decision into modular section files"
```

---

### Task 5: Tambah Adapter Data Supaya Page Tipis dan Profesional

**Files:**
- Create: `src/features/dashboard/lib/build-dashboard-view-model.ts`
- Modify: `src/app/page.tsx`
- Modify: `src/features/dashboard/lib/index.ts`
- Test: `src/features/dashboard/lib/__tests__/build-dashboard-view-model.test.ts`

**Step 1: Write the failing test**

```ts
import { describe, it, expect } from "vitest";
import { buildDashboardViewModel } from "@/features/dashboard/lib/build-dashboard-view-model";

describe("buildDashboardViewModel", () => {
  it("returns normalized UI model", () => {
    const vm = buildDashboardViewModel({} as any);
    expect(vm).toHaveProperty("kpiCards");
    expect(vm).toHaveProperty("priorities");
    expect(vm).toHaveProperty("insights");
  });
});
```

**Step 2: Run test to verify it fails**

Run: `npm run test -- src/features/dashboard/lib/__tests__/build-dashboard-view-model.test.ts`
Expected: FAIL

**Step 3: Write minimal implementation**

```ts
export function buildDashboardViewModel(data: any) {
  return {
    meta: data.meta,
    kpiCards: [...],
    priorities: data.prioritas,
    insights: data.insight,
    alternatives: data.alternatifDss,
    decision: data.keputusan,
  };
}
```

**Step 4: Run test to verify it passes**

Run: `npm run test -- src/features/dashboard/lib/__tests__/build-dashboard-view-model.test.ts`
Expected: PASS

**Step 5: Commit**

```bash
git add src/features/dashboard/lib src/app/page.tsx
 git commit -m "refactor: add dashboard view-model adapter to thin page layer"
```

---

### Task 6: Rapikan Styling per Domain dan Kurangi CSS Monolitik

**Files:**
- Create: `src/features/dashboard/styles/dashboard-sections.css`
- Modify: `src/app/globals.css`
- Modify: `src/app/page.tsx`
- Test: `src/features/dashboard/components/sections/__tests__/css-class-smoke.test.tsx`

**Step 1: Write the failing test**

```tsx
import { describe, it, expect } from "vitest";
import { render } from "@testing-library/react";
import Home from "@/app/page";

describe("css classes smoke", () => {
  it("applies section classes", () => {
    const { container } = render(<Home />);
    expect(container.querySelector(".kpi-grid")).toBeTruthy();
    expect(container.querySelector(".three-col")).toBeTruthy();
  });
});
```

**Step 2: Run test to verify it fails**

Run: `npm run test -- src/features/dashboard/components/sections/__tests__/css-class-smoke.test.tsx`
Expected: FAIL if class wiring broken during extraction

**Step 3: Write minimal implementation**

```css
/* dashboard-sections.css */
/* move section-specific class definitions from globals.css */
```

```tsx
// page.tsx
import "@/features/dashboard/styles/dashboard-sections.css";
```

**Step 4: Run test to verify it passes**

Run: `npm run test -- src/features/dashboard/components/sections/__tests__/css-class-smoke.test.tsx`
Expected: PASS

**Step 5: Commit**

```bash
git add src/features/dashboard/styles src/app/globals.css src/app/page.tsx
 git commit -m "refactor: isolate dashboard section styles from global stylesheet"
```

---

### Task 7: Dokumentasikan Struktur Folder Profesional (Per File)

**Files:**
- Create: `docs/architecture/professional-folder-structure.md`
- Modify: `docs/umkm-dashboard-bi-dss-guide.md`
- Test: `src/app/__tests__/smoke.test.tsx` (regression only)

**Step 1: Write the failing test (regression gate)**

```tsx
import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import Home from "@/app/page";

describe("regression gate", () => {
  it("still renders dashboard heading", () => {
    render(<Home />);
    expect(screen.getByRole("heading", { level: 1 })).toBeInTheDocument();
  });
});
```

**Step 2: Run test to verify baseline passes**

Run: `npm run test -- src/app/__tests__/smoke.test.tsx`
Expected: PASS

**Step 3: Write minimal docs implementation**

```md
# Professional Folder Structure
- tree struktur final
- fungsi tiap folder
- mapping komponen -> file
- aturan naming + placement policy
```

**Step 4: Run docs-aware regression checks**

Run: `npm run lint && npm run test -- src/app/__tests__/smoke.test.tsx`
Expected: PASS

**Step 5: Commit**

```bash
git add docs/architecture/professional-folder-structure.md docs/umkm-dashboard-bi-dss-guide.md
 git commit -m "docs: add professional folder structure per-file guide"
```

---

### Task 8: Final Verification + Polish

**Files:**
- Modify: `docs/plan.md`
- Modify: `.opencode/CHANGELOG.md`

**Step 1: Add final checklist block in docs/plan.md**

```md
## Professional Structure Checklist
- [ ] page.tsx <= orchestration only
- [ ] each section in its own file
- [ ] data mapping via adapter
- [ ] tests green
```

**Step 2: Run full verification**

Run: `npm run lint && npm run test && npm run build`
Expected: PASS semua

**Step 3: Update changelog entry**

```md
- refactor folder structure to professional feature-based layout
```

**Step 4: Verify file structure output for handoff**

Run: `ls src/features/dashboard && ls src/features/dashboard/components/sections`
Expected: directories and files exist exactly as documented

**Step 5: Commit**

```bash
git add docs/plan.md .opencode/CHANGELOG.md
 git commit -m "chore: finalize professional folder structure refactor verification"
```

---

## Final Acceptance Criteria
- `src/app/page.tsx` jadi tipis (orchestrator), bukan file monolitik.
- Tiap section dashboard punya file terpisah dan jelas.
- Struktur folder feature-based profesional (`src/features/dashboard/...`).
- Data mapping dipusatkan di adapter/view-model.
- Test suite tetap hijau (tidak ada regresi behavior).
- Docs arsitektur per file tersedia untuk onboarding developer baru.

## Commands Recap
```bash
npm run lint
npm run test
npm run build
```
