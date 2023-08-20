import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const HomePage = () => {
  const [contacts, setContacts] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");

  //set up notification messages
  const deleteNotification = () => toast("Contact deleted successfully!");
  const errorMessage = () => toast("Error editing contact!");

  //  an asynchronous function to fetch and return contacts from the api
  const fetchData = async () => {
    try {
      const res = await fetch("http://localhost:7000/fetch");
      const data = await res.json();
      return data;
    } catch (error) {
      console.log(error);
    }
  };

  // Updating contacts variable with the fetched contacts on load of the page
  useEffect(() => {
    const fetchContacts = async () => {
      const fetchedContacts = await fetchData();
      setContacts(fetchedContacts);
    };

    fetchContacts();
  }, []);

  // an asynchronous function reaching with api with a contact's id to remove it from the database
  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:7000/contact/${id}`);

      // display notiication if deletion is succesful
      deleteNotification();

      // updating the contact variable to remove the deleted contact
      setContacts((prevContacts) =>
        prevContacts.filter((contact) => contact.id !== id)
      );
    } catch (error) {
      console.log(error);
      setTimeout(() => {
        errorMessage();
      }, 2000);
    }
  };

  // a function to filter through the fetched contacts(converted to lowercase) and return contacts that has the input value
  const filteredContacts = contacts.filter((contact) => {
    const fullName = `${contact.firstName} ${contact.lastName}`.toLowerCase();
    return fullName.includes(searchQuery.toLowerCase());
  });

  return (
    <>
      <div className="py-8 mx-6">
        <div className="py-6">
          <h1 className="text-4xl font-bold mb-4">MY CONTACTS</h1>
        </div>

        <Link to="/add" className="text-7xl absolute right-20 bottom-20">
          +
        </Link>

        <div className="relative py-2">
          <input
            className="py-2 px-4 pr-32 border border-black rounded-full mb-4 bg-celadon text-black"
            type="search"
            placeholder="Search contacts..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />

          {searchQuery && (
            <div className="absolute mt-1 bg-celadon text-black border border-gray-300 rounded shadow">
              {filteredContacts.map((contact, index) => (
                <div
                  key={contact.id}
                  className="py-4 px-4 cursor-pointer hover:bg-gray-100"
                >
                  <span className="px-4">{`${index + 1}. `}</span>
                  <span className="px-4">{contact.firstName}</span>
                  <span className="px-4">{` ${contact.lastName}`}</span>
                  <span className="px-4">{contact.phoneNumber}</span>
                  <span className="px-4">{contact.email}</span>
                  <Link
                    className="px-4 text-blue-500 hover:underline"
                    to={`edit/${contact.id}`}
                  >
                    Edit
                  </Link>
                  <button
                    className="px-4 text-red-500 hover:underline"
                    onClick={() => handleDelete(contact.id)}
                  >
                    Delete
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>

        <table className="w-full border-collapse">
          <thead>
            <tr className="border-b border-gray-300">
              <th className="pr-4">No.</th>
              <th className="px-4">First Name</th>
              <th className="px-4">Last Name</th>
              <th className="px-4">Phone Number</th>
              <th className="px-4">Email</th>
              <th className="px-4">Actions</th>
            </tr>
          </thead>
          <tbody>
            {contacts.map((contact, index) => (
              <tr key={contact.id} className="border-b border-gray-300 py-4">
                <td className="pr-4">{index + 1}</td>
                <td className="px-4 py-4">{contact.firstName}</td>
                <td className="px-4 py-4">{contact.lastName}</td>
                <td className="px-4 py-4">{contact.phoneNumber}</td>
                <td className="px-4 py-4">{contact.email}</td>
                <td className="px-4 py-4">
                  <Link
                    className="text-green-700 hover:underline mx-4"
                    to={`edit/${contact.id}`}
                  >
                    Edit
                  </Link>
                  <button
                    className="ml-2 text-red-500 hover:underline"
                    onClick={() => handleDelete(contact.id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default HomePage;
