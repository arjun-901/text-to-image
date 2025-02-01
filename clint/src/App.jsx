import React, { useContext } from 'react';
import Home from './pages/Home';
import Result from './pages/Result';
import Credit from './pages/Credit'; // Changed from Creadit
import { Routes, Route } from 'react-router-dom';

import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Login from './components/Login';
import { AppContext } from './context/AppContext';
import Aboutus from './pages/Aboutus';
import Contact from './pages/Contact';
import Support from './pages/Support';
import Return from './pages/Return';
import UserDocs from './pages/UserDocs';
import Admin from './pages/Admin';


const App = () => {
  const { showLogin } = useContext(AppContext);
  
  return (
    <div className='px-4 sm:px-4 md:px-10 lg:px-28 min-h-screen '>
      <ToastContainer position='bottom-right' />
      <Navbar />

      {showLogin && <Login />}
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/result' element={<Result />} />
        <Route path='/credit' element={<Credit />} />
        <Route path='/aboutus' element={<Aboutus/>} />
        <Route path='/contact' element={<Contact/>} />
        <Route path='/support' element={<Support/>} />
        <Route path='/return' element={<Return/>} />
        <Route path='/user' element={<UserDocs/>} />
        <Route path='/admin' element={<Admin/>} />
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
