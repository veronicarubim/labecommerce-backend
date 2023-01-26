import { users, products, purchase, getAllUsers, createProduct, getAllProducts, getProductById, queryProductsByName, createPurchase, getAllPurchasesFromUserId } from "./database"
/* import { createUser } from "./database"
import { CATEGORIA } from "./types" */
import express, { Request, Response } from 'express'
import cors from 'cors'
import { CATEGORIA, Tproduct, Tpurchase, Tuser } from "./types"

const app = express()

app.use(express.json())
app.use(cors())

app.listen(3003, () => {
    console.log("Servidor rodando na porta 3003");
});

app.get('/ping', (req: Request, res: Response) => {
    res.send('Pong!')
});

// Mostrar os usuários

app.get('/users', (req: Request, res: Response) => {
    
    try {
    res.status(200).send(users)
    } 
    catch (error) {
    console.log(error)
    }

});

// Mostrar os produtos

app.get('/products', (req: Request, res: Response) => {
   
    try {
    res.status(200).send(products)
    }
    catch (error) {
    console.log(error)
    }
    
});

// Pesquisar produtos byQuery, deve validar com um caractere

app.get('/products/search', (req: Request, res: Response) => {
    
    try {
        const q = req.query.q as string
        const result = products.filter((product) => {
            return product.name.toLowerCase().includes(q.toLowerCase())
        })
        if (q.length < 1) {
            res.status(400)
            throw new Error ("O conteúdo da pesquisa deve possuir mais de 1 caractere.")
        }

        res.status(200).send(result)
    } 
    catch (error: any) {
        console.log(error)
        if (res.statusCode === 200) {
            res.status(500)
        }
        res.send(error.message)
    }
    
});

// Cadastrar usuário 

app.post('/user', (req: Request, res: Response) => {
    
    try {
        const {id, email, password} = req.body as Tuser
        const newUser = {
            id,
            email,
            password
        }
    
        users.push(newUser)
        res.status(201).send("Novo usuário cadastrado")
    }
    catch (error) {
        console.log(error)
    }
    
    
})

// Cadastrar produto

app.post('/product', (req: Request, res: Response) => {
    
    try {
        const {id, name, price, category} = req.body as Tproduct
        
        if (typeof id !== "string" &&
            typeof name !== "string" &&
            typeof price !== "number" &&
            typeof category !== "string") {
            res.status(400)
            throw new Error ("Deve ser uma string")
        }
        const newProduct = {
            id, name, price, category
        }
            products.push(newProduct)
            res.status(201).send("Novo produto cadastrado com sucesso")
    }
    catch (error) {
        console.log(error)
    }
    
})

// Cadastrar compra

app.post('/purchase',(req: Request, res: Response) => {
    
    try {
        const {userId, productId, quantity, totalPrice} = req.body as Tpurchase
        
        const newPurchase = {
            userId,
            productId,
            quantity,
            totalPrice
        }

        purchase.push(newPurchase)
        res.status(201).send("Compra realizada com sucesso")
    }
    catch (error) {
        console.log(error)
    }
})

// Pesquisando produto pelo Id by params

app.get('/product/:id', (req: Request, res: Response) => {
   
   try {
        const id = (req.params.id)
        const result = products.find((produto) => {
                return produto.id === id
            })
        if (!result) {
            res.status(400).send("Usuário não existe")
        }
            res.status(200).send(result)
    }
    catch (error: any) {
        console.log(error)
        res.status(400).send(error.message)
    }
})

// Pesquisando userId da compra dentro dos users (???)

app.get('/users/:id/purchases', (req: Request, res: Response) => {
    /* const id = (req.params.id)
    const userSearch = users.filter((user) => {
          return user.id === id
        })
    if (userSearch === purchase.userId) {

    } */
    try {
        const userId = (req.params.id)
        const result = purchase.find((Iduser) => {
            return Iduser.userId === userId
        })
        if (!result) {
            res.status(400).send("Compra não encontrada")
        }
        res.status(200).send(result)
        }
     catch (error: any) {
        console.log(error)
        res.status(400).send(error.message)
    }
})
    

    //Metodo DELETE

    app.delete('/user/:id', (req: Request, res: Response) => {
        
        try {
            const id = req.params.id 
            const userIndex = users.findIndex((user) => {
                return user.id === id
            })

            if (userIndex >= 0) {
                users.splice(userIndex, 1)
                res.status(200).send('Usuario deletado com sucesso')
            } else {
                res.status(404).send('Não foi possível completar')
            }
            
        } catch (error: any) {
            console.log(error.message)
        }

    })
      
    app.delete('/product/:id', (req: Request, res: Response) => {
        try {
        const id = req.params.id 
        const productIndex = products.findIndex((product) => {
                return product.id === id
            })
        if (!productIndex) {
            res.status(400).send("Produto não existe")
        }
        if (productIndex >= 0) {
            products.splice(productIndex, 1)
            res.status(200).send('Produto deletado com sucesso')
        } else {
            res.status(404).send('Não foi possível completar')
        }
    } catch (error: any) {
        console.log(error.message)
    }

    })

    // Metodo PUT - editando usuario

    app.put('/user/:id', (req: Request, res: Response) => {
        const id = req.params.id
        const newId = req.body.id as string | undefined
        const newEmail = req.body.email as string | undefined
        const newPassword = req.body.password as string | undefined

        const user = users.find((user) => {
            return user.id === id
        })

        if (user) {
            user.id = newId || user.id
            user.email = newEmail || user.email
            user.password = newPassword || user.password
            res.status(200).send("Usuario alterado com sucesso")
        }
        })

    // editando produto category: CATEGORIA.ROUPA

    app.put('/produt/:id', (req: Request, res: Response) => {
        const id = req.params.id
        const newId = req.body.id as string | undefined
        const newName = req.body.name as string | undefined
        const newPrice = req.body.price as number | undefined
        const newCategory = req.body.category as CATEGORIA | undefined

        const product = products.find((product) => {
            return product.id === id
        })

        if (product) {
            product.id = newId || product.id
            product.name = newName || product.name
            product.price = newPrice || product.price
            product.category = newCategory || product.category
          
            res.status(200).send("Produto alterado com sucesso")
        }
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