import React from 'react'
import axios from 'axios'

const getWeather = ({ country }) => {

    const api_key = process.env.REACT_APP_API_KEY
    const query = country.capital
    const string = `http://api.weatherstack.com/current?access_key=${api_key}&query=${query}`

    axios
        .get(string)
        .then(response => {
        return(response.data)
    })
}

export default getWeather