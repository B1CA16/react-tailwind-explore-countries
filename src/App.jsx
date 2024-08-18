import React from 'react'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import Navbar from './components/Navbar'
import CountryDetails from './components/CountryDetails'
import Main from './pages/Main'
import 'bootstrap/dist/css/bootstrap.min.css';


function App() {
  return (
    <Router>
      <div className='max-w-8xl mx-auto px-10'>
        <Navbar />
        <Routes>
          <Route path="/" element={<Main />} />
          <Route path="/country/:cca3" element={<CountryDetails />} />
        </Routes>
      </div>
    </Router>
  )
}

export default App
