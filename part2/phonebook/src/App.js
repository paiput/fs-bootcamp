import React, { useState, useEffect } from 'react';
import './App.css';
import { Filter } from './components/Filter';
import { PersonForm } from './components/PersonForm';
import { PersonsToShow } from './components/PersonsToShow';
import { Notification } from './components/Notification';
import noteService from './services/notes';

function App() {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState('');
  const [newNumber, setNewNumber] = useState('');
  const [infoMessage, setInfoMessage] = useState('');
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

  const checkIfExists = (newPerson) => {
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
    if (checkIfExists(personToAdd)) {
      if (window.confirm(`${personToAdd.name} is already added to phonebook, replace the old number with a new one?`)) {
        const personToEdit = persons.filter(person => person.name === personToAdd.name)[0];
        // console.log('Person to edit:', personToEdit)
        noteService
          .update(personToEdit.id, personToAdd) // second parameter is the whole object that will replace the personToEdit
          .then(newPerson => {
            // console.log('Number edited succesfully:', newPerson.data);
            setPersons(persons.map(person => person === personToEdit ? newPerson.data : person));
            setInfoMessage(`${newPerson.name}'s number edited succesfully`);
            setTimeout(() => {
              setInfoMessage('');
            }, 2000);
          })
          .catch(err => {
            setTimeout(() => {
              setInfoMessage(`Error: Information of ${personToAdd.name} has already been removed from server`);
            }, 3000);
          });
      }
    }else {
      noteService
        .create(personToAdd)
        .then(newPerson => {
          setPersons(persons.concat(newPerson));
          setInfoMessage(`Added ${newPerson.name}`);
          setTimeout(() => {
            setInfoMessage('');
          }, 2000);
        });
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
      <Notification message={infoMessage} />
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