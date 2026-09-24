function SearchBar({ search, setSearch }) {
  return (
    <input
      type="text"
      className="search-box"
      placeholder="Search tickets..."
      value={search}
      onChange={(e) => setSearch(e.target.value)}
    />
  );
}

export default SearchBar;