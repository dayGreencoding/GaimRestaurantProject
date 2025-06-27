import React, { useState, useEffect } from 'react';
import './MainContent.css';

import grill1 from '../assets/grill.jpg';
import grill2 from '../assets/grill2.jpg';
import grill3 from '../assets/grill3.jpg';

const images = [grill1, grill2, grill3];

function MainContent() {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) =>
        prevIndex === images.length - 1 ? 0 : prevIndex + 1
      );
    }, 4000); // Change image every 4 seconds

    return () => clearInterval(interval); // Cleanup on unmount
  }, []);

  return (
    <main className="main-content">
      <img
        src={images[currentIndex]}
        alt={`Grill ${currentIndex + 1}`}
        className="center-image"
      />
    </main>
  );
}

export default MainContent;