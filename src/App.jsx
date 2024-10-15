import { useState } from 'react';
import './App.css'
import Banner from './components/banner'
import { Outlet } from 'react-router-dom';
import Cart from './components/cart';


function App() {
    const [cartShow, setCartShow] = useState(false)
    const [cart, modifyCart] = useState([])
    //cart and modifycart functionality
    //add cart to cart component
    //add modifycart to outlet?
    return (
        <div className="app">

            <Banner setCartShow={setCartShow}/>
            <Outlet context={[cart, modifyCart]}/>
            {cartShow && (
                <Cart setCartShow={setCartShow} cartShow={cartShow} cart={cart} modifyCart={modifyCart}/>
            )}
        </div>
    )
}

export default App
