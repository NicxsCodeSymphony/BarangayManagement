import React from 'react';
import Sidebar from '../component/Sidebar';

const Dashboard = () => {
  return (
    <div className="flex">
      {/* Sidebar */}
      <Sidebar />

      {/* Main content area */}
      <div className="flex-1 p-8">
        <h1 className="text-3xl font-bold mb-6">Dashboard</h1>
        <p>Welcome to the dashboard! This is the main content area.</p>
      </div>
    </div>
  );
};

export default Dashboard;
