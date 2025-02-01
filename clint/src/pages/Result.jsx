import React, { useContext, useState } from 'react'
import { assets } from '../assets/assets'
import { AppContext } from '../context/AppContext'
import { toast } from 'react-toastify'

const Result = () => {

  const[image,setImage]=useState(assets.sample_img_2)
  const[isImageLoaded,setIsImageLoaded]=useState(false)
  const [loading,setLoading]=useState(false)
  const [input,setInput]=useState('')
  const {generateImage}= useContext(AppContext)

  const onSubmitHandler = async (e) => {
    e.preventDefault()
    if(!input.trim()) return;
    
    setLoading(true)
    try {
      const generatedImage = await generateImage(input)
      if(generatedImage) {
        setImage(generatedImage)
        setIsImageLoaded(true)
      } else {
        setIsImageLoaded(false)
      }
    } catch(error) {
      toast.error('Failed to generate image')
      setIsImageLoaded(false)
    }
    setLoading(false)
  }

  return (
    <form onSubmit={onSubmitHandler} className='flex flex-col min-h-[90vh] items-center'>
      <div>
        <div className='relative mt-5'>
          {loading ? (
            <>
              <img className='w-80 h-auto sm:max-w-1/2 lg:max-w-1/3' src={assets.sample_img_1} alt="" />
              <span className='absolute bottom-0 h-1 bg-blue-500 w-full transition-all duration-[10s]'/>
            </>
          ) : (
            <img 
              className='w-80 h-auto sm:max-w-1/2 lg:max-w-1/3' 
              src={isImageLoaded ? image : assets.sample_img_1} 
              alt="Generated or Sample" 
            />
          )}
        </div>
        {loading && <p>Loading....</p>}
      </div>

      {!isImageLoaded && 
        <div className='flex w-full max-w-xl bg-neutral-700 text-white text-sm p-0 mt-10 rounded-full'>
          <input 
            onChange={e => setInput(e.target.value)} 
            value={input}
            type="text" 
            placeholder='Describe what you want to generate' 
            className='flex-1 bg-transparent outline-none ml-8 max-sm:w-20 placeholder-color'
          />
          <button 
            type='submit' 
            disabled={loading || !input.trim()}
            className='bg-zinc-900 lg:px-10 sm:px-5 rounded-full p-2 disabled:opacity-50'
          >
            Generate
          </button>
        </div>
      }

      {isImageLoaded && 
        <div className='flex gap-2 flex-wrap justify-center text-white text-sm p-0.5 mt-10 rounded-full'>
          <p onClick={() => {
            setIsImageLoaded(false)
            setInput('')
          }} className='bg-transparent border border-zinc-900 text-black px-8 py-3 rounded-full cursor-pointer'>
            Generate Another
          </p>
          <a 
            className='bg-zinc-900 px-10 py-3 rounded-full cursor-pointer' 
            download="generated-image.jpg" 
            href={image}
          >
            Download
          </a>
        </div>
      }
    </form>
  )
}

export default Result