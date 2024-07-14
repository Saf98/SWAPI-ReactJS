import "./App.css";
import React, { Fragment, useState, useEffect, useRef } from "react";
import { getData } from "../services/getData";

function App() {
  const [charactersData, setCharactersData] = useState(null);

  const getResults = (data) => {
    return data.results;
  };

  useEffect(() => {
    getData().then((characters) => {
      const data = getResults(characters);
      setCharactersData(data);
    });
  }, []);


  return <p>Hello</p>;
}

export default App;
