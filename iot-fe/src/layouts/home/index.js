import React from "react";
import "../../css/home.css";
import Sidebar from "../Sidebar";
import DashboardCard from "./components/DashboardCard";
import SensorChart from "./components/SensorChart";
import ControlPanel from "./components/ControlPanel";

const Home = () => {
  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-md-2">
          <Sidebar />
        </div>
        <div className="col-md-10">
          <h1 className="mt-4">Dashboard</h1>
          <div className="row">
            <div className="col-md-4">
              <DashboardCard
                title="Nhiệt Độ (°C)"
                value="37"
                bgColor="bg-danger"
                icon="fa-temperature-high"
              />
            </div>
            <div className="col-md-4">
              <DashboardCard
                title="Độ ẩm (%)"
                value="50"
                bgColor="bg-info"
                icon="fa-tint"
              />
            </div>
            <div className="col-md-4">
              <DashboardCard
                title="Ánh Sáng (Lux)"
                value="1000"
                bgColor="bg-warning"
                icon="fa-lightbulb"
              />
            </div>
          </div>
          <div className="container text-center">
            <div className="row">
              <div className="col-8">
                <SensorChart />
              </div>
              <div className="col-4">
                <ControlPanel />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
