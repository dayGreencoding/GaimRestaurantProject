import React from "react";
import "./MenuContent.css";

const MenuContent = () => {
  return (
    <main className="menu-content">
      <section id="soup-salads">
        <h2>Soup & Salads</h2>
        <ul>
          <li>Tomato Basil Soup</li>
          <li>Garden Fresh Salad</li>
          <li>Chicken Clear Soup</li>
        </ul>
      </section>

      <section id="tandoori-starters">
        <h2>Tandoori Starters</h2>
        <ul>
          <li>Paneer Tikka</li>
          <li>Chicken Seekh Kebab</li>
          <li>Tandoori Mushrooms</li>
        </ul>
      </section>

      <section id="tandoori-mains">
        <h2>Tandoori Mains & Sizzlers</h2>
        <ul>
          <li>Tandoori Chicken</li>
          <li>Fish Tikka Sizzler</li>
          <li>Mixed Grill Platter</li>
        </ul>
      </section>

      <section id="beverages">
        <h2>Beverages</h2>
        <ul>
          <li>Mango Lassi</li>
          <li>Masala Chai</li>
          <li>Fresh Lime Soda</li>
        </ul>
      </section>

      <section id="sides">
        <h2>Sides</h2>
        <ul>
          <li>Butter Naan</li>
          <li>Steamed Rice</li>
          <li>Raita</li>
        </ul>
      </section>
    </main>
  );
};

export default MenuContent;
