export const contactStore = {
  listaContactos: [
    {
      full_name: "Dave Bradley",
      email: "dave@gmail.com",
      agenda_slug: "agenda_de_david",
      address: "47568 NW 34ST, 33434 FL, USA",
      phone: "7864445566",
    },
  ],
};

export function contactActions(getStore, getActions, setStore) {
  return {
    addContact: async (obj) => {
      let store = getStore();
      let arrTemp = store.listaContactos.slice();

      arrTemp.push(obj);
      setStore({ ...store, listaContactos: arrTemp });

      return store.listaContactos;
    },

    deleteContact: async (index) => {
      let store = getStore();
      let arrTemp = store.listaContactos.slice();

      if (window.confirm("Are you sure you want to delete this contact?")) {
        arrTemp.splice(index, 1);
        setStore({ ...store, listaContactos: arrTemp });
      }

      return store.listaContactos;
    },

    editContact: async (index, obj) => {
      let store = getStore();
      let arrTemp = store.listaContactos.slice();

      arrTemp[index] = obj;
      setStore({ ...store, listaContactos: arrTemp });

      return store.listaContactos;
    },
  };
}
