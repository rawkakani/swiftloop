import React, { useState } from "react";
import "./Modal.css";
import { Link } from "react-router-dom";
import { auth } from "../../Firebase/Firebase";
import { createUserWithEmailAndPassword, sendEmailVerification } from "@firebase/auth";

const Signup = ({
  email,
  setEmail,
}) => {

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleSignup = async(e) => {
    e.preventDefault();
    if(password !== confirmPassword) {
      alert("Passwords do not match");
      return;
    }
    createUserWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      const user = userCredential.user;

      setEmail("");
      setPassword("");
        setConfirmPassword("");
        updateProfile(auth.currentUser, {
          displayName: firstName, photoURL: "data:image/png;base64,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"
        }).then(() => {
          // Profile updated!
          sendEmailVerification(auth.currentUser).then(() => {
            alert("Account created successfully, Kindly check your email and verify it using the link sent")
            });
          // ...
        }).catch((error) => {
          // An error occurred
          // ...
        });
      
      // ...
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      // ..
    });
  };
  return (
    <div className="modal-body">
    <p>
      Welcome back to SwiftLoop.
    </p>
    <form className="auth-form" onSubmit={(e) => {handleSignup(e)}}>
      <div className="flex-half">
        <div className="form-group">
          <label htmlFor="first-name">First Name</label>
          <input
            type="text"
            placeholder="Enter first name"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label htmlFor="last-name">Last Name</label>
          <input
            type="text"
            placeholder="Enter last name"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
          />
        </div>
      </div>
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
        className="btn2">Sign Up</button>
    </form>
    <div className="signup-with-g">
      <span>
        <p>Already have an account? <Link to="/signin">Login</Link></p>
      </span>
    </div>
  </div>
  );
};

export default Signup;
