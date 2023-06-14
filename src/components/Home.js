// src/components/Home.js

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Home.css';

const Home = () => {
    const [coins, setCoins] = useState([]);
    const [showMoreInfo, setShowMoreInfo] = useState(null);

    const toggleMoreInfo = (id) => {
        if (showMoreInfo === id) {
            setShowMoreInfo(null);
        } else {
            setShowMoreInfo(id);
        }
    }

    useEffect(() => {
        axios
            .get('/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=10&page=1&sparkline=false')
            .then(res => {
                setCoins(res.data);
                console.log(res.data);
            })
            .catch(error => console.log(error));
    }, []);

    return (
        <div className="container">
            {coins.map(coin => {
                return (
                    <div key={coin.id} className="coin-item">
                        <h4>{coin.name}</h4>
                        <img 
                            src={coin.image} 
                            alt={coin.name} 
                            onClick={() => toggleMoreInfo(coin.id)}
                            className="coin-image"
                        />
                        <p>Current Price: ${coin.current_price}</p>
                        <p>Market Cap: ${coin.market_cap}</p>
                        <p>24h Change: {coin.price_change_percentage_24h}%</p>
                        {showMoreInfo === coin.id && (
                            <div>
                                <p>High 24h: ${coin.high_24h}</p>
                                <p>Low 24h: ${coin.low_24h}</p>
                                <p>Volume: ${coin.total_volume}</p>
                                <p>Circulating Supply: {coin.circulating_supply}</p>
                                <p>Total Supply: {coin.total_supply || 'Unknown'}</p>
                                <p>Ath: ${coin.ath}</p>
                                <p>Ath Change Percentage: {coin.ath_change_percentage}%</p>
                                <p>Last Updated: {coin.last_updated}</p>
                                {/* Add any other additional information here */}
                            </div>
                        )}
                    </div>
                )
            })}
        </div>
    );
}

export default Home;
