// src/components/Footer.js
import React from 'react';
import './Footer.css'; // import the CSS file

const Footer = () => {
  const year = new Date().getFullYear();

  return (
    <footer className="footer">
      <div className="footer-content">
        <p>CryptoTracker</p>
        <p>&copy; {year}</p>
      </div>
    </footer>
  );
};

export default Footer;
