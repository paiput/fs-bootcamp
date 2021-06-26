export const PersonsToShow = ({ persons }) => {
  return (
    persons.map(person => (
      <li key={person.name}>
        <p>
          <strong>Name: </strong>{person.name}
          <br />
          <strong>Number: </strong>{person.number}
        </p>
      </li>
    ))
  );
}