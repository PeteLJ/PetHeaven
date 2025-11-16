// src/components/LoginPage.js
import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import '../styles/LoginPage.css';

const LoginPage = () => {
  const [isRegister, setIsRegister] = useState(false);
  // Add supporter state during registration
  const [isSupporter, setIsSupporter] = useState(false);
  const [formData, setFormData] = useState({ name: '', email: '', password: '' });
  const [error, setError] = useState('');
  const { user, staff, login, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  // Effect to update state based on current URL path
  useEffect(() => {
    if (location.pathname === '/register') {
      setIsRegister(true);
    } else if (location.pathname === '/login') {
      setIsRegister(false);
    }
  }, [location.pathname]);

  // If staff is logged in, show staff message
  if (staff) {
    return (
      <div className="login-page">
        <div className="form-container logged-in-message">
          <h2>Hi, {staff.username}!</h2>
          <p>You are currently logged in as staff.</p>
          <div className="form-actions">
            <button onClick={() => navigate('/staff-dashboard')}>Go to Staff Dashboard</button>
            <button onClick={() => logout(true)} className="logout-btn-inline">Logout Staff</button>
          </div>
        </div>
      </div>
    );
  }

  // If regular user is logged in, show user message
  if (user) {
    return (
      <div className="login-page">
        <div className="form-container logged-in-message">
          <h2>Hi, {user.name}!</h2>
          <p>You are already logged in.</p>
          <div className="form-actions">
            <button onClick={() => navigate('/')}>Go to Home</button>
            <button onClick={logout} className="logout-btn-inline">Logout</button>
          </div>
        </div>
      </div>
    );
  }

  // Local storage for users
  const storedUsers = JSON.parse(localStorage.getItem('users')) || [];

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    if (error) setError('');
  };

  // Handle supporter checkbox change
  const handleSupporterChange = (e) => {
    setIsSupporter(e.target.checked);
  };

  const handleLogin = (e) => {
    e.preventDefault();
    const user = storedUsers.find(u => u.email === formData.email && u.password === formData.password);
    if (user) {
      login(user);
      alert('Login successful!');
      navigate(location.state?.from?.pathname || '/');
    } else {
      setError('Invalid email or password');
    }
  };

  const handleRegister = (e) => {
    e.preventDefault();
    if (storedUsers.some(u => u.email === formData.email)) {
      setError('Email already registered');
      return;
    }
    // Add supporter status to new user object
    const newUser = { id: Date.now(), ...formData, supporter: isSupporter };
    const updatedUsers = [...storedUsers, newUser];
    localStorage.setItem('users', JSON.stringify(updatedUsers));
    alert('Registration successful! You can now log in.');
    setIsRegister(false);
    navigate('/login');
  };

  const handleSubmit = isRegister ? handleRegister : handleLogin;

  const switchToRegister = () => {
    setIsRegister(true);
    setIsSupporter(false); // Reset supporter status when switching to register
    navigate('/register');
  };

  const switchToLogin = () => {
    setIsRegister(false);
    navigate('/login');
  };

  return (
    <div className="login-page">
      <div className="form-container">
        <h2>{isRegister ? 'Register' : 'Login'}</h2>

        <form onSubmit={handleSubmit}>
          {isRegister && (
            <>
              <div className="form-group">
                <label>Full Name</label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="form-group">
                <label className="supporter-checkbox-label">
                  <input
                    type="checkbox"
                    checked={isSupporter}
                    onChange={handleSupporterChange}
                  />
                  Sign up to become a supporter and receive updates
                </label>
              </div>
            </>
          )}

          <div className="form-group">
            <label>Email</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label>Password</label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              required
            />
          </div>

          {error && <p className="error">{error}</p>}

          <div className="form-actions">
            <button type="submit">{isRegister ? 'Register' : 'Login'}</button>
          </div>
        </form>

        <div className="switch-form">
          {isRegister ? (
            <p>Already have an account? <button type="button" onClick={switchToLogin}>Login</button></p>
          ) : (
            <p>Don't have an account? <button type="button" onClick={switchToRegister}>Register</button></p>
          )}
        </div>

        <div className="staff-login-link">
          <p>Are you staff? <Link to="/staff-login">Login here</Link></p>
        </div>

      </div>
    </div>
  );
};

export default LoginPage;