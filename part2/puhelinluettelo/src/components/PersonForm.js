import React from 'react'

const PersonForm = ({ name, number, noteAdder, nameHandler, numberHandler}) => {
    return(
        <form onSubmit={noteAdder} >
            <div>
                name: <input value={name} onChange={nameHandler} />
            </div>
            <div>
                number: <input value={number} onChange={numberHandler} />
            </div>
            <div> 
                <button type="submit">add</button>
            </div>
        </form>
    )
}

export default PersonForm