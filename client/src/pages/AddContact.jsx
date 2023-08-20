import React, { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const AddContact = () => {
  const navigate = useNavigate();

  // used stateful values for the form data
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [email, setEmail] = useState("");

  // set up notification messages
  const successMessage = () => toast("Contact added successfully!");
  const errorMessage = () => toast("Error adding contact!");

  // An asynchronous function set up to send the formdata to an api
  const handleSubmit = async (e) => {
    e.preventDefault();

    // If any of the required fields are empty, display an error message
    if (!firstName || !lastName || !phoneNumber || !email) {
      errorMessage();
      return;
    }

    axios
      .post("http://localhost:7000/add", {
        firstName,
        lastName,
        phoneNumber,
        email,
      })
      .then((res) => {
        console.log(res);

        // if the post is successful, navigate to landing page
        navigate("/");
        setTimeout(() => {
          successMessage();
        }, 2000);
      })
      .catch((err) => {
        console.log(err);
        setTimeout(() => {
          errorMessage();
        }, 2000);
      });
  };

  return (
    <div className="p-4">
      <h1 className="text-3xl font-bold mb-4">Add Contact</h1>
      <form action="" onSubmit={handleSubmit} className="max-w-md text-black">
        <div className="mb-4">
          <label htmlFor="firstName" className="block font-semibold mb-1">
            First Name
          </label>
          <input
            className="w-full px-3 py-2 border border-gray-300 rounded"
            type="text"
            id="firstName"
            name="firstName"
            placeholder="First Name"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
          />
        </div>
        <div className="mb-4">
          <label htmlFor="lastName" className="block font-semibold mb-1">
            Last Name
          </label>
          <input
            className="w-full px-3 py-2 border border-gray-300 rounded"
            type="text"
            id="lastName"
            name="lastName"
            placeholder="Last Name"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
          />
        </div>
        <div className="mb-4">
          <label htmlFor="phoneNumber" className="block font-semibold mb-1">
            Phone Number
          </label>
          <input
            className="w-full px-3 py-2 border border-gray-300 rounded"
            type="text"
            id="phoneNumber"
            name="phoneNumber"
            placeholder="Phone Number"
            value={phoneNumber}
            onChange={(e) => setPhoneNumber(e.target.value)}
          />
        </div>
        <div className="mb-4">
          <label htmlFor="email" className="block font-semibold mb-1">
            Email Address
          </label>
          <input
            className="w-full px-3 py-2 border border-gray-300 rounded"
            type="mail"
            id="email"
            name="email"
            placeholder="Email Address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <button
          className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600 mx-4"
          type="submit"
        >
          ADD CONTACT
        </button>
        <Link
          to={"/"}
          className="px-4 py-2 bg-red-500 text-white rounded hover:bg-blue-600"
        >
          CANCEL
        </Link>
      </form>
    </div>
  );
};

export default AddContact;
