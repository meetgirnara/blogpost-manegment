import React from 'react'
import './Register.css'

const Register = () => {
  return (
    <div className="form-container">
      {/* Page Title */}
      <h1 className="form-title">CREATE ACCOUNT</h1>
      <h5>Join us and start journey</h5>
      <form>
        {/* Nmae Field */}
        <div className="form-group">
          <label htmlFor="name">Full Name</label>
          <input
            type="text"
            id="name"
            name="name"
            placeholder="Enter your full name"
          />
        </div>
        {/* Email Field */}
        <div className="form-group">
          <label htmlFor="email">Email Address</label>
          <input
            type="email"
            id="email"
            name="email"
            placeholder="Enter your email address"
          />
        </div>

        {/*Phone Number Field */}
        <div className="form-group">
          <label htmlFor="phone">Phone Number</label>
          <input
            type="tel"
            id="phone"
            name="phone"
            placeholder="Enter your phone number"
          />
        </div>

        {/* Password Field */}
        <div className="form-group">
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            name="password"
            placeholder="Create a password"
          />
        </div>

        {/* Password Field */}
        <div className="form-group">
          <label htmlFor="password"> Confirm Password</label>
          <input
            type="password"
            id="password"
            name="password"
            placeholder="Confirm Password"
          />
        </div>

        {/* Submit Button */}
        <button type="submit" className="btn-primary">
          Register
        </button>
      </form>
      {/* Link to Login Page */}
      <p className="link-text">
        Already have an account? <a href="/Login">Login here</a>
      </p>
    </div>
  );
};


export default Register