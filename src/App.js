import './App.css';
import { Fragment, useEffect, useState } from 'react';

function App() {
  const [data, setData] = useState([]);
  const [value, setValue] = useState('');
  const [arr, setNewArr] = useState([]);


  useEffect(() => {
    async function getAPI() {
      const url = 'https://swapi.dev/api/people/';
      const response = await fetch(url, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json'
        },
      });

      const getData = await response.json();
      setData(getData.results);
      console.log(data);
    };
    getAPI();

  }, []);


  const handleSubmit = (e) => {
    e.preventDefault();

    printThis();
  };

  const printThis = () => {
    data.filter((item) => {
      if (item.name.toLowerCase().includes(value)) {
        setNewArr(item);
      } else {
        return null;
      }
    });
  };

  console.log(arr.name);
  console.log(arr.birth_year);
  console.log(arr.gender);


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
      <p>{`input value ${value}`}</p>
      <ul>
        <li>{arr.name}</li>
        <li>{arr.birth_year}</li>
        <li>{arr.gender}</li>
      </ul>
    </Fragment>
  );

}

export default App;
