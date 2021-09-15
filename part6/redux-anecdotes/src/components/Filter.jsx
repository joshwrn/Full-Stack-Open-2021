import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { filterChange } from '../reducers/filterReducer';

const Filter = () => {
  const dispatch = useDispatch();

  const handleChange = (e) => {
    // input-field value is in variable event.target.value
    e.preventDefault();
    const content = e.target.value;
    dispatch(filterChange(content));
  };
  const style = {
    marginBottom: 10,
  };

  return (
    <div style={style}>
      filter <input onChange={handleChange} />
    </div>
  );
};

export default Filter;
