const TypeAheadSearch = () => {
  return (
    <div className="searchBar w-100 h-100 d-flex flex-grow-1">
      <form className="d-flex w-100" role="search">
        <input
          className="form-control me-2"
          type="search"
          placeholder="Search"
          aria-label="Search"
        ></input>
        <button className="btn btn-outline-success">Search</button>
      </form>
    </div>
  );
};

export default TypeAheadSearch;
