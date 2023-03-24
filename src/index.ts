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
    res.status(200).send(users)
})

app.get("/products", (req: Request, res: Response) => {
    //getAllProducts
    res.status(200).send(products)
})

app.get("/products/search", (req: Request, res: Response) => {
    //Filtro de Produtos
    const q = req.query.q as string

    const result = q ?
        products.filter((element) => {
            return element.name.toLowerCase().includes(q.toLowerCase())
        })
        :
        products
    
    res.status(200).send(result)
})

app.get("/products/:id", (req: Request, res: Response) => {
    //getProductsById
    const id = req.params.id
    const result = products.find((element) => element.id === id)

    res.status(200).send(result)

})

app.get("/purchases/:id", (req: Request, res: Response) => {
    //Get User Purchases by User id

    const id: string = req.params.id;

    const result = purchases.find((element) => element.userId === id)

    res.status(200).send(result)
})

app.post("/users", (req: Request, res: Response) => {
    //createUser

    const id: string = req.body.id
    const email: string = req.body.email
    const password: string = req.body.password

    const newUsers: TUser = {
        id, email, password
    }
    users.push(newUsers)

    console.log(users)

    res.status(201).send("Usuário cadastro com sucesso")
})

app.post("/products", (req: Request, res: Response) => {
    //createProducts

    const id: string = req.body.id
    const name: string = req.body.name
    const price: number = req.body.price
    const category: Category = req.body.category

    const newProduct: TProduct = {
        id, name, price, category
    }

    products.push(newProduct)
    console.log(products)

    res.status(201).send("produto criado com sucesso")

})

app.post("/purchases", (req: Request, res: Response) => {
    //createPurchases

    const userId: string = req.body.userId;
    const productId: string = req.body.productId;
    const quantity: number = req.body.quantity;
    const totalPrice: number = req.body.totalPrice

    const newPurchase: TPurchase = {
        userId, productId, quantity, totalPrice
    }

    purchases.push(newPurchase)
    console.log(purchases)

    res.status(201).send("Compra feita com sucesso")
})

app.put("/users/:id", (req: Request, res: Response) => {
    //Edit User by id

    const id = req.params.id;

    const newEmail: string = req.body.email;
    const newPassword: string = req.body.password;

    const result = users.find((element) => element.id === id);

    if(result){
        result.email = newEmail || result.email;
        result.password = newPassword || result.password;
    }

    res.status(200).send("Usuário alterado com sucesso")

})

app.put("/products/:id", (req: Request, res: Response) => {
    //Edit Product by id

    const id = req.params.id;

    const newName: string = req.body.name;
    const newPrice: number = req.body.price;
    const newCategory: Category = req.body.category;

    const result = products.find((element) => element.id === id);

    if(result){
        result.name = newName || result.name;
        result.price = isNaN(newPrice) ? result.price : newPrice;
        result.category = newCategory || result.category;
    }
    
    res.status(200).send("Usuário alterado com sucesso");
    
})



app.delete("/users/:id", (req: Request, res: Response) => {
    //Delete User by id
    const id: string = req.params.id;

    const userIndex: number = users.findIndex((element) => element.id === id)

    if(userIndex >= 0){
        users.splice(userIndex, 1);
    }

    res.status(200).send("Usuário deletado com sucesso")
})

app.delete("/products/:id", (req: Request, res: Response) => {
    //Delete Product by id

    const id = req.params.id;

    const productIndex = products.findIndex((element) => element.id === id);

    let message: string;
    if(productIndex >= 0){
        products.splice(productIndex, 1);
        message = "Usuário excluído com sucesso"
    } else {
        message = "Usuário não encontrado"
    }

    res.status(200).send(message)
})


