import './App.css';
import React, { Fragment, useState, useEffect } from 'react';
import { getData } from './services/getData';
import Results from './components/Results';
import Search from './components/Search';

function App() {
  const [charactersData, setCharactersData] = useState(null);
  const [characterName, setCharacterName] = useState('');
  const [filteredData, setFilteredData] = useState(null);
  
  useEffect(() => {
    const apiData = getData();
    apiData.then(data => {
      setCharactersData(data.results);
    })
  }, []);
  
  const checkCharacterName = () => {
    console.log('check', charactersData);
    setFilteredData(
      charactersData.filter((character) => {
        if (!character.name) {
          console.warn('This property does not exist');
          return null;
        }

        return character.name.toLowerCase().includes(characterName);
      })
    )
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    checkCharacterName();
  };

  console.log(filteredData);

  return (
    <Fragment>
      <Search handleSubmit={handleSubmit} character={characterName} onChange={(characterName) => setCharacterName(characterName)} />
      <div className='container'>
        <div className='row'>  
          {filteredData && <Results data={filteredData} /> }
        </div>
      </div>    
    </Fragment>
  );
}

export default App;
