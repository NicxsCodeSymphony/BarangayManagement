// EditResidentModal.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { FaTimes } from 'react-icons/fa';

const defaultPhoto = 'https://via.placeholder.com/150?text=No+Photo'; // Default placeholder image URL

const EditResidentModal = ({ isOpen, onClose, resident }) => {
    const [formData, setFormData] = useState({
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
        image: ''
    });

    const [errors, setErrors] = useState({});
    const [previewImage, setPreviewImage] = useState(defaultPhoto);

    useEffect(() => {
        if (resident) {
            setFormData({
                ...resident,
                image: '',
            });
            if (resident.image) {
                setPreviewImage('http://localhost/Commision/BarangayManagementAPI/' + resident.image);
            } else {
                setPreviewImage(defaultPhoto);
            }
        } else {
            setFormData({
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
                image: ''
            });
            setPreviewImage(defaultPhoto);
        }
    }, [resident, isOpen]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
        if (errors[name]) {
            setErrors({ ...errors, [name]: '' });
        }
    };

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        setFormData({ ...formData, image: file });
        if (file) {
            setPreviewImage(URL.createObjectURL(file));
        }
    };

    const validateForm = () => {
        let formErrors = {};
        // Check for empty fields and add errors
        const requiredFields = [
            'first_name', 'last_name', 'birth_date', 'birth_place', 'age',
            'civil_status', 'nationality', 'religion', 'occupation', 'contact',
            'pwd_status', 'education', 'purok', 'barangay'
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
        if (validateForm()) {
            const residentData = new FormData();
            Object.keys(formData).forEach(key => {
                residentData.append(key, formData[key]);
            });

            try {
                const url = resident
                    ? 'http://localhost/Commision/BarangayManagementAPI/updateResident.php'
                    : 'http://localhost/Commision/BarangayManagementAPI/addResidents.php';

                const response = await axios.post(url, residentData);

                console.log('Form Data submitted:', response.data);
                // window.location.reload();
                onClose();
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
                    <h2 className="text-xl font-semibold text-gray-800">{resident ? 'Edit Resident' : 'Add Resident'}</h2>
                    <button onClick={onClose} className="text-gray-600 hover:text-gray-900">
                        <FaTimes className="text-2xl" />
                    </button>
                </div>
                <form onSubmit={handleSubmit} className="flex">
                    <div className="w-1/3 p-4 flex flex-col items-center border-r border-gray-200">
                        <div className="w-full mb-4">
                            <label className="block text-gray-700 text-sm font-medium mb-2 capitalize">Photo</label>
                            <img
                                src={previewImage}
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
                                field !== 'image' && (
                                    <div key={field}>
                                        <label className="block text-gray-700 text-sm font-medium mb-2 capitalize">
                                            {field.replace('_', ' ').replace(/\b\w/g, char => char.toUpperCase())}
                                        </label>
                                        {['suffix', 'gender', 'civil_status', 'pwd_status', 'senior_citizen'].includes(field) ? (
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
                                                    </>
                                                )}
                                                {field === 'civil_status' && (
                                                    <>
                                                        <option value="Single">Single</option>
                                                        <option value="In a Relationship">In a Relationship</option>
                                                        <option value="Divorce">Divorce</option>
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
                        </div>
                        <div className="flex justify-end mt-6">
                            <button
                                type="submit"
                                className="bg-blue-500 text-white px-6 py-3 rounded-lg hover:bg-blue-600"
                            >
                                {resident ? 'Update Resident' : 'Add Resident'}
                            </button>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default EditResidentModal;
