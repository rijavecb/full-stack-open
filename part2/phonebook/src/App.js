import { useState } from "react";
import Filter from "./components/Filter";
import PersonForm from "./components/PersonForm";
import Persons from "./components/Persons";

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
      <Filter
        filterQuery={filterQuery}
        onFilterChange={handleFilterQueryChange}
      />
      <h3>Add a new</h3>
      <PersonForm
        newName={newName}
        onNameChange={handleNameChange}
        newNumber={newNumber}
        onNumberChange={handleNumberChange}
        onFormSubmit={handleSubmit}
      />
      <h3>Numbers</h3>
      <Persons persons={displayedPersons()} />
    </div>
  );
};

export default App;
