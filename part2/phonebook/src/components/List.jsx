import React, { useState, useEffect } from 'react';
import personService from '../services/persons';

const List = ({ persons, handleDelete, filtered, search }) => {
  const [current, setCurrent] = useState([]);
  useEffect(() => {
    if (search === '') {
      setCurrent(persons);
    } else {
      setCurrent(filtered);
    }
  }, [search, persons, filtered]);

  return (
    <ul>
      {current.map((person) => (
        <div key={person.number}>
          <p>Name: {person.name}</p>
          <p>Number: {person.number}</p>
          <button
            onClick={() => {
              handleDelete(person.id);
            }}
          >
            Delete
          </button>
        </div>
      ))}
    </ul>
  );
};

export default List;
