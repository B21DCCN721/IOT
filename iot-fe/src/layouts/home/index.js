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

    // Gọi API lần đầu tiên khi component mount
    fetchCardData();

    // Thiết lập polling: gọi API mỗi 10 giây
    intervalId = setInterval(fetchCardData, 1000); // 1000ms = 10s

    // Cleanup khi component unmount nó chỉ được gọi khi component unmount
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
                bgColor="red"
                icon="fa-temperature-high"
              />
            </div>
            <div className="col-md-4">
              <DashboardCard
                title="Độ ẩm (%)"
                value={cardData.doam}
                bgColor="blue"
                icon="fa-tint"
              />
            </div>
            <div className="col-md-4">
              <DashboardCard
                title="Ánh Sáng (Lux)"
                value={cardData.anhsang}
                bgColor="yellow"
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
