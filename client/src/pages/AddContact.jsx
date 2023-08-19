import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const AddContact = () => {
  const navigate = useNavigate();

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [email, setEmail] = useState("");
  const handleSubmit = async (e) => {
    e.preventDefault();

    axios
      .post("http://localhost:7000/add", {
        firstName,
        lastName,
        phoneNumber,
        email,
      })
      .then((res) => {
        console.log(res);
        navigate("/");
      })
      .catch((err) => {
        console.log(err);
      });
    // console.log(firstName, lastName, phoneNumber, email);
  };

  return (
    <>
      <div>AddContact</div>
      <form action="" onSubmit={handleSubmit}>
        <label htmlFor="firstName">First Name</label>
        <input
          className="px-4 border-2"
          type="text"
          id="firstName"
          name="firstName"
          placeholder="first name"
          onChange={(e) => setFirstName(e.target.value)}
        />

        <label htmlFor="lastName">Last Name</label>
        <input
          className="px-4 border-2"
          type="text"
          id="lastName"
          name="lastName"
          placeholder="last name"
          onChange={(e) => setLastName(e.target.value)}
        />
        <label htmlFor="phoneNumber">Phone Number</label>
        <input
          className="px-4 border-2"
          type="text"
          id="phoneNumber"
          name="phoneNumber"
          placeholder="Phone Number"
          onChange={(e) => setPhoneNumber(e.target.value)}
        />
        <label htmlFor="email">Email Address</label>
        <input
          className="px-4 border-2"
          type="text"
          id="email"
          name="email"
          placeholder="Email Address"
          onChange={(e) => setEmail(e.target.value)}
        />

        <button>ADD CONTACT</button>
      </form>
    </>
  );
};

export default AddContact;
