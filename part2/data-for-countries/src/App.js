import { useState, useEffect } from "react";
import axios from 'axios';
import { CountriesToShow } from "./components/CountriesToShow";

const App = () => {
  const [countries, setCountries] = useState([]);
  // const [weather, setWeather] = useState([]);
  const [selectedCountries, setSelectedCountries] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    axios.get('https://restcountries.eu/rest/v2/all')
      .then(res => {
        console.log('data fetched');
        setCountries(res.data);
        setLoading(false);
      })
  }, []);

  const handleCountrySearch = (e) => {
    const typedCountry = e.target.value.toLowerCase();
    const countriesFound = countries.filter(country => country.name.toLowerCase().includes(typedCountry));
    setSelectedCountries(countriesFound);
  }

  return (
    <div>
      {
        loading
          ? <p>Loading countries...</p>
          : <>
              <p>find countries: <input onChange={handleCountrySearch} /></p>
              <CountriesToShow countries={selectedCountries} />
            </>
      }
    </div>
  )
}

export default App;
