import { useEffect, useState } from "react";
import personService from "./services/person.js";
import "./index.css";

const Filter = ({ newFilter, handleFilterChange }) => (
  <div>
    filter shown with<input
      value={newFilter}
      onChange={handleFilterChange}
    />
  </div>
);

const PersonForm = (
  { addPerson, newName, handleNameChange, newNumber, handleNumberChange },
) => (
  <form onSubmit={addPerson}>
    <div>
      name:{" "}
      <input
        value={newName}
        onChange={handleNameChange}
      />
    </div>
    <div>
      number:{" "}
      <input
        value={newNumber}
        onChange={handleNumberChange}
      />
    </div>
    <div>
      <button type="submit">add</button>
    </div>
  </form>
);

const Person = ({ person, deletePerson }) => (
  <p>
    {person.name} {person.number} <button onClick={deletePerson}>delete</button>
  </p>
);

const Persons = ({ persons, deletePerson }) => (
  <div>
    {persons.map((person) => (
      <Person
        key={person.id}
        person={person}
        deletePerson={() => deletePerson(person)}
      />
    ))}
  </div>
);

const NotifyError = ({ message }) => {
  if (message === null) {
    return null;
  }

  return (
    <div className="error">
      {message}
    </div>
  );
};

const NotifySuccess = ({ message }) => {
  if (message === null) {
    return null;
  }

  return (
    <div className="success">
      {message}
    </div>
  );
};

const App = () => {
  const [persons, setPersons] = useState([
    { name: "Arto Hellas", number: "040-123456", id: 1 },
    { name: "Ada Lovelace", number: "39-44-5323523", id: 2 },
    { name: "Dan Abramov", number: "12-43-234345", id: 3 },
    { name: "Mary Poppendieck", number: "39-23-6423122", id: 4 },
  ]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [newFilter, setNewFilter] = useState("");
  const [errorMessage, setErrorMessage] = useState(null);
  const [successMessage, setSuccessMessage] = useState(null);

  const hook = () => {
    personService
      .getAll()
      .then((initialPersons) => {
        setPersons(initialPersons);
      });
  };

  useEffect(hook, []);

  // add person
  const addPerson = (event) => {
    event.preventDefault();

    // if a person already exists, then replace the number
    const exist = persons.some((person) => person.name === newName);
    if (exist) {
      const person = persons.find((p) => p.name === newName);
      const changedPerson = { ...person, number: newNumber };
      const confirmed = confirm(
        `${person.name} is already added to phonebook, replace the old number with a new one?`,
      );
      if (confirmed) {
        personService
          .update(person.id, changedPerson)
          .then((returnedPerson) => {
            setPersons(
              persons.map((p) => p.name !== newName ? p : returnedPerson),
            );
            setNewName("");
            setNewNumber("");
            setSuccessMessage(
              `${person.name}'s number updated`,
            );
            setTimeout(() => {
              setSuccessMessage(null);
            }, 5000);
          })
          .catch((error) => {
            if(error.response.status === "404"){
              setErrorMessage(
                `Information of '${person.name}' has already been removed from server`,
              );
              setPersons(persons.filter((p) => p.id !== person.id));
            }else {
              setErrorMessage(error.response.data.error)
            }
            
            setTimeout(() => {
              setErrorMessage(null);
            }, 5000);
            
          });
        return;
      }else{
        return;
      }
    }

    const personObject = {
      name: newName,
      number: newNumber,
    };

    personService
      .create(personObject)
      .then((returnedPerson) => {
        setPersons(persons.concat(returnedPerson));
        setNewName("");
        setNewNumber("");
        setSuccessMessage(
          `Added ${personObject.name}`,
        );
        setTimeout(() => {
          setSuccessMessage(null);
        }, 5000);
      })
      .catch((error) => {
        setErrorMessage(
          error.response.data.error
        );
        setTimeout(() => {
          setErrorMessage(null);
        }, 5000);
      });
  };

  // delete person
  const deletePerson = (person) => {
    const confirmed = confirm(`Delete ${person.name}?`);

    if (confirmed) {
      personService
        .deletePerson(person.id)
        .then((response) => {
          setPersons(persons.filter((p) => p.id !== person.id));
        });
    }
  };

  // handles
  const handleNameChange = (event) => {
    setNewName(event.target.value);
  };

  const handleNumberChange = (event) => {
    setNewNumber(event.target.value);
  };

  const handleFilterChange = (event) => {
    setNewFilter(event.target.value);
  };

  const personsToShow = newFilter.length === 0
    ? persons
    : persons.filter((person) =>
      person.name.toLowerCase().includes(newFilter.toLowerCase())
    );

  return (
    <div>
      <h2>Phonebook</h2>
      <NotifySuccess message={successMessage} />
      <NotifyError message={errorMessage} />

      <Filter newFilter={newFilter} handleFilterChange={handleFilterChange} />

      <h3>Add a new</h3>

      <PersonForm
        addPerson={addPerson}
        newName={newName}
        handleNameChange={handleNameChange}
        newNumber={newNumber}
        handleNumberChange={handleNumberChange}
      />

      <h3>Numbers</h3>

      <Persons persons={personsToShow} deletePerson={deletePerson} />
    </div>
  );
};

export default App;
