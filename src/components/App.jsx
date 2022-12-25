import React, { useEffect, useState, useRef } from 'react';
import toast, { Toaster } from 'react-hot-toast';

import { GlobalStyle } from './GlobalStyle';
import { ContactForm } from './ContactForm/ContactForm';
import { Filter } from './Filter/Filter';
import { ContactList } from './ContactList/ContactList';
import { Box } from './Box/Box';

const initialContacts = [
  { id: 'id-1', name: 'Rosie Simpson', number: '459-12-56' },
  { id: 'id-2', name: 'Hermione Kline', number: '443-89-12' },
  { id: 'id-3', name: 'Eden Clements', number: '645-17-79' },
  { id: 'id-4', name: 'Annie Copeland', number: '227-91-26' },
];

export const App = () => {
  const [contacts, setContacts] = useState([...initialContacts]);
  const [filter, setFilter] = useState('');
  const isFirstRender = useRef(true);

  useEffect(() => {
    const savedContact = JSON.parse(localStorage.getItem('contacts'));

    if (savedContact && savedContact !== null) {
      setContacts(savedContact);
    }
  }, []);

  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false;
      return;
    }
    localStorage.setItem('contacts', JSON.stringify(contacts));
  }, [contacts]);

  const addContact = newContact => {
    console.log(newContact);
    if (contacts.find(({ name }) => name === newContact.name)) {
      toast.error(`Name ${newContact.name} is alredy in contacts!`, {
        position: 'top-right',
      });
      return;
    }

    if (contacts.find(({ number }) => number === newContact.number)) {
      toast.error(`Number ${newContact.number} is alredy in contacts!`, {
        position: 'top-right',
      });
      return;
    }

    setContacts(prevContacts => [newContact, ...prevContacts]);
  };

  const changeFilter = e => {
    setFilter(e.currentTarget.value);
  };

  const getFilteredContacts = () => {
    const normalizedFilter = filter.trim().toLowerCase();
    console.log(contacts);
    return [
      ...contacts.filter(({ name }) =>
        name.toLowerCase().includes(normalizedFilter)
      ),
    ];
  };

  const deleteContact = contactId => {
    setContacts(prev => prev.filter(({ id }) => id !== contactId));
  };

  const filterArr = getFilteredContacts();
  return (
    <>
      <Box py="15px" px="30px">
        <GlobalStyle />
        <h1>Phonebook</h1>
        <ContactForm onSubmit={addContact} />
        <ul>Contacts</ul>
        <Filter filter={filter} onChange={changeFilter} />
        <ContactList contacts={filterArr} onDeleteContact={deleteContact} />
        <Toaster />
      </Box>
    </>
  );
};
