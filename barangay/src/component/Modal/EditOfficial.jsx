import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { FaTimes } from 'react-icons/fa';
import { toast } from 'sonner';

const defaultPhoto = 'https://via.placeholder.com/150?text=No+Photo';

const positionTypes = [
  'Captain', 'Secretary', 'Treasurer', 'Councilor', 'Other'
];

const EditOfficialModal = ({ isOpen, onClose, official, onEditOfficial }) => {
  const [editOfficial, setEditOfficial] = useState({});
  const [photoPreview, setPhotoPreview] = useState(defaultPhoto);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [photo, setPhoto] = useState(null);
  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (official) {
      const { residents_id, position, image, status, created_at, updated_at, ...otherFields } = official;
      setEditOfficial(otherFields);
      setPhotoPreview(image ? `http://localhost/Commision/BarangayManagementAPI/${image}` : defaultPhoto);
    }
  }, [official]);

  const handlePhotoChange = (e) => {
    const file = e.target.files[0];
    setPhoto(file);
    if (file) {
      setPhotoPreview(URL.createObjectURL(file));
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditOfficial((prevState) => ({
      ...prevState,
      [name]: value
    }));
    if (errors[name]) {
      setErrors({ ...errors, [name]: '' });
    }
  };

  const validateForm = () => {
    let formErrors = {};
    const requiredFields = [
      'first_name', 'middle_name', 'last_name', 'position_type',
      'suffix', 'relationship', 'gender', 'birth_date', 'birth_place',
      'age', 'civil_status', 'nationality', 'religion', 'occupation',
      'contact', 'pwd_status', 'education', 'purok',
      'barangay', 'senior_citizen'
    ];

    requiredFields.forEach(field => {
      if (!editOfficial[field]) {
        formErrors[field] = 'This field is required';
      }
    });

    if (editOfficial.age && isNaN(editOfficial.age)) {
      formErrors.age = 'Age must be a number';
    }

    setErrors(formErrors);
    return Object.keys(formErrors).length === 0;
  };

  const handleSubmit = async () => {
    if (validateForm()) {
      setLoading(true);
      const formData = new FormData();

      // Add all fields from editOfficial
      Object.keys(editOfficial).forEach(key => {
        formData.append(key, editOfficial[key]);
      });

      // Add the photo if available
      if (photo) {
        formData.append('photo', photo);
      }

      // Add additional fields from the official object
      if (official) {
        const { residents_id, position, status, created_at } = official;
        formData.append('residents_id', residents_id);
        formData.append('position', position);
        formData.append('status', status);
        formData.append('created_at', created_at);
      }

      // Log the FormData entries
      for (let [key, value] of formData.entries()) {
        console.log(`${key}: ${value}`);
      }

      try {
        const response = await axios.post('http://localhost/Commision/BarangayManagementAPI/updateResident.php', formData);
        if (response.data.status === 'success') {
          toast.success('Official updated successfully!');
          if(onEditOfficial){
            onEditOfficial()
          }
          onClose();
        } else {
          toast.success(`${response.data.message}`);
          if(onEditOfficial){
            onEditOfficial()
          }
          onClose();
        //   window.location.reload()
        }
      } catch (error) {
        toast.error('Error updating official');
        console.error(error);
      } finally {
        setLoading(false);
      }
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 bg-gray-800 bg-opacity-50">
      <div className="bg-white rounded-lg shadow-lg w-full max-w-[80vw] h-full max-h-[90%] overflow-auto">
        <div className="flex justify-between items-center p-4 border-b border-gray-200">
          <h2 className="text-xl font-semibold text-gray-800">Edit Official</h2>
          <button onClick={onClose} className="text-gray-600 hover:text-gray-900">
            <FaTimes className="text-2xl" />
          </button>
        </div>
        <form onSubmit={(e) => e.preventDefault()} className="flex">
          <div className="w-1/3 p-4 flex flex-col items-center border-r border-gray-200">
            <div className="w-full mb-4">
              <label className="block text-gray-700 text-sm font-medium mb-2 capitalize">Photo</label>
              <img
                src={photoPreview}
                alt="Photo Preview"
                className="w-full h-72 object-cover rounded-md mb-2 border border-gray-300"
              />
              <input
                type="file"
                accept="image/*"
                onChange={handlePhotoChange}
                className="w-full text-sm text-gray-500"
              />
            </div>
          </div>
          <div className="w-2/3 p-4">
            <div className="text-lg font-semibold text-gray-800 mb-4">Official Information</div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {Object.keys(editOfficial).map((field) => (
                field !== 'photo' && (
                  <div key={field}>
                    <label className="block text-gray-700 text-sm font-medium mb-2 capitalize">
                      {field.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase())}
                    </label>
                    {field === 'position_type' ? (
                      <select
                        name={field}
                        value={editOfficial[field] || ''}
                        onChange={handleChange}
                        className="border border-gray-300 px-4 py-2 rounded-lg w-full"
                      >
                        <option value="">Select Position Type</option>
                        {positionTypes.map(type => (
                          <option key={type} value={type}>{type}</option>
                        ))}
                      </select>
                    ) : ['gender', 'civil_status'].includes(field) ? (
                      <select
                        name={field}
                        value={editOfficial[field] || ''}
                        onChange={handleChange}
                        className="border border-gray-300 px-4 py-2 rounded-lg w-full"
                      >
                        <option value="">Select {field.replace(/([A-Z])/g, ' $1')}</option>
                        {field === 'gender' && (
                          <>
                            <option value="Male">Male</option>
                            <option value="Female">Female</option>
                            <option value="Other">Other</option>
                          </>
                        )}
                        {field === 'civil_status' && (
                          <>
                            <option value="Single">Single</option>
                            <option value="Married">Married</option>
                            <option value="Divorced">Divorced</option>
                            <option value="Widowed">Widowed</option>
                          </>
                        )}
                      </select>
                    ) : (
                      <input
                        type={field === 'birth_date' ? 'date' : (field === 'age' ? 'number' : 'text')}
                        name={field}
                        value={editOfficial[field] || ''}
                        onChange={handleChange}
                        placeholder={field.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase())}
                        className="border border-gray-300 px-4 py-2 rounded-lg w-full"
                      />
                    )}
                    {errors[field] && <p className="text-red-500 text-sm">{errors[field]}</p>}
                  </div>
                )
              ))}
            </div>
            <div className="flex justify-end p-4 border-t border-gray-200">
              <button
                type="button"
                onClick={handleSubmit}
                disabled={loading}
                className={`bg-blue-500 text-white px-4 py-2 rounded-lg mr-2 ${loading ? 'opacity-50 cursor-not-allowed' : ''}`}
              >
                {loading ? 'Saving...' : 'Save'}
              </button>
              <button
                type="button"
                onClick={onClose}
                className="bg-gray-200 text-gray-700 px-4 py-2 rounded-lg"
              >
                Cancel
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditOfficialModal;
