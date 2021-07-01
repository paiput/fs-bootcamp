import { useState, useEffect } from "react";
import axios from "axios";
import { Weather } from "./Weather";

export const CountryInfo = ({ country }) => {
  const [weather, setWeather] = useState([]);
  
  useEffect(() => {
    const api_key = process.env.REACT_APP_API_KEY;

    const params = {
      access_key: api_key,
      query: country.capital
    };
    
    axios.get('http://api.weatherstack.com/current', {params})
      .then(res => {
        console.log('weather loaded');
        setWeather(res.data);
      })
      .catch(error => {
        console.log(error);
      });
  }, [country.capital]);

  return (
    <div>
      <h1>{country.name}</h1>
      <p>Capital: {country.capital}</p>
      <p>Population: {country.population}</p>
      <h2>Languages:</h2>
      <ul>
        {country.languages.map(language => <li key={language.name}>{language.name}</li>)}
      </ul>
      <img src={country.flag} alt="country flag" height="100" width="150"/>
      <h2>Weather in {country.capital}</h2>
      {
        weather.current
          ? <Weather weather={weather.current} />
          : 'loading...'
      }
    </div>
  );
}