-- Active: 1679960851720@@127.0.0.1@3306
CREATE TABLE 
    users(
        id TEXT PRIMARY KEY UNIQUE NOT NULL,
        email TEXT UNIQUE NOT NULL,
        password TEXT NOT NULL
    );

INSERT INTO users(id, email, password)
VALUES
    (1, "kieffer.torricilia@gmail.com", "123456"),
    (2, "stephany@gmail.com", "volk2018"),
    (3, "anderson@gmail.com", "andy");

DROP TABLE users;

CREATE TABLE 
    products(
        id TEXT PRIMARY KEY UNIQUE NOT NULL,
        name TEXT NOT NULL,
        price REAL NOT NULL,
        category TEXT NOT NULL
    );

INSERT INTO products(id, name, price, category)
VALUES
    (1, "Televisão 42", 1700, "Eletrônicos"),
    (2, "Monitor 24", 899, "Eletrônicos"),
    (3, "PS5", 4500, "Eletrônicos"),
    (4, "Multiprocessador", 299, "Eletrônicos"),
    (5, "SSD Sandisk", 219, "Eletrônicos");

DROP TABLE products;