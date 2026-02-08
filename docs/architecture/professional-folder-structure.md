# Professional Folder Structure Guide

## Overview
This document describes the feature-based folder structure for the UMKM Dashboard.

## Key Principles
1. **Feature Colocation**: All dashboard-related code lives in `src/features/dashboard/`
2. **Thin Page Layer**: `page.tsx` is a pure orchestrator (<50 lines)
3. **Single Source of Truth**: Types are centralized, not duplicated
4. **View Model Pattern**: Data transformation happens in adapter layer (`buildExtendedViewModel`)
5. **Testability**: Each section is independently testable

## Import Rules
- Use barrel exports: `import { X } from '@/features/dashboard'`
- Never import from deep paths in production code
- Tests may import from specific files for isolation

## Feature Structure (`src/features/dashboard`)
- `components/`: UI Components (Charts, Sections, Filters, Container)
- `lib/`: Business logic, scoring engines, data aggregators
- `types/`: Centralized Typescript definitions
- `hooks/`: Custom hooks (if any)
- `styles/`: Feature-specific CSS
