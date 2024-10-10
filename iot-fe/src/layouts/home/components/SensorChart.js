import React, { useEffect, useRef } from 'react';
import Chart from 'chart.js/auto';

const SensorChart = () => {
  const chartRef = useRef(null);
  const chartInstanceRef = useRef(null);

  useEffect(() => {
    const ctx = chartRef.current.getContext('2d');

    if (chartInstanceRef.current) {
      chartInstanceRef.current.destroy();
    }

    chartInstanceRef.current = new Chart(ctx, {
      type: 'line',
      data: {
        labels: ['6h', '9h', '12h', '15h', '18h', '21h', '24h'], 
        datasets: [
          {
            label: 'Nhiệt độ (°C)',
            data: [22, 24, 28, 30, 26, 23, 21], 
            borderColor: 'rgba(255, 99, 132, 1)',
            backgroundColor: 'rgba(255, 99, 132, 0.2)',
            fill: true,
            yAxisID: 'y-left',
          },
          {
            label: 'Độ ẩm (%)',
            data: [60, 65, 55, 50, 58, 62, 66], 
            borderColor: 'rgba(54, 162, 235, 1)',
            backgroundColor: 'rgba(54, 162, 235, 0.2)',
            fill: true,
            yAxisID: 'y-left',
          },
          {
            label: 'Ánh sáng (lux)',
            data: [300, 500, 800, 1200, 700, 400, 200], 
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

    return () => {
      if (chartInstanceRef.current) {
        chartInstanceRef.current.destroy();
      }
    };
  }, []);

  return <canvas ref={chartRef} />;
};

export default SensorChart;
