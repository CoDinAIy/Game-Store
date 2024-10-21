// Home.js
import '../styles/home.css';
import background from '../assets/background.jpg';
import React from 'react';
import { useNavigate } from 'react-router-dom';

export default function Home() {
    const navigate = useNavigate()

    const goToShop = () => {
        navigate('/shop'); // Replace '/shop' with your desired route
    }
    return (
        <div className="home-container">
            <img className="home-image" src={background} alt="background image for home" />
            <div className="home-information">
                <h1 className='home-title'>Game Store</h1>
                <p className='home-description'>Welcome to the ultimate gaming experience. Browse our collection and get your favorite games now!</p>
                <button className="shop-button" onClick={() => goToShop()}>Shop Now</button>
            </div>
        </div>
    );
}
