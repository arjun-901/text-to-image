import React, { useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

const AdminLogin = ({ onLogin }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post('/api/user/admin-login', { email, password });
      if (data.success) {
        onLogin(data.user);
        toast.success('Admin login successful!');
        navigate('/admin'); // Redirect to admin page
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.error('Admin login error:', error);
      toast.error('Server error, please try again');
    }
  };

  return (
    <div className='p-6'>
      <h2 className='text-xl font-bold mb-4'>Admin Login</h2>
      <form onSubmit={handleSubmit} className='space-y-3'>
        <input type='email' placeholder='Email' value={email} onChange={(e) => setEmail(e.target.value)} className='border p-2 w-full' required />
        <input type='password' placeholder='Password' value={password} onChange={(e) => setPassword(e.target.value)} className='border p-2 w-full' required />
        <button type='submit' className='bg-blue-500 text-white p-2 w-full'>Login</button>
      </form>
    </div>
  );
};

const AdminPanel = ({ admin, users, onRemoveUser, onChangeUser, onViewUser }) => {
  return (
    <div className='p-6'>
      <h2 className='text-xl font-bold'>Welcome, {admin.name}</h2>
      <p className='text-gray-600'>Admin ID: {admin.id}</p>
      
      <h3 className='text-lg font-bold mt-4'>User Management</h3>
      <ul className='mt-2'>
        {users.map((user) => (
          <li key={user.id} className='border p-2 flex justify-between'>
            <span>{user.name} ({user.email})</span>
            <div>
              <button onClick={() => onViewUser(user)} className='text-blue-500 mx-1'>View</button>
              <button onClick={() => onChangeUser(user)} className='text-green-500 mx-1'>Edit</button>
              <button onClick={() => onRemoveUser(user.id)} className='text-red-500 mx-1'>Remove</button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

const Admin = () => {
  const [admin, setAdmin] = useState(null);
  const [users, setUsers] = useState([
    { id: 1, name: 'John Doe', email: 'john@example.com' },
    { id: 2, name: 'Jane Smith', email: 'jane@example.com' }
  ]);

  const handleLogin = (adminData) => {
    setAdmin(adminData);
  };

  const handleRemoveUser = (userId) => {
    setUsers(users.filter(user => user.id !== userId));
  };

  const handleChangeUser = (user) => {
    alert(`Change user details for ${user.name}`);
  };

  const handleViewUser = (user) => {
    alert(`Viewing details of ${user.name}\nEmail: ${user.email}`);
  };

  return (
    <div>
      {admin ? (
        <AdminPanel admin={admin} users={users} onRemoveUser={handleRemoveUser} onChangeUser={handleChangeUser} onViewUser={handleViewUser} />
      ) : (
        <AdminLogin onLogin={handleLogin} />
      )}
    </div>
  );
};

export default Admin;
