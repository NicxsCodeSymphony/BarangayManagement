import React, { useState } from 'react';
import axios from 'axios';
import { FaTimes } from 'react-icons/fa';

const defaultPhoto = 'https://via.placeholder.com/150?text=No+Photo'; // Default placeholder image URL

const AddOfficialModal = ({ isOpen, onClose }) => {
    const [formData, setFormData] = useState({
        position: 'Official',
        position_type: '',
        first_name: '',
        middle_name: '',
        last_name: '',
        suffix: '',
        gender: '',
        birth_date: '',
        birth_place: '',
        age: '',
        civil_status: '',
        nationality: '',
        religion: '',
        occupation: '',
        contact: '',
        pwd_status: '',
        pwd_id_no: '',
        education: '',
        purok: '',
        barangay: '',
        senior_citizen: '',
        image: '',
        relationship: ''
    });

    const [errors, setErrors] = useState({});

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
        if (errors[name]) {
            setErrors({ ...errors, [name]: '' });
        }
    };

    const handleFileChange = (e) => {
        setFormData({ ...formData, image: e.target.files[0] });
    };

    const validateForm = () => {
        let formErrors = {};
        // Check for empty fields and add errors
        const requiredFields = [
            'first_name', 'last_name', 'birth_date', 'birth_place', 'age',
            'civil_status', 'nationality', 'religion', 'occupation', 'contact',
            'pwd_status', 'education', 'purok', 'barangay', 'relationship'
        ];

        requiredFields.forEach(field => {
            if (!formData[field]) {
                formErrors[field] = 'This field is required';
            }
        });

        // Additional validation for specific fields if needed
        if (formData.age && isNaN(formData.age)) {
            formErrors.age = 'Age must be a number';
        }

        setErrors(formErrors);
        return Object.keys(formErrors).length === 0;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log('Form is being submitted');
        console.log('Current formData:', formData);

        if (validateForm()) {
            const residentData = new FormData();
            Object.keys(formData).forEach(key => {
                if (formData[key] instanceof File) {
                    residentData.append(key, formData[key]);
                } else {
                    residentData.append(key, formData[key]);
                }
            });

            // Log FormData contents
            for (let [key, value] of residentData.entries()) {
                console.log(`${key}: ${value}`);
            }

            // Uncomment the following block to enable form submission
            try {
                const response = await axios.post('http://localhost/Commision/BarangayManagementAPI/addResidents.php', residentData);
                console.log('Form Data submitted:', response.data);
                onClose();
                // Optionally, reset the form or provide feedback
            } catch (error) {
                console.error('Error submitting form:', error);
                // Handle error, show an error message to the user
            }
        }
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 flex items-center justify-center z-50 bg-gray-800 bg-opacity-50">
            <div className="bg-white rounded-lg shadow-lg w-full max-w-[80vw] h-full max-h-[90%] overflow-auto">
                <div className="flex justify-between items-center p-4 border-b border-gray-200">
                    <h2 className="text-xl font-semibold text-gray-800">Add Resident</h2>
                    <button onClick={onClose} className="text-gray-600 hover:text-gray-900">
                        <FaTimes className="text-2xl" />
                    </button>
                </div>
                <form onSubmit={handleSubmit} className="flex">
                    <div className="w-1/3 p-4 flex flex-col items-center border-r border-gray-200">
                        <div className="w-full mb-4">
                            <label className="block text-gray-700 text-sm font-medium mb-2 capitalize">Photo</label>
                            <img
                                src={formData.image ? URL.createObjectURL(formData.image) : defaultPhoto}
                                alt="Resident"
                                className="w-full h-72 object-cover rounded-md mb-2 border border-gray-300"
                            />
                            <input
                                type="file"
                                accept="image/*"
                                onChange={handleFileChange}
                                className="w-full text-sm text-gray-500"
                            />
                        </div>
                    </div>
                    <div className="w-2/3 p-4">
                        <div className="text-lg font-semibold text-gray-800 mb-4">Personal Information</div>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                            {Object.keys(formData).map((field) => (
                                field !== 'image' && field !== 'position_type' && field !== 'position' && (
                                    <div key={field}>
                                        <label className="block text-gray-700 text-sm font-medium mb-2 capitalize">
                                            {field.replace('_', ' ').replace(/\b\w/g, char => char.toUpperCase())}
                                        </label>
                                        {['suffix', 'gender', 'civil_status', 'pwd_status', 'senior_citizen', 'relationship'].includes(field) ? (
                                            <select
                                                name={field}
                                                value={formData[field]}
                                                onChange={handleChange}
                                                className="border border-gray-300 px-4 py-2 rounded-lg w-full"
                                            >
                                                <option value="">Select {field.replace('_', ' ')}</option>
                                                {field === 'suffix' && (
                                                    <>
                                                        <option value="None">None</option>
                                                        <option value="Jr.">Jr.</option>
                                                        <option value="III">III</option>
                                                    </>
                                                )}
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
                                                        <option value="In a Relationship">In a Relationship</option>
                                                        <option value="Divorced">Divorced</option>
                                                        <option value="Widowed">Widowed</option>
                                                    </>
                                                )}
                                                {field === 'pwd_status' && (
                                                    <>
                                                        <option value="Yes">Yes</option>
                                                        <option value="No">No</option>
                                                    </>
                                                )}
                                                {field === 'senior_citizen' && (
                                                    <>
                                                        <option value="Yes">Yes</option>
                                                        <option value="No">No</option>
                                                    </>
                                                )}
                                                {field === 'relationship' && (
                                                    <>
                                                        <option value="Mother">Mother</option>
                                                        <option value="Father">Father</option>
                                                        <option value="Child">Child</option>
                                                        <option value="Other">Other</option>
                                                    </>
                                                )}
                                            </select>
                                        ) : (
                                            <input
                                                type={field === 'birth_date' ? 'date' : (field === 'age' ? 'number' : 'text')}
                                                name={field}
                                                value={formData[field]}
                                                onChange={handleChange}
                                                placeholder={field.replace('_', ' ').replace(/\b\w/g, char => char.toUpperCase())}
                                                className="border border-gray-300 px-4 py-2 rounded-lg w-full"
                                            />
                                        )}
                                        {errors[field] && <p className="text-red-500 text-sm">{errors[field]}</p>}
                                    </div>
                                )
                            ))}
                            <div>
                                <label className="block text-gray-700 text-sm font-medium mb-2 capitalize">Position Type</label>
                                        <select
                                            name="position_type"
                                            value={formData.position_type}
                                            onChange={handleChange}
                                            className="border border-gray-300 px-4 py-2 rounded-lg w-full"
                                        >
                                            <option value="">Select Position Type</option>
                                            <option value="Captain">Captain</option>
                                            <option value="Secretary">Secretary</option>
                                            <option value="Treasurer">Treasurer</option>
                                        </select>
                            </div>
                        </div>
                        <div className="flex justify-end p-4 border-t border-gray-200">
                            <button
                                type="button"
                                onClick={onClose}
                                className="bg-gray-200 text-gray-700 px-4 py-2 rounded-lg mr-2"
                            >
                                Cancel
                            </button>
                            <button
                                type="submit"
                                className="bg-blue-500 text-white px-4 py-2 rounded-lg"
                            >
                                Save
                            </button>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default AddOfficialModal;
