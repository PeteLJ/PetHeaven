// src/components/StaffLoginPage.js
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import '../styles/StaffLoginPage.css';

const StaffLoginPage = () => {
  const [credentials, setCredentials] = useState({ username: '', password: '' });
  const [error, setError] = useState('');
  const { loginStaff } = useAuth();
  const navigate = useNavigate();

  const handleChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
    if (error) setError('');
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (loginStaff(credentials.username, credentials.password)) {
      alert('Staff login successful!');
      navigate('/staff-dashboard'); // Redirect to staff dashboard
    } else {
      setError('Invalid staff username or password.');
    }
  };

  return (
    <div className="staff-login-page">
      <div className="form-container">
        <h2>Staff Login</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="username">Username</label>
            <input
              type="text"
              id="username"
              name="username"
              value={credentials.username}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              name="password"
              value={credentials.password}
              onChange={handleChange}
              required
            />
          </div>
          {error && <p className="error">{error}</p>}
          <div className="form-actions">
            <button type="submit">Login</button>
          </div>
        </form>
        <div className="back-link">
          <a href="/" onClick={(e) => { e.preventDefault(); navigate('/'); }}>Back to Home</a>
        </div>
      </div>
    </div>
  );
};

export default StaffLoginPage;