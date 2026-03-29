import React, { useState, useEffect } from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Line } from 'react-chartjs-2';
import '../App.css';


ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
);

const mockHistoricalData = [
  { date: '04-10', attendance: 42350, temp: 68, windSpeed: 7, homeRuns: 12, strikeouts: 342 },
  { date: '04-11', attendance: 43820, temp: 71, windSpeed: 5, homeRuns: 15, strikeouts: 356 },
  { date: '04-12', attendance: 45120, temp: 74, windSpeed: 9, homeRuns: 11, strikeouts: 331 },
  { date: '04-13', attendance: 46280, temp: 69, windSpeed: 12, homeRuns: 18, strikeouts: 389 },
  { date: '04-14', attendance: 42930, temp: 67, windSpeed: 8, homeRuns: 14, strikeouts: 347 },
  { date: '04-15', attendance: 47560, temp: 73, windSpeed: 6, homeRuns: 16, strikeouts: 362 },
];

const TimelinePage = () => { // TimelinePage komponent

  const [historicalData, setHistoricalData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedProperty, setSelectedProperty] = useState('attendance');

  const properties = [
    { id: 'attendance', label: 'Attendance', unit: 'fans', color: 'rgba(255, 99, 132, 1)' },
    { id: 'temp', label: 'Temperature', unit: '°F', color: 'rgba(54, 162, 235, 1)' },
    { id: 'windSpeed', label: 'Wind Speed', unit: 'mph', color: 'rgba(255, 205, 86, 1)' },
    { id: 'homeRuns', label: 'Home Runs', unit: '', color: 'rgba(75, 192, 192, 1)' },
    { id: 'strikeouts', label: 'Strikeouts', unit: '', color: 'rgba(153, 102, 255, 1)' },
  ];

  useEffect(() => {

    const fetchData = async () => {
      setLoading(true);
      await new Promise(resolve => setTimeout(resolve, 1000));
      setHistoricalData(mockHistoricalData);
      setLoading(false);
    };

    fetchData();
  }, []);


  const chartData = {
    labels: historicalData.map(d => d.date),
    datasets: properties.map(prop => ({
      label: `${prop.label} (${prop.unit})`,
      data: historicalData.map(d => d[prop.id]),
      borderColor: prop.color,
      backgroundColor: prop.color + '20',
      tension: 0.4,
      pointRadius: 6,
      pointHoverRadius: 8,
      hidden: prop.id !== selectedProperty,
      borderWidth: 3,
    })),
  };


  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { 
        position: 'top',
        labels: { 
          usePointStyle: true,
          padding: 20,
        }
      },
      title: {
        display: true,
        text: `MLB Stadium Timeline - ${properties.find(p => p.id === selectedProperty)?.label}`,
        font: { size: 20 }
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        grid: { color: 'rgba(255,255,255,0.1)' },
      },
      x: {
        grid: { color: 'rgba(255,255,255,0.1)' },
      },
    },
    interaction: {
      intersect: false,
      mode: 'index',
    },
  };

  if (loading) {
    return (
      <div className="timeline-container">
        <div className="loading">Loading MLB analytics...</div>
      </div>
    );
  }

  return (
    <div className="timeline-container">
      
      <h1>MLB Timeline Analytics</h1>
      <p>Interactive line charts showing 5 key MLB stadium properties over time</p>

      <div className="property-selector"> {/* Dropdown */}
        <label>Display Metric:</label>
        <select value={selectedProperty} onChange={(e) => setSelectedProperty(e.target.value)}>
          {properties.map(prop => (
            <option key={prop.id} value={prop.id}>
              {prop.label}
            </option>
          ))}
        </select>
      </div>

      <div className="chart-container">
        <Line data={chartData} options={options} />
      </div>

      <div className="properties-grid">
        {properties.map(prop => {
          const latest = historicalData[historicalData.length - 1] || {};
          return (
            <div 
              key={prop.id} 
              className={`property-item ${prop.id === selectedProperty ? 'active' : ''}`}
              onClick={() => setSelectedProperty(prop.id)}
            >
              <span className="property-dot" style={{ backgroundColor: prop.color }}></span>
              <div>
                <strong>{prop.label}</strong>
                <div>{latest[prop.id]}{prop.unit}</div>
              </div>
            </div>
          );
        })}
      </div>

      <div className="data-table">
        <h3>Historical Data Table</h3>
        <table>
          <thead>
            <tr>
              <th>Date</th>
              <th>Attendance</th>
              <th>Temp</th>
              <th>Wind</th>
              <th>HR</th>
              <th>K</th>
            </tr>
          </thead>
          <tbody>
            {historicalData.map((data, idx) => (
              <tr key={idx}>
                <td>{data.date}</td>
                <td>{data.attendance.toLocaleString()}</td>
                <td>{data.temp}</td>
                <td>{data.windSpeed}</td>
                <td>{data.homeRuns}</td>
                <td>{data.strikeouts}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

    </div>
  );
};

export default TimelinePage;