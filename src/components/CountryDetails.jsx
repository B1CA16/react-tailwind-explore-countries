import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import Carousel from 'react-bootstrap/Carousel';
import 'bootstrap/dist/css/bootstrap.min.css';

const CountryDetails = () => {
  const { cca3 } = useParams();
  const [country, setCountry] = useState(null);
  const [borders, setBorders] = useState([]);
  const [images, setImages] = useState([]);

  useEffect(() => {
    const fetchCountry = async () => {
      try {
        // Fetch the main country data
        const response = await axios.get(`https://restcountries.com/v3.1/alpha/${cca3}`);
        const countryData = response.data[0];
        setCountry(countryData);

        // Fetch border countries' names
        if (countryData.borders) {
          const borderResponses = await Promise.all(
            countryData.borders.map((borderCode) => 
              axios.get(`https://restcountries.com/v3.1/alpha/${borderCode}`)
            )
          );
          const borderNames = borderResponses.map((res) => res.data[0].name.common);
          setBorders(borderNames);
        }
    
        // Fetch images from Unsplash
        const imageResponse = await axios.get(`https://api.unsplash.com/search/photos`, {
          params: { query: countryData.name.common, per_page: 5 },
          headers: { Authorization: `Client-ID ${import.meta.env.VITE_UNSPLASH_ACCESS_KEY}` }
        });
    
        console.log('Unsplash API Response:', imageResponse.data); // Log the response
    
        if (imageResponse.data && imageResponse.data.results) {
          setImages(imageResponse.data.results.map((img) => img.urls.regular));
        } else {
          console.warn('No images found for:', countryData.name.common);
        }
      } catch (error) {
        console.error('Error fetching country details:', error);
      }
    };    

    fetchCountry();
  }, [cca3]);

  if (!country) return <p>Loading...</p>;

  const countryName = country.name?.common || 'Unknown Country';
  const officialName = country.name?.official || 'N/A';
  const capital = country.capital ? country.capital[0] : 'N/A';
  const population = country.population?.toLocaleString() || 'N/A';
  const region = country.region || 'Unknown Region';
  const subregion = country.subregion ? `specifically in the ${country.subregion} subregion` : '';
  const languages = country.languages
    ? Object.values(country.languages).join(', ')
    : 'No official languages';
  const currencies = country.currencies
    ? Object.values(country.currencies).map((c) => c.name).join(', ')
    : 'No official currencies';
  const area = country.area ? `${country.area.toLocaleString()} km²` : 'N/A';
  const demonym = country.demonyms?.eng?.m || 'N/A';
  const timezones = country.timezones ? country.timezones.join(', ') : 'N/A';
  const domain = country?.tld || 'N/A';
  const flagUrl = country.flags?.png || '';
  const coatOfArmsUrl = country.coatOfArms?.png || '';
  const isIndependent = country.independent ? 'Yes' : 'No';
  const isUNMember = country.unMember ? 'Yes' : 'No';

  return (
    <div className="container mx-auto py-10 px-4">
      <div className="flex gap-8">
        <div className="bg-gray-200 shadow-md p-6 rounded-lg w-64 flex-shrink-0">
          <h1 className="text-3xl font-bold mb-4">{countryName}</h1>
          {flagUrl && (
            <img
              src={flagUrl}
              alt={`${countryName} flag`}
              className="w-full h-auto rounded-md mb-6"
              title='Flag'
            />
          )}
          {coatOfArmsUrl && (
            <img
              src={coatOfArmsUrl}
              alt={`${countryName} coat of arms`}
              className="w-3/4 h-auto mx-auto rounded-md mb-6"
              title='Coat of Arms'
            />
          )}
          <ul className="space-y-2 text-lg">
            <li><strong>Capital:</strong> {capital}</li>
            <li><strong>Population:</strong> {population}</li>
            <li><strong>Area:</strong> {area}</li>
            <li><strong>Demonym:</strong> {demonym}</li>
            <li><strong>Timezones:</strong> {timezones}</li>
            <li><strong>Borders:</strong> {borders.length ? borders.join(', ') : 'None'}</li>
            <li><strong>Domain:</strong> {domain}</li>
            <li><strong>Independent:</strong> {isIndependent}</li>
            <li><strong>UN Member:</strong> {isUNMember}</li>
          </ul>
        </div>

        {/* Right Content */}
        <div className="flex-grow text-lg leading-relaxed px-10">
          <p className="mb-3">
            <strong>{countryName}</strong> is officially known as <strong>{officialName}</strong>. It is a country located in the <strong>{region}</strong> region {subregion && <span>{subregion}</span>}.
          </p>
          <p className="mb-3">
            The capital city is <strong>{capital}</strong>, and it has a population of approximately <strong>{population}</strong> inhabitants.
          </p>
          <p className="mb-3">
            The official language(s) spoken in {countryName} include {languages}
            , and the people are known as <strong>{demonym}s</strong>.
          </p>
          <p className="mb-3">
            {countryName} covers an area of <strong>{area}</strong>
            {borders.length > 0 && `, and it shares its borders with: ${borders.join(', ')}.`}
          </p>
          <p className="mb-3">
            The currency used is {currencies}.
          </p>
          <p className="mb-3">
            The country operates within the timezone(s) of <strong>{timezones}</strong>.
          </p>
          <div className="mt-4">
            {images.length > 0 ? (
              <Carousel className='shadow-md'>
                {images.map((imgUrl, index) => (
                  <Carousel.Item key={index}>
                    <img
                      src={imgUrl}
                      alt={`Image ${index + 1}`}
                      className="w-full h-[30vw] object-cover mx-auto"
                    />
                  </Carousel.Item>
                ))}
              </Carousel>
            ) : (
              ''
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CountryDetails;
