import axios from 'axios'
import './App.css';
import { useState, useEffect } from 'react'
import Header from './components/header/Header';
import City from './components/city/City';
import GetWeatherButton from './components/getWeatherButton/GetWeatherButton';

function App() {

  const [forecasts, setForecasts] = useState([])
  const [showCities, setShowCities] = useState(false)
  const [value, setValue] = useState(0)

  /* const handleClick = async (e) => {
    
      const data = await fetchWeather()
      setForecasts(data)
  
  }  */

  const URL = "https://api.openweathermap.org/data/2.5/group"

  const cities = ['4180439', '264371', '1070940', '2293538', '2078025', '250441', '292968', '2759794', '2800866', '4930956', '1609350', '2174003', '425378', '3060972', '2618425', '3369157', '3646738', '4460243', '360630', '292223', '1645528', '2934246', '170654', '4990729', '233508', '2650225', '5520993', '5946768', '95446', '2268339', '2925533', '2409306', '5350937', '6690660', '1809858', '3657509', '2648579', '3099434', '281133', '1819729', '1269843', '4699066', '2911298', '890299', '658225', '311044', '2023469', '2775220', '4259418', '1843561', '1642911', '105343', '993800', '281184', '4160021', '1174872', '2314302', '703448', '1859171', '1733046', '2332459', '2643743', '5506956', '2267057', ' 3936456', '1275339', '2643123', '3530597', '524901', '2158177', '5128581', '184745', '1856057', '3172394', '1261481', '1853909', '2357048', '698740', '6094817', '3143244', '2988507', '2063523', '4560349', '1821306', '3067696', '6325494', '3652462', '1797929', '1692193', '119208', '3451190', '108410', '4219762', '2538474', '3413829', '1796236', '5391959', '3448439', '2673730', '2147714', '1850147', '6167865', '1668341', '112931', '293397', '2028462', '2745912', '1833747', '479561', '1253986', '2761369', '6173331', '2013348', '593116', '726050', '5815135', '756135', '6183235', '3352136', '3513090', '1790630', '1788081', '848354', '2220957', '616052', '1298824', '3186886', '2657896', '1784658', '3104324'
  ]

 

  const images = [
    '/img/sunset.jpg',
    '/img/evening.jpg',
    '/img/provence.jpg',
    '/img/sandstone.jpg',
    '/img/valley.jpg'
  ]

  const show = async () => {
    setShowCities(true)
  }

  useEffect(() => {
    const test = ['593116', '726050', '5815135', '264371', '1070940']
    const fetchWeather = async () => {
      const { data } = await axios.get(URL, {
        params: {
          id: test.toString(),
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
      }, 5000)
      return () => clearInterval(interval)
    }
  }, [showCities])

  useEffect(() => {
    if (showCities) {
      const interval = setInterval(() => {
        setValue((v) => {
          return v === 4 ? 0 : v + 1
        })
      }, 5000)
      return () => clearInterval(interval)
    }
  }, [showCities])

  


  return (
    <div className="App" style={{ backgroundImage: `url(${images[value]})` }}>

      <Header />
      {!showCities ? (<GetWeatherButton show={show} />) : (
        <>
          {forecasts && forecasts.map(forecast => (
            <City key={forecast.name} cityName={forecast.name} weather={forecast.weather[0].main} high={Math.round(forecast.main.temp + 3)} low={Math.round(forecast.main.temp - 3)} />

          ))}


          {/* <City cityName='London' icon={rain} high='11' low='7' />
          <City cityName='Lagos' icon={sun} high='29' low='18' />
          <City cityName='Liverpool' icon={rain} high='10' low='7' />
          <City cityName='Lhassa' icon={snow} high='4' low='0' />  */}

        </>
      )}
      {!showCities ? '' : (
        <div className='close'>
          <button onClick={() => setShowCities(false)}>Close</button>
        </div>
      )}
    </div>

  );
}

export default App;
