"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.purchase = exports.products = exports.users = void 0;
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
        category: 'roupa'
    },
    {
        id: '2',
        name: 'camiseta',
        price: 25,
        category: 'roupa'
    },
    {
        id: '3',
        name: 'vestido',
        price: 30,
        category: 'roupa'
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
//# sourceMappingURL=database.js.map