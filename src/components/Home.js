// src/components/Home.js

import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Home = () => {
    const [coins, setCoins] = useState([]);

    useEffect(() => {
        axios
            .get('https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=10&page=1&sparkline=false')
            .then(res => {
                setCoins(res.data);
                console.log(res.data);
            })
            .catch(error => console.log(error));
    }, []);

    return (
        <div>
            <h1>Home Page</h1>
            {coins.map(coin => {
                return (
                    <div key={coin.id}>
                        <h4>{coin.name}</h4>
                        <p>Current Price: ${coin.current_price}</p>
                    </div>
                )
            })}
        </div>
    );
}

export default Home;
