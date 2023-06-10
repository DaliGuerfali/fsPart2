const Person = ({ person, handleDelete }) => {
  return (
    <p>
      {person.name} {person.number} 
      <button onClick={handleDelete}>delete</button>
    </p>
  );
  
}

const Persons = ({ persons, handleDelete }) => {
  return (
  <>
    { 
    persons.map((person) => <Person 
      key={person.id} 
      person={person} 
      handleDelete={() => handleDelete(person.id)}
    />) 
    }
    </>
  );
}

export default Persons;

