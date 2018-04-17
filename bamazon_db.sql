CREATE DATABASE bamazon_db;

USE bamazon_db;

DROP TABLE products;

CREATE TABLE products (
	item_id INT(10) NOT NULL AUTO_INCREMENT,
    product_name VARCHAR(25), 
    department_name VARCHAR(30), 
    price INT(10),
    stock_quantity INT (10),
    product_sales INT(10),
    PRIMARY KEY (item_id)
    );
    
INSERT INTO products (item_id, product_name, department_name, price, stock_quantity, product_sales)
VALUES (001, "Heavy Hammer", "Tools", 30, 200, 0);
INSERT INTO products (item_id, product_name, department_name, price, stock_quantity, product_sales)
VALUES (002, "Band Saw", "Tools", 45, 100, 0);
INSERT INTO products (item_id, product_name, department_name, price, stock_quantity, product_sales)
VALUES (003, "Oreos", "Food", 5, 1000, 0);
INSERT INTO products (item_id, product_name, department_name, price, stock_quantity, product_sales)
VALUES (004, "Chicken Soup", "Food", 2, 10000, 0);
INSERT INTO products (item_id, product_name, department_name, price, stock_quantity, product_sales)
VALUES (005, "Red Kibble", "Food", 4, 1000, 0);
INSERT INTO products (item_id, product_name, department_name, price, stock_quantity, product_sales)
VALUES (006, "Mousepad", "Electronics", 20, 200, 0);
INSERT INTO products (item_id, product_name, department_name, price, stock_quantity, product_sales)
VALUES (007, "Dazzling U200 Monitor", "Electronics", 400, 100, 0);
INSERT INTO products (item_id, product_name, department_name, price, stock_quantity, product_sales)
VALUES (008, "Command and Conquer", "Software", 50, 2, 0);
INSERT INTO products (item_id, product_name, department_name, price, stock_quantity, product_sales)
VALUES (009, "Windows 3.1 Retro Edition", "Software", 1000, 4, 0);
INSERT INTO products (item_id, product_name, department_name, price, stock_quantity, product_sales)
VALUES (010, "Bamazon Echo", "Electronics", 200, 10, 0);

DROP TABLE departments;

CREATE TABLE departments (
	department_id INT(10) NOT NULL AUTO_INCREMENT,
    department_name VARCHAR(30), 
    over_head_costs INT(100),
    PRIMARY KEY (department_id)
    );
    
INSERT INTO departments (department_id, department_name, over_head_costs)
VALUES (001, "Tools", 5000);
INSERT INTO departments (department_id, department_name, over_head_costs)
VALUES (002, "Food", 3000);
INSERT INTO departments (department_id, department_name, over_head_costs)
VALUES (003, "Electronics", 8000);
INSERT INTO departments (department_id, department_name, over_head_costs)
VALUES (004, "Software", 4000);

SELECT departments.department_id, departments.department_name, departments.over_head_costs, products.product_sales
FROM products
INNER JOIN departments ON departments.department_id=products.item_id