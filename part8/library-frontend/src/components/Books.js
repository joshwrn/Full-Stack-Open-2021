import React, { useState, useEffect } from 'react';
import {
  useQuery,
  useMutation,
  useSubscription,
  useApolloClient,
} from '@apollo/client';

import { ALL_BOOKS, BOOK_ADDED } from '../queries';

const Books = ({ show, allBooksGenre }) => {
  const result = useQuery(ALL_BOOKS);
  // const favorites = useQuery(ALL_BOOKS, {
  //   variables: { allBooksGenre },
  // });
  const favorites = useQuery(ALL_BOOKS, {
    variables: { allBooksGenre },
  });

  const [genres, setGenres] = useState([]);
  const [filter, setFilter] = useState([]);
  const [list, setList] = useState([]);

  useEffect(() => {
    if (result.loading || genres.length > 0) return;
    let arr = [];
    const list = result.data.allBooks;
    console.log('list', list);
    list.forEach((item) => {
      item.genres.forEach((genre) => {
        const check = arr.some((g) => g === genre);
        if (check) return;
        arr.push(genre);
      });
    });
    setGenres(arr);
  }, [result]);

  useEffect(() => {
    if (favorites.data) {
      setList(favorites.data.allBooks);
    }
  }, [favorites]);

  if (!show) {
    return null;
  }

  if (result.loading || favorites.loading) {
    return <div>loading...</div>;
  }

  console.log(favorites);

  const books = result.data.allBooks;

  const handleFilter = (genre) => {
    const filtered = books.filter((book) => {
      return book.genres.some((item) => item === genre);
    });
    setFilter(filtered);
  };

  return (
    <div>
      <h2>books</h2>
      {list.length > 0 ? (
        <div>
          <p>books from your favorite genre {allBooksGenre}</p>
          {list.map((b) => (
            <p key={b.title}>{b.title}</p>
          ))}
        </div>
      ) : (
        <button>show recommended</button>
      )}

      <table>
        <tbody>
          <tr>
            <th></th>
            <th>author</th>
            <th>published</th>
          </tr>
          {filter.length === 0
            ? books.map((a) => (
                <tr key={a.id}>
                  <td>{a.title}</td>
                  <td>{a.author.name}</td>
                  <td>{a.published}</td>
                </tr>
              ))
            : filter.map((a) => (
                <tr key={a.id}>
                  <td>{a.title}</td>
                  <td>{a.author.name}</td>
                  <td>{a.published}</td>
                </tr>
              ))}
        </tbody>
      </table>
      <div>
        <p>genres</p>
        {genres.map((g) => (
          <button key={g} onClick={() => handleFilter(g)}>
            {g}
          </button>
        ))}
        <button onClick={() => setFilter([])}>reset</button>
      </div>
    </div>
  );
};

export default Books;
