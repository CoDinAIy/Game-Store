//fetches and displays all games by default
//takes in filter and updates according to filter
//for each filter title of filter followed by select sort by form option which sorts accordingly
import '../styles/shopPage.css'

import { useState, useEffect } from "react";
const FetchData = () => {

    const [data, setData] = useState(null);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetch('https://api.rawg.io/api/games?key=1118413f30d3421eb485bf2a930ea5ac&page_size=50&&genres=action,strategy,shooter,adventure,puzzle,sports,racing', {mode: 'cors'})
        .then((response) => {
            if (response.status >= 400) {
                throw new Error('server error')
            }
            return response.json()
        })
        .then((response) => setData(response))
        .catch((error) => setError(error))
        .finally(() => setLoading(false))
    },[])

    return { error, loading, data}
}

export function GameCard({game}) {

    const excludedPlatforms = [
        'Linux',
        'Xbox 360',
        'PlayStation 3',
        'PS Vita',
        'Wii U',
        'macOS',
        'Xbox Series S/X'
    ];

    const newPlatforms = game.platforms.filter((platform) => !excludedPlatforms.includes(platform.platform.name))

    console.log(game)
    console.log(game.platforms)
    return (
        <div className="game-card">
            <img className='game-img' src={game.background_image} alt="" height={50} width={50}/>
            <div className="game-info">
                <div className="cart-price-container">
                    <div className="add-to-cart">Add to cart +</div>
                    <div className="price">$4.99</div>
                </div>
                <div className="platforms-supported-container">
                    {newPlatforms.map((platform) => (
                        <div key={`${game.name}+${platform}`} className="platform-icon">{platform.platform.name}</div>
                        
                    ))}
                </div>
                <div className="game-title">{game.name}</div>
            </div>
        </div>
    )
}

export default function ShopPage() {
    const {error, loading, data} = FetchData()

    const games = data && data.results ? data.results : []

    return (
        <div className="main-container">
            <div className="section-one">
                <div className="filter-title">Filter Title</div>
                <label htmlFor="sort">Sort by:</label>
                <select name='sort' id="sort">
                    <option value="Popularity">Popularity</option>
                    <option value="Rating">Rating</option>
                    <option value="Newest">Sort by:</option>
                </select>
            </div>
            {loading && <div className="loading">Loading</div>}
            {error && <div className="error">Error has occured</div>}
            {!loading && !error && (
                <div className="section-two">
                    {games.map((game) => (
                        <GameCard key={game.name} game={game}/>
                    ))}
                </div>

            )}


        </div>
    )
} 
