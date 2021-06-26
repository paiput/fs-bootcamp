import React, { useState } from 'react';

function App() {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas '}
  ]);
  const [newName, setNewName] = useState('');

  const handleChange = (e) => {
    setNewName(e.target.value);
  }

  // there are probably better ways to do this
  const checkIfExits = (newPerson) => {
    let isRepeated = false;
    persons.forEach(person => {
      if (person.name === newPerson.name) isRepeated = true
    })
    return isRepeated;
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    const personToAdd = {
      name: newName
    }
    if (checkIfExits(personToAdd)) {
      alert(`${personToAdd.name} is already added to phonebook`);
    }else {
      setPersons(persons => persons.concat(personToAdd));
    }
    setNewName('');
  }

  return (
    <div className="App">
      <h2>PhoneBook</h2>
      <form>
        <div>
          name: <input onChange={handleChange} value={newName} />
        </div>
        <div>
          <button type="submit" onClick={handleSubmit}>add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      <ul>
        {persons.map(person => <li key={person.name}>{person.name}</li>)}
      </ul>
    </div>
  );
}

export default App;