import React, { useState } from 'react'
import Header from './Header'
import axios from 'axios'
import './style.css'

const ShowCountry = ({ country }) => {
    const [ weather, setWeather] = useState(undefined)

    const flagImgSrc = country.flag

    const api_key = process.env.REACT_APP_API_KEY
    const query = country.capital
    const string = `http://api.weatherstack.com/current?access_key=${api_key}&query=${query}`

    if (weather === undefined) {
        axios
            .get(string)
            .then(response => {
            setWeather(response.data)
        })
    }
    
    if (weather === undefined) {
        return ( <div>loading...</div>)
    } else {
        if(api_key === undefined) {
            return( <div>invalid api key</div>)
        }
        return(
            <>
                <Header header={country.name} />
                <p>
                    Capital: {country.capital}
                </p>
                <p>
                    Population: {country.population}
                </p>
                <h3>
                    Languages
                </h3>
                
                {country.languages.map(language => (
                    <li key={language.name}>
                        {language.name}
                    </li>
                ))}

                <img src={flagImgSrc} className="Flag" alt=''/>
                
                <h3>
                    Weather in {country.capital}
                </h3>
                
                <b>Temperature: </b>  {weather.current.temperature} Celsius
                <p></p>
                <img src={weather.current.weather_icons[0]} />
                <p></p>
                <b>Wind: </b> {weather.current.wind_speed} mph towards {weather.current.wind_dir}
            </>
        )
    }
}

export default ShowCountry