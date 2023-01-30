-- Active: 1673889579030@@127.0.0.1@3306

/* Criando a tabela para criar usuários */

CREATE TABLE users (
    id TEXT PRIMARY KEY UNIQUE NOT NULL,
    email TEXT UNIQUE NOT NULL,
    password TEXT NOT NULL
);

CREATE Table products (
    id TEXT PRIMARY KEY UNIQUE NOT NULL,
    name TEXT NOT NULL,
    price REAL NOT NULL,
    category TEXT NOT NULL
);

CREATE TABLE purchase (
    id TEXT PRIMARY KEY UNIQUE NOT NULL,
    total_price REAL NOT NULL,
    paid INTEGER DEFAULT (0) NOT NULL,
    created_at TEXT DEFAULT (DATETIME()) NOT NULL,
    buyer_id TEXT NOT NULL,
    FOREIGN KEY (buyer_id) REFERENCES users (id) 
);

CREATE TABLE purchase_products(
    purchase_id TEXT NOT NULL,
    product_id TEXT NOT NULL,
    quantity INTEGER NOT NULL,
    FOREIGN KEY (purchase_id) REFERENCES purchase(id),
    FOREIGN KEY (product_id) REFERENCES products(id)
);

/* Colocando informações de usuarios na tabela */

INSERT INTO users (id, email, password)
VALUES
('u001','veronicarubim@gmail.com', '112233'),
('u002','martarubim@gmail.com', '112233'),
('u003','mariaconstance@gmail.com', '112233'),
('u004','ericarubim@gmail.com', '112233');

INSERT INTO products (id, name, price, category)
VALUES
('p001', 'calça', 50, 'Roupa'),
('p002', 'camiseta', 25, 'Roupa'),
('p003', 'vestido', 30, 'Roupa'),
('p004', 'all star', 100, 'Sapato');

INSERT INTO purchase (id, total_price, paid, buyer_id)
VALUES 
('c001', 50, 0, 'u001'),
('c002', 50, 0, 'u001'),
('c003', 30, 1, 'u003'),
('c004', 100, 1, 'u003');

INSERT INTO purchase_products (purchase_id, product_id, quantity)
VALUES 
('c001', 'p001', 1),
('c002', 'p002', 2),
('c003', 'p003', 1),
('c004', 'p004', 1);


/* Para ver o formato da tabela */
PRAGMA table_info ('products');

/* Para ver o que tem dentro da tabela */ 
SELECT * FROM products
;

SELECT * FROM purchase
;

SELECT * FROM purchase_products
;

PRAGMA table_info ('purchase')
;

SELECT * FROM users
INNER JOIN purchase
ON purchase.buyer_id = users.id
;

SELECT
    purchase.buyer_id AS buyerID,
    purchase_products.purchase_id AS idPurchase,
    purchase_products.product_id AS idProduct,
    products.name AS productName,
    products.price AS productPrice,
    purchase.total_price AS total_price
FROM purchase_products
LEFT JOIN purchase
ON purchase.id = purchase_products.purchase_id
RIGHT JOIN products
ON products.id = purchase_products.product_id;

/* Procura produtos pelo nome */
SELECT * FROM products
WHERE name = 'camiseta'
;

/* Para ver o formato da tabela */
PRAGMA table_info ('users')
;

/* Para ver o que tem dentro da tabela */ 
SELECT * FROM users
;

/* Função para excluir as tabelas */
DROP TABLE purchase_products
;
DROP TABLE purchases
;
DROP TABLE products
;
DROP TABLE users
;



/* Inserindo um novo usuário */
INSERT INTO users (id, email, password)
VALUES ('u005', 'matheustavares@gmail', '123456')
;

/* Inserindo um novo produto */
INSERT INTO products (id, name, price, category)
VALUES ('p005', 'relógio', 40, 'acessório')
;

/* Get producst by ID */
SELECT * FROM products
WHERE id = 'p003'
;

/* Deletar por ID */
DELETE FROM products
WHERE id = 'p003'
;
