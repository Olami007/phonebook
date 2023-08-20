import React, { useState } from "react";
import axios from "axios";
import { Link, useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const EditContact = () => {
  const navigate = useNavigate();

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [email, setEmail] = useState("");

  // set up notification messages
  const successMessage = () => toast("Contact edited successfully!");
  const errorMessage = () => toast("Error editing contact!");

  // fetching the contact's id sing useParams hook
  const { id } = useParams();

  // an asynchronous function to update the contact by sending the new form data accompanied with its id to an api
  const handleSubmit = async (e) => {
    e.preventDefault();

    // If any of the required fields are empty, display an error message
    if (!firstName || !lastName || !phoneNumber || !email) {
      errorMessage();
      return;
    }

    axios
      .put(`http://localhost:7000/edit/${id}`, {
        firstName,
        lastName,
        phoneNumber,
        email,
      })
      .then((res) => {
        console.log(res);

        // redirecting to landing page if update is successful
        navigate("/");

        // display success message
        setTimeout(() => {
          successMessage();
        }, 2000);
      })
      .catch((err) => {
        console.log(err);

        // display error message
        setTimeout(() => {
          errorMessage();
        }, 2000);
      });
  };

  return (
    // <>
    //   <div>EditContact</div>
    //   <form action="" onSubmit={handleSubmit}>
    //     <label htmlFor="firstName">First Name</label>
    //     <input
    //       className="px-4 border-2"
    //       type="text"
    //       id="firstName"
    //       name="firstName"
    //       placeholder="first name"
    //       onChange={(e) => setFirstName(e.target.value)}
    //     />

    //     <label htmlFor="lastName">Last Name</label>
    //     <input
    //       className="px-4 border-2"
    //       type="text"
    //       id="lastName"
    //       name="lastName"
    //       placeholder="last name"
    //       onChange={(e) => setLastName(e.target.value)}
    //     />
    //     <label htmlFor="phoneNumber">Phone Number</label>
    //     <input
    //       className="px-4 border-2"
    //       type="text"
    //       id="phoneNumber"
    //       name="phoneNumber"
    //       placeholder="Phone Number"
    //       onChange={(e) => setPhoneNumber(e.target.value)}
    //     />
    //     <label htmlFor="email">Email Address</label>
    //     <input
    //       className="px-4 border-2"
    //       type="text"
    //       id="email"
    //       name="email"
    //       placeholder="Email Address"
    //       onChange={(e) => setEmail(e.target.value)}
    //     />

    //     <button>UPDATE</button>
    //   </form>
    // </>
    <div className="p-4">
      <h1 className="text-3xl font-bold mb-4 text-center">Edit Contact</h1>
      <div className="pl-6 py-6 ">
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
              type="text"
              id="email"
              name="email"
              placeholder="Email Address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <button
            className="px-4 py-2 mx-4 bg-green-500 text-white rounded hover:bg-green-800"
            type="submit"
          >
            UPDATE
          </button>
          <Link
            to={"/"}
            className="px-4 py-2 bg-red-500 text-white rounded hover:bg-blue-600"
          >
            CANCEL
          </Link>
        </form>
      </div>
    </div>
  );
};

export default EditContact;
