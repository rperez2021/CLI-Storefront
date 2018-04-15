CREATE DATABASE bamazon_db;

USE bamazon_db;
CREATE TABLE products (
	item_id INT(10) NOT NULL,
    product_name VARCHAR(25), 
    department_name VARCHAR(30), 
    price INT(10),
    stock_quantity INT (10)
    );
    
INSERT INTO products (item_id, product_name, department_name, price, stock_quantity)
VALUES (001, "Heavy Hammer", "Tools", 30, 200);
INSERT INTO products (item_id, product_name, department_name, price, stock_quantity)
VALUES (002, "Band Saw", "Tools", 45, 100);
INSERT INTO products (item_id, product_name, department_name, price, stock_quantity)
VALUES (003, "Oreos", "Food", 5, 1000);
INSERT INTO products (item_id, product_name, department_name, price, stock_quantity)
VALUES (004, "Chicken Soup", "Food", 2, 10000);
INSERT INTO products (item_id, product_name, department_name, price, stock_quantity)
VALUES (005, "Red Kibble", "Food", 4, 1000);
INSERT INTO products (item_id, product_name, department_name, price, stock_quantity)
VALUES (006, "Mousepad", "Electronics", 20, 200);
INSERT INTO products (item_id, product_name, department_name, price, stock_quantity)
VALUES (007, "Dazzling U200 Monitor", "Electronics", 400, 100);
INSERT INTO products (item_id, product_name, department_name, price, stock_quantity)
VALUES (008, "Command and Conquer", "Software", 50, 2);
INSERT INTO products (item_id, product_name, department_name, price, stock_quantity)
VALUES (009, "Windows 3.1 Retro Edition", "Software", 1000, 5);
INSERT INTO products (item_id, product_name, department_name, price, stock_quantity)
VALUES (010, "Becho", "Electronics", 200, 10);
