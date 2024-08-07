import React, { useMemo } from 'react';

const Table = ({
  defaultFilterKeys,
  visibleColumns,
  sortColumn,
  getFilteredRow,
  results,
  inputFieldValue,
}) => {
  // Memoize the filtered rows
  const filteredRows = useMemo(() => {
    return getFilteredRow(results, inputFieldValue);
  }, [getFilteredRow, results, inputFieldValue]);

  const getClassName = (value) => {
    switch (value) {
      case 'brown':
        return 'brown';
      case 'blue':
        return 'blue';
      case 'blond':
        return 'blond';
      case 'blonde':
        return 'blond';
      case 'black':
        return 'black';
      case 'white':
        return 'white';
      case 'brown, grey':
        return 'grey';
      case 'blue-gray':
        return 'blue-gray';
      case 'auburn, white':
        return 'auburn';
      case 'auburn, grey':
        return 'grey';
      case 'grey':
        return 'grey';
      case 'yellow':
        return 'yellow';
      case 'red':
        return 'red';
      case 'orange':
        return 'orange';
      case 'hazel':
        return 'hazel';
      case 'pink':
        return 'pink';
      case 'red, blue':
        return 'red-blue';
      case 'green, yellow':
        return 'green-yellow';
      case 'gold':
        return 'gold';
      default:
        return '';
    }
  };

  // Memoize the table rows rendering
  const tableRows = useMemo(() => {
    return filteredRows?.map((row) => (
      <tr key={row.id}>
        {defaultFilterKeys.map((column) => {
          // const isBrown = row[column.id] === 'brown' ? 'pill-brown' : '';
          // const isBlue = row[column.id] === 'blue' ? 'pill-blue' : '';
          const className = getClassName(row[column.id]); // Determine the class name based on the value

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

  return (
    <table className="results-table">
      <thead className="">
        <tr>
          {defaultFilterKeys.map(
            (column) =>
              visibleColumns[column.id] && (
                <th key={column.id} onClick={() => sortColumn(column.id)}>
                  {column.label}
                  <span></span>
                </th>
              )
          )}
        </tr>
      </thead>
      <tbody>{tableRows}</tbody>
    </table>
  );
};

export default Table;