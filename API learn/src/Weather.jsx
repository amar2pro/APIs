import React, {useState,useEffect} from 'react'
const BASE_URL = "https://api.openweathermap.org/data/2.5/weather"
  const API_KEY = import.meta.env.VITE_OPENWEATHER_API_KEY
function Weather() {
  const [weatherData, setweatherData] = useState(null)
  const[loading,setloading] = useState(false)
  const [city, setCity] = useState('nairobi')
  const[error,setError] = useState('')
  const fetchWeatherData = async(cityName) =>
     {
      setloading(true)
      try{
        const url= `${BASE_URL}?q=${cityName}&appid=${API_KEY}`
        const response =  await fetch(url)
        if(!response.ok){
          throw new Error(" Something went wrong")
        }
        console.log(response)
        const data = await response.json()
        setweatherData(data)
      }catch(error){
        setError(error instanceof Error ? error.message:"Failed")
      }finally{
        setloading(false)
      }
    };
     useEffect(() => {
  fetchWeatherData(city);
 },[]);
 const handleSubmit = (e) => {
  e.preventDefault()

  fetchWeatherData(city)
 }
 console.log(weatherData)
  return (
    <>
      <div className='min-h-screen bg-gradient-to-b from-pink-400 via-red-300 to-pink-800 '>
        <div className=''>
          {/*header*/}
           <section className='container mx-auto my-0 border border-black'>
          <div className='text-center mb-2'>
            <h1 className='text-4xl text-white font-semibold mb-5'>Weather App</h1>
            <p>Get the weather status of any city.</p>
          </div>
          {/*serch form*/}
          <form  onSubmit= {handleSubmit} className='mb-6 '>
            <div className='flex gap-2  flex flex-col gap-4 '>
              <input 
              type='text'
              value={city}
              onChange={(e) => setCity(e.target.value)}
              placeholder = 'Enter city name'
              className='flex-1 p-3 text-black font-san serif rounded-lg bg-white  w-max mx-auto'
              />
              <button 
              type = 'submit'
              className='px-4 py-4 font-semibold rounded-lg text-green-400 bg-yellow-700 mx-auto'>
                  Enter
              </button>
            </div>
          </form>

         
          { loading && (
            <div>
              <div className='animate-spin rounded-full h-12 w-12 border-2 border-blue-700 mx-auto mb-4' ></div>
              {/*<p>Fetching data</p>*/}
            </div>
          )

          }
          {
            weatherData &&(
              <div className='mx-auto w-max bg-cyan-300 rounded-lg p-6 shadow-lg'>
                <div>
                  <h2>
                    {weatherData.name},{weatherData.sys.country}
                  </h2>
                  <p>{weatherData.weather[0].description}</p>
                  <p>{weatherData.main.temp}</p>
                </div>
                <div>
                  <img 
                  src={`https://openweathermap.org/img/wn/${weatherData.weather[0].icon}@2x.png`}
                  
                  />
                </div>
                <div className='grid grid-cols-2 gap-4'>
                      <div className='bg-blue-100 rounded-lg p-5 text-center'>
                      <div className='text-blue-500 text-2xl font-bold'>
                      {weatherData.main.humidity}
                      </div>
                       <div className='text-sm text-gray-700'>
                      Humidity
                      </div>
                      </div>
                       <div className='bg-blue-100 rounded-lg p-5 text-center'>
                      <div className='text-blue-500 text-2xl font-bold'>
                      {weatherData.main.pressure}
                      </div>
                       <div className='text-sm text-gray-700'>
                      Pressure
                      </div>
                      </div>
                       <div className='bg-blue-100 rounded-lg p-5 text-center'>
                      <div className='text-blue-500 text-2xl font-bold'>
                      {weatherData.main.feels_like}
                      </div>
                       <div className='text-sm text-gray-700'>
                      Feels Like
                      </div>
                      </div>
                       <div className='bg-blue-100 rounded-lg p-5 text-center'>
                      <div className='text-blue-500 text-2xl font-bold'>
                      {weatherData.main.sea_level}
                      </div>
                       <div className='text-sm text-gray-700'>
                      Sea Level
                      </div>
                      </div>
                </div>
              </div>
            )
          }
          </section>
        </div>
      </div>
    </>
  )
}                    

export default Weather
