import { useEffect, useState } from "react";
import reactLogo from "./assets/react.svg";
import "./index.css";

function App() {
  const [randomName, setRandomName] = useState("");

  function handleInputChange(event) {
    setRandomName(event.target.value);
  }

  function handleButtonClick() {
    fetch("https://randomuser.me/api/")
      .then(response => response.json())
      .then(data => {
        setRandomName(data.results[0].name.first);
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
    </>
  );
}

export default App;