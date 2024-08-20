import "./SearchBox.css";

const SearchBox = ({ value, onChange }) => {
  return (
    <div className="search-box-container">
      <label htmlFor="search-box">Search contacts</label>
      <input
        id="search-box"
        type="text"
        value={value}
        onChange={onChange}
        className="search-box"
      />
    </div>
  );
};

export default SearchBox;
