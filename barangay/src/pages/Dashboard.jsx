import React, { useEffect, useState } from 'react';
import Sidebar from '../component/Sidebar';
import { Pie } from 'react-chartjs-2';
import { Chart, ArcElement, Tooltip, Legend } from 'chart.js';
import { AiOutlineUser, AiOutlineTeam, AiOutlineBarChart, AiOutlineUsergroupAdd } from 'react-icons/ai';
import axios from 'axios';

Chart.register(ArcElement, Tooltip, Legend);

const Dashboard = () => {
  const [data, setData] = useState({ officials: 0, residents: 0 });
  const [loading, setLoading] = useState(true);
  const userName = "User"; // Replace with actual user name logic if available

  useEffect(() => {
    axios
      .get('http://localhost/Commision/BarangayManagementAPI/recordCounts.php')
      .then((response) => {
        setData(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching data", error);
        setLoading(false);
      });
  }, []);

  const totalPopulation = parseInt(data.officials) + parseInt(data.residents);

  const chartData = {
    labels: ['Officials', 'Residents'],
    datasets: [
      {
        label: 'Population',
        data: [data.officials, data.residents],
        backgroundColor: ['#FFD700', '#4682B4'], // Gold yellow and Steel blue
        hoverBackgroundColor: ['#FFC300', '#5B9BD5'],
        borderColor: '#fff',
        borderWidth: 2,
      },
    ],
  };

  return (
    <div className="flex min-h-screen bg-gray-100 text-gray-800">
      {/* Sidebar */}
      <Sidebar />

      {/* Main content area */}
      <div className="flex-1 p-6">
        {/* Header */}
        <div className="flex items-center mb-4">
          <AiOutlineBarChart className="text-4xl text-blue-500 mr-4 animate-pulse" />
          <h1 className="text-3xl font-bold tracking-wide">Dashboard</h1>
        </div>

        {/* User Greeting */}
        <p className="text-sm text-gray-600 mb-4">Hello, {userName}! Welcome to your dashboard.</p>

        {/* Stats Section */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          {/* Card 1: Officials */}
          <div className="bg-white p-6 rounded-lg shadow-lg flex flex-col items-center justify-center text-center transition duration-300 hover:shadow-xl">
            <AiOutlineUser className="text-5xl mb-2 text-blue-600" />
            <h2 className="text-lg font-semibold">Total Officials</h2>
            <p className="text-3xl font-bold mt-2">{loading ? '...' : data.officials}</p>
            <p className="text-sm text-gray-500 mt-1">Number of registered officials in the barangay.</p>
          </div>

          {/* Total Population Card */}
          <div className="bg-white p-6 rounded-lg shadow-lg flex flex-col items-center justify-center text-center transition duration-300 hover:shadow-xl">
            <AiOutlineUsergroupAdd className="text-5xl mb-2 text-purple-600" />
            <h2 className="text-lg font-semibold">Total Population</h2>
            <p className="text-3xl font-bold mt-2">{loading ? '...' : totalPopulation}</p>
            <p className="text-sm text-gray-500 mt-1">Combined total of officials and residents.</p>
          </div>

          {/* Card 2: Residents */}
          <div className="bg-white p-6 rounded-lg shadow-lg flex flex-col items-center justify-center text-center transition duration-300 hover:shadow-xl">
            <AiOutlineTeam className="text-5xl mb-2 text-green-600" />
            <h2 className="text-lg font-semibold">Total Residents</h2>
            <p className="text-3xl font-bold mt-2">{loading ? '...' : data.residents}</p>
            <p className="text-sm text-gray-500 mt-1">Total number of residents registered.</p>
          </div>
        </div>

        {/* Container for Chart and Tracking Details */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          {/* Chart Section */}
          <div className="bg-white p-6 rounded-lg shadow-lg flex flex-col items-center">
            <h2 className="text-lg font-semibold mb-2">Population Distribution</h2>
            <div className="flex flex-col items-center">
              <div style={{ width: '300px', height: '300px' }}>
                <Pie data={chartData} />
              </div>
              <div className="mt-4 w-full text-center">
                <p className="text-sm text-gray-600">
                  Breakdown of officials and residents in the barangay.
                </p>
              </div>
            </div>
          </div>

          {/* Tracking Section */}
          <div className="bg-white p-6 rounded-lg shadow-lg flex flex-col">
            <h2 className="text-lg font-semibold mb-2">Tracking Details</h2>
            <p className="text-sm text-gray-600 mb-4">
              Use this section to track the status of residents and officials effectively.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-gray-100 p-4 rounded-lg shadow-md flex flex-col items-center justify-center transition duration-300 hover:shadow-lg">
                <AiOutlineUser className="text-4xl mb-2 text-blue-600" />
                <p className="text-base font-semibold">Active Officials</p>
                <p className="text-3xl font-bold mt-2">{loading ? '...' : data.officials}</p>
              </div>
              <div className="bg-gray-100 p-4 rounded-lg shadow-md flex flex-col items-center justify-center transition duration-300 hover:shadow-lg">
                <AiOutlineTeam className="text-4xl mb-2 text-green-600" />
                <p className="text-base font-semibold">Active Residents</p>
                <p className="text-3xl font-bold mt-2">{loading ? '...' : data.residents}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
