import React from 'react'
import DeleteNumber from './DeleteNumber'

const Note = ({ notes }) => {
    return(
        notes.map(noteItem => (
            <li key={noteItem.name}>
                {noteItem.name} {noteItem.number} 
                <button onClick={() => DeleteNumber.removeNumber(noteItem.id, noteItem.name)}>Delete</button>
            </li>
        ))
    )
}

export default Note