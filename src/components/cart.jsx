//shows all items
//clear cart button
//checkout button nav if items, if not show shop button nav and 'you have no items in basket, shop here'
//close cart sidebar button
import { useState } from 'react'
import { useEffect } from 'react'
import '../styles/cart.css'
import { Link } from 'react-router-dom'


export default function Cart({setCartShow, cartShow, cart, modifyCart}) {

    const removeGame = (game) => {
        const newCart = cart.filter((existingGame) => existingGame !== game)
        modifyCart(newCart)
    }

    const [visible, setVisible] = useState(false)

    const toggleCart = () => {
        if (visible) {
            setVisible(false)
            setTimeout(() => {
                setCartShow(false)
            }, 500);
        } else {
            setCartShow(true)
            setVisible(true)
        }
    }

    useEffect(() => {
        if (cartShow) {
            setVisible(true)
        } else {
            setTimeout(() => {
                setVisible(false)
            }, 500)
        }
    }, [cartShow]);

    return (
        <div className={`cart-container ${visible ? 'show' : 'hide'}`}>
            <div className="top-container">
                <div className="cart-title">Your Cart</div>
                <div className="clear-all" onClick={() => modifyCart([])}>Clear All</div>
                <span className="close-cart" onClick={() => toggleCart()}>Close</span>
            </div>
            <div className="cart-items">
                {cart.length  > 0 ? (
                    cart.map((game) => (
                        <div key={game.name} className='cart-game'>
                            <li key={game.name}>
                                <div className="cart-game-delete" onClick={() => removeGame(game)}>X</div>
                                <img className='cart-game-image' src={game.background_image} alt="game image" height={120} width={180}/>
                                <div className="cart-game-info">
                                    <div className='cart-game-name'>{game.name}</div>
                                    <div className='cart-game-price'>$4.99</div>
                                </div>
                            </li>
                        </div>
                    ))
                ) : (
                    <div className="no-items">You have no items in your cart...</div>
                )}
            </div>
            <div className="bottom-container">
                <div className="subtotal">Subtotal:</div>
                <Link to="/checkout" className="checkout">Checkout Securely</Link>
            </div>
        </div>
    )
    //if cart is empty return no items div
    //if cart return a map of cart details in list
}