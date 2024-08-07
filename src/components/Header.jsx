import React from 'react'
import Globe from './Globe'

const Header = () => {
  return (
    <div className="flex flex-col md:flex-row items-center py-10 px-2 gap-4 md:gap-10 justify-center">
      <div className="text-center min-w-[40vw]">
        <h1 className="text-5xl font-bold ">
          Discover the <span className="bg-gradient-to-r from-blue-600 to-blue-800 text-transparent bg-clip-text drop-shadow-md">World</span>
        </h1>
        <p className="text-2xl text-neutral-600 mt-4">
        Welcome to our app! Dive into an extensive database of countries from around the globe. <b>Explore the globe today!</b>
        </p>
      </div>
      <div className="flex justify-center hover:cursor-pointer w-[45vw] h-[35vw] md:h-[30vw]">
        <Globe />
      </div>
    </div>
  )
}

export default Header
