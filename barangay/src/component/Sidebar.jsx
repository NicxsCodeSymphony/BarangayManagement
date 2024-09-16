import React, { useState } from 'react';
import { FaHome, FaUserTie, FaUsers, FaChevronDown, FaChevronUp } from 'react-icons/fa';
import { MdDashboard } from 'react-icons/md';

const Sidebar = () => {
  const [isOfficialsOpen, setOfficialsOpen] = useState(false);
  const [isResidentsOpen, setResidentsOpen] = useState(false);

  const toggleOfficials = () => setOfficialsOpen(!isOfficialsOpen);
  const toggleResidents = () => setResidentsOpen(!isResidentsOpen);

  return (
    <div className="w-72 h-screen bg-gray-900 text-white shadow-lg">
      <div className="p-6">
        <div className="flex items-center mb-8">
          <MdDashboard className="text-4xl text-blue-500 mr-4" />
          <h1 className="text-2xl font-bold">Barangay Dashboard</h1>
        </div>
        <ul className="space-y-3">
          <li>
            <a href="/information" className="flex items-center px-4 py-3 rounded-lg hover:bg-gray-800 transition duration-300 ease-in-out">
              <FaHome className="text-2xl text-blue-300" />
              <span className="ml-4 text-lg font-medium">Barangay Information</span>
            </a>
          </li>
          <li>
            <button onClick={toggleOfficials} className="flex items-center px-4 py-3 rounded-lg hover:bg-gray-800 transition duration-300 ease-in-out w-full text-left">
              <FaUserTie className="text-2xl text-blue-300" />
              <span className="ml-4 text-lg font-medium flex-1">Officials</span>
              {isOfficialsOpen ? <FaChevronUp className="text-xl text-gray-400" /> : <FaChevronDown className="text-xl text-gray-400" />}
            </button>
            <div
              className={`overflow-hidden transition-max-height duration-500 ease-in-out ${isOfficialsOpen ? 'max-h-40' : 'max-h-0'}`}
              style={{ maxHeight: isOfficialsOpen ? '200px' : '0' }} // Adjust based on content height
            >
              <ul className="pl-10 space-y-2 mt-2">
                <li>
                  <a href="/officials" className="flex items-center px-4 py-2 rounded-lg hover:bg-gray-700 transition duration-300 ease-in-out">
                    <span className="ml-4 text-md">List of Officials</span>
                  </a>
                </li>
                <li>
                  <a href="/manage-officials" className="flex items-center px-4 py-2 rounded-lg hover:bg-gray-700 transition duration-300 ease-in-out">
                    <span className="ml-4 text-md">Manage Officials</span>
                  </a>
                </li>
              </ul>
            </div>
          </li>
          <li>
            <button onClick={toggleResidents} className="flex items-center px-4 py-3 rounded-lg hover:bg-gray-800 transition duration-300 ease-in-out w-full text-left">
              <FaUsers className="text-2xl text-blue-300" />
              <span className="ml-4 text-lg font-medium flex-1">Residents</span>
              {isResidentsOpen ? <FaChevronUp className="text-xl text-gray-400" /> : <FaChevronDown className="text-xl text-gray-400" />}
            </button>
            <div
              className={`overflow-hidden transition-max-height duration-500 ease-in-out ${isResidentsOpen ? 'max-h-40' : 'max-h-0'}`}
              style={{ maxHeight: isResidentsOpen ? '200px' : '0' }} // Adjust based on content height
            >
              <ul className="pl-10 space-y-2 mt-2">
                <li>
                  <a href="/residents" className="flex items-center px-4 py-2 rounded-lg hover:bg-gray-700 transition duration-300 ease-in-out">
                    <span className="ml-4 text-md">List of Residents</span>
                  </a>
                </li>
                <li>
                  <a href="manage-residents" className="flex items-center px-4 py-2 rounded-lg hover:bg-gray-700 transition duration-300 ease-in-out">
                    <span className="ml-4 text-md">Manage Residents</span>
                  </a>
                </li>
              </ul>
            </div>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Sidebar;
