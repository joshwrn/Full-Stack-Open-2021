import React, { useEffect } from 'react';

const Anecdote = ({ item }) => {
  useEffect(() => {
    console.log(item);
  }, [item]);

  return <div>{item.content}</div>;
};

export default Anecdote;
