import React from 'react'
import { FaArrowRight, FaMapPin, FaUsers } from 'react-icons/fa'
import { Link } from 'react-router-dom'

const CountrieCard = ({ country }) => {
  return (
    <div className="rounded-lg shadow-md p-4 flex flex-col items-center hover:shadow-blue-200">
      <img
        src={country.flags.png}
        alt={country.name.common + ' flag'}
        className="w-24 h-16 mb-4"
      />
      <h2 className="text-xl font-bold">{country.name.common}</h2>
      <p className="text-md text-gray-700 mt-2"><span className='font-medium'>Capital:</span> {country.capital ? country.capital[0] : 'N/A'}</p>
      <div className='flex items-center gap-4 justify-between'>
        <p title='Population' className="text-md text-gray-700 flex items-center gap-1"><FaUsers /> {country.population.toLocaleString()}</p>
        <p title='Region' className="text-md text-gray-700 flex items-center gap-1"><FaMapPin /> {country.region}</p>
      </div>
      
      <Link
        to={`/country/${country.cca3}`}
        className="mt-4 font-medium text-neutral-700 hover:text-blue-800 flex items-center border-b-2 border-b-transparent hover:border-b-blue-800"
      >
        Find More
      </Link>
    </div>
  )
}

export default CountrieCard
