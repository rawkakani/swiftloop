import React from 'react';
import './Hero.css';
import img from '../../Assets/loop_fig.svg';
import Subscribe from '../Subscribe/Subscribe';

const Hero = () => {
  return (
    <section className="Hero">
      <div className="content">
        <h1>Tired of Battling team Scheduling Nightmares?</h1>
        <p>Experience Instant Feedback and Effortless Coordination with SwiftLoop</p>
        <Subscribe />
        <p>Note. We do not collect your Data</p>
      </div>
      <div className="image">
        <img src={img} alt="hero" />
      </div>
    </section>
  )
}

export default Hero