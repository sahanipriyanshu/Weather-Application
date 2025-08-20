import React from 'react';
import { Sun, Cloud, CloudRain, SunSnow as Snow, Zap, Thermometer } from 'lucide-react';

const ForecastCard = ({ forecast, index }) => {
  const getWeatherIcon = (weather) => {
    const weatherType = weather?.toLowerCase();
    const iconProps = { className: "w-8 h-8 text-white mx-auto" };
    
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

  const formatDate = (timestamp) => {
    const date = new Date(timestamp * 1000);
    const today = new Date();
    const tomorrow = new Date(today);
    tomorrow.setDate(tomorrow.getDate() + 1);
    
    if (date.toDateString() === today.toDateString()) {
      return 'Today';
    } else if (date.toDateString() === tomorrow.toDateString()) {
      return 'Tomorrow';
    } else {
      return date.toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' });
    }
  };

  return (
    <div>
      <div 
        className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl p-4 text-center hover:bg-white/20 hover:scale-105 transition-all duration-300 hover:shadow-xl animate-fadeInUp"
        style={{ animationDelay: `${index * 100}ms` }}
      >
        <p className="text-white/90 font-semibold mb-3 text-sm">
          {formatDate(forecast.dt)}
        </p>
        
        <div className="mb-3">
          {getWeatherIcon(forecast.weather[0].main)}
        </div>
        
        <p className="text-white/80 text-xs capitalize mb-3 leading-tight">
          {forecast.weather[0].description}
        </p>
        
        <div className="space-y-2">
          <div className="flex justify-between items-center">
            <span className="text-white font-bold text-lg">
              {Math.round(forecast.main.temp_max)}°
            </span>
            <span className="text-white/70 text-sm">
              {Math.round(forecast.main.temp_min)}°
            </span>
          </div>
          
          <div className="flex items-center justify-center space-x-1">
            <Thermometer className="w-3 h-3 text-white/60" />
            <span className="text-white/80 text-xs">
              {forecast.main.humidity}%
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ForecastCard;