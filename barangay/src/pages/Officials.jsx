import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Sidebar from '../component/Sidebar';
import { Link } from 'react-router-dom';
import { FaEye } from 'react-icons/fa';

const Officials = () => {
  const [officials, setOfficials] = useState([]);

  useEffect(() => {
    axios.get('http://localhost/Commision/BarangayManagementAPI/fetchOfficials.php')
      .then(response => {
        setOfficials(response.data);
      })
      .catch(error => {
        console.error('Error fetching officials:', error);
      });
  }, []);

  return (
    <div className='flex'>
      <Sidebar />
      <div className='flex-1 p-6 bg-gray-200 min-h-screen'>
        <h1 className='text-4xl font-bold mb-8 text-gray-900 text-center'>List of Officials</h1>
        <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8'>
          {officials.map((official) => (
            <div key={official.official_id} className='bg-white shadow-lg rounded-lg overflow-hidden transition-transform transform hover:scale-105 hover:shadow-2xl mx-auto' style={{ maxWidth: '360px' }}>
              <div className='relative'>
                <img
                  src={official.coverPhoto || 'https://via.placeholder.com/360x120'}
                  alt='Cover'
                  className='w-full h-24 object-cover'
                />
                <div className='absolute inset-x-0 bottom-0 bg-gradient-to-t from-black to-transparent p-2'>
                  <img
                    src={`http://localhost/Commision/BarangayManagementAPI/${official.image}` || 'https://via.placeholder.com/100'}
                    alt='Profile'
                    className='w-32 h-32 border-4 border-white rounded-full mx-auto -mb-16 shadow-lg'
                  />
                </div>
              </div>
              <div className='p-4 pt-16 text-center'>
                <h2 className='text-xl font-bold text-gray-800'>{official.first_name} {official.last_name}</h2>
                <p className='text-gray-600 mb-4'>{official.position_type}</p>
                <div className='flex justify-between items-start gap-4 mb-4'>
                  <div className='flex flex-col items-center w-1/3'>
                    <span className='text-gray-600 text-sm'>Status</span>
                    <div className={`w-4 h-4 rounded-full ${official.status === 'Active' ? 'bg-green-500' : 'bg-red-500'}`}></div>
                  </div>
                  <div className='flex flex-col items-center w-1/3'>
                    <span className='text-gray-600 text-sm'>Age</span>
                    <p className='text-gray-700'>{official.age}</p>
                  </div>
                  <div className='flex flex-col items-center w-1/3'>
                    <span className='text-gray-600 text-sm'>View</span>
                    <Link
                      to={`/officials/${official.official_id}`}
                      className='inline-flex items-center text-blue-600 hover:text-blue-800 text-lg font-semibold'
                    >
                      <FaEye />
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Officials;
