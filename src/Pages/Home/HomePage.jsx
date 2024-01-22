import React from 'react';
import Hero from '../../Components/Hero/Hero';
import './HomePage.css';
import Header from '../../Components/Header/Header';

const Homepage = () => {
  return (
    <div className='HomePage'>
        <Header />
        <Hero />
    </div>
  )
}

export default Homepage;