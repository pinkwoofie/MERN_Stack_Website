import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Register = () => {
    const [formData, setFormData] = useState({
        username: '',
        fullname: '',
        email: '',
        password: '',
        avatar: null
    });

    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');

    const navigate = useNavigate();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    const handleFileChange = (e) => {
        setFormData({
            ...formData,
            avatar: e.target.files[0]
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const formDataToSend = new FormData();
        for (const key in formData) {
            if (formData[key]) {
                formDataToSend.append(key, formData[key]);
            }
        }

        try {
            const response = await fetch('http://localhost:5430/api/v1/users/register', {
                method: 'POST',
                body: formDataToSend,
                // The browser will automatically set the Content-Type for multipart/form-data
            });
            const contentType = response.headers.get('content-type');
            if (contentType && contentType.includes('application/json')) {
                const responseData = await response.json();

            if (response.ok) {
                setSuccess(responseData.message);
                setError('');
                alert('user registered successfully')
                navigate('/login');
            } else {
                setError(responseData.message || 'An error occurred. Please try again.');
                setSuccess('');
                
            }
        }
            else {
                const textResponse = await response.text();
                console.error('Received non-JSON response:', textResponse);
                setError('User with username or email alredy exist ');
                alert('User with username or email alredy exist')
                setSuccess('');
            }
        
        } catch (error) {
            console.error('Error registering user:', error);
            setError('An error occurred. Please try again.');
            setSuccess('');
            alert(`An error occurred. Please try again. the error is ${error.message}`);
        }
    };

    const handleGoToLogin = () => {
        navigate('/login');  // Redirect to login page
    };

    return (
        <div className="container mx-auto p-4 max-w-md">

                <div className="mt-4 text-center mb-8">
                <p className="text-sm text-gray-600">Already have an account?</p>
                <button
                    onClick={handleGoToLogin}
                    className="mt-2 w-full py-2 px-4 bg-gray-200 text-gray-700 font-semibold rounded-md shadow-sm hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-500"
                >
                    Go to Login
                </button>
            </div>


            <h2 className="text-2xl font-bold mb-4">Register</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                    <label htmlFor="username" className="block text-sm font-medium text-gray-700">Username</label>
                    <input
                        type="text"
                        id="username"
                        name="username"
                        value={formData.username}
                        onChange={handleChange}
                        required
                        className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                    />
                </div>
                <div>
                    <label htmlFor="fullname" className="block text-sm font-medium text-gray-700">Full Name</label>
                    <input
                        type="text"
                        id="fullname"
                        name="fullname"
                        value={formData.fullname}
                        onChange={handleChange}
                        required
                        className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                    />
                </div>
                <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
                    <input
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                        className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                    />
                </div>
                <div>
                    <label htmlFor="password" className="block text-sm font-medium text-gray-700">Password</label>
                    <input
                        type="password"
                        id="password"
                        name="password"
                        value={formData.password}
                        onChange={handleChange}
                        required
                        className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                    />
                </div>
                <div>
                    <label htmlFor="avatar" className="block text-sm font-medium text-gray-700">Avatar</label>
                    <input
                        type="file"
                        id="avatar"
                        name="avatar"
                        onChange={handleFileChange}
                        required
                        className="mt-1 block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border file:border-gray-300 file:bg-gray-50 file:text-gray-700 hover:file:bg-gray-100"
                    />
                </div>
                <button
                    type="submit"
                    className="w-full py-2 px-4 bg-indigo-600 text-white font-semibold rounded-md shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                >
                    Register
                </button>
            </form>
            
        </div>
    );
};

export default Register;

