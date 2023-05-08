-- Active: 1683582048443@@127.0.0.1@3306
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
    ("p1", 1700, 1, null, "1"),
    ("p2", 899, 0, datetime('now'), "1"),
    ("p3", 40, 1, null, "2"),
    ("p4", 80, 0, datetime('now'), "2");

UPDATE purchases SET delivered_at = datetime('now') WHERE id = 1;
UPDATE purchases SET delivered_at = datetime('now') WHERE id = 3;

SELECT * FROM purchases;

SELECT * FROM purchases
INNER JOIN users
ON purchases.buyer_id = users.id;

CREATE TABLE purchases_products (
    purchase_id TEXT NOT NULL,
    product_id TEXT NOT NULL,
    quantity INTEGER NOT NULL,
    FOREIGN KEY (purchase_id) REFERENCES purchases(id),
    FOREIGN KEY (product_id) REFERENCES products(id)
);

DROP TABLE purchases_products;

INSERT INTO purchases_products (purchase_id, product_id, quantity)
VALUES
    ("p1", "1", 1),
    ("p2", "2",1 ),
    ("p3", "3", 1);

SELECT * FROM purchases
INNER JOIN purchases_products
ON purchases_products.purchase_id = purchases.id;

