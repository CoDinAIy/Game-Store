//title
//home shop and about navigations which render when clicked
//cart button which slides cart sidebar out
import '../styles/banner.css'
import cart from '../assets/cart.svg'
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

export default function Banner(setCartShow) {
    
    const toggleCart = ({setCartShow}) => {
        setCartShow(prev => !prev)
    }
    
    const navigate = useNavigate()
    const goToHome = () => {
        navigate('/')
    }

    return (
        <div className='banner'>
            <div className='title' onClick={goToHome}>
                GameStore
            </div>
            <div className='navigation'>
                <Link to="/" className="home">Home</Link>
                <Link to="/shop" className="store">Store</Link>
                <Link to="/about" className="about-banner">About</Link>
            </div>
            <div className="cart" onClick={() => toggleCart(setCartShow)}>
                <img src={cart} alt="cart" width='40' height='40'/>
            </div>
        </div>
    )
}