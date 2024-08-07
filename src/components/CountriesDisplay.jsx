import React, { useState, useEffect } from 'react'
import CountrieCard from './CountrieCard'
import axios from 'axios'

const CountriesDisplay = () => {
  const [countries, setCountries] = useState([])
  const [filteredCountries, setFilteredCountries] = useState([])
  const [searchQuery, setSearchQuery] = useState('')

  useEffect(() => {
    const fetchCountries = async () => {
      try {
        const response = await axios.get('https://restcountries.com/v3.1/all')
        setCountries(response.data)
        setFilteredCountries(response.data)
      } catch (error) {
        console.error('Error fetching data:', error)
      }
    }

    fetchCountries()
  }, [])

  useEffect(() => {
    setFilteredCountries(
      countries.filter(country =>
        country.name.common.toLowerCase().includes(searchQuery.toLowerCase())
      )
    )
  }, [searchQuery, countries])

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value)
  }

  return (
    <div className='py-20'>
      <h1 className='text-3xl font-bold'>Search for a <span className='bg-gradient-to-r from-blue-600 to-blue-800 text-transparent bg-clip-text drop-shadow-md'>Country</span></h1>
      <input
        type="text"
        placeholder="Search for a country..."
        value={searchQuery}
        onChange={handleSearchChange}
        className="px-4 py-2 w-1/3 mt-10 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
      <div className='mt-10 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6'>
        {filteredCountries.map((country) => (
          <CountrieCard key={country.cca3} country={country} />
        ))}
      </div>
    </div>
  )
}

export default CountriesDisplay
