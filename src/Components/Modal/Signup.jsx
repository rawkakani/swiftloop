import React, { useState } from "react";
import "./Modal.css";
import { FaGoogle } from "react-icons/fa";
import { Link } from "react-router-dom";

const Signup = ({
  email,
  setEmail,
}) => {

  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  return (
    <div className="modal-body">
    <p>
      Welcome back to SwiftLoop.
    </p>
    <form className="auth-form">
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
        <div className="form-group">
            <label htmlFor="password">Confirm Password</label>
            <input
            placeholder="Enter password"
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            />
        </div>
      <button
        className="btn2">Signin</button>
    </form>
    <div className="signup-with-g">
      <span>
        <p>Already have an account? <Link to="/signin">Login</Link></p>
      </span>
      <div className="google-icon">
        <FaGoogle />
      </div>
    </div>
  </div>
  );
};

export default Signup;
