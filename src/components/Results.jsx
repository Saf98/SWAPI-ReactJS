import React, { useEffect, useState } from "react";

const Results = ({ data }) => {
  const [newArray, setNewArray] = useState([]);

  const newData = (value) => {
    data.filter((el) => {
      const key = Object.keys(el).filter((key) => {
        const res = value === key;
        return res;
      });
      const newKey = key.join();
      const newVal = el[value];
      const obj = {
        [newKey]: newVal
      }
      return obj;
      
    });
  };

  newData("gender")
  
  if (data.length === 0) {
    return (
      <div className="wrap">
        <div className="no-results">
          <p>no results found</p>
        </div>
      </div>
    );
  }

  // return (
  //   <div>
  //     {data.map((el) => {
  //      const { name, gender } = el;
  //      console.log({name, gender})
  //     })}
  //   </div>
  // )

  // return (
  //   <div>
  //     {newArray.map((row, index) => {
  //       return (
  //         <table>
  //           <thead>
  //             <tr key={index}>
  //               <td>{row}</td>
  //             </tr>
  //           </thead>
  //           <tbody>
  //             <tr key={index}>
  //               <td>{row.name}</td>
  //             </tr>
  //           </tbody>
  //         </table>
  //       );
  //     })}
  //   </div>
  // );
};

export default Results;
