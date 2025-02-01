import { useContext, useState } from 'react';
import { assets } from '../assets/assets';
import { Link, useNavigate } from 'react-router-dom';
import { AppContext } from '../context/AppContext';

const Navbar = () => {
  const { user, setShowLogin, logout, credit } = useContext(AppContext);
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <div className='sticky top-0 z-50 bg-white border-b'>
      <div className='flex items-center justify-between h-16 px-4 md:px-8'>
        {/* Logo */}
        <Link to='/' className='flex items-center gap-2'>
          <img src={assets.Logoes} alt="Logo" className='h-9'/>
          <span className='font-bold text-xm  sm:block md:text-xl'>
            <span className='text-blue-600'>Luxox</span>
            <span className='text-orange-500'>img</span>
          </span>
        </Link>

        {/* Desktop Navigation - Hidden on Mobile */}
        <div className='hidden md:flex items-center space-x-6 text-sm'>
          <Link to='/'><span className='hover:text-blue-600'>Home</span></Link>
          <Link to='/aboutus'><span className='hover:text-blue-600'>About</span></Link>
          <Link to='/contact'><span className='hover:text-blue-600'>Contact</span></Link>
          {user && (
            <Link to='/support'><span className='hover:text-blue-600'>Support</span></Link>
          )}
        </div>

        {/* Right Section */}
        <div className='flex items-center gap-3'>
          {user ? (
            <div className='flex items-center gap-3'>
              {/* Credits - Larger on Desktop */}
              <button 
                onClick={() => navigate('/credit')} 
                className='hidden md:flex items-center gap-2 bg-blue-50 hover:bg-blue-100 px-4 py-1 rounded-full transition-colors'
              >
                <img className='w-3' src={assets.credit_star} alt="" />
                <span className='font-small text-gray-700'>Credits: {credit}</span>
              </button>

              {/* Mobile Credits */}
              <button 
                onClick={() => navigate('/credit')} 
                className='md:hidden flex items-center gap-1 bg-blue-50 px-2 py-1.5 rounded-full text-xs'
              >
                <img className='w-3.5' src={assets.credit_star} alt="" />
                <span className='font-medium text-gray-700'>{credit}</span>
              </button>

              {/* User Menu */}
              <div className='relative group'>
                <div className='flex items-center gap-2 cursor-pointer'>
                  <span className='text-sm text-gray-700 hidden md:block'>Hi, {user.name}</span>
                  <img src={assets.profile_icon} className='w-9 h-9' alt="" />
                </div>
                <div className='absolute right-0 w-40 mt-1 invisible group-hover:visible bg-white border rounded-md shadow-lg'>
                  <div className='py-2 text-sm'>
                    <Link to='/user'>
                      <div className=' px-3 py-1.5 hover:bg-gray-50'>My Account</div>
                    </Link>
                    <div onClick={logout} className='px-3 py-1.5 hover:bg-gray-50 cursor-pointer'>
                      Logout
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <div className='flex items-center gap-3'>
              <Link 
                to='/credit' 
                className='text-sm text-gray-600 hover:text-blue-600 hidden sm:block'
              >
                Pricing
              </Link>
              <button 
                onClick={() => setShowLogin(true)} 
                className='bg-blue-600 text-white px-4 py-2 rounded-full hover:bg-blue-700 transition-colors'
              >
                Login
              </button>
            </div>
          )}

          {/* Mobile Menu Button */}
          <button 
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className='md:hidden flex items-center justify-center'
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              {isMenuOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className='md:hidden border-t bg-white'>
          <div className='py-2 px-3 space-y-0.5'>
            <Link 
              to='/' 
              onClick={() => setIsMenuOpen(false)}
              className='block py-2 px-3 text-sm hover:bg-gray-50 rounded-md'
            >
              Home
            </Link>
            <Link 
              to='/aboutus' 
              onClick={() => setIsMenuOpen(false)}
              className='block py-2 px-3 text-sm hover:bg-gray-50 rounded-md'
            >
              About
            </Link>
            <Link 
              to='/contact' 
              onClick={() => setIsMenuOpen(false)}
              className='block py-2 px-3 text-sm hover:bg-gray-50 rounded-md'
            >
              Contact
            </Link>
            {user && (
              <>
                <Link 
                  to='/support' 
                  onClick={() => setIsMenuOpen(false)}
                  className='block py-2 px-3 text-sm hover:bg-gray-50 rounded-md'
                >
                  Support
                </Link>
                <Link 
                  to='/user' 
                  onClick={() => setIsMenuOpen(false)}
                  className='block py-2 px-3 text-sm hover:bg-gray-50 rounded-md'
                >
                  My Account
                </Link>
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default Navbar;
