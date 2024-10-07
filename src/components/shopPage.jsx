//fetches and displays all games by default
//takes in filter and updates according to filter
//for each filter title of filter followed by select sort by form option which sorts accordingly
import '../styles/shopPage.css'
import PC from '../assets/PC.png'
import Xbox from '../assets/Xbox.png'
import iOS from '../assets/iOS.png'
import Android from '../assets/Android.png'
import Playstation from '../assets/Playstation.png'
import Nintendo from '../assets/Nintendo.png'

import { useState, useEffect } from "react";
const FetchData = ({currentFilter, sort}) => {

    console.log(`sort = ${sort}`)

    //have sort parameter
    //depending on sort param add sort query to end of url

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
    

    let url

    if (sort === 'Popularity') {
        url = filters[currentFilter]
    } else if (sort === 'Rating') {
        url = `${filters[currentFilter]}&&ordering=-rating`
    } else if (sort === 'Newest') {
        url = `${filters[currentFilter]}&&ordering=-released`
    } else {
        url = filters[currentFilter]
    }

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


fetch('https://api.rawg.io/api/platforms?key=1118413f30d3421eb485bf2a930ea5ac', {mode: 'cors'})
  .then(response => {
    if (!response.ok) {
      throw new Error('Network response was not ok')
    }
    return response.json()
  })
  .then(data => {
    console.log(data)
  })
  .catch(error => {
    console.error('There has been a problem with your fetch operation:', error)
  });


    return { error, loading, data}
}

function UpdateCart(game) {
    console.log(game)
}


export function GameCard({game, setSelectedGame, setScreenshots, screenshots}) {
    

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
                .then((response) => setSelectedGame(response))
                .catch((error) => console.error(error));


    }


    const includedPlatforms = [
        'PC',
        'Xbox One',
        'PlayStation 5',
        'Nintendo Switch',
        'iOS',
        'Android',
    ];

    const platformIcon = {
        'PC': PC,
        'Xbox One': Xbox,
        'Android': Android,
        'iOS': iOS,
        'PlayStation 5': Playstation,
        'PlayStation 4': Playstation,
        'Nintendo Switch': Nintendo

    }

    const newPlatforms = game.platforms ? game.platforms.filter((platform) => includedPlatforms.includes(platform.platform.name)) : null

    console.log(newPlatforms)


    return (
        <div className="game-card">
            <img className='game-img' src={game.background_image} alt="" onClick={() => clickedGame(game, setSelectedGame)}/>
            <div className="game-info">
                <div className="cart-price-container">
                    <div className="add-to-cart" onClick={() => UpdateCart(game)}>Add to cart +</div>
                    <div className="price">$4.99</div>
                </div>
                <div className="platforms-supported-container">
                    {newPlatforms ? newPlatforms.map((platform) => (
                        <>
                        
                        <img src={platformIcon[platform.platform.name]} alt="" width='20px' height='20px' />
                        </>
                        
                    )) : null}
                </div>
                <div className="game-title" onClick={() => clickedGame(game, setSelectedGame)}>{game.name} </div>
            </div>
        </div>
    )
}



export default function ShopPage({currentFilter, title}) {
    const [selectedGame, setSelectedGame] = useState(null)
    const [screenshots, setScreenshots] = useState(null)
    const [sort, setSort] = useState('')

    const {error, loading, data} = FetchData({currentFilter, sort})

    let games = data && data.results ? data.results : []

    const closeClickedGame = () => {
        setSelectedGame(null)
        setScreenshots(null)
    }

    const setSorted = (type) => {
        setSort(type)
        console.log(type)
    }

    return (
        <div className="main-container">
            <div className="section-one">
                <div className="filter-title">{title}</div>
                <div className="sort">
                    <label className='sort-label' htmlFor="sort">Sort by:</label>
                    <select className='sort-select' name='sort' id="sort" onChange={(e) => setSorted(e.target.value)}>
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
                        <GameCard key={game.name} game={game} setSelectedGame={setSelectedGame} setScreenshots={setScreenshots} screenshots={screenshots}/>
                    ))}
                </div>

            )}

            {selectedGame && (
                <div className='clicked-game-container'>
                    <div className="clicked-game-content">
                        <img className='clicked-game-image' src={selectedGame.background_image} alt="game image" />
                        <div className="clicked-game-info">
                            <div className="close-clicked-game" onClick={() => closeClickedGame()}>Close</div>
                            <div className="clicked-game-name">{selectedGame.name}</div>
                            <div className="about-container">
                                <div className="about-title">About</div>
                                {!selectedGame.description_raw ? <div className='loading-about'>Loading</div> : <div className="about">{selectedGame.description_raw}</div>}
                            </div>
                            <div className="game-facts">
                                <div className="released">Released: {selectedGame.released ? `${selectedGame.released.slice(8,10)}/${selectedGame.released.slice(5,7)}/${selectedGame.released.slice(0,4)}` : 'N/A'}</div>
                                <div className="rating">Rating: {selectedGame.rating}</div>
                                <div className="platforms">Platforms: {selectedGame.platforms.map((platform, index) => index === selectedGame.platforms.length - 1 ? platform.platform.name : `${platform.platform.name}, `)}</div>
                                <div className="genres">Genres: {selectedGame.genres.map((genre, index) => index === selectedGame.genres.length - 1 ? genre.name : `${genre.name}, `)}</div>
                                <div className="publishers">Publishers: {selectedGame.publishers.map((publisher, index) => index === selectedGame.publishers.length - 1 ? publisher.name : `${publisher.name}, `)}</div>
                            </div>
                        </div>
                    </div>
                </div> 
            )}
        </div>
    )
} 
