import React from 'react'

const Navbar = () => {
  return (
    <div className='flex justify-between items-center py-4'>
      <h1 className='text-3xl font-bold'>Explore <span className='bg-gradient-to-r from-blue-600 to-blue-800 text-transparent bg-clip-text drop-shadow-md'>Counties</span></h1>
      <p className='text-neutral-400 hidden  sm:block'>Made using <a href='https://restcountries.com/'>restcountries.com</a></p>
    </div>
  )
}

export default Navbar
