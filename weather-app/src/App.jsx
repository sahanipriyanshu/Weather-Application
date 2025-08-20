import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import SearchBar from './components/SearchBar';
import WeatherCard from './components/WeatherCard';
import ForecastCard from './components/ForecastCard';
import LoadingSpinner from './components/LoadingSpinner';

const API_KEY = import.meta.env.VITE_API_KEY;// Your actual API key

function App() {
  const [weatherData, setWeatherData] = useState(null);
  const [forecastData, setForecastData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  // Removed unused city state
  const [backgroundClass, setBackgroundClass] = useState('bg-gradient-to-br from-blue-400 via-blue-500 to-blue-600');

  const getWeatherBackground = (weather, isNight = false) => {
    const weatherType = weather?.toLowerCase();
    
    if (isNight) {
      return 'bg-gradient-to-br from-indigo-900 via-purple-900 to-blue-900';
    }
    
    switch (weatherType) {
      case 'clear':
        return 'bg-gradient-to-br from-yellow-400 via-orange-500 to-pink-500';
      case 'clouds':
        return 'bg-gradient-to-br from-gray-400 via-gray-500 to-gray-600';
      case 'rain':
      case 'drizzle':
        return 'bg-gradient-to-br from-blue-700 via-blue-800 to-indigo-900';
      case 'thunderstorm':
        return 'bg-gradient-to-br from-gray-800 via-gray-900 to-black';
      case 'snow':
        return 'bg-gradient-to-br from-blue-200 via-white to-gray-300';
      case 'mist':
      case 'fog':
        return 'bg-gradient-to-br from-gray-300 via-gray-400 to-gray-500';
      default:
        return 'bg-gradient-to-br from-blue-400 via-blue-500 to-blue-600';
    }
  };

  const fetchWeatherData = async (cityName) => {
    if (!cityName.trim()) {
      setError('Please enter a city name');
      return;
    }

    setLoading(true);
    setError('');

    try {
      // Fetch current weather
      const currentWeatherResponse = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${API_KEY}&units=metric`
      );

      if (!currentWeatherResponse.ok) {
        throw new Error('City not found');
      }

      const currentWeather = await currentWeatherResponse.json();

      // Fetch 5-day forecast
      const forecastResponse = await fetch(
        `https://api.openweathermap.org/data/2.5/forecast?q=${cityName}&appid=${API_KEY}&units=metric`
      );

      const forecast = await forecastResponse.json();

      // Process forecast data to get daily forecasts
      const dailyForecasts = [];
      const processedDates = new Set();

      forecast.list.forEach((item) => {
        const date = new Date(item.dt * 1000).toDateString();
        if (!processedDates.has(date) && dailyForecasts.length < 5) {
          dailyForecasts.push(item);
          processedDates.add(date);
        }
      });

      setWeatherData(currentWeather);
      setForecastData(dailyForecasts);

      // Update background based on weather
      const isNight = new Date().getHours() < 6 || new Date().getHours() > 18;
      const newBackground = getWeatherBackground(currentWeather.weather[0].main, isNight);
      setBackgroundClass(newBackground);
      
    } catch (err) {
      setError(err.message || 'Failed to fetch weather data');
      setWeatherData(null);
      setForecastData([]);
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = (cityName) => {
    fetchWeatherData(cityName);
  };

  // Load default city on mount
  useEffect(() => {
    // Define fetchWeatherData inside useEffect to avoid missing dependency warning
    const fetchDefaultCity = async () => {
      await fetchWeatherData('London');
    };
    fetchDefaultCity();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className={`min-h-screen transition-all duration-1000 ease-in-out ${backgroundClass}`}>
      <div className="min-h-screen backdrop-blur-sm bg-black/10">
        <div className="container mx-auto px-4 py-8">
          <Header />
          
          <div className="max-w-4xl mx-auto">
            <SearchBar onSearch={handleSearch} loading={loading} />
            
            {error && (
              <div className="mb-8 p-4 bg-red-500/20 backdrop-blur-md border border-red-300/30 rounded-2xl text-white text-center animate-fadeIn">
                <p className="font-medium">{error}</p>
              </div>
            )}

            {loading && <LoadingSpinner />}

            {weatherData && !loading && (
              <div className="space-y-8 animate-fadeIn">
                <WeatherCard weatherData={weatherData} />
                
                <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-3xl p-6 shadow-2xl">
                  <h3 className="text-2xl font-bold text-white mb-6 text-center">
                    5-Day Forecast
                  </h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
                    {forecastData.map((forecast, index) => (
                      <ForecastCard
                        key={index}
                        forecast={forecast}
                        index={index}
                      />
                    ))}
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;