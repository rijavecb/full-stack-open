import Country from "./Country";

const Countries = ({ countries, countryFilter }) => {
  const filteredCountries = countries.filter((country) =>
    country.name.official.toLowerCase().includes(countryFilter.toLowerCase())
  );

  const displayCountries = (filteredCountries) => {
    const numberOfCountries = filteredCountries.length;

    if (numberOfCountries > 10 && countryFilter) {
      return <p>Too many matches, specify another filter</p>;
    }

    if (numberOfCountries <= 10 && numberOfCountries > 1) {
      return filteredCountries.map((country) => {
        return (
          <Country
            key={country.name.official}
            country={country}
            isDisplayed={false}
          ></Country>
        );
      });
    }

    if (numberOfCountries === 1) {
      return (
        <Country
          key={filteredCountries[0].name.official}
          country={filteredCountries[0]}
          isDisplayed={true}
        />
      );
    }
  };

  return <>{displayCountries(filteredCountries)}</>;
};

export default Countries;
