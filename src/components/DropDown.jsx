import React, { useState, useEffect } from 'react';

const DropDown = ({
  countries,
  Privilege,
  noOfItems,
  addAndSelectHandler,
  setvalue,
  value,
}) => {
  const [Visibility, setVisibility] = useState(true);
  const [show, setShow] = useState(true);
  const [term, setTerm] = useState('');
  const [filteredCountries, setFilteredCountries] = useState([]);

  useEffect(() => {
    setFilteredCountries(countries.slice(0, noOfItems));
  }, [countries, noOfItems]);

  const handelClick = e => {
    setvalue(e.target.value);
    setVisibility(!Visibility);
    setTerm('');
  };

  const showMore = () => {
    setFilteredCountries(countries);
    setShow(false);
  };
  const Filter = term => {
    setShow(false);
    console.log(term);
    let filtered = countries.filter(x =>
      x.toLowerCase().includes(term.toLowerCase())
    );
    console.log(filtered);
    setFilteredCountries(filtered);
  };

  const handelChange = async e => {
    // console.log(e.target.value);
    let term = e.target.value;
    if (!term) {
      setTerm('');
      setFilteredCountries(countries);
      return;
    }
    setTerm(e.target.value);
    Filter(e.target.value);
  };

  return (
    <>
      <div
        id='dropdown'
        onClick={() => {
          setTerm('');
          setFilteredCountries(countries);
          setVisibility(!Visibility);
        }}
        style={{ cursor: 'pointer' }}
      >
        {value || 'Select a location'} <i className='fas fa-caret-down'></i>
      </div>
      <div id='dropdown-body' hidden={Visibility}>
        <div className='search'>
          <input
            type='search'
            value={term}
            placeholder='Search...'
            onChange={handelChange}
          />
          <i className='fas fa-search'></i>
        </div>
        <div className='options'>
          {filteredCountries.length > 0 ? (
            filteredCountries.map(x => {
              return (
                <option key={x} value={x} onClick={handelClick}>
                  {x}
                </option>
              );
            })
          ) : (
            <div className='not-found'>
              {term.length > 3
                ? term.slice(0, 3) + `... not found`
                : term + ` not found`}
              {Privilege && (
                <button
                  onClick={() => {
                    setVisibility(false);
                    addAndSelectHandler(term);
                    setTerm('');
                  }}
                >
                  Add & Select
                </button>
              )}
            </div>
          )}
        </div>
        {filteredCountries.length < countries.length && show && (
          <p onClick={showMore}>
            {countries.length - filteredCountries.length} more...
          </p>
        )}
      </div>
    </>
  );
};

export default DropDown;
