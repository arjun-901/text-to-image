import React from 'react'
import { stepsData } from '../assets/assets'

const Steps = () => {
  return (
    <div className='flex flex-col items-center justify-center my-20'>
        <h1 className='text-3xl sm:text-4xl font-semibold mb-2'>How its works</h1>
        <p className='text-lg text-gray-800 mb-8'> Tranform words Into Stunning Image</p>

        <div className='space-y-4 w-full max-w-3xl text-sm'>
            {stepsData.map((item,index)=>(

                <div className='flex items-center gap-4 p-5 px-8 bg-white/40 shadow-md border cursor-pointer hover:scale-[1.02] transition-all duration-300' key={index}>
                    <img src={item.icon} alt="" />
                    <div>
                        <h2 className='text-xl font-medium'>{item.title}</h2>
                        <p>{item.description}</p>
                    </div>
                </div>
                
            ))}
        </div>



    </div>
  )
}

export default Steps