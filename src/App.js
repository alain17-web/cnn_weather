import axios from 'axios'
import './App.css';
import { useState, useEffect } from 'react'
import Header from './components/header/Header';
import City from './components/city/City';
import GetWeatherButton from './components/getWeatherButton/GetWeatherButton';
import Loading from './components/loading/Loading';

function App() {

  const [forecasts, setForecasts] = useState([])
  const [showCities, setShowCities] = useState(false)
  const [value, setValue] = useState(0)

  

  const URL = "https://api.openweathermap.org/data/2.5/group"


  const images = [
    '/img/sunset.jpg',
    '/img/evening.jpg',
    '/img/provence.jpg',
    '/img/sandstone.jpg',
    '/img/valley.jpg'
  ]

  const show = () => {
    setShowCities(true)
  }

  const close = () => {
    setShowCities(false)
  }

  useEffect(() => {
    const cities = [
      ['4180439', '264371', '1070940', '2293538', '2078025'], 
      ['250441', '292968', '2759794', '2800866', '4930956'], 
      ['1609350', '2174003', '425378', '3060972', '2618425'], 
      ['3369157', '3646738', '4460243', '360630', '292223'], 
      ['1645528', '2934246', '170654', '4990729', '233508'], 
    ]
    
    const fetchWeather = async () => {
      const { data } = await axios.get(URL, {
        params: {
          id: cities[value].toString(),
          units: 'metric',
          APPID: process.env.REACT_APP_API_KEY
        }
      })
      return data
    }
    if (showCities) {
      const interval = setInterval(async () => {
        const weatherData = await fetchWeather()
        setForecasts(weatherData.list)
        setValue((v) => {
          return v === 4 ? 0 : v + 1
        })
      }, 5000)
      return () => clearInterval(interval)
    }
  }, [showCities,value])

  
  return (
    <div className="App" style={{ backgroundImage: `url(${images[value]})` }}>

      <Header />
      {!showCities ? (<GetWeatherButton show={show} />) : (
        <>
          {forecasts && forecasts.map(forecast => (
            <City key={forecast.name} cityName={forecast.name} weather={forecast.weather[0].main} high={Math.round(forecast.main.temp + 3)} low={Math.round(forecast.main.temp - 3)} />

          ))}

        </>
      )}
      {!showCities ? '' : !forecasts ? (<Loading close={close}/>) : (
        <div className='close'>
          <button onClick={() => setShowCities(false)}>Close</button>
        </div>
      )}
    </div>

  );
}

export default App;