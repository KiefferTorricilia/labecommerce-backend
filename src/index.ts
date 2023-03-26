import { getAllUsers, createUser, createProduct, getAllProducst, getProductById, queryProductsByName, createPurchase, getAllPurchasesFromUserId, users, products, purchases } from './database'
import { Category, TProduct, TPurchase, TUser } from './types'
import express, { Request, Response } from 'express'
import cors from "cors";

const app = express();

app.use(express.json());

app.use(cors())

app.listen(3003, () => {
    console.log("Servidor rodando na porta 3003")
})

app.get("/ping", (req: Request, res: Response) => {
    res.status(200).send("Pong")
})

app.get("/users", (req: Request, res: Response) => {
    //getAllUsers
    try {
        res.status(200).send(users)
    } catch (error) {

    }
})

app.get("/products", (req: Request, res: Response) => {
    //getAllProducts
    try {
        res.status(200).send(products)
    } catch (error) {

    }
})

app.get("/purchases", (req: Request, res: Response) => {
    //getAllPurchases
    try {
        res.status(200).send(purchases)
    } catch (error) {
        console.log(error)

        if (res.statusCode === 200) {
            res.status(500)
        }
    }
})

app.get("/products/search", (req: Request, res: Response) => {
    //Filtro de Produtos
    try {
        const q = req.query.q as string

        if (q !== undefined) {
            if (q.length < 1) {
                res.status(400)
                throw new Error("O termo de busca deve ter no mínimo um caractere")
            }
        }


        const result = q ?
            products.filter((element) => {
                return element.name.toLowerCase().includes(q.toLowerCase())
            })
            :
            products

        res.status(200).send(result)

    } catch (error: any) {
        console.log(error)
        if (res.statusCode === 200) {
            res.status(500)
        }
        res.status(400).send(error.message)
    }
})

app.get("/products/:id", (req: Request, res: Response) => {
    //getProductsById

    try {
        const id = req.params.id
        const result = products.find((element) => element.id === id)

        if (!result) {
            res.status(200);
            throw new Error("É necessário inserir um id válido.")
        }

        res.status(200).send(result)

    } catch (error: any) {

        console.log(error)

        if (res.statusCode === 200) {
            res.status(500)
        }

        if (error instanceof Error) {
            res.send(error.message)
        } else {
            res.send("Erro inesperado")
        }
    }

})

app.get("/purchases/:id", (req: Request, res: Response) => {
    //Get User Purchases by User id

    try {
        const id: string = req.params.id;

        const result = purchases.find((element) => element.userId === id)

        if (!result) {
            res.status(200);
            throw new Error("Inserir um id válido.")
        }

        res.status(200).send(result)
    } catch (error) {
        console.log(error)

        if (res.statusCode === 200) {
            res.status(500)
        }

        if (error instanceof Error) {
            res.send(error.message)
        } else {
            res.send("Erro inesperado")
        }
    }

})

app.post("/users", (req: Request, res: Response) => {
    //createUser

    try {

        const id: string = req.body.id;
        const email: string = req.body.email;
        const password: string = req.body.password;

        const checkId = users.find((element) => element.id === id)
        const checkEmail = users.find((element) => element.email === email)

        if (!id) {
            throw new Error("É necessário cadastrar um id")
        }
        if (checkId) {
            throw new Error("O usuário cadastrado não pode possuir o id de um outro usuário já existente.")
        }
        if (!email) {
            throw new Error("É necessário cadastrar um email.")
        }
        if (checkEmail) {
            throw new Error("O usuário cadastrado não pode possuir o email de um já existente.")
        }
        if (!password) {
            throw new Error("É necessário cadastrar uma senha.")
        }

        const newUsers: TUser = {
            id, email, password
        }
        users.push(newUsers)

        console.log(users)

        res.status(201).send("Usuário cadastro com sucesso")

    } catch (error) {
        console.log(error)

        if (res.statusCode === 200) {
            res.status(500)
        }

        if (error instanceof Error) {
            res.send(error.message)
        } else {
            res.send("Erro inesperado")
        }
    }

})

app.post("/products", (req: Request, res: Response) => {
    //createProducts

    try {
        const id: string = req.body.id
        const name: string = req.body.name
        const price: number = req.body.price
        const category: Category = req.body.category

        const checkId = products.find((element) => element.id === id)

        if (id === undefined) {
            res.status(400)
            throw new Error("É necessário cadastrar um id.")
        }
        if (checkId) {
            res.status(400)
            throw new Error("Não é possível cadastrar o id de um produto já existente.")
        }

        if (name === undefined) {
            res.status(400)
            throw new Error("É necessário cadastrar um nome.")
        }
        if (price === undefined) {
            res.status(400);
            throw new Error("É necessário inserir o preço.")
        }
        if (category === undefined) {
            res.status(400);
            throw new Error("É necessário inserir a categoria.")
        }

        const newProduct: TProduct = {
            id, name, price, category
        }

        products.push(newProduct)
        console.log(products)

        res.status(201).send("produto criado com sucesso")
    } catch (error) {
        console.log(error)

        if (res.statusCode === 200) {
            res.status(500)
        }
        if (error instanceof Error) {
            res.send(error.message)
        } else {
            res.send("Erro inesperado")
        }
    }


})

