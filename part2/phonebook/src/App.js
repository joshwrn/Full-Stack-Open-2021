import React, { useState, useEffect } from 'react';
import List from './components/List';
import Search from './components/Search';
import Form from './components/Form';
import personService from './services/persons';
import Notification from './components/Notification';

const App = () => {
  const [persons, setPersons] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [newName, setNewName] = useState('');
  const [newNumber, setNewNumber] = useState('');
  const [search, setSearch] = useState('');
  const [noti, setNoti] = useState('');

  const handleName = (e) => {
    setNewName(e.target.value);
  };

  const handleNumber = (e) => {
    setNewNumber(e.target.value);
  };

  const handleAdd = (e) => {
    e.preventDefault();
    const personObject = {
      name: newName,
      number: newNumber,
    };
    const found = persons.find((person) => person.name === newName);
    if (found) {
      personService.update(found.id, personObject).then((returned) => {
        setPersons(persons.map((person) => (person.id !== found.id ? person : returned)));
        setNewName('');
        setNewNumber('');
        setNoti('User Updated');
      });
    } else {
      //$ send to server
      personService.create(personObject).then((returned) => {
        setPersons(persons.concat(returned));
        setNewName('');
        setNewNumber('');
        setNoti('User Added');
      });
    }
  };

  const handleSearch = (e) => {
    setSearch(e.target.value);
  };

  const handleDelete = (id) => {
    personService
      .remove(id)
      .then((response) => {
        const remove = persons.filter((person) => person.id !== id);
        setPersons(remove);
        setNoti('User Deleted');
      })
      .catch((error) => {
        setNoti('User Already Deleted');
      });
  };

  useEffect(() => {
    if (noti === '') return;
    const timer = setTimeout(() => {
      setNoti('');
    }, 3000);
    return () => clearTimeout(timer);
  }, [noti]);

  useEffect(() => {
    if (search === '') return setFiltered([]);
    const newFilter = persons.filter((person) => person.name.toLowerCase().includes(search));
    setFiltered(newFilter);
  }, [search, persons]);

  useEffect(() => {
    personService.getAll().then((initial) => {
      setPersons(initial);
    });
  }, []);

  return (
    <div>
      <h2>Phonebook</h2>
      <Search handleSearch={handleSearch} search={search} />
      <Form
        handleAdd={handleAdd}
        handleName={handleName}
        handleNumber={handleNumber}
        newName={newName}
        newNumber={newNumber}
      />
      <Notification noti={noti} />
      <h2>Numbers</h2>
      <List handleDelete={handleDelete} search={search} filtered={filtered} persons={persons} />
    </div>
  );
};

export default App;
