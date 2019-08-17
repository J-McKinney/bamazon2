DROP DATABASE IF EXISTS bamazondb;

CREATE DATABASE bamazondb;

USE bamazondb;

CREATE TABLE products (
  item_id INT NOT NULL AUTO_INCREMENT,
  product_name VARCHAR(50) NOT NULL,
  department_name VARCHAR(50) NOT NULL,
  price DECIMAL(12,2) NOT NULL,
  stock_quantity INT NOT NULL,
  PRIMARY KEY (item_id)
);

Select * FROM products;

-- 1
INSERT INTO products (product_name, department_name,price, stock_quantity)
VALUES ("Half and half", "Dairy", 2.95, 100);
-- 2
INSERT INTO products (product_name, department_name,price, stock_quantity)
VALUES ("Pencils", "School Supplies", 2.99, 100);
-- 3
INSERT INTO products (product_name, department_name,price, stock_quantity)
VALUES ("Toilet Paper", "Dry Goods", 9.99, 50);
-- 4
INSERT INTO products (product_name, department_name,price, stock_quantity)
VALUES ("Bananas", "Produce", 0.69, 100);
-- 5
INSERT INTO products (product_name, department_name,price, stock_quantity)
VALUES ("Notebooks", "School Supplies", 1.99, 50);
-- 6
INSERT INTO products (product_name, department_name,price, stock_quantity)
VALUES ("Coffee Kuerag Pods", "Dry Goods", 9.99, 20);
-- 7
INSERT INTO products (product_name, department_name,price, stock_quantity)
VALUES ("Broccoli", "Produce", 1.99, 20);
-- 8
INSERT INTO products (product_name, department_name,price, stock_quantity)
VALUES ("Milk", "Dairy", 2.19, 50);
-- 9
INSERT INTO products (product_name, department_name,price, stock_quantity)
VALUES ("Rotisserie Chicken", "Meat", 7.95, 8);
-- 10
INSERT INTO products (product_name, department_name,price, stock_quantity)
VALUES ("Ground Beef", "Meat", 2.79, 25);

