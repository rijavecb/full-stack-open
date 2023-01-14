import { useState, useEffect } from "react";
import axios from "axios";
import Filter from "./components/Filter";
import Countries from "./components/Countries";

const App = () => {
  const [countries, setCountries] = useState([]);
  const [countryFilter, setCountryFilter] = useState("");

  const handleFilterQueryChange = (event) => {
    setCountryFilter(event.target.value);
  };

  useEffect(() => {
    axios.get("https://restcountries.com/v3.1/all").then((response) => {
      setCountries(response.data);
    });
  }, []);

  return (
    <div>
      <Filter
        filterQuery={countryFilter}
        onFilterChange={handleFilterQueryChange}
      />
      <Countries countries={countries} countryFilter={countryFilter} />
    </div>
  );
};

export default App;
