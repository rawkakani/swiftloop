import React, {useState} from 'react';
import { signUp } from '../../API/apiCalls';
import './Hero.css';
import img from '../../Assets/hero_img.svg';
import Subscribe from '../Subscribe/Subscribe';
import { Link } from 'react-router-dom';

const Hero = ({email, setEmail, error, handleSubscribe}) => {
    
  return (
    <section className="Hero">
      <div className="content1">
        <h1>Tired of Battling team Scheduling Nightmares?</h1>
        <p>Experience Instant Feedback and Effortless Coordination with SwiftLoop</p>
        <Subscribe email={email} setEmail={setEmail} handleSubscribe={handleSubscribe} btnTxt="Get Started"/>
        {error && <p className='error'>{error}</p>}
        <p>Already have an account? <Link to="signin">Login</Link> </p>
      </div>
      <div className="image">
        <img src={img} alt="hero" />
      </div>
    </section>
  )
}

export default Hero