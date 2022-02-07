import React from "react";

const Results = ({ data }) => {
  if (data.length > 0) {
    return (
      data.map((element, index) => {
        return (
          <div className='wrap' key={index}>
            <div className='card-content'>
              <div className='card-item'>
                <p className='card-item_label'>Name</p>
                <p className='card-item_result'>{element.name}</p>
              </div>
              <div className='card-item'>
                <p className='card-item_label'>Birth year</p>
                <p className='card-item_result'>{element.birth_year}</p>
              </div>
              <div className='card-item'>
                <p className='card-item_label'>Gender</p>
                <p className='card-item_result'>{element.gender}</p>
              </div>
            </div>
          </div>
        );
      })
    )
  }

  if (data.length === 0) {
    return (
      <div className='wrap'>
        <div className='no-results'>
          <p>no results found</p>
        </div>
      </div>
    );
  }
};

export default Results