import React from 'react';
import { Link } from 'react-router-dom';
import './Navigation.css';

const Navigation = () => {
  return (
    <nav className="Navigation">
      <ul className='mobile'>
        <li><Link to='/'>Home</Link></li>
        <li><Link to='/'>Features</Link></li>
        <li><Link to='/'>Pricing</Link></li>
        <li><Link to='/' className='btn-link'>Get Started</Link></li>
      </ul>
      <ul className='desktop'>
        <li><Link to='/'>Home</Link></li>
        <li><Link to='/'>Features</Link></li>
        <li><Link to='/'>Pricing</Link></li>
        <li><Link to='/' className='btn-link'>Get Started</Link></li>
      </ul>
    </nav>
  )
}

export default Navigation;