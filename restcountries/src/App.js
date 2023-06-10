import { useEffect, useRef, useState } from "react";
import axios from "axios";
import CountrySection from "./components/CountrySection";


function App() {
  const [newCountry, setNewCountry] = useState('');
  const [filteredCountries, setFilteredCountries] = useState(null);
  const countries = useRef(null);
  
  useEffect(() => {
    axios
    .get('https://studies.cs.helsinki.fi/restcountries/api/all')
    .then(res => {
     countries.current = (res.data).map(country => { 
      return { name: {common: country.name.common, official: country.name.official} } 
    });
    console.log('fetched countries');
    }) 
    .catch(err => {
      console.log(err);
      alert('failed to fetch all countries');
    });
    
  }, []);

  useEffect(() => {
    if(filteredCountries === null || filteredCountries.length !== 1 || filteredCountries[0].languages) return;
    fetchCountry(filteredCountries[0].name.common, filteredCountries, setFilteredCountries);

  },[filteredCountries]);



  function handleInput(e) {
    if(countries.current === null) {
      return;
    }
    if(e.target.value === '') {
      setFilteredCountries([]);
      setNewCountry(e.target.value);
      return;
    }


    const newFilteredCountries = countries.current.filter(country => {
     return (
      country.name.common.toLowerCase().includes(e.target.value.toLowerCase()) ||
      country.name.official.toLowerCase().includes(e.target.value.toLowerCase())
     );
    });

    setFilteredCountries(newFilteredCountries);
    setNewCountry(e.target.value);
  }

  function handleShow(countryName) {
    fetchCountry(countryName, filteredCountries, setFilteredCountries);
  }


  return (
    <>
      <form>
        find countries <input onChange={handleInput} value={newCountry} />
      </form>
      <CountrySection 
      countries={filteredCountries}
      handleShow={handleShow}
      /> 
    </>
  );
}

export default App;



const fetchCountry = (country, filteredCountries, setFilteredCountries) =>  {
  const baseApi = 'https://api.open-meteo.com/v1/forecast?current_weather=true&windspeed_unit=ms';
  let countryData = {}
    axios
    .get(`https://studies.cs.helsinki.fi/restcountries/api/name/${country}`)
    .then((res) => {
    countryData = res.data;
    return axios
    .get(`${baseApi}&latitude=${res.data.capitalInfo.latlng[0]}&longitude=${res.data.capitalInfo.latlng[1]}`) 
    })
    .then((res) => {
      countryData.temperature = res.data.current_weather.temperature;
      countryData.windSpeed = res.data.current_weather.windspeed;
      setFilteredCountries(filteredCountries.map(element => element.name.common !== country ? element : countryData ));
    })
    .catch(err => {
      console.log(err);
      alert('failed to display data');
      setFilteredCountries(null);
    })
}