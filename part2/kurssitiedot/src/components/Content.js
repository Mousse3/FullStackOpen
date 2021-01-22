import React from 'react'
import Part from './Part'
import generateKey from './GenerateKey'

const Content = ({ parts, id }) => {
    const total = parts.reduce((acc, current) => {
        return {exercises: acc.exercises + current.exercises}
        }
    )
    return ([
        parts.map((element) => (
            <Part key={generateKey(element.name)} name={element.name} exercises={element.exercises} />
        )), 
        <p key={generateKey(total)}>Total of {total.exercises} exercises</p>
    ])  
}

export default Content