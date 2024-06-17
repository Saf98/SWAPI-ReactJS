import React from "react";

const Results = ({ data }) => {

  // const selectEntries = (obj, arr) => {
  //   arr.reduce((acc, record) => (record in obj && (acc[record])), {})
  // }

  // const res = selectEntries(data, ["name", "gender"]);


  if (data.length === 0) {
    return (
      <div className="wrap">
        <div className="no-results">
          <p>no results found</p>
        </div>
      </div>
    );
  }

  return (
    <div>
      {data.map((row, index) => {
        return (
          <table>
            <thead>
              <tr key={index}>
                {Object.keys(row).map((key, index) => {
                  return <td key={index}>{key}</td>;
                })}
              </tr>
            </thead>
            <tbody>
              <tr key={index}>
                {Object.keys(row).map((key, index) => {
                  return <td key={index}>{row[key]}</td>;
                })}
              </tr>
            </tbody>
          </table>
        );
      })}
    </div>
  );
};

export default Results;
