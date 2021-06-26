export const PersonForm = ({ handleNameChange, name, handleNumberChange, number, handleSubmit}) => {
  return (
    <form>
      <div>name: <input onChange={handleNameChange} value={name} /></div>
      <div>number: <input onChange={handleNumberChange} value={number} /></div>
      <button type="submit" onClick={handleSubmit}>add</button>
    </form>
  );
};