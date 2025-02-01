import React, { useContext, useEffect, useState } from 'react'
import { assets } from '../assets/assets'
import { AppContext } from '../context/AppContext'
import axios from 'axios'
import { toast } from 'react-toastify'
import { useNavigate } from 'react-router-dom';

const Login = () => {

    const [state, setState] = useState('Login')
    const {setShowLogin, backendurl, setToken, setUser} = useContext(AppContext)
    const navigate = useNavigate();

    const [name,setNmae]=useState('')
    const[emai,setEmail]=useState('')
    const[password,setPassword]=useState('')

    const onSubmitHandler = async (e) => {
        e.preventDefault();

        try {
            if (state === 'Login') {
                if (!emai || !password) {
                    toast.error('Please fill all fields');
                    return;
                }

                const { data } = await axios.post(backendurl + '/api/user/login', { email: emai, password });

                if (data.success) {
                    setToken(data.token);
                    setUser({
                        name: data.user.name,
                        credits: data.user.credits,
                        role: data.user.role || 'user' // Add role to user data
                    });
                    localStorage.setItem('token', data.token);
                    setShowLogin(false);
                    toast.success('Login successful!');
                } else {
                    toast.error(data.message);
                }

            } else if (state === 'AdminLogin') {
                if (!emai || !password) {
                    toast.error('Please fill all fields');
                    return;
                }

                const { data } = await axios.post(backendurl + '/api/user/admin-login', { email: emai, password });

                if (data.success) {
                    setToken(data.token);
                    setUser({
                        name: data.user.name,
                        role: data.user.role
                    });
                    localStorage.setItem('token', data.token);
                    setShowLogin(false);
                    toast.success('Admin login successful!');
                    navigate('/admin'); // Redirect to admin page
                } else {
                    toast.error(data.message);
                }

            } else {
                if (!name || !emai || !password) {
                    toast.error('Please fill all fields');
                    return;
                }

                const { data } = await axios.post(backendurl + '/api/user/register', { name, email: emai, password });

                if (data.success) {
                    setToken(data.token);
                    setUser(data.user);
                    localStorage.setItem('token', data.token);
                    setShowLogin(false);
                    toast.success('Registration successful!');
                } else {
                    toast.error(data.message);
                }
            }

        } catch (error) {
            console.error('Auth error:', error);
            toast.error('Server error, please try again');
        }
    };

    useEffect(()=>{

        document.body.style.overflow='hidden'

        return()=>{
            document.body.style.overflow = 'unset'
        }
    },[])

    return (
        <div className='absolute top-0 left-0 right-0 bottom-0 z-10 backdrop-blur-sm bg-black/30 flex justify-center items-center'>
            <form onSubmit={onSubmitHandler} action="" className='bg-white relative p-6 rounded-xl shadow-lg'>
                <h1 className='text-2xl font-bold mb-4'>{state}</h1>
                <p className='mb-6 text-sm'>Welcome back! Please sign in to continue</p>
                <div className='flex flex-col space-y-4'>

                    { state !== 'Login' && state !== 'AdminLogin' && <div className='flex items-center gap-2 rounded-full border border-gray-800 px-6 py-0 '>
                        <img src={assets.profile_icon} alt="Logo" className='h-9 w-9 mr-4' />
                        <input onChange={e => setNmae(e.target.value)} value={name} type="text" placeholder='Enter Full Name' required className='outline-none text-sm' />
                    </div>
                    }

                    <div className='flex items-center gap-2 rounded-full border border-gray-800 px-6 py-0 '>
                        <img src={assets.email_icon} alt="Logo" className='h-9 w-9 mr-4' />
                        <input onChange={e => setEmail(e.target.value)} value={emai} type="text" placeholder='Enter email' required className='outline-none text-sm' />
                    </div>

                    <div className='flex items-center gap-2 rounded-full border border-gray-800 px-6 py-0 '>
                        <img src={assets.lock_icon} alt="Logo" className='h-9 w-9 mr-4' />
                        <input onChange={e => setPassword(e.target.value)} value={password} type="text" placeholder='Enter password' required className='outline-none text-sm' />
                    </div>

                    <button className='bg-blue-600 w-full text-white py-2 rounded-full'>{state === 'Login' ? 'Login' : state === 'AdminLogin' ? 'Admin Login' : 'Create account'}</button>

                    { state === 'Login' ? <p className='mt-text-center '>Don't have an account? <span className='text-green-800 cursor-pointer ' onClick={() => setState('Sing Up')}>Sign Up</span></p>
                    : state === 'AdminLogin' ? <p className='mt-text-center '>Not an admin? <span className='text-green-800 cursor-pointer ' onClick={() => setState('Login')}>Login</span></p>
                    : <p className='mt-text-center '>Already have an account? <span className='text-green-800 cursor-pointer' onClick={() => setState('Login')}>Login</span></p>}
                </div>

                <img onClick={() => setShowLogin(false)} src={assets.cross_icon} alt="" className='absolute top-5 right-5 cursor-pointer' />
            </form>
        </div>
    )
}

export default Login
