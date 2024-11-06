import React, { useState, useEffect } from "react";
import "../../../css/controlPanel.css";

const ControlPanel = () => {
  const [fanOn, setFanOn] = useState(false);
  const [acOn, setAcOn] = useState(false);
  const [lightOn, setLightOn] = useState(false);

  useEffect(() => {
    let intervalId;
    const getDeviceStatus = async () => {
      try {
        const response = await fetch("http://localhost:5000/status", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        });
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        setFanOn(data.quat);
        setAcOn(data.dieuhoa);
        setLightOn(data.den);
        console.log(data)
      } catch (error) {
        console.error(error);
      }
    };
    getDeviceStatus();
    intervalId = setInterval(getDeviceStatus, 1000);

    return () => {
      clearInterval(intervalId);
    };
  }, []);

  const controlDevice = async (deviceId, newState) => {
    try {
      const response = await fetch("http://localhost:5000/controll", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          deviceId: deviceId,
          state: newState,
        }),
      });
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
    } catch (error) {
      console.log(error);
    }
  };
  const handleFanChange = () => {
    const newState = !fanOn;
    controlDevice("quat", newState);
  };
  const handleAcChange = () => {
    const newState = !acOn;
    controlDevice("dieuhoa", newState);
  };
  const handleLightChange = () => {
    const newState = !lightOn;
    controlDevice("den", newState);
  };

  return (
    <div className="control-panel">
      <h3 className="d-flex justify-content-center">Bảng điều khiển</h3>
      <div className="d-flex flex-column">
        <div className="d-flex justify-content-between align-items-center mb-3">
          <label
            className="justify-content-start label-name"
            htmlFor="fanSwitch"
          >
            Quạt
          </label>
          {/* <i className='fas fa-fan icon'></i> */}
          <i className={`fas fa-fan icon ${fanOn ? "rotate" : ""}`}></i>
          <div className="form-check form-switch">
            <input
              className="form-check-input"
              type="checkbox"
              id="fanSwitch"
              role="switch"
              checked={fanOn}
              onClick={handleFanChange}
            />

            <label className="form-check-label" htmlFor="fanSwitch">
              {fanOn ? "On" : "Off"}
            </label>
          </div>
        </div>
        <div className="d-flex justify-content-between align-items-center mb-3">
          <label
            className="justify-content-start label-name"
            htmlFor="acSwitch"
          >
            Điều hòa
          </label>
          {/* <i className='fas fa-snowflake icon'></i> */}
          <i className={`fas fa-snowflake icon ${acOn ? "active" : ""}`}></i>
          <div className="form-check form-switch">
            <input
              className="form-check-input"
              type="checkbox"
              id="acSwitch"
              role="switch"
              checked={acOn}
              onClick={handleAcChange}
            />
            <label className="form-check-label" htmlFor="acSwitch">
              {acOn ? "On" : "Off"}
            </label>
          </div>
        </div>
        <div className="d-flex justify-content-between align-items-center mb-3">
          <label
            className="justify-content-start label-name"
            htmlFor="lightSwitch"
          >
            Đèn
          </label>
          {/* <i className='fas fa-lightbulb icon'></i> */}
          <i className={`fas fa-lightbulb icon ${lightOn ? "glow" : ""}`}></i>
          <div className="form-check form-switch">
            <input
              className="form-check-input"
              type="checkbox"
              id="lightSwitch"
              role="switch"
              checked={lightOn}
              onClick={handleLightChange}
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
