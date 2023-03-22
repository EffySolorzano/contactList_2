export const testFetch = () => {
  fetch("https://assets.breatheco.de/apis/fake/contact/agenda/newSteph")
    .then((response) => response.json())
    .then((data) => console.log(data))
    .catch((error) => console.error(error));
};
