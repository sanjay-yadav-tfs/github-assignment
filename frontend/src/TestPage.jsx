import React from 'react';

const TestPage = () => {
  return (
    <div style={{ padding: '20px', textAlign: 'center' }}>
      <h1 style={{ color: 'blue' }}>Frontend is Working!</h1>
      <p>If you can see this, the React frontend is running correctly.</p>
      <div style={{ marginTop: '20px' }}>
        <h2>Server Status:</h2>
        <p>Frontend: Running on http://localhost:5173</p>
        <p>Backend: Should be running on http://localhost:3000</p>
      </div>
    </div>
  );
};

export default TestPage;