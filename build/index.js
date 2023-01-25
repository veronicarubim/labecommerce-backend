"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const database_1 = require("./database");
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use((0, cors_1.default)());
app.listen(3003, () => {
    console.log("Servidor rodando na porta 3003");
});
app.get('/ping', (req, res) => {
    res.send('Pong!');
});
app.get('/users', (req, res) => {
    try {
        res.status(200).send(database_1.users);
    }
    catch (error) {
        console.log(error);
    }
});
app.get('/products', (req, res) => {
    try {
        res.status(200).send(database_1.products);
    }
    catch (error) {
        console.log(error);
    }
});
app.get('/products/search', (req, res) => {
    const q = req.query.q;
    const result = database_1.products.filter((product) => {
        return product.name.toLowerCase().includes(q.toLowerCase());
    });
    res.status(200).send(result);
});
app.post('/user', (req, res) => {
    const { id, email, password } = req.body;
    const newUser = {
        id,
        email,
        password
    };
    database_1.users.push(newUser);
    res.status(201).send("Novo usuário cadastrado");
});
app.post('/product', (req, res) => {
    const { id, name, price, category } = req.body;
    const newProduct = {
        id,
        name,
        price,
        category
    };
    database_1.products.push(newProduct);
    res.status(201).send("Novo produto cadastrado com sucesso");
});
app.post('/purchase', (req, res) => {
    const { userId, productId, quantity, totalPrice } = req.body;
    const newPurchase = {
        userId,
        productId,
        quantity,
        totalPrice
    };
    database_1.purchase.push(newPurchase);
    res.status(201).send("Compra realizada com sucesso");
});
app.get('/product/:id', (req, res) => {
    const id = (req.params.id);
    const result = database_1.products.find((produto) => {
        return produto.id === id;
    });
    res.status(200).send(result);
});
app.get('/users/:id/purchases', (req, res) => {
    const userId = (req.params.id);
    const result = database_1.purchase.find((Iduser) => {
        return Iduser.userId === userId;
    });
    res.status(200).send(result);
});
app.delete('/user/:id', (req, res) => {
    const id = req.params.id;
    const userIndex = database_1.users.findIndex((user) => {
        return user.id === id;
    });
    if (userIndex >= 0) {
        database_1.users.splice(userIndex, 1);
        res.status(200).send('Usuario deletado com sucesso');
    }
    else {
        res.status(404).send('Não foi possível completar');
    }
});
app.delete('/product/:id', (req, res) => {
    const id = req.params.id;
    const productIndex = database_1.products.findIndex((product) => {
        return product.id === id;
    });
    if (productIndex >= 0) {
        database_1.products.splice(productIndex, 1);
        res.status(200).send('Produto deletado com sucesso');
    }
    else {
        res.status(404).send('Não foi possível completar');
    }
});
app.put('/user/:id', (req, res) => {
    const id = req.params.id;
    const newId = req.body.id;
    const newEmail = req.body.email;
    const newPassword = req.body.password;
    const user = database_1.users.find((user) => {
        return user.id === id;
    });
    if (user) {
        user.id = newId || user.id;
        user.email = newEmail || user.email;
        user.password = newPassword || user.password;
        res.status(200).send("Usuario alterado com sucesso");
    }
});
app.put('/produt/:id', (req, res) => {
    const id = req.params.id;
    const newId = req.body.id;
    const newName = req.body.name;
    const newPrice = req.body.price;
    const newCategory = req.body.category;
    const product = database_1.products.find((product) => {
        return product.id === id;
    });
    if (product) {
        product.id = newId || product.id;
        product.name = newName || product.name;
        product.price = newPrice || product.price;
        product.category = newCategory || product.category;
        res.status(200).send("Produto alterado com sucesso");
    }
});
//# sourceMappingURL=index.js.map