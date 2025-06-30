import React from "react";
import "./MenuContent.css";

const MenuContent = () => {
  return (
    <main className="menu-content">
      <section id="soup-salads">
        <h2>🥣 Soup & Salads</h2>
        <h3>🥦 Veg Soups & Salads</h3>
        <br/>
        <ul>
         <li><strong>Tomato Dhaniya Shorba</strong> – Light tomato soup with coriander ($6.99)</li>
         <li><strong>Sweet Corn Veg Soup</strong> – Classic Indo-Chinese creamy corn soup ($7.49)</li>
         <li><strong>Tandoori Veg Salad</strong> – Grilled paneer, bell peppers, onions on a fresh salad bed ($8.99)</li>
        </ul>
        <br/>
        <h3>🍗 Non-Veg Soups & Salads</h3>
        <br/>
        <ul>
          <li><strong>Chicken Yakhni Shorba</strong> – Kashmiri-style chicken broth with herbs ($7.99)</li>
          <li><strong>Lemon Coriander Chicken Soup</strong> – Light, tangy, clear chicken soup ($7.49)</li>
          <li><strong>Chicken Tikka Salad</strong> – Tandoori chicken tikka on greens with mint yogurt drizzle ($9.99)</li>
        </ul>
      </section>

      <section id="tandoori-starters">
        <h2>🔥 Tandoori Starters</h2>

        <h3>🌱 Vegetarian</h3>
        <br/>
        <ul>
          <li><strong>Paneer Tikka</strong> – Marinated cottage cheese cubes ($11.99)</li>
          <li><strong>Tofu Tikka (Vegan)</strong> – Smoky spiced tofu ($11.49)</li>
          <li><strong>Soya Chaap Tikka</strong> – Chargrilled soya skewers ($12.49)</li>
          <li><strong>Stuffed Mushroom Tikka</strong> – Filled with cheese & herbs ($12.99)</li>
          <li><strong>Veg Seekh Kebab</strong> – Spiced minced veggie skewers ($10.99)</li>
          <li><strong>Tandoori Aloo</strong> – Masala baby potatoes ($9.99)</li>
        </ul>
        <br/>
        <h3>🍗 Non-Vegetarian</h3>
        <br/>
        <ul>
          <li><strong>Chicken Tikka</strong> – Boneless chicken, tandoori marinade ($12.99)</li>
          <li><strong>Malai Chicken Tikka</strong> – Creamy grilled chicken ($13.49)</li>
          <li><strong>Lamb Seekh Kebab</strong> – Spiced minced lamb skewers ($14.99)</li>
          <li><strong>Tandoori Wings</strong> – Masala-marinated grilled wings ($12.49)</li>
          <li><strong>Fish Tikka</strong> – Clay-oven grilled fish chunks ($16.99)</li>
          <li><strong>Tandoori Shrimp</strong> – Jumbo shrimp, herbs & spice rub ($17.99)</li>
        </ul>
      </section>

      <section id="tandoori-mains">
        <h2>🍽️ Tandoori Mains & Sizzlers</h2>

        <h3>🌿 Vegetarian</h3>
        <br/>
        <ul>
          <li><strong>Tofu Malai Tikka</strong> – Tofu in rich cashew cream ($12.99)</li>
          <li><strong>Afghani Soya Chaap</strong> – Creamy grilled chaap ($13.99)</li>
          <li><strong>Paneer Shashlik Sizzler</strong> – Skewers of paneer with veggies, served sizzling ($16.99)</li>
          <li><strong>GAI Special Veg Sizzler</strong> – Combo of tofu, paneer, soya chaap & kebabs on sizzler ($19.99)</li>
          <li><strong>Tandoori Broccoli</strong> – Yogurt-marinated, chargrilled broccoli ($11.49)</li>
        </ul>
        <br/>
        <h3>🍖 Non-Vegetarian</h3>
        <br/>
        <ul>
          <li><strong>Tandoori Chicken (Half/Full)</strong> – Classic bone-in tandoori style ($13.99 / $19.99)</li>
          <li><strong>Lamb Chops Tandoori</strong> – Tender spiced lamb chops ($22.99)</li>
          <li><strong>Fish Tikka Sizzler</strong> – Grilled fish with veggies on sizzling platter ($18.99)</li>
          <li><strong>Chicken Malai Sizzler</strong> – Creamy chicken served sizzling with onions & peppers ($17.99)</li>
          <li><strong>GAI Mixed Grill Platter</strong> – Chicken tikka, lamb seekh, shrimp, fish, & wings ($21.99)</li>
        </ul>
      </section>

      <section id="beverages">
        <h2>🥤 Beverages</h2>
        
          <ul>
            <li><strong>Masala Chai</strong> – Spiced Indian tea ($3.49)</li>
            <li><strong>Mango Lassi</strong> – Sweet mango yogurt smoothie ($4.99)</li>
            <li><strong>Rose Milk</strong> – Chilled rose-flavored milk ($4.49)</li>
            <li><strong>Jaljeera Soda</strong> – Spiced digestive soda drink ($3.99)</li>
            <li><strong>Buttermilk (Chaas)</strong> – Salted yogurt drink with cumin ($3.99)</li>
            <li><strong>Kingfisher Premium</strong> – Indian lager beer ($6.99)</li>
            <li><strong>Taj Mahal 22oz</strong> – Strong Indian beer ($8.99)</li>
            <li><strong>Indian Spiced Rum</strong> – 30ml shot / cocktail ($7.49 / $10.99)</li>
            <li><strong>Mango Margarita</strong> – Tequila with mango twist ($11.99)</li>
            <li><strong>GAI Signature Masala Mule</strong> – Vodka, ginger beer, lime, Indian masala rim ($12.99)</li>
          </ul>
      </section>

      <section id="sides">
        <h2>🍛 Sides & Desserts</h2>
        
          <ul>
            <li><strong>Plain Naan</strong> – Soft flour bread ($3.49)</li>
            <li><strong>Butter Naan</strong> – With desi ghee/butter ($3.99)</li>
            <li><strong>Garlic Naan</strong> – With minced garlic & herbs ($4.49)</li>
            <li><strong>Cheese Naan</strong> – Stuffed with cheese blend ($5.49)</li>
            <li><strong>Tandoori Roti</strong> – Whole wheat bread ($3.29)</li>
            <li><strong>Stuffed Kulcha</strong> – Spiced potato or paneer ($6.49)</li>
            <li><strong>Gulab Jamun</strong> – Fried milk dumplings in syrup ($5.99)</li>
            <li><strong>Rasmalai</strong> – Cheese patties in saffron milk ($6.99)</li>
            <li><strong>Kheer</strong> – Rice pudding with cardamom ($5.49)</li>
            <li><strong>Gajar Halwa</strong> – Carrot pudding with ghee and nuts ($6.49)</li>
            <li><strong>Kulfi (Malai/Mango/Pistachio)</strong> – Indian ice cream ($5.99)</li>
          </ul>
      </section>
    </main>
  );
};

export default MenuContent;
