//shows all items
//clear cart button
//checkout button nav if items, if not show shop button nav and 'you have no items in basket, shop here'
//close cart sidebar button
import { useState } from 'react'
import { useEffect } from 'react'
import '../styles/cart.css'

export default function Cart({setCartShow, cartShow}) {
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
                <span className="close-cart" onClick={() => toggleCart()}>Close</span>
                <div className="cart-info">You have X items in your cart</div>
            </div>
            <div className="cart-items"></div>
            <div className="bottom-container">
                <div className="subtotal">Subtotal</div>
                <button className="checkout">Checkout </button>
            </div>
        </div>
    )
}