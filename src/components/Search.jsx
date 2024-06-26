import React from "react";

const Search = ({ handleSubmit, character, onChange }) => {
  return (
    <div className="container">
      <div className="row">
        <div className="col search-container">
          <form onSubmit={handleSubmit}>
            <label>Enter the character's name</label>
            <input
              type="text"
              id="searchBar"
              value={character}
              onChange={(e) => onChange(e.target.value.toLowerCase())}
              required
            ></input>
            <button type="submit">Go!</button>
          </form>
        </div>
      </div>

    </div>
  );
};

export default Search;
