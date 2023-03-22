import React, { useContext, useState, useEffect } from "react";
import { Context } from "../store/appContext";
import { Link } from "react-router-dom";

const Card = () => {
  const { store, actions } = useContext(Context);
  const [lista, setLista] = useState();

  useEffect(() => {
    let funcionCarga = async () => {
      let { respuestaJson, response } = await actions.useFetch(
        "/apis/fake/contact/agenda/issaNahil_ContactList"
      );
      console.log(respuestaJson);
      setLista(respuestaJson);
    };
    funcionCarga();
  }, []);

  useEffect(() => {}, [lista]);

  const handleDelete = async (deleteID) => {
    let { respuestaJson, response } = await actions.useFetch(
      `/apis/fake/contact/${deleteID}`,
      null,
      "DELETE"
    );
    console.log(response);
    if (!response.ok) {
      alert(response.statusText);
      return;
    }
    // Create a new array with the same elements as lista
    let newList = lista.slice();
    // Use filter method to remove the element with the specified ID
    newList = newList.filter((item) => item.id !== deleteID);
    // Update the lista state with the new array
    setLista(newList);
    alert("The contact has been deleted.");
  };

  return (
    <>
      <div className="row">
        <div className="card">
          <ul className="list-group list-group-flush">
            {lista && lista.length > 0 ? (
              <>
                {lista.map((item, index) => {
                  return (
                    <li
                      key={index}
                      className="list-group-item d-flex mt-2 mb-2 text-center"
                    >
                      <img
                        src="data:image/jpeg;base64,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"
                        className="rounded rounded-circle ms-5 me-5"
                        style={{ width: "15%" }}
                      />
                      <div className="d-flex flex-column align-items-start col-4">
                        <h5>{item.full_name}</h5>
                        <div className="d-flex align-items-center my-1">
                          <i className="fa-solid fa-map-pin"></i>
                          <span className="ms-3 fw-bold">{item.address}</span>
                        </div>
                        <div className="d-flex align-items-center my-1">
                          <i className="fa-solid fa-phone"></i>
                          <span className="ms-3" style={{ fontSize: "14px" }}>
                            {item.phone}
                          </span>
                        </div>
                        <div className="d-flex align-items-center my-1">
                          <i className="fa-solid fa-envelopes-bulk"></i>
                          <span className="ms-3" style={{ fontSize: "12px" }}>
                            {item.email}
                          </span>
                        </div>
                      </div>
                      <div>
                        <Link to={"/edit-contact/" + item.id}>
                          <i className="fa-solid fa-user-pen"></i>
                        </Link>
                        <i
                          className="fa-solid fa-trash-can ms-4 text-danger"
                          onClick={() => {
                            if (
                              window.confirm(
                                "Are you sure you want to delete this contact?"
                              )
                            ) {
                              handleDelete(item.id);
                            }
                          }}
                        ></i>
                      </div>
                    </li>
                  );
                })}
              </>
            ) : (
              <li className="list-group-item text-center">
                <h3>There are no contacts to show</h3>
              </li>
            )}
          </ul>
        </div>
      </div>
    </>
  );
};

export default Card;
