import { Link } from 'react-router-dom';
import style from './CityItem.module.css'
import { useCities } from '../contexts/CitiesContext';


const formatDate = (date) =>
  new Intl.DateTimeFormat("en", {
    day: "numeric",
    month: "long",
    year: "numeric",
  }).format(new Date(date));


const CityItem = ({city}) => {
  const { cityName, emoji, date, id , position } = city;
  const {currentCity , deleteCity} = useCities()
  const handleClick = (e) => {
    e.preventDefault()
    deleteCity(id)
  }
  return (
    <li>
      <Link to={`${id}?lat=${position.lat}&lng=${position.lng}`} className={`${style.cityItem} ${id === currentCity.id ? style["cityItem--active"] : ''}`}>
       <img className={style.emoji} src={city.emoji} />
       <h3 className={style.name}>{city.cityName}</h3>
       <time className={style.date}>({formatDate(city.date)})</time>
       <button onClick={handleClick} className={style.deleteBtn}>&times;</button>
       </Link>
    </li>
  )
}

export default CityItem