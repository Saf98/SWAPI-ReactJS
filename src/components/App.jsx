import "./App.css";
import React, { Fragment, useState, useEffect, useMemo } from "react";
import { getData } from "../services/getData";
import Header from "./Header";
import Pagination from "./Pagination";
import _ from "lodash";
import Table from "./Table";
import SearchInput from "./SearchInput";
import CheckBoxFilter from "./CheckBoxFilter";

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
  let defaultFilterKeys = useMemo(
    () => [
      { id: "name", label: "Name" },
      { id: "gender", label: "Gender" },
      { id: "birth_year", label: "DoB" },
      { id: "hair_color", label: "Hair Colour" },
      { id: "eye_color", label: "Eye Colour" },
    ],
    []
  );
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
  // TODO Fix initial buttons
  const [totalPostsCount, setTotalPostsCount] = useState(0);
  const [inputFieldValue, setInputFieldValue] = useState("");
  const totalPostsCountByPostsPerPage = Math.ceil(
    totalPostsCount / postsPerPage
  );

  const getResults = (data) => {
    return data?.results;
  };

  const onHandleChange = (e) => {
    setInputFieldValue(e.target.value);
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
      if (Array.isArray(data)) {
        setResults(data);
        setTotalPostsCount(characters?.count || 0); // Ensure count is a number
      } else {
        console.error("Data is not an array:", data);
      }
      let ourSortingDirections = {};
      for (const header of defaultFilterKeys) {
        ourSortingDirections[header] = "UNSORTED";
      }
      setSortingDirections(ourSortingDirections);
    });
  }, [currentPage, defaultFilterKeys]);

  useEffect(() => {
    if (
      currentPage > totalPostsCountByPostsPerPage &&
      totalPostsCountByPostsPerPage > 0
    ) {
      setCurrentPage(totalPostsCountByPostsPerPage);
    }
  }, [currentPage, totalPostsCountByPostsPerPage]);

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
    } else {
      setCurrentPage(value);
    }
  };

  return (
    <Fragment>
      <Header />
      <SearchInput
        inputFieldValue={inputFieldValue}
        onHandleChange={(e) => onHandleChange(e)}
      />
      <CheckBoxFilter
        defaultFilterKeys={defaultFilterKeys}
        visibleColumns={visibleColumns}
        handleCheckboxChange={handleCheckboxChange}
      />
      <Table
        defaultFilterKeys={defaultFilterKeys}
        visibleColumns={visibleColumns}
        sortColumn={sortColumn}
        getFilteredRow={getFilteredRow}
        results={results}
        inputFieldValue={inputFieldValue}
        sortingDirections={sortingDirections}
      />

      <Pagination
        totalPostsCount={totalPostsCountByPostsPerPage}
        onHandlePageChange={handlePageChange}
        currentPage={currentPage}
        siblings={1}
        returnPaginationRange={returnPaginationRange}
      />
    </Fragment>
  );
}

export default App;
