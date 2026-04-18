export default function DashboardLoading() {
  return (
    <div style={{ padding: '2rem', display: 'flex', flexDirection: 'column', gap: '2rem' }}>
      <header style={{ marginBottom: '2rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div style={{ width: '300px' }}>
          <div className="skeleton" style={{ height: '2.5rem', width: '60%', marginBottom: '0.5rem', borderRadius: '8px' }}></div>
          <div className="skeleton" style={{ height: '1.2rem', width: '100%', borderRadius: '8px' }}></div>
        </div>
        <div style={{ display: 'flex', gap: '1rem' }}>
          <div className="skeleton" style={{ height: '3rem', width: '120px', borderRadius: '12px' }}></div>
          <div className="skeleton" style={{ height: '3rem', width: '100px', borderRadius: '12px' }}></div>
        </div>
      </header>

      {/* Stats Skeleton */}
      <div style={{ 
        display: 'grid', 
        gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', 
        gap: '1.5rem',
        marginBottom: '3rem'
      }}>
        {[1, 2, 3, 4].map((i) => (
          <div key={i} className="glass" style={{ padding: '1.5rem', background: 'white' }}>
            <div className="skeleton" style={{ height: '2rem', width: '2rem', marginBottom: '1rem', borderRadius: '4px' }}></div>
            <div className="skeleton" style={{ height: '1rem', width: '50%', marginBottom: '0.5rem', borderRadius: '4px' }}></div>
            <div className="skeleton" style={{ height: '1.5rem', width: '70%', borderRadius: '4px' }}></div>
          </div>
        ))}
      </div>

      {/* Table Skeleton */}
      <div className="glass" style={{ padding: '2rem', background: 'white' }}>
        <div className="skeleton" style={{ height: '1.5rem', width: '200px', marginBottom: '2rem', borderRadius: '8px' }}></div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          {[1, 2, 3, 4, 5].map((i) => (
            <div key={i} className="skeleton" style={{ height: '4rem', width: '100%', borderRadius: '12px' }}></div>
          ))}
        </div>
      </div>

      <style dangerouslySetInnerHTML={{ __html: `
        .skeleton {
          background: linear-gradient(90deg, #f0f0f0 25%, #e0e0e0 50%, #f0f0f0 75%);
          background-size: 200% 100%;
          animation: loading 1.5s infinite;
        }
        @keyframes loading {
          0% { background-position: 200% 0; }
          100% { background-position: -200% 0; }
        }
      `}} />
    </div>
  );
}
