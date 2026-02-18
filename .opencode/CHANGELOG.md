# Change Log

## 2026-02-18
- Refactored interactive dashboard sections to consume real dataset/viewModel data instead of hardcoded dummy values.
- Updated `DataExplorerSection` to accept `data` prop, aggregate real rows by kecamatan/kabupaten, and compute live filters/stats/priority.
- Updated `BIBuilderSection` to accept `viewModel` + `rawData`, derive KPI cards from actual metrics, and generate chart previews from real historical/aggregated data.
- Updated `WhatIfSimulatorSection` to accept `viewModel`, derive baseline variables from active dashboard metrics, and compute scenario outcomes from real baselines.
- Updated `MLPlaygroundSection` to accept `rawData` + `viewModel`, compute model outputs/insights from dataset profile, and remove random dummy-based result generation.
- Updated `DashboardContainer` wiring to pass real data props into ML Playground, BI Builder, What-If Simulator, and Data Explorer.
- Verification: `npm run build` passed. `npm run test` has pre-existing failures in `src/app/__tests__/smoke.test.tsx` unrelated to these section changes.
- Fixed hydration mismatch in `DataExplorerSection` by making table sort comparator deterministic when values are equal (stable tie-break with `id`).
- Activated BI Builder share feature: `Bagikan` now generates a shareable URL with selected KPI/visualization config, uses Web Share API when available, and falls back to clipboard copy with success/error feedback.
