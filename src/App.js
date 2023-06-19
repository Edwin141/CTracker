// App.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
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
  const [coins, setCoins] = useState([]);

  useEffect(() => {
    axios
      .get('/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=10&page=1&sparkline=false')
      .then(res => {
        const fetchedCoins = res.data.filter(coin => coin.id !== "staked-ether" && coin.id !== "usd-coin"); 
        return Promise.all(
          fetchedCoins.map(coin =>
            axios
              .get(`https://api.coingecko.com/api/v3/coins/${coin.id}/market_chart?vs_currency=usd&days=150&interval=daily`)
              .then(res => {
                const coinHistory = res.data.prices.map(price => ({ time: price[0], value: price[1] }));
                return { ...coin, coinHistory };
              })
          )
        );
      })
      .then(coinsWithHistory => {
        setCoins(coinsWithHistory);
      })
      .catch(error => console.log(error));
  }, []);

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
    <AppContext.Provider value={{ favoriteCoins, toggleFavorite, coins }}>
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
