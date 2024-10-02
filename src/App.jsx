import { useState } from 'react';
import './App.css'
import Banner from './components/banner'
import { Outlet } from 'react-router-dom';
import Cart from './components/cart';


function App() {
    const [cartShow, setCartShow] = useState(false)
    return (
        <div className="app">

            <Banner setCartShow={setCartShow}/>
            <Outlet/>
            {cartShow && (
                <Cart setCartShow={setCartShow} cartShow={cartShow}/>
            )}
        </div>
    )
}

export default App
