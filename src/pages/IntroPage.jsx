
import React, { useEffect, useState } from 'react';
import './IntroPage.css';
import yugiohImage from '../assets/Yu-Gi-DB.png';

const IntroPage = ({ onSlideUpComplete }) => {
  const [slideUp, setSlideUp] = useState(false);

  // Call this function when you want to start the slide-up animation
  const startSlideUp = () => {
    setSlideUp(true);
  };

  // Add an effect to call the onSlideUpComplete after the animation ends
  useEffect(() => {
    if (slideUp) {
      // Wait for the animation to finish before calling onSlideUpComplete
      const timer = setTimeout(() => {
        onSlideUpComplete();
      }, 500); // Should match the animation duration

      return () => clearTimeout(timer);
    }
  }, [slideUp, onSlideUpComplete]);


  return (
    <div className={`intro-page ${slideUp ? 'slide-up' : ''}`}>
      <div className="glass-effect">
        <img className='intro-logo' src={yugiohImage} alt='Yu-Gi-DB' />
        {/* <h1>Welcome to the Yu-Gi-Oh Deck Builder!</h1> */}
        <button 
          className="start-button" 
          onClick={startSlideUp}
        >
          Start Building
        </button>
      </div>  
    </div>
  );
};

export default IntroPage;