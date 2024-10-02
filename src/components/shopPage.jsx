//fetches and displays all games by default
//takes in filter and updates according to filter
//for each filter title of filter followed by select sort by form option which sorts accordingly
import '../styles/shopPage.css'

import { useState, useEffect } from "react";
const FetchData = () => {

    const [data, setData] = useState(null);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetch('https://api.rawg.io/api/games?key=1118413f30d3421eb485bf2a930ea5ac&dates=2024-01-01,2024-09-30', {mode: 'cors'})
        .then((response) => {
            if (response.status >= 400) {
                throw new Error('server error')
            }
            return response.json()
        })
        .then((response) => setData(response))
        .catch((error) => setError(error))
        .finally(() => setLoading(false))
    },[])

    console.log(data)

    return { error, loading, data}
}

export default function ShopPage() {
    const {error, loading, data} = FetchData()
    console.log(data)

    return (
        <div className="main-container">Games n shit </div>
    )
} 
