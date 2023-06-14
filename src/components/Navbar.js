// src/components/Navbar.js
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css'; // import the CSS file

const Navbar = () => {
  const [activeTab, setActiveTab] = useState("home");

  const handleClick = (tab) => {
    setActiveTab(tab);
  }

  useEffect(() => {
    const handleScroll = () => {
      // Implement your scroll spy logic here...
    };

    window.addEventListener('scroll', handleScroll);

    // Cleanup
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <header id="nav-wrapper">
      <nav id="nav">
        <div className="nav left">
          <span className="gradient skew">
            <h1 className="logo un-skew">
              CryptoTracker
            </h1>
          </span>
          {/* Implement mobile menu button... */}
        </div>
        <div className="nav right">
          <Link 
            to="/" 
            className={`nav-link ${activeTab === 'home' ? 'active' : ''}`}
            onClick={() => handleClick('home')}
          >
            <span className="nav-link-span"><span className="u-nav">Home</span></span>
          </Link>
          <Link 
            to="/favorites" 
            className={`nav-link ${activeTab === 'favorites' ? 'active' : ''}`}
            onClick={() => handleClick('favorites')}
          >
            <span className="nav-link-span"><span className="u-nav">Favorites</span></span>
          </Link>
          <Link 
            to="/search" 
            className={`nav-link ${activeTab === 'search' ? 'active' : ''}`}
            onClick={() => handleClick('search')}
          >
            <span className="nav-link-span"><span className="u-nav">Search</span></span>
          </Link>
        </div>
      </nav>
    </header>
  );
};

export default Navbar;
