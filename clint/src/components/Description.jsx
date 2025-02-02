import React from 'react'
import { assets } from '../assets/assets'

const Description = () => {
  return (
    <div className='flex flex-col items-center justify-center my-19 p-6 md:px-28'>
        <h1 className='text-3xl sm:text-4xl font-semibold mb-2'>Create AI Image</h1>
        <p className='text-gray-900 mb-8'>Turn your imagination into visuals</p>


        <div className='flex items-center flex-col gap-5 md:gap-14 md:flex-row'>
            <img className='w-80 xl:w-96 rounded-lg' src={assets.img1}alt=""/>

            <div className='text-center'>
                <h2 className='text-3xl font-medium max-w-lg'>Intoducing the AI-powered Text to Image Generator.</h2><br />
                <h2>
                    <p className='text-gray-800'>Create stunning images directly from text with our Text-to-Image Generator. Simply input your text, and the tool converts it into a beautiful, styled image, preserving the layout, font, color, and spacing of the original design. </p>
                    <br />
                    <p className='text-gray-800'>Perfect for social media posts, presentations, and more. Whether you want to share quotes, stories, or custom messages, our tool brings your words to life in a visually appealing way.</p>
                </h2>
            </div>
        </div>
    </div>
  )
}

export default Description