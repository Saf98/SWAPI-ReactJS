import './App.css';
import React, { Fragment, useState, useEffect } from 'react';
import { getData } from './services/getData';

function App() {
  const [charactersData, setCharactersData] = useState();
  const [characterName, setCharacterName] = useState('');
  const [filteredData, setFilteredData] = useState([]);
  
  useEffect(() => {
    const apiData = getData();
    apiData.then(data => {
      console.log(data.results);
      setCharactersData(data.results);
    })
  }, []);
  

  const checkCharacterName = () => {
    setFilteredData(
      charactersData.filter((character) => {
        if (character.name) {
          return character.name.toLowerCase().includes(characterName);
        }

        if (!character.name) {
          console.log('There is not name available!');
          return;
        }
      })
    )
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    checkCharacterName();
  };

  return (
    <Fragment>
      <div className='container'>
        <div className='row'>
          <div className='col search-container'>
            <form onSubmit={handleSubmit}>
              <label>Enter the character's name</label>
              <input
                type='text'
                id='searchBar'
                value={characterName}
                onChange={(e) => setCharacterName(e.target.value.toLowerCase())}
                
              >
              </input>
              <button type='submit'>
                Go!
              </button>
            </form>
          </div>
        </div>
      </div>
      <div className='container'>
        <div className='row'>
          {filteredData.map((element, index) => {
            return (
              <div className='col col-6'>
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
          })}
        </div>
      </div>
    </Fragment>
  );
}

export default App;
