//sidebar component
//main page of games component
//states that will be used between both children components here
import ShopPage from "./shopPage"
import Sidebar from "./shopSidebar"
import '../styles/shop.css'
import { useState } from "react"

export default function Shop() {
    const [currentFilter, setCurrentFilter] = useState('all-time')
    return (
        <div className="store-container">
            <Sidebar currentFilter={currentFilter} setCurrentFilter={setCurrentFilter}/>
            <ShopPage currentFilter={currentFilter}/>
        </div>
        
    )
}