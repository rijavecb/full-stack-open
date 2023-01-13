import { useState } from "react";

const App = () => {
  const [persons, setPersons] = useState([
    { name: "Arto Hellas", number: "040-123456", id: 1 },
    { name: "Ada Lovelace", number: "39-44-5323523", id: 2 },
    { name: "Dan Abramov", number: "12-43-234345", id: 3 },
    { name: "Mary Poppendieck", number: "39-23-6423122", id: 4 },
  ]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [filterQuery, setFilterQuery] = useState("");

  const handleNameChange = (event) => {
    setNewName(event.target.value);
  };

  const handleNumberChange = (event) => {
    setNewNumber(event.target.value);
  };

  const handleFilterQueryChange = (event) => {
    setFilterQuery(event.target.value);
  };

  const isAlreadyAdded = (newPerson) => {
    let alreadyExists = false;

    persons.forEach((person) => {
      if (person.name === newPerson.name) {
        alreadyExists = true;
      }
    });

    return alreadyExists;
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const newPerson = {
      name: newName,
      number: newNumber,
    };

    if (isAlreadyAdded(newPerson)) {
      alert(`${newName} is already added to phonebook`);

      return;
    }

    if (newNumber.length < 6) {
      alert("Phone number needs to be at least 7 characters long");

      return;
    }

    setPersons(persons.concat(newPerson));
    setNewName("");
    setNewNumber("");
  };

  const displayedPersons = () => {
    if (!filterQuery) {
      return persons;
    }

    return persons.filter((person) =>
      person.name.toLowerCase().includes(filterQuery.toLowerCase())
    );
  };

  return (
    <div>
      <h2>Phonebook</h2>
      <div>
        filter shown with{" "}
        <input value={filterQuery} onChange={handleFilterQueryChange} />
      </div>
      <h2>add a new</h2>
      <form onSubmit={handleSubmit}>
        <div>
          name: <input value={newName} onChange={handleNameChange} />
        </div>
        <div>
          number: <input value={newNumber} onChange={handleNumberChange} />
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      <div>
        {displayedPersons().map((person) => (
          <p key={person.name}>
            {person.name} {person.number}
          </p>
        ))}
      </div>
    </div>
  );
};

export default App;
