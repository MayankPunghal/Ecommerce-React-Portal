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
        if (response.ok) {
          const result = await response.json();
          setIsApiHealthy(result.status === 'ok');
        } else {
          console.log(response);
          setIsApiHealthy(false);
        }
      } catch (error) {
        console.log(error);
        setIsApiHealthy(false);
      }
    };

    checkHealth();
  }, []);

  return isApiHealthy === null ? (
    <div>Loading...</div>
  ) : isApiHealthy ? (
    <React.StrictMode>
      <App className="max-w-screen-md"/>
      <ToastContainer />
    </React.StrictMode>
  ) : (
    // Styled 503 error message
    <div style={{ textAlign: 'center', padding: '20px', backgroundColor: '#f8d7da', color: '#721c24', border: '1px solid #f5c6cb', borderRadius: '5px' }}>
      <h1 style={{ fontSize: '48px', marginBottom: '10px' }}>503 Service Unavailable</h1>
      <p style={{ fontSize: '18px' }}>Uh oh! Something went wrong. Our service is currently unavailable. Please try again later.</p>
      {/* You can add more styling or even an image here */}
    </div>
  );
};

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<HealthCheck />);
