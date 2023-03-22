import React, { useContext, useState, useEffect } from "react";
import { Context } from "../store/appContext";
import { Link } from "react-router-dom";
import Card from "../component/card.jsx";
import "../../styles/home.css";

const ContactList = () => {
  const { store, actions } = useContext(Context);

  return (
    <>
      <div className="container w-75">
        <div className="d-flex justify-content-end mt-3 mb-3">
          <Link to="/add-contact">
            <button type="button" className="btn btn-success">
              Add New Contact
            </button>
          </Link>
        </div>
        <Card />
      </div>
    </>
  );
};

export default ContactList;
