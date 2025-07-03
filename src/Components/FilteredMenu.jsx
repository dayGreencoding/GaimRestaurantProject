// src/Components/FilteredMenu.jsx
import React from "react";
import menuData from "../data/menuData";

const FilteredMenu = ({ query }) => {
  const searchTerm = query.toLowerCase();

  return (
    <main className="menu-content">
      {menuData.map((section) => {
        // Check if section title matches search
        const titleMatches = section.title.toLowerCase().includes(searchTerm);

        // Filter items in that section
        const filteredItems = section.items.filter((item) =>
          item.name.toLowerCase().includes(searchTerm)
        );

        // If neither the section nor any item matches, skip
        if (!titleMatches && filteredItems.length === 0) return null;

        return (
          <section key={section.id}>
            <h2>{section.title}</h2>
            <ul>
              {(titleMatches ? section.items : filteredItems).map((item, index) => (
                <li key={index}>
                  <strong>{item.name}</strong> – ${item.price.toFixed(2)}
                </li>
              ))}
            </ul>
          </section>
        );
      })}
    </main>
  );
};

export default FilteredMenu;
