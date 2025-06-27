import React from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import Header from './Components/Header';
import AboutUs from './Components/AboutUs';
import MainContent from './Components/MainContent';
import Footer from './Components/Footer';
import MenuContent from './Components/MenuContent';


function ScrollToSection() {
  const { pathname } = useLocation();

  React.useEffect(() => {
    const id = pathname.replace("/", "");
    if (id) {
      const el = document.getElementById(id);
      if (el) el.scrollIntoView({ behavior: "smooth" });
    }
  }, [pathname]);

  return <MenuContent />;
}

function App() {
  return (
    
      <div className="app-container">
        
        <Header />
        <Routes>
          <Route path="/" element={<MainContent />} />
          <Route path="/about-us" element={<AboutUs />} />
           <Route path="/menu" element={<MenuContent />} />
          
          {/* These use the ScrollToSection helper */}
          <Route path="/soup-salads" element={<ScrollToSection />} />
          <Route path="/tandoori-starters" element={<ScrollToSection />} />
          <Route path="/tandoori-mains" element={<ScrollToSection />} />
          <Route path="/beverages" element={<ScrollToSection />} />
         <Route path="/sides" element={<ScrollToSection />} />
          </Routes>
        <Footer />
        
      </div>
    
  );
}

export default App;
