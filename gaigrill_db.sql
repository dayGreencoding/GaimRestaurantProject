CREATE database gaigrill_db;
USE gaigrill_db;


CREATE TABLE menu_items (
    id INT AUTO_INCREMENT PRIMARY KEY,
    category VARCHAR(100),
    type VARCHAR(50),
    item_name VARCHAR(150),
    description TEXT,
    price DECIMAL(6,2)
);

INSERT INTO menu_items (category, type, item_name, description, price) VALUES ('Soup & Salads', 'Veg', 'Tomato Dhaniya Shorba', 'Light tomato soup with coriander', 6.99);
INSERT INTO menu_items (category, type, item_name, description, price) VALUES ('Soup & Salads', 'Veg', 'Sweet Corn Veg Soup', 'Classic Indo-Chinese creamy corn soup', 7.49);
INSERT INTO menu_items (category, type, item_name, description, price) VALUES ('Soup & Salads', 'Veg', 'Tandoori Veg Salad', 'Grilled paneer, bell peppers, onions on a fresh salad bed', 8.99);
INSERT INTO menu_items (category, type, item_name, description, price) VALUES ('Soup & Salads', 'Non-Veg', 'Chicken Yakhni Shorba', 'Kashmiri-style chicken broth with herbs', 7.99);
INSERT INTO menu_items (category, type, item_name, description, price) VALUES ('Soup & Salads', 'Non-Veg', 'Lemon Coriander Chicken Soup', 'Light, tangy, clear chicken soup', 7.49);
INSERT INTO menu_items (category, type, item_name, description, price) VALUES ('Soup & Salads', 'Non-Veg', 'Chicken Tikka Salad', 'Tandoori chicken tikka on greens with mint yogurt drizzle', 9.99);
INSERT INTO menu_items (category, type, item_name, description, price) VALUES ('Tandoori Starters', 'Veg', 'Paneer Tikka', 'Marinated cottage cheese cubes', 11.99);
INSERT INTO menu_items (category, type, item_name, description, price) VALUES ('Tandoori Starters', 'Veg', 'Tofu Tikka (Vegan)', 'Smoky spiced tofu', 11.49);
INSERT INTO menu_items (category, type, item_name, description, price) VALUES ('Tandoori Starters', 'Veg', 'Soya Chaap Tikka', 'Chargrilled soya skewers', 12.49);
INSERT INTO menu_items (category, type, item_name, description, price) VALUES ('Tandoori Starters', 'Veg', 'Stuffed Mushroom Tikka', 'Filled with cheese & herbs', 12.99);
INSERT INTO menu_items (category, type, item_name, description, price) VALUES ('Tandoori Starters', 'Veg', 'Veg Seekh Kebab', 'Spiced minced veggie skewers', 10.99);
INSERT INTO menu_items (category, type, item_name, description, price) VALUES ('Tandoori Starters', 'Veg', 'Tandoori Aloo', 'Masala baby potatoes', 9.99);
INSERT INTO menu_items (category, type, item_name, description, price) VALUES ('Tandoori Starters', 'Non-Veg', 'Tandoori Shrimp', 'Jumbo shrimp, herbs & spice rub', 17.99);
INSERT INTO menu_items (category, type, item_name, description, price) VALUES ('Tandoori Mains & Sizzlers', 'Veg', 'Tofu Malai Tikka', 'Tofu in rich cashew cream', 12.99);
INSERT INTO menu_items (category, type, item_name, description, price) VALUES ('Tandoori Mains & Sizzlers', 'Veg', 'Afghani Soya Chaap', 'Creamy grilled chaap', 13.99);
INSERT INTO menu_items (category, type, item_name, description, price) VALUES ('Tandoori Mains & Sizzlers', 'Veg', 'Paneer Shashlik Sizzler', 'Skewers of paneer with veggies, served sizzling', 16.99);
INSERT INTO menu_items (category, type, item_name, description, price) VALUES ('Tandoori Mains & Sizzlers', 'Non-Veg', 'Chicken Malai Sizzler', 'Creamy chicken served sizzling with onions & peppers', 17.99);
INSERT INTO menu_items (category, type, item_name, description, price) VALUES ('Tandoori Mains & Sizzlers', 'Non-Veg', 'GAI Mixed Grill Platter', 'Chicken tikka, lamb seekh, shrimp, fish, & wings', 21.99);
INSERT INTO menu_items (category, type, item_name, description, price) VALUES ('Beverages', 'Mixed', 'Masala Chai', 'Spiced Indian tea', 3.49);
INSERT INTO menu_items (category, type, item_name, description, price) VALUES ('Beverages', 'Mixed', 'Mango Lassi', 'Sweet mango yogurt smoothie', 4.99);
INSERT INTO menu_items (category, type, item_name, description, price) VALUES ('Beverages', 'Mixed', 'Rose Milk', 'Chilled rose-flavored milk', 4.49);
INSERT INTO menu_items (category, type, item_name, description, price) VALUES ('Beverages', 'Mixed', 'Jaljeera Soda', 'Spiced digestive soda drink', 3.99);
INSERT INTO menu_items (category, type, item_name, description, price) VALUES ('Beverages', 'Mixed', 'Buttermilk (Chaas)', 'Salted yogurt drink with cumin', 3.99);
INSERT INTO menu_items (category, type, item_name, description, price) VALUES ('Sides & Desserts', 'Bread', 'Plain Naan', 'Soft flour bread', 3.49);
INSERT INTO menu_items (category, type, item_name, description, price) VALUES ('Sides & Desserts', 'Bread', 'Butter Naan', 'With desi ghee/butter', 3.99);
INSERT INTO menu_items (category, type, item_name, description, price) VALUES ('Sides & Desserts', 'Bread', 'Garlic Naan', 'With minced garlic & herbs', 4.49);
INSERT INTO menu_items (category, type, item_name, description, price) VALUES ('Sides & Desserts', 'Bread', 'Cheese Naan', 'Stuffed with cheese blend', 5.49);
INSERT INTO menu_items (category, type, item_name, description, price) VALUES ('Sides & Desserts', 'Bread', 'Tandoori Roti', 'Whole wheat bread', 3.29);
INSERT INTO menu_items (category, type, item_name, description, price) VALUES ('Sides & Desserts', 'Bread', 'Stuffed Kulcha', 'Spiced potato or paneer', 6.49);
INSERT INTO menu_items (category, type, item_name, description, price) VALUES ('Sides & Desserts', 'Sweet', 'Gulab Jamun', 'Fried milk dumplings in syrup', 5.99);
INSERT INTO menu_items (category, type, item_name, description, price) VALUES ('Ice Creams', 'Sweet', 'Vanilla Delight', 'Classic vanilla scoop with sprinkles', 3.99);
INSERT INTO menu_items (category, type, item_name, description, price) VALUES ('Ice Creams', 'Sweet', 'Chocolate Fudge', 'Rich chocolate ice cream with fudge swirls', 4.49);
INSERT INTO menu_items (category, type, item_name, description, price) VALUES ('Ice Creams', 'Sweet', 'Mango Tango', 'Refreshing mango sorbet with a citrus kick', 4.29);
INSERT INTO menu_items (category, type, item_name, description, price) VALUES ('Ice Creams', 'Sweet', 'Strawberry Swirl', 'Strawberry cream with fruit chunks', 4.19);
INSERT INTO menu_items (category, type, item_name, description, price) VALUES ('Ice Creams', 'Sweet', 'Kulfi (Pistachio / Malai / Mango)', 'Traditional Indian ice cream', 4.99);

SELECT * FROM menu_items;