// App.js
import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './components/Home';
import Favorites from './components/Favorites';
import Search from './components/Search';
import Footer from './components/Footer';
import AppContext from './components/AppContext';
import './App.css';

const App = () => {
  const [favoriteCoins, setFavoriteCoins] = useState(new Set());

  const toggleFavorite = (coinId) => {
    setFavoriteCoins((prevFavCoins) => {
      if (prevFavCoins.has(coinId)) {
        const newFavCoins = new Set(prevFavCoins);
        newFavCoins.delete(coinId);
        return newFavCoins;
      } else {
        return new Set(prevFavCoins).add(coinId);
      }
    });
  };

  return (
    <AppContext.Provider value={{ favoriteCoins, toggleFavorite }}>
      <Router>
        <div className="App">
          <Navbar />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/favorites" element={<Favorites />} />
            <Route path="/search" element={<Search />} />
          </Routes>
          <Footer />
        </div>
      </Router>
    </AppContext.Provider>
  );
}

export default App;
