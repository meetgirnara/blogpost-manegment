import React from 'react'
import { Link } from 'react-router-dom'
import './Login.css'

const Login = () => {
  return (
    <div className="form-container">
      {/* Page Title */}
      <h1 className="form-title">WELCOME BACK</h1>
      <h5>Sign in to your account</h5>
      <form>
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

        {/* Password Field */}
        <div className="form-group">
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            name="password"
            placeholder="Enter your password"
          />form
        </div>

        {/* Submit Button */}
        <button type="submit" className="btn-primary">
          Login
        </button>
      </form>
      {/* Link to Register Page */}
      <p className="link-text">
        Don't have an account? <Link to="/register">Register here</Link>
      </p>
    </div>
  );
};

export default Login
