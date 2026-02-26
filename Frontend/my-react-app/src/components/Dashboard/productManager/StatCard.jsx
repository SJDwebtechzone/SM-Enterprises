

const StatCard = ({ value, label, color, icon, footerText }) => {
  const colors = {
    brown: '#713200',
    gold: '#d4af37',
    sandal: '#f5e1a4',
    white: '#ffffff',
    bg: '#fdf8f0'
  };

  const activeColor = colors[color] || '#6c757d'; // Default to grey if not found

  return (
    <div className="card shadow-sm border-0 rounded-3 overflow-hidden" style={{ padding: '12px', background: colors.white }}>
      {/* === Top Section === */}
      <div className="card-body d-flex justify-content-between align-items-center p-3">
        <div>
          <h3 className="fw-bold mb-1" style={{ color: activeColor }}>{value}</h3>
          <p className="mb-0 fw-semibold text-secondary">{label}</p>
        </div>
        <div
          className="rounded-circle d-flex align-items-center justify-content-center"
          style={{ width: '50px', height: '50px', backgroundColor: `${activeColor}20` }}
        >
          <i className={`bi ${icon} fs-4`} style={{ color: activeColor }}></i>
        </div>
      </div>

      {/* === Footer Section === */}
      <div className="text-white px-3 py-2" style={{ backgroundColor: activeColor }}>
        <div className="d-flex justify-content-between align-items-center">
          <span className="small">{footerText}</span>
          <i className="bi bi-graph-up"></i>
        </div>
      </div>
    </div>
  );
};

export default StatCard;