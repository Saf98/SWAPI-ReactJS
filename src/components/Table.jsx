const Table = ({defaultFilterKeys, visibleColumns, sortColumn, getFilteredRow, results, inputFieldValue}) => {
return (
  <table className="results-table">
  <thead className="">
    <tr>
      {defaultFilterKeys.map(
        (column) =>
          visibleColumns[column.id] && (
            <th key={column.id} onClick={() => sortColumn(column.id)}>
              {column.label}
              <span className="arrow down"></span>
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
            const isBrown = row[column.id] === "brown" ? "pill-brown" : "";
            const isBlue = row[column.id] === "blue" ? "pill-blue" : "";
              return visibleColumns[column.id] && (
                <td key={column.id}><span className={row[column.id]}>{row[column.id]}</span></td>
              )
          }
        )}
      </tr>
    ))}
  </tbody>
</table>
);
}

export default Table;