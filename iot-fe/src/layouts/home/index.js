import React, { useEffect, useState } from "react";
import "../../css/home.css";
import Sidebar from "../Sidebar";
import DashboardCard from "./components/DashboardCard";
import SensorChart from "./components/SensorChart";
import ControlPanel from "./components/ControlPanel";


const Home = () => {
  const [cardData, setCardData] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let isMounted = true;
    let intervalId;

    const fetchCardData = async () => {
      try {
        const response = await fetch('http://localhost:5000', {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        });

        if (!response.ok) {
          const errorText = await response.text();
          throw new Error(`HTTP error! status: ${response.status}, message: ${errorText}`);
        }

        const data = await response.json();
        if (isMounted) {
          setCardData(data);
          setError(null); 
        }
      } catch (err) {
        console.error('Error fetching data:', err); 
        if (isMounted) {
          setError(err.message);
        }
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    };
    fetchCardData();
    intervalId = setInterval(fetchCardData, 2000);
    return () => {
      isMounted = false;
      clearInterval(intervalId);
    };
  }, []);

  if (loading) {
    return (
      <div className="container-fluid">
        <div className="row">
          <div className="col-md-2">
            <Sidebar />
          </div>
          <div className="col-md-10">
            <h1 className="mt-4">Dashboard</h1>
            <div>Loading...</div>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container-fluid">
        <div className="row">
          <div className="col-md-2">
            <Sidebar />
          </div>
          <div className="col-md-10">
            <h1 className="mt-4">Dashboard</h1>
            <div className="alert alert-danger" role="alert">
              Lỗi: {error}
            </div>
          </div>
        </div>
      </div>
    );
  }

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
                value={cardData.nhietdo}
                bgColor={parseFloat(cardData.nhietdo) < 30 ? "#f34f4c" : "#ef2305"}
                icon="fa-temperature-high"
              />
            </div>
            <div className="col-md-4">
              <DashboardCard
                title="Độ ẩm (%)"
                value={cardData.doam}
                bgColor={parseFloat(cardData.doam) < 60 ? "#2fceee" : "#0dcaf0"}
                icon="fa-tint"
              />
            </div>
            <div className="col-md-4">
              <DashboardCard
                title="Ánh Sáng (Lux)"
                value={cardData.anhsang}
                bgColor={parseInt(cardData.anhsang) < 50 ? "#e7d915f0" : "#efc238"}
                icon="fa-lightbulb"
              />
            </div>
          </div>
          <div className="container">
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
