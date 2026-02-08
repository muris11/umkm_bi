import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import Home from '../page';

describe('Home page smoke test', () => {
  it('should render Dashboard UMKM heading', () => {
    render(<Home />);
    const heading = screen.getByRole('heading', { level: 1 });
    expect(heading).toHaveTextContent(/Dashboard/i);
  });

  it('should render sidebar with all 6 navigation labels on Home page', () => {
    render(<Home />);
    // Use getAllByText and get first match (sidebar navigation items)
    expect(screen.getAllByText('Ringkasan KPI')[0]).toBeInTheDocument();
    expect(screen.getAllByText('Visualisasi BI')[0]).toBeInTheDocument();
    expect(screen.getAllByText('Insight')[0]).toBeInTheDocument();
    expect(screen.getAllByText('Alternatif DSS')[0]).toBeInTheDocument();
    expect(screen.getAllByText('Keputusan Akhir')[0]).toBeInTheDocument();
    expect(screen.getAllByText('Diskusi')[0]).toBeInTheDocument();
  });
});
