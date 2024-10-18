import { useState } from 'react';
import './App.css'
import Banner from './components/banner'
import { Outlet } from 'react-router-dom';
import Cart from './components/cart';


function App() {
    const [cartShow, setCartShow] = useState(false)
    const [cart, modifyCart] = useState([])
    const [total, setTotal] = useState(0)

    return (
        <div className="app">

            <Banner setCartShow={setCartShow}/>
            <Outlet context={[cart, modifyCart, total, setTotal]} />
            {cartShow && (
                <Cart setCartShow={setCartShow} cartShow={cartShow} cart={cart} modifyCart={modifyCart} total={total} setTotal={setTotal}/>
            )}
        </div>
    )
}

export default App