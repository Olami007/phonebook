import React, { useState, useEffect } from "react";
import Navbar from "../components/Navbar";
import { Link } from "react-router-dom";
import axios from "axios";

const HomePage = () => {
  const [contacts, setContacts] = useState([]);

  const fetchData = async () => {
    try {
      const res = await fetch("http://localhost:7000/fetch");
      const data = await res.json();
      return data;
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    const fetchContacts = async () => {
      const fetchedContacts = await fetchData();
      setContacts(fetchedContacts);
    };

    fetchContacts();
  }, []);

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:7000/contact/${id}`);

      setContacts((prevContacts) =>
        prevContacts.filter((contact) => contact.id !== id)
      );
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <Navbar />
      <div>phone app</div>
      <h1>MY CONTACTS</h1>
      <Link to={"/add"}>
        <div className="text-6xl absolute right-10">+</div>
      </Link>
      <input
        className="py-2 border-black border-2 rounded-full"
        type="search"
        name=""
        id=""
      />
      {contacts.map((contact, index) => (
        <div key={contact.id} className="py-4">
          <span>{`${index + 1}.`}</span>
          <span className="px-8">{contact.firstName}</span>
          <span className="px-8">{contact.lastName}</span>
          <span className="px-8">{contact.phoneNumber}</span>
          <span className="px-8">{contact.email}</span>
          <Link className="px-4" to={`edit/${contact.id}`}>
            Edit
          </Link>
          <button className="px-4" onClick={(e) => handleDelete(contact.id)}>
            Delete
          </button>
        </div>
      ))}
    </>
  );
};

export default HomePage;
