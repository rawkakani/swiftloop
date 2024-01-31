import React, { useState } from "react";
import "./Modal.css";
import { FaGoogle } from "react-icons/fa";
import { Link } from "react-router-dom";
import { signIn } from "../../API/apiCalls";

const Signin = ({
  email,
  setEmail,
}) => {

  const [password, setPassword] = useState("");

  const handleSignin = (e) => {
    e.preventDefault();
    signIn(email, password, setEmail, setPassword);
  };
  return (
    <div className="modal-body">
    <p>
      Welcome back to SwiftLoop.
    </p>
    <form className="auth-form" onSubmit={(e) => {handleSignin(e)}}>
      <div className="form-group">
        <label htmlFor="email">Email Address</label>
        <input
          type="email"
          placeholder="Enter email address"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </div>
      <div className="form-group">
        <label htmlFor="password">Password</label>
        <input
          placeholder="Enter password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </div>
      <button
        className="btn2">Signin</button>
    </form>
    <div className="signup-with-g">
      <span>
        <p>Don't have an account? <Link to="/signup">Register</Link></p>
      </span>
      <div className="google-icon">
        <FaGoogle />
      </div>
    </div>
  </div>
  );
};

export default Signin;
