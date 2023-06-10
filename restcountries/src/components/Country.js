const Country = ({ country, onShow }) => {
    if (country === null) return null;

    if(country.languages === undefined) {
        return <p> {country.name.common} <button onClick={onShow}>show</button></p>;
    }
  
    const languages = [];
    for (const language in country.languages) {
        languages.push(<li key={language}>{country.languages[language]}</li>);
    }
  
    return (
      <>
        <h1>{country.name.common}</h1>
        <p>capital: {country.capital}</p>
        <p>area: {country.area} km²</p>
        <h2>Languages:</h2>
        <ul>
            {languages}
        </ul>
        <img src={country.flags.png} alt={country.flags.alt} />
        <h2>Weather in {country.capital}:</h2>
        <p>temperature: {country.temperature} °C</p>
        <p>wind: {country.windSpeed} m/s</p>
      </>
      );
}

export default Country;