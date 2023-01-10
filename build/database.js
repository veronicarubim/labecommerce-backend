"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getAllPurchasesFromUserId = exports.createPurchase = exports.queryProductsByName = exports.getProductById = exports.getAllProducts = exports.createProduct = exports.getAllUsers = exports.createUser = exports.purchase = exports.products = exports.users = void 0;
const types_1 = require("./types");
exports.users = [
    {
        id: 'veronicarubim',
        email: 'veronica.rubim@gmail.com',
        password: '123456'
    },
    {
        id: 'mariac',
        email: 'mariaconstance@gmail.com',
        password: '123456'
    }
];
exports.products = [
    {
        id: '1',
        name: 'calça',
        price: 50,
        category: types_1.CATEGORIA.ROUPA
    },
    {
        id: '2',
        name: 'camiseta',
        price: 25,
        category: types_1.CATEGORIA.ROUPA
    },
    {
        id: '3',
        name: 'vestido',
        price: 30,
        category: types_1.CATEGORIA.ROUPA
    }
];
exports.purchase = [
    {
        userId: 'veronicarubim',
        productId: 'vestido',
        quantity: 1,
        totalPrice: 30
    },
    {
        userId: 'mariac',
        productId: 'camiseta',
        quantity: 2,
        totalPrice: 50
    }
];
function createUser(id, email, password) {
    const newUSer = {
        id,
        email,
        password
    };
    exports.users.push(newUSer);
    console.log('Cadastro realizado com sucesso');
}
exports.createUser = createUser;
function getAllUsers() {
    return exports.users;
}
exports.getAllUsers = getAllUsers;
function createProduct(id, name, price, category) {
    const newProduct = {
        id,
        name,
        price,
        category
    };
    exports.products.push(newProduct);
    console.log('Produto criado com sucesso');
}
exports.createProduct = createProduct;
function getAllProducts() {
    return (exports.products);
}
exports.getAllProducts = getAllProducts;
function getProductById(idToSearch) {
    const newProduct = exports.products.filter((product) => {
        return product.id === idToSearch;
    });
    console.log(newProduct);
}
exports.getProductById = getProductById;
function queryProductsByName(q) {
    const newProduct = exports.products.filter((product) => {
        return product.name.includes(q);
    });
    console.log(newProduct);
}
exports.queryProductsByName = queryProductsByName;
function createPurchase(userId, productId, quantity, totalPrice) {
    const newPurchase = {
        userId,
        productId,
        quantity,
        totalPrice
    };
    exports.purchase.push(newPurchase);
    console.log('Compra realizada com sucesso');
}
exports.createPurchase = createPurchase;
function getAllPurchasesFromUserId(userIdToSearch) {
    const newSearch = exports.purchase.filter((product) => {
        return product.userId === userIdToSearch;
    });
    console.log(newSearch);
}
exports.getAllPurchasesFromUserId = getAllPurchasesFromUserId;
//# sourceMappingURL=database.js.map