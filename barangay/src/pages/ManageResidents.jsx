// ManageResidents.js
import React, { useState, useEffect } from 'react';
import Sidebar from "../component/Sidebar";
import { FaPlus, FaSearch } from 'react-icons/fa';
import axios from 'axios';
import AddResidentModal from '../component/Modal/AddResidents';
import EditResidentModal from '../component/Modal/EditResidents';

const ManageResidents = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [residents, setResidents] = useState([]);
    const [selectedResident, setSelectedResident] = useState(null);

    const formatDate = (dateString) => {
        const date = new Date(dateString)
        return date.toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        })
    }


    const fetchData = () => {
        axios.get('http://localhost/Commision/BarangayManagementAPI/fetchResidents.php')
            .then(response => {
                setResidents(response.data);
            })
            .catch(error => {
                console.error('Error fetching residents:', error);
            });
    };

    useEffect(() => {
        fetchData();
    }, []);

    const openModal = (resident = null) => {
        setSelectedResident(resident);
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
        setSelectedResident(null);
    };

    return (
        <div className="flex">
            <Sidebar />
            <div className="flex-1 p-6 bg-gray-100">
                <h1 className="text-3xl font-bold mb-6">Manage Residents</h1>
                <div className="bg-white shadow-lg rounded-lg overflow-hidden">
                    <div className="p-4 border-b border-gray-200 bg-gray-50">
                        <div className="flex justify-between items-center mb-4">
                            <button
                                onClick={() => openModal()}
                                className="bg-gradient-to-r from-green-500 to-green-700 text-white px-6 py-3 rounded-full flex items-center space-x-3 shadow-md hover:shadow-lg transition-shadow"
                            >
                                <FaPlus className="text-lg" />
                                <span className="text-lg font-semibold">Add Resident</span>
                            </button>
                            <div className="relative">
                                <input
                                    type="text"
                                    placeholder="Search..."
                                    className="border border-gray-300 px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 w-full md:w-64"
                                />
                                <span className="absolute inset-y-0 right-0 flex items-center pr-3">
                                    <FaSearch className="text-gray-400" />
                                </span>
                            </div>
                        </div>
                    </div>
                    <div className="overflow-x-auto">
                        <table className="min-w-full bg-white divide-y divide-gray-200">
                            <thead>
                                <tr className="bg-gray-50 text-gray-600">
                                    <th className="py-3 px-4 text-left text-sm font-semibold">Name</th>
                                    <th className="py-3 px-4 text-left text-sm font-semibold">Photo</th>
                                    <th className="py-3 px-4 text-left text-sm font-semibold">Gender</th>
                                    <th className="py-3 px-4 text-left text-sm font-semibold">Civil Status</th>
                                    <th className="py-3 px-4 text-left text-sm font-semibold">Purok</th>
                                    <th className="py-3 px-4 text-left text-sm font-semibold">Date Registered</th>
                                    <th className="py-3 px-4 text-left text-sm font-semibold">Actions</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-200">
                                {residents.map((resident) => (
                                    <tr key={resident.id} className="hover:bg-gray-50 transition-colors">
                                        <td className="py-3 px-4">{resident.first_name} {resident.last_name}</td>
                                        <td className="py-3 px-4">
                                            <img
                                                src={resident.image ? `http://localhost/Commision/BarangayManagementAPI/${resident.image}` : 'https://via.placeholder.com/150'}
                                                alt="Resident"
                                                className="w-16 h-16 rounded-full"
                                            />
                                        </td>
                                        <td className="py-3 px-4">{resident.gender}</td>
                                        <td className="py-3 px-4">{resident.civil_status}</td>
                                        <td className="py-3 px-4">{resident.purok}</td>
                                        <td className="py-3 px-4">{formatDate(resident.created_at)}</td>
                                        <td className="py-3 px-4 text-center">
                                        <button onClick={() => openModal(resident)} className="text-blue-500 hover:underline">Edit</button>
                                            <button className="text-red-500 hover:underline ml-4">Delete</button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
            {isModalOpen && <AddResidentModal
            isOpen={isModalOpen}
            onClose={closeModal}
            resident={selectedResident}
            onAddResident={fetchData}
            />}
            {selectedResident && (
                <EditResidentModal
                    isOpen={isModalOpen}
                    onClose={closeModal}
                    Resident={selectedResident}
                    onResidentUpdated={fetchData}
                />
            )}
        </div>
    );
};

export default ManageResidents;
