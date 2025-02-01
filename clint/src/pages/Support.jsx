import React, { useState } from 'react';
import { toast } from 'react-toastify';
import axios from 'axios';
import { useContext } from 'react';
import { AppContext } from '../context/AppContext';
import { useNavigate } from 'react-router-dom';

const Support = () => {
    const [formSubmitted, setFormSubmitted] = useState(false);
    const [formData, setFormData] = useState({
        fullName: '',
        message: ''
    });
    const { backendurl, token, user, setShowLogin } = useContext(AppContext);
    const [requestId, setRequestId] = useState(null);
    const navigate = useNavigate();

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        if (!user || !token) {
            setShowLogin(true);
            return;
        }

        try {
            const { data } = await axios.post(
                `${backendurl}/api/user/support`,
                {
                    fullName: formData.fullName,
                    message: formData.message
                },
                {
                    headers: { 
                        token: token 
                    }
                }
            );

            if (data.success) {
                setFormSubmitted(true);
                setRequestId(data.requestId);
                toast.success('Support request submitted successfully!');
            } else {
                toast.error(data.message || 'Something went wrong');
            }
        } catch (error) {
            console.error('Support submission error:', error);
            toast.error('Failed to submit support request');
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center">
            <div className="p-8 rounded-lg shadow-lg w-full max-w-md">
                {!formSubmitted ? (
                    <>
                        <h1 className="text-2xl font-bold mb-6 text-center">
                            Support us today and be a part of something bigger.
                        </h1>
                        <p className="mb-2">
                            If you have any question in your mind, feel free to create a support ticket. We will get back to you within 24 hours.
                        </p>
                        <form onSubmit={handleSubmit}>
                            <div className="mb-4">
                                <label className="block text-gray-700">Full Name</label>
                                <input
                                    type="text"
                                    name="fullName"
                                    value={formData.fullName}
                                    onChange={handleChange}
                                    className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md"
                                    placeholder="Enter your full name"
                                    required
                                />
                            </div>
                            <div className="mb-4">
                                <label className="block text-gray-700">Message</label>
                                <textarea
                                    name="message"
                                    value={formData.message}
                                    onChange={handleChange}
                                    className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md"
                                    rows="4"
                                    placeholder="Enter your message"
                                    required
                                ></textarea>
                            </div>
                            <button
                                type="submit"
                                className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700"
                            >
                                Submit
                            </button>
                        </form>
                    </>
                ) : (
                    <div className="text-center">
                        <h2 className="text-2xl font-bold text-green-600 mb-4">Thank You!</h2>
                        <p className="mb-4">Your support request has been submitted successfully.</p>
                        <div className="bg-gray-50 p-4 rounded-lg">
                            <p className="text-sm text-gray-600">Your Request ID:</p>
                            <p className="text-lg font-semibold text-blue-600">{requestId}</p>
                            <p className="text-xs text-gray-500 mt-2">
                                Please save this ID for future reference
                            </p>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}

export default Support;
