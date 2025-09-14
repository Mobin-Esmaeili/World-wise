import style from './CityList.module.css'
import Spinner from './Spinner'
import CityItem from "./CityItem"
import Message from "./Message"
import { useCities } from '../contexts/CitiesContext'

const CityList = () => {

  const {cities , isLoading} = useCities()

  if(isLoading) return <Spinner />

  if(!cities.length) return <Message message="Add your first city by clicking on the map on the right" />

  
  return (
    <ul className={style.cityList}>
        {cities.map(city => (
         <CityItem key={city.id} city={city} /> 
        ))}
    </ul>
  )
}

export default CityList