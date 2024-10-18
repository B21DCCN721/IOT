import React from 'react';

const DashboardCard = ({ title, value, bgColor, icon }) => {
  return (
    <div
      className={`card text-white mb-3`}
      style={{ height: "150px", backgroundColor: `${bgColor}`, }}
    >
      <div className="card-header" style={{ borderBottom: "none" }}>
        <h5 className="card-title d-flex align-items-center justify-content-between" style={{ fontSize: "1rem" }}>
          
          {title}
          <i className={`fas ${icon} me-2`}></i>
        </h5>
      </div>
      <div
        className="card-body d-flex align-items-center justify-content-center"
        style={{ borderTop: "none" }}
      >
        <h5 className="card-title" style={{ fontSize: "2rem" }}>
          {value}
        </h5>
      </div>
    </div>
  );
};

export default DashboardCard;
