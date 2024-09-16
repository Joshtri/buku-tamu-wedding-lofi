import React from 'react';
import GuestList from './components/GuestList';
import verticalImg from './assets/verticalFront.jpg';
import './App.css'; // Import the custom CSS

const App: React.FC = () => {
  return (
    <div className="min-h-screen relative flex flex-col items-center justify-center bg-cover bg-center" 
         style={{ 
           backgroundImage: `url(${verticalImg})` 
         }}
    >
      {/* Full-Screen Overlay */}
      <div className="absolute inset-0 bg-black bg-opacity-50"></div>
      
      {/* Content with Fade-In Effect */}
      <div className="relative z-10 p-4 fade-in">
        <GuestList />
      </div>
    </div>
  );
}

export default App;
