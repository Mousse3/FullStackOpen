import React, { useState } from 'react'
import Note from './Note'
import Filter from './Filter'
import PersonForm from './PersonForm'

const App = () => {
    const [persons, setPersons] = useState([
        { name: 'Arto Hellas', number: '040-123456' },
        { name: 'Ada Lovelace', number: '39-44-5323523' },
        { name: 'Dan Abramov', number: '12-43-234345' },
        { name: 'Mary Poppendieck', number: '39-23-6423122' }
      ])
  const [ newName, setNewName ] = useState('')
  const [ newNumber, setNewNumber ] = useState('')
  const [ filter, setFilter] = useState('')

  const notesToShow = filter === ''
      ? persons
      : persons.filter(person => person.name.includes(filter))

  const addNote = (e) => {
    e.preventDefault()
    if(persons.some(person => person.name === newName)) {
        alert(`${newName} is already added to phonebook`)
    }
    else {
        const personObject = {
            name: newName ,
            number: newNumber
        }
        setPersons(persons.concat(personObject))
        setNewName('')
        setNewNumber('')
    }
  }

  const handleNameChange = (e) => {
      console.log(e.target.value)
      setNewName(e.target.value)
  }

  const handleNumberChange = (e) => {
    console.log(e.target.value)
    setNewNumber(e.target.value)
  }

  const handleFilterChange = (e) => {
    console.log(e.target.value)
    setFilter(e.target.value)
  }

  return (
    <div>
        <h2>Phonebook</h2>
        <Filter filter={filter} filterHandler={handleFilterChange} />
        <h2>Add a new contact</h2>
        <PersonForm noteAdder={addNote} nameHandler={handleNameChange} numberHandler={handleNumberChange}
                    number={newNumber} name={newName}/>
        <h2>Numbers</h2>
        <Note notes={notesToShow} />
    </div>
  )
}

export default App