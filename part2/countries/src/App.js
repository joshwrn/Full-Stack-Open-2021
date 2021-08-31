import React, { useState, useEffect } from 'react';

import axios from 'axios';

function App() {
  const [countries, setCountries] = useState([]);
  const [filter, setFilter] = useState([]);
  const [weather, setWeather] = useState([]);
  const [search, setSearch] = useState('');

  const handleSearch = (e) => {
    setSearch(e.target.value);
  };

  const handleView = (name) => {
    setSearch(name);
  };

  useEffect(() => {
    const filtered = countries.filter((country) =>
      country.name.toLowerCase().includes(search.toLowerCase())
    );
    if (filtered.length > 10) return setFilter([]);
    setFilter(filtered);
    if (filtered.length === 1) {
      axios
        .get(
          `http://api.weatherstack.com/current?access_key=${process.env.REACT_APP_WEATHER_API_KEY}&query=${filtered[0].capital}`
        )
        .then((response) => {
          setWeather(response.data.current);
        });
    }
  }, [search, countries]);

  useEffect(() => {
    axios.get('https://restcountries.eu/rest/v2/all').then((response) => {
      setCountries(response.data);
    });
  }, []);

  return (
    <div className="App">
      <div>
        countries: <input onChange={handleSearch} value={search} />
      </div>
      <div>
        {filter.length === 1 ? (
          <>
            {filter.map((country) => (
              <div>
                <h1>{country.name}</h1>
                <p>capital: {country.capital}</p>
                <p>population: {country.population}</p>
                <h3>Languages</h3>
                {country.languages.map((lang) => (
                  <li>{lang.name}</li>
                ))}
                <img width="200px" src={country.flag} alt="" />
                <h3>Weather</h3>
                <p>temp: {weather.temperature}C</p>
                <img src={weather.weather_icons ? weather.weather_icons[0] : null} alt="" />
                <p>
                  Wind: speed: {weather.wind_speed} MPH direction: {weather.wind_dir}
                </p>
              </div>
            ))}
          </>
        ) : (
          <>
            {filter.map((country) => (
              <div>
                <p>{country.name}</p>
                <button
                  onClick={() => {
                    handleView(country.name);
                  }}
                >
                  View
                </button>
              </div>
            ))}
          </>
        )}
      </div>
    </div>
  );
}

export default App;
