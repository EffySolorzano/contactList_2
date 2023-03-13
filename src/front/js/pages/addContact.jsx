import React, { useContext, useState, useEffect } from "react";
import { Context } from "../store/appContext";
import { Link } from "react-router-dom";

const AddContact = () => {
  const { store, actions } = useContext(Context);
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    actions.addContact({
      full_name: fullName,
      email: email,
      phone: phone,
      address: address,
    });
  };

  useEffect(() => {}, [fullName, phone, email]);

  return (
    <div>
      <br />
      <Link to="/" className="btn btn-secondary" id="back">Go back to the contact list</Link>
      <br />
      <div className="container">
        <form onSubmit={handleSubmit} className="my-5">
          <h2 className="mb-3 title">Add Contact</h2>
          <div className="form-group form">
            <label>Full Name:</label>
            <input
              type="text"
              className="form-control"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
            />
          </div>
          <div className="form-group">
            <label>Email:</label>
            <input
              type="email"
              className="form-control"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="form-group">
            <label>Phone:</label>
            <input
              type="tel"
              className="form-control"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
            />
          </div>
          <div className="form-group">
            <label>Address:</label>
            <input
              type="text"
              className="form-control"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
            />
          </div>

          <button type="submit" className="btn btn-primary">
            Agregar Contacto a la Agenda
          </button>
        </form>

        <br />
        <button className="btn btn-warning"
          onClick={async () => {
            let { respuestaJson, response } = await actions.useFetch(
              "/apis/fake/contact/",
              {
                full_name: fullName,
                email: email,
                agenda_slug: "agenda_de_antonio",
                address: "47568 NW 34ST, 33434 FL, USA",
                phone: phone,
              },
              "POST"
            );
            if (!response.ok) {
              alert("No se registró el contacto");
              return;
            }
            console.log("Contacto creado: \n", respuestaJson);
          }}
        >
          Fecth button
        </button>
      </div>
    </div>
  );
};

export default AddContact;