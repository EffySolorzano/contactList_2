import React, { useState, useEffect, useContext } from "react";
import { Context } from "../store/appContext";
import { Link } from "react-router-dom";
import { EditContact } from "./editContact.jsx";

const Contactos = () => {
  const { store, actions } = useContext(Context);
  const [lista, setLista] = useState(store.listaContactos);
  const [refresh, setRefresh] = useState(false);
  const [editingIndex, setEditingIndex] = useState(null);

  const handleEdit = (index) => {
    const contact = lista[index];
    actions.setContactInfo(contact.full_name, contact.email, contact.phone);
    setEditingIndex(index);
  };

  const handleDelete = (index) => {
    actions.deleteContact(index);
  };

  useEffect(() => {
    const fetchContactAgenda = async () => {
      const { respuestaJson, response } = await actions.useFetch(
        "/apis/fake/contact/agenda/agenda_de_antonio",
        null
      );
      setLista(respuestaJson);
    };
    fetchContactAgenda();
  }, [refresh]);

  return (
    <div className="container">
      <br />
      <div className="d-flex justify-content-between">
        <Link to="/add-contact" className="btn btn-success">
          Add a contact
        </Link>
        <br />
        <form className="d-flex">
          <input
            className="form-control me-2"
            type="search"
            placeholder="Search"
            aria-label="Search"
          />
          <button className="btn btn-outline-primary" type="submit">
            Search
          </button>
        </form>
      </div>
      <br />
      <ul className="list-group">
        {store.listaContactos && store.listaContactos.length > 0 ? (
          store.listaContactos.map((item, index) => {
            return (
              <div className="row border-bottom py-3" key={index}>
                <div className="col-2">
                  <img className="image" src="data:image/jpeg;base64,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"></img>
                </div>
                <div className="col-8 text">
                  <h3 className="mb-3">{item.full_name}</h3>
                  <p className="text">
                    <i className="fa-solid fa-envelopes-bulk"></i>
                    {item.email}
                  </p>
                  <p className="text2">
                    <i className="fa-solid fa-phone"></i>
                    {item.phone}
                  </p>
                  <p className="text3">
                    <i className="fa-solid fa-location-dot"></i>
                    {item.address}
                  </p>
                </div>
                <div className="col-2">
                  <div className="btn-group-vertical">
                    <button
                      className="btn btn-danger btn-sm"
                      id="btn"
                      onClick={() => handleDelete(index)}
                    >
                      <i className="fa-solid fa-trash-can"></i>
                    </button>
                    <button
                      className="btn btn-secondary btn-sm"
                      id="btn"
                      onClick={() => handleEdit(index)}
                    >
                      <i className="fa-solid fa-pencil"></i>
                    </button>
                  </div>
                </div>
              </div>
            );
          })
        ) : (
          <div className="text-center py-3">0 contacts</div>
        )}
      </ul>

      {editingIndex !== null && (
        <EditContact
          contacts={store.listaContactos}
          onSave={(editedContact) => {
            actions.editContact(editingIndex, editedContact);
            setEditingIndex(null);
          }}
          onCancel={() => setEditingIndex(null)}
          index={editingIndex}
        />
      )}
    </div>
  );
};

export default Contactos;