import { useState, useEffect } from 'react';
import Filter from './components/Filter';
import PersonForm from './components/PersonForm';
import Persons from './components/Persons';

import phoneBookService from './phoneBookService';
import { SuccessNotification, ErrorNotification } from './components/Notifications';


const App = () => {
  const [persons, setPersons] = useState([]); 
  const [newName, setNewName] = useState('');
  const [newNumber, setNewNumber] = useState('');
  const [newFilter, setNewFilter] = useState('');
  const [successMessage, setSuccessMessage] = useState(null);
  const [errorMessage, setErrorMessage] = useState(null);

  useEffect(() => { 
    phoneBookService
    .getAll()
    .then(res => setPersons(res)) 
    .catch(err => {
      console.log(err);
      setErrorMessage(`Failed to fetch data from server`);
      setTimeout(() => {
        setErrorMessage(null);
      }, 3500);
    });
  }, []);


  function handleNameInput(e) {
    setNewName(e.target.value);
  }

  function handleNumberInput(e) {
    setNewNumber(e.target.value);
  }

  function handleFilterInput(e) {
    setPersons(persons.filter((person) => {
      return person
            .name
            .toLowerCase()
            .includes(e.target.value.toLowerCase());
    }));
    setNewFilter(e.target.value);
  }

  function handleClick(e) {
    e.preventDefault();
    if(newName === '' || newNumber === '') {
      return;
    }

    const addedPerson = persons.find((person) => person.name === newName);

    if(addedPerson) {
      if(window.confirm(`${newName} is already added to phonebook, replace the old number with a new one ?`)) {

        const updatedPerson = {...addedPerson, number: newNumber}

        phoneBookService
        .update(updatedPerson.id, updatedPerson)
        .then(res => {
          setSuccessMessage(`Updated ${newName}'s number`);
          setTimeout(() => {
            setSuccessMessage(null);
          }, 2000);
          setPersons(persons.map(person => person.id !== updatedPerson.id ? person : updatedPerson ));
          setNewName('');
          setNewNumber('');
        })
        .catch(err => {
          console.log(err);
          setErrorMessage(`Information for ${updatedPerson.name} has already been deleted from the server`);
          setTimeout(() => {
            setErrorMessage(null);
            setPersons(persons.filter(person => person.id !== updatedPerson.id));
          }, 3500);
        })
      }
      return;
    }

    phoneBookService
    .create({ name: newName, number: newNumber, id: persons.length+1 })
    .then(res => {
      setSuccessMessage(`Added ${newName}`);
          setTimeout(() => {
            setSuccessMessage(null);
          }, 2000);
      setPersons(persons.concat(res));
      setNewName('');
      setNewNumber('');
    })
    .catch(err => {
      console.log(err);
      setErrorMessage(`${newName} has already been added to the server`);
      setTimeout(() => {
        setPersons(persons.concat({ name: newName, number: newNumber, id: persons.length+1 }));
        setErrorMessage(null);
      }, 3500);
    })
  }

  function handleDelete(id) {
    const deletedPerson = persons.find((person) => id === person.id);
    if(window.confirm(`Delete ${deletedPerson.name} ?`)) {
      phoneBookService
      .deleteEntry(id)
      .then(res => {
        setSuccessMessage(`Deleted ${deletedPerson.name}`);
          setTimeout(() => {
            setSuccessMessage(null);
          }, 2000);
        setPersons(persons.filter((person) => person.id !== id));
      })
      .catch(err => {
        console.log(err);
        setErrorMessage(`${deletedPerson.name} has already been removed from the server`);
        setTimeout(() => {
          setErrorMessage(null);
          setPersons(persons.filter(person => person.id !== deletedPerson.id));
        }, 3500);
      });
    }
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <SuccessNotification message={successMessage}/>
      <ErrorNotification message={errorMessage}/>
      <Filter onChange={handleFilterInput} value={newFilter} />
      <h3>add a new</h3>
      <PersonForm 
        onNameChange={handleNameInput}
        nameValue={newName}
        onNumberChange={handleNumberInput}
        numberValue={newNumber}
        onClick={handleClick}
        />
      <h3>Numbers</h3>
      <Persons persons={persons} handleDelete={handleDelete} />
    </div>
  )
}

export default App