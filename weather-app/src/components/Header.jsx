import React from 'react';
import { Cloud } from 'lucide-react';

const Header = () => {
  return (
    <header className="text-center mb-8 animate-fadeInDown">
      <div className="flex items-center justify-center space-x-3 mb-2">
        <Cloud className="w-10 h-10 text-white animate-bounce" />
        <h1 className="text-4xl md:text-6xl font-bold text-white drop-shadow-lg">
          Sahani's Weather App
        </h1>
      </div>
      <p className="text-white/80 text-lg md:text-xl font-light">
        Powered by OpenWeather API
      </p>
    </header>
  );
};

export default Header;