import React from 'react'
import { FaMapPin, FaUsers } from 'react-icons/fa'
import { Link } from 'react-router-dom'

const CountrieCard = ({ country }) => {
  return (
    <div className="rounded-lg shadow-md pb-4 bg-gradient-to-t from-blue-100/20 via-transparent to-transparent flex flex-col transition-transform duration-300 ease-in-out transform hover:scale-105 hover:shadow-blue-200">
      <div className="relative overflow-hidden rounded-t-lg w-full">
        <img
          src={country.flags.png}
          alt={country.name.common + ' flag'}
          className="w-full h-48 object-cover"
        />
        <div className="absolute bottom-0 left-0 right-0 h-1/5 bg-gradient-to-t from-black/40 via-transparent to-transparent"></div>
      </div>
      <div className='px-4 font-semibold'>
        <h2 className="text-xl font-bold mt-4">{country.name.common} <span className='text-base text-neutral-400 ml-2'>{country.capital ? country.capital[0] : 'N/A'}</span> </h2>
        <div className='flex items-center justify-center my-4 gap-4'>
          <p title='Population' className="text-md text-gray-700 flex items-center gap-1">
            <FaUsers /> {country.population.toLocaleString()}
          </p>
          <p title='Region' className="text-md text-gray-700 flex items-center gap-1">
            <FaMapPin /> {country.region}
          </p>
        </div>
      </div>
      <Link
        to={`/country/${country.cca3}`}
        className="font-bold transition-colors duration-300 ease-in-out text-neutral-700 ml-auto mr-4 flex items-center border-b-2 border-b-transparent hover:border-b-blue-800 hover:text-transparent hover:bg-clip-text hover:bg-gradient-to-r hover:from-blue-600 hover:to-blue-800"
      >
        Learn More
        <span className='pl-1 font-extrabold'>&#62;</span>
      </Link>
    </div>
  )
}

export default CountrieCard
