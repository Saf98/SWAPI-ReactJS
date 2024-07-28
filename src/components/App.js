import "./App.css";
import React, { Fragment, useState, useEffect, useRef } from "react";
import { getData } from "../services/getData";
import Header from "./Header";
import Pagination from "./Pagination";

const getFilteredRow = (rows, filteredKey) => {
  return rows.filter((row) =>
    Object.values(row).some((s) => ("" + s).toLowerCase().includes(filteredKey))
  );
};

const sortData = (data, sortKey, sortingDirection) => {
  data.sort((a, b) => {
    const relA = a[sortKey];
    const relB = b[sortKey];
    if (sortingDirection === "UNSORTED" || sortingDirection === "ASC") {
      if (relA < relB) return -1;
      if (relA > relB) return 1;
      return 0;
    } else {
      if (relA > relB) return -1;
      if (relA < relB) return 1;
      return 0;
    }
  });
};

const getNextSortingKeyDirection = (sortingDirection) => {
  if (sortingDirection === "UNSORTED" || sortingDirection === "ASC") {
    return (sortingDirection = "DESC");
  }

  return (sortingDirection = "ASC");
};

function App() {
  let defaultFilterKeys = [
    { id: "name", label: "Name" },
    { id: "gender", label: "Gender" },
    { id: "birth_year", label: "DoB" },
    { id: "hair_color", label: "Hair Colour" },
    { id: "eye_color", label: "Eye Colour" },
  ];
  const [results, setResults] = useState([]);
  const [sortingDirections, setSortingDirections] = useState({});
  const [selectedFilters, setSelectedFilters] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage, setPostsPerPage] = useState(10);
  const [totalPostsCount, setTotalPostsCount] = useState(0);
  // const [filteredItems, setFilteredItems] = useState(defaultFilterKeys);
  const [inputFieldValue, setInputFieldValue] = useState("");
  const page = useRef(null);

  const getResults = (data) => {
    return data?.results;
  };

  const sortColumn = (sortKey) => {
    const newData = [...results];
    const currentSortingDirection = sortingDirections[sortKey];
    sortData(newData, sortKey, currentSortingDirection);
    const nextSortingDirection = getNextSortingKeyDirection(
      currentSortingDirection
    );

    const newSortingDirections = { ...sortingDirections };
    newSortingDirections[sortKey] = nextSortingDirection;
    setResults(newData);
    setSortingDirections(newSortingDirections);
  };

  useEffect(() => {
    getData(currentPage).then((characters) => {
      const data = getResults(characters);
      setResults(data);
      setTotalPostsCount(characters?.count);
      let ourSortingDirections = {};
      for (const header of defaultFilterKeys) {
        ourSortingDirections[header] = "UNSORTED";
      }
      setSortingDirections(ourSortingDirections);
    });
  }, []);

  useEffect(() => {}, [selectedFilters, page]);

  const handleFilterCols = (object) => {
    const exists = selectedFilters.some((obj) => obj.id === object.id);

    if (exists) {
      setSelectedFilters(selectedFilters.filter((obj) => obj.id !== object.id));
    } else {
      setSelectedFilters([...selectedFilters, object]);
    }
  };

  return (
    <Fragment>
      <div className={"bg-violet-950"}>
        <Header />
        <div className={"flex flex-row justify-center py-20"}>
          <input
            className={
              "placeholder:text-2xl w-full placeholder:text-slate-400 font-bold block bg-white w-96"
            }
            placeholder="Search Database..."
            value={inputFieldValue}
            onChange={(e) => setInputFieldValue(e.target.value)}
          />
        </div>

        <div className="buttons-container">
          {defaultFilterKeys?.map((obj) => {
            return (
              <button
                className={`button ${
                  selectedFilters?.some((object) => object.id === obj.id)
                    ? "active"
                    : ""
                }`}
                key={obj.id}
                onClick={() => handleFilterCols(obj)}
              >
                {obj.label}
              </button>
            );
          })}
        </div>
        <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              {selectedFilters.length <= 0
                ? defaultFilterKeys?.map((obj) => {
                    return (
                      <th onClick={() => sortColumn(obj.id)} key={obj.id}>
                        {obj.label}
                      </th>
                    );
                  })
                : selectedFilters?.map((obj) => {
                    return (
                      <th onClick={() => sortColumn(obj.id)} key={obj.id}>
                        {obj.label}
                      </th>
                    );
                  })}
            </tr>
          </thead>
          <tbody>
            {selectedFilters?.length <= 0
              ? getFilteredRow(results, inputFieldValue)?.map(
                  (character, idx) => {
                    {
                      return (
                        <tr key={idx}>
                          <td>{character["name"]}</td>
                          <td>{character["gender"]}</td>
                          <td>{character["birth_year"]}</td>
                          <td>{character["hair_color"]}</td>
                          <td>{character["eye_color"]}</td>
                        </tr>
                      );
                    }
                  }
                )
              : getFilteredRow(results, inputFieldValue)?.map(
                  (character, idx) => {
                    {
                      return (
                        <>
                          <tr key={idx}>
                            {selectedFilters.some((obj) =>
                              obj?.id.includes("name")
                            ) ? (
                              <td>{character.name}</td>
                            ) : null}
                            {selectedFilters.some((obj) =>
                              obj?.id.includes("gender")
                            ) ? (
                              <td>{character.gender}</td>
                            ) : null}
                            {selectedFilters.some((obj) =>
                              obj?.id.includes("birth_year")
                            ) ? (
                              <td>{character.birth_year}</td>
                            ) : null}
                            {selectedFilters.some((obj) =>
                              obj?.id.includes("hair_color")
                            ) ? (
                              <td>{character.hair_color}</td>
                            ) : null}
                            {selectedFilters.some((obj) =>
                              obj?.id.includes("eye_color")
                            ) ? (
                              <td>{character.eye_color}</td>
                            ) : null}
                          </tr>
                        </>
                      );
                    }
                  }
                )}
          </tbody>
        </table>
        <Pagination
          totalPosts={totalPostsCount}
          postsPerPage={postsPerPage}
          setCurrentPage={setCurrentPage}
          currentPage={currentPage}
        />
      </div>
    </Fragment>
  );
}

export default App;
