import React, { useState, useEffect, useContext } from "react";
import PropTypes from "prop-types";
import { Link, useParams } from "react-router-dom";
import { Context } from "../store/appContext";

const EditContact = (props) => {
  const params = useParams();
  const { store, actions } = useContext(Context);
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [address, setAddress] = useState("");
  const [phone, setPhone] = useState("");
  const [isLoaded, setIsLoaded] = useState(false);
  const [contacto, setContacto] = useState();

  useEffect(() => {
    let funcionCargaContacto = async () => {
      let { respuestaJson, response } = await actions.useFetch(
        `/apis/fake/contact/${params.contactID}`
      );
      console.log(respuestaJson);
      setContacto(respuestaJson);
      setFullName(respuestaJson.full_name);
      setEmail(respuestaJson.email);
      setAddress(respuestaJson.address);
      setPhone(respuestaJson.phone);
      setIsLoaded(true);
    };
    funcionCargaContacto();
  }, []);

  useEffect(() => {}, [contacto]);

  const handleSubmit = async () => {
    const editedContact = {
      full_name: fullName,
      email,
      phone,
      address,
      agenda_slug: "newSteph",
    };

    let { respuestaJson, response } = await actions.useFetch(
      `/apis/fake/contact/${params.contactID}`,
      editedContact,
      "PUT"
    );
    if (!response.ok) {
      console.log(response);
      alert(
        "There was an error, please carefully review the information and try again"
      );
      return;
    }

    setContacto(editedContact);

    alert("You have edited the contact");
  };

  return (
    <div className="container mt-4 bg-light p-3">
      <div className="d-flex align-items-center">
        <h1>Edit Contact: {isLoaded && contacto.full_name}</h1>
      </div>
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
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
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
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className="col-12">
          <label htmlFor="address" className="form-label">
            Address:
          </label>
          <input
            type="text"
            className="form-control"
            id="address"
            name="address"
            placeholder="Enter address"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
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
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
          />
        </div>
        <div className="col-md-4 d-flex align-items-end justify-content-center">
          <div className="d-flex justify-content-between w-100">
            <button
              type="button"
              className="btn btn-success w-50 mt-4"
              onClick={handleSubmit}
            >
              Save
            </button>
            <Link to="/">
              <button type="button" className="btn btn-danger m-3">
                Cancel
              </button>
            </Link>
          </div>
        </div>
      </form>
    </div>
  );
};

export default EditContact;

EditContact.propTypes = {
  match: PropTypes.object,
};
