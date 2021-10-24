import { useState, useEffect } from 'react';
import ContactForm from '../ContactForm';
import Filter from '../Filter';
import ContactList from '../ContactList';
import contactsData from '../../contactsData/contacts.json';

function App() {
  const [contacts, setContacts] = useState(() => {
    return JSON.parse(window.localStorage.getItem('contacts')) ?? contactsData;
  });
  const [filter, setFilter] = useState('');

  const handleFilter = e => {
    setFilter(e.target.value);
  };

  const handleSubmit = newContact => {
    const contactInPhonebook = contacts.some(
      contact => contact.name.toLowerCase() === newContact.name.toLowerCase(),
    );

    if (contactInPhonebook) {
      alert(`${newContact.name} is already in contacts.`);
    } else {
      setContacts([...contacts, newContact]);
    }
  };

  const deleteContact = contactId => {
    setContacts(contacts.filter(contact => contact.id !== contactId));
  };

  const getFilteredName = () => {
    const normalizedFilter = filter.toLowerCase();
    const filteredName = contacts.filter(contact =>
      contact.name.toLowerCase().includes(normalizedFilter),
    );
    return filteredName;
  };

  useEffect(() => {
    window.localStorage.setItem('contacts', JSON.stringify(contacts));
  }, [contacts]);

  return (
    <div className="App">
      <h1>Phonebook</h1>
      <ContactForm onSubmit={handleSubmit} />
      <h2>Contacts</h2>
      <Filter filter={filter} handleFilter={handleFilter} />
      <ContactList
        filteredName={getFilteredName()}
        deleteContact={deleteContact}
      />
    </div>
  );
}

export default App;
