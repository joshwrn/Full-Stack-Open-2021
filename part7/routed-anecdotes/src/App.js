import React, { useState, useEffect } from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  useRouteMatch,
} from 'react-router-dom';
import Home from './components/Home';
import Create from './components/Create';
import About from './components/About';
import Anecdote from './components/Anecdote';

const Menu = () => {
  const padding = {
    paddingRight: 5,
  };
  return (
    <div>
      <a href="/" style={padding}>
        anecdotes
      </a>

      <a href="/create" style={padding}>
        create new
      </a>

      <a href="/about" style={padding}>
        about
      </a>
    </div>
  );
};

const Footer = () => (
  <div>
    Anecdote app for{' '}
    <a href="https://courses.helsinki.fi/fi/tkt21009">
      Full Stack -websovelluskehitys
    </a>
    . See{' '}
    <a href="https://github.com/fullstack-hy/routed-anecdotes/blob/master/src/App.js">
      https://github.com/fullstack-hy2019/routed-anecdotes/blob/master/src/App.js
    </a>{' '}
    for the source code.
  </div>
);

//$ app start

const App = () => {
  const [anecdotes, setAnecdotes] = useState([
    {
      content: 'If it hurts, do it more often',
      author: 'Jez Humble',
      info: 'https://martinfowler.com/bliki/FrequencyReducesDifficulty.html',
      votes: 0,
      id: '1',
    },
    {
      content: 'Premature optimization is the root of all evil',
      author: 'Donald Knuth',
      info: 'http://wiki.c2.com/?PrematureOptimization',
      votes: 0,
      id: '2',
    },
  ]);

  const [notification, setNotification] = useState('');

  const match = useRouteMatch('/anecdote/:id');
  const item = match ? anecdotes.find((a) => a.id === match?.params?.id) : null;

  const addNew = (anecdote) => {
    anecdote.id = (Math.random() * 10000).toFixed(0);
    setAnecdotes(anecdotes.concat(anecdote));
  };

  const anecdoteById = (id) => anecdotes.find((a) => a.id === id);

  const vote = (id) => {
    const anecdote = anecdoteById(id);

    const voted = {
      ...anecdote,
      votes: anecdote.votes + 1,
    };

    setAnecdotes(anecdotes.map((a) => (a.id === id ? voted : a)));
  };

  useEffect(() => {
    if (notification === '') return;
    const timer = setTimeout(() => {
      setNotification('');
    }, 3000);
    return () => clearTimeout(timer);
  }, [notification]);

  return (
    <div>
      <h1>Software anecdotes</h1>
      <Menu />
      {notification !== '' ? notification : null}
      <Switch>
        <Route path="/anecdote/:id">
          <Anecdote item={item} />
        </Route>
        <Route path="/about">
          <About />
        </Route>
        <Route path="/create">
          <Create
            notification={notification}
            setNotification={setNotification}
            addNew={addNew}
          />
        </Route>
        <Route exact path="/">
          <Home anecdotes={anecdotes} />
        </Route>
      </Switch>
      <Footer />
    </div>
  );
};

export default App;
