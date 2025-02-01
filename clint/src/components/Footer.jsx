import { useContext } from 'react'; 
import { assets } from '../assets/assets'; 
import { Link } from 'react-router-dom'; 
import { AppContext } from '../context/AppContext';  

const Footer = () => {   
  const { user } = useContext(AppContext);    
  return (     
    <div className='border-t-[1px] mt-10'>       
      {/* Main Footer Content */}       
      <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 p-6 md:p-8 lg:px-16'>         
        {/* Company Info */}         
        <div className='space-y-3'>           
          <img className='h-8' src={assets.Logoes} alt='' />           
          <p className='text-gray-600 text-sm'>
            Experience the power of AI image generation with our cutting-edge technology.
          </p>         
        </div>          
        
        {/* Links Section */}         
        <div>
          <p className='font-medium mb-3'>Links</p>           
          <div className='flex flex-col gap-2 text-gray-600 text-sm'>             
                       
            <Link to='/support'>Support</Link>             
            <Link to='/return'>Return Policy</Link>             
            {/* <Link to='/admin'>Admin</Link>              */}
            {user && <Link to='/user'>My Account</Link>}           
          </div>         
        </div>          
        
        {/* Help Section - Hidden on mobile */}         
        <div className='hidden sm:block'>           
          <p className='font-medium mb-3'>Help</p>           
          <div className='flex flex-col gap-2 text-gray-600 text-sm'>             
            <Link to='/credit'>Pricing</Link>                          
            <Link to='/contact'>Contact us</Link>           
          </div>         
        </div>          
        
        {/* Social Media Section */}         
        <div className='space-y-3'>           
          <p className='font-medium'>Social Media</p>           
          <div className='flex gap-4'>             
            <img className='cursor-pointer h-5 w-5 hover:opacity-80' src={assets.facebook_icon} alt='' />             
            <img className='cursor-pointer h-5 w-5 hover:opacity-80' src={assets.twitter_icon} alt='' />             
            <img className='cursor-pointer h-5 w-5 hover:opacity-80' src={assets.instagram_icon} alt='' />           
          </div>         
        </div>       
      </div>        
      
      {/* Copyright Section */}       
      <div className='text-center py-3 border-t-[1px]'>         
        <p className='text-gray-600 text-xs'>
          Copyright © 2024 Luxoximg. All rights reserved.
        </p>       
      </div>     
    </div>   
  ); 
};  

export default Footer;
