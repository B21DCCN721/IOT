import React, { useEffect, useRef, useState } from 'react';
import Chart from 'chart.js/auto';

const SensorChart = () => {
  const chartRef = useRef(null);
  const chartInstanceRef = useRef(null);
  const [sensorData, setSensorData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Hàm khởi tạo biểu đồ
  const initializeChart = (ctx, initialData) => {
    const labels = initialData.map(item => item.thoigian.split(' ')[1]);
    const temperatureData = initialData.map(item => item.nhietdo);
    const humidityData = initialData.map(item => item.doam);
    const lightData = initialData.map(item => item.anhsang);

    chartInstanceRef.current = new Chart(ctx, {
      type: 'line',
      data: {
        labels: labels,
        datasets: [
          {
            label: 'Nhiệt độ (°C)',
            data: temperatureData,
            borderColor: 'rgba(255, 99, 132, 1)',
            backgroundColor: 'rgba(255, 99, 132, 0.2)',
            fill: true,
            yAxisID: 'y-left',
          },
          {
            label: 'Độ ẩm (%)',
            data: humidityData,
            borderColor: 'rgba(54, 162, 235, 1)',
            backgroundColor: 'rgba(54, 162, 235, 0.2)',
            fill: true,
            yAxisID: 'y-left',
          },
          {
            label: 'Ánh sáng (lux)',
            data: lightData,
            borderColor: 'rgba(255, 206, 86, 1)',
            backgroundColor: 'rgba(255, 206, 86, 0.2)',
            fill: true,
            yAxisID: 'y-right',
          },
        ],
      },
      options: {
        plugins: {
          title: {
            display: true,
            text: 'Biểu Đồ Cảm Biến',
            font: {
              size: 20,
            },
          },
        },
        scales: {
          'y-left': {
            type: 'linear',
            position: 'left',
            beginAtZero: true,
            ticks: {
              callback: function(value) {
                return value + '°C / %';
              },
            },
          },
          'y-right': {
            type: 'linear',
            position: 'right',
            beginAtZero: true,
            ticks: {
              callback: function(value) {
                return value + ' lux'; 
              },
            },
            grid: {
              drawOnChartArea: false,
            },
          },
        },
      },
    });
  };

  // Hàm cập nhật biểu đồ
  const updateChart = (newData) => {
    if (chartInstanceRef.current) {
      const labels = newData.map(item => item.thoigian.split(' ')[1]);
      const temperatureData = newData.map(item => item.nhietdo);
      const humidityData = newData.map(item => item.doam);
      const lightData = newData.map(item => item.anhsang);

      // Cập nhật labels
      chartInstanceRef.current.data.labels = labels;

      // Cập nhật datasets
      chartInstanceRef.current.data.datasets[0].data = temperatureData;
      chartInstanceRef.current.data.datasets[1].data = humidityData;
      chartInstanceRef.current.data.datasets[2].data = lightData;

      // Cập nhật biểu đồ
      chartInstanceRef.current.update();
    }
  };

  useEffect(() => {
    let isMounted = true; // Biến cờ để kiểm tra component còn mounted hay không
    let intervalId;

    const fetchSensorData = async () => {
      try {
        const response = await fetch('http://localhost:5000/chart', {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        });
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        if (isMounted) {
          setSensorData(data);
        }

      } catch (err) {
        if (isMounted) {
          setError(err.message);
        }
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    };

    fetchSensorData();
    intervalId = setInterval(fetchSensorData, 1000);

    return () => {
      isMounted = false;
      clearInterval(intervalId);
    };
  }, []);

  useEffect(() => {
    if (loading || error) {
      return;
    }

    const ctx = chartRef.current.getContext('2d');

    if (!chartInstanceRef.current) {
      // Nếu biểu đồ chưa được khởi tạo, khởi tạo nó
      initializeChart(ctx, sensorData);
    } else {
      // Nếu biểu đồ đã được khởi tạo, cập nhật dữ liệu
      updateChart(sensorData);
    }

  }, [sensorData, loading, error]); 

  useEffect(() => {
    return () => {
      if (chartInstanceRef.current) {
        chartInstanceRef.current.destroy();
      }
    };
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Lỗi: {error}</div>;
  }

  return <canvas ref={chartRef} />;
};

export default SensorChart;
