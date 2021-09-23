import React, { useState, useEffect } from 'react';
import { useQuery } from '@apollo/client';
import { useMutation } from '@apollo/client';

import { ALL_AUTHORS, EDIT_AUTHOR } from '../queries';

const Authors = ({ show, setError }) => {
  const [editAuthor] = useMutation(EDIT_AUTHOR, {
    refetchQueries: [{ query: ALL_AUTHORS }],
    onError: (error) => {
      console.log(error);
      setError(error.graphQLErrors[0]?.message);
    },
  });
  const [selectedAuthor, setAuthor] = useState('');
  const [bornString, setBorn] = useState('');
  const result = useQuery(ALL_AUTHORS);

  if (!show) {
    return null;
  }

  if (result.loading) {
    return <div>loading...</div>;
  }

  const handleSubmit = (e) => {
    e.preventDefault();

    const born = parseInt(bornString);
    const name = selectedAuthor;

    editAuthor({
      variables: { name, born },
    });

    console.log('add book...');

    setBorn('');
  };

  const authors = result.data.allAuthors;

  return (
    <div>
      <h2>authors</h2>
      <table>
        <tbody>
          <tr>
            <th></th>
            <th>born</th>
            <th>books</th>
          </tr>
          {authors.map((a) => (
            <tr key={a.name}>
              <td>{a.name}</td>
              <td>{a.born}</td>
              <td>{a.bookCount}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <form onSubmit={handleSubmit}>
        <select
          onChange={(e) => setAuthor(e.target.value)}
          id="author-form"
          defaultValue=""
        >
          <option value="">Choose Author</option>
          {authors.map((item) => {
            return (
              <option key={item.id} value={item.name}>
                {item.name}
              </option>
            );
          })}
        </select>
        <input
          value={bornString}
          type="number"
          onChange={(e) => setBorn(e.target.value)}
        />
        <button type="submit">Edit Birthday</button>
      </form>
    </div>
  );
};

export default Authors;
