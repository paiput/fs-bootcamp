import { useState } from "react";
import { CountryInfo } from "./CountryInfo";

export const DisplayableCountries = ({ countries }) => { 
  const [selectedCountry, setSelectedCountry] = useState('');

  const handleCountrySelection = (country) => {
    setSelectedCountry(country);
  }
  
  return (
    <>
      {
        selectedCountry
          ? <CountryInfo country={selectedCountry} />
          : <ul>
              {countries.map(country => 
                <li key={country.name}>
                  {country.name} <button onClick={() => handleCountrySelection(country)}>show</button>
                </li>)}
            </ul>
      }
    </>
  );
};