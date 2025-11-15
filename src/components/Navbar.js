// src/components/Navbar.js
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import '../styles/Navbar.css';

const Navbar = () => {
  const { user, staff, logout } = useAuth();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleLogout = () => {
    if (user) {
      logout();
    } else if (staff) {
      logout(true);
    }
    setIsMenuOpen(false); // Close menu on logout
    alert('You have been logged out.');
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  return (
    <nav className="navbar">
      <div className="nav-container">
        <Link to="/" className="logo-link">
          <div className="navbar-logo-img" alt="Pet Heaven Logo"></div>
        </Link>

        <div
          className={`hamburger ${isMenuOpen ? 'active' : ''}`}
          onClick={toggleMenu}
        >
          <span className="bar"></span>
          <span className="bar"></span>
          <span className="bar"></span>
        </div>

        <ul className={`nav-links ${isMenuOpen ? 'active' : ''}`}>
          <li><Link to="/" onClick={closeMenu}>Home</Link></li>
          <li><Link to="/adopt" onClick={closeMenu}>Adopt</Link></li>
          {(!staff) && (
            <li><Link to="/surrender" onClick={closeMenu}>Surrender Pet</Link></li>
          )}
          <li><Link to="/gallery" onClick={closeMenu}>Gallery</Link></li>
          <li><Link to="/about" onClick={closeMenu}>About Us</Link></li>
          {staff && (
            <li><Link to="/staff-dashboard" onClick={closeMenu}>Staff Dashboard</Link></li>
          )}
          {user && (
            <li><Link to="/my-dashboard" onClick={closeMenu}>My Dashboard</Link></li>
          )}
          {staff ? (
            <>
              <li className="nav-user">Logged In as staff</li>
              <li><button onClick={handleLogout} className="logout-btn">Logout</button></li>
            </>
          ) : user ? (
            <>
              <li className="nav-user">Hello, {user.name} {user.supporter && '(supporter)'}</li>
              <li><button onClick={handleLogout} className="logout-btn">Logout</button></li>
            </>
          ) : (
            <li><Link to="/login" onClick={closeMenu}>Login</Link></li>
          )}
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;