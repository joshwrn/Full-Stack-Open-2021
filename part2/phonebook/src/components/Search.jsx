import React from 'react';

const Search = ({ handleSearch, search }) => {
  return (
    <div>
      search: <input onChange={handleSearch} value={search} />
    </div>
  );
};

export default Search;
