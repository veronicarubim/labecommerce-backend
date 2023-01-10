export type Tuser = {
    id: string,
    email: string,
    password: string
}

export enum CATEGORIA {
    ROUPA = "Roupa",
    SAPATO = "Sapato",
    ACESSORIO = "Acessório"
}

export type Tproduct = {
    id: string,
    name: string,
    price: number,
    category: CATEGORIA
}

export type Tpurchase = {
    userId: string,
    productId: string,
    quantity: number,
    totalPrice: number
}