import React from 'react';

const AddTeam = ({email, setEmail}) => {
  return (
    <form className="Subscribe">
          <input type="email" placeholder="Enter your email" value={email} onChange={(e) => setEmail(e.target.value)} />
          <button type="button">Add</button>
    </form>
  )
}

export default AddTeam;