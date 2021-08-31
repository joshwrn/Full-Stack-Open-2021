import React from 'react';

const Form = ({ handleName, newName, handleNumber, newNumber, handleAdd }) => {
  return (
    <form>
      <div>
        name: <input onChange={handleName} value={newName} />
      </div>
      <div>
        number: <input onChange={handleNumber} value={newNumber} />
      </div>
      <div>
        <button onClick={handleAdd} type="submit">
          add
        </button>
      </div>
    </form>
  );
};

export default Form;
