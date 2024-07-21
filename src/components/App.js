import "./App.css";
import React, { Fragment, useState, useEffect, useRef } from "react";
import { getData } from "../services/getData";

function App() {
  let defaultFilterKeys = [
    "name",
    "gender",
    "birth_year",
    "hair_color",
    "eye_color",
  ];
  const [charactersData, setCharactersData] = useState([]);
  const [selectedFilters, setSelectedFilters] = useState([]);
  const [filteredItems, setFilteredItems] = useState(defaultFilterKeys);
  const [inputFieldValue, setInputFieldValue] = useState("");

  const getResults = (data) => {
    return data.results;
  };

  useEffect(() => {
    getData().then((characters) => {
      const data = getResults(characters);
      setCharactersData(data);
    });
  }, []);

  useEffect(() => {
    filterCols();
  }, [selectedFilters]);

  const handleFilterCols = (selectedCategoryValues) => {
    if (selectedFilters.includes(selectedCategoryValues)) {
      defaultFilterKeys = selectedFilters.filter(
        (el) => el !== selectedCategoryValues
      );
      setSelectedFilters(defaultFilterKeys);
    } else {
      setSelectedFilters([...selectedFilters, selectedCategoryValues]);
    }
  };

  const filterCols = () => {
    if (selectedFilters.length) {
      let tempItems = selectedFilters.map((selectedCategory) => {
        let keysFromResults = charactersData.map((el) => {
          let res = Object.keys(el).filter((key) => {
            return key === selectedCategory;
          });
          return res;
        });
        return keysFromResults[0];
      });
      setFilteredItems(tempItems.flat());
    } else {
      return;
    }
  };

  return (
    <Fragment>
      <input
        value={inputFieldValue}
        onChange={(e) => setInputFieldValue(e.target.value)}
      />
      <div className="buttons-container">
        {defaultFilterKeys?.map((itemValue, idx) => {
          return (
            <button
              className={`button ${
                selectedFilters?.includes(itemValue) ? "active" : ""
              }`}
              onClick={() => handleFilterCols(itemValue)}
              key={idx}
              value={itemValue}
            >
              {itemValue}
            </button>
          );
        })}
      </div>
      <table>
        <thead>
          <tr>
            {selectedFilters.length <= 0
              ? defaultFilterKeys?.map((row, id) => {
                  return <th key={id}>{row}</th>;
                })
              : filteredItems?.map((row, id) => {
                  return <th key={id}>{row}</th>;
                })}
          </tr>
        </thead>
        <tbody>
          {selectedFilters.length <= 0
            ? charactersData?.map((character, idx) => {
                return (
                  <tr key={idx}>
                    <td>{character["name"]}</td>
                    <td>{character["gender"]}</td>
                    <td>{character["birth_year"]}</td>
                    <td>{character["hair_color"]}</td>
                    <td>{character["eye_color"]}</td>
                  </tr>
                );
              })
            : charactersData?.map((character, idx) => {
                return (
                  <tr key={idx}>
                    {selectedFilters.includes("name") ? (
                      <td>{character["name"]}</td>
                    ) : null}

                    {selectedFilters.includes("gender") ? (
                      <td>{character["gender"]}</td>
                    ) : null}
                    {selectedFilters.includes("birth_year") ? (
                      <td>{character["birth_year"]}</td>
                    ) : null}
                    {selectedFilters.includes("hair_color") ? (
                      <td>{character["hair_color"]}</td>
                    ) : null}
                    {selectedFilters.includes("eye_color") ? (
                      <td>{character["eye_color"]}</td>
                    ) : null}
                  </tr>
                );
              })}
        </tbody>
      </table>
    </Fragment>
  );
}

export default App;
