import React from 'react'

// Gender //

import Gender from './GenderAndPage/Gender'

// Age //

import Age from './GenderAndPage/Age'

const GenderAndAge = () => {
  return (
    <div className='flex flex-row w-full space-x-20 '>

        <div className='w-1/2 h-[400px] bg-white shadow-2xl rounded-xl '><Gender/></div>

        <div className='w-1/2 bg-white shadow-2xl items-center justify-center flex h-[400px] rounded-xl'><Age/></div>
      
    </div>
  )
}

export default GenderAndAge
