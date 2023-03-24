import React, { useContext } from "react";
import { Context } from "../store/appContext";
import { Link } from "react-router-dom";

const AddContact = () => {
  const { store, actions } = useContext(Context);

  const handleAddContact = async () => {
    const full_name = document.getElementById("full-name").value;
    const email = document.getElementById("email").value;
    const phone = document.getElementById("phone").value;
    const address = document.getElementById("address").value;

    const newContact = {
      full_name,
      email,
      phone,
      address,
      agenda_slug: "issaNahil_ContactList",
    };
    const { respuestaJson, response } = await actions.useFetch(
      "/apis/fake/contact/",
      newContact,
      "POST"
    );
    if (!response.ok) {
      console.log(response);
      alert(
        "There was an error, please carefully review the information and try again"
      );
      return;
    }

    alert("You have added a new contact to the list");

    document.getElementById("full-name").value = "";
    document.getElementById("email").value = "";
    document.getElementById("phone").value = "";
    document.getElementById("address").value = "";
  };

  return (
    <div className="container mt-5 bg-light p-5">
      <div className="align-items-center">
        <Link to="/">
          <button type="button" className="btn btn-warning button1">
            Go Back to contact list
          </button>
        </Link>
        <br />
        <br />

        <h5 className="text-center">Add Contact</h5>
      </div>
      <br />
      <form className="row g-3">
        <div className="col-md-6">
          <label htmlFor="full-name" className="form-label">
            Full Name:
          </label>
          <input
            type="text"
            className="form-control"
            id="full-name"
            name="full-name"
            placeholder="Enter full name"
          />
        </div>
        <div className="col-md-6">
          <label htmlFor="email" className="form-label">
            Email:
          </label>
          <input
            type="email"
            className="form-control"
            id="email"
            name="email"
            placeholder="Enter email"
          />
        </div>
        <div className="col-6">
          <label htmlFor="address" className="form-label">
            Address:
          </label>
          <input
            type="text"
            className="form-control"
            id="address"
            name="address"
            placeholder="Enter address"
          />
        </div>
        <div className="col-md-6">
          <label htmlFor="phone" className="form-label">
            Phone:
          </label>
          <input
            type="tel"
            className="form-control"
            id="phone"
            name="phone"
            placeholder="Enter phone number"
          />
        </div>
        <div className="col-md-4 d-flex align-items-start">
          <button
            type="button"
            className="btn btn-primary button2"
            onClick={handleAddContact}
          >
            Add Contact
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddContact;
