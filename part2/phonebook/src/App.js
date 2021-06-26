import React, { useState } from 'react';

function App() {
  const [persons, setPersons] = useState([
    { 
      name: 'Arto Hellas',
      number: '040-1234567'
    }
  ]);
  const [newName, setNewName] = useState('');
  const [newNumber, setNewNumber] = useState('');

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

  return (
    <div className="App">
      <h2>PhoneBook</h2>
      <form>
        <div>name: <input onChange={handleNameChange} value={newName} /></div>
        <div>number: <input onChange={handleNumberChange} value={newNumber} /></div>
        <button type="submit" onClick={handleSubmit}>add</button>
      </form>
      <h2>Numbers</h2>
      <ul>
        {persons.map(person => 
          <li key={person.name}>
            <p>Name: {person.name}</p>
            <p>Number: {person.number}</p>
          </li>
        )}
      </ul>
    </div>
  );
}

export default App;