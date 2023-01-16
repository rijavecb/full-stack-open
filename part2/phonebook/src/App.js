import { useState, useEffect } from "react";
import personService from "./services/persons";
import Filter from "./components/Filter";
import PersonForm from "./components/PersonForm";
import Persons from "./components/Persons";

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [filterQuery, setFilterQuery] = useState("");

  useEffect(() => {
    personService.getAll().then((initialPersons) => {
      setPersons(initialPersons);
    });
  }, []);

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

    personService.create(newPerson).then(returnedPerson => {
      setPersons(persons.concat(returnedPerson));
      setNewName("");
      setNewNumber("");
    })
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
