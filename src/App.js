import "./App.css";
import React, { Fragment, useState, useEffect, useRef } from "react";
import { getData } from "./services/getData";
import Results from "./components/Results";
import Search from "./components/Search";
import { BasicTable } from "./components/BasicTable";
import { FilteringTable } from "./components/FilteringTable";

function App() {
  const [charactersData, setCharactersData] = useState(null);
  const [characterName, setCharacterName] = useState("");
  const [filteredData, setFilteredData] = useState(null);
  const [sort, setSort] = useState({ keyToSort: "Name", direction: "asc" });
  const inputRef = useRef(null);
  useEffect(() => {
    const apiData = getData();
    apiData.then((data) => {
      setCharactersData(data.results);
    });
  }, []);

  const checkCharacterName = () => {
    setFilteredData(
      charactersData.filter((character) => {
        if (!character.name) {
          console.warn("This property does not exist");
          return null;
        }

        return character.name.toLowerCase().includes(characterName);
      })
    );
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    checkCharacterName();
  };

  // const handleHeaderClick = (header) => {
  //   console.log(header.getElement);
  // };

  return (
    <Fragment>
      {/* <Search
        handleSubmit={handleSubmit}
        character={characterName}
        onChange={(characterName) => setCharacterName(characterName)}
      />
      <div className="container">
        <div className="row">
          {filteredData && <Results data={filteredData} />}
        </div>
      </div> */}
      <FilteringTable />
    </Fragment>
  );
}

export default App;
