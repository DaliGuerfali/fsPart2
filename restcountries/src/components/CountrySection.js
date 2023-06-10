  import Country from "./Country";
  
  
  const CountrySection = ({ countries, handleShow}) => {

    if(countries === null) return <h2>Fetching countries...</h2>;
    
    if(countries.length === 0) return null;
  
    if(countries.length > 10) {
      
      return <h2>Too many matches, specify another filter</h2>;
  
    } else {
      return (
        <>
        {
          countries.map(country => {
            return (
            <Country 
            key={country.name.common} 
            country={country} 
            onShow={() => handleShow(country.name.common)} 
            />
            );
        })
        }
        </>
      )
    }
    }
  
    
  
export default CountrySection;  