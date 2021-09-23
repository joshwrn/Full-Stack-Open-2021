import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { useField } from '../hooks/useField';

const Create = ({ addNew, setNotification, notification }) => {
  const [content, setContent] = useState('');
  const [author, setAuthor] = useState('');
  const [info, setInfo] = useState('');
  const history = useHistory();

  const contentField = useField('text');
  const authorField = useField('text');
  const infoField = useField('text');

  const handleSubmit = (e) => {
    e.preventDefault();
    addNew({
      content,
      author,
      info,
      votes: 0,
    });
    setNotification('submitted');
  };

  useEffect(() => {
    if (notification !== 'submitted') return;
    history.push('/');
  }, [notification]);

  const handleClear = () => {
    contentField.onChange('reset');
    authorField.onChange('reset');
    infoField.onChange('reset');
  };

  return (
    <div>
      <h2>create a new anecdote</h2>
      <form onSubmit={handleSubmit}>
        <div>
          content
          <input {...contentField} />
        </div>
        <div>
          author
          <input {...authorField} />
        </div>
        <div>
          url for more info
          <input {...infoField} />
        </div>
        <button>create</button>
      </form>
      <button onClick={handleClear}>clear</button>
    </div>
  );
};

export default Create;
