import React, { useEffect } from 'react';
import axios from 'axios';
import Navbar from './components/Navbar';
import Header from './components/Header';

function App() {
  const url = "https://restcountries.com/v3.1/all";

  useEffect(() => {
    axios.get(url)
      .then(response => {
        console.log(response.data);
      })
      .catch(error => {
        console.error('Error fetching data:', error);
      });
  }, []);

  return (
    <div className='max-w-8xl mx-auto px-10'>
      <Navbar />
      <Header />
    </div>
  );
}

export default App;
