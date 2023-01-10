import { Tuser , Tproduct , Tpurchase, CATEGORIA } from "./types"

export const users: Tuser[] = [
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

export const products: Tproduct[] =
[
    {   
        id: '1',
        name: 'calça',
        price: 50,
        category: CATEGORIA.ROUPA
    },
    {   
        id: '2',
        name: 'camiseta',
        price: 25,
        category: CATEGORIA.ROUPA
    },
    {   
        id: '3',
        name: 'vestido',
        price: 30,
        category: CATEGORIA.ROUPA
    }
]

export const purchase: Tpurchase[] = [
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

export function createUser (id:string, email:string, password:string) {
   const newUSer = {
    id,
    email,
    password
   }
    users.push(newUSer)
    console.log('Cadastro realizado com sucesso')
}

export function getAllUsers () {
    return users
}


export function createProduct (id: string, name: string, price: number, category: CATEGORIA) {
    const newProduct = {
        id,
        name,
        price,
        category
    }
    products.push(newProduct)
    console.log('Produto criado com sucesso')
}

export function getAllProducts () {
    return (products)
}

export function getProductById(idToSearch:string) {
   const newProduct = products.filter(
      (product) => {
        return product.id === idToSearch
      }
    )
    console.log(newProduct)
  } 

export function queryProductsByName (q:string) {
    const newProduct = products.filter(
        (product) => {
          return product.name.includes(q)
        }
      )
      console.log(newProduct)
    }

export function createPurchase (userId:string, productId:string, quantity:number, totalPrice:number) {
    const newPurchase = {
        userId,
        productId,
        quantity,
        totalPrice
    }
    purchase.push(newPurchase)
    console.log('Compra realizada com sucesso')
}

export function getAllPurchasesFromUserId (userIdToSearch:string) {
    const newSearch = purchase.filter(
        (product) => {
          return product.userId === userIdToSearch
        }
      )
      console.log(newSearch)
}

