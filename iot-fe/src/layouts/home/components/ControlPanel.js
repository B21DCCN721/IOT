import React, { useState } from "react";
import "../../../css/controlPanel.css"; // Make sure to create this CSS file for styling

const ControlPanel = () => {
  const [fanOn, setFanOn] = useState(false);
  const [acOn, setAcOn] = useState(false);
  const [lightOn, setLightOn] = useState(false);

  const handleFanChange = () => setFanOn(!fanOn);
  const handleAcChange = () => setAcOn(!acOn);
  const handleLightChange = () => setLightOn(!lightOn);

  return (
    <div className="control-panel">
      <h3>Bảng điều khiển</h3>
      <div className="d-flex flex-column">
        <div className="d-flex justify-content-between align-items-center mb-3">
          <label htmlFor="fanSwitch">Quạt</label>
          <i className={`fas fa-fan icon ${fanOn ? "rotate" : ""}`}></i>
          <div className="form-check form-switch">
            <input
              className="form-check-input"
              type="checkbox"
              id="fanSwitch"
              role="switch"
              checked={fanOn}
              onChange={handleFanChange}
            />

            <label className="form-check-label" htmlFor="fanSwitch">
              {fanOn ? "On" : "Off"}
            </label>
          </div>
        </div>
        <div className="d-flex justify-content-between align-items-center mb-3">
          <label htmlFor="acSwitch">Điều hòa</label>
          <i className={`fas fa-snowflake icon ${acOn ? "active" : ""}`}></i>
          <div className="form-check form-switch">
            <input
              className="form-check-input"
              type="checkbox"
              id="acSwitch"
              role="switch"
              checked={acOn}
              onChange={handleAcChange}
            />
            <label className="form-check-label" htmlFor="acSwitch">
              {acOn ? "On" : "Off"}
            </label>
          </div>
        </div>
        <div className="d-flex justify-content-between align-items-center mb-3">
          <label htmlFor="lightSwitch">Đèn</label>
          <i className={`fas fa-lightbulb icon ${lightOn ? "glow" : ""}`}></i>
          <div className="form-check form-switch">
            <input
              className="form-check-input"
              type="checkbox"
              id="lightSwitch"
              role="switch"
              checked={lightOn}
              onChange={handleLightChange}
            />
            <label className="form-check-label" htmlFor="lightSwitch">
              {lightOn ? "On" : "Off"}
            </label>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ControlPanel;
