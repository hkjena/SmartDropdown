import React, { useState, useEffect } from 'react';
import axios from 'axios';

import DropDown from './components/DropDown';

import './App.css';

function App() {
  const [countries, setCountries] = useState([]);
  const [value, setvalue] = useState('');
  useEffect(() => {
    const getCountries = async () => {
      const { data } = await axios.get('http://13.57.235.126:5000/countries');
      const result = await data.countries;
      setCountries(result);
    };
    getCountries();
  }, []);

  const addCountry = async term => {
    // Here the method should be 'POST', if the API following Restful Convention.
    // This API is not allowing 'POST' method.
    try {
      await axios.get(`http://13.57.235.126:5000/addcountry?name=${term}`);
      setvalue(term);
    } catch (error) {
      alert('duplicate entry');
      setvalue('');
    }
  };
  return (
    <>
      <DropDown
        countries={countries}
        Privilege={true}
        noOfItems={5}
        addAndSelectHandler={addCountry}
        setvalue={setvalue}
        value={value}
      />
    </>
  );
}

export default App;