app.post("/purchases", (req: Request, res: Response) => {
    //createPurchases

    try {
        const userId: string = req.body.userId;
        const productId: string = req.body.productId;
        const quantity: number = req.body.quantity;

        const checkUserId = users.find((element) => element.id === userId);
        const checkProductId = products.find((element) => element.id === productId);



        if (userId === undefined) {
            res.status(400);
            throw new Error("É necessário inserir um id.");
        }
        if (!checkUserId) {
            res.status(400);
            throw new Error("O id do usuário que fez a compra deve existir no array de usuários cadastrados.")
        }
        if (productId === undefined) {
            res.status(400);
            throw new Error("É necessário inserir o product.");
        }
        if (!checkProductId) {
            res.status(400);
            throw new Error("O id do produto que foi comprado deve existir no array de produtos cadastrados")
        }
        if (quantity === undefined) {
            res.status(400);
            throw new Error("É necessário inserir a quantity.");
        }

        const totalPrice: number = quantity * checkProductId.price;


        const newPurchase: TPurchase = {
            userId, productId, quantity, totalPrice
        }

        purchases.push(newPurchase)

        console.log(purchases)

        res.status(201).send("Compra feita com sucesso")

    } catch (error) {
        console.log(error)

        if (res.statusCode === 200) {
            res.status(500)
        }
        if (error instanceof Error) {
            res.send(error.message)
        } else {
            res.send("Erro inesperado")
        }
    }

})

app.put("/users/:id", (req: Request, res: Response) => {
    //Edit User by id

    try {

        const id = req.params.id;

        const checkId = users.find((element) => element.id === id)

        if(!checkId){
            res.status(400);
            throw new Error("É necessário inserir um id válido.")
        }

        const newEmail: string = req.body.email;
        const newPassword: string = req.body.password;

        if(!newEmail){
            res.status(400);
            throw new Error("É necessário inserir um email.")
        }
        if(!newPassword){
            res.status(400);
            throw new Error("É necessário inserir uma senha");
        }

        const result = users.find((element) => element.id === id);

        if (result) {
            result.email = newEmail || result.email;
            result.password = newPassword || result.password;
        }

        res.status(200).send("Usuário alterado com sucesso")

    } catch (error) {
        console.log(error)

        if (res.statusCode === 200) {
            res.status(500)
        }
        if (error instanceof Error) {
            res.send(error.message)
        } else {
            res.send("Erro inesperado")
        }
    }

})

app.put("/products/:id", (req: Request, res: Response) => {
    //Edit Product by id

   try {
    const id = req.params.id;

    const newName: string = req.body.name;
    const newPrice: number = req.body.price;
    const newCategory: Category = req.body.category;

    const result = products.find((element) => element.id === id);

    if(!result){
        res.status(400);
        throw new Error("É necessário inserir um id válido.");
    }
    if(!newName){
        res.status(400);
        throw new Error("É necessário inserir um name.");
    }
    if(!newPrice){
        res.status(400);
        throw new Error("É necessário inserir um price.");
    }
    if(!newCategory){
        res.status(400);
        throw new Error("É necessário inserir uma category.")
    }

    if (result) {
        result.name = newName || result.name;
        result.price = isNaN(newPrice) ? result.price : newPrice;
        result.category = newCategory || result.category;
    }

    res.status(200).send("Usuário alterado com sucesso");
   } catch (error) {
    console.log(error)

    if (res.statusCode === 200) {
        res.status(500)
    }
    if (error instanceof Error) {
        res.send(error.message)
    } else {
        res.send("Erro inesperado")
    }
   }

})



app.delete("/users/:id", (req: Request, res: Response) => {
    //Delete User by id
    try {
        const id: string = req.params.id;

        const userIndex: number = users.findIndex((element) => element.id === id)

        if (userIndex >= 0) {
            users.splice(userIndex, 1);
        } else {
            res.status(200);
            throw new Error("Inserir um id válido.")
        }

        res.status(200).send("Usuário deletado com sucesso")
    } catch (error) {
        console.log(error);

        if (res.statusCode === 200) {
            res.status(500)
        }
        if (error instanceof Error) {
            res.send(error.message)
        } else {
            res.send("Erro inesperado")
        }

    }
})

app.delete("/products/:id", (req: Request, res: Response) => {
    //Delete Product by id

    try {
        const id = req.params.id;

        const productIndex = products.findIndex((element) => element.id === id);


        if (productIndex >= 0) {
            products.splice(productIndex, 1);
        } else {
            res.status(500);
            throw new Error("Inserir um id válido");
        }

        res.status(200).send("Produto deletado com sucesso.")
    } catch (error) {
        console.log(error);

        if (res.statusCode === 200) {
            res.status(500)
        }
        if (error instanceof Error) {
            res.send(error.message)
        } else {
            res.send("Erro inesperado")
        }
    }
})


