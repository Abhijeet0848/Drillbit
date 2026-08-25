'use client';

import { Download } from 'lucide-react';

export default function PrintButton() {
  return (
    <button className="btn btn-accent hover-lift" onClick={() => window.print()} style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
      <Download size={16} /> Download PDF
    </button>
  );
}
