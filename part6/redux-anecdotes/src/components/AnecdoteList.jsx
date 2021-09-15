import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { createVote } from '../reducers/anecdoteReducer';
import { notificationChange } from '../reducers/notificationReducer';

const AnecdoteList = () => {
  const [sort, setSort] = useState([]);
  const anecdotes = useSelector(({ anecdotes, filter }) => {
    if (filter === 'NONE') {
      return anecdotes;
    }
    return anecdotes.filter((a) =>
      a.content.toLowerCase().includes(filter.toLowerCase())
    );
  });
  const dispatch = useDispatch();
  const sorted = anecdotes.sort((a, b) => b.votes - a.votes);

  const vote = (id) => {
    console.log('vote', id);
    dispatch(createVote(id));
    dispatch(notificationChange('Vote Sent', 5000));
  };
  return (
    <div>
      {sorted.map((anecdote) => (
        <div className="anecdote" key={anecdote.id}>
          <div className="content">{anecdote.content}</div>
          <div>
            has {anecdote.votes} votes
            <button className="vote" onClick={() => vote(anecdote.id)}>
              vote
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default AnecdoteList;
