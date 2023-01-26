-- Active: 1673889579030@@127.0.0.1@3306

/* Criando a tabela para criar usuários */

CREATE Table users (
    id TEXT PRIMARY KEY UNIQUE NOT NULL,
    email TEXT UNIQUE NOT NULL,
    password TEXT NOT NULL
);

/* Para ver o formato da tabela */

PRAGMA table_info ('users');

/* Para ver o que tem dentro da tabela */ 
SELECT * FROM users
;

/* Colocando informações de usuarios na tabela */

INSERT INTO users (id, email, password)
VALUES ('u001','veronicarubim@gmail.com', '112233');
INSERT INTO users (id, email, password)
VALUES ('u002','martarubim@gmail.com', '112233');
INSERT INTO users (id, email, password)
VALUES ('u003','mariaconstance@gmail.com', '112233');
INSERT INTO users (id, email, password)
VALUES ('u004','ericarubim@gmail.com', '112233');

/* Criando tabela de produtos */

CREATE Table products (
    id TEXT PRIMARY KEY UNIQUE NOT NULL,
    name TEXT NOT NULL,
    price REAL NOT NULL,
    category TEXT NOT NULL
);

/* Para ver o formato da tabela */

PRAGMA table_info ('products');

/* Para ver o que tem dentro da tabela */ 
SELECT * FROM products
;

INSERT INTO products (id, name, price, category)
VALUES ('p001', 'calça', 50, 'roupa');
INSERT INTO products (id, name, price, category)
VALUES ('p002', 'camiseta', 25, 'roupa');
INSERT INTO products (id, name, price, category)
VALUES ('p003', 'vestido', 30, 'roupa');
INSERT INTO products (id, name, price, category)
VALUES ('p004', 'all star', 100, 'sapato');