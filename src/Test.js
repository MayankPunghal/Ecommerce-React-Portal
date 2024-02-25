// import React from 'react';
// import { showToast, ToastUtils } from './UtilComponent/ToastUtil';

// const TestToasts = () => {
//   return (
//     <div>
//       <ToastUtils />
//       <button onClick={() => showToast('Test Success Toast')}>Show Toast</button>
//     </div>
//   );
// };

// export default TestToasts;
import React, { useState, useEffect } from 'react';

const YourComponent = () => {
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('/api/1/general/checkhealth');
        if (!response.ok) {
          if (response.status === 503) {
            setError('Service Unavailable');
          } else {
            setError('Unexpected error occurred');
          }
        }
        // Process your successful response here
      } catch (error) {
        setError('Network error');
      }
    };

    fetchData();
  }, []);

  return (
    <div>
      {error ? (
        <div>
          <h1>Error</h1>
          <p>{error}</p>
        </div>
      ) : (
        // Your regular component content here
        <p>Your component content</p>
      )}
    </div>
  );
};

export default YourComponent;
