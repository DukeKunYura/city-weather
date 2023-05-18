import React, { useState, useEffect } from 'react';
import axios from "axios";

export default function homeScreen() {
    const [data, setData] = useState(null)
    async function getWeather() {
        const url = "https://api.openweathermap.org/data/2.5/weather?q=London,uk&APPID=5c37c7bfa486a842f133b83328b5bcb8"
        const response = await axios.get(url);
        setData(response.data);
    }
    useEffect(() => {
        getWeather();
    }, [])

    return (
        <div>homeScreen</div>
    )
}
