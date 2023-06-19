// Favorites.js
import React, { useContext } from 'react';
import { LineChart, Line } from 'recharts';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar as solidStar } from '@fortawesome/free-solid-svg-icons';
import AppContext from './AppContext';

const Favorites = () => {
    const { favoriteCoins, coins, toggleFavorite } = useContext(AppContext);

    if (!coins) {
        return <div>Loading...</div>;
    }

    const favoriteCoinsData = coins.filter(coin => favoriteCoins.has(coin.id));
    
    if(favoriteCoinsData.length === 0) {
        return <div className="container"><p>No favorite coins yet. Click on a star to add a coin to your favorites.</p></div>
    }

    return (
        <div className="container">
            {favoriteCoinsData.map(coin => (
                <div key={coin.id} className="coin-item">
                    <div className="coin-section">
                        <img src={coin.image} alt={coin.name} className="coin-image" />

                        <div className="coin-chart">
                            <LineChart width={200} height={100} data={coin.coinHistory}>
                                <Line type="monotone" dataKey="value" stroke="#FF9700" dot={false} />
                            </LineChart>
                            <p style={{ textAlign: 'center', fontSize: '10px', paddingLeft: '20px' }}>Last 150 days</p>
                        </div>

                        <FontAwesomeIcon
                            icon={solidStar}
                            className="favorite-icon"
                            onClick={() => toggleFavorite(coin.id)}
                        />
                    </div>

                    <h4>{coin.name}</h4>
                    <p>Current Price: ${coin.current_price}</p>
                    <p>Market Cap: ${coin.market_cap}</p>
                    <p style={{ color: coin.price_change_percentage_24h < 0 ? 'red' : 'green' }}>24h Change: {coin.price_change_percentage_24h}%</p>
                </div>
            ))}
        </div>
    );
}

export default Favorites;
