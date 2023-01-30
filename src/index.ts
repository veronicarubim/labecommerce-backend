import express, { Request, Response } from 'express'
import cors from 'cors'
import { CATEGORIA, Tproduct, Tpurchase, Tuser } from "./types"
import { db } from "./database/knex"

const app = express()

app.use(express.json())
app.use(cors())

app.listen(3003, () => {
    console.log("Servidor rodando na porta 3003");
});

app.get('/ping', async (req: Request, res: Response) => {
    res.send('Pong!')
});


// SHOW USERS

app.get('/users', async (req: Request, res: Response) => {
    
    try {
        const result = await db("users")
        res.status(200).send({usuarios: result})
    } 
    catch (error) {
    console.log(error)
    

    if (req.statusCode === 200) {
        res.status(500)
    }

    if (error instanceof Error) {
        res.send(error.message)
    } else {
        res.send("Erro inesperado")
    }
}

});

// SHOW PRODUCTS

app.get('/products', async (req: Request, res: Response) => {
   
    try {
        const result = await db("products")
        res.status(200).send(result)
    }
    catch (error) {
        console.log(error)
    
        if (req.statusCode === 200) {
            res.status(500)
        }
    
        if (error instanceof Error) {
            res.send(error.message)
        } else {
            res.send("Erro inesperado")
        }
    }
});

// SHOW PURCHASES

app.get("/purchase", async (req: Request, res: Response) => {
  
  try {
    
    const result = await db('purchase');
    res.status(200).send(result);
  } catch (error: any) {
    console.log(error)

    if (req.statusCode === 200) {
      res.status(500);
    }

    if (error instanceof Error) {
      res.send(error.message);
    } else {
      res.send("Erro inesperado");
    }
  }
});

// SEARCH PRODUCT BY QUERY NAME
//deve validar com um caractere

app.get("/products/search", async (req: Request, res: Response) => {

    try {
        const q = req.query.q as string

        if (q.length < 1) {
            res.status(400);
            throw new Error("O conteúdo da pesquisa deve possuir mais de 1 caractere.");
        }

        if (q.length >= 1) {
            const result = await db("products")
            .where("name", "LIKE", `%${q}%`);
    
            if (result.length !== 0) {
            res.status(200).send(result);
            } else {
            res.status(404);
            throw new Error("Produto não encontrado");
            }
        }
    } catch (error: any) {
      console.log(error.message)

      if (res.statusCode === 200) {
        res.status(500);
      }
      res.send(error.message);
    }
  });

// POST NEW USER 

app.post('/user', async (req: Request, res: Response) => {
    
    try {
        const {id, email, password} = req.body 
        
        if (!id || !email || !password) {
            res.status(400)
            throw new Error ("Dados inválidos")
        }

        if (id.length < 4) {
            res.status(400);
            throw new Error("O id deve ter ao menos 4 caractere.");
        }

        /* Impedindo de cadastrar um ID que já está cadastrado */

        const [getId] = await db("users")
        .where({ id: id });

        if (getId) {
        res.status(400);
        throw new Error("ID já cadastrado")
        }

        /* Impedindo o usuário de cadastar um e-mail que já existe */

        const [getEmail] = await db("users")
        .where({ email: email });

        if (getEmail) {
        res.status(400);
        throw new Error("E-mail já cadastrado")
        }

        const newUser = {
            id: id,
            email: email,
            password: password
        }

        await db("users").insert(newUser)
        res.status(200).send({ message: "Cadastro realizado com sucesso!" })
    }
    catch (error: any) {
        console.log(error.message);
        if (res.statusCode === 200) {
          res.status(500);
        }
        res.send(error.message);
      }
    })

// POST NEW PRODUCT

