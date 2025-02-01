import React from 'react'
import { assets } from '../assets/assets'

const Description = () => {
  return (
    <div className='flex flex-col items-center justify-center my-24 p-6 md:px-28'>
        <h1 className='text-3xl sm:text-4xl font-semibold mb-2'>Create AI Image</h1>
        <p className='text-gray-900 mb-8'>Turn your imagination into visuals</p>


        <div className='flex items-center flex-col gap-5 md:gap-14 md:flex-row'>
            <img className='w-80 xl:w-96 rounded-lg' src={assets.img1}alt="" srcset="" />

            <div className='text-center'>
                <h2 className='text-3xl font-medium max-w-lg'>Intoducing the AI-powered Text to Image Generator.</h2><br />
                <h2>
                    <p className='text-gray-800'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Unde placeat nihil quae suscipit voluptatum accusamus. Amet sunt, consequatur modi odit.</p>
                    <br />
                    <p className='text-gray-800'>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Aperiam et enim neque facere laboriosam iusto perferendis excepturi tempore veniam </p>
                </h2>
            </div>
        </div>
    </div>
  )
}

export default Description