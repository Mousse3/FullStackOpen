import React, { useState, useEffect } from 'react'
import Note from './Note'
import Filter from './Filter'
import PersonForm from './PersonForm'
import numberService from './ApiConnection'
import ModifyNumber from './ModifyNumber'
import Notification from './Notification'
import DeleteNumber from './DeleteNumber'

const App = () => {
  const [persons, setPersons] = useState([])
  const [ newName, setNewName ] = useState('')
  const [ newNumber, setNewNumber ] = useState('')
  const [ filter, setFilter] = useState('')
  const [ errorMessage, setErrorMessage] = useState('')

  useEffect(() => {
    numberService.getNumbers()
      .then(numbers => {
        setPersons(numbers)
      })
  }, []);

  const numbersToShow = filter === ''
      ? persons
      : persons.filter(person => person.name.includes(filter));

  const addNumber = (e) => {
    e.preventDefault()
    if(persons.some(person => person.name === newName)) {
        persons.some(person => {
          if(person.name === newName) {
            person.number = newNumber
            ModifyNumber.modifyNumber(person)
            setErrorMessage(`Kontaktin ${person.name} numero on muutettu`)
          }
        })
    } else {
        const personObject = {
            name: newName ,
            number: newNumber
        }
        numberService.create(personObject)
          .then(returnedNumber => {
            setPersons(persons.concat(returnedNumber))
            setNewNumber('')
            setNewName('')
            setErrorMessage(`Numero lisätty`)
            setTimeout(function() {
              setErrorMessage()
            }.bind(this), 4000)
          })
    }
  };

  const handleNameChange = (e) => {
      console.log(e.target.value)
      setNewName(e.target.value)
  };

  const handleNumberChange = (e) => {
    console.log(e.target.value)
    setNewNumber(e.target.value)
  };

  const handleFilterChange = (e) => {
    console.log(e.target.value)
    setFilter(e.target.value)
  };

  return (
    <div>
        <h2>Phonebook</h2>
        <Notification message={errorMessage} />
        <Filter filter={filter} filterHandler={handleFilterChange} />
        <h2>Add a new contact</h2>
        <PersonForm noteAdder={addNumber} nameHandler={handleNameChange} numberHandler={handleNumberChange}
                    number={newNumber} name={newName}/>
        <h2>Numbers</h2>
        {numbersToShow.map(noteItem => (
            <li key={noteItem.name}>
                {noteItem.name} {noteItem.number} 
                <button onClick={() => DeleteNumber.removeNumber(noteItem.id, noteItem.name, {setErrorMessage})}>Delete</button>
            </li>
        ))}
    </div>
  )
};

export default App