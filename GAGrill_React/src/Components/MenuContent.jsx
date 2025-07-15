import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './MenuContent.css';
import MenuItemModal from './MenuItemModal';
import { useCart } from './CartContext';

function MenuContent() {
  const { cart, setCart } = useCart();
  const [menuItems, setMenuItems] = useState([]);
  const [selectedItem, setSelectedItem] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [instructions, setInstructions] = useState('');
  const [selectedToppings, setSelectedToppings] = useState([]);

  const maxInstructionsLength = 120;
  const availableToppings = ['Extra Cheese', 'Spicy', 'No Garlic', 'Mint Sauce'];

  useEffect(() => {
    axios.get('http://localhost:8080/api/menu')
      .then(res => setMenuItems(res.data))
      .catch(err => console.error('Error fetching menu:', err));
  }, []);

  const handleItemClick = (item) => {
    setSelectedItem(item);
    setQuantity(1);
    setInstructions('');
    setSelectedToppings([]);
  };

  const handleAddToCart = () => {
    setCart(prevCart => {
      const updatedCart = {
        ...prevCart,
        [selectedItem.id]: {
          ...selectedItem,
          quantity: (prevCart[selectedItem.id]?.quantity || 0) + quantity,
          instructions: instructions.trim(),
          toppings: selectedToppings
        }
      };
      console.log("Cart after adding:", updatedCart);
      return updatedCart;
    });
    setSelectedItem(null);
  };

  // Group items by category & subcategory
  const grouped = {};
  for (const item of menuItems) {
    if (!grouped[item.category]) grouped[item.category] = {};
    const sub = item.subCategory || '';
    if (!grouped[item.category][sub]) grouped[item.category][sub] = [];
    grouped[item.category][sub].push(item);
  }

  // ✅ Ensure expected categories always exist, even if empty
  const expectedCategories = [
    'Soup & Salads',
    'Tandoori Starters',
    'Tandoori Mains & Sizzlers',
    'Beverages',
    'Sides & Desserts',
    'Ice Creams'
  ];
  expectedCategories.forEach(cat => {
    if (!grouped[cat]) grouped[cat] = {};
  });

  // Helper to convert category name into safe HTML ID
  const formatId = (str) => str.replace(/[^a-zA-Z0-9]/g, '-').toLowerCase();

  return (
    <main className="menu-content">
      <h1 className="menu-main-headline">🍽️ Our Signature Menu</h1>

      {Object.entries(grouped).map(([category, subGroups]) => (
        <section key={category} id={formatId(category)}>
          <h2>{category}</h2>

          {Object.keys(subGroups).length === 0 ? (
            <p style={{ fontStyle: 'italic', color: '#888' }}>
              No items available.
            </p>
          ) : (
            Object.entries(subGroups).map(([sub, items]) => (
              <div key={sub}>
                {sub && <h3>{sub}</h3>}
                <ul>
                  {items.map(item => (
                    <li
                      key={item.id}
                      onClick={() => handleItemClick(item)}
                      className="clickable-item"
                    >
                      <strong>{item.name}</strong> – {item.description} (${item.price})
                    </li>
                  ))}
                </ul>
              </div>
            ))
          )}
        </section>
      ))}

      <MenuItemModal
        isOpen={!!selectedItem}
        onClose={() => setSelectedItem(null)}
        item={selectedItem}
        quantity={quantity}
        setQuantity={setQuantity}
        instructions={instructions}
        setInstructions={setInstructions}
        toppings={selectedToppings}
        setToppings={setSelectedToppings}
        onAddToCart={handleAddToCart}
        availableToppings={availableToppings}
        maxInstructionsLength={maxInstructionsLength}
      />
    </main>
  );
}

export default MenuContent;
