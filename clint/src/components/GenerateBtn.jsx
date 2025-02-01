import React from 'react'
import { assets } from '../assets/assets'

const GenerateBtn = () => {
    return (
        <div>
            <hr />
            <div className="bg-white p-6 rounded-lg shadow-lg flex flex-col items-center">
                      <h2 className="text-2xl font-semibold text-gray-800 mb-4">
                        Meet the Developer
                      </h2>
                      <div className="flex flex-col items-center">
                        <img
                          src={assets.developer}
                          alt="Developer"
                          width={100}
                          height={100}
                          className="rounded-lg mb-2"
                        />
                        <p className="text-gray-800 font-semibold">Arjun Maurya</p>
                      </div>
                      <div className="mt-4 text-center">
                        <p className="text-gray-600 mb-2">
                          I am a full-stack developer working on creating a text-to-image
                          application, which allows users to generate images from textual
                          descriptions. The goal is to provide a seamless and interactive
                          experience, where creativity meets technology.
                        </p>
                        <p className="text-gray-600 mb-2">
                          Learn more:
                          <a
                            href="https://www.linkedin.com/in/arjun-maurya-8b1716299/"
                            className="text-blue-500 hover:underline"
                          >
                            Developer Portfolio
                          </a>
                        </p>
                        
                        <div className="mt-4">
                          <a
                            href="https://www.linkedin.com/in/arjun-maurya-8b1716299/"
                            className="text-blue-500 hover:underline mr-4"
                          >
                            LinkedIn
                          </a>
                          <a
                            href="https://www.instagram.com/arjun__maurya_11/"
                            className="text-blue-500 hover:underline mr-4"
                          >
                            Instagram
                          </a>
                          <a
                            href="https://github.com/arjun-901"
                            className="text-blue-500 hover:underline"
                          >
                            GitHub
                          </a>
                        </div>
                      </div>
                    </div>
            
        </div>
        // <div className='flex flex-col items-center'>
        //   <h1 className="text-3xl text-center">Try it,<span className='text-green-600'>see</span>  the <span className='text-orange-500'>magic!</span> </h1>
            
        // </div>
    )
}

export default GenerateBtn