import { useEffect, useState } from "react";
import axios from "axios";

const Country = ({ country, isDisplayed }) => {
  const [isShown, setIsShown] = useState(isDisplayed);
  const [weatherInfo, setWeatherInfo] = useState({});

  useEffect(() => {
    setIsShown(isDisplayed);
    const apiQuery = `https://api.openweathermap.org/data/2.5/weather?q=${country.capital[0]},${country.cca2}&appid=${process.env.REACT_APP_WEATHER_API_KEY}&units=metric`;

    axios.get(apiQuery).then((response) => {
      setWeatherInfo(() => {
        return {
          temp: response.data.main.temp,
          icon: response.data.weather[0].icon,
          description: response.data.weather[0].description,
          wind: response.data.wind.speed,
        };
      });
    });
  }, [isDisplayed]);

  if (!isShown) {
    return (
      <div>
        {country.name.official}
        <button onClick={() => setIsShown(true)}>show</button>
      </div>
    );
  }

  return (
    <div>
      <h2>{country.name.official}</h2>
      <button onClick={() => setIsShown(false)}>hide</button>
      <p>capital {country.capital[0]}</p>
      <p>area {country.area}</p>
      <b>languages:</b>
      <ul>
        {Object.values(country.languages).map((language) => (
          <li key={language}>{language}</li>
        ))}
      </ul>
      <img src={country.flags.png} alt={`Flag of ${country.name.common}`} />
      <h3>Weather in {country.capital[0]}</h3>
      <p>temperature {weatherInfo.temp} Celsius</p>
      <img
        src={`http://openweathermap.org/img/wn/${weatherInfo.icon}.png`}
        alt={weatherInfo.description}
      />
      <p>wind {weatherInfo.wind} m/s</p>
    </div>
  );
};

export default Country;
