import { useEffect, useState, useRef } from "react";
import reactLogo from "./assets/react.svg";
//import "./index.css";
//import "./app.css"
import { Layout, Button, Space } from "antd";

function App() {
  const [name, setName] = useState("");
  const [gender, setGender] = useState("");
  const [nationalityProbability, setNationalityProbability] = useState("");
  const [country, setCountry] = useState("");
  const [age, setAge] = useState("");

  const inputRef = useRef(null);
  useEffect(() => {
    if (!name) {
      return;
    }
    fetch(`https://api.genderize.io?name=${name}`)
      .then((response) => response.json())
      .then((data) => {
        setGender(data.gender);
      })
      .catch((error) => console.error(error));

    fetch(`https://api.nationalize.io/?name=${name}`)
      .then((response) => response.json())
      .then((data) => {
        const countries = data.country;
        const highestProbabilityCountry = countries?.[0];
        setCountry(highestProbabilityCountry.country_id);
        setNationalityProbability(
          `${(highestProbabilityCountry.probability * 100).toFixed(2)}%`
        );
      })
      .catch((error) => console.error(error));
    fetch(`https://api.agify.io?name=${name}`)
      .then((response) => response.json())
      .then((data) => {
        setAge(data.age);
      })
      .catch((error) => console.error(error));
  }, [name]);

  function handleButtonClick() {
    fetch("https://randomuser.me/api/")
      .then((response) => response.json())
      .then((data) => {
        setName(data.results[0].name.first);
      });
  }

  function handleFormSubmit(event) {
    event.preventDefault();
    const inputText = inputRef.current.value.trim();

    if (inputText === "") {
      handleButtonClick();
    } else {
      setName(inputText);
    }

    // Crear el objeto con los datos obtenidos
    const dataObject = {
      name,
      gender,
      age,
      nationalityProbability,
      country,
    };

    // Convertir el objeto a JSON y guardarlo en Local Storage
    localStorage.setItem("data", JSON.stringify(dataObject));
  }
  return (
    <>
      <h1>Data Magic</h1>
      <br />
      <br />
      <div>
        <h3>
          <form onSubmit={handleFormSubmit}>
            <label>
              <h3>Ingrese el nombre</h3>
              <input ref={inputRef} type="text" />
            </label>
            <br />
            <button type="submit">Obtener datos mágicos</button>
          </form>
        </h3>
      </div>
      <div>
        <h2>O utilice nuestro</h2>
        <button onClick={handleButtonClick}>Rayo Randomizador</button>
      </div>
      {name !== "" && <h2>Estos son datos para {name}</h2>}

      {name && (
        <section>
          <h1> Datos</h1>
          <h2>Nuestras magia indica que es</h2>
          <h2 class="mayus"> {gender} </h2>
          <h2> {age} años</h2>
          <h2>
            {" "}
            {nationalityProbability} {country}
          </h2>
        </section>
      )}
{name && (
      <section>
        <h1>Lista de datos mágicos</h1>
      </section>
)}
    </>
  );
}

export default App;
