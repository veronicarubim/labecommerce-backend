import { users, products, purchase, getAllUsers, createProduct, getAllProducts, getProductById, queryProductsByName, createPurchase, getAllPurchasesFromUserId } from "./database"
/* import { createUser } from "./database"
import { CATEGORIA } from "./types" */
import express, { Request, Response } from 'express'
import cors from 'cors'
import { Tproduct, Tpurchase, Tuser } from "./types"

const app = express()

app.use(express.json())
app.use(cors())

app.listen(3003, () => {
    console.log("Servidor rodando na porta 3003");
});

app.get('/ping', (req: Request, res: Response) => {
    res.send('Pong!')
});

app.get('/users', (req: Request, res: Response) => {
    res.status(200).send(users)
});

app.get('/products', (req: Request, res: Response) => {
    res.status(200).send(products)
});

app.get('/products/search', (req: Request, res: Response) => {
    const q = req.query.q as string
    const result = products.filter((product) => {
        return product.name.toLowerCase().includes(q.toLowerCase())
    })

    res.status(200).send(result)
});

app.post('/user', (req: Request, res: Response) => {
    const {id, email, password} = req.body as Tuser
    const newUser = {
        id,
        email,
        password
    }

    users.push(newUser)
    res.status(201).send("Novo usuário cadastrado")
})

app.post('/product', (req: Request, res: Response) => {
    const {id, name, price, category} = req.body as Tproduct
    const newProduct = {
        id,
        name,
        price,
        category
    }

    products.push(newProduct)
    res.status(201).send("Novo produto cadastrado com sucesso")
})

app.post('/purchase',(req: Request, res: Response) => {
    const {userId, productId, quantity, totalPrice} = req.body as Tpurchase
    const newPurchase = {
        userId,
        productId,
        quantity,
        totalPrice
    }

    purchase.push(newPurchase)
    res.status(201).send("Compra realizada com sucesso")
})


/* createUser("Marta","marta.rubim@gmail","123456")
getAllUsers()

createProduct("4","tenis",80,CATEGORIA.SAPATO)
getAllProducts()
getProductById("2")

queryProductsByName("c")

createPurchase("Maria", "4", 1,80)
getAllPurchasesFromUserId("mariac")

console.table(users)
console.table(products)
console.table(purchase) */