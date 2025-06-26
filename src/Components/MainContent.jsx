import React from 'react';
import './MainContent.css';
import grillImage from '../assets/grill.jpg';

function MainContent() {
  return (
    <main className="main-content">
      <img src={grillImage} alt="GAI Grill" className="center-image" />
    </main>
  );
}

export default MainContent;