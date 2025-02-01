import React, { useState } from "react";
import { toast } from 'react-toastify';
import axios from 'axios';
import { useContext } from 'react';
import { AppContext } from '../context/AppContext';
import { useNavigate } from 'react-router-dom';

const Return = () => {
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    fullName: '',
    transactionId: '',
    reason: ''
  });
  const { backendurl, token, user, setShowLogin } = useContext(AppContext);
  const [requestId, setRequestId] = useState('');
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
        `${backendurl}/api/user/return`,
        {
          fullName: formData.fullName,
          transactionId: formData.transactionId,
          reason: formData.reason
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
        toast.success('Return request submitted successfully!');
      } else {
        toast.error(data.message || 'Something went wrong');
      }
    } catch (error) {
      console.error('Return submission error:', error);
      toast.error('Failed to submit return request');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="p-8 rounded-lg shadow-lg w-full max-w-md">
        {!formSubmitted ? (
          <>
            <h1 className="text-2xl font-bold text-center text-blue-600 mb-6">
              Return Policy
            </h1>
            <p className="text-gray-700 mb-4">
              We value your satisfaction and strive to make the return process as
              smooth as possible. Please read our return policy carefully before
              submitting your return request.
            </p>
            <h2 className="text-xl font-semibold mb-4">Policy Overview:</h2>
            <ul className="list-disc list-inside text-gray-600 mb-6">
              <li>Returns are eligible within 30 days of the transaction date.</li>
              <li>Refunds will be processed for 98% of the transaction amount.</li>
              <li>The remaining 2% is retained as a processing fee.</li>
              <li>Items must be in their original condition for the return to be accepted.</li>
            </ul>
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
                <label className="block text-gray-700">Transaction ID</label>
                <input
                  type="text"
                  name="transactionId"
                  value={formData.transactionId}
                  onChange={handleChange}
                  className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md"
                  placeholder="Enter your transaction ID"
                  required
                />
                <p className="text-sm text-gray-500 mt-1">
                  You can find this in your payment confirmation email
                </p>
              </div>
              <div className="mb-4">
                <label className="block text-gray-700">Reason for Return</label>
                <textarea
                  name="reason"
                  value={formData.reason}
                  onChange={handleChange}
                  className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md"
                  rows="4"
                  placeholder="Please explain your reason for return"
                  required
                ></textarea>
              </div>
              <button
                type="submit"
                className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700"
              >
                Submit Return Request
              </button>
            </form>
          </>
        ) : (
          <div className="text-center">
            <h2 className="text-2xl font-bold text-green-600 mb-4">Request Received!</h2>
            <p className="mb-4">Your return request has been submitted successfully.</p>
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
};

export default Return;