app.post('/product', async (req: Request, res: Response) => {
    
    try {
        const {id, name, price, category} = req.body as Tproduct
        
        /* Para o usuário inserir os dados obrigatórios*/
        
        if (id === undefined ||
            name === undefined ||
            price === undefined ||
            category === undefined) 
            {
            res.status(400)
            throw new Error ("Dados obrigatórios")
            } 

        /* Para verificar se o ID é uma string e se já existe no database */

        if (id !== undefined) {
            
          if (typeof id !== "string") {
            res.status(400);
            throw new Error("O Id deve ser ser uma string");
            }

            const [getId] = await db("products")
            .where({ id: id })
            
            if (getId) {
                res.status(400);
                throw new Error(
                "O id já foi cadastrado."
                );
            }
            }

        /* Para verificar se o name é uma string e se já existe no database */

        if (name !== undefined) {
            
          if (typeof name !== "string") {
              res.status(400);
              throw new Error("O Nome deve ser uma string");
            }
      
            const [getName] = await db("products")
            .where({ name: name });
            
            if (getName) {
              res.status(400);
              throw new Error("O name já foi cadastrado")
            }
            }

        /* Para verificar se o preço é um número e se já existe no database */
      
        if (price !== undefined) {
            if (typeof price !== "number") {
              res.status(400);
              throw new Error("O preço deve ser um número");
            }
            }

        if (category !== CATEGORIA.ROUPA || CATEGORIA.SAPATO || CATEGORIA.ACESSORIO) {
          res.status(400);
              throw new Error("a categoria deve respeitar as categorias existentes")
        }

          const newProduct = {
            id: id,
            name: name,
            price: price,
            category: category,
          }

          await db('products')
          .insert(newProduct)

          res.status(201).send(" Produto cadastrado com sucesso");
        } catch (error: any) {
          console.log(error.message);
          if (res.statusCode === 200) {
            res.status(500);
          }
          res.send(error.message);
        }
      });

// NEW PURCHASE

app.post('/purchase', async (req: Request, res: Response) => {
    
    try {
        const {id, total_price, paid, created_at, buyer_id} = req.body
        
        /* Validando os dados inseridos, que são obrigatórios (ID de usuário, ID de produto e preço total)*/
        
          if (!id) {
            res.status(400);
            throw new Error("Insira um ID de produto");
          }

          if (!buyer_id) {
            res.status(400);
            throw new Error("Insira um ID");
          }
      
          if (!total_price) {
            res.status(400);
            throw new Error("Insira o preço total");
          }

        /* Verificando se as informações insiridas são válidas */

        if (buyer_id !== undefined) {

            const [getIdUser] = await db('purchase')
            .where({buyer_id: buyer_id})

            if (!getIdUser) {
                res.status(400);
                throw new Error("Insira um ID de produto válido");
            }
        }

        if (id !== undefined) {
            const [getId] = await db('purchase')
            .where({id: id})

            if (getId) {
              res.status(400);
              throw new Error("Insira um ID de usário válido");
            }
        }
        
        const newPurchase = {
            id,
            total_price,
            paid,
            created_at, 
            buyer_id
        }
            
            await db('purchase')
            .insert(newPurchase)

            res.status(201).send("Compra finalizada")
          } catch (error: any) {
            console.log(error.message);
            if (res.statusCode === 200) {
              res.status(500);
            }
            if(error instanceof Error){
              res.send(error.message);
            } else {
              res.send("Erro inesperado")
            }
          }
        });

// GET PRODUCT BY ID - PARAMS

app.get('/product/:id', async (req: Request, res: Response) => {
   
   try {
        const { id } = req.params;

        const [getProduct] = await db('products')
        .where({id: id})

        if (!getProduct) {
        res.status(400);
        throw new Error("Insira um id de produto válido.");
        }

        if (getProduct) {
        res.status(200).send(getProduct);
        }
    } catch (error: any) {
        console.log(error.message);
        if (res.statusCode === 200) {
        res.status(500);
        }
        res.send(error.message);
    }
    });

// GET PURCHASE BY USERID - ????

app.get('/users/:id/purchase', async (req: Request, res: Response) => {
    
    try {
        const { id } = req.params;
    
        if (typeof id !== "string" || id.length < 3) {
          res.status(400);
          throw new Error("ID inválido");
        }
    
        const [getUserById] = await db('purchase')
        .where({ buyer_id: id });
    
        if (getUserById) {
          res.status(200).send(getUserById);
        } else  {
          res.status(400)
          throw new Error("Usuário não encontrado");
        }
        
      } catch (error: any) {
        console.log(error.message);
        if (res.statusCode === 200) {
          res.status(500);
        }
        res.send(error.message);
    }
    });
    
    //Metodo DELETE

