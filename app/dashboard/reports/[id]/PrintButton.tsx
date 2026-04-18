'use client';

export default function PrintButton() {
  return (
    <button className="btn btn-accent" onClick={() => window.print()}>
      Download PDF
    </button>
  );
}
