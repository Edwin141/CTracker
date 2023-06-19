// Home.js
import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { LineChart, Line } from 'recharts';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar as solidStar } from "@fortawesome/free-solid-svg-icons";
import { faStar as regularStar } from "@fortawesome/free-regular-svg-icons";
import AppContext from './AppContext';
import './Home.css';

const Home = () => {
  const [coins, setCoins] = useState([]);
  const [showMoreInfo, setShowMoreInfo] = useState(null);
  const [loading, setLoading] = useState(true); // new loading state
  const { favoriteCoins, toggleFavorite } = useContext(AppContext);

  const toggleMoreInfo = (id) => {
    if (showMoreInfo === id) {
      setShowMoreInfo(null);
    } else {
      setShowMoreInfo(id);
    }
  }

  useEffect(() => {
    setLoading(true); // set loading to true when fetching starts
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
        setLoading(false); // set loading to false when fetching is complete
      })
      .catch(error => {
        console.log(error);
        setLoading(false); // also set loading to false when there is an error
      });
  }, []);

  if (loading) {
    return <div>Loading...</div>; // display loading message when fetching data
  }

  return (
    <div className="container">
    {coins.map(coin => {
      return (
        <div key={coin.id} className="coin-item">
          <div className="coin-section">
            <img
              src={coin.image}
              alt={coin.name}
              onClick={() => toggleMoreInfo(coin.id)}
              className="coin-image"
            />
            <FontAwesomeIcon
              icon={favoriteCoins.has(coin.id) ? solidStar : regularStar}
              onClick={() => toggleFavorite(coin.id)}
              className="favorite-icon"
            />
            <div className="coin-chart">
              <LineChart width={200} height={100} data={coin.coinHistory}>
                <Line type="monotone" dataKey="value" stroke="#FF9700" dot={false} />
              </LineChart>
              <p style={{ textAlign: 'center', fontSize: '10px', paddingLeft: '20px' }}>Last 150 days</p>
            </div>
          </div>

          <h4>{coin.name}</h4>
          <p>Current Price: ${coin.current_price}</p>
          <p>Market Cap: ${coin.market_cap}</p>
          <p style={{ color: coin.price_change_percentage_24h < 0 ? 'red' : 'green' }}>24h Change: {coin.price_change_percentage_24h}%</p>

          {showMoreInfo === coin.id && (
            <div>
              <p>High 24h: ${coin.high_24h}</p>
              <p>Low 24h: ${coin.low_24h}</p>
              <p>Volume: ${coin.total_volume}</p>
              <p>Circulating Supply: {coin.circulating_supply}</p>
              <p>Total Supply: {coin.total_supply || 'Unknown'}</p>
              <p>Ath: ${coin.ath}</p>
              <p style={{ color: coin.ath_change_percentage < 0 ? 'red' : 'green' }}>Ath Change Percentage: {coin.ath_change_percentage}%</p>
              <p>Last Updated: {coin.last_updated}</p>
            </div>
          )}
        </div>
      )
    })}
  </div>
  );
}

export default Home;
