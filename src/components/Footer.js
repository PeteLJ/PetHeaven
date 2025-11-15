// src/components/Footer.js
import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/Footer.css';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-content">
        <div className="footer-column">
          <div className="footer-logo-img" alt="Pet Heaven Logo"></div>
          <p>Rescuing and rehoming abandoned cats and dogs in Singapore with love and care.</p>
        </div>

        <div className="footer-column">
          <h4>Quick Links</h4>
          <ul>
            <li><Link to="/">Home</Link></li>
            <li><Link to="/about">About Us</Link></li>
            <li><Link to="/adopt">Adopt a Pet</Link></li>
            <li><Link to="/surrender">Release Your Pet</Link></li>
            <li><Link to="/gallery">Gallery</Link></li>
          </ul>
        </div>

        <div className="footer-column">
          <h4>Support</h4>
          <ul>
            <li><Link to="/login">Login / Register</Link></li>
            <li><Link to="/my-dashboard">Be a supporter</Link></li>
            <li><Link to="/donate">Donate</Link></li>
          </ul>
        </div>

        <div className="footer-column">
          <h4>Contact Us</h4>
          <ul className="contact-info">
            <li>📧 info@petheaven.sg</li>
            <li>📞 +65 6421 6789</li>
            <li>📍 87 Countryside Rd, Singapore 789829</li>
          </ul>
        </div>
      </div>

      <div className="footer-bottom">
        <p>&copy; 2025 Pet Heaven. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;