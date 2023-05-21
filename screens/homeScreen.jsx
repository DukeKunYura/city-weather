import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { setCity, setId } from '../src/redux/masterSlice';
import useGetCityWeather from '../src/hooks/useGetCityWeather';

export default function homeScreen() {
    const state = useSelector((state) => state.master);
    const [inputCity, setInputCity] = useState("");
    const [inputId, setInputId] = useState("");

    const { execute, status, value, error } = useGetCityWeather(getWeather, state.city, state.id, false);
    const dispatch = useDispatch();

    async function getWeather(city, id) {
        const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&APPID=${id}`;
        return await fetch(url).then((res) => res.json())
    }

    const handleChangeCity = () => {
        dispatch(setCity(inputCity));
        setInputCity("");
    }

    const handleChangeId = () => {
        dispatch(setId(inputId));
        setInputId("");
    }

    useEffect(() => {
        execute();
    }, [state.city, state.id]);


    return (
        <>
            <div className='id'>
                <div className="field has-addons">
                    <p className="control">
                        <input
                            className="input"
                            placeholder="input id"
                            value={inputId}
                            onChange={(e) => { setInputId(e.target.value) }} />
                    </p>
                    <p className="control">
                        <button className="button" onClick={handleChangeId}>Submit</button>
                    </p>
                </div>
            </div>
            <div>
                {status === "success" && <img src={`https://openweathermap.org/img/wn/${value.weather[0].icon}@2x.png`}></img>}
            </div>
            <div className="title-one">{state.city}</div>
            <div className='cityInput'>
                <div className="field has-addons">
                    <p className="control">
                        <input
                            className="input"
                            placeholder="input city"
                            value={inputCity}
                            onChange={(e) => { setInputCity(e.target.value) }} />
                    </p>
                    <p className="control">
                        <button className="button" onClick={handleChangeCity}>Change CITY</button>
                    </p>
                </div>
            </div>
            <br />
            <div className='title-two'>{"Temperature "}{status === "success" && parseFloat((value.main.temp - 273.15).toFixed(1))}&#8451;</div>
            <br />
            <div className='title-three'>
                {"Feels like "}{status === "success" && parseFloat((value.main.feels_like - 273.15).toFixed(1))}&#8451;
            </div>
            <br />
            <div className='title-three'>
                {"Pressure "}{status === "success" && value.main.pressure}
            </div>
            <div className='title-three'>
                {"Humidity "}{status === "success" && value.main.humidity + "%"}
            </div>
            <div className='title-three'>
                {"Wind speed "}{status === "success" && value.wind.speed + " m/sec"}
            </div>
        </>

    )
}
