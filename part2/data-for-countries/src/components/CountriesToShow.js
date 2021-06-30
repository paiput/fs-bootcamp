import { CountryInfo } from "./CountryInfo";

export const CountriesToShow = ({ countries }) => {
  const country = countries[0];

  return (
    countries.length > 10
      ? <p>Too many to show</p>
      : (countries.length === 1)
        ? (
            <CountryInfo country={country} />
          )
        : (
            <ul>
              {countries.map(country => <li key={country.name}>{country.name}</li>)}
            </ul>
          )
  )
}