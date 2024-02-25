import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { ToastContainer } from 'react-toastify';

const HealthCheck = () => {
  const [isApiHealthy, setIsApiHealthy] = useState(null);

  useEffect(() => {
    const checkHealth = async () => {
      try {
        const response = await fetch('/api/1/general/checkhealth');
        console.log("Check Health Resp : ", response)
        if (response.ok) {
          const result = await response.json();
          setIsApiHealthy(result.status === 'ok');
        } else {
          setIsApiHealthy(false);
        }
      } catch (error) {
        setIsApiHealthy(false);
      }
    };

    checkHealth();
  }, []);

  return isApiHealthy === null ? (
    // Loading or placeholder UI while checking health
    <div>Loading...</div>
  ) : isApiHealthy ? (
    // Render your main app if the API is healthy
    <React.StrictMode>
      <App />
      <ToastContainer />
    </React.StrictMode>
  ) : (
    // Display an error message if the API is not healthy
    <div><b> 503 </b>Uh oh! Something went wrong. Service Unavailable.</div>
  );
};

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<HealthCheck />);
