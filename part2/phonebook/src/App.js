import React, { useState, useEffect } from 'react';
import { Filter } from './components/Filter';
import { PersonForm } from './components/PersonForm';
import { PersonsToShow } from './components/PersonsToShow';
import noteService from './services/notes';

function App() {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState('');
  const [newNumber, setNewNumber] = useState('');
  const [searchedName, setSearchedName] = useState('');
  const [selectedPersons, setSelectedPersons] = useState([]);

  useEffect(() => {
    noteService
      .getAll()
      .then(initialNotes => {
        setPersons(initialNotes);
      })
  }, []);

  const handleNameChange = (e) => {
    setNewName(e.target.value);
  }

  const handleNumberChange = (e) => {
    setNewNumber(e.target.value);
  }

  const checkIfExits = (newPerson) => {
    let isRepeated = false;
    persons.forEach(person => {
      if (person.name === newPerson.name) isRepeated = true;
    })
    return isRepeated;
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    const personToAdd = {
      name: newName,
      number: newNumber
    }
    if (checkIfExits(personToAdd)) {
      alert(`${personToAdd.name} is already added to phonebook`);
    }else {
      noteService
        .create(personToAdd)
        .then(newPerson => {
          setPersons(persons.concat(newPerson));
        })
    }
    setNewName('');
    setNewNumber('');
  }

  const handleRemove = (target) => {
    if (window.confirm(`Delete ${target.name}?`)) {
      noteService
        .remove(target.id);
    } else return;
    setPersons(persons.filter(person => person !== target));
    setSearchedName(''); // to return to the full list if the person was searched before being deleted
  }
  
  const handleNameSearch = (e) => {
    const typedName = e.target.value.toLowerCase();
    setSearchedName(e.target.value);
    const foundPersons = persons.filter(person => person.name.toLowerCase().includes(typedName));
    setSelectedPersons(foundPersons);
  }

  return (
    <div className="App">
      <h2>PhoneBook</h2>
      <Filter handleNameSearch={handleNameSearch} searchedName={searchedName}/>
      <h2>add a new</h2>
      <PersonForm 
        handleNameChange={handleNameChange}
        name={newName}
        handleNumberChange={handleNumberChange}
        number={newNumber}
        handleSubmit={handleSubmit}
      />
      <h2>Numbers</h2>
      <ul>
        {searchedName
          ? <PersonsToShow persons={selectedPersons} handleRemove={handleRemove} />
          : <PersonsToShow persons={persons} handleRemove={handleRemove} />
        }
      </ul>
    </div>
  );
}

export default App;