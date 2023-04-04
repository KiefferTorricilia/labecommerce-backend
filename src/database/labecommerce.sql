-- Active: 1680566558818@@127.0.0.1@3306
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

CREATE TABLE purchases(
    id TEXT UNIQUE NOT NULL PRIMARY KEY,
    total_price REAL NOT NULL,
    paid INTEGER NOT NULL,
    delivered_at TEXT DATETIME,
    buyer_id TEXT NOT NULL,
    FOREIGN KEY (buyer_id) REFERENCES users(id)
);

DROP TABLE purchases;

INSERT INTO purchases(id, total_price, paid, delivered_at, buyer_id)
VALUES
    ("1", 20, 1, null, "1"),
    ("2", 50, 0, datetime('now'), "1"),
    ("3", 40, 1, null, "2"),
    ("4", 80, 0, datetime('now'), "2");

UPDATE purchases SET delivered_at = datetime('now') WHERE id = 1;
UPDATE purchases SET delivered_at = datetime('now') WHERE id = 3;

SELECT * FROM purchases;

SELECT * FROM purchases
INNER JOIN users
ON purchases.buyer_id = users.id;

