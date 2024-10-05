//fetches and displays all games by default
//takes in filter and updates according to filter
//for each filter title of filter followed by select sort by form option which sorts accordingly
import '../styles/shopPage.css'

import { useState, useEffect } from "react";
const FetchData = ({currentFilter}) => {

    const [data, setData] = useState(null);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);

    const currentYear = new Date().getFullYear()
    const startDate = `${currentYear}-01-01`
    const endDate = `${currentYear}-12-31`

    const filters = {
        'all-time': 'https://api.rawg.io/api/games?key=1118413f30d3421eb485bf2a930ea5ac&page_size=50&&genres=action,strategy,shooter,adventure,puzzle,sports,racing,role-playing-games-rpg',
        'this-year': `https://api.rawg.io/api/games?key=1118413f30d3421eb485bf2a930ea5ac&page_size=50&dates=${startDate},${endDate}`,
        'pc': 'https://api.rawg.io/api/games?key=1118413f30d3421eb485bf2a930ea5ac&page_size=50&&platforms=4&&genres=action,strategy,shooter,adventure,puzzle,sports,racing',
        'playstation': 'https://api.rawg.io/api/games?key=1118413f30d3421eb485bf2a930ea5ac&page_size=50&&platforms=187,18&&genres=action,strategy,shooter,adventure,puzzle,sports,racing',
        'xbox': 'https://api.rawg.io/api/games?key=1118413f30d3421eb485bf2a930ea5ac&page_size=50&&platforms=1&&genres=action,strategy,shooter,adventure,puzzle,sports,racing',
        'nintendo': 'https://api.rawg.io/api/games?key=1118413f30d3421eb485bf2a930ea5ac&page_size=50&&platforms=7&&genres=action,strategy,shooter,adventure,puzzle,sports,racing',
        'ios': 'https://api.rawg.io/api/games?key=1118413f30d3421eb485bf2a930ea5ac&page_size=50&&platforms=3&&genres=action,strategy,shooter,adventure,puzzle,sports,racing',
        'android': 'https://api.rawg.io/api/games?key=1118413f30d3421eb485bf2a930ea5ac&page_size=50&&platforms=21&&genres=action,strategy,shooter,adventure,puzzle,sports,racing',
        'action': 'https://api.rawg.io/api/games?key=1118413f30d3421eb485bf2a930ea5ac&page_size=20&&genres=action',
        'strategy': 'https://api.rawg.io/api/games?key=1118413f30d3421eb485bf2a930ea5ac&page_size=20&&genres=strategy',
        'rpg': 'https://api.rawg.io/api/games?key=1118413f30d3421eb485bf2a930ea5ac&page_size=20&&genres=role-playing-games-rpg',
        'shooter': 'https://api.rawg.io/api/games?key=1118413f30d3421eb485bf2a930ea5ac&page_size=20&&genres=shooter',
        'adventure': 'https://api.rawg.io/api/games?key=1118413f30d3421eb485bf2a930ea5ac&page_size=20&&genres=adventure',
        'puzzle': 'https://api.rawg.io/api/games?key=1118413f30d3421eb485bf2a930ea5ac&page_size=20&&genres=puzzle',
        'racing': 'https://api.rawg.io/api/games?key=1118413f30d3421eb485bf2a930ea5ac&page_size=20&&genres=racing',
        'sports': 'https://api.rawg.io/api/games?key=1118413f30d3421eb485bf2a930ea5ac&page_size=20&&genres=sports'
    };
    

    let url = filters[currentFilter]

    useEffect(() => {
        fetch(url, {mode: 'cors'})
        .then((response) => {
            if (response.status >= 400) {
                throw new Error('server error')
            }
            return response.json()
        })
        .then((response) => setData(response))
        .catch((error) => setError(error))
        .finally(() => setLoading(false))
    },[url])

    return { error, loading, data}
}


export function GameCard({game, setSelectedGame, setScreenshots, setDescription, screenshots, description}) {
    

    const clickedGame = (game, setSelectedGame) => {
        const id = game.id

        fetch(`https://api.rawg.io/api/games/${id}/screenshots?key=1118413f30d3421eb485bf2a930ea5ac`, { mode: 'cors' })
        .then((response) => {
                if (response.status >= 400) {
                        throw new Error('Server error');
                    }
                    return response.json();
                })
                .then((response) => setScreenshots(response.results))
                .catch((error) => console.error(error));

        fetch(`https://api.rawg.io/api/games/${id}?key=1118413f30d3421eb485bf2a930ea5ac`, { mode: 'cors' })
        .then((response) => {
                if (response.status >= 400) {
                        throw new Error('Server error');
                    }
                    return response.json();
                })
                .then((response) => setDescription(response.description_raw))
                .catch((error) => console.error(error));

        setSelectedGame(game)
        console.log(screenshots)
        console.log(description)
    }


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

    return (
        <div className="game-card">
            <img className='game-img' src={game.background_image} alt="" height={50} width={50} onClick={() => clickedGame(game, setSelectedGame)}/>
            <div className="game-info">
                <div className="cart-price-container">
                    <div className="add-to-cart">Add to cart +</div>
                    <div className="price">$4.99</div>
                </div>
                <div className="platforms-supported-container">
                    {newPlatforms.map((platform) => (
                        <div key={`${game.name}+${platform.platform.name}`} className="platform-icon">{platform.platform.name}</div>
                        
                    ))}
                </div>
                <div className="game-title" onClick={() => clickedGame(game, setSelectedGame)}>{game.name} </div>
            </div>
        </div>
    )
}



export default function ShopPage({currentFilter}) {
    const [selectedGame, setSelectedGame] = useState(null)
    const [screenshots, setScreenshots] = useState(null)
    const [description, setDescription] = useState(null)

    const {error, loading, data} = FetchData({currentFilter})

    const games = data && data.results ? data.results : []

    const closeClickedGame = () => {
        setSelectedGame(null)
        setScreenshots(null)
        setDescription(null)
    }

    return (
        <div className="main-container">
            <div className="section-one">
                <div className="filter-title">Filter Title</div>
                <div className="sort">
                    <label className='sort-label' htmlFor="sort">Sort by:</label>
                    <select className='sort-select' name='sort' id="sort">
                        <option value="Popularity">Popularity</option>
                        <option value="Rating">Rating</option>
                        <option value="Newest">Newest</option>
                    </select>
                </div>
            </div>
            {loading && <div className="loading">Loading</div>}
            {error && <div className="error">Error has occured</div>}
            {!loading && !error && (
                <div className="section-two">
                    {games.map((game) => (
                        <GameCard key={game.name} game={game} setSelectedGame={setSelectedGame} setScreenshots={setScreenshots} setDescription={setDescription} screenshots={screenshots} description={description}/>
                    ))}
                </div>

            )}
            {selectedGame && (
                <div className='clicked-game-container'>
                    <div className="clicked-game-content">
                        <img className='clicked-game-image' src={selectedGame.background_image} alt="game image" />
                        <div className="clicked-game-info">
                            <div className="close-clicked-game" onClick={() => closeClickedGame()}>Close</div>
                            <div className="cilcked-game-name">{selectedGame.name}</div>
                            <div className="about-container">
                                <div className="about-title">About</div>
                                <div className="about">Lorem ipsum dolor sit amet consectetur adipisicing elit. Ab fugiat, illo labore placeat nulla quidem consequatur doloremque in ipsa debitis magnam, assumenda magni obcaecati nesciunt maxime odio voluptates, et itaque.</div>
                            </div>
                        </div>
                    </div>
                </div> 
            )}
        </div>
    )
} 
