import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const SubmitAudiobook = () => {
    const [formData, setFormData] = useState({
        title: '',
        description: '',
        category: '',
        audiofile: null,
        coverimage: null
    });

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
            [e.target.name]: e.target.files[0]
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

        const token = localStorage.getItem('token')

        console.log(token);

        const logFormData = (formData) => {
            for (let pair of formData.entries()) {
                console.log(`${pair[0]}:`, pair[1]);
            }
        };

        logFormData(formDataToSend);


        try {
            const response = await fetch('http://localhost:5430/api/v1/users/audiobooks/submit', {
                method: 'POST',
                body: formDataToSend,
                headers: {
                    'Authorization': `Bearer ${token}`,// Include the token in the headers
                },
            });
            console.log(response);

            const contentType = response.headers.get('content-type');
            if (contentType && contentType.includes('application/json')) {
                const responseData = await response.json();
                if (response.ok) {
                    alert('Audiobook added successfully')
                    navigate('/home');
                } else {
                    
                    alert('An error Occured please provide all the details')
                }
            }
                else {
                    const textResponse = await response.text();
                    console.error('Received non-JSON response:', textResponse);
                    alert('Received a non json response ');
                }
            
        } catch (error) {
            console.error('Error submitting audiobook:', error);
            alert(`An error occurred: ${error.message}`);
        }
    };

    return (
        <div className="container mx-auto p-4 max-w-md">
            <h2 className="text-2xl font-bold mb-4">Submit Your Audiobook</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                    <label htmlFor="title" className="block text-sm font-medium text-gray-700">Title</label>
                    <input
                        type="text"
                        id="title"
                        name="title"
                        value={formData.title}
                        onChange={handleChange}
                        required
                        className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm"
                    />
                </div>
                <div>
                    <label htmlFor="description" className="block text-sm font-medium text-gray-700">Description</label>
                    <textarea
                        id="description"
                        name="description"
                        value={formData.description}
                        onChange={handleChange}
                        required
                        className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm"
                    />
                </div>
                <div>
                    <label htmlFor="category" className="block text-sm font-medium text-gray-700">Category</label>
                    <select
                        id="category"
                        name="category"
                        value={formData.category}
                        onChange={handleChange}
                        required
                        className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm"
                    >
                        <option value="" disabled>Select a category</option>
                        <option value="Fantasy">Fantasy</option>
                        <option value="Romantic">Romantic</option>
                        <option value="Self-Help">Self-Help</option>
                        <option value="Sci-Fi">Sci-Fi</option>
                        <option value="Horror">Horror</option>
                        <option value="History">History</option>
                        <option value="Biography">Biography</option>
                        <option value="Business">Business</option>
                        <option value="Spiritual">Spiritual</option>
                    </select>
                </div>
                <div>
                    <label htmlFor="audiofile" className="block text-sm font-medium text-gray-700">Audio File</label>
                    <input
                        type="file"
                        id="audiofile"
                        name="audiofile"
                        onChange={handleFileChange}
                        required
                        className="mt-1 block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-md"
                    />
                </div>
                <div>
                    <label htmlFor="coverimage" className="block text-sm font-medium text-gray-700">Cover Image</label>
                    <input
                        type="file"
                        id="coverimage"
                        name="coverimage"
                        onChange={handleFileChange}
                        required
                        className="mt-1 block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-md"
                    />
                </div>
                <button
                    type="submit"
                    className="w-full py-2 px-4 bg-indigo-600 text-white font-semibold rounded-md shadow-sm hover:bg-indigo-700"
                >
                    Submit Audiobook
                </button>
            </form>
        </div>
    );
};

export default SubmitAudiobook;
