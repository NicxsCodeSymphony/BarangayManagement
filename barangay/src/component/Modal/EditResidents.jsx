import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { FaTimes } from 'react-icons/fa';
import { toast } from 'sonner';

const defaultPhoto = 'https://via.placeholder.com/150?text=No+Photo';

const positionTypes = [
  'Captain', 'Secretary', 'Treasurer', 'Councilor', 'Other'
];

const EditResidentModal = ({ isOpen, onClose, Resident, onResidentUpdated  }) => {
  const [editResident, setEditResident] = useState({});
  const [photoPreview, setPhotoPreview] = useState(defaultPhoto);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [photo, setPhoto] = useState(null);
  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (Resident) {
        console.log(Resident)
      const {  image, residents_id, position, position_type, created_at, updated_at, status, ...otherFields } = Resident;
      setEditResident(otherFields);
      setPhotoPreview(image ? `http://localhost/Commision/BarangayManagementAPI/${image}` : defaultPhoto);
    }
  }, [Resident]);

  const handlePhotoChange = (e) => {
    const file = e.target.files[0];
    setPhoto(file);
    if (file) {
      setPhotoPreview(URL.createObjectURL(file));
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditResident((prevState) => ({
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
      'first_name', 'middle_name', 'last_name',
      'suffix', 'relationship', 'gender', 'birth_date', 'birth_place',
      'age', 'civil_status', 'nationality', 'religion', 'occupation',
      'contact', 'pwd_status', 'education', 'purok',
      'barangay', 'senior_citizen'
    ];

    requiredFields.forEach(field => {
      if (!editResident[field]) {
        formErrors[field] = 'This field is required';
      }
    });

    if (editResident.age && isNaN(editResident.age)) {
      formErrors.age = 'Age must be a number';
    }

    setErrors(formErrors);
    return Object.keys(formErrors).length === 0;
  };

  const handleSubmit = async () => {
    if (validateForm()) {
      setLoading(true);
      const formData = new FormData();

      // Add all fields from editResident
      Object.keys(editResident).forEach(key => {
        formData.append(key, editResident[key]);
      });

      // Add the photo if available
      if (photo) {
        formData.append('photo', photo);
      }

      if(Resident){
        const {residents_id, position, position_type, status} = Resident
        formData.append('residents_id', residents_id);
        formData.append('position', position);
        formData.append('position_type', position_type);
        formData.append('status', status);
      }

      // Log the FormData entries for debugging
      for (let [key, value] of formData.entries()) {
        console.log(`${key}: ${value}`);
      }

      try {
        const response = await axios.post('http://localhost/Commision/BarangayManagementAPI/updateResident.php', formData);
        if (response.data.status === 'success') {
          toast.success('Resident updated successfully!');
          if(onResidentUpdated){
            onResidentUpdated()
          }
          onClose();
        } else {
          toast.success(response.data.message);
          if(onResidentUpdated){
            onResidentUpdated()
          }
          onClose();
        }
      } catch (error) {
        toast.error('Error updating Resident');
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
          <h2 className="text-xl font-semibold text-gray-800">Edit Resident</h2>
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
            <div className="text-lg font-semibold text-gray-800 mb-4">Resident Information</div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {Object.keys(editResident).map((field) => (
                field !== 'photo' && (
                  <div key={field}>
                    <label className="block text-gray-700 text-sm font-medium mb-2 capitalize">
                      {field.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase())}
                    </label>
                    {field === 'position_type' ? (
                      <select
                        name={field}
                        value={editResident[field] || ''}
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
                        value={editResident[field] || ''}
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
                        value={editResident[field] || ''}
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
                className={`bg-blue-500 text-white px-4 py-2 rounded-lg mr-2 ${loading ? 'opacity-50' : ''}`}
              >
                {loading ? 'Updating...' : 'Update Resident'}
              </button>
              <button
                type="button"
                onClick={onClose}
                className="bg-gray-300 text-gray-800 px-4 py-2 rounded-lg"
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

export default EditResidentModal;
