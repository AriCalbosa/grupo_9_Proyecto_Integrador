DROP DATABASE IF EXISTS data;
CREATE DATABASE data;

USE data;

CREATE TABLE users (
id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
 first_name VARCHAR(50) NOT NULL,
 last_name VARCHAR(50) NOT NULL,
 email VARCHAR(50) NOT NULL,
 adress VARCHAR(50) NOT NULL,
 password VARCHAR(100) NOT NULL,
 profile VARCHAR(50) DEFAULT 'client',
 avatar VARCHAR(150) NOT NULL
);

CREATE TABLE products (
id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
 product_name VARCHAR(100) NOT NULL,
 price INT NOT NULL,
 discount TINYINT NOT NULL,
 image VARCHAR(150) NOT NULL
);

CREATE TABLE colors (
id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
name VARCHAR(25) NOT NULL,
active TINYINT
);

CREATE TABLE sizes (
id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
number TINYINT,
active TINYINT
);

CREATE TABLE categories (
id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
category VARCHAR(10)
);

CREATE TABLE carts (
id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
quantity TINYINT NOT NULL,
total_price INT NOT NULL,
id_user INT NOT NULL,
FOREIGN KEY (id_user) REFERENCES users(id)
);

CREATE TABLE carts_products (
id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
id_product INT NOT NULL,
id_cart INT NOT NULL,
FOREIGN KEY (id_product) REFERENCES products(id),
FOREIGN KEY (id_cart) REFERENCES carts(id)
);

ALTER TABLE products
ADD id_color INT NOT NULL;

ALTER TABLE products
ADD FOREIGN KEY (id_color) REFERENCES colors(id);

ALTER TABLE products
ADD id_category INT NOT NULL;

ALTER TABLE products
ADD FOREIGN KEY (id_category) REFERENCES categories(id);

ALTER TABLE products
ADD id_size INT NOT NULL;

ALTER TABLE products
ADD FOREIGN KEY (id_size) REFERENCES sizes(id);