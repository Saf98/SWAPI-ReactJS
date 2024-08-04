import "./App.css";
import React, { Fragment, useState, useEffect } from "react";
import { getData } from "../services/getData";
import Header from "./Header";
import Pagination from "./Pagination";
import _ from "lodash";

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
  const [visibleColumns, setVisibleColumns] = useState({
    name: true,
    age: true,
    gender: true,
    birth_year: true,
    hair_color: true,
    eye_color: true,
  });
  const [results, setResults] = useState([]);
  const [sortingDirections, setSortingDirections] = useState({});
  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage, setPostsPerPage] = useState(10);
  const [totalPostsCount, setTotalPostsCount] = useState(0);
  const [inputFieldValue, setInputFieldValue] = useState("");
  const totalPostsCountByPostsPerPage = Math.ceil(
    totalPostsCount / postsPerPage
  );

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
  }, [currentPage]);

  //wrap defaultFilterKeys in useMemo to avoid re-renders

  const handleCheckboxChange = (key) => {
    setVisibleColumns((prevVisibleColumns) => ({
      ...prevVisibleColumns,
      [key]: !prevVisibleColumns[key],
    }));
  };

  const returnPaginationRange = (totalPage, page, siblings) => {
    const totalPageNoInArray = 7 + siblings;

    if (totalPageNoInArray >= totalPage) {
      return _.range(1, totalPage + 1);
    }

    const leftSiblingsIndex = Math.max(page - siblings, 1);
    const rightSiblingsIndex = Math.min(page + siblings, totalPage);

    const showLeftDots = leftSiblingsIndex > 2;
    const showRightDots = rightSiblingsIndex < totalPage - 2;

    if (!showLeftDots && showRightDots) {
      const leftItemsCount = 3 + 2 * siblings;
      const leftRange = _.range(1, leftItemsCount + 1);
      return [...leftRange, "...", totalPage];
    }

    if (showLeftDots && !showRightDots) {
      const rightItemsCount = 3 + 2 * siblings;
      const rightRange = _.range(
        totalPage - rightItemsCount + 1,
        totalPage + 1
      );
      return [1, "...", ...rightRange];
    }

    if (showLeftDots && showRightDots) {
      const middleRange = _.range(leftSiblingsIndex, rightSiblingsIndex + 1);
      return [1, "...", ...middleRange, "...", totalPage];
    }
  };

  const handlePageChange = (value) => {
    if (value === "&laquo;") {
      setCurrentPage(1);
    } else if (value === "&lsaquo;") {
      if (currentPage !== 1) {
        setCurrentPage(currentPage - 1);
      }
    } else if (value === "&rsaquo;") {
      if (currentPage !== totalPostsCountByPostsPerPage) {
        setCurrentPage(currentPage + 1);
      }
    } else if (value === "&raquo;") {
      setCurrentPage(totalPostsCountByPostsPerPage);
    } else if (value === "..." || value === " ...") {
      // Ignore ellipsis clicks or handle as needed
      // Optionally, you can add logic to move closer to the ellipsis range
    } else {
      setCurrentPage(value);
    }
  };

  return (
    <Fragment>
      <div>
        <Header />
        <div className={"search-container"}>
          <input
            id="search"
            placeholder="Search Database..."
            value={inputFieldValue}
            onChange={(e) => setInputFieldValue(e.target.value)}
          />
        </div>

        <div className="form-control-container">
          {defaultFilterKeys?.map((obj, id) => {
            return (
              <label className={"form-control"} key={id} style={{ marginRight: "10px" }}>
                <input
                  key={id}
                  type="checkbox"
                  checked={visibleColumns[obj.id]}
                  onChange={() => handleCheckboxChange(obj.id)}
                />
                {obj.label}
              </label>
            );
          })}
        </div>
        <table className="">
          <thead className="">
            <tr>
              {defaultFilterKeys.map(
                (column) =>
                  visibleColumns[column.id] && (
                    <th key={column.id} onClick={() => sortColumn(column.id)}>
                      {column.label}
                    </th>
                  )
              )}
            </tr>
          </thead>
          <tbody>
            {getFilteredRow(results, inputFieldValue)?.map((row) => (
              <tr key={row.id}>
                {defaultFilterKeys.map(
                  (column) => {

                    {console.log(row[column.id] === "brown")}
                      return visibleColumns[column.id] && (
                        <td key={column.id}><span className="pill">{row[column.id]}</span></td>
                      )
                  }
                )}
              </tr>
            ))}
          </tbody>
        </table>
        <Pagination
          totalPostsCount={totalPostsCountByPostsPerPage}
          onHandlePageChange={handlePageChange}
          currentPage={currentPage}
          siblings={1}
          returnPaginationRange={returnPaginationRange}
        />
      </div>
    </Fragment>
  );
}

export default App;
