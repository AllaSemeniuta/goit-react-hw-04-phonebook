import React, { Component } from 'react';
import toast, { Toaster } from 'react-hot-toast';

import { GlobalStyle } from './GlobalStyle';
import { ContactForm } from './ContactForm/ContactForm';
import { Filter } from './Filter/Filter';
import { ContactList } from './ContactList/ContactList';
import { Box } from './Box/Box';

export class App extends Component {
  state = {
    contacts: [
      { id: 'id-1', name: 'Rosie Simpson', number: '459-12-56' },
      { id: 'id-2', name: 'Hermione Kline', number: '443-89-12' },
      { id: 'id-3', name: 'Eden Clements', number: '645-17-79' },
      { id: 'id-4', name: 'Annie Copeland', number: '227-91-26' },
    ],
    filter: '',
  };

  componentDidMount() {
    const savedContact = JSON.parse(localStorage.getItem('contacts'));

    if (savedContact && savedContact !== null) {
      this.setState({ contacts: savedContact });
    }
  }

  componentDidUpdate(_, prevState) {
    if (prevState.contacts !== this.state.contacts) {
      localStorage.setItem('contacts', JSON.stringify(this.state.contacts));
    }
  }

  addContact = newContact => {
    const { contacts } = this.state;
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

    this.setState(({ contacts }) => ({
      contacts: [newContact, ...contacts],
    }));
  };

  changeFilter = e => {
    this.setState({ filter: e.currentTarget.value });
  };

  getFilteredContacts = () => {
    const { filter, contacts } = this.state;
    const normalizedFilter = filter.trim().toLowerCase();

    return contacts.filter(({ name }) =>
      name.toLowerCase().includes(normalizedFilter)
    );
  };

  deleteContact = contactId => {
    this.setState(prevState => ({
      contacts: prevState.contacts.filter(({ id }) => id !== contactId),
    }));
  };
  render() {
    const filterArr = this.getFilteredContacts();
    return (
      <>
        <Box py="15px" px="30px">
          <GlobalStyle />
          <h1>Phonebook</h1>
          <ContactForm onSubmit={this.addContact} />
          <ul>Contacts</ul>
          <Filter filter={this.state.filter} onChange={this.changeFilter} />
          <ContactList
            contacts={filterArr}
            onDeleteContact={this.deleteContact}
          />
          <Toaster />
        </Box>
      </>
    );
  }
}
