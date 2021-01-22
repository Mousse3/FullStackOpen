import React from 'react'
import generateKey from './GenerateKey'

const Header = ({ course }) => {
	return(
		<h1 key={generateKey(course)}>{course}</h1>
	)
}

export default Header