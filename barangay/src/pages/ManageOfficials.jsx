import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { toast } from 'sonner'; // Ensure you have installed 'sonner' for toast notifications
import { FaPlus, FaEdit, FaTrash } from 'react-icons/fa';
import Sidebar from '../component/Sidebar';
import AddOfficialModal from '../component/Modal/AddOfficial';
import EditOfficialModal from '../component/Modal/EditOfficial';

const ManageOfficials = () => {
  const [officials, setOfficials] = useState([]);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [selectedOfficial, setSelectedOfficial] = useState(null);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);

  const fetchData = () => {
    axios.get('http://localhost/Commision/BarangayManagementAPI/fetchOfficials.php')
      .then(res => {
        setOfficials(res.data);
      })
      .catch(error => {
        console.error('Error fetching officials:', error);
        toast.error('Error fetching officials');
      });
  }

  useEffect(() => {
    fetchData()
  }, []);

  const handleAddOfficial = (newOfficial) => {
    const formData = new FormData();
    for (const key in newOfficial) {
      formData.append(key, newOfficial[key]);
    }

    axios.post('http://localhost/Commision/BarangayManagementAPI/addOfficials.php', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    })
      .then(res => {
        if (res.data.status === 'success') {
          toast.success('Official added successfully!');
          setOfficials([...officials, newOfficial]);
        } else {
          toast.error(`Error adding official: ${res.data.message}`);
        }
      })
      .catch(error => {
        toast.error('Error adding official');
        console.error('Error adding official:', error);
      });
  };

  const handleDeleteOfficial = (officialId) => {
    // Implement delete functionality
    axios.post('http://localhost/Commision/BarangayManagementAPI/deleteOfficial.php', { official_id: officialId })
      .then(res => {
        if (res.data.status === 'success') {
          toast.success('Official deleted successfully!');
          setOfficials(officials.filter(official => official.official_id !== officialId));
        } else {
          toast.error(`Error deleting official: ${res.data.message}`);
        }
      })
      .catch(error => {
        toast.error('Error deleting official');
        console.error('Error deleting official:', error);
      });
  };

  return (
    <div className="flex h-screen">
      <Sidebar />
      <div className="flex-1 p-6 bg-gray-100">
        <div className="mb-6 flex justify-between items-center">
          <h1 className="text-2xl font-bold text-gray-800">Manage Officials</h1>
          <button
            onClick={() => setIsAddModalOpen(true)}
            className="bg-gradient-to-r from-blue-500 to-blue-700 text-white px-6 py-3 rounded-full flex items-center space-x-3 shadow-md hover:shadow-lg transition-shadow"
          >
            <FaPlus className="text-lg" />
            <span className="text-lg font-semibold">Add Official</span>
          </button>
        </div>
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white shadow-lg rounded-lg overflow-hidden border border-gray-200">
            <thead className="bg-gray-200 text-gray-700">
              <tr>
                <th className="py-3 px-4 border-b border-gray-300 text-left">Photo</th>
                <th className="py-3 px-4 border-b border-gray-300 text-left">Name</th>
                <th className="py-3 px-4 border-b border-gray-300 text-left">Position</th>
                <th className="py-3 px-4 border-b border-gray-300 text-left">Actions</th>
              </tr>
            </thead>
            <tbody>
              {officials.map(official => (
                <tr key={official.official_id} className="hover:bg-gray-50 transition-colors">
                  <td className="py-3 px-4 border-b border-gray-300 flex items-center justify-center">
                    {official.image && (
                      <img
                        src={`http://localhost/Commision/BarangayManagementAPI/${official.image}`}
                        alt="Official"
                        className="w-16 h-16 object-cover rounded-full shadow-md"
                      />
                    )}
                  </td>
                  <td className="py-3 px-4 border-b border-gray-300 text-left">{official.first_name} {official.last_name}</td>
                  <td className="py-3 px-4 border-b border-gray-300 text-left">{official.position}</td>
                  <td className="py-3 px-4 border-b border-gray-300 flex space-x-3 justify-center">
                    <button
                      onClick={() => {
                        setSelectedOfficial(official);
                        setIsEditModalOpen(true);
                      }}
                      className="text-blue-600 hover:text-blue-800 transition-colors"
                    >
                      <FaEdit className="text-lg" />
                    </button>
                    <button
                      onClick={() => handleDeleteOfficial(official.official_id)}
                      className="text-red-600 hover:text-red-800 transition-colors"
                    >
                      <FaTrash className="text-lg" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <AddOfficialModal
          isOpen={isAddModalOpen}
          onClose={() => setIsAddModalOpen(false)}
          onAddOfficial={fetchData}
        />
        {selectedOfficial && (
          <EditOfficialModal
            isOpen={isEditModalOpen}
            onClose={() => setIsEditModalOpen(false)}
            official={selectedOfficial}
            onEditOfficial={fetchData}
          />
        )}
      </div>
    </div>
  );
};

export default ManageOfficials;
