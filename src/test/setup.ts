import '@testing-library/jest-dom/vitest';

type ResizeObserverCallback = (entries: ResizeObserverEntry[], observer: ResizeObserver) => void;
type IntersectionObserverCallback = (entries: IntersectionObserverEntry[], observer: IntersectionObserver) => void;

global.ResizeObserver = class ResizeObserver {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  constructor(_callback: ResizeObserverCallback) {}
  observe() {}
  unobserve() {}
  disconnect() {}
} as unknown as typeof globalThis.ResizeObserver;

global.IntersectionObserver = class IntersectionObserver {
  readonly root: Element | Document | null = null;
  readonly rootMargin = '0px';
  readonly thresholds = [0];

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  constructor(_callback: IntersectionObserverCallback, _options?: IntersectionObserverInit) {}
  observe() {}
  unobserve() {}
  disconnect() {}
  takeRecords(): IntersectionObserverEntry[] {
    return [];
  }
} as unknown as typeof globalThis.IntersectionObserver;
