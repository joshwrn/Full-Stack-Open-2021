import React, { useState } from 'react';
import { useMutation } from '@apollo/client';
import { ALL_BOOKS, ADD_BOOK } from '../queries';

const NewBook = ({ setError, show, updateCacheWith }) => {
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [publishedBefore, setPublished] = useState('');
  const [genre, setGenre] = useState('');
  const [genres, setGenres] = useState([]);

  const [addBook] = useMutation(ADD_BOOK, {
    onError: (error) => {
      console.log(error);
      setError(error.graphQLErrors[0]?.message);
    },
    update: (store, response) => {
      updateCacheWith(response.data.addBook);
    },
  });

  if (!show) {
    return null;
  }

  const submit = async (event) => {
    event.preventDefault();

    const published = parseInt(publishedBefore);

    addBook({
      variables: { author, title, published, genres },
    });

    console.log('add book...');

    setTitle('');
    setPublished('');
    setAuthor('');
    setGenres([]);
    setGenre('');
  };

  const addGenre = () => {
    setGenres(genres.concat(genre));
    setGenre('');
  };

  return (
    <div>
      <form onSubmit={submit}>
        <div>
          title
          <input
            value={title}
            onChange={({ target }) => setTitle(target.value)}
          />
        </div>
        <div>
          author
          <input
            value={author}
            onChange={({ target }) => setAuthor(target.value)}
          />
        </div>
        <div>
          published
          <input
            type="number"
            value={publishedBefore}
            onChange={({ target }) => setPublished(target.value)}
          />
        </div>
        <div>
          <input
            value={genre}
            onChange={({ target }) => setGenre(target.value)}
          />
          <button onClick={addGenre} type="button">
            add genre
          </button>
        </div>
        <div>genres: {genres.join(' ')}</div>
        <button type="submit">create book</button>
      </form>
    </div>
  );
};

export default NewBook;
