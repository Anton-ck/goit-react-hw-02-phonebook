import { Component } from 'react';
import { nanoid } from 'nanoid';
import { Phonebook, PhonebookTitle, PhonebookSubTitle } from './App.styled';
import ContactForm from './ContactForm/ContactForm';
import ContactList from './ContactList/ContactList';
import FilterName from './Filter/Filter';

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

  handlerFormSubmit = ({ name, number }) => {
    const nameNormalized = name.toLowerCase();

    const isNameAlreadyInContacts = this.state.contacts.find(
      contact => contact.name.toLowerCase() === nameNormalized
    );

    if (isNameAlreadyInContacts) {
      alert(`${name} is already in contacts.`);
      return;
    }

    this.setState(prevState => {
      return {
        contacts: [{ id: nanoid(), name, number }, ...prevState.contacts],
      };
    });
  };

  handleFilterChange = event => {
    this.setState({ filter: event.currentTarget.value });
  };

  filterContacts = () => {
    const normalizedFilter = this.state.filter.toLowerCase();

    return this.state.contacts.filter(contact => {
      return contact.name.toLowerCase().includes(normalizedFilter);
    });
  };

  deleteContact = idToDelete => {
    this.setState(prevState => {
      return {
        contacts: prevState.contacts.filter(
          contact => contact.id !== idToDelete
        ),
      };
    });
  };
  render() {
    return (
      <Phonebook>
        <PhonebookTitle>PhoneBook</PhonebookTitle>
        <ContactForm onSubmit={this.handlerFormSubmit} />
        <PhonebookSubTitle>Contacts</PhonebookSubTitle>
        <FilterName
          filterValue={this.state.filter}
          handleFilterChange={this.handleFilterChange}
        />
        <ContactList
          contacts={this.filterContacts()}
          deleteContact={this.deleteContact}
        />
      </Phonebook>
    );
  }
}
