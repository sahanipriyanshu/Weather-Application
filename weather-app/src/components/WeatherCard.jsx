import React from 'react';
import { Thermometer, Droplets, Wind, Eye, Gauge, Sun, Cloud, CloudRain, SunSnow as Snow, Zap } from 'lucide-react';

const WeatherCard = ({ weatherData }) => {
  const getWeatherIcon = (weather) => {
    const weatherType = weather?.toLowerCase();
    const iconProps = { className: "w-16 h-16 text-white drop-shadow-lg" };
    
    switch (weatherType) {
      case 'clear':
        return <Sun {...iconProps} />;
      case 'clouds':
        return <Cloud {...iconProps} />;
      case 'rain':
      case 'drizzle':
        return <CloudRain {...iconProps} />;
      case 'thunderstorm':
        return <Zap {...iconProps} />;
      case 'snow':
        return <Snow {...iconProps} />;
      default:
        return <Sun {...iconProps} />;
    }
  };

  const formatTime = (timestamp) => {
    return new Date(timestamp * 1000).toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  return (
    <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-3xl p-8 shadow-2xl animate-fadeIn hover:scale-105 transition-all duration-500">
      <div className="text-center mb-6">
        <h2 className="text-3xl font-bold text-white mb-2">
          {weatherData.name}, {weatherData.sys.country}
        </h2>
        <p className="text-white/80 text-lg capitalize">
          {weatherData.weather[0].description}
        </p>
      </div>

      <div className="flex flex-col md:flex-row items-center justify-between mb-8">
        <div className="flex items-center space-x-4 mb-4 md:mb-0">
          {getWeatherIcon(weatherData.weather[0].main)}
          <div className="text-center md:text-left">
            <span className="text-6xl font-bold text-white drop-shadow-lg">
              {Math.round(weatherData.main.temp)}°
            </span>
            <p className="text-white/80 text-lg mt-2">
              Feels like {Math.round(weatherData.main.feels_like)}°
            </p>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4 text-center md:text-right">
          <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-4">
            <p className="text-white/80 text-sm">High</p>
            <p className="text-white text-2xl font-bold">
              {Math.round(weatherData.main.temp_max)}°
            </p>
          </div>
          <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-4">
            <p className="text-white/80 text-sm">Low</p>
            <p className="text-white text-2xl font-bold">
              {Math.round(weatherData.main.temp_min)}°
            </p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-4 text-center hover:bg-white/20 transition-all duration-300">
          <Droplets className="w-8 h-8 text-white mx-auto mb-2" />
          <p className="text-white/80 text-sm">Humidity</p>
          <p className="text-white text-xl font-bold">{weatherData.main.humidity}%</p>
        </div>

        <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-4 text-center hover:bg-white/20 transition-all duration-300">
          <Wind className="w-8 h-8 text-white mx-auto mb-2" />
          <p className="text-white/80 text-sm">Wind</p>
          <p className="text-white text-xl font-bold">{Math.round(weatherData.wind.speed)} m/s</p>
        </div>

        <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-4 text-center hover:bg-white/20 transition-all duration-300">
          <Eye className="w-8 h-8 text-white mx-auto mb-2" />
          <p className="text-white/80 text-sm">Visibility</p>
          <p className="text-white text-xl font-bold">{(weatherData.visibility / 1000).toFixed(1)} km</p>
        </div>

        <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-4 text-center hover:bg-white/20 transition-all duration-300">
          <Gauge className="w-8 h-8 text-white mx-auto mb-2" />
          <p className="text-white/80 text-sm">Pressure</p>
          <p className="text-white text-xl font-bold">{weatherData.main.pressure} hPa</p>
        </div>
      </div>

      <div className="mt-6 flex justify-between items-center pt-4 border-t border-white/20">
        <div className="text-center">
          <p className="text-white/80 text-sm">Sunrise</p>
          <p className="text-white font-bold">{formatTime(weatherData.sys.sunrise)}</p>
        </div>
        <div className="text-center">
          <p className="text-white/80 text-sm">Sunset</p>
          <p className="text-white font-bold">{formatTime(weatherData.sys.sunset)}</p>
        </div>
      </div>
    </div>
  );
};

export default WeatherCard;