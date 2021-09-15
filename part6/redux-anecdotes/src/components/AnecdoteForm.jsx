import React from 'react';
import { useDispatch } from 'react-redux';

import { createItem } from '../reducers/anecdoteReducer';
import { notificationChange } from '../reducers/notificationReducer';
import anecdoteService from '../services/anecdoteService';

const AnecdoteForm = () => {
  const dispatch = useDispatch();

  const addItem = async (e) => {
    e.preventDefault();
    const content = e.target.input.value;
    e.target.input.value = '';
    dispatch(createItem(content));
    dispatch(notificationChange('Anecdote created', 5000));
  };

  return (
    <div>
      <h2>create new</h2>
      <form onSubmit={addItem}>
        <div>
          <input name="input" />
        </div>
        <button>create</button>
      </form>
    </div>
  );
};

export default AnecdoteForm;
