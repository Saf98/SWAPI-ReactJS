import './App.css';
import { Fragment, useEffect, useState } from 'react';

function App() {
  const [data, setData] = useState([]);
  const [value, setValue] = useState('');
  const [arr, setNewArr] = useState([]);
  const [isFound, setIsFound] = useState(null);

  useEffect(() => {
    const getAPI = async () => {
      const url = 'https://swapi.dev/api/people/';
      const response = await fetch(url, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json'
        },
      });

      const getData = await response.json();
      setData(getData.results);
    };

    getAPI();
  }, []);

  const printThis = () => {
    setNewArr(
      data.filter((character) => 
      character.name.toLowerCase().includes(value))
    )
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    printThis();
  };

  return (
    <Fragment>
      <form onSubmit={handleSubmit}>
        <label>Search:</label>
        <input
          type='text'
          id='searchBar'
          value={value}
          onChange={(e) => setValue(e.target.value.toLowerCase())}
        >
        </input>
        <button type='submit'>
          submit
        </button>
      </form>
      {arr.length === 0 ? <p>no</p> : arr.map((element, index) => {
        return (
          <ul key={index}>
            <li>{element.name}</li>
            <li>{element.gender}</li>
            <li>{element.birth_year}</li>
          </ul>
        );
      })}
    </Fragment>
  );

}

export default App;
