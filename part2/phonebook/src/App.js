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

  //$ add
  const handleAdd = async (e) => {
    e.preventDefault();
    const personObject = {
      name: newName,
      number: newNumber,
    };
    // const found = await personService.getOne(newName);
    const found = persons.find((p) => p.name === newName);
    if (found) {
      personService.update(found.id, personObject).then((returned) => {
        setPersons(persons.map((person) => (person.id !== found.id ? person : returned)));
        setNewName('');
        setNewNumber('');
        setNoti({ type: 'success', message: 'User Updated' });
      });
    } else {
      //$ send to server
      personService
        .create(personObject)
        .then((returned) => {
          setPersons(persons.concat(returned));
          setNewName('');
          setNewNumber('');
          setNoti({ type: 'success', message: 'User Added' });
        })
        .catch((err) => {
          console.log(err.response.data);
          setNoti({ type: 'error', message: err.response.data.error });
        });
    }
  };

  //$ search
  const handleSearch = (e) => {
    setSearch(e.target.value);
  };

  //! delete
  const handleDelete = (id) => {
    personService
      .remove(id)
      .then((response) => {
        const remove = persons.filter((person) => person.id !== id);
        setPersons(remove);
        setNoti({ type: 'success', message: 'User Deleted' });
      })
      .catch((error) => {
        setNoti({ type: 'error', message: 'User Already Deleted' });
      });
  };

  //$ notification timer
  useEffect(() => {
    if (noti === '') return;
    const timer = setTimeout(() => {
      setNoti('');
    }, 3000);
    return () => clearTimeout(timer);
  }, [noti]);

  //$ return search results
  useEffect(() => {
    if (search === '') return setFiltered([]);
    const newFilter = persons.filter((person) => person.name.toLowerCase().includes(search));
    setFiltered(newFilter);
  }, [search, persons]);

  //$ Get all persons on load
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
