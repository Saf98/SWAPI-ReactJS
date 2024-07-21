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
              className={`text-gray-900 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 font-medium rounded-full text-sm px-5 py-2.5 me-2 mb-2 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 " ${
                selectedFilters?.includes(itemValue)
                  ? "focus:ring-4 focus:ring-gray-100 dark:focus:ring-gray-700"
                  : ""
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
      <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
        <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
          <tr>
            {selectedFilters.length <= 0
              ? defaultFilterKeys?.map((row, id) => {
                  return (
                    <th scope="col" className="px-6 py-3" key={id}>
                      {row}
                    </th>
                  );
                })
              : filteredItems?.map((row, id) => {
                  return (
                    <th scope="col" className="px-6 py-3" key={id}>
                      {row}
                    </th>
                  );
                })}
          </tr>
        </thead>
        <tbody className="odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 border-b dark:border-gray-700">
          {selectedFilters.length <= 0
            ? charactersData?.map((character, idx) => {
                return (
                  <tr key={idx}>
                    <td
                      scope="col"
                      className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                    >
                      {character["name"]}
                    </td>
                    <td className="px-6 py-4">{character["gender"]}</td>
                    <td className="px-6 py-4">{character["birth_year"]}</td>
                    <td className="px-6 py-4">{character["hair_color"]}</td>
                    <td className="px-6 py-4">{character["eye_color"]}</td>
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
