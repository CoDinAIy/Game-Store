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
import { useOutletContext } from 'react-router-dom'

import { useState, useEffect } from "react";

const FetchData = ({currentFilter, sort}) => {

    const [data, setData] = useState(null);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);
    const currentYear = new Date().getFullYear()
    const startDate = `${currentYear}-01-01`
    const endDate = `${currentYear}-12-31`

    const randomPrice = () => {
        const gamePrices = [2.99, 5.50, 6.90, 4.99, 3.50, 8.50];
        return gamePrices[Math.floor(Math.random() * gamePrices.length)];
    }


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
        fetch(url, { mode: 'cors' })
            .then((response) => {
                if (response.status >= 400) {
                    throw new Error('server error');
                }
                return response.json();
            })
            .then((response) => {
                const gamesWithPrices = response.results.map(game => ({
                    ...game,
                    price: randomPrice()
                }));
                setData({ ...response, results: gamesWithPrices });
            })
            .catch((error) => setError(error))
            .finally(() => setLoading(false));
    }, [url]);

    return { error, loading, data };
}



export function GameCard({game, setSelectedGame, setScreenshots, screenshots, selectedGame, UpdateCart}) {
    
    const [cart, modifyCart, total, setTotal] = useOutletContext();

    const clickedGame = (game, setSelectedGame) => {
        const id = game.id

        const fetchData = async() => {
            try {
                const gameResponse = await fetch(`https://api.rawg.io/api/games/${id}?key=1118413f30d3421eb485bf2a930ea5ac`, { mode: 'cors' })
                if (gameResponse.status >= 400) {
                    throw new Error('Server error')
                }
                const gameData = await gameResponse.json()
                const price = game.price
                setSelectedGame({...gameData, price})
                setScreenshots([gameData.background_image])

                const screenshotsResponse = await fetch(`https://api.rawg.io/api/games/${id}/screenshots?key=1118413f30d3421eb485bf2a930ea5ac`, { mode: 'cors' })
                if (screenshotsResponse.status >= 400) {
                    throw new Error('Server error')
                }
                const screenshotsData = await screenshotsResponse.json()
                setScreenshots((prev) => [prev, ...screenshotsData.results.map((result) => result.image)])

          } catch (error) {
            console.log(error)
          }
        }

        fetchData()

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

    const isGameInCart = cart.some((cartGame) => cartGame.id === game.id)


    return (
        <div className="game-card">
            <img className='game-img' src={game.background_image} alt="" onClick={() => clickedGame(game, setSelectedGame)}/>
            <div className="game-info">
                <div className="cart-price-container">
                {!isGameInCart ? (
                    <div className="add-to-cart" onClick={() => UpdateCart(game)}>Add to Cart +</div>
                ) : (
                    <div className="added-to-cart">Added to Cart</div>
                )}                    
                <div className="game-card-price">{`$${game.price.toFixed(2)}`}</div>
                </div>
                <div className="platforms-supported-container">
                    {newPlatforms ? newPlatforms.map((platform) => (
                        <img key={platformIcon[platform.platform.name]} src={platformIcon[platform.platform.name]} alt="" width='20px' height='20px' />                        
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
    const [currentSlide, setCurrentSlide] = useState(0)
    const [cart, modifyCart, total, setTotal] = useOutletContext();
    const [sort, setSort] = useState('')

    const {error, loading, data} = FetchData({currentFilter, sort})

    let games = data && data.results ? data.results : []

    const closeClickedGame = () => {
        setSelectedGame(null)
        setScreenshots(null)
    }

    const setSorted = (type) => {
        setSort(type)
    }

    const nextSlide = () => {
        setCurrentSlide((prev) => (prev + 1) % screenshots.length) 
    }

    const previousSlide = () => {
        setCurrentSlide((prev) => (prev - 1 + screenshots.length) % screenshots.length);
    }

    const UpdateCart = (game) => {
        console.log(game.price)
        if (!isGameInCart) {
            modifyCart((prev) => [...prev, game])
            setTotal((prev) => prev + game.price);
            console.log(cart)
            console.log(total)
        }
    };

    let isGameInCart

    selectedGame ? isGameInCart = cart.some((cartGame) => cartGame.id === selectedGame.id) : null

    const [selectedOption, setSelectedOption] = useState('Popularity')
    
    const Dropdown = () => {
        const [isOpen, setIsOpen] = useState(false)
        
        const toggleDropdown =() => {
            setIsOpen((prev) => !prev)
        }
        
        const handleOption = (option, e) => {
            e.stopPropagation(); // Prevent the click event from propagating to the parent container
            setIsOpen(false)
            setSelectedOption(option)
            setSorted(option)
        }

        return (
            <div className={`dropdown-container ${isOpen ? "active" : ""}`} onClick={toggleDropdown}>
              <div className="selected">{selectedOption}</div>
              {isOpen && (
                <ul className="options">
                  <li onClick={(e) => handleOption("Popularity", e)}>Popularity</li>
                  <li onClick={(e) => handleOption("Rating", e)}>Rating</li>
                  <li onClick={(e) => handleOption("Newest", e)}>Newest</li>
                </ul>
              )}
            </div>
          );

}

    return (
        <div className="main-container">
            <div className="section-one">
                <div className="filter-title">{title}</div>
                <div className="sort-container">
                    <div className="sort-title">Sort By:</div>
                    <Dropdown current = {selectedOption}/>
                </div>
            </div>

            {loading && <div className="loading">Loading</div>}

            {error && <div className="error">Error has occured</div>}

            {!loading && !error && (
                <div className="section-two">
                    {games.map((game) => (
                        <GameCard key={game.name} game={game} selectedGame={selectedGame} setSelectedGame={setSelectedGame} setScreenshots={setScreenshots} screenshots={screenshots} UpdateCart={UpdateCart}/>
                    ))}
                </div>

            )}

            {selectedGame && (
                <div className='clicked-game-container'>
                    <div className="clicked-game-content">
                        <div className="carousel">
                            <button className="carousel-button prev" onClick={previousSlide}>&#8592;</button>
                            <button className="carousel-button next" onClick={nextSlide}>&#8594;</button>
                            <ul className='carousel-slides'>
                                {screenshots ? screenshots.map((screenshot, index) => (
                                <li key={index} className={`slide ${index === currentSlide ? 'active' : ''}`}>
                                    <img className='clicked-game-image' src={screenshot} alt='game picture' />
                                </li>
                                )) : null}
                            </ul>
                        </div>
                        <div className="clicked-game-info">
                            <div className="close-clicked-game" onClick={() => closeClickedGame()}>Close</div>
                            <div className="clicked-game-name">{selectedGame.name}</div>
                            <hr />
                            <div className="clicked-about-container">
                                <div className="about-title">About</div>
                                {!selectedGame.description_raw ? <div className='loading-about'>Loading</div> : <div className="about">{selectedGame.description_raw}</div>}
                            </div>
                            <hr />
                            <div className="game-facts">
                                <div className="released">Released: {selectedGame.released ? `${selectedGame.released.slice(8,10)}/${selectedGame.released.slice(5,7)}/${selectedGame.released.slice(0,4)}` : 'N/A'}</div>
                                <div className="rating">Rating: {selectedGame.rating}</div>
                                <div className="platforms">Platforms: {selectedGame.platforms.map((platform, index) => index === selectedGame.platforms.length - 1 ? platform.platform.name : `${platform.platform.name}, `)}</div>
                                <div className="genres">Genres: {selectedGame.genres.map((genre, index) => index === selectedGame.genres.length - 1 ? genre.name : `${genre.name}, `)}</div>
                                <div className="publishers">Publishers: {selectedGame.publishers.map((publisher, index) => index === selectedGame.publishers.length - 1 ? publisher.name : `${publisher.name}, `)}</div>
                            </div>
                            {!isGameInCart ? (
                                <button className='clicked-game-button' onClick={() => UpdateCart(selectedGame)}>Add to cart</button>                            
                            ) : (
                                <button className="clicked-added-to-cart">Added to Cart</button>
                            )}  
                        </div>
                    </div>
                </div> 
            )}
        </div>
    )
} 
