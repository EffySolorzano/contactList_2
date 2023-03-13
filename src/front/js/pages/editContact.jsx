import React, { useState } from "react";
import PropTypes from "prop-types";
import { useParams } from "react-router-dom";

export const EditContact = ({ contacts, onSave, onCancel }) => {
  const { id } = useParams();
  const contact = contacts.find((c) => c.id === id);
  const [fullName, setFullName] = useState(contact.full_name || "");
  const [email, setEmail] = useState(contact.email || "");
  const [phone, setPhone] = useState(contact.phone || "");
  const [address, setAddress] = useState(contact.address || "");

  const handleSave = (event) => {
    event.preventDefault();
    onSave({
      id: contact.id,
      full_name: fullName,
      email: email,
      phone: phone,
      address: address,
    });
    window.location.href = "/";
  };

  const handleCancel = (event) => {
    event.preventDefault();
    onCancel();
  };

  return (
    <div className="card">
      <div className="card-header">
        <h5>Edit Contact</h5>
      </div>
      <div className="card-body">
        <form onSubmit={handleSave}>
          <div className="form-group">
            <label htmlFor="fullName">Full Name</label>
            <input
              type="text"
              className="form-control"
              id="fullName"
              value={fullName}
              onChange={(event) => setFullName(event.target.value)}
            />
          </div>
          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              className="form-control"
              id="email"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
            />
          </div>
          <div className="form-group">
            <label htmlFor="phone">Phone</label>
            <input
              type="text"
              className="form-control"
              id="phone"
              value={phone}
              onChange={(event) => setPhone(event.target.value)}
            />
          </div>
          <div className="form-group">
            <label htmlFor="address">Address</label>
            <input
              type="text"
              className="form-control"
              id="address"
              value={address}
              onChange={(event) => setAddress(event.target.value)}
            />
          </div>
          <button type="submit" className="btn btn-primary me-2">
            Save
          </button>
          <button
            type="button"
            className="btn btn-secondary"
            onClick={handleCancel}
          >
            Cancel
          </button>
        </form>
      </div>
    </div>
  );
};

EditContact.propTypes = {
  contacts: PropTypes.array.isRequired,
  onSave: PropTypes.func.isRequired,
  onCancel: PropTypes.func.isRequired,
};

export default EditContact;