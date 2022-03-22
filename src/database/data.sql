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

CREATE TABLE products_sizes (
id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
id_product INT NOT NULL,
id_size INT NOT NULL,
stock INT NOT NULL
);

ALTER TABLE products_sizes
ADD FOREIGN KEY (id_product) REFERENCES products(id);

ALTER TABLE products_sizes
ADD FOREIGN KEY (id_size) REFERENCES sizes(id);

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

ALTER TABLE products
DROP size;

ALTER TABLE sizes
DROP active;

INSERT INTO sizes(id, number)
VALUES (DEFAULT, 35);

INSERT INTO sizes(id, number)
VALUES (DEFAULT, 36);

INSERT INTO sizes(id, number)
VALUES (DEFAULT, 37);

INSERT INTO sizes(id, number)
VALUES (DEFAULT, 38);

INSERT INTO sizes(id, number)
VALUES (DEFAULT, 39);

INSERT INTO sizes(id, number)
VALUES (DEFAULT, 40);

INSERT INTO sizes(id, number)
VALUES (DEFAULT, 41);

INSERT INTO sizes(id, number)
VALUES (DEFAULT, 42);

INSERT INTO sizes(id, number)
VALUES (DEFAULT, 43);

INSERT INTO sizes(id, number)
VALUES (DEFAULT, 44);

INSERT INTO sizes(id, number)
VALUES (DEFAULT, 45);

ALTER TABLE products
DROP id_size;

ALTER TABLE products
DROP id_category;

ALTER TABLE products
DROP id_color;

ALTER TABLE colors
DROP active;

ALTER TABLE colors
DROP name;

ALTER TABLE colors
ADD color TINYINT NOT NULL;

ALTER TABLE products_sizes
ADD id_color INT NOT NULL;

ALTER TABLE products_sizes
ADD FOREIGN KEY (id_color) REFERENCES colors(id);