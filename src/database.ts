export const users: {id: string, email: string, password: string}[] = [
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
]

export const products: {id: string, name: string, price: number, category: string}[] =
[
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
]

export const purchase: {userId: string, productId: string, quantity: number, totalPrice: number} [] = [
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
]