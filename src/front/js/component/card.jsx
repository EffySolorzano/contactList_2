import React, { useContext, useState, useEffect } from "react";
import { Context } from "../store/appContext";
import { Link } from "react-router-dom";
import "../../styles/home.css";

const Card = () => {
  const { store, actions } = useContext(Context);
  const [lista, setLista] = useState();

  useEffect(() => {
    let funcionCarga = async () => {
      let { respuestaJson } = await actions.useFetch(
        "/apis/fake/contact/agenda/newSteph"
      );
      setLista(respuestaJson);
    };
    funcionCarga();
  }, []);

  useEffect(() => {}, [lista]);

  return (
    <>
      <div className="card">
        <ul className="list-group list-group-flush">
          {lista && lista.length > 0 ? (
            <>
              {lista.map((item, index) => {
                return (
                  <li key={index} className="list-group-item d-flex mt-2 mb-2">
                    <img
                      src="https://helios-i.mashable.com/imagery/articles/04b5Pjp3N03vQQuyYLz6XRa/hero-image.fill.size_1200x1200.v1623364951.png"
                      className="rounded rounded-circle ms-5 me-5"
                      style={{ width: "15%" }}
                    />
                    <div className="d-flex flex-column align-items-start col-8">
                      <h5>{item.full_name}</h5>
                      <div className="d-flex align-items-center text-secondary my-1">
                        <i className="fa-solid fa-location-dot"></i>
                        <span className="ms-3 fw-bold">{item.address}</span>
                      </div>
                      <div className="d-flex align-items-center text-secondary my-1">
                        <i className="fa-solid fa-phone-flip"></i>
                        <span className="ms-3" style={{ fontSize: "14px" }}>
                          {item.phone}
                        </span>
                      </div>
                      <div className="d-flex align-items-center text-secondary my-1">
                        <i className="fa-solid fa-envelope"></i>
                        <span className="ms-3" style={{ fontSize: "12px" }}>
                          {item.email}
                        </span>
                      </div>
                    </div>
                    <div>
                      <Link to={"/edit-contact/" + item.id}>
                        <i className="fa-solid fa-pencil"></i>
                      </Link>
                      <i
                        className="fa-solid fa-trash-can ms-4"
                        onClick={async () => {
                          let deleteID = item.id;
                          let { response } = await actions.useFetch(
                            `/apis/fake/contact/${deleteID}`,
                            null,
                            "DELETE"
                          );
                          console.log(response);
                          if (!response.ok) {
                            alert("Error deleting contact");
                            return;
                          }
                          // Create a new array with the same elements as lista
                          let newList = lista.slice();
                          // Use filter method to remove the element with the specified ID
                          newList = newList.filter(
                            (item) => item.id !== deleteID
                          );
                          // Update the lista state with the new array
                          setLista(newList);
                          alert("Contact deleted successfully");
                        }}
                      ></i>
                    </div>
                  </li>
                );
              })}
            </>
          ) : (
            <li className="list-group-item text-center">
              <h1>There are no contacts to show</h1>
            </li>
          )}
        </ul>
      </div>
    </>
  );
};

export default Card;
