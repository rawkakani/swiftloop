import React, { useState } from "react";
import "./Modal.css";
import { Link } from "react-router-dom";
import { auth } from "../../Firebase/Firebase";
import {
  createUserWithEmailAndPassword,
  sendEmailVerification,
  updateProfile,
} from "@firebase/auth";

const Signup = ({ email, setEmail }) => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleSignup = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      alert("Passwords do not match");
      return;
    }
    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const user = userCredential.user;
        // sendEmailVerification(auth.currentUser).then(() => {
        //   alert(
        //     "Account created successfully, Kindly check your email and verify it using the link sent"
        //   );
        // });
        // ...
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        // ..
      });
  };

  const updateUserProfile = async () => {
    updateProfile(auth.currentUser, {
      displayName: "Jane Q. User", photoURL: "https://example.com/jane-q-user/profile.jpg"
    }).then(() => {
      // Profile updated!
      // ...
    }).catch((error) => {
      // An error occurred
      // ...
    });
  };


  return (
    <div className="modal-body">
      <p>Welcome back to SwiftLoop.</p>
      <form
        className="auth-form"
        onSubmit={(e) => {
          handleSignup(e);
        }}
      >
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
        <button className="btn2">Sign Up</button>
        <button
          className="btn2"
          onClick={() => {
            updateUserProfile();
          }}
        >
          Update Profile
        </button>
      </form>
      <div className="signup-with-g">
        <span>
          <p>
            Already have an account? <Link to="/signin">Login</Link>
          </p>
        </span>
      </div>
    </div>
  );
};

export default Signup;
