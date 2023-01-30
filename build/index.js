"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const database_1 = require("./database");
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const knex_1 = require("./database/knex");
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use((0, cors_1.default)());
app.listen(3003, () => {
    console.log("Servidor rodando na porta 3003");
});
app.get('/ping', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    res.send('Pong!');
}));
app.get('/users', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const result = yield (0, knex_1.db)("users");
        res.status(200).send({ usuarios: result });
    }
    catch (error) {
        console.log(error);
        if (req.statusCode === 200) {
            res.status(500);
        }
        if (error instanceof Error) {
            res.send(error.message);
        }
        else {
            res.send("Erro inesperado");
        }
    }
}));
app.get('/products', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        res.status(200).send(database_1.products);
    }
    catch (error) {
        console.log(error);
    }
}));
app.get('/products/search', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const q = req.query.q;
        const result = database_1.products.filter((product) => {
            return product.name.toLowerCase().includes(q.toLowerCase());
        });
        if (q.length < 1) {
            res.status(400);
            throw new Error("O conteúdo da pesquisa deve possuir mais de 1 caractere.");
        }
        res.status(200).send(result);
    }
    catch (error) {
        console.log(error);
        if (res.statusCode === 200) {
            res.status(500);
        }
        res.send(error.message);
    }
}));
app.post('/user', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id, email, password } = req.body;
        const newUser = {
            id,
            email,
            password
        };
        database_1.users.push(newUser);
        res.status(201).send("Novo usuário cadastrado");
    }
    catch (error) {
        console.log(error);
    }
}));
app.post('/product', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id, name, price, category } = req.body;
        if (typeof id !== "string" &&
            typeof name !== "string" &&
            typeof price !== "number" &&
            typeof category !== "string") {
            res.status(400);
            throw new Error("Deve ser uma string");
        }
        const newProduct = {
            id, name, price, category
        };
        database_1.products.push(newProduct);
        res.status(201).send("Novo produto cadastrado com sucesso");
    }
    catch (error) {
        console.log(error);
    }
}));
app.post('/purchase', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { userId, productId, quantity, totalPrice } = req.body;
        const newPurchase = {
            userId,
            productId,
            quantity,
            totalPrice
        };
        database_1.purchase.push(newPurchase);
        res.status(201).send("Compra realizada com sucesso");
    }
    catch (error) {
        console.log(error);
    }
}));
app.get('/product/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = (req.params.id);
        const result = database_1.products.find((produto) => {
            return produto.id === id;
        });
        if (!result) {
            res.status(400).send("Usuário não existe");
        }
        res.status(200).send(result);
    }
    catch (error) {
        console.log(error);
        res.status(400).send(error.message);
    }
}));
app.get('/users/:id/purchases', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const userId = (req.params.id);
        const result = database_1.purchase.find((Iduser) => {
            return Iduser.userId === userId;
        });
        if (!result) {
            res.status(400).send("Compra não encontrada");
        }
        res.status(200).send(result);
    }
    catch (error) {
        console.log(error);
        res.status(400).send(error.message);
    }
}));
app.delete('/user/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
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
    }
    catch (error) {
        console.log(error.message);
    }
}));
app.delete('/product/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = req.params.id;
        const productIndex = database_1.products.findIndex((product) => {
            return product.id === id;
        });
        if (!productIndex) {
            res.status(400).send("Produto não existe");
        }
        if (productIndex >= 0) {
            database_1.products.splice(productIndex, 1);
            res.status(200).send('Produto deletado com sucesso');
        }
        else {
            res.status(404).send('Não foi possível completar');
        }
    }
    catch (error) {
        console.log(error.message);
    }
}));
app.put('/user/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
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
}));
app.put('/produt/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
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
}));
//# sourceMappingURL=index.js.map