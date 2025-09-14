import { createContext, useContext, useEffect, useState } from "react";

const BASE_URL = "http://localhost:8000";
const CitiesContext = createContext();

function CitiesProvider({ children }) {
  const [cities, setCities] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [currentCity, setCurrentCity] = useState({});

  useEffect(() => {
    async function fetchCities() {
      setIsLoading(true);
      setTimeout(async () => {
        try {
          const res = await fetch(`${BASE_URL}/cities`);
          const data = await res.json();
          setCities(data);
        } catch (error) {
          alert("There is an alert");
        } finally {
          setIsLoading(false);
        }
      }, 1000);
    }

    fetchCities();
  }, []);

  function getCity(id) {
    setIsLoading(true);
    setTimeout(async () => {
      try {
        const res = await fetch(`${BASE_URL}/cities/${id}`);
        const data = await res.json();
        setCurrentCity(data);
      } catch (error) {
        alert("There is an alert");
      } finally {
        setIsLoading(false);
      }
    }, 500);
  }

  function createCity(newCity) {
    setIsLoading(true);
    setTimeout(async () => {
      try {
        const res = await fetch(`${BASE_URL}/cities` , {
          method: "POST",
          body: JSON.stringify(newCity),
          headers: {
            "Content-Type": "application/json",
          }
        });
        const data = await res.json();
        setCities([...cities , data])
      } catch (error) {
        alert("There is an alert");
      } finally {
        setIsLoading(false);
      }
    }, 500);
  }

  function deleteCity(id) {
    setIsLoading(true);
    setTimeout(async () => {
      try {
        await fetch(`${BASE_URL}/cities/${id}` , {
          method: "POST",
        });
        setCities((cities) => cities.filter((city) => city.id !== id));
      } catch (error) {
        alert("There is an error deleting city");
      } finally {
        setIsLoading(false);
      }
    }, 500);
  }


  return (
    <CitiesContext.Provider value={{ cities, isLoading, currentCity, getCity , createCity , deleteCity }}>
      {children}
    </CitiesContext.Provider>
  );
}

function useCities() {
  const context = useContext(CitiesContext);
  if (context === undefined)
    throw new Error("You're using it outside of CitiesContext");
  return context;
}

export { CitiesProvider, useCities };
