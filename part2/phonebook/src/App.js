import { useState, useEffect } from "react";
import personService from "./services/persons";
import Filter from "./components/Filter";
import PersonForm from "./components/PersonForm";
import Persons from "./components/Persons";
import Notification from "./components/Notification";

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [filterQuery, setFilterQuery] = useState("");
  const [message, setMessage] = useState(null);

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
    let existingId;

    persons.forEach((person) => {
      if (person.name === newPerson.name) {
        alreadyExists = true;
        existingId = person.id;
      }
    });

    return [alreadyExists, existingId];
  };

  const updateNumber = (existingId, newPerson) => {
    personService
      .update(existingId, newPerson)
      .then((returnedPerson) => {
        setPersons(
          persons.map((person) =>
            person.id !== existingId ? person : returnedPerson
          )
        );
        setNewName("");
        setNewNumber("");
      })
      .catch((error) => {
        alert(`${newPerson.name}'s number couldn't be updated.`);
      });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const newPerson = {
      name: newName,
      number: newNumber,
    };

    if (newNumber.length < 6) {
      alert("Phone number needs to be at least 7 characters long");

      return;
    }

    const [alreadyExists, existingId] = isAlreadyAdded(newPerson);

    if (alreadyExists && newNumber.length >= 6) {
      const message = `${newPerson.name} is already added to phonebook, replace the old number with a new one?`;
      if (window.confirm(message)) updateNumber(existingId, newPerson);

      return;
    }

    personService.create(newPerson).then((returnedPerson) => {
      setPersons(persons.concat(returnedPerson));
      setNewName("");
      setNewNumber("");
    });

    setMessage(`Added ${newPerson.name}`);
    setTimeout(() => {
      setMessage(null);
    }, 3000);
  };

  const deletePerson = (person) => {
    if (window.confirm(`Delete ${person.name}?`)) {
      personService
        .deleteContact(person.id)
        .then((returnedPerson) => {
          setPersons(persons.filter((p) => p.id !== person.id));
        })
        .catch((error) => {
          alert(`${person.name} couldn't be deleted from the list.`);
        });
    }
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
      <Notification message={message} />
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
      <Persons persons={displayedPersons()} deletePerson={deletePerson} />
    </div>
  );
};

export default App;
