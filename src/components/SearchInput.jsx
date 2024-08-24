const SearchInput = ({ onHandleChange, inputFieldValue }) => {
  return (
    <div className="search-container container">
      <input
        id="search"
        placeholder="Search Database..."
        value={inputFieldValue}
        onChange={(e) => onHandleChange(e)}
      />
    </div>
  );
};

export default SearchInput;
