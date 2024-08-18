import React from 'react'
import { Link } from 'react-router-dom'

const Navbar = () => {
  return (
    <div className='flex justify-between items-center py-4'>
      <Link to='/' className='text-3xl font-bold'>Explore <span className='bg-gradient-to-r from-blue-600 to-blue-800 text-transparent bg-clip-text drop-shadow-md'>Counties</span></Link>
      <p className='text-neutral-400 hidden md:block'>Made using <a href='https://restcountries.com/'>restcountries.com</a> and <a href='https://unsplash.com/'>unsplash.com</a></p>
    </div>
  )
}

export default Navbar
