import React from "react";
import { useState, useEffect } from "react";
import Sidebar from "../Sidebar";
import SensorChart from "./components/SensorChart";
import DashboardCard from "../home/components/DashboardCard";
import '../../css/controlPanel.css';
import '../../css/bai5.css';

const NewPage = () => {
  const [data, setData] = useState({});
  
  useEffect(() => {
    let isMounted = true;
    let intervalId;

    const fetchCanhBaoData = async () => {
      try {
        const response = await fetch('http://localhost:5000/datasensor/canhbao', {
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
          setData(data);
        }
      } catch (err) {
        console.error('Error fetching data:', err); 
      }
    };
    fetchCanhBaoData();
    intervalId = setInterval(fetchCanhBaoData, 1000);
    return () => {
      isMounted = false;
      clearInterval(intervalId);
    };
  }, []);
  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-md-2">
          <Sidebar />
        </div>
        <div className="col-md-10 container">
          <h1 className="mt-4">Bai 5</h1>
          <div className="container">
            <div className="row">
              <div className="col-4">
                <DashboardCard 
                  title="Tốc độ gió (m/s)"
                  value= {data.windSpeed}
                  bgColor={parseFloat(data.windSpeed) < 30 ? "#f34f4c" : "#ef2305"}
                  icon="fa-temperature-high"
                />
              </div>
              <div className="col-4">
                <SensorChart />
              </div>
              <div className="col-4 d-flex align-items-center justify-content-center bai5">
                  {/* <h2>{`Số lần cảnh báo: ${data.soLuong}`}</h2> */}
                  <i className={`fas fa-lightbulb icon ${data.windSpeed >= 60 ? "nhapnhay" : ""}`}></i>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NewPage;