// DELETAR USUÁRIO

    app.delete('/user/:id', async (req: Request, res: Response) => {
        
        try {
          const { id } = req.params;
          const [getUser] = await db("users")
          .where({ id: id });
      
          if (getUser) {
            await db("users").del()
            .where({ id: id });

            res.status(200).send("Usuário deletado");
          } else {
            res.status(400);
            throw new Error("Nenhum usuário encontrado");
          }
        } catch (error: any) {
          console.log(error.message);
          if (res.statusCode === 200) {
            res.status(500);
          }
          res.send(error.message);
        }
      });
      
// DELETAR PRODUTO

    app.delete('/product/:id', async (req: Request, res: Response) => {
      
      try {
        const { id } = req.params;
    
        const [getProduct] = await db("products")
        .where({ id: id });
    
        if (getProduct) {
          await db("products").del()
          .where({ id: id })

          res.status(200).send("Produto deletado");
        } else {
          res.status(400);
          throw new Error("Nenhum produto encontrado");
        }
      } catch (error: any) {
        console.log(error.message);
        if (res.statusCode === 200) {
          res.status(500);
        }
        res.send(error.message);
      }
    });

    // Metodo PUT - editando usuario

    /* Editando usuário */

    app.put('/user/:id', async (req: Request, res: Response) => {
        
        try {
        
        const id = req.params.id

        const newId = req.body.id as string
        const newEmail = req.body.email as string
        const newPassword = req.body.password as string 

        if (typeof newId !== "string") {
          res.status(400);
          throw new Error("O id deve ser tipo 'string'")
        }

        if (typeof newEmail !== "string") {
          res.status(400);
          throw new Error("O e-mail deve ser uma 'string'");
        }

        if (typeof newPassword !== "string") {
          res.status(400);
          throw new Error("A senha deve ser uma 'string'");
        }

        if (newPassword !== undefined) {
          if (typeof newPassword === "string") {
            if (newPassword.length < 6) {
              res.status(400);
              throw new Error("A senha deve conter no mínimo 6 dígitos");
            }
          }
        }

        const [getUserById] = await db('users')
        .where({ id:id })

        if (!getUserById) {
          res.status(400);
        throw new Error("Usuário não encontrado.")
        }

        if (getUserById) {
          getUserById.id = newId || getUserById.id;
          getUserById.password = newPassword || getUserById.password;
    
          res.status(200).send("Usário atualizado");
          console.log(getUserById);
        }
        
        } catch (error: any) {
      console.log(error.message);
      if (res.statusCode === 200) {
        res.status(500);
      }
      res.send(error.message);
    }
  });

        

    // editando produto category: CATEGORIA.ROUPA

    app.put('/produt/:id', async (req: Request, res: Response) => {
        
      try {

        const { id } = req.params
        const newId = req.body.id as string 
        const newName = req.body.name as string 
        const newPrice = req.body.price as number 
        const newCategory = req.body.category as CATEGORIA 

        if (typeof newId !== "string") {
          res.status(400)
          throw new Error ("O novo ID precisa ser uma string")
        }

        if (typeof newName !== "string") {
          res.status(400)
          throw new Error ("O novo nome precisa ser uma string")
        }

        if (typeof newPrice !== "number") {
          res.status(400)
          throw new Error ("O novo preço precisa ser um número")
        }

        if (
          newCategory !== "Roupa" &&
          newCategory !== "Sapato" &&
          newCategory !== "Acessório" 
        ) {
          res.status(400);
          throw new Error(
            'A nova categoria precisa estar entre: "Roupa, Sapato e Acessório"'
          );
        }

       

        if (newPrice !== undefined) {
          if (typeof newPrice !== "number") {
            res.status(400);
            throw new Error("O preço deve ser um número.");
          }
          if (typeof newPrice === "number") {
            if (newPrice < 1) {
              res.status(400);
              throw new Error("O preço deve ser maior que R$0.");
            }
          }
        }

        const [productID] = await db("products")
        .where({ id: id });

        if (productID) {
          const updateProduct = {
          id: newId || productID.id,
          name: newName || productID.name,
          price: newPrice || productID.price,
          category: newCategory || productID.category,
        }
          await db("products")
          .update(updateProduct)
          .where({ id: id })
          res.status(200).send("Produto alterado com sucesso");
          console.log(productID);
        } 
        
        else {
          res.status(400);
          throw new Error("Produto não encontrado.");
        }

      } catch (error: any) {
        console.log(error.message);
        if (res.statusCode === 200) {
          res.status(500);
        }
        res.send(error.message);
      }
    });