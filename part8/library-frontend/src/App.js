import React, { useState, useEffect } from 'react';
import Authors from './components/Authors';
import Books from './components/Books';
import NewBook from './components/NewBook';
import Login from './components/Login';
import { useQuery, useApolloClient } from '@apollo/client';

const Notify = ({ errorMessage }) => {
  if (!errorMessage) {
    return null;
  }

  return <div style={{ color: 'red' }}>{errorMessage}</div>;
};

const App = () => {
  const [page, setPage] = useState('authors');
  const [token, setToken] = useState(null);
  const client = useApolloClient();

  const [errorMessage, setErrorMessage] = useState(null);

  const notify = (message) => {
    setErrorMessage(message);
    setTimeout(() => {
      setErrorMessage(null);
    }, 5000);
  };

  const logout = () => {
    setToken(null);
    localStorage.clear();
    client.resetStore();
  };

  useEffect(() => {
    console.log('token', token);
  }, [token]);

  return (
    <div>
      <Notify errorMessage={errorMessage} />
      <div>
        <button onClick={() => setPage('authors')}>authors</button>
        <button onClick={() => setPage('books')}>books</button>
        <button
          style={!token ? { display: 'none' } : { display: 'initial' }}
          onClick={() => setPage('add')}
        >
          add book
        </button>
        <button
          style={token ? { display: 'none' } : { display: 'initial' }}
          onClick={() => setPage('login')}
        >
          Login
        </button>
        <button
          style={!token ? { display: 'none' } : { display: 'initial' }}
          onClick={() => logout()}
        >
          Logout
        </button>
      </div>

      <Authors setError={notify} show={page === 'authors'} />

      <Books
        setError={notify}
        allBooksGenre={'scary'}
        show={page === 'books'}
      />

      <NewBook setError={notify} show={page === 'add'} />

      <Login
        setToken={setToken}
        setErrorMessage={notify}
        show={page === 'login'}
      ></Login>
    </div>
  );
};

export default App;
