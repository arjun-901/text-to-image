import React, { useState, useEffect, useContext } from 'react';
import { AppContext } from '../context/AppContext';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

const UserDocs = () => {
    const { user, token, backendurl } = useContext(AppContext);
    const navigate = useNavigate();
    const [userInfo, setUserInfo] = useState(null);
    const [transactions, setTransactions] = useState([]);
    const [supportRequests, setSupportRequests] = useState([]);
    const [returnRequests, setReturnRequests] = useState([]);
    const [activeTab, setActiveTab] = useState('profile');

    useEffect(() => {
        if (!user) {
            navigate('/');
            return;
        }
        fetchUserData();
    }, [user]);

    const fetchUserData = async () => {
        try {
            const { data } = await axios.get(
                `${backendurl}/api/user/user-data`,
                { headers: { token } }
            );

            if (data.success) {
                setUserInfo(data.userInfo);
                setTransactions(data.transactions);
                setSupportRequests(data.supportRequests);
                setReturnRequests(data.returnRequests);
            } else {
                toast.error('Failed to fetch user data');
            }
        } catch (error) {
            console.error('Error fetching user data:', error);
            toast.error('Error loading user data');
        }
    };

    return (
        <div className="min-h-screen p-4 md:p-8">
            <div className="max-w-6xl mx-auto">
                <h1 className="text-3xl font-bold text-gray-800 mb-6">User Dashboard</h1>
                
                {/* Tab Navigation */}
                <div className="flex gap-4 mb-6 border-b">
                    <button 
                        onClick={() => setActiveTab('profile')}
                        className={`pb-2 px-4 ${activeTab === 'profile' ? 'border-b-2 border-blue-600 text-blue-600' : 'text-gray-600'}`}
                    >
                        Profile
                    </button>
                    <button 
                        onClick={() => setActiveTab('transactions')}
                        className={`pb-2 px-4 ${activeTab === 'transactions' ? 'border-b-2 border-blue-600 text-blue-600' : 'text-gray-600'}`}
                    >
                        Transactions
                    </button>
                    <button 
                        onClick={() => setActiveTab('requests')}
                        className={`pb-2 px-4 ${activeTab === 'requests' ? 'border-b-2 border-blue-600 text-blue-600' : 'text-gray-600'}`}
                    >
                        Requests
                    </button>
                </div>

                {/* Profile Section */}
                {activeTab === 'profile' && userInfo && (
                    <div className="bg-white p-6 rounded-lg shadow-md">
                        <h2 className="text-2xl font-semibold mb-4">Profile Information</h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                                <p className="text-gray-600">Name</p>
                                <p className="font-medium">{userInfo.name}</p>
                            </div>
                            <div>
                                <p className="text-gray-600">Email</p>
                                <p className="font-medium">{userInfo.email}</p>
                            </div>
                            <div>
                                <p className="text-gray-600">Current Credits</p>
                                <p className="font-medium text-blue-600">{userInfo.credits}</p>
                            </div>
                            <div>
                                <p className="text-gray-600">Member Since</p>
                                <p className="font-medium">{new Date(userInfo.createdAt).toLocaleDateString()}</p>
                            </div>
                        </div>
                    </div>
                )}

                {/* Transactions Section */}
                {activeTab === 'transactions' && (
                    <div className="bg-white p-6 rounded-lg shadow-md">
                        <h2 className="text-2xl font-semibold mb-4">Credit Purchase History</h2>
                        {transactions.length > 0 ? (
                            <div className="overflow-x-auto">
                                <table className="w-full">
                                    <thead>
                                        <tr className="border-b">
                                            <th className="text-left p-2">Date</th>
                                            <th className="text-left p-2">Plan</th>
                                            <th className="text-left p-2">Credits</th>
                                            <th className="text-left p-2">Amount</th>
                                            <th className="text-left p-2">Status</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {transactions.map((transaction) => (
                                            <tr key={transaction._id} className="border-b">
                                                <td className="p-2">{new Date(transaction.date).toLocaleDateString()}</td>
                                                <td className="p-2">{transaction.plan}</td>
                                                <td className="p-2">{transaction.credits}</td>
                                                <td className="p-2">₹{transaction.amount}</td>
                                                <td className="p-2">
                                                    <span className={`px-2 py-1 rounded-full text-sm ${
                                                        transaction.payment ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'
                                                    }`}>
                                                        {transaction.payment ? 'Completed' : 'Pending'}
                                                    </span>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        ) : (
                            <p className="text-gray-600">No transactions found</p>
                        )}
                    </div>
                )}

                {/* Requests Section */}
                {activeTab === 'requests' && (
                    <div className="space-y-6">
                        {/* Support Requests */}
                        <div className="bg-white p-6 rounded-lg shadow-md">
                            <h2 className="text-2xl font-semibold mb-4">Support Requests</h2>
                            {supportRequests.length > 0 ? (
                                <div className="overflow-x-auto">
                                    <table className="w-full">
                                        <thead>
                                            <tr className="border-b">
                                                <th className="text-left p-2">Request ID</th>
                                                <th className="text-left p-2">Date</th>
                                                <th className="text-left p-2">Message</th>
                                                <th className="text-left p-2">Status</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {supportRequests.map((request) => (
                                                <tr key={request._id} className="border-b">
                                                    <td className="p-2">{request.requestId}</td>
                                                    <td className="p-2">{new Date(request.createdAt).toLocaleDateString()}</td>
                                                    <td className="p-2">{request.message.substring(0, 50)}...</td>
                                                    <td className="p-2">
                                                        <span className={`px-2 py-1 rounded-full text-sm ${
                                                            request.status === 'Resolved' ? 'bg-green-100 text-green-800' :
                                                            request.status === 'In Progress' ? 'bg-blue-100 text-blue-800' :
                                                            'bg-yellow-100 text-yellow-800'
                                                        }`}>
                                                            {request.status}
                                                        </span>
                                                    </td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                            ) : (
                                <p className="text-gray-600">No support requests found</p>
                            )}
                        </div>

                        {/* Return Requests */}
                        <div className="bg-white p-6 rounded-lg shadow-md">
                            <h2 className="text-2xl font-semibold mb-4">Return Requests</h2>
                            {returnRequests.length > 0 ? (
                                <div className="overflow-x-auto">
                                    <table className="w-full">
                                        <thead>
                                            <tr className="border-b">
                                                <th className="text-left p-2">Request ID</th>
                                                <th className="text-left p-2">Date</th>
                                                <th className="text-left p-2">Transaction ID</th>
                                                <th className="text-left p-2">Status</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {returnRequests.map((request) => (
                                                <tr key={request._id} className="border-b">
                                                    <td className="p-2">{request.requestId}</td>
                                                    <td className="p-2">{new Date(request.createdAt).toLocaleDateString()}</td>
                                                    <td className="p-2">{request.transactionId}</td>
                                                    <td className="p-2">
                                                        <span className={`px-2 py-1 rounded-full text-sm ${
                                                            request.status === 'Completed' ? 'bg-green-100 text-green-800' :
                                                            request.status === 'Processing' ? 'bg-blue-100 text-blue-800' :
                                                            'bg-yellow-100 text-yellow-800'
                                                        }`}>
                                                            {request.status}
                                                        </span>
                                                    </td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                            ) : (
                                <p className="text-gray-600">No return requests found</p>
                            )}
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default UserDocs;