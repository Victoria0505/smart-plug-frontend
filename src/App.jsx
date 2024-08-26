// src/App.js
import { BrowserRouter as Router, Route, Routes, /*Link*/ } from 'react-router-dom';
import WelcomePage from './components/WelcomePage.jsx';
import ThingSpeakData from './components/TemperatureDisplay.jsx';


function App() {
  return (
    <Router>
      <div className="App">
        <header className="App-header">
          {/*<nav>
            <ul>
              <li><Link to="/">Home</Link></li>
              <li><Link to="/data">Sensor Data</Link></li>
            </ul>
          </nav>*/}
          <Routes>
            <Route path="/" element={<WelcomePage />} />
            <Route path="/data" element={<ThingSpeakData />} />
          </Routes>
        </header>
      </div>
    </Router>
  );
}

export default App;
