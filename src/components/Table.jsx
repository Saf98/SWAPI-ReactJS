import React, { Fragment, useMemo } from "react";

const Table = ({
  defaultFilterKeys,
  visibleColumns,
  sortColumn,
  getFilteredRow,
  results,
  inputFieldValue,
  sortingDirections,
}) => {
  const filteredRows = useMemo(() => {
    return getFilteredRow(results, inputFieldValue);
  }, [getFilteredRow, results, inputFieldValue]);

  const getClassName = (value) => {
    switch (value) {
      case "brown":
        return "brown";
      case "blue":
        return "blue";
      case "blond":
        return "blond";
      case "blonde":
        return "blond";
      case "black":
        return "black";
      case "white":
        return "white";
      case "brown, grey":
        return "grey";
      case "blue-gray":
        return "blue-gray";
      case "auburn, white":
        return "auburn";
      case "auburn, grey":
        return "grey";
      case "grey":
        return "grey";
      case "yellow":
        return "yellow";
      case "red":
        return "red";
      case "orange":
        return "orange";
      case "hazel":
        return "hazel";
      case "pink":
        return "pink";
      case "red, blue":
        return "red-blue";
      case "green, yellow":
        return "green-yellow";
      case "gold":
        return "gold";
      default:
        return "";
    }
  };

  const tableRows = useMemo(() => {
    return filteredRows?.map((row) => (
      <tr key={row.id}>
        {defaultFilterKeys.map((column) => {
          const className = getClassName(row[column.id]);
          return (
            visibleColumns[column.id] && (
              <td key={column.id}>
                <span className={`pill ${className}`}>{row[column.id]}</span>
              </td>
            )
          );
        })}
      </tr>
    ));
  }, [filteredRows, defaultFilterKeys, visibleColumns]);

  const getClassNamesFor = (sortKey) => {
    switch (sortKey) {
      case "UNSORTED":
        return "unsorted";
      case "ASC":
        return "ascending";
      case "DESC":
        return "descending";
      default:
        return "unsorted";
    }
  };

  return (
    <Fragment>
      <table className="results-table">
        <thead align="left">
          <tr>
            {defaultFilterKeys.map(
              (column) =>
                visibleColumns[column.id] && (
                  <>
                    <th key={column.id}>
                      {column.label}
                      <button
                        key={column.id}
                        className={`${getClassNamesFor(
                          sortingDirections?.name
                        )} sort`}
                        onClick={() => sortColumn(column.id)}
                      ></button>
                    </th>
                  </>
                )
            )}
          </tr>
        </thead>
        <tbody>{tableRows}</tbody>
      </table>
    </Fragment>
  );
};

export default Table;
