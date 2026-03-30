import React, { useState, useEffect } from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  ArcElement,
  Title,
  Tooltip,
  Legend,
  RadialLinearScale,
  PointElement,
  LineElement,
  Filler
} from 'chart.js'; 
import { Bar, Pie, Radar } from 'react-chartjs-2'; //grafieke
import '../App.css'; //styling
import axios from "axios";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  ArcElement,
  Title,
  Tooltip,
  Legend,
  RadialLinearScale,
  PointElement,
  LineElement,
  Filler
);

const ComparisonPage = () => {

  const [venues, setVenues] = useState([]); // die moet wees stadions
  const [selectedVenue1, setSelectedVenue1] = useState(''); // die moet 1 wys 
  const [selectedVenue2, setSelectedVenue2] = useState(''); // hoekm wys 2 nie 

  // useEffect(() => {
  //   setVenues(mockVenues); // Stel venues lys
  //   setSelectedVenue1(mockVenues[0]?.name || ''); // dropdown goed
  //   setSelectedVenue2(mockVenues[1]?.name || '');
  // }, []);

  // // opsomming van dataa
  // const mockVenues = [
  //   { name: 'Yankee Stadium', attendance: 46337, temp: 72, windSpeed: 8 },
  //   { name: 'Dodger Stadium', attendance: 52325, temp: 78, windSpeed: 5 },
  //   { name: 'Fenway Park', attendance: 37939, temp: 68, windSpeed: 12 },
  //   { name: 'Wrigley Field', attendance: 41349, temp: 70, windSpeed: 10 },
  //   { name: 'Oracle Park', attendance: 41503, temp: 65, windSpeed: 15 },
  //   { name: 'Citizens Bank Park', attendance: 42901, temp: 75, windSpeed: 7 },
  //   { name: 'Truist Park', attendance: 41084, temp: 73, windSpeed: 6 }
  // ];

useEffect(() => {
  const fetchTeams = async () => {
    try {
      const res = await axios.get(
        "https://statsapi.mlb.com/api/v1/teams?sportId=1"
      );

      const teams = res.data.teams.map(team => ({
        name: team.name,
        attendance: Math.floor(Math.random() * 50000), // MLB API doesn’t give this directly
        temp: Math.floor(Math.random() * 20) + 60,
        windSpeed: Math.floor(Math.random() * 15)
      }));

      setVenues(teams);
      setSelectedVenue1(teams[0]?.name || "");
      setSelectedVenue2(teams[1]?.name || "");

    } catch (error) {
      console.error("Error fetching teams:", error);
    }
  };

  fetchTeams();
}, []);

  // kry die data 
  const venue1 = venues.find(v => v.name === selectedVenue1) || {};
  const venue2 = venues.find(v => v.name === selectedVenue2) || {};

  // statistieke
  const chartData = {
    bar: {
      labels: ['Attendance (Fans)'], // fans
      datasets: [
        {
          label: venue1.name || 'Venue 1',
          data: [venue1.attendance || 0], // links
          backgroundColor: 'rgb(255, 99, 133)',
        },
        {
          label: venue2.name || 'Venue 2',
          data: [venue2.attendance || 0], // regs
          backgroundColor: 'rgb(54, 163, 235)',
        },
      ],
    },

    pie: {
      labels: [venue1.name || 'Venue 1', venue2.name || 'Venue 2'], //sircle pi
      datasets: [{
        label: 'Temperature (°F)',
        data: [venue1.temp || 70, venue2.temp || 70], // Temp
        backgroundColor: ['rgba(255, 99, 132, 0.8)', 'rgba(54, 162, 235, 0.8)']
      }]
    },

    radar: {
      labels: ['Attendance (1000s)', 'Wind Speed (mph)', 'Temperature (°F)'], // Radar
      datasets: [
        {
          label: venue1.name || 'Venue 1',
          data: [
            (venue1.attendance || 0) / 1000, // hoekom so groot 
            venue1.windSpeed || 0,
            venue1.temp || 70
          ],
          borderColor: 'rgb(255, 99, 133)',
          backgroundColor: 'rgb(255, 99, 133)',
          fill: true
        },
        {
          label: venue2.name || 'Venue 2',
          data: [
            (venue2.attendance || 0) / 1000, // jy oko groot
            venue2.windSpeed || 0,
            venue2.temp || 70
          ],
          borderColor: 'rgba(54, 162, 235, 1)',
          backgroundColor: 'rgba(54, 162, 235, 0.2)',
          fill: true
        }
      ],
    }
  };


  const options = {
    responsive: true,
    plugins: {
      legend: { position: 'top' },
      title: { display: true, text: 'MLB Stadium Venue Comparison' }
    }
  };

  return (
    <div className="comparison-container">
      
      <h1>MLB Stadium Comparison</h1>
      <p>Compare attendance, temperature, and wind speed between stadiums</p>

      <div className="song-selectors"> {/* Dropdown*/}
        
        <div>
          <label>Stadium 1:</label>
          <select value={selectedVenue1} onChange={(e) => setSelectedVenue1(e.target.value)}>
            <option value="">Select Stadium 1</option>
            {venues.map((venue, idx) => (
              <option key={idx} value={venue.name}>
                {venue.name} ({venue.attendance.toLocaleString()} fans)
              </option>                                                                                           //naam attendance
            ))}
          </select>
        </div>

        <div>
          <label>Stadium 2:</label>
          <select value={selectedVenue2} onChange={(e) => setSelectedVenue2(e.target.value)}>
            <option value="">Select Stadium 2</option>
            {venues.map((venue, idx) => (
              <option key={idx} value={venue.name}>
                {venue.name} ({venue.attendance.toLocaleString()} fans)
              </option>
            ))}
          </select>
        </div>

      </div>

      
      {selectedVenue1 && selectedVenue2 && (                                                          //alby moet kies
        <div className="charts-grid">
          
          <div className="chart-card">
            <h3>Attendance Comparison</h3>
            <Bar data={chartData.bar} options={options} />                                               {/*chart.js 1 */}
          </div>
          
          <div className="chart-card">
            <h3>Temperature (°F) - Single Pie Chart</h3>
            <Pie data={chartData.pie} />                                                           {/* chart.js3  */}
          </div>

          <div className="chart-card">
            <h3>Multi-Stats Radar</h3>
            <Radar data={chartData.radar} options={options} />                                            {/* chart.js 2 */}
          </div>

        </div>
      )}




      <div className="comparison-stats">                                                 {/* opsomming*/}
        <h3>Quick Stats</h3>
        
        <div className="stats-grid">
          
          <div className="stat">
            <strong>{venue1.name}</strong>
            <br/>{venue1.attendance?.toLocaleString() || 0} fans
            <br/>{venue1.temp || 70}°F
            <br/>{venue1.windSpeed || 0} mph
          </div>

          <div className="stat">
            <strong>{venue2.name}</strong>
            <br/>{venue2.attendance?.toLocaleString() || 0} fans
            <br/>{venue2.temp || 70}°F
            <br/>{venue2.windSpeed || 0} mph
          </div>

        </div>
      </div>



    </div>
  );
};

export default ComparisonPage;