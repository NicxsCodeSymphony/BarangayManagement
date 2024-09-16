import React, { useState, useEffect } from 'react';
import Sidebar from '../component/Sidebar';
import axios from 'axios';
import { toast } from 'sonner';

const Information = () => {
  const [profile, setProfile] = useState({
    barangay_name: '',
    municipality: '',
    province: '',
    number: '',
    email: '',
    image: ''
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [photo, setPhoto] = useState(null);
  const [photoPreview, setPhotoPreview] = useState('');

  const fetchBarangayInformation = async () => {
    try {
      const response = await axios.get('http://localhost/Commision/BarangayManagementAPI/fetchBarangayInfo.php');
      setProfile(response.data[0]);
      console.log(response.data[0]);
      setPhotoPreview(`http://localhost/Commision/BarangayManagementAPI/${response.data[0].image}`);
      setLoading(false);
    } catch (error) {
      setError(error);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBarangayInformation();
  }, []);

  const handleChange = (e) => {
    const { id, value } = e.target;
    setProfile((prevProfile) => ({
      ...prevProfile,
      [id]: value
    }));
  };

  const handlePhotoChange = (e) => {
    const file = e.target.files[0];
    setPhoto(file);
    if (file) {
      setPhotoPreview(URL.createObjectURL(file));
    }
  };

  const handleSave = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('id', 2); // Assuming you have a fixed ID or dynamic ID mechanism
    formData.append('barangayName', profile.barangay_name);
    formData.append('municipality', profile.municipality);
    formData.append('province', profile.province);
    formData.append('phoneNumber', profile.number);
    formData.append('email', profile.email);
    if (photo) {
      formData.append('photo', photo);
    }

    try {
      const response = await axios.post('http://localhost/Commision/BarangayManagementAPI/barangayInfo.php', formData);
      if (response.data.status === 'success') {
        toast.success('Information updated!');
        fetchBarangayInformation(); // Refresh data
      } else {
        toast.error(`Error updating information: ${response.data.message}`);
      }
    } catch (error) {
      toast.error('Error updating information');
      console.error(error);
    }
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error.message}</div>;

  return (
    <div className="flex">
      {/* Sidebar */}
      <Sidebar />

      {/* Main content area */}
      <div className="flex-1 bg-gray-100 p-8">
        <h1 className="text-3xl font-bold mb-8">Barangay Information</h1>

        <div className="flex space-x-8">
          {/* Profile View */}
          <div className="w-1/3 bg-white p-6 rounded-lg shadow-xl border border-gray-300">
            <div className="flex flex-col items-center text-center mb-6">
              <img
                src={photoPreview || 'http://localhost/BarangayManagementAPI/default-profile.png'} // Fallback image
                alt="Profile"
                className="w-32 h-32 rounded-full border-4 border-blue-400 object-cover mb-4 shadow-md transition-transform transform hover:scale-105"
              />
              <h2 className="text-2xl font-semibold text-gray-800 mb-2">{profile.barangay_name}</h2>
              <p className="text-lg text-gray-600 mb-4">{profile.municipality}, {profile.province}</p>
            </div>

            <div className="space-y-4">
              <div className="flex justify-between text-gray-700">
                <span className="font-medium">Barangay Name:</span>
                <span className="font-light">{profile.barangay_name}</span>
              </div>
              <div className="flex justify-between text-gray-700">
                <span className="font-medium">Municipality:</span>
                <span className="font-light">{profile.municipality}</span>
              </div>
              <div className="flex justify-between text-gray-700">
                <span className="font-medium">Province:</span>
                <span className="font-light">{profile.province}</span>
              </div>
              <div className="flex justify-between text-gray-700">
                <span className="font-medium">Contact Number:</span>
                <span className="font-light">{profile.number}</span>
              </div>
              <div className="flex justify-between text-gray-700">
                <span className="font-medium">Email:</span>
                <span className="font-light">{profile.email}</span>
              </div>
            </div>
          </div>

          {/* Form */}
          <div className="flex-1 bg-white p-6 rounded-lg shadow-xl border border-gray-300">
            <form className="space-y-4" onSubmit={handleSave}>
              <div className="grid grid-cols-1 gap-4">
                <div>
                  <label htmlFor="barangay_name" className="block text-sm font-medium text-gray-700">Barangay Name</label>
                  <input
                    type="text"
                    id="barangay_name"
                    value={profile.barangay_name}
                    onChange={handleChange}
                    className="mt-1 block w-full p-3 bg-gray-200 border border-gray-300 rounded-md text-gray-800 focus:ring-blue-500 focus:border-blue-500"
                    placeholder="Enter Barangay Name"
                  />
                </div>
                <div>
                  <label htmlFor="municipality" className="block text-sm font-medium text-gray-700">Municipality</label>
                  <input
                    type="text"
                    id="municipality"
                    value={profile.municipality}
                    onChange={handleChange}
                    className="mt-1 block w-full p-3 bg-gray-200 border border-gray-300 rounded-md text-gray-800 focus:ring-blue-500 focus:border-blue-500"
                    placeholder="Enter Municipality"
                  />
                </div>
                <div>
                  <label htmlFor="province" className="block text-sm font-medium text-gray-700">Province</label>
                  <input
                    type="text"
                    id="province"
                    value={profile.province}
                    onChange={handleChange}
                    className="mt-1 block w-full p-3 bg-gray-200 border border-gray-300 rounded-md text-gray-800 focus:ring-blue-500 focus:border-blue-500"
                    placeholder="Enter Province"
                  />
                </div>
                <div>
                  <label htmlFor="number" className="block text-sm font-medium text-gray-700">Number</label>
                  <input
                    type="tel"
                    id="number"
                    value={profile.number}
                    onChange={handleChange}
                    className="mt-1 block w-full p-3 bg-gray-200 border border-gray-300 rounded-md text-gray-800 focus:ring-blue-500 focus:border-blue-500"
                    placeholder="Enter Contact Number"
                  />
                </div>
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
                  <input
                    type="email"
                    id="email"
                    value={profile.email}
                    onChange={handleChange}
                    className="mt-1 block w-full p-3 bg-gray-200 border border-gray-300 rounded-md text-gray-800 focus:ring-blue-500 focus:border-blue-500"
                    placeholder="Enter Email Address"
                  />
                </div>
                <div>
                  <label htmlFor="image" className="block text-sm font-medium text-gray-700">Image</label>
                  <input
                    type="file"
                    id="image"
                    onChange={handlePhotoChange}
                    className="mt-1 block w-full p-2 bg-gray-200 border border-gray-300 rounded-md text-gray-800"
                  />
                </div>
              </div>
              <button
                type="submit"
                className="w-full bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded-md transition duration-300 ease-in-out"
              >
                Save Changes
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Information;
