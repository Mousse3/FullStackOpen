import React from 'react'

const Filter = ( { filter, filterHandler }) => {

    return(
        <div>
            Filter: <input value={filter} onChange={filterHandler}/>
        </div>
    )
}

export default Filter
