const Person = ({person, deletePerson}) => {

  return (
    <p key={person.name}>
      {`${person.name} ${person.number} `}
      <button onClick={() => deletePerson(person)}>delete</button>
    </p>
  )
}

export default Person