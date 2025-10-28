

const StatCard = ({ value, label, color, icon, footerText }) => {
  return (
    <div className="card shadow-sm border-0 rounded-3 overflow-hidden" style={{ padding: '12px' }}>
      {/* === Top Section === */}
      <div className="card-body d-flex justify-content-between align-items-center p-3">
        <div>
          <h3 className={`fw-bold text-${color} mb-1`}>{value}</h3>
          <p className="mb-0 fw-semibold text-secondary">{label}</p>
        </div>
        <div
          className={`bg-${color} bg-opacity-25 rounded-circle d-flex align-items-center justify-content-center`}
          style={{ width: '50px', height: '50px' }}
        >
          <i className={`bi ${icon} fs-4 text-${color}`}></i>
        </div>
      </div>

      {/* === Footer Section === */}
      <div className={`bg-${color} text-white px-3 py-2`}>
        <div className="d-flex justify-content-between align-items-center">
          <span className="small">{footerText}</span>
          <i className="bi bi-graph-up"></i>
        </div>
      </div>
    </div>
  );
};

export default StatCard;