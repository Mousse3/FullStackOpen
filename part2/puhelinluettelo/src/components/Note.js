import React from 'react'

const Note = ({ notes }) => {
    return(
        notes.map(noteItem => (
            <li key={noteItem.name}>
                {noteItem.name} {noteItem.number}
            </li>
        ))
    )
}

export default Note