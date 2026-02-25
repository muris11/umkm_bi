import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import Home from '../page';

describe('Home page smoke test', () => {
  it('should render landing hero heading', async () => {
    const ui = await Home();
    render(ui);
    const heading = screen.getByRole('heading', { level: 1 });
    expect(heading).toHaveTextContent(/Data UMKM/i);
  });

  it('should render primary landing actions', async () => {
    const ui = await Home();
    render(ui);
    expect(screen.getAllByRole('button', { name: /Explorasi Dashboard/i })[0]).toBeInTheDocument();
    expect(screen.getAllByRole('button', { name: /Pelajari Metodologi/i })[0]).toBeInTheDocument();
  });
});
