export const PersonsToShow = ({ persons, handleRemove }) => {  
  return (
    persons.map(person => (
      <li key={person.name}>
        <p>
          <strong>Name: </strong>{person.name}
          <br />
          <strong>Number: </strong>{person.number}
        </p>
        <button onClick={() => handleRemove(person)}>delete</button>
      </li>
    ))
  );
}