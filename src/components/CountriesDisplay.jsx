import React, { useState, useEffect } from 'react';
import CountrieCard from './CountrieCard';
import axios from 'axios';
import { TextField, Select, MenuItem, FormControl, InputLabel } from '@mui/material';

const CountriesDisplay = () => {
  const [countries, setCountries] = useState([]);
  const [filteredCountries, setFilteredCountries] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [regionFilter, setRegionFilter] = useState('');
  const [popSortOption, setPopSortOption] = useState('default');

  useEffect(() => {
    const fetchCountries = async () => {
      try {
        const response = await axios.get('https://restcountries.com/v3.1/all');
        setCountries(response.data);
        setFilteredCountries(response.data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchCountries();
  }, []);

  useEffect(() => {
    console.log(countries);

    let result = countries.filter(country => {
      const matchesName = country.name.common.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesRegion = regionFilter === '' || country.region === regionFilter;
      return matchesName && matchesRegion;
    });

    if (popSortOption === 'population-asc') {
      result.sort((a, b) => a.population - b.population);
    } else if (popSortOption === 'population-desc') {
      result.sort((a, b) => b.population - a.population);
    }

    setFilteredCountries(result);
  }, [searchQuery, regionFilter, popSortOption, countries]);

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const handleRegionChange = (e) => {
    setRegionFilter(e.target.value);
  };

  const handlePopSortChange = (e) => {
    setPopSortOption(e.target.value);
  };

  return (
    <div className='py-20'>
      <h1 className='text-3xl font-bold mb-10'>
        Search for a <span className='bg-gradient-to-r from-blue-600 to-blue-800 text-transparent bg-clip-text drop-shadow-md'>Country</span>
      </h1>
      <div className="flex flex-wrap gap-6 mb-10">
        <div className="flex-1 min-w-[200px]">
          <TextField
            id="search"
            label="Search for a country"
            variant="outlined"
            value={searchQuery}
            onChange={handleSearchChange}
            fullWidth
          />
        </div>
        <div className='flex flex-wrap gap-6'>
          <div className="flex-1 min-w-[200px]">
            <FormControl fullWidth variant="outlined">
              <InputLabel id="region-label">Region</InputLabel>
              <Select
                id="region"
                labelId="region-label"
                value={regionFilter}
                onChange={handleRegionChange}
                label="Region"
              >
                <MenuItem value="">All Regions</MenuItem>
                <MenuItem value="Africa">Africa</MenuItem>
                <MenuItem value="Americas">Americas</MenuItem>
                <MenuItem value="Asia">Asia</MenuItem>
                <MenuItem value="Europe">Europe</MenuItem>
                <MenuItem value="Oceania">Oceania</MenuItem>
              </Select>
            </FormControl>
          </div>
          <div className="flex-1 min-w-[200px]">
            <FormControl fullWidth variant="outlined">
              <InputLabel id="pop-sort-label">Sort by Population</InputLabel>
              <Select
                id="pop-sort"
                labelId="pop-sort-label"
                value={popSortOption}
                onChange={handlePopSortChange}
                label="Sort by Population"
              >
                <MenuItem value="">No Sort</MenuItem>
                <MenuItem value="population-asc">Sort by Population (Low to High)</MenuItem>
                <MenuItem value="population-desc">Sort by Population (High to Low)</MenuItem>
              </Select>
            </FormControl>
          </div>
        </div>
      </div>
      <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-12'>
        {filteredCountries.map((country) => (
          <CountrieCard key={country.cca3} country={country} />
        ))}
      </div>
    </div>
  );
};

export default CountriesDisplay;
