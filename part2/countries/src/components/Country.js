import { useEffect, useState } from "react";

const Country = ({ country, isDisplayed }) => {
  const [isShown, setIsShown] = useState(isDisplayed);
  useEffect(() => {
    setIsShown(isDisplayed);
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
    </div>
  );
};

export default Country;
