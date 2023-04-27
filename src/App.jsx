import { useEffect, useState, useRef } from "react";
import reactLogo from "./assets/react.svg";
//import "./index.css";
//import "./app.css"
import { Layout, Button, Space } from 'antd';


function App() {
  const [randomName, setRandomName] = useState("");
  const [gender, setGender] = useState("");
  const [nationalityProbability, setNationalityProbability] = useState("");
  const [nation, setNation] = useState("");
  const [age, setAge] = useState("");

  const inputRef = useRef(null);
  useEffect(() => {
    if (!randomName) {
      return;
    }
    fetch(`https://api.genderize.io?name=${randomName}`)
      .then((response) => response.json())
      .then((data) => {
        setGender(data.gender);
      })
      .catch((error) => console.error(error));

    fetch(`https://api.nationalize.io/?name=${randomName}`)
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        const countries = data.country;
        const highestProbabilityCountry = countries?.[0];
        setNation(highestProbabilityCountry.country_id);
        setNationalityProbability(
          `${(highestProbabilityCountry.probability * 100).toFixed(2)}%`
        );
      })
      .catch((error) => console.error(error));
    fetch(`https://api.agify.io?name=${randomName}`)
      .then((response) => response.json())
      .then((data) => {
        setAge(data.age);
      })
      .catch((error) => console.error(error));
  }, [randomName]);

  function handleButtonClick() {
    fetch("https://randomuser.me/api/")
      .then((response) => response.json())
      .then((data) => {
        setRandomName(data.results[0].name.first);
      });
  }
  function handleFormSubmit(event) {
    event.preventDefault();
    const inputText = inputRef.current.value.trim();
    console.log ('asd')

    if (inputText === "") {
      handleButtonClick();
    } else {
      setRandomName(inputText);
    }
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
            <button  type="submit">Obtener datos mágicos</button>
          </form>
        </h3>
      
      </div>
      <div>
        <h2>O utilice nuestro</h2>
        <button  onClick={handleButtonClick}>Rayo Randomizador</button>
      </div>
      {randomName !== "" && <h2>Estos son datos para {randomName}</h2>}

      <section >
        <h1> Datos</h1>
        <br />
        <br />
        <h2>Nuestras magia indica que es</h2>
        <h2 class= "mayus" > {gender} </h2>
        <h2> {age} años</h2>
        <h2>
          {" "}
          {nationalityProbability} {nation}
        </h2>
      </section>

      <section>
      <h1>Lista de datos mágicos</h1>
      </section>
    </>
  );
}

export default App;
