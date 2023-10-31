import { useEffect, useState } from "react";
import countryService from "./services/country.js";

const Filter = ({ newFilter, handleFilterChange }) => (
  <div>
    find countries<input
      value={newFilter}
      onChange={handleFilterChange}
    />
  </div>
);

const Countries = ({ countries }) => (
  <div>
    {countries.map((country) => (
      <p key={country.name.common}>{country.name.common}</p>
    ))}
  </div>
);

const CountryInfo = ({ countryInfo }) => (
  <div>
    <h1>{countryInfo.name.common}</h1>
    <p>capital {countryInfo.capital}</p>
    <p>area {countryInfo.area}</p>
    <h4>languages:</h4>
    <ul>
      {Object.values(countryInfo.languages).map((language) => (
        <li key={language}>{language}</li>
      ))}
    </ul>
    <img src={countryInfo.flags.png} />
  </div>
);

const Weather = ({ weather }) => {
  if (weather) {
    const source = `https://openweathermap.org/img/wn/${
      weather.weather[0].icon
    }@2x.png`;
    return (
      <div>
        <h2>Weather in {weather.name}</h2>
        <p>temperature {weather.main.temp} Celcius</p>
        <img src={source} />
        <p>wind {weather.wind.speed} m/s</p>
      </div>
    );
  }else{
    return null
  }
};

const Show = ({ filteredCountries, countryInfo, weather }) => {
  if (filteredCountries.length === 1) {
    //console.log(filteredCountries[0].name)
    return (
      <>
        <CountryInfo countryInfo={countryInfo} />
        <Weather weather={weather} />
      </>
    );
  } else if (filteredCountries.length <= 10 && filteredCountries.length > 1) {
    return <Countries countries={filteredCountries} />;
  } else if (filteredCountries.length > 10) {
    return (
      <div>
        Too many matches, specify another filter
      </div>
    );
  } else {
    return null;
  }
};

function App() {
  const [newFilter, setNewFilter] = useState("");
  const [countries, setCountries] = useState(null);
  const [filteredCountries, setFilteredCountries] = useState([]);
  const [countryInfo, setCountryInfo] = useState(null);
  const [weather, setWeather] = useState(null);

  useEffect(() => {
    if (countries === null) {
      countryService
        .getAll()
        .then((allCountries) => {
          setCountries(allCountries);
        });
    } else {
      const fc = countries.filter((country) =>
        country.name.common.toLowerCase().includes(newFilter.toLowerCase())
      );
      if (fc.length === 1) {
        countryService
          .getByName(fc[0].name.common)
          .then((country) => {
            setCountryInfo(country);
            setFilteredCountries(fc);
          });

        countryService
          .getWeather(fc[0].capital)
          .then((weather) => {
            setWeather(weather);
          });
      } else {
        setFilteredCountries(fc);
      }
    }
  }, [newFilter]);

  const handleFilterChange = (event) => {
    setNewFilter(event.target.value);
  };

  return (
    <div>
      <Filter newFilter={newFilter} handleFilterChange={handleFilterChange} />
      <Show
        filteredCountries={filteredCountries}
        countryInfo={countryInfo}
        weather={weather}
      />
    </div>
  );
}

export default App;
