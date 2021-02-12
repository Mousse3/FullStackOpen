import React from 'react'
import Paragraph from './Paragraph'
import ShowCountry from './ShowSingleCountry'

const Countries = ({ numberCountries, countriesArray }) => {
    
    if (numberCountries > 10) {
        return(
            <Paragraph body='Too many matches, specify another filter' />
        )
    }
    else if (numberCountries === 1) {
        return(
            <ShowCountry country={countriesArray[0]} />
        )
    }
    else {
        return(
            countriesArray.map(country => (
                <>
                    <Paragraph body={country.name} />
                </>
            ))
        )
    }
}

export default Countries