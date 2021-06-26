import React, { useState } from 'react';
import { Filter } from './components/Filter';
import { PersonForm } from './components/PersonForm';
import { PersonsToShow } from './components/PersonsToShow';

function App() {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-123456' },
    { name: 'Ada Lovelace', number: '39-44-5323523' },
    { name: 'Dan Abramov', number: '12-43-234345' },
    { name: 'Mary Poppendieck', number: '39-23-6423122' }
  ]);
  const [newName, setNewName] = useState('');
  const [newNumber, setNewNumber] = useState('');
  const [searchedName, setSearchedName] = useState('');
  const [selectedPersons, setSelectedPersons] = useState([]);

  const handleNameChange = (e) => {
    setNewName(e.target.value);
  }

  const handleNumberChange = (e) => {
    setNewNumber(e.target.value);
  }

  // there are probably better ways to do this
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
      setPersons(persons => persons.concat(personToAdd));
    }
    setNewName('');
    setNewNumber('');
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
          ? <PersonsToShow persons={selectedPersons} />
          : <PersonsToShow persons={persons} />
        }
      </ul>
    </div>
  );
}

export default App;