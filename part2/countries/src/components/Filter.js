const Filter = ({ filterQuery, onFilterChange: handleFilterQueryChange }) => {
  return (
    <div>
      find countries{" "}
      <input value={filterQuery} onChange={handleFilterQueryChange} />
    </div>
  );
};

export default Filter;
