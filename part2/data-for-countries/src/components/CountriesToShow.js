import { CountryInfo } from "./CountryInfo";
import { DisplayableCountries } from "./DisplayableCountries";

export const CountriesToShow = ({ countries }) => {
  const country = countries[0];

  return (
    countries.length > 10
      ? <p>Too many to show</p>
      : (countries.length === 1)
        ? <CountryInfo country={country} />
        : <DisplayableCountries countries={countries} />
  )
}