export const Weather = ({ weather }) => {
  return(  
    <>
      <p><strong>temperature: </strong>{weather.temperature}° Celcius</p>
      <img src={weather.weather_icons} alt="weather icon" />
      <p><strong>wind: </strong>{weather.wind_speed} mph direction {weather.wind_dir}</p>
    </>
  )
};