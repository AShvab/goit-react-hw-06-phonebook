import React, { useEffect, useState } from 'react';
import { nanoid } from 'nanoid';
import contactsData from '../data/data.json';
import Form from './Form';
import ContactList from './ContactList/ContactList';
import SearchContact from './SearchContact';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Container, Subtitle, Text, Title, Total } from './App.styled';

const App = () => {
  // коли компонент рендериться, спочатку спробується отримати збережені контакти з локального сховища. Якщо контакти існують, вони стають початковими даними для стану contacts. У випадку, якщо збережених контактів немає, використовуються значення contactsData як початкові дані.
  const savedContacts = JSON.parse(localStorage.getItem('contacts'));
  const initialContacts = savedContacts || contactsData;

  const [contacts, setContacts] = useState(initialContacts);
  const [filter, setFilter] = useState('');

  useEffect(() => {
    localStorage.setItem('contacts', JSON.stringify(contacts));
  }, [contacts]);

  const addContact = contact => {
    const { name } = contact;
    if (contacts.some(item => item.name.toLowerCase() === name.toLowerCase())) {
      toast.warning(`${name} is already in contacts`);
      return;
    }
    const newContact = { ...contact, id: nanoid() };
    setContacts([...contacts, newContact]);
  };

  const removeContact = id => {
    setContacts(prevState => prevState.filter(contact => contact.id !== id));
  };

  const searchContact = event => {
    const { value } = event.target;
    setFilter(value);
  };

  const getFilteredContacts = () => {
    return contacts.filter(({ name }) =>
      name.toLowerCase().includes(filter.toLowerCase())
    );
  };

  const filteredContacts = getFilteredContacts();

  return (
    <Container>
      <Title>PhoneBook</Title>
      <Form onSubmit={addContact} />
      <Subtitle>Contacts</Subtitle>
      <Total>Total contacts: {filteredContacts.length}</Total>
      <SearchContact searchContact={searchContact} />
      {filteredContacts.length > 0 ? (
        <ContactList
          contacts={filteredContacts}
          removeContact={removeContact}
        />
      ) : (
        <Text>Contact list is empty</Text>
      )}
      <ToastContainer autoClose={2000} />
    </Container>
  );
};

export default App;
