import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import axios from 'axios'

const CountryDetails = () => {
  const { cca3 } = useParams()
  const [country, setCountry] = useState(null)

  useEffect(() => {
    const fetchCountry = async () => {
      try {
        const response = await axios.get(`https://restcountries.com/v3.1/alpha/${cca3}`)
        setCountry(response.data[0])
      } catch (error) {
        console.error('Error fetching country details:', error)
      }
    }

    fetchCountry()
  }, [cca3])

  if (!country) return <p>Loading...</p>

  return (
    <div className="py-20">
      <h1 className="text-4xl font-bold">{country.name.common}</h1>
      <img
        src={country.flags.png}
        alt={country.name.common + ' flag'}
        className="w-48 h-32 my-4"
      />
      <p className="text-xl">Capital: {country.capital ? country.capital[0] : 'N/A'}</p>
      <p className="text-xl">Population: {country.population.toLocaleString()}</p>
      <p className="text-xl">Region: {country.region}</p>
      <p className="text-xl">Subregion: {country.subregion}</p>
      <p className="text-xl">Languages: {Object.values(country.languages).join(', ')}</p>
      <p className="text-xl">Currencies: {Object.values(country.currencies).map(c => c.name).join(', ')}</p>
    </div>
  )
}

export default CountryDetails
