import { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate
import axios from 'axios';
import './WelcomePage.css';



const WelcomePage = () => {
  const [idNumber, setIdNumber] = useState('');
  const [regulatorSetting, setRegulatorSetting] = useState('');
  const navigate = useNavigate(); // Initialize navigate
  //const [setpoint, setSetpoint] = useState(null);

  const handleChange = (event) => {
    setIdNumber(event.target.value);
  };

  const handleRegulatorChange = (event) => {
    setRegulatorSetting(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    // Validate inputs
    if (!idNumber || isNaN(idNumber) || !regulatorSetting || isNaN(regulatorSetting)) {
      alert('Please enter valid numbers for both ID and regulator settings.');
      return;
    }

    try {
      // Send setpoint to the backend
      const response = await axios.post('http://localhost:5000/api/setpoint', { value: regulatorSetting });
      console.log('Response:', response.data);

         // Update the setpoint state
   // setSetpoint(regulatorSetting);
      
      // Redirect to the ThingSpeakData page
      navigate('/data');
    } catch (error) {
      console.error('Error sending setpoint to backend:', error);
    }
  };

  return (
    <div className="welcome-container">
      <h1 className="welcome-title">Welcome to SmartPlug Group 50!</h1>
      <p className="welcome-message">Please enter your ID number and regulator setting to proceed:</p>
      <form className="welcome-form" onSubmit={handleSubmit}>
        <input
          type="number"
          placeholder="Enter your ID number"
          value={idNumber}
          onChange={handleChange}
          className="welcome-input"
          required
        />
        <input
          type="number"
          placeholder="Enter regulator setting"
          value={regulatorSetting}
          onChange={handleRegulatorChange}
          className="welcome-input"
          required
        />
        <button type="submit" className="welcome-button">Submit</button>
      </form>

    </div>
  );
};

export default WelcomePage;
