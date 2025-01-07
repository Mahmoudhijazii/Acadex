import React from 'react'

const NewsLetterBox = () => {
    const onSubmitHandler = (event) =>{
        event.preventDefault();
    }

  return (
    <div className='text-center'>
         <p className="text-xl font-semibold text-gray-800 mb-4">
        Stay updated with our latest news and exclusive offers!
      </p>
        <p className='tex-2xl font-medium text-gray-800'>Subscribe now & get 20% off</p>
        <form onSubmit={onSubmitHandler} className="w-full sm:w-1/2 flex items-center gap-3 mx-auto my-6 border pl-3 rounded-lg shadow-sm bg-white">
          <input
            className="w-full sm:flex-1 outline-none py-2"
            type="email"
            placeholder="Enter your email"
            required
          />
          <button
            type="submit"
            className="bg-black text-white text-xs px-10 py-4 rounded-lg hover:bg-gray-800 transition duration-300"
          >
            SUBSCRIBE
          </button>
        </form>
    </div>
  )
}

export default NewsLetterBox