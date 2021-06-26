export const Filter = ({ handleNameSearch, searchedName}) => {
  return (
    <p>
      filter shown with <input onChange={handleNameSearch} value={searchedName} />
    </p>
  );
};