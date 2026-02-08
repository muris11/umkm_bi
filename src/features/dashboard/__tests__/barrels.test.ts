import { describe, expect, it } from 'vitest';

describe('dashboard barrels', () => {
  it('exports sections barrel', async () => {
    const barrel = await import('../components/sections');
    expect(barrel).toBeDefined();
  });

  it('exports charts barrel', async () => {
    const barrel = await import('../components/charts');
    expect(barrel).toBeDefined();
  });

  it('exports lib barrel', async () => {
    const barrel = await import('../lib');
    expect(barrel).toBeDefined();
  });

  it('exports types barrel', async () => {
    const barrel = await import('../types');
    expect(barrel).toBeDefined();
  });
});
