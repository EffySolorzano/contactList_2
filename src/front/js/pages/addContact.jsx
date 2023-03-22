import React, { useContext, useState, useEffect } from "react";
import { Context } from "../store/appContext";
import { Link } from "react-router-dom";

const AddContact = () => {
  const { store, actions } = useContext(Context);
  const [data, setData] = useState({});

  let newContact = {
    full_name: "Steph La Cheffe",
    email: "solorzano.steph@gmail.com",
    phone: "+1 (786) 830-7059",
    agenda_slug: "newSteph",
    address: "5930 SW 10th St, West Miami 33144. FL, USA",
  };

  useEffect(() => {}, [data.full_name, data.phone, data.adress, data.email]);

  return (
    <div className="card mx-auto mt-5" style={{ width: "25rem" }}>
      <div className="card-body">
        <h5 className="card-title text-center">New Contact</h5>
        <Link className="btn btn-warning mb-3" to="/">
          Go back to contact list
        </Link>
        <div className="form-floating mb-3">
          <input
            className="form-control"
            placeholder="Name"
            onChange={(e) => {
              setData({ ...data, full_name: e.target.value });
            }}
          />
          <label htmlFor="floatingInput">Name</label>
        </div>
        <div className="form-floating mb-3">
          <input
            className="form-control"
            placeholder="Phone Number"
            onChange={(e) => {
              setData({ ...data, phone: e.target.value });
            }}
          />
          <label htmlFor="floatingInput">Phone Number</label>
        </div>
        <div className="form-floating mb-3">
          <input
            className="form-control"
            placeholder="Address"
            onChange={(e) => {
              setData({ ...data, address: e.target.value });
            }}
          />
          <label htmlFor="floatingInput">Address</label>
        </div>
        <div className="form-floating mb-3">
          <input
            className="form-control"
            placeholder="Email"
            onChange={(e) => {
              setData({ ...data, email: e.target.value });
            }}
          />
          <label htmlFor="floatingInput">Email</label>
        </div>
        <button
          type="button"
          className="btn btn-primary"
          onClick={() => {
            actions.addContact(data);
          }}
        >
          Add contact
        </button>
      </div>
    </div>
  );
};

export default AddContact;
