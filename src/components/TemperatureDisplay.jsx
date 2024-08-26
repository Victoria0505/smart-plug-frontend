import { useEffect, useState } from 'react';
import axios from 'axios';
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from 'chart.js';
import './ThingSpeakData.css';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

const ThingSpeakData = () => {
  const [currentData, setCurrentData] = useState([]);
  const [powerData, setPowerData] = useState([]);
  const [energyConsumption, setEnergyConsumption] = useState(null);
  const [setpoint, setSetpoint] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async (fieldNumber, setter) => {
      try {
        const response = await axios.get(`https://api.thingspeak.com/channels/2605120/fields/${fieldNumber}.json`, {
          params: {
            api_key: 'X4AIUDILO2Y9A97P',
            results: 10
          }
        });
        console.log(`Field ${fieldNumber} data:`, response.data.feeds);
        setter(response.data.feeds);
      } catch (error) {
        console.error('Error fetching data from ThingSpeak', error);
        setError('Error fetching data from ThingSpeak');
      }
    };

    const fetchSetpoint = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/getpoint');
        setSetpoint(response.data.setpoint);
      } catch (error) {
        console.error('Error fetching setpoint:', error);
        setError('Error fetching setpoint');
      }
    };

    // Fetch data for graphs
    fetchData(3, setCurrentData);
    fetchData(5, setPowerData);

    // Fetch data for energy consumption
    fetchData(2, (data) => {
      const latestEntry = data[data.length - 1]; // Get the most recent entry
      setEnergyConsumption(latestEntry.field2); // Set energy consumption
    });

    // Fetch setpoint
    fetchSetpoint();
  }, []);

  // Add the createChartData function back
  const createChartData = (data, label) => {
    const timestamps = data.map(entry => entry.created_at);
    const values = data.map(entry => parseFloat(entry[`field${label}`]));
    return {
      labels: timestamps,
      datasets: [
        {
          label: label === 3 ? 'Current' : 'Power',
          data: values,
          borderColor: 'rgba(75,192,192,1)',
          backgroundColor: 'rgba(75,192,192,0.2)',
          fill: true,
        },
      ],
    };
  };

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div className="chart-container">
      <h1 className="chart-title">Sensor Readings</h1>
      
      <div className="chart">
        <h2>Current</h2>
        <Line className='current' data={createChartData(currentData, 3)} />
      </div>

      <div className="chart">
        <h2>Power</h2>
        <Line data={createChartData(powerData, 5)} />
      </div>

      <div className="status-container">

        <p className="read">Energy Consumption: {energyConsumption !== null ? `${energyConsumption} kWh` : 'Loading...'}</p>
        <p className="read">Regulator Setpoint: {setpoint !== null ? `${setpoint}` : 'Not set'}</p>
      </div>
    </div>  
  );
};

export default ThingSpeakData;