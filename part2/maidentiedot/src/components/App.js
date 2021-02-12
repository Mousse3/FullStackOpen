import React, { useState, useEffect} from 'react'
import axios from 'axios'
import Paragraph from './Paragraph'
import Filter from './Filter'
import Countries from './Countries'

const App = () => {
    const [ filter, setFilter ] = useState('')
    const [ countries, setCountries ] = useState([])

    useEffect(() => {
        if (countries.length === 0) {
            axios
            .get('https://restcountries.eu/rest/v2/all')
            .then(response => {
                setCountries(response.data)
            })
            console.log('requested countries')
        }
      }, [])

      
    const countriesToShow = filter === ''
      ? countries
      : countries.filter(country => country.name.includes(filter))

    const handleFilterChange = (e) => {
        setFilter(e.target.value)
    }
    
    return(
        <div>
            <Paragraph body='Find countries' />
            <Filter filter={filter} filterHandler={handleFilterChange} />
            <Countries numberCountries={countriesToShow.length} countriesArray={countriesToShow} />
        </div>
    )
    
}

export default App