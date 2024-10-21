//shows all items in basket
//shows total of all items and remove buttons
//confirm and pay button
import '../styles/checkout.css'
import { useOutletContext } from 'react-router-dom'
import { useEffect, useState } from 'react'

export default function Checkout() {

    
    const [ cart = [], modifyCart, total, setTotal ] = useOutletContext();
    const [currentCart, setCurrentCart] = useState(cart);
    
    useEffect(() => {
        setCurrentCart(cart);
    }, [cart]);

    const removeGame = (game) => {
        const newCart = cart.filter((existingGame) => existingGame !== game)
        modifyCart(newCart)
        setCurrentCart(newCart)
        let newTotal = 0
        modifyCart(newCart)
        newCart.map((game) => {
            newTotal += game.randomPrice
        })
        setTotal(newTotal)

        console.log(cart)
    }



    const confirmPayment = () => {
        alert('Order Confirmed! (This is a front-end application so no further action occurs)')
        modifyCart([])
        setTotal(0)
        
    }

    return (
        <div className="checkout-container">
            <div className="items-payment">
                <div className="items">
                    <div className="items-container">
                        <div className="price-checkout">{`$${total.toFixed(2)}`}</div>
                        <div className="checkout-header">
                            <div className="game">Your Cart</div>
                        </div>
                        <div className="checkout-games">
                        {currentCart.length  > 0 ? (
                            
                            currentCart.map((game) => (
                                <div key={game.name} className='checkout-game'>
                                    <img className='checkout-game-image' src={game.background_image} alt="game image" height={120} width={180}/>
                                    <div className="checkout-game-info">
                                        <div className='checkout-game-name'>{game.name}</div>
                                        <div className='checkout-game-price'>{game.price.toFixed(2)}</div>
                                        <div className="checkout-game-delete" onClick={() => removeGame(game)}>X</div>
                                    </div>
                                </div>
                            ))
                        ) : (
                            <div className="no-items">You have no items in your cart...</div>
                        )}
                        </div>
                        <div className="costs">
                            <div className="subtotal-checkout">{`Subtotal: $${total.toFixed(2)}`}</div>
                            <div className="delivery-cost">{total > 0 ? `Delivery: $5.00` : `Delivery:`}</div>
                            <div className="total-cost">{ total > 0 ? `Total: $${(total + 5).toFixed(2)}` : 'Total: $0'}</div>
                        </div>
    

                    </div>
                </div>
                <div className="payment">
                    <div className="payment-container">
                        <div className="personal-information">
                            <div className="personal-information-title">Personal Information</div>
                        <div className="form-group">
                            <label>Name:</label>
                            <input type="text" placeholder="Enter your name" />
                        </div>
                        <div className="form-group">
                            <label>Email:</label>
                            <input type="email" placeholder="Enter your email" />
                        </div>
                        </div>
                    <div className="shipping-information">
                        <div className="shipping-information-title">Shipping Information</div>
                        <div className="form-group">
                            <label>Address:</label>
                            <input type="text" placeholder="Enter your address" />
                        </div>
                        <div className="form-group">
                            <label>City:</label>
                            <input type="text" placeholder="Enter your city" />
                        </div>
                        <div className="form-group">
                            <label>Postal Code:</label>
                            <input type="text" placeholder="Enter your postal code" />
                        </div>
                        <div className="form-group">
                            <label>Country:</label>
                            <input type="text" placeholder="Enter your country" />
                        </div>
                    </div>
                    <button className="confirm-pay-button" onClick={cart.length > 0 ? () => confirmPayment() : () => alert('Add items in cart to checkout!')}>Pay</button>
                    </div>
                </div>
            </div>
        </div>

    )
}