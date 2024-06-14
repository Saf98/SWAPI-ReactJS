import React from "react";

const Results = ({ data }) => {
  if (data.length > 0) {
    return data.map((element, index) => {
      return (
        <tr key={index}>
          <td>{element.name}</td>
          <td>{element.birth_year}</td>
          <td>{element.gender}</td>
        </tr>
      );
    });
  }

  if (data.length === 0) {
    return (
      <div className="wrap">
        <div className="no-results">
          <p>no results found</p>
        </div>
      </div>
    );
  }
};

export default Results;
