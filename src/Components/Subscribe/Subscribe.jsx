import React, {useState} from 'react';
import './Subscribe.css';

const Subscribe = () => {
    const [email, setEmail] = useState('');
  return (
    <form className="Subscribe">
          <input type="email" placeholder="Enter your email" value={email} onChange={(e) => setEmail(e.target.value)} />
          <button type="submit">Get Started</button>
    </form>
  )
}

export default Subscribe