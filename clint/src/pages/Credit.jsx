import React, { useContext } from 'react'
import { assets, plans } from '../assets/assets'
import { AppContext } from '../context/AppContext'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import axios from 'axios'

const Credit = () => {
  
  const {user, backendurl, loadCreditsData, token, setShowLogin} = useContext(AppContext)

  const navigate = useNavigate()


  const initPay = async (order) => {
    try {
      const options = {
        key: "rzp_test_uVWSFLoVatlJ77",
        amount: order.amount,
        currency: order.currency,
        name: "Luxoximg Credits",
        description: "Credit Purchase Transaction",
        order_id: order.id,
        handler: async function (response) {
          try {
            toast.info('Verifying payment...');
            
            const verifyData = await axios.post(
              `${backendurl}/api/user/verify-payment`,
              { response },
              { headers: { token } }
            );
            
            if (verifyData.data.success) {
              await loadCreditsData();
              toast.success('Payment successful! Credits added to your account.');
              setTimeout(() => {
                window.location.href = '/';
              }, 1500);
            } else {
              toast.error(verifyData.data.message || 'Payment verification failed. Please contact support.');
            }
          } catch (error) {
            console.error('Payment verification error:', error);
            toast.error('Payment verification failed. Please check your account or contact support.');
          }
        },
        modal: {
          ondismiss: function() {
            toast.info('Payment cancelled');
          },
          escape: false,
          backdropclose: false
        },
        prefill: {
          name: user?.name || '',
          email: user?.email || '',
        },
        theme: {
          color: "#3399cc"
        }
      };

      const rzp1 = new window.Razorpay(options);
      rzp1.open();
      
      rzp1.on('payment.failed', function (response) {
        toast.error('Payment failed. Please try again or contact support.');
      });
    } catch (error) {
      console.error('Razorpay initialization error:', error);
      toast.error('Failed to initialize payment. Please try again.');
    }
  };

  const paymentRazorpay = async (planId) => {
    try {
      if (!user || !token) {
        setShowLogin(true);
        return;
      }

      toast.info('Processing your request...');

      const { data } = await axios.post(
        `${backendurl}/api/user/pay-razor`,
        { planId },
        { headers: { token } }
      );

      if (data.success && data.order) {
        initPay(data.order);
      } else {
        toast.error(data.message || 'Failed to create order. Please try again.');
      }
    } catch (error) {
      console.error('Payment error:', error);
      toast.error('Failed to process payment. Please try again.');
    }
  };

  return (
    <div className='min-h-[80vh] text-center pt-14 mb-10'>
      <button className='border border-gray-400 px-10 py-2 rounded-full'>Our Plans</button>
      <h1 className='text-center text-3xl font-medium mb-6 sm:mb-10 mt-2'>
        Choose Your Plan
      </h1>

      <div className='flex gap-6 justify-center flex-wrap text-left'>
        {plans.map((item, index) => (
          <div 
            className='bg-white drop-shadow-sm border rounded-lg py-12 px-8 text-gray-700 hover:scale-105 transition-all duration-500' 
            key={index}
          >
            <img width={40} src={assets.lock_icon} alt=''/>
            <p className='mt-3 mb-1 font-semibold'>{item.id}</p>
            <p className='text-sm'>{item.desc}</p>
            <p className='mt-6'>
              <span className='text-3xl font-medium'>${item.price}</span>
              <span className='text-green-600'> / {item.credits} credits</span>
            </p>
            <button 
              onClick={() => paymentRazorpay(item.id)} 
              className='w-full bg-gray-800 text-white mt-8 text-sm rounded-md py-2.5 min-w-52'
            >
              {user ? 'Purchase' : 'Get Started'}
            </button>
          </div>
        ))}
        <p className='text-xl text-gray-500 mt-2'>
          After purchase, credits will be added to your account.
          And <span className='text-red-500'>reload the page</span>  to see the <span className='text-green-500'>changes.</span> 
        </p>

      </div>
    </div>
  );
};

export default Credit; 