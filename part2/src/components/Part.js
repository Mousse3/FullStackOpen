import React from 'react'

const Part = ({ name, exercises, index }) => {
	return(
		<p key={index}>
			{name} {exercises}
		</p>
	)
}

export default Part