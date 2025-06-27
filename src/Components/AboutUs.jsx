import React from 'react';
import './AboutUs.css';
import aboutImage from '../assets/GaiGrill-About-us.png';


const AboutUs = () => {
  return (
    <div className="about-container" style={{ padding: '2rem' }}>
      <h1>Our Story</h1>
      <p>
     Welcome to GAI Grill, the only Indian restaurant where the food hotter than your cousin's destination wedding gossip and our paneer is more reliable than your last five dates combined. 
We started this restaurant with one simple mission: To make you sweat, cry, and thank us for it. Our spice scale goes from "mild" to call your mom and apologize for everything. 
The kitchen runs on family secrets, Bollywood soundtracks, and pure chaotic energy. If our chef looks angry, don't worry that just means your food about to be incredible.  

Our Samosas are shaped like triangles but hit like emotional damage. The mango lassi, basically therapy in a glass. And the only thing flakier than our paratha is your group chat
trying to plan a dinner. We are not a five star restaurant. We are five aunties operation, and yes they are judging how you eat with your hands. 
So come hungry. Leave full. Return only when you've recovered. 
      </p>

      <img src={aboutImage} alt="GAI Grill Team" className="about-img" />
    </div>
  );
};

export default AboutUs;