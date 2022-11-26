import './GetWeatherButton.css'

const GetWeatherButton = ({show}) => {
  return (
    <div className='getWeather'>
      <button onClick={show}>Get Global Weather</button>
    </div>
  )
}

export default GetWeatherButton
