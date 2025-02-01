import React, { useContext } from 'react';
import { assets } from '../assets/assets';
import { motion } from "framer-motion";
import { AppContext } from '../context/AppContext';
import { useNavigate } from 'react-router-dom';

const Header = () => {
    const { user, setShowLogin } = useContext(AppContext);
    const navigate = useNavigate();

    // Sample images array
    const sampleImages = [
        assets.img1,
        assets.img2,
        assets.img3,
        assets.img4,
        assets.img5,
        assets.img6
    ];

    const onClickHandler = () => {
        if (user) {
            navigate('/result');
        } else {
            setShowLogin(true);
        }
    };

    return (
        <motion.div className='flex flex-col justify-center items-center text-center my-12'
            initial={{ opacity: 0.2, y: 100 }}
            transition={{ duration: 1 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}>
            <motion.div className='text-stone-500 inline-flex text-center gap-2 bg-white px-6 py-1 rounded-full border border-neutral-500'
                initial={{ opacity: 0.2, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2, duration: 0.8 }}
            >
                <p>Let Start to Make Text To image</p>
                <img src={assets.star_icon} alt="" />
            </motion.div>

            <motion.h1
                className='text-2xl max-w-[300px] sm:text-3xl sm:max-w-[405px] mx-auto mt-5 text-center'
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.4, duration: 2 }}
            >
                <span className='text-green-500'>Transform</span> text to
                <span className='text-blue-600'>image</span><br />
                quickly With <span className='text-orange-500'>AI</span>
            </motion.h1>

            <p className='text-center max-w-xl mx-auto mt-5'>Please write a few word description for text to image.
                Create stunning visual content by transforming text into images effortlessly.</p>

            <button onClick={onClickHandler} className='sm:text-lg text-white bg-black w-auto mt-8 px-12 py-2.5 flex items-center gap-2 rounded-full'>Generate Image
                <img className='h-6' src={assets.star_group} alt="" />
            </button>

            <div className='flex gap-3 mt-11 flex-wrap justify-center'>
                {sampleImages.map((image, index) => (
                    <motion.img 
                        className='rounded hover:scale-105 transition-all duration-300 cursor-pointer max-sm:w-20 max-sm:h-20 w-32 h-32 object-cover'
                        src={image} 
                        alt={`Sample ${index + 1}`} 
                        key={index}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 * index, duration: 0.8 }}
                    />
                ))}
            </div>
            <p className='mt-4 text-neutral-600'>Sample images generated from Luxoximg</p>
        </motion.div>
    )
}

export default Header;
