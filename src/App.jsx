import './App.css'
import Banner from './components/banner'
import { Outlet } from 'react-router-dom';


function App() {
    return (
        <div className="app">
            <Banner/>
            <Outlet/>
        </div>
    )
}

export default App
