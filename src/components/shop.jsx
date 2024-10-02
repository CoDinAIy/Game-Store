//sidebar component
//main page of games component
//states that will be used between both children components here
import ShopPage from "./shopPage"
import Sidebar from "./shopSidebar"
import '../styles/shop.css'

export default function Shop() {
    ShopPage()
    return (
        <div className="store-container">
            <Sidebar/>
            <ShopPage/>
        </div>
        
    )
}