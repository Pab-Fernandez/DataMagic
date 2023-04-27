import { useEffect, useState } from "react";
import reactLogo from "./assets/react.svg";
import "./index.css";

function App() {
  const [randomName, setRandomName] = useState("");
  const [gender, setGender] = useState("");
  const [nationalityProbability, setNationalityProbability] = useState("");
  const [nation, setNation] = useState("");
  const [age, setAge] = useState ('');


  
  function handleInputChange(event) {
    setRandomName(event.target.value);
  }


  function handleButtonClick() {
    fetch("https://randomuser.me/api/")
      .then(response => response.json())
      .then(data => {
        setRandomName(data.results[0].name.first);
        fetch(`https://api.genderize.io?name=${data.results[0].name.first}`)
        .then(response => response.json())
        .then(data => {
      
          setGender(data.gender);
        })
        .catch(error => console.error(error));

        fetch(`https://api.nationalize.io/?name=${data.results[0].name.first}`)
        .then(response => response.json())
        .then(data => {
          const countries = data.country;
          const highestProbabilityCountry = countries.reduce((acc, curr) => {
            if (curr.probability > acc.probability) {
              return curr;
            } else {
              return acc;
            }
          });
          setNation(highestProbabilityCountry.country_id);
          setNationalityProbability(`${(highestProbabilityCountry.probability * 100).toFixed(2)}%`);
        })
        .catch(error => console.error(error));
        fetch(`https://api.agify.io?name=${data.results[0].name.first}`)
        .then(response => response.json())
        .then(data => {
          setAge(data.age);
        })
        .catch(error => console.error(error));
    })
    
    .catch(error => console.error(error));
  }
  
  return (
    <>
      <h1>Data Magic</h1>
      <br />
      <br />
      <div>
        <h3>
          Ingrese un nombre: <input type="text" onChange={handleInputChange}/>
        </h3>
        {randomName !== "" && <h2>Estos son datos para {randomName}</h2>}
      </div>
      <div>
        <h2>O utilize nuestro</h2>
        <button onClick={handleButtonClick}>Rayo Randomizador</button>
      </div>

      <section>
      <h1> Datos</h1>
      <br />
      <br />
      <h2>Nuestras magia indica que es</h2>
      <h2> {gender} </h2>
      <h2> {nation} {nationalityProbability}</h2>
      <h2>{age}</h2>

      </section>
    </>
  );
}

export default App;