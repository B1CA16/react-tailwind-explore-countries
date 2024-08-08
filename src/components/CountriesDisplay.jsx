import React, { useState, useEffect } from 'react'
import CountrieCard from './CountrieCard'
import axios from 'axios'

const CountriesDisplay = () => {
  const [countries, setCountries] = useState([])
  const [filteredCountries, setFilteredCountries] = useState([])
  const [searchQuery, setSearchQuery] = useState('')
  const [regionFilter, setRegionFilter] = useState('')
  const [popSortOption, setPopSortOption] = useState('default')

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
    let result = countries.filter(country => {
      const matchesName = country.name.common.toLowerCase().includes(searchQuery.toLowerCase())
      const matchesRegion = regionFilter === '' || country.region === regionFilter
      return matchesName && matchesRegion
    })

    if (popSortOption === 'population-asc') {
      result.sort((a, b) => a.population - b.population)
    } else if (popSortOption === 'population-desc') {
      result.sort((a, b) => b.population - a.population)
    }

    setFilteredCountries(result)
  }, [searchQuery, regionFilter, popSortOption, countries])

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value)
  }

  const handleRegionChange = (e) => {
    setRegionFilter(e.target.value)
  }

  const handlePopSortChange = (e) => {
    setPopSortOption(e.target.value)
  }

  return (
    <div className='py-20'>
      <h1 className='text-3xl font-bold mb-10'>
        Search for a <span className='bg-gradient-to-r from-blue-600 to-blue-800 text-transparent bg-clip-text drop-shadow-md'>Country</span>
      </h1>
      <div className="flex flex-wrap gap-6 mb-10 bg-gradient-to-r from-blue-600 to-blue-800 p-4 rounded-xl drop-shadow-md">
        <div className="flex-1 min-w-[200px]">
          <input
            id="search"
            type="text"
            placeholder="Search for a country..."
            value={searchQuery}
            onChange={handleSearchChange}
            className="px-4 py-2 w-full border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div className='flex flex-wrap gap-6'>
          <div className="flex-1 min-w-[200px]">
          <select
            id="region"
            value={regionFilter}
            onChange={handleRegionChange}
            className="px-4 py-2 h-10 w-full border rounded-lg shadow-sm hover:cursor-pointer focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option className='p-2' value="">All Regions</option>
            <option className='p-2' value="Africa">Africa</option>
            <option className='p-2' value="Americas">Americas</option>
            <option className='p-2' value="Asia">Asia</option>
            <option className='p-2' value="Europe">Europe</option>
            <option className='p-2' value="Oceania">Oceania</option>
          </select>
        </div>
        <div className="flex-1 min-w-[200px]">
          <select
            id="pop-sort"
            value={popSortOption}
            onChange={handlePopSortChange}
            className="px-4 py-2 h-10 w-full border rounded-lg shadow-sm hover:cursor-pointer focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option className='p-2' value="default">No Sort</option>
            <option className='p-2' value="population-asc">Sort by Population (Low to High)</option>
            <option className='p-2' value="population-desc">Sort by Population (High to Low)</option>
          </select>
        </div>
      </div>
      </div>
      <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-12'>
        {filteredCountries.map((country) => (
          <CountrieCard key={country.cca3} country={country} />
        ))}
      </div>
    </div>
  )
}

export default CountriesDisplay
