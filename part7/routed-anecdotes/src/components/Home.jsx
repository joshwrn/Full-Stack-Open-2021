import React from 'react';
import { Link } from 'react-router-dom';

const Home = ({ anecdotes }) => {
  return (
    <div>
      <h2>Anecdotes</h2>
      <ul>
        {anecdotes.map((anecdote) => (
          <Link key={anecdote.id} to={`/anecdote/${anecdote.id}`}>
            <li>{anecdote.content}</li>
          </Link>
        ))}
      </ul>
    </div>
  );
};

export default Home;
